import {createModsRegistryOwner287} from './officialModsRegistryOwner287/native.js'
import {getExecutionSession287} from '../../services/context/execution287.js'

// One original host-keyed WeakMap for all production Mods consumers. Never
// instantiate an owner inside an availability or lifecycle factory.
export const modsRegistryOwner287 = createModsRegistryOwner287({
  executionContext: getExecutionSession287,
})
