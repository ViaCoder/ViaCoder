import type { Command } from '../../commands.js'
import { getMainLoopModel, renderModelName } from '../../utils/model/model.js'
import { createModelCommandRegistration287 } from './officialRegistration287/native.js'

export default Object.assign(createModelCommandRegistration287({ rt: getMainLoopModel, As: renderModelName }), {
  load: () => import('./model.js'),
}) satisfies Command
