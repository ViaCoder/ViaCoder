import type { Command } from '../../types/command.js'
import { getIsNonInteractiveSession } from '../../bootstrap/state.js'
import { isEnvTruthy } from '../../utils/envUtils.js'
import { isUltrareviewEnabled } from '../review/ultrareviewEnabled.js'
import { textCommand, type TextCommand } from './types.js'
import autocompact from '../autocompact/index.js'
import skillDoctor from '../skill-doctor/index.js'
import pluginTypes from '../plugin-types/index.js'
import { adaptNonInteractiveCommand } from './adapt.js'

// Official Ae && SUo: add-dir's text twin is a remote-entrypoint capability,
// not an unconditional SDK directory grant. chunk-94ks0f2h.js:C/SUo.
export function supportsTextAddDir(entrypoint = process.env.CLAUDE_CODE_ENTRYPOINT, child = false, claudeCode = isEnvTruthy(process.env.CLAUDECODE)): boolean {
  return !!entrypoint && ['remote','remote_projects','remote_desktop','remote_mobile','ssh-remote'].includes(entrypoint) && !child && !claudeCode
}
export const nonInteractiveCommands: readonly TextCommand[] = [
  textCommand('add-dir','Add a new working directory',() => import('../add-dir/add-dir-noninteractive.js'),{argumentHint:'<path>',thinClientDispatch:'post-text',isEnabled:() => supportsTextAddDir()}),
  textCommand('agents','(removed) Ask Claude to create/manage subagents, or edit .claude/agents/',() => import('../agents/agents-noninteractive.js'),{isHidden:true,thinClientDispatch:'post-text'}),
  textCommand('color','Set the prompt bar color for this session',() => import('../color/color-noninteractive.js'),{terminalOriented:true}),
  textCommand('config','Set a setting by key',() => import('../config/config-noninteractive.js'),{aliases:['settings'],argumentHint:'key=value'}),
  textCommand('effort','Set effort level for model usage',() => import('../effort/effort-noninteractive.js')),
  textCommand('exit','Exit the CLI',() => import('../exit/exit-noninteractive.js'),{terminalOriented:true}),
  textCommand('fast','Toggle fast mode',() => import('../fast/fast-noninteractive.js'),{argumentHint:'[on|off]'}),
  textCommand('mcp','Manage MCP servers',() => import('../mcp/mcp-noninteractive.js'),{argumentHint:'[reconnect|enable|disable [<server>|all]]',thinClientDispatch:'post-text'}),
  textCommand('model','Set the AI model for Claude Code',() => import('../model/model-noninteractive.js'),{argumentHint:'<model>'}),
  textCommand('output-style','List output styles or switch to one',() => import('../output-style/output-style-noninteractive.js'),{argumentHint:'[style]'}),
  textCommand('rename','Rename the current conversation',() => import('../rename/rename-noninteractive.js'),{aliases:['name'],argumentHint:'[name]'}),
  // 2.1.287 chunk-rn3w8nt5.js:w is supportsNonInteractive + post-text.
  textCommand('recap','Generate a one-line session recap now',() => import('../recap/recap.js'),{thinClientDispatch:'post-text'}),
  textCommand('ultrareview','Launch a cloud review',() => import('../review/ultrareview-noninteractive.js'),{isEnabled:isUltrareviewEnabled}),
  textCommand('usage',"Show session cost, plan usage, and what's contributing to your limits",() => import('../usage/usage-noninteractive.js'),{aliases:['cost','stats']}),
]
/** Call BEFORE filtering by auth/isEnabled/type. Existing interactive definitions stay untouched. */
export function selectNonInteractiveCommands(commands: readonly Command[], nonInteractive = getIsNonInteractiveSession()): Command[] {
  if (!nonInteractive) return [...commands]
  const replacements = new Map(nonInteractiveCommands.map(command => [command.name,command]))
  const seen = new Set<string>()
  return commands.flatMap(command => {
    const name = command.name === 'cost' || command.name === 'stats' ? 'usage' : command.name
    const selected = replacements.get(name)
    // Do not collapse unrelated same-name twins (context, extra-usage, etc.).
    if (!selected) return [adaptNonInteractiveCommand(command, nonInteractive)]
    if (seen.has(selected.name)) return []
    seen.add(selected.name)
    return [selected]
  })
}
/** Gate checks belong to the normal command loader; never enable function hooks by registering types. */
export function getExtensionCommands(): Command[] { return [autocompact,skillDoctor,pluginTypes] }
