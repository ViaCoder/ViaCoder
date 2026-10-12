import type { LocalCommandCall } from '../../types/command.js'
import { call as rename } from './rename.js'
// chunk-186r3vcx.js:o -> BAn(args, context, false). Preserve local history customization.
export const call: LocalCommandCall = async (args, context) => {
  let value: string | undefined
  await rename(message => { value = message }, context, args)
  if (value === undefined) throw new Error('Rename command completed without a result')
  return { type: 'text', value }
}
