import {Option,type Command} from '@commander-js/extra-typings'
import {registerAgentsCommand287} from './registration.js'
import {createPublicSubcommandWrappers287,type PublicSubcommandHandlesReader287} from '../publicSubcommandRegistration287.js'
/** Original Ti parent optsWithGlobals and original startup-handle argument order. */
export function registerPublicAgentsCommand287(program:Command,read:PublicSubcommandHandlesReader287):void {
  const {withHandles}=createPublicSubcommandWrappers287(read)
  registerAgentsCommand287(program,Option,withHandles,()=>import('../handlers/agents.js'))
}
