import {resolve} from 'node:path'
import type {Command} from '../../commands.js'
import {DEFAULT_OUTPUT_STYLE_NAME, getAllOutputStyles} from '../../constants/outputStyles.js'
import type {SDKControlInitializeResponse} from '../../entrypoints/sdk/controlTypes.js'
import type {AppState} from '../../state/AppState.js'
import {getActiveAgentsFromList, type AgentDefinition} from '../../tools/AgentTool/loadAgentsDir.js'
import {getAccountInformation} from '../../utils/auth.js'
import {getCwd} from '../../utils/cwd.js'
import {getClaudeConfigHomeDir} from '../../utils/envUtils.js'
import {getFastModeState} from '../../utils/fastMode.js'
import {getAPIProvider, isFirstPartyAnthropicBaseUrl} from '../../utils/model/providers.js'
import {toExternalPermissionMode} from '../../utils/permissions/PermissionMode.js'
import {getSessionState} from '../../utils/sessionState.js'
import {getSettings_DEPRECATED} from '../../utils/settings/settings.js'
import {projectSdkCommands} from './commandProjection.js'
import {handleListModels} from './sessionQueries.js'
import {projectInitializeModelAvailability} from './initializeModels.js'

/** Shared first/repeated handshake projection, from official Jc/tl/$kr.
 * The wider Jc capability/remote/claim fields remain separately tracked; no
 * placeholder availability flags are advertised for unimplemented hosts.
 */
export async function buildInitializeResponse(
  getCommands: () => Command[],
  getAgents: () => AgentDefinition[],
  getAppState: () => AppState,
  getModel: () => string | undefined,
  hooksApplied?: boolean,
): Promise<SDKControlInitializeResponse> {
  const outputStyle = getSettings_DEPRECATED()?.outputStyle || DEFAULT_OUTPUT_STYLE_NAME
  const styles = await getAllOutputStyles(getCwd())
  const account = getAccountInformation()
  const state = getAppState()
  const picker = projectInitializeModelAvailability(handleListModels().models, {
    entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT,
    provider: getAPIProvider(),
    firstPartyBaseUrl: isFirstPartyAnthropicBaseUrl(),
  })
  return {
    commands: projectSdkCommands(getCommands()),
    agents: getActiveAgentsFromList(getAgents()).map(agent => ({
      name: agent.agentType, description: agent.whenToUse, model: agent.model,
    })),
    output_style: outputStyle,
    available_output_styles: Object.keys(styles),
    user_output_styles_dir: resolve(getClaudeConfigHomeDir(), 'output-styles'),
    ...picker,
    account: {email: account?.email, organization: account?.organization,
      subscriptionType: account?.subscription, tokenSource: account?.tokenSource,
      apiKeySource: account?.apiKeySource, apiProvider: getAPIProvider()},
    pid: process.pid,
    current_permission_mode: toExternalPermissionMode(state.toolPermissionContext.mode),
    hooks_applied: hooksApplied,
    fast_mode_state: getFastModeState(getModel() ?? null, state.fastMode),
    session_state: getSessionState(),
  }
}
