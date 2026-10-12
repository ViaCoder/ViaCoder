import type {Command} from '../types/command.js'
import {createMetadataComplete287,createRegistryFactoriesComplete287} from './officialPublicCommandDiscovery287/completions.js'
import {commandRegistrationMetadata287} from './officialPublicCommandDiscovery287/registration.js'
import {publicCommandProducerPorts287,publicCommandSourcePort287,importCommandCompletionModule287} from './commandCompletionProducers287.js'
let source:Record<string,Command>|undefined
const executable=new Set(['load','getPromptForCommand','fleetHostCall'])
// Original P fields only; executable closures and accepted C handlers stay on
// their existing object. A missing original field must not retain an old P gate.
const metadataKeys=['aliases','description','argumentHint','menuDescription','immediate','isEnabled','isHidden','availability','requires','thinClientDispatch','supportsNonInteractive','terminalOriented','advertisedOnHostedSessions','policyGate','userFacingName','allowInlineExecution','argumentNames','argNames','allowedTools','disallowedTools','getAllowedTools','contentLength','disableModelInvocation','disableNonInteractive','effort','progressMessage','source','getArgumentCompletions']
export function getCompletePublicCommandMetadata287(existing:Command[]):Record<string,Command>{
 if(source)return source
 source=createMetadataComplete287({...publicCommandProducerPorts287('metadata'),
  importCommandModule287:importCommandCompletionModule287,
  handler:(symbol:string,property:string)=>{
   if(symbol==='cBe'&&property==='load')return ()=>import('../commands/auto-mode-setup/noninteractive287.js')
   if(symbol==='KYo'&&property==='load')return ()=>import('../commands/voice/voice.js')
   if(symbol==='wYt'&&property==='load')return async()=>
    (await import('../commands/import/official287/runtime.js')).getImportTextModule287()
   if(symbol==='itr'&&property==='load')return ()=>import('./officialWorkflowCarriers287/remote.js')
   if(symbol==='atr'&&property==='load')return ()=>import('./officialWorkflowCarriers287/event.js')
   if(symbol==='C8t'&&property==='load')return ()=>import('../commands/subtask/official287.js')
   if(symbol==='EYt'&&property==='load')return ()=>import('../commands/design/consent287.js')
   if(symbol==='CYt'&&property==='load')return ()=>import('../commands/design/revoke287.js')
   if(symbol==='_We'&&property==='load')return ()=>import('../commands/usage-credits/noninteractive287.js')
   if(symbol==='MWe'&&property==='load')return ()=>import('../commands/focus/focus-noninteractive287.js')
   if(symbol==='L4o'&&property==='getPromptForCommand')return (require('../commands/team-onboarding/teamOnboarding287.js') as typeof import('../commands/team-onboarding/teamOnboarding287.js')).getTeamOnboardingCommand287().getPromptForCommand
   if(symbol==='Xer'&&property==='load')return ()=>import('../commands/radio/radio287.js')
   const fields=commandRegistrationMetadata287.find(row=>row.symbol===symbol)?.fields
   const owner=fields&&existing.find(c=>c.name===fields.name&&c.type===fields.type)
   return owner?.[property as keyof Command]
  },
 })
 return source
}
export function bindCompletePublicCommandMetadata287(existing:Command[]):Record<string,Command>{
 const original=getCompletePublicCommandMetadata287(existing),bound:Record<string,Command>={}
 for(const [symbol,object]of Object.entries(original)){
  const owner=existing.find(c=>c.name===object.name&&c.type===object.type)
  if(!owner){bound[symbol]=object;continue}
  for(const field of metadataKeys)if(!Object.hasOwn(object,field))delete (owner as unknown as Record<string,unknown>)[field]
  for(const [field,descriptor]of Object.entries(Object.getOwnPropertyDescriptors(object))){
   if(field==='load'&&(symbol==='itr'||symbol==='atr')){Object.defineProperty(owner,field,descriptor);continue}
   if(executable.has(field))continue
   Object.defineProperty(owner,field,descriptor)
  }
  bound[symbol]=owner
 }
 return bound
}

let registryFactories:ReturnType<typeof createRegistryFactoriesComplete287>|undefined
export function getPublicRegistryFactories287(){
 return registryFactories??=createRegistryFactoriesComplete287({
  dM:publicCommandSourcePort287('chunk-1f6qhw1r.js','dM'),
  sRe:publicCommandSourcePort287('chunk-1f6qhw1r.js','sRe'),
 })
}
