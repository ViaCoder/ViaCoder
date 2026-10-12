import type {AppState} from '../state/AppState.js'
import type {Root} from '../ink.js'
import {createRoot} from '../ink.js'
import type {ExecutionSession287} from '../services/context/officialExecutionOwners287/native.js'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getTerminalInput287,getTerminalRenderOptions287} from '../utils/terminalInput287.js'
import {createExistingCloudAttachCaller287,createExistingCloudPrintCaller287,createHeadlessCloudServingCaller287,type PreparedHeadlessCloud287} from './printOwnership287/publicHostNative.js'
import {logEvent} from '../services/analytics/index.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {getIsNonInteractiveSession} from '../bootstrap/state.js'
import {exitWithError} from '../interactiveHelpers.js'
import {gracefulShutdown} from '../utils/gracefulShutdown.js'
import {errorMessage} from '../utils/errors.js'
import type {ToolUseContext} from '../Tool.js'
import type {PreparedPoolHeadless287,PreparedEnvironmentInteractive287,EnvironmentActionOptions287} from './environmentCloud287/types.js'

const source=(file:string)=>getOriginalModsLifecycle287().clearSourceModule287(file)
/** Original goo captures these before reading stdin/setup. Both readers are
 * from the installed trust owner; no synthetic trust or second context. */
export function snapshotEnvironmentTrust287(){
 return {wasTrustedBeforeSetup:(source('chunk-nankzm0s.js').ds as ()=>boolean)(),
  wasPersistedTrustedBeforeSetup:(source('chunk-nankzm0s.js').Pm as ()=>boolean)()}
}
export function environmentDefaultProactivity287():string{
 const value=source('chunk-09m4fzsj.js').NLt
 if(typeof value!=='string')throw Error('Original goo NLt not installed')
 return value
}
/** Original goo A producer. Experimental teams retain the original gate,
 * public initializer import, and error handling; no fabricated team state. */
export async function prepareEnvironmentSessionTeam287(options:Record<string,unknown>,storageV5:ToolUseContext['storageV5']):Promise<unknown>{
 if(!(source('chunk-zrq7rc23.js').Oo as ()=>boolean)()||getIsNonInteractiveSession()||options.agentId)return undefined
 try{
  const namespace=await getOriginalModsLifecycle287().importPublicSourceModule287('/$bunfs/root/chunk-h595p29c.js')
  return await (namespace.initializeSessionTeam as (options:undefined,storage:ToolUseContext['storageV5'])=>Promise<unknown>)(undefined,storageV5)
 }catch(error){(source('chunk-amhtwhch.js').d as (error:unknown)=>void)(error);return undefined}
}
/** Original goo Tl supplier uses its actual canonical readers. */
export function environmentPreparedMetadata287(dynamicMcpConfig:Record<string,unknown>){
 const thin=(source('chunk-bn3p37gv.js').Wn as ()=>boolean)()
 const names=Object.keys(dynamicMcpConfig)
 const plural=source('chunk-eske5nfz.js').I as (n:number,name:string)=>string
 const message=source('chunk-mphp7acd.js').Nt as (text:string,level:string)=>import('../types/message.js').Message
 return {remoteDroppedMcpMessages:thin&&names.length>0?[message(`MCP ${plural(names.length,'server')} from --mcp-config/agent frontmatter ignored — MCP runs in the remote workspace: ${names.join(', ')}`,'warning')]:[]}
}
/** Keep full, typed same-owner prepared values at the production boundary.
 * The only executor is the complete original pool arm or whole Ii. */
export async function launchPreparedEnvironment287(prepared:PreparedPoolHeadless287|PreparedEnvironmentInteractive287,options:EnvironmentActionOptions287):Promise<void>{
 const runtime=await import('./environmentCloud287/runtime.js')
 if('root'in prepared)return runtime.runPreparedEnvironmentInteractive287(prepared,options)
 return runtime.runPreparedPoolHeadless287(prepared,options)
}
/** Original lr non-pool create/print arms and their full public clients.
 * Keep the same prepared session/credentials; interactive Ii is not used. */
export async function launchPreparedHeadlessEnvironment287(prepared:import('./environmentHeadless287/types.js').PreparedEnvironmentHeadless287,options:EnvironmentActionOptions287):Promise<void>{
 return (await import('./environmentHeadless287/runtime.js')).runPreparedEnvironmentHeadless287(prepared,options)
}
export interface CloudLaunchContext287 {
 prompt?:string;sessionId?:string;outputFormat?:string;inputFormat?:string;hasSdkUrl:boolean;
 hasConnect:boolean;hasSSH:boolean;
}
export type CloudLaunch287={ok:false;error:string}|{ok:true;value:{
 teleport:string|true|null;remote:string|null;cloudAttachId:string|null;
 poolId:string|null;poolPromotedRemote:boolean;poolRef:string|null;poolOnBranch:string|null;
 correlationId:string|null;projectFlag:null;projectBrowse:null;projectForRemoteControl:boolean;
 persistentVolume:boolean;monorepo:boolean;noMonorepo:boolean;
 headlessCloud:boolean;headlessCloudPrint:boolean;serveOnly:boolean;cloudDefault:'none'|'declined'|'not_allowed'|'applied';
 forwardHomeSettings:boolean;homeSettingsConsent:'forward'|null;
}}
/** The complete public Is owns parsing, mutual exclusion and account gates.
 * No UUID regexp or account entitlement is duplicated at the CLI boundary. */
export function normalizeCloudLaunch287(options:Record<string,unknown>,context:CloudLaunchContext287):Promise<CloudLaunch287>{
 const parse=source('chunk-dgp2yyqt.js').Is as (options:Record<string,unknown>,context:CloudLaunchContext287&{
  nonInteractive:boolean;isConnectedSessionsEnabled:()=>Promise<boolean>;isViolinWoodEnabled:()=>Promise<boolean>;
  cloudPrintEnabled:boolean;cloudSessionsByDefault:boolean;cloudSessionsDeniedByOrgPolicy:()=>Promise<boolean>;
 })=>Promise<CloudLaunch287>
 return parse(options,{...context,nonInteractive:getIsNonInteractiveSession(),
  isConnectedSessionsEnabled:()=>{const read=source('chunk-09m4fzsj.js').o9e as ()=>Promise<boolean>;return read()},
  isViolinWoodEnabled:()=>{const read=source('chunk-0snr1bvc.js').XA as ()=>Promise<boolean>;return read()},
  cloudPrintEnabled:(source('chunk-py6amepj.js').Hlo as ()=>boolean)(),
  // Original fixed-287 dgp La is !1, not a locally forced entitlement.
  cloudSessionsByDefault:false,
  cloudSessionsDeniedByOrgPolicy:async()=>{
   await (source('chunk-b7yc4zs1.js').GXe as ()=>Promise<unknown>)()
   return (source('chunk-hhbs19e8.js').oFo as ()=>boolean)()
  },
 })
}

/** Exact existing-D caller; literal imports resolve in the sole canonical
 * graph. A missing public UI dependency remains a real error, not a stub. */
export async function attachExistingCloud287(input:{id:string;root:Root;session:ExecutionSession287;options:Record<string,unknown>;initialState:AppState;autoConnectIdeFlag:boolean;disableSlashCommands:boolean;storageV5?:ToolUseContext['storageV5'];credentials?:ToolUseContext['credentials']}):Promise<void>{
 const {id,root,session,options,initialState}=input
 const availability=(source('chunk-hhbs19e8.js').j_e as ()=>string|undefined)()
 if(availability)return exitWithError(root,`Error: ${availability}`,()=>gracefulShutdown(1))
 const enabled=getFeatureValue_CACHED_MAY_BE_STALE('tengu_remote_backend',false)||await (source('chunk-09m4fzsj.js').o9e as ()=>Promise<boolean>)()
 const keyboard=enabled?(source('chunk-dgp2yyqt.js').Har as (input:ReturnType<typeof getTerminalInput287>)=>'windows'|'ci'|'tty_unavailable'|undefined)(getTerminalInput287()):undefined
 if(keyboard!==undefined){
  await (source('chunk-dgp2yyqt.js').Dar as (reason:string)=>Promise<void>)(keyboard)
  return exitWithError(root,`No cloud session was created or opened: it would open in this terminal and need the keyboard.\n${(source('chunk-dgp2yyqt.js').Xro as (reason:string)=>string)(keyboard)}`,()=>gracefulShutdown(1))
 }
 if(!enabled)return exitWithError(root,'Error: Attaching to an existing cloud session is not enabled for your account.',()=>gracefulShutdown(1))
 type Ports=Parameters<typeof createExistingCloudAttachCaller287>[0]
 const load:Ports['load']=async file=>{
  switch(file){
   case 'chunk-068jdk1j.js':return {attachRemote:source(file).We}
   case 'chunk-10hz5vg8.js':return {createFleetViewHost:source('chunk-57c1wr4m.js').dGe}
   case 'chunk-hjr21m5j.js':return {ensureFleetNudgeStore:source('chunk-1rsf5e19.js').xos}
   case 'chunk-b5wgfjk8.js':return {mountFleetViewWithComposerBack:source(file).u}
   case 'chunk-6e2q7fgx.js':return getOriginalModsLifecycle287().importPublicSourceModule287('/$bunfs/root/'+file)
   case 'chunk-aatcqh6b.js':return {createRoot}
   default:throw Error('Unexpected original existing-cloud import: '+file)
  }
 }
 await createExistingCloudAttachCaller287({
  i:logEvent,ye:source('chunk-t20x5mnd.js').ye as Ports['ye'],fn:source('chunk-q1842b1c.js').fn as Ports['fn'],
  ee:session,e:options,N:root,Pe:initialState,Ue:input.autoConnectIdeFlag,B:input.disableSlashCommands,
  x:input.storageV5,se:input.credentials,pe:exitWithError,l:errorMessage,Kn:gracefulShutdown,
  Eqt:source('chunk-h7x56jaz.js').Eqt as Ports['Eqt'],vR:getTerminalRenderOptions287,
  wFt:source('chunk-1jqp49rh.js').wFt as Ports['wFt'],K:initialState.toolPermissionContext,load,process,
 })(id)
}

/** Complete ordinary public print B arm: validation and terminal send, not a
 * local user-model turn. Headless serving / create arms are separate clients. */
export async function printExistingCloud287(input:{id:string;prompt:unknown;outputFormat?:string;session:ExecutionSession287;credentials?:ToolUseContext['credentials']}):Promise<void>{
 type Ports=Parameters<typeof createExistingCloudPrintCaller287>[0]
 const nank=()=>source('chunk-nankzm0s.js')
 await createExistingCloudPrintCaller287({
  ime:source('chunk-dgp2yyqt.js').ime as Ports['ime'],U:()=>input.session,
  TF:nank().TF as Ports['TF'],pHe:source('chunk-4gbrna1q.js').pHe as Ports['pHe'],
  Vs:source('chunk-z6bxsds6.js').Vs as Ports['Vs'],Yt:source('chunk-z6bxsds6.js').Yt as Ports['Yt'],
  zb:source('chunk-b7yc4zs1.js').zb as Ports['zb'],j_e:source('chunk-hhbs19e8.js').j_e as Ports['j_e'],
  V2:source('chunk-eh4x73e7.js').V2 as Ports['V2'],Be:input.prompt,ie:input.outputFormat,i:logEvent,
  c:source('chunk-n4qghq20.js').c as Ports['c'],Rx:nank().Rx as Ports['Rx'],l:errorMessage,
  Rm:source('chunk-0snr1bvc.js').Rm as Ports['Rm'],Mpe:nank().Mpe as Ports['Mpe'],Npe:nank().Npe as Ports['Npe'],
  js:source('chunk-6hnyhakg.js').js as Ports['js'],_:source('chunk-q80zaav8.js')._ as Ports['_'],process,
  oc:source('chunk-fpcnpvs9.js').oc as Ports['oc'],Kn:gracefulShutdown,n:{credentials:input.credentials},load:async file=>source(file),
 })(input.id)
}

/** Original prepared max-turn value, including the public environment reader. */
export function resolveHeadlessCloudMaxTurns287(value:number|undefined):number|undefined{
 return (source('chunk-brnn4zwp.js').j7o as (value:number|undefined)=>number|undefined)(value)
}

/** Full lr serving prefix -> public wes.jrs -> Un. Prepared values and the
 * existing host are passed through; this is not an ordinary print-B send or
 * another SDK/IO/session owner. The attach contract cannot enter create. */
export async function serveExistingHeadlessCloud287(prepared:PreparedHeadlessCloud287,options:Record<string,unknown>):Promise<void>{
 type Ports=Parameters<typeof createHeadlessCloudServingCaller287>[0]
 await createHeadlessCloudServingCaller287({
  yeo:source('chunk-bn3p37gv.js').yeo as Ports['yeo'],fZo:source('chunk-mphp7acd.js').fZo as Ports['fZo'],
  x9r:source('chunk-f1vb7bx7.js').x9r as Ports['x9r'],Yt:source('chunk-z6bxsds6.js').Yt as Ports['Yt'],
  ime:source('chunk-dgp2yyqt.js').ime as Ports['ime'],U:()=>prepared.session,
  AEe:source('chunk-q80zaav8.js').AEe as Ports['AEe'],qP:source('chunk-2z1m9v0n.js').qP as Ports['qP'],
  jj:source('chunk-f1vb7bx7.js').jj as Ports['jj'],un:source('chunk-q1842b1c.js').un as Ports['un'],
  Ki:source('chunk-6xrs6gmd.js').Ki as Ports['Ki'],zEe:source('chunk-3svn1vf6.js').zEe as Ports['zEe'],
  Ym:source('chunk-0snr1bvc.js').Ym as Ports['Ym'],xr:source('chunk-brnn4zwp.js').xr as Ports['xr'],
  sme:source('chunk-dgp2yyqt.js').sme as Ports['sme'],
  load:async file=>{
   if(file!=='chunk-wes8v52x.js')throw Error('Unexpected original headless-cloud import: '+file)
   const namespace=await getOriginalModsLifecycle287().importPublicSourceModule287('/$bunfs/root/'+file)
   if(typeof namespace.runHeadlessCloudAttach!=='function')throw Error('Missing original wes.runHeadlessCloudAttach export')
   return namespace as Awaited<ReturnType<Ports['load']>>
  },
 })(prepared,options)
}
