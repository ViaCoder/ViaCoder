import {record,str,num,bool,stringArray,pick,rows,type Row} from './publicResultPrimitives.js'
import {projectPublicDiffResult} from './serveDiffResult.js'
import {projectSharedThinking,sharedThinkingControlSchema,type SharedThinkingControl} from './sharedThinkingState.js'
import {projectSharedConfig,sharedConfigControlSchema,type SharedConfigControl} from './sharedConfigState.js'
/** Narrow Web bridge for real CLI control requests. The session worker, not the
 * HTTP server, remains the sole owner of state, cwd, validation and side effects.
 * These are SDK controls, never user/model turns or terminal JSX commands.
 */
import {projectSharedEffortResult} from './sharedEffortState.js'
import {SDKControlGetContextUsageResponseSchema} from '../entrypoints/sdk/controlSchemas.js'
import {AGENT_COLORS} from '../tools/AgentTool/agentColorManager.js'
export type PublicCommandControl =
  | SharedThinkingControl
  | SharedConfigControl
  | { subtype: 'get_context_usage'; detail?: 'summary' | 'full' }
  | { subtype: 'get_skills_dialog' | 'get_hooks_listing' | 'mcp_status' | 'reload_plugins' | 'get_settings' |
      'get_session_cost' | 'list_models' | 'get_binary_version' }
  | { subtype: 'get_usage'; skip_behaviors?: boolean }
  | { subtype: 'background_tasks'; tool_use_id?: string }
  | { subtype: 'stop_task'; task_id: string }
  | { subtype: 'rewind_files'; user_message_id: string; dry_run: boolean; confirm?: true }
  | { subtype: 'local_public_effort'; value?: string; expectedModel?: string }
  | { subtype: 'local_public_color'; color?: import('../tools/AgentTool/agentColorManager.js').AgentColorName | 'default' }
  | { subtype: 'local_public_diff'; path?: string }
  | { subtype: 'local_public_doctor' | 'local_public_checkpoints' | 'local_public_tasks' | 'local_public_export' }
  | { subtype: 'local_public_branch'; title?: string }
  | { subtype: 'local_public_tag'; tag: string; confirmRemove?: true }
  | { subtype: 'local_public_memory'; action: 'list' | 'read' | 'write'; id?: string; content?: string; expectedHash?: string }
export type SdkPublicCommandControl = Exclude<PublicCommandControl, { subtype: 'rewind_files' }> |
  { subtype: 'rewind_files'; user_message_id: string; dry_run: boolean }

const exact = (value: Row, keys: readonly string[]) => Object.keys(value).every(key => keys.includes(key))
const nonempty = (value: unknown): value is string => typeof value === 'string' && value.length > 0 && value.length <= 256
const noArgs = new Set(['get_skills_dialog', 'get_hooks_listing', 'mcp_status', 'reload_plugins', 'get_settings',
  'get_session_cost', 'list_models', 'get_binary_version', 'local_public_doctor',
  'local_public_checkpoints', 'local_public_tasks', 'local_public_export'])

/** Fail closed. A real rewind requires explicit confirmation after a dry run. */
export function validatePublicCommandControl(input: unknown): PublicCommandControl | null {
  const row = record(input)
  if (!row || typeof row.subtype !== 'string') return null
  if (noArgs.has(row.subtype)) return exact(row, ['subtype']) ? { subtype: row.subtype } as PublicCommandControl : null
  switch (row.subtype) {
    case 'get_context_usage':
      return exact(row, ['subtype', 'detail']) && (row.detail === undefined || row.detail === 'summary' || row.detail === 'full')
        ? {subtype: row.subtype, ...(row.detail === 'summary' || row.detail === 'full' ? {detail: row.detail} : {})} : null
    case 'local_public_thinking': {const result=sharedThinkingControlSchema.safeParse(row);return result.success?result.data:null}
    case 'local_public_config': {const result=sharedConfigControlSchema.safeParse(row);return result.success?result.data:null}
    case 'local_public_effort':
      return exact(row,['subtype','value','expectedModel']) && (row.value===undefined||typeof row.value==='string'&&row.value.length>0&&row.value.length<=32) &&
        (row.expectedModel===undefined||nonempty(row.expectedModel))
        ? {subtype:row.subtype,...(typeof row.value==='string'?{value:row.value}:{}),...(typeof row.expectedModel==='string'?{expectedModel:row.expectedModel}:{})}:null
    case 'local_public_color':
      return exact(row,['subtype','color']) && (row.color===undefined || typeof row.color==='string' &&
        (row.color==='default' || AGENT_COLORS.includes(row.color as import('../tools/AgentTool/agentColorManager.js').AgentColorName)))
        ? {subtype:row.subtype,...(typeof row.color==='string'?{color:row.color as import('../tools/AgentTool/agentColorManager.js').AgentColorName|'default'}:{})}:null
    case 'local_public_diff':
      return exact(row, ['subtype', 'path']) && (row.path === undefined || typeof row.path === 'string' && row.path.length > 0 && row.path.length <= 4096 && !row.path.includes('\0'))
        ? {subtype: row.subtype, ...(typeof row.path === 'string' ? {path: row.path} : {})} : null
    case 'get_usage':
      return exact(row, ['subtype', 'skip_behaviors']) && (row.skip_behaviors === undefined || typeof row.skip_behaviors === 'boolean')
        ? { subtype: row.subtype, ...(row.skip_behaviors !== undefined ? { skip_behaviors: row.skip_behaviors as boolean } : {}) } : null
    case 'background_tasks':
      return exact(row, ['subtype', 'tool_use_id']) && (row.tool_use_id === undefined || typeof row.tool_use_id === 'string' && row.tool_use_id.length <= 256)
        ? { subtype: row.subtype, ...(row.tool_use_id !== undefined ? { tool_use_id: row.tool_use_id as string } : {}) } : null
    case 'stop_task':
      return exact(row, ['subtype', 'task_id']) && nonempty(row.task_id) ? { subtype: row.subtype, task_id: row.task_id } : null
    case 'rewind_files':
      if (!exact(row, ['subtype', 'user_message_id', 'dry_run', 'confirm']) || !nonempty(row.user_message_id)) return null
      if (row.dry_run === true && row.confirm === undefined) return { subtype: row.subtype, user_message_id: row.user_message_id, dry_run: true }
      if (row.dry_run === false && row.confirm === true) return { subtype: row.subtype, user_message_id: row.user_message_id, dry_run: false, confirm: true }
      return null
    case 'local_public_branch':
      return exact(row, ['subtype', 'title']) && (row.title === undefined || typeof row.title === 'string' && row.title.length <= 100)
        ? { subtype: row.subtype, ...(row.title !== undefined ? {title: row.title as string} : {}) } : null
    case 'local_public_tag':
      return exact(row, ['subtype', 'tag', 'confirmRemove']) && nonempty(row.tag) &&
        (row.confirmRemove === undefined || row.confirmRemove === true)
        ? { subtype: row.subtype, tag: row.tag,
          ...(row.confirmRemove === true ? {confirmRemove: true as const} : {}) } : null
    case 'local_public_memory': {
      if (!['list', 'read', 'write'].includes(String(row.action))) return null
      if (row.action === 'list') return exact(row, ['subtype', 'action']) ? {subtype: row.subtype, action: 'list'} : null
      if (row.action === 'read') return exact(row, ['subtype', 'action', 'id']) && nonempty(row.id)
        ? {subtype: row.subtype, action: 'read', id: row.id} : null
      return exact(row, ['subtype', 'action', 'id', 'content', 'expectedHash']) && nonempty(row.id) &&
        typeof row.content === 'string' && row.content.length <= 512_000 && typeof row.expectedHash === 'string' && /^[a-f0-9]{64}$/.test(row.expectedHash)
        ? {subtype: row.subtype, action: 'write', id: row.id, content: row.content, expectedHash: row.expectedHash} : null
    }
    default: return null
  }
}

/** Remove Web-only confirmation; the worker receives precisely its SDK shape. */
export function toSdkPublicCommandControl(request: PublicCommandControl): SdkPublicCommandControl {
  if (request.subtype === 'rewind_files') {
    return { subtype: 'rewind_files', user_message_id: request.user_message_id, dry_run: request.dry_run }
  }
  return request
}

function command(row: Row): Row | null {
  if (!str(row.name) || !str(row.description)) return null
  return { name: row.name, description: row.description, ...(str(row.argumentHint) !== undefined ? { argumentHint: row.argumentHint } : {}) }
}
function server(row: Row): Row | null {
  if (!str(row.name) || !['connected', 'failed', 'needs-auth', 'pending', 'disabled'].includes(String(row.status))) return null
  const info = record(row.serverInfo)
  return { name: row.name, status: row.status,
    ...(str(row.scope) !== undefined ? { scope: row.scope } : {}),
    ...(info && str(info.name) && str(info.version) ? { serverInfo: { name: info.name, version: info.version } } : {}) }
}

/** Only purpose-built public fields cross the HTTP boundary. No spread of raw
 * SDK objects: settings, MCP configs, plugin paths, errors and account data can
 * contain headers, tokens or private host metadata.
 */
export function projectPublicCommandResult(request: PublicCommandControl, raw: unknown): Row | null {
  const value = record(raw)
  if (!value) return null
  switch (request.subtype) {
    case 'get_context_usage': {
      const result = SDKControlGetContextUsageResponseSchema().safeParse(value)
      return result.success ? {...result.data} : null
    }
    case 'local_public_thinking': return projectSharedThinking(value)
    case 'local_public_config': return projectSharedConfig(value)
    case 'local_public_effort': return projectSharedEffortResult(value)
    case 'local_public_color':
      return typeof value.color==='string' && (value.color==='default' || AGENT_COLORS.includes(value.color as import('../tools/AgentTool/agentColorManager.js').AgentColorName)) &&
        (request.color===undefined || value.color===request.color) ? {color:value.color}:null
    case 'get_skills_dialog': {
      const skills = rows(value.skills, row => {
        if (!str(row.name) || !str(row.display_name) || !str(row.description) || !str(row.source) ||
          !['on', 'off', 'name-only', 'user-invocable-only'].includes(String(row.state))) return null
        const handles = record(row.handles)
        return { name: row.name, display_name: row.display_name, description: row.description,
          source: row.source, state: row.state,
          ...pick(row, ['tokens'], num), ...pick(row, ['advertised'], bool),
          ...(handles ? { handles: { ...pick(handles, ['unqualified_name'], str),
            ...pick(handles, ['aliases'], stringArray) } } : {}) }
      })
      return skills ? { skills } : null
    }
    case 'get_hooks_listing': {
      const events = rows(value.events, row => str(row.name) && str(row.summary) && num(row.hookCount) !== undefined
        ? { name: row.name, summary: row.summary, hookCount: row.hookCount,
          ...pick(row, ['supportsMatcher'], bool) } : null)
      const hooks = rows(value.hooks, row => str(row.event) && str(row.matcher) && str(row.sourceLabel) && str(row.type)
        ? { event: row.event, matcher: row.matcher, sourceLabel: row.sourceLabel, type: row.type,
          // displayText can be an HTTP URL (including URL userinfo), shell
          // command or prompt. The terminal may render it; Web does not.
          ...pick(row, ['disabled'], bool) } : null)
      return events && hooks ? { events, hooks } : null
    }
    case 'mcp_status': {
      const mcpServers = rows(value.mcpServers, server)
      return mcpServers ? { mcpServers } : null
    }
    case 'reload_plugins': {
      const commands = rows(value.commands, command)
      const plugins = rows(value.plugins, row => str(row.name) ? { name: row.name, ...pick(row, ['source'], str) } : null)
      const mcpServers = rows(value.mcpServers, server)
      return commands && plugins && mcpServers && num(value.error_count) !== undefined
        ? { commands, plugins, mcpServers, error_count: value.error_count } : null
    }
    case 'get_settings': {
      const applied = record(value.applied)
      return applied && str(applied.model) ? { applied: { model: applied.model,
        ...(str(applied.effort) !== undefined || applied.effort === null ? { effort: applied.effort } : {}) } } : null
    }
    case 'get_usage': {
      const session = record(value.session)
      if (!session) return null
      const fields = ['total_cost_usd', 'total_api_duration_ms', 'total_duration_ms', 'total_lines_added', 'total_lines_removed'] as const
      if (fields.some(key => num(session[key]) === undefined)) return null
      return { session: pick(session, fields, num) }
    }
    case 'get_session_cost': return str(value.text) !== undefined ? { text: value.text } : null
    case 'get_binary_version': return str(value.version) !== undefined ? { version: value.version } : null
    case 'list_models': {
      const models = rows(value.models, row => str(row.value) && str(row.displayName)
        ? { value: row.value, displayName: row.displayName, ...pick(row, ['description'], str), ...pick(row, ['disabled'], bool) } : null)
      return models ? { models } : null
    }
    case 'background_tasks': return { ...pick(value, ['backgrounded'], bool) }
    case 'stop_task': return {}
    case 'rewind_files': {
      if (bool(value.canRewind) === undefined) return null
      return { canRewind: value.canRewind,
        ...pick(value, ['filesChanged'], stringArray), ...pick(value, ['insertions', 'deletions'], num),
        ...(request.dry_run ? pick(value, ['error'], str) : {}) }
    }
    case 'local_public_diff': return projectPublicDiffResult(value)
    case 'local_public_doctor': {
      if (!str(value.installationType) || !str(value.version) || !str(value.autoUpdates)) return null
      const warnings = rows(value.warnings, row => str(row.issue) && str(row.fix)
        ? { issue: row.issue, fix: row.fix } : null)
      const ripgrep = record(value.ripgrep)
      return warnings && ripgrep && bool(ripgrep.working) !== undefined && str(ripgrep.mode)
        ? { installationType: value.installationType, version: value.version, autoUpdates: value.autoUpdates,
          ...pick(value, ['hasUpdatePermissions'], bool), ...pick(value, ['packageManager'], str),
          ripgrep: { working: ripgrep.working, mode: ripgrep.mode }, warnings } : null
    }
    case 'local_public_checkpoints': {
      if (bool(value.enabled) === undefined) return null
      const checkpoints = rows(value.checkpoints, row => nonempty(row.messageId) && str(row.timestamp) !== undefined && str(row.label) !== undefined
        ? {messageId:row.messageId, timestamp:row.timestamp, label:row.label} : null)
      return checkpoints ? {enabled:value.enabled,checkpoints} : null
    }
    case 'local_public_tasks': {
      const tasks = rows(value.tasks, row => str(row.id) && str(row.type) && str(row.description) &&
        ['pending', 'running', 'completed', 'failed', 'killed'].includes(String(row.status)) && num(row.startTime) !== undefined
        ? { id: row.id, type: row.type, status: row.status, description: row.description,
          startTime: row.startTime, ...pick(row, ['endTime'], num), ...pick(row, ['toolUseId'], str) } : null)
      return tasks ? { tasks } : null
    }
    case 'local_public_export': return str(value.filename) !== undefined && str(value.content) !== undefined
      ? { filename: value.filename, content: value.content } : null
    case 'local_public_branch': return str(value.sessionId) && str(value.title)
      ? { sessionId: value.sessionId, title: value.title } : null
    case 'local_public_tag': return str(value.tag) !== undefined
      ? { tag: value.tag, ...pick(value, ['removed', 'confirmationRequired'], bool) } : null
    case 'local_public_memory':
      if (request.action === 'list') {
        const files = rows(value.files, row => str(row.id) && str(row.type) && str(row.label) && bool(row.exists) !== undefined
          ? { id: row.id, type: row.type, label: row.label, exists: row.exists } : null)
        return files ? { files } : null
      }
      if (request.action === 'read') return str(value.id) && str(value.content) !== undefined && str(value.contentHash) && bool(value.redacted) !== undefined
        ? { id: value.id, content: value.content, contentHash: value.contentHash, redacted: value.redacted } : null
      return str(value.id) && str(value.contentHash) && value.written === true
        ? { id: value.id, contentHash: value.contentHash, written: true } : null
  }
}
