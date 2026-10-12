import * as native from './native.js'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {getPermissionSessionStateConstructor287} from './sessionStateRuntime.js'
import {writeToStdout} from '../../process.js'
import {getOriginalModsLifecycle287} from '../../hooks/modelSwitch287/lifecycleRuntime.js'
import proof from './provenance.json' with {type:'json'}
import {canonicalPostTurnSource287} from '../../../query/postTurnClient287/index.js'
import {getPermissionOuter287,permissionContext287} from '../permissionOuter287/index.js'
import {getReadPermissions287} from '../read.js'
import {readConfirmationPermissionContext} from '../confirmWithUser.js'
import {getFastStatusSettingsWriter287} from '../../settings/fastStatusWriter287.js'
import {getSettingsForSource} from '../../settings/settings.js'
import {executePermissionRequestHooks} from '../../hooks.js'
import {getMcpConnectedProducer287} from '../../../services/mcp/connectedProducer287.js'
import {getAutoModeStateOwner287} from '../autoModeState.js'
import {getSessionId} from '../../../bootstrap/state.js'
import {authEnvironment} from '../../authEnvironment.js'
import {registrationCommitted287,waitHookRegistration287} from '../../hooks/modelSwitch287/registrationGate.js'
import {logForDebugging} from '../../debug.js'
import {logError} from '../../log.js'
import {AbortError} from '../../errors.js'
import {logForDiagnosticsNoPII} from '../../diagLogs.js'
import {sleep} from '../../sleep.js'
import {setTimeout as sleepUnref287} from 'node:timers/promises'
import {jsonParse,jsonStringify} from '../../slowOperations.js'
import {lazySchema} from '../../lazySchema.js'
import {permissionUpdateSchema} from '../PermissionUpdateSchema.js'
import {getGraphemeSegmenter} from '../../intl.js'
import {stringWidth} from '../../../ink/stringWidth.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../../services/analytics/growthbook.js'
import {randomUUID} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import pickBy from 'lodash-es/pickBy.js'
import {z} from 'zod/v4'
import type {CanUseToolFn} from '../../../hooks/useCanUseTool.js'
import type {ToolUseContext} from '../../../Tool.js'
import type {SDKPermissionCaller287,SDKPermissionHost287,SDKPermissionNative287} from './native.js'
function original(file:string,name:string):unknown {try{return canonicalPostTurnSource287(file,name)}catch(error){const namespace=getMcpConnectedProducer287().sourceModule(file);if(!Object.hasOwn(namespace,name))throw error;return namespace[name]}}
function sourcePorts(group:keyof typeof proof.groups,overrides:Record<string,unknown>):Record<string,unknown>{return Object.fromEntries(proof.groups[group].ports.map(row=>{if(Object.hasOwn(overrides,row.local))return[row.local,overrides[row.local]];try{return[row.local,original(row.file,row.name)]}catch{const target=(...args:unknown[])=>{const fn=original(row.file,row.name);if(typeof fn!=='function')throw Error(`SDK permission port not callable ${row.file}:${row.name}`);return fn(...args)};return[row.local,new Proxy(target,{get(_target,key){const value=original(row.file,row.name);if(value===null||typeof value!=='object'&&typeof value!=='function')throw Error(`SDK conditional port missing object ${row.file}:${row.name}`);const result=Reflect.get(value,key);return typeof result==='function'?result.bind(value):result}})]}}))}
let owner:SDKPermissionNative287|undefined
let shared:Record<string,unknown>|undefined
export function getSDKHostAttestation287(){const source=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-h7x56jaz.js','Vr');if(typeof source!=='function')throw Error('Original SDK host attestation getter missing');return source() as import('./native.js').SDKHostAttestation287}
let hostMethods:import('./native.js').SDKPermissionHostMethods287|undefined
export function createSDKPermissionPorts287():Record<string,unknown>{
 if(shared)return shared
 const common:Record<string,unknown>={n:getExecutionSession287,Vr:getSDKHostAttestation287,Ye:AbortError,ne:logForDiagnosticsNoPII,ee:sleep,a:authEnvironment,t:logForDebugging,d:logError,_:jsonStringify,Y:jsonParse,c:(value:unknown)=>value,i:()=>{},_a:getGraphemeSegmenter,ie:stringWidth,kLn:isDeepStrictEqual,QBo:isDeepStrictEqual,Or:isDeepStrictEqual,di:pickBy,
  Ge:()=>{const e=getExecutionSession287();return e.identity.mainAgentId(e.id)},
  hi:()=>{const read=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-4tz80x64.js','hi');if(typeof read!=='function')throw Error('Original SDK inbound owner missing');return read()},
  yzt:()=>{const read=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-f1vb7bx7.js','yzt');if(typeof read!=='function')throw Error('Original SDK dialog preference owner missing');return read()},
  ge:getSettingsForSource,Ri:(...args:Parameters<ReturnType<typeof getFastStatusSettingsWriter287>['transform']>)=>getFastStatusSettingsWriter287().transform(...args),hn:(...args:Parameters<ReturnType<typeof getFastStatusSettingsWriter287>['update']>)=>getFastStatusSettingsWriter287().update(...args),
  pe:readConfirmationPermissionContext,rFe:executePermissionRequestHooks,Gre:(...args:Parameters<ReturnType<typeof getReadPermissions287>['hookToolGrantBlocked']>)=>getReadPermissions287().hookToolGrantBlocked(...args),
  Dr:registrationCommitted287,oS:waitHookRegistration287,k:getFeatureValue_CACHED_MAY_BE_STALE,Ee:randomUUID,LF:getAutoModeStateOwner287,q:getSessionId,N:randomUUID,
  Ue:'Bash',wt:'PowerShell',Gs:'AskUserQuestion',iu:'ExitPlanMode',lb:'ExitPlanMode',FRe:'EnterPlanMode',hr:'WebFetch',Cm:'WebSearch',Nn:(name:string)=>name,
  f:lazySchema,Fe:z.union,u:z.object,x:z.literal,de:z.record,o:z.string,se:z.unknown,T:z.array,aM:permissionUpdateSchema,B:z.enum,H:z.boolean,Wx:z.ZodError,
  MRo:()=>{},LWn:()=>{},
 }
 const initialize=(group:keyof typeof proof.groups,create:(p:Record<string,unknown>)=>Record<string,unknown>)=>Object.assign(common,create(sourcePorts(group,common)))
 Object.assign(common,{cWe:z.toJSONSchema})
 initialize('schemaBrand',native.createSDKPermissionSchemaBrand287)
 initialize('eventLabel',native.createSDKPermissionEventLabel287)
 initialize('schemaPaths',native.createSDKPermissionSchemaPaths287)
 initialize('wireJSON',native.createSDKPermissionWireJSON287)
 initialize('shutdownUnwind',native.createSDKPermissionShutdownUnwind287);initialize('shutdownCaller',native.createSDKPermissionShutdownCaller287);initialize('requestAttestation',native.createSDKPermissionRequestAttestation287);initialize('toolConstants',native.createSDKPermissionToolConstants287);initialize('strings',native.createSDKPermissionStrings287);initialize('serverIdentity',native.createSDKPermissionServerIdentity287);initialize('wrap',native.createSDKPermissionWrap287);initialize('promptPredicate',native.createSDKPermissionPromptPredicate287);initialize('reason',native.createSDKPermissionReason287);initialize('agent',native.createSDKPermissionAgent287);initialize('names',native.createSDKPermissionNames287);initialize('errors',native.createSDKPermissionErrors287);initialize('abort',p=>native.createSDKPermissionAbort287({...p,jpe:original('chunk-k35krsdc.js','jpe')}));initialize('account',native.createSDKPermissionAccount287);initialize('ruleParser',native.createSDKPermissionRuleParser287);initialize('identity',native.createSDKPermissionIdentity287);initialize('metadata',native.createSDKPermissionMetadata287);initialize('commandKind',native.createSDKPermissionCommandKind287);initialize('sanitizerPrimitives',native.createSDKPermissionSanitizerPrimitives287);initialize('sanitize',native.createSDKPermissionSanitize287);initialize('errorText',native.createSDKPermissionErrorText287);initialize('truncateLimit',native.createSDKPermissionTruncateLimit287);initialize('display',native.createSDKPermissionDisplay287);initialize('tabs',native.createSDKPermissionTabs287);initialize('delay',native.createSDKPermissionDelay287);initialize('disabledAttestation',native.createSDKPermissionDisabledAttestation287);initialize('rules',native.createSDKPermissionRules287);initialize('permitNarrow',native.createSDKPermissionPermitNarrow287);initialize('helpers',native.createSDKPermissionHelpers287);
 initialize('featureFailure',native.createSDKPermissionFeatureFailure287)
 initialize('mainLane',native.createSDKPermissionMainLane287)
 initialize('pollDrop',native.createSDKPermissionPollDrop287)
 Object.assign(common,native.createSDKPermissionCrossInboundTeardown287({...sourcePorts('crossInboundTeardown',common),ee:sleepUnref287}))
 initialize('hostInputTeardown',native.createSDKPermissionHostInputTeardown287)
 initialize('dialogTimeout',native.createSDKPermissionDialogTimeout287)
 Object.assign(common,native.createSDKPermissionDialogSchema287({...sourcePorts('dialogSchema',common),
  f:getOriginalModsLifecycle287().clearLifecycleSource287('chunk-5qqrzb2c.js','f'),u:z.object,B:z.enum,se:z.unknown,
 }))
 Object.assign(common,{kf:(...args:Parameters<CanUseToolFn>)=>getPermissionOuter287().kf(...args),T7:(...args:Parameters<ReturnType<typeof getPermissionOuter287>['T7']>)=>getPermissionOuter287().T7(...args),bP:(...args:Parameters<ReturnType<typeof getPermissionOuter287>['bP']>)=>getPermissionOuter287().bP(...args),_g:(...args:unknown[])=>{const fn=original('chunk-6xrs6gmd.js','_g');if(typeof fn!=='function')throw Error('Canonical permission deny reader missing');return fn(...args)}})
 return shared={...common,...sourcePorts('sdk',common)}
}
export function getSDKPermission287(){return owner??=native.createSDKPermissionSdk287(createSDKPermissionPorts287())}
export function createSDKCanUseTool287(host:SDKPermissionHost287,caller:SDKPermissionCaller287=getPermissionOuter287().k6):CanUseToolFn{
 const source=getSDKPermission287().he(caller,host)
 return (tool,input,context,message,id,prior)=>source(tool,input,permissionContext287(context),message,id,prior)
}

export function createSDKPermissionHostPorts287(){const lifecycle=getOriginalModsLifecycle287();const common={...createSDKPermissionPorts287(),...getSDKPermission287(),he:(caller:SDKPermissionCaller287,host:SDKPermissionHost287)=>createSDKCanUseTool287(host,caller),b8e:'elicitation',t$t:getPermissionSessionStateConstructor287(),ar:writeToStdout,
  _rr:lifecycle.clearLifecycleSource287('chunk-5qqrzb2c.js','_rr'),
  f:lifecycle.clearLifecycleSource287('chunk-5qqrzb2c.js','f'),
  O4r:()=>{const schema=lifecycle.clearLifecycleSource287('chunk-xep95vq1.js','O4r');if(typeof schema!=='function')throw Error('Original SDK Stdout schema missing');return schema()},
 };return sourcePorts('sdkHost',common)}
export function getSDKPermissionHostMethods287(){return hostMethods??=native.createSDKPermissionSdkHost287(createSDKPermissionHostPorts287())}
export function getSDKPermissionRules287(){const ports=createSDKPermissionPorts287();return ports as typeof ports&{zP(context:import('../../../Tool.js').ToolPermissionContext,updates:import('../PermissionUpdateSchema.js').PermissionUpdate[]):import('../../../Tool.js').ToolPermissionContext;V1(updates:import('../PermissionUpdateSchema.js').PermissionUpdate[],storage?:unknown):Promise<void>;mfe(reason:unknown):string|undefined;RTe(reason:unknown):string|undefined;Hl:new()=>Error}}

export function requestSDKTeardownUnwind287():void {const fn=createSDKPermissionPorts287().ll;if(typeof fn!=='function')throw Error('Original SDK teardown unwind caller missing');fn()}
export function resetSDKTeardownUnwind287():void {const fn=createSDKPermissionPorts287().$g;if(typeof fn!=='function')throw Error('Original SDK teardown reset caller missing');fn()}
export async function settleSDKHostInput287(io:import('./native.js').SDKHostTeardownIO287,queue:import('./native.js').SDKHostTeardownQueue287):Promise<void> {
 const close=createSDKPermissionPorts287().tI;if(typeof close!=='function')throw Error('Original SDK input teardown caller missing');await close(io,queue)
}
