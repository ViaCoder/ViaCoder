import { clearCommandsCache } from '../../commands.js'
import {getCommandDiscovery287} from '../../utils/commandDiscovery287.js'
import {getPrintHostSource287} from '../printOwnership287/publicHostRuntime287.js'
import {createReloadSkillsProjection287, type ReloadSkillsProjectionPorts287} from './reloadSkills287Native.js'
import type { Command } from '../../types/command.js'
import { getCommandName } from '../../types/command.js'
import { getCwd } from '../../utils/cwd.js'
import { isBareMode } from '../../utils/envUtils.js'
import { resetSentSkillNames } from '../../utils/attachments.js'
import { clearOutputStyleCaches } from '../../outputStyles/loadOutputStylesDir.js'
import { clearAllOutputStylesCache, getAllOutputStyles } from '../../constants/outputStyles.js'
import { commandMode, isBuiltinCommand, projectSdkCommand, type CommandProjectionOptions, type SdkCommand } from './commandProjection.js'

/** Original Yd/oi on the existing print owner; no second command table or
 * publication fingerprint. Resolution is the original refresh barrier. */
export interface SkillsReloadOwner {
  refreshCommands(): Promise<void>
  currentCommands(): Command[]
  mcpCommands(): Command[]
  storageV5?: unknown
  cwd?(): string
}

/** Compatibility helper for existing direct callers. Production reload uses the complete 287 uv below. */
export function projectReloadedSkills(commands: readonly Command[], options: CommandProjectionOptions = {}): SdkCommand[] {
  if (isBareMode()) return []
  return commands.filter(command => {
    if (command.type !== 'prompt' || command.disableModelInvocation) return false
    const mode = commandMode(command, options)
    return mode !== 'off' && mode !== 'user-invocable-only' &&
      (command.source === 'builtin' || command.loadedFrom === 'bundled' || command.loadedFrom === 'skills' ||
        command.loadedFrom === 'commands_DEPRECATED' || command.hasUserSpecifiedDescription || !!command.whenToUse)
  }).map(command => {
    const {builtin: _builtin, ...row} = projectSdkCommand(command, options)
    // Official Zs checks the callable name against the active table. A colliding
    // user row must never acquire the built-in marker from its name alone.
    const callable = commands.find(candidate => candidate.name === row.name) ??
      commands.find(candidate => getCommandName(candidate) === row.name || candidate.aliases?.includes(row.name))
    return {...row, ...(callable && isBuiltinCommand(callable, options) && isBuiltinCommand(command, options) ? {builtin: true as const} : {})}
  })
}

export async function handleReloadSkills(owner: SkillsReloadOwner): Promise<{skills: SdkCommand[]}> {
  // Public local disk path only. No hosted skills download or plugin install.
  clearCommandsCache()
  resetSentSkillNames()
  await owner.refreshCommands()
  // uv is print-local, not a module export. Reuse its complete raw body with
  // canonical imported closures; l2 resolves synced-skill collisions with MCP
  // and dynamic skills, and Is checks builtin identity against the live Ro.
  const uv = createReloadSkillsProjection287({
    l2: getPrintHostSource287('chunk-mphp7acd.js', 'l2') as ReloadSkillsProjectionPorts287['l2'],
    mcn: getPrintHostSource287('chunk-mphp7acd.js', 'mcn') as ReloadSkillsProjectionPorts287['mcn'],
    Is: getPrintHostSource287('chunk-09m4fzsj.js', 'Is') as ReloadSkillsProjectionPorts287['Is'],
    cLt: getPrintHostSource287('chunk-mphp7acd.js', 'cLt') as ReloadSkillsProjectionPorts287['cLt'],
  })
  return uv(
    await getCommandDiscovery287().skillTool(owner.cwd?.() ?? getCwd(), owner.storageV5),
    owner.mcpCommands(), owner.currentCommands(),
  )
}

export async function handleReloadOutputStyles(cwd = getCwd()): Promise<{available_output_styles: string[]}> {
  clearOutputStyleCaches()
  clearAllOutputStylesCache()
  return {available_output_styles: Object.keys(await getAllOutputStyles(cwd))}
}
