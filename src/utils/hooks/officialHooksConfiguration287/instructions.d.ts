import type {RegisteredHooks287} from './registry.js'
import type {HooksSettings} from '../../settings/types.js'
export interface InstructionsPredicatePorts287 {
  snapshot():HooksSettings|null
  managedOnly():boolean
  agentHooks():HooksSettings|undefined
  registered():RegisteredHooks287|null|undefined
  mods():{loadedModules:readonly {hooks(name:string):unknown;matcherFor(name:string):unknown}[]}
  types:typeof import('node:util/types')
}
export function createInstructionsHookPredicate287(ports:InstructionsPredicatePorts287):{hasInstructions():boolean}
