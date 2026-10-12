import {getPrintHostSource287} from './publicHostRuntime287.js'
import {getInitialSettings} from '../../utils/settings/settings.js'
import {validateForceLoginOrg,getAccountInformation} from '../../utils/auth.js'
import {performLogout} from '../../commands/logout/logout.js'
import {OAuthService} from '../../services/oauth/index.js'
import {installOAuthTokens} from '../handlers/auth.js'
import {getAPIProvider} from '../../utils/model/providers.js'
import {getSSLErrorHint} from '../../services/api/errorUtils.js'
import {oauthErrorMetadata} from '../../utils/sharedOAuthPersistence.js'
import {oauthCallbackErrors287} from '../../services/oauth/officialStartup287/host.js'
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../../services/analytics/index.js'
import {logForDebugging} from '../../utils/debug.js'
import {errorMessage} from '../../utils/errors.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getMcpConnectedProducer287,getMcpClientModule287} from '../../services/mcp/connectedProducer287.js'
import {resolveMcpSdkGeneration} from '../../services/mcp/v2Lifecycle.js'
import {createClaudeOAuthHostConfigsNative287,createClaudeOAuthControlsNative287,createClaudeOAuthHelpersNative287,createClaudeIdentityRefreshNative287,createClaudeIdentityResetNative287,createClaudeMcpIdentityCheckNative287,createClaudeWorkSecretNative287,type ClaudeOAuthCaller287,type ClaudeOAuthController287,type ClaudeWorkSecretOwner287} from './claudeOAuthControls287.native.js'
import proof from './claudeOAuthControls287.provenance.json' with {type:'json'}

/** Stateless lexical adapters. Lookups are lazy: merely constructing print's
 * control slot must not initialize another auth/client/cache namespace. */
function portsFor287(file:string,overrides:Record<string,unknown>={}) {
 const imports=(proof.imports as Readonly<Record<string,Readonly<Record<string,{file:string;name:string}>>>>)[file]??{}
 return new Proxy(overrides,{
  has:(_target,name)=>typeof name==='string'&&(Object.hasOwn(overrides,name)||Object.hasOwn(imports,name)),
  get(target,name,receiver){
   if(name===Symbol.unscopables)return undefined
   if(Object.hasOwn(target,name))return Reflect.get(target,name,receiver)
   const binding=typeof name==='string'?imports[name]:undefined
   if(!binding)throw Error('Original OAuth lexical definition missing '+file+':'+String(name))
   return readCanonical287(binding.file,binding.name)
  },
 })
}
function readCanonical287(file:string,name:string):unknown {
 // These modules carry the sole connection/discovery/identity owner. The
 // print source's same-named partial namespaces are not substitute caches.
 if(['chunk-dp67c56j.js','chunk-z6w3579x.js','chunk-amg94xhm.js','chunk-fdjgzr8v.js'].includes(file)) {
  const module=getMcpConnectedProducer287().sourceModule(file)
  if(Object.hasOwn(module,name))return module[name]
 }
 return getPrintHostSource287(file,name)
}
const analytics287={
 i:logEvent,t:logForDebugging,l:errorMessage,
 // Only original feature identifiers and classified codes, never request data.
 y:(feature:string)=>logEvent('tengu_feature_ok',{feature_name:feature as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
 m:(feature:string,errorCode:string)=>logEvent('tengu_feature_bad',{feature_name:feature as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,error_code:errorCode as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
 p:(feature:string,errorCode:string)=>logEvent('tengu_feature_sad',{feature_name:feature as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,error_code:errorCode as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
}
let identityRefresh287:ReturnType<typeof createClaudeIdentityRefreshNative287>|undefined
let identityReset287:ReturnType<typeof createClaudeIdentityResetNative287>|undefined
let checkModern287:(()=>boolean)|undefined,checkLegacy287:(()=>boolean)|undefined
function canonicalClient287(){
 const modern=resolveMcpSdkGeneration()==='v2',file=modern?'chunk-amg94xhm.js':'chunk-fdjgzr8v.js'
 const predicate=modern
  ?checkModern287??=createClaudeMcpIdentityCheckNative287(portsFor287(file,{ws:()=>Reflect.apply(readCanonical287(file,'ws') as Function,undefined,[])}),true)
  :checkLegacy287??=createClaudeMcpIdentityCheckNative287(portsFor287(file,{er:()=>Reflect.apply(readCanonical287(file,'er') as Function,undefined,[])}),false)
 // ws/er are original local identity readers; invoke the canonical function.
 return {...getMcpClientModule287(),mcpIdentityChangedSinceLastCheck:predicate,
  evictAllMcpMemosOnIdentityChange:readCanonical287(file,modern?'$p':'id')}
}
/** Original E5t and NEo; no client/cache allocation or changed algorithm. */
export function refreshClaudeOAuthMcpIdentity287(input:Parameters<ReturnType<typeof createClaudeIdentityRefreshNative287>>[0]){
 identityRefresh287??=createClaudeIdentityRefreshNative287(portsFor287('chunk-dp67c56j.js',{
  V:canonicalClient287,W:readCanonical287('chunk-dp67c56j.js','W'),kie:readCanonical287('chunk-dp67c56j.js','kie'),
 }))
 return identityRefresh287(input)
}
export function resetClaudeOAuthMcpIdentity287(){
 identityReset287??=createClaudeIdentityResetNative287(portsFor287('chunk-z6w3579x.js',{
  Ca:()=>Reflect.apply(readCanonical287('chunk-z6w3579x.js','Ca') as Function,undefined,[]),
  yIt:()=>Reflect.apply(readCanonical287('chunk-z6w3579x.js','yIt') as Function,undefined,[]),
  _P:()=>Reflect.apply(readCanonical287('chunk-z6w3579x.js','_P') as Function,undefined,[]),
 }))
 return identityReset287()
}
/** Optional original Ir (created only for remote_control.work_secret). */
export function createClaudeWorkSecretOwner287(input:Parameters<ReturnType<typeof createClaudeWorkSecretNative287>>[0]):ClaudeWorkSecretOwner287 {
 return createClaudeWorkSecretNative287(portsFor287('chunk-ttxp2r5q.js',{
  canonicalMcpClient287:canonicalClient287,...analytics287,
 }))(input)
}

export function createClaudeOAuthControls287(caller:ClaudeOAuthCaller287):ClaudeOAuthController287 {
 const methodPorts=portsFor287('chunk-nankzm0s.js',{a:authEnvironment,...analytics287,
  y8:()=>Reflect.apply(getPrintHostSource287('chunk-nankzm0s.js','y8') as Function,undefined,[]),
  Nl:()=>Reflect.apply(getPrintHostSource287('chunk-nankzm0s.js','Nl') as Function,undefined,[]),
  qQ:(...args:unknown[])=>Reflect.apply(getPrintHostSource287('chunk-nankzm0s.js','qQ') as Function,undefined,args),
 })
 const joinPorts=portsFor287('chunk-xapeakym.js')
 const helpers=createClaudeOAuthHelpersNative287(new Proxy({}, {
  has:(_target,name)=>name in methodPorts||name in joinPorts,
  get:(_target,name)=>name===Symbol.unscopables?undefined:name in methodPorts?Reflect.get(methodPorts,name):Reflect.get(joinPorts,name),
 }))
 const adapters={...analytics287,...helpers,
  er:getInitialSettings,ZL:OAuthService,YHe:installOAuthTokens,TF:validateForceLoginOrg,ite:performLogout,
  Ube:getAccountInformation,He:getAPIProvider,uK:getSSLErrorHint,pu:oauthErrorMetadata,dK:oauthCallbackErrors287.dK,
  E5t:refreshClaudeOAuthMcpIdentity287,NEo:resetClaudeOAuthMcpIdentity287,
 }
 const lexical=portsFor287('chunk-xapeakym.js',adapters)
 const ports=new Proxy(caller,{
  has:(target,name)=>Object.hasOwn(target,name)||name in lexical,
  get(target,name,receiver){if(name===Symbol.unscopables)return undefined;return Object.hasOwn(target,name)?Reflect.get(target,name,receiver):Reflect.get(lexical,name)},
 })
 return createClaudeOAuthControlsNative287(ports)
}

export function createClaudeOAuthHostConfigs287(caller:{a:typeof authEnvironment;v:()=>any;get Lt():any}) {
 const lexical=portsFor287('chunk-xapeakym.js')
 return createClaudeOAuthHostConfigsNative287(new Proxy(caller,{
  has:(target,name)=>Object.hasOwn(target,name)||name in lexical,
  get:(target,name,receiver)=>name===Symbol.unscopables?undefined:Object.hasOwn(target,name)?Reflect.get(target,name,receiver):Reflect.get(lexical,name),
 }))
}
