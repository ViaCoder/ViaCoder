import type { LocalCommandCall } from '../../types/command.js'
import { AGENT_COLORS } from '../../tools/AgentTool/agentColorManager.js'
import { call as setColor } from './color.js'
// chunk-nhyng741.js:a -> chunk-x0jvx26q.js:ykn. Keep existing persistence customizations.
export const call: LocalCommandCall = async (args, context) => {
  let value: string | undefined
  await setColor(message => { value = message }, context,
    args.trim() || AGENT_COLORS[Math.floor(Math.random() * AGENT_COLORS.length)]!)
  if (value === undefined) throw new Error('Color command completed without a result')
  return { type: 'text', value }
}
