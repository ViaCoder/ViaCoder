import {z} from 'zod/v4'
import {homedir} from 'node:os'
import mapValues from 'lodash-es/mapValues.js'
import uniq from 'lodash-es/uniq.js'
import origins from './portOrigins.json'
import {createServerClassifierNative287,type ServerClassifierNative287} from './native.js'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {getRuntimeMemo287} from '../../../services/context/runtimeMemo287.js'
import {getReadPermissions287} from '../read.js'
import {getMcpConnectedProducer287} from '../../../services/mcp/connectedProducer287.js'
import {readConfirmationPermissionContext,isCapturedNonAutoPermissionMode287} from '../confirmWithUser.js'
import {isAutoModeActive} from '../autoModeState.js'
import {getAPIProvider,isFirstPartyRequestEndpoint} from '../../model/providers.js'
import {getPlatform} from '../../platform.js'
import {getModelBetaProducer287} from '../../modelBetas287.js'
import {authEnvironment} from '../../authEnvironment.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../../services/analytics/growthbook.js'
import {getRetryDelay} from '../../../services/api/withRetry.js'
import {isEnvTruthy} from '../../envUtils.js'
import {lazySchema} from '../../lazySchema.js'
import {jsonStringify} from '../../slowOperations.js'
import {logForDebugging} from '../../debug.js'
import {logError} from '../../log.js'
import {AbortError,errorMessage} from '../../errors.js'
import {getCwd} from '../../cwd.js'
import {getGitEmail} from '../../user.js'
import {getOriginalCwd,getSessionId} from '../../../bootstrap/state.js'
import {oc as complianceTaint} from '../../../vendor/official-files-api/taints.js'
import {isPolicyAllowed} from '../../../services/policyLimits/index.js'
import {createGitEnvironment287} from '../../../services/context/officialGitContext287/native.js'
import {execFileNoThrowWithCwd,execFileNoThrow} from '../../execFileNoThrow.js'
import {gitExe,findGitRoot} from '../../git.js'
import {getSettingsForSource} from '../../settings/settings.js'
import {getSettingsCacheStore287} from '../../settings/settingsCache.js'
/** Original namespaces only. Missing bindings remain errors, never empty state. */
function sourceValue(file:string,name:string):unknown {
 let read:Record<string,unknown>|undefined
 try{read=getReadPermissions287().sourceModule('/$bunfs/root/'+file)}catch{}
 if(read?.[name]!==undefined)return read[name]
 const mcp=getMcpConnectedProducer287().dynamicModules[file]
 if(mcp?.[name]!==undefined)return mcp[name]
 throw Error(`Server classifier canonical source binding not installed: ${file}:${name}`)
}
function sourceCall(file:string,name:string,...args:unknown[]):unknown {
 const fn=sourceValue(file,name)
 if(typeof fn!=='function')throw Error(`Server classifier source ${file}:${name} is not callable`)
 return fn(...args)
}
const latches=()=>getExecutionSession287().host.requestLatches
const gitEnvironment=createGitEnvironment287({platform:process.platform,architecture:process.arch,process})
export function isServerClassifierRefused287():boolean{return latches().thirdPartyServerClassifierRefused()}
export function createServerClassifierPorts287():Record<string,unknown> {
 const ports:Record<string,unknown>={}
 for(const [name,origin] of Object.entries(origins))ports[name]=(...args:unknown[])=>sourceCall(origin.file,origin.name,...args)
 const read=(name:string)=>(...args:unknown[])=>sourceCall('chunk-6xrs6gmd.js',name,...args)
 Object.assign(ports,{
  a:authEnvironment,Dn:authEnvironment,U:getExecutionSession287,ko:getRuntimeMemo287,
  V:sourceValue('chunk-bn3p37gv.js','V'),
  Vn:()=>getAPIProvider()==='firstParty',uo:()=> (getExecutionSession287().host.credentialSlots as {gatewayAuth():unknown}).gatewayAuth(),
  He:getAPIProvider,GF:(provider:string)=>provider==='anthropicGoogleCloud',Js:isFirstPartyRequestEndpoint,
  ol:complianceTaint,mf:isAutoModeActive,k:getFeatureValue_CACHED_MAY_BE_STALE,
  cno:(key:string)=>latches().autoModeUnavailableResponse(key),_ir:(run:string)=>latches().autoModeUnavailableResponsesInARow(run),
  bir:(run:string)=>latches().clearAutoModeUnavailableResponses(run),Sir:(key:string,value:import('../../../services/context/officialExecutionOwners287/native.js').AutoModeUnavailableResponse287)=>latches().noteAutoModeUnavailableResponse(key,value),
  fee:()=>latches().thirdPartyServerClassifierRefused(),wkn:()=>latches().threadsHeldForServerClassifier(),lno:()=>latches().markThreadsHeldForServerClassifier(),pno:()=>latches().observedGateway(),
  Wbe:getGitEmail,Ye:AbortError,sL:getRetryDelay,t:logForDebugging,l:errorMessage,d:logError,i:()=>{},c:(value:unknown)=>value,S:(value:unknown)=>value,
  f:lazySchema,T:z.array,u:z.object,o:z.string,Wo:z.discriminatedUnion,x:z.literal,de:z.record,se:z.unknown,B:z.enum,H:z.boolean,C:z.number,mt:z.object,Ql:z.enum,Eo:z.boolean,
  _:jsonStringify,Qr:mapValues,L:uniq,Le:isEnvTruthy,pe:readConfirmationPermissionContext,x6r:isCapturedNonAutoPermissionMode287,
  q:getSessionId,oe:getCwd,Ee:getOriginalCwd,Hu:homedir,O:getPlatform,
  mx:read('mx'),ZN:read('ZN'),I8n:read('I8n'),xxe:read('xxe'),UUe:read('UUe'),sXe:read('sXe'),ti:read('ti'),Yn:read('Yn'),
  Txe:sourceValue('chunk-6xrs6gmd.js','Txe'),TG:()=>getReadPermissions287().permissionCache(),
  jn:(...args:unknown[])=>sourceCall('chunk-db6pdgvs.js','jn',...args),On:(...args:unknown[])=>sourceCall('chunk-db6pdgvs.js','On',...args),
  dt:'Bash',Ot:'Read',Zc:()=>getMcpConnectedProducer287().chromeState(),e0t:()=>getMcpConnectedProducer287().chromeScopeKey(),
  va:getSettingsCacheStore287,ge:getSettingsForSource,rw:()=>sourceCall('chunk-f1vb7bx7.js','rw'),
  Ut:()=> (getExecutionSession287().host.launchOptions as {diskless():boolean}).diskless(),Fy:findGitRoot,
  Je:execFileNoThrowWithCwd,Ke:execFileNoThrow,vt:gitExe,Qo:gitEnvironment.environment,Ko:gitEnvironment.environment,$S:gitEnvironment.ignoreSubmodules,
  lo:(name:string,fallback:unknown)=>getFeatureValue_CACHED_MAY_BE_STALE(name,fallback),on:isPolicyAllowed,
  XC:getModelBetaProducer287().q_t('dangerous-tool-use-2026-09-03'),
  Lp:(betas:{rejected:Set<unknown>},token:unknown)=>betas.rejected.has(token),
  nativeImport:(file:string)=>{const module=getMcpConnectedProducer287().dynamicModules[file];if(!module)throw Error(`Original optional classifier namespace not installed: ${file}`);return Promise.resolve(module)},
 })
 return ports
}
let runtime:ServerClassifierNative287|undefined
export function getServerClassifier287():ServerClassifierNative287 {return runtime??=createServerClassifierNative287(createServerClassifierPorts287())}
