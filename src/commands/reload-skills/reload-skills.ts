import { getCwd } from '../../utils/cwd.js'
import { clearCommandsCache, getSkillToolCommands } from '../../commands.js'
import type { LocalCommandCall } from '../../types/command.js'
import { resetSentSkillNames } from '../../utils/attachments.js'
import { skillChangeDetector } from '../../utils/skills/skillChangeDetector.js'
import { plural } from '../../utils/stringUtils.js'

// Official chunk-zc5560ge.js:call; no hidden execution or model requests.
export const call: LocalCommandCall = async () => {
  const cwd = getCwd()
  const before = await getSkillToolCommands(cwd)
  const oldNames = new Set(before.map(command => command.name))
  clearCommandsCache()
  resetSentSkillNames()
  const after = await getSkillToolCommands(cwd)
  const newNames = new Set(after.map(command => command.name))
  skillChangeDetector.notifyChange()
  const added = after.filter(command => !oldNames.has(command.name)).length
  const removed = before.filter(command => !newNames.has(command.name)).length
  const changes = [added ? `${added} added` : '', removed ? `${removed} removed` : ''].filter(Boolean).join(', ') || 'no changes'
  return {type: 'text', value: `Reloaded skills: ${after.length} ${plural(after.length, 'skill')} available (${changes})`}
}
