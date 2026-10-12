import {createCommandCapability287,createCommandDispatch287,originalCommandRequirements287} from './officialPublicCommandCapability287/native.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import type {CommandRegistry287} from './officialPublicCommandCapability287/native.js'
const auth=()=>require('./auth.js') as typeof import('./auth.js')
// Resolve the already-existing complete ro owner, never instantiate another
// skill registry or copy commandsOffHere / a built-in cache into this adapter.
export function getCommandRegistry287():CommandRegistry287 {
 return (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().commandRegistry()
}
export const commandCapability287=createCommandCapability287({
 ro:getCommandRegistry287,ft:()=>auth().isClaudeAISubscriber(),h8:()=>auth().isUsing3PServices(),
 Js:()=> (require('./model/providers.js') as typeof import('./model/providers.js')).isFirstPartyRequestEndpoint(),
 Mh:()=>getExecutionSession287().host.launchOptions.disableSlashCommands(),
 KIo:()=> (require('../commands.js') as typeof import('../commands.js')).buildBuiltinCommandTable287(),
})
export const commandDispatch287=createCommandDispatch287({zvn:policy=>
 (require('../services/policyLimits/index.js') as typeof import('../services/policyLimits/index.js')).isCommandPolicyAllowed287(policy)})

// Restore only source-declared requirements on already-registered public
// commands. Preserve their identity, loaders, qualification and C behavior;
// name+type prevents Ink metadata from leaking to the print twin.
export function bindCommandRequirements287(commands:import('../types/command.js').Command[]){
 for(const command of commands){const source=originalCommandRequirements287.find(row=>row.name===command.name&&row.type===command.type);if(source)command.requires??={...source.requires}}
 return commands
}
