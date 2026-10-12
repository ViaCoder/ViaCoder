import {getListAgentsCommand287} from './listAgents287/runtime.js'
import {getBriefCommand287,getGoalNonInteractiveCommand287,getGoalInteractiveRegistration287,getWebSetupRegistration287} from './commandCallbackWriters287.js'
import {createAuthQualification287,createLoginRegistration287,createManagedRemote287,createRemoteLabel287,createAnalyticsToken287,createUpsell287,createRegistrationGates287} from './officialPublicCommandDiscovery287/native.js'
import {bindCompletePublicCommandMetadata287,getPublicRegistryFactories287} from './commandRegistrationComplete287.js'
import {getSettingsCacheStore287} from './settings/settingsCache.js'
import type {Command} from '../types/command.js'
import {createRegistrationTable287,commandRegistrationSlots287,commandRegistrationMetadata287} from './officialPublicCommandDiscovery287/registration.js'
import {getIsNonInteractiveSession} from '../bootstrap/state.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {isEnvTruthy} from './envUtils.js'
import {isUsing3PServices,isAnthropicAuthEnabled,isClaudeAISubscriber,getAuthTokenSource,getAnthropicApiKeyWithSource} from './auth.js'
import {isFirstPartyRequestEndpoint} from './model/providers.js'
import {logEvent} from '../services/analytics/index.js'
import {authEnvironment} from './authEnvironment.js'
import {nonInteractiveCommands} from '../commands/noninteractive/index.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
export const excludedPublicCommandEntrances287:Readonly<Record<string,string>>=Object.freeze({
 'setup-bedrock':'R04: AWS/Bedrock-specific entrance is excluded',
 'setup-vertex':'R04: Google/Vertex-specific entrance is excluded',
})
export function assertPublicCommandEntrance287(name:string):void {
 const reason=excludedPublicCommandEntrances287[name]
 if(reason)throw new ReferenceError(`Command ${name} is unavailable: ${reason}`)
}
// Existing executable definitions are the hand-in boundary: do not clone their
// permission/auth/cache owners. Source literal metadata is installed on them.
export function bindPublicRegistrationMetadata287(commands:Command[]):Command[]{
 for(const command of commands){const source=commandRegistrationMetadata287.find(row=>row.fields.name===command.name&&row.fields.type===command.type);if(!source)continue
  for(const [key,value] of Object.entries(source.fields)){
   if(key==='name'||key==='type')continue
   const existing=Object.getOwnPropertyDescriptor(command,key)
   // Keep live producer-owned getters (eligibility, current model, UI surface).
   if(existing?.get)continue
   Object.defineProperty(command,key,{value,writable:true,enumerable:true,configurable:true})
  }
 }
 return commands
}
let definitions:ReturnType<typeof createRegistrationTable287>|undefined
export function getPublicRegistrationSource287(){
 if(definitions)return definitions
 const old=(require('../commands.js') as typeof import('../commands.js')).getExistingBuiltinDefinitions287()
 const commands=bindPublicRegistrationMetadata287([...old,...nonInteractiveCommands])
 const lookup=(name:string,type?:string)=>commands.find(c=>c.name===name&&(!type||c.type===type))
 const metadata=bindCompletePublicCommandMetadata287(commands)
 // Source-declared metadata without a published loader is preserved as such,
 // never converted into a fabricated successful command or private service.
 for(const object of Object.values(metadata))if(!lookup(object.name,object.type))commands.push(object)
 const importUi=lookup('import','local-jsx')
 if(importUi?.type==='local-jsx')importUi.load=async()=>
  (await import('../commands/import/official287/runtime.js')).getImportJsxModule287()
 // Source i4 uses deferred JSX modules; the portable build hands in their
 // complete original modules on the same metadata object, without text twins.
 for(const name of ['autocompact','bug','pro-trial-expired','release-notes','advisor','artifacts','auto-mode-setup','cloud-plugins','autofix-pr','ultraplan'] as const){
  const command=commands.find((row)=>row.name===name&&row.type==='local-jsx')
  if(command?.type==='local-jsx'&&!command.load)command.load=async()=>
   (await import('./hotSessionController287/runtime.js')).loadOriginalDialogCommand287(name)
 }
 const creditsUi=commands.find(row=>row.name==='usage-credits'&&row.type==='local-jsx')
 if(creditsUi?.type==='local-jsx'&&!creditsUi.load)creditsUi.load=()=>import('../commands/usage-credits/official287.js')
 const ports:Record<string,unknown>={}
 for(const slot of commandRegistrationSlots287){
  if(slot.fields)ports[slot.symbol]=excludedPublicCommandEntrances287[slot.fields.name]?null:(metadata[slot.target??slot.symbol]??lookup(slot.fields.name,slot.fields.type))
  else if('value'in slot)ports[slot.symbol]=slot.value
 }
 const commandNames:Record<string,string>={t4t:'security-review',q8t:'low-priority',V8t:'limit-reset',TWe:'claim-credit',Mtr:'web-setup',xtr:'brief',nXt:'remote-control',e4:'recap',Atr:'goal',JWe:'goal',Ptr:'workflows',ife:'list-agents'}
 for(const [symbol,name]of Object.entries(commandNames))ports[symbol]=lookup(name,symbol==='JWe'?'local':undefined)
 const authQualification=createAuthQualification287({Vn:isAnthropicAuthEnabled,ft:isClaudeAISubscriber,mb:getAnthropicApiKeyWithSource})
 const loginRegistration=createLoginRegistration287({...authQualification,a:authEnvironment})
 ports.xYt=()=>{
  const owner=lookup('login');if(!owner)return owner
  // Preserve the executable loader. Qualification, live description and the
  // public fleet callback are the complete original xYt body.
  Object.defineProperties(owner,Object.getOwnPropertyDescriptors(loginRegistration.createLogin()))
  return owner
 };ports.RYt=()=>{
  const command=getPublicRegistryFactories287().createDesignLogin() as Extract<Command,{type:'local-jsx'}>
  // Original RYt creates bare metadata; publish its deferred client on that object.
  command.load=async()=> (await import('./hotSessionController287/runtime.js')).loadOriginalDialogCommand287('design-login')
  return command
 }
 // These are published import registrations, not feature-build null slots.
 // Bind their complete source qualification to the already existing owners.
 ports.ife=getListAgentsCommand287()
 ports.xtr=getBriefCommand287()
 ports.JWe=getGoalNonInteractiveCommand287()
 const goalUiOwner=lookup('goal','local-jsx')
 if(goalUiOwner){
  Object.defineProperties(goalUiOwner,Object.getOwnPropertyDescriptors(getGoalInteractiveRegistration287()))
  // Original Atr is bare JSX metadata. Its text twin is JWe, not the old
  // compatibility loadNonInteractive that would shadow it during discovery.
  if('loadNonInteractive' in goalUiOwner)delete goalUiOwner.loadNonInteractive
  ports.Atr=goalUiOwner
 }
 const webOwner=lookup('web-setup')
 if(webOwner){Object.defineProperties(webOwner,Object.getOwnPropertyDescriptors(getWebSetupRegistration287()));ports.Mtr=webOwner}
 // Original external build null/empty slots are source data, not fabricated
 // backend/account flags. Absent excluded handlers remain unavailable.
 for(const name of ['n4','jWe','qWe','VWe','rfe','$We','JY','cfe'])ports[name]=null
 ports.Itr=[]
 const managedRemote=createManagedRemote287({iO:()=>getSettingsCacheStore287().mergedSettings})
 ports.B8t=createUpsell287({...managedRemote,...createRemoteLabel287({}),...createAnalyticsToken287({}),
  i:logEvent,Rc:getAuthTokenSource,Gp:getAnthropicApiKeyWithSource,Ce:getIsNonInteractiveSession,
  k:getFeatureValue_CACHED_MAY_BE_STALE,Js:isFirstPartyRequestEndpoint,
  c2e:authQualification.c2e,ft:isClaudeAISubscriber,
 }).B8t
 Object.assign(ports,{a:authEnvironment,Le:isEnvTruthy,h8:isUsing3PServices,Ce:getIsNonInteractiveSession,
  ...createRegistrationGates287({a:authEnvironment,iO:()=>getSettingsCacheStore287().mergedSettings}),
  v0:()=>getFeatureValue_CACHED_MAY_BE_STALE('tengu_lantern_prism',false)||isEnvTruthy(authEnvironment.CLAUDE_CODE_LANTERN_PRISM),
  bD:()=>getExecutionSession287().surfaceCapabilities.caps().workspace==='remote',uo:()=>getExecutionSession287().surfaceCapabilities.caps(),
  E8t:lookup('fork'),T8t:lookup('fork'),C8t:lookup('subtask'),Otr:lookup('background'),Dtr:lookup('detach'),HWe:lookup('daemon'),Aje:lookup('skill-doctor','local-jsx'),Xue:lookup('skill-doctor','local'),AYt:lookup('logout'),
 })
 definitions=createRegistrationTable287(ports)
 return definitions
}
export function buildPublicBuiltinDefinitions287(existing:Command[]):Command[]{
 const source=getPublicRegistrationSource287().register().filter((c):c is Command=>c!==undefined&&c!==null)
 const identity=new Set(source)
 // C handlers not in the published registry (computer use, full history and
 // internal tools) are preserved. update remains disabled, never reintroduced.
 return [...source.filter(c=>c.name!=='update'&&!excludedPublicCommandEntrances287[c.name]),...bindPublicRegistrationMetadata287(existing).filter(c=>!identity.has(c)&&c.name!=='update'&&!excludedPublicCommandEntrances287[c.name])]
}
