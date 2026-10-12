import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js'
import { isEnvDefinedFalsy, isEnvTruthy } from '../../utils/envUtils.js'
import { textCommand } from '../noninteractive/types.js'
// Ule = explicit env ?? tengu_plugin_hooks_modules (Fcn() === false).
export function isPluginTypesEnabled(): boolean {
  const value = process.env.CLAUDE_CODE_ENABLE_FUNCTION_HOOKS
  return value !== undefined && (isEnvTruthy(value) || isEnvDefinedFalsy(value))
    ? isEnvTruthy(value) : getFeatureValue_CACHED_MAY_BE_STALE('tengu_plugin_hooks_modules', false)
}
export default textCommand('plugin-types', "Write claude-code.d.ts, claude-code-plugins.d.ts and claude-code-mcp.d.ts: the plugin API's TypeScript declarations, the enabled plugins' type contracts and the inputs of the connected MCP tools, for typing a hooks module against this session", () => import('./plugin-types.js'), { argumentHint: '[dir]', isEnabled: isPluginTypesEnabled })
