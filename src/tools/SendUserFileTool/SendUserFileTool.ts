import { z } from 'zod/v4'
import { getKairosActive, isReplBridgeActive } from '../../bootstrap/state.js'
import { isPolicyAllowed } from '../../services/policyLimits/index.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js'
import { logEvent, type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../../services/analytics/index.js'
import { buildTool, type ToolDef } from '../../Tool.js'
import { FileReadTool } from '../FileReadTool/FileReadTool.js'
import { isBriefEnabled } from '../BriefTool/BriefTool.js'
import { resolveAttachmentMetadata, validateAttachmentPaths } from '../BriefTool/attachments.js'
import { uploadBridgeAttachment } from '../BriefTool/upload.js'
import { isEssentialTrafficOnly } from '../../utils/privacyLevel.js'
import { getAPIProvider, isFirstPartyAnthropicBaseUrl } from '../../utils/model/providers.js'
import { checkReadPermissionForTool } from '../../utils/permissions/filesystem.js'
import { getAskRuleForTool, getDenyRuleForTool } from '../../utils/permissions/permissions.js'
import { expandPath } from '../../utils/path.js'
import { lazySchema } from '../../utils/lazySchema.js'
import { DESCRIPTION, PROMPT, SEND_USER_FILE_TOOL_NAME } from './prompt.js'

const inputSchema = lazySchema(() => z.strictObject({
  files: z.preprocess(
    value => typeof value === 'string' ? [value] : value,
    z.array(z.string()).min(1),
  ).describe('File paths (absolute or relative to cwd) to send to the user. Always pass an array, even for a single file.'),
  caption: z.string().optional(),
  status: z.enum(['normal', 'proactive']),
  display: z.enum(['render', 'attach']).optional(),
}))
type InputSchema = ReturnType<typeof inputSchema>

const outputSchema = lazySchema(() => z.object({
  caption: z.string().optional(),
  display: z.enum(['render', 'attach']).optional(),
  attachments: z.array(z.object({
    path: z.string(),
    size: z.number(),
    isImage: z.boolean(),
    file_uuid: z.string().optional(),
    upload_error: z.string().optional(),
  })),
}))
type OutputSchema = ReturnType<typeof outputSchema>
export type Output = z.infer<OutputSchema>

/** The public local Remote Control upload lane; hosted/StorageV5 lanes are absent. */
export function isSendUserFileEnabled(): boolean {
  return getAPIProvider() === 'firstParty' &&
    isFirstPartyAnthropicBaseUrl() &&
    !isEssentialTrafficOnly() &&
    isPolicyAllowed('allow_send_file') &&
    getFeatureValue_CACHED_MAY_BE_STALE('tengu_send_user_file', true) &&
    isReplBridgeActive() &&
    !isBriefEnabled() &&
    !getKairosActive()
}

export const SendUserFileTool = buildTool({
  name: SEND_USER_FILE_TOOL_NAME,
  searchHint: 'deliver files screenshots reports artifacts to the user',
  maxResultSizeChars: 100_000,
  userFacingName() { return '' },
  get inputSchema(): InputSchema { return inputSchema() },
  get outputSchema(): OutputSchema { return outputSchema() },
  isEnabled: isSendUserFileEnabled,
  isConcurrencySafe() { return true },
  isReadOnly() { return true },
  async description() { return DESCRIPTION },
  async prompt() { return PROMPT },
  toAutoClassifierInput(input) {
    const paths = `[${input.files.join(', ')}]`
    return input.caption ? `${input.caption} ${paths}` : paths
  },
  async validateInput(input) {
    return validateAttachmentPaths(input.files)
  },
  async checkPermissions(input, context) {
    const permissions = context.getAppState().toolPermissionContext
    const denyRule = getDenyRuleForTool(permissions, SendUserFileTool)
    if (denyRule) return {
      behavior: 'deny' as const,
      message: 'Sending files is denied by your permission rules.',
      decisionReason: { type: 'rule' as const, rule: denyRule },
    }
    const decisions = input.files.map(file => checkReadPermissionForTool(
        FileReadTool,
        { file_path: expandPath(file) },
        permissions,
      ))
    const denied = decisions.find(decision => decision.behavior === 'deny')
    if (denied) return denied
    const readAsk = decisions.find(decision => decision.behavior === 'ask')
    if (readAsk) return readAsk
    const askRule = getAskRuleForTool(permissions, SendUserFileTool)
    if (askRule) return {
      behavior: 'ask' as const,
      message: `Send ${input.files.length} file(s) to the user? SendUserFile reads file contents.`,
      decisionReason: { type: 'rule' as const, rule: askRule },
    }
    return { behavior: 'allow' as const, updatedInput: input }
  },
  mapToolResultToToolResultBlockParam(output, toolUseID) {
    const delivered = output.attachments.filter(a => a.file_uuid)
    const failed = output.attachments.filter(a => a.upload_error)
    const lines = [
      `${delivered.length} file(s) delivered to the user.`,
      ...delivered.map(a => `  ${a.path} → file_uuid: ${a.file_uuid}`),
      ...failed.map(a => `  ${a.path} (${(a.size / 1048576).toFixed(1)} MiB): ${a.upload_error}`),
    ]
    if (failed.length) lines.push('Tell the user which files were not delivered and why.')
    return { tool_use_id: toolUseID, type: 'tool_result' as const, content: lines.join('\n') }
  },
  renderToolUseMessage() { return '' },
  renderToolResultMessage(output) {
    const delivered = output.attachments.filter(a => a.file_uuid).length
    const failed = output.attachments.length - delivered
    return `${delivered} file(s) delivered${failed ? `; ${failed} failed` : ''}`
  },
  async call(input, context) {
    logEvent('tengu_send_user_file', {
      proactive: input.status === 'proactive',
      file_count: input.files.length,
      display_set: input.display !== undefined,
      display_attach: input.display === 'attach',
      upload_lane: 'bridge' as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    })
    const metadata = await resolveAttachmentMetadata(input.files)
    const uploaded = await Promise.all(metadata.map(attachment =>
      uploadBridgeAttachment(attachment.path, attachment.size, {
        replBridgeEnabled: isReplBridgeActive(),
        signal: context.abortController.signal,
      }),
    ))
    const attachments = metadata.map((attachment, index) => uploaded[index]
      ? { ...attachment, file_uuid: uploaded[index] }
      : { ...attachment, upload_error: 'Not delivered to the connected viewer.' })
    return { data: {
      caption: input.caption,
      display: input.display,
      attachments,
    } }
  },
} satisfies ToolDef<InputSchema, Output>)
