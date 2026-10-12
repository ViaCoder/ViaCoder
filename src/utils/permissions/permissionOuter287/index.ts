import {createPermissionOuterNative287,type PermissionOuterNative287} from './native.js'
import proof from './provenance.json' with {type:'json'}
import {getServerClassifier287,createServerClassifierPorts287} from '../serverClassifier287/index.js'
import {canonicalPostTurnSource287} from '../../../query/postTurnClient287/index.js'
import {getOriginalModsLifecycle287} from '../../hooks/modelSwitch287/lifecycleRuntime.js'
import {getExecutionSession287,executionSessionRegistryConstructor287,executionRecommendationGates287} from '../../../services/context/execution287.js'
import {getRuntimeMemo287} from '../../../services/context/runtimeMemo287.js'
import {readConfirmationPermissionContext} from '../confirmWithUser.js'
import {agentDelivery287} from '../../../tools/SendMessageTool/agentDelivery287.js'
import {classifyYoloAction} from '../yoloClassifier.js'
import {adaptHandbackHookContext287} from '../../../tools/SendMessageTool/handbackEndTurn287.js'
import {getReadPermissions287} from '../read.js'
import {authEnvironment} from '../../authEnvironment.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../../services/analytics/growthbook.js'
import {getQuotaOwner287} from '../../../services/claudeAiLimits.js'
import {getCwd} from '../../cwd.js'
import {lazySchema} from '../../lazySchema.js'
import {jsonParse,jsonStringify} from '../../slowOperations.js'
import {logForDebugging} from '../../debug.js'
import {logError} from '../../log.js'
import {AbortError,isAbortError,errorMessage,toError} from '../../errors.js'
import {SandboxManager} from '../../sandbox/sandbox-adapter.js'
import {z} from 'zod/v4'
import {toolMatchesName} from '../../../Tool.js'
import {mapValues,uniq,escapeRegExp} from 'lodash-es'
import {APIUserAbortError} from '@anthropic-ai/sdk'
import {getClientData} from '../../clientData.js'
import {isEnvTruthy,isInProtectedNamespace} from '../../envUtils.js'
import {startSessionActivity,stopSessionActivity} from '../../sessionActivity.js'
import {executePermissionRequestHooks} from '../../hooks.js'
import {applyPermissionUpdates,persistPermissionUpdates} from '../PermissionUpdate.js'
import {getMainLoopModel} from '../../model/model.js'
import {getIsNonInteractiveSession,getSessionId,getTotalInputTokens,getTotalOutputTokens,getTotalCacheReadInputTokens,getTotalCacheCreationInputTokens} from '../../../bootstrap/state.js'
import type {ToolUseContext,ToolPermissionContext} from '../../../Tool.js'
import {WORKFLOW_TOOL_NAME} from '../../../tools/WorkflowTool/constants.js'
import {isTeammate} from '../../teammate.js'
import {setMaxListeners} from 'node:events'
import {getAPIProvider} from '../../model/providers.js'
import {getSubscriptionType,isClaudeAISubscriber} from '../../auth.js'
import {calculateCostFromTokens} from '../../modelCost.js'

function original(file:string,name:string,...args:unknown[]){const value=canonicalPostTurnSource287(file,name);if(typeof value!=='function')throw Error(`Original permission port not callable: ${file}:${name}`);return value(...args)}
export function createPermissionOuterPorts287():Record<string,unknown>{
 const ports:Record<string,unknown>={}
 for(const group of proof.modules)for(const [name,origin] of Object.entries(group.importOrigins))if(!(name in ports)){try{ports[name]=canonicalPostTurnSource287(origin.file,origin.name)}catch{ports[name]=(...args:unknown[])=>original(origin.file,origin.name,...args)}}
 const fallbackLatches=()=>getExecutionSession287().host.requestLatches as ReturnType<typeof getExecutionSession287>['host']['requestLatches'] & import('./native.js').OriginalClassifierFallbackLatches287
 const dialogCaps=()=>getExecutionSession287().surfaceCapabilities as ReturnType<typeof getExecutionSession287>['surfaceCapabilities'] & import('./native.js').OriginalClassifierDialogCapabilities287
 const source=getServerClassifier287(),existing=createServerClassifierPorts287()
 Object.assign(ports,existing,{
 Le:isEnvTruthy,ml:isTeammate,setMaxListeners,ir:getSubscriptionType,ft:isClaudeAISubscriber,He:getAPIProvider,am:executionRecommendationGates287.am,
 vkn:()=>fallbackLatches().serverClassifierFallbackChoice(),mno:(value:Promise<'continue'|'interrupt'>)=>fallbackLatches().setServerClassifierFallbackChoice(value),Eir:()=>fallbackLatches().clearServerClassifierFallbackChoice(),
 bW:()=>dialogCaps().sdkDialogHostActive(),lee:()=>dialogCaps().sdkSupportedDialogKinds(),
 a:authEnvironment,Dn:authEnvironment,U:getExecutionSession287,Tt:executionSessionRegistryConstructor287,ko:getRuntimeMemo287,
 V:canonicalPostTurnSource287('chunk-bn3p37gv.js','V'),
 pe:readConfirmationPermissionContext,Ce:getIsNonInteractiveSession,k:getFeatureValue_CACHED_MAY_BE_STALE,pa:()=>getQuotaOwner287().currentLimits,
 YS:source.permissionVisibility287.YS,Uoe:source.Uoe,v7:source.v7,QEt:source.QEt,iVo:source.iVo,aVo:source.aVo,JEt:source.JEt,aCt:source.aCt,cCt:source.cCt,iCt:source.iCt,KHt:source.KHt,H2t:source.H2t,
 dAn:(request:Parameters<ReturnType<typeof getOriginalModsLifecycle287>['toolCheckResolver287']['resolveToolCheck']>[0])=>getOriginalModsLifecycle287().toolCheckResolver287.resolveToolCheck(request),
 dkn:{of:()=>getOriginalModsLifecycle287().postTurnOwners287.classifierSupport()},
 msn:(...args:Parameters<ReturnType<ReturnType<typeof getOriginalModsLifecycle287>['postTurnOwners287']['classifierQueue']>['enqueue']>)=>getOriginalModsLifecycle287().postTurnOwners287.classifierQueue().enqueue(...args),
 c_e:()=>getOriginalModsLifecycle287().postTurnOwners287.classifierQueue(),
 gce:classifyYoloAction,$Me:agentDelivery287.$Me,kre:agentDelivery287.kre,
 t:logForDebugging,d:logError,l:errorMessage,Z:toError,at:isAbortError,Ye:AbortError,Dd:APIUserAbortError,
 i:()=>{},y:()=>{},m:()=>{},p:()=>{},c:(v:unknown)=>v,S:(v:unknown)=>v,me:(v:unknown)=>v,ye:(v:unknown)=>v,
 _:jsonStringify,Y:jsonParse,f:lazySchema,T:z.array,u:z.object,o:z.string,H:z.boolean,C:z.number,B:z.enum,x:z.literal,de:z.record,se:z.unknown,
 Qr:mapValues,L:uniq,hr:escapeRegExp,je:SandboxManager,Mt:toolMatchesName,oe:getCwd,q:getSessionId,rt:getMainLoopModel,Kd:getClientData,vI:isInProtectedNamespace,
 rFe:executePermissionRequestHooks,zP:applyPermissionUpdates,V1:persistPermissionUpdates,dF:startSessionActivity,uF:stopSessionActivity,
 xbe:calculateCostFromTokens,Twt:getTotalInputTokens,vf:getTotalOutputTokens,kwt:getTotalCacheReadInputTokens,Rwt:getTotalCacheCreationInputTokens,
 Ue:'Bash',dt:'Bash',Gf:'PowerShell',Gs:'Agent',Ot:'Read',Nn:(name:string)=>name,Fd:WORKFLOW_TOOL_NAME,
 nativeRequire:(file:string)=>new Proxy({},{get:(_target,key)=>canonicalPostTurnSource287(file.split('/').at(-1)!,String(key))}),
 nativeImport:(file:string)=>{const name=file.split('/').at(-1)!;const module=(require('../../../services/mcp/connectedProducer287.js') as typeof import('../../../services/mcp/connectedProducer287.js')).getMcpConnectedProducer287().dynamicModules[name];if(!module)throw Error('Original permission optional namespace not installed: '+file);return Promise.resolve(module)},
 })
 ports.Gre=getReadPermissions287().hookToolGrantBlocked;ports.zs=getReadPermissions287().readDenyRule;ports.Zu=getReadPermissions287().readAllowRule
 for(const name of ['zre','_g'])ports[name]=(...args:unknown[])=>{const fn=getReadPermissions287().sourceModule('/$bunfs/root/chunk-6xrs6gmd.js')[name];if(typeof fn!=='function')throw Error('Original permission read not installed: '+name);return fn(...args)}
 return ports
}
let runtime:PermissionOuterNative287|undefined
export function getPermissionOuter287(){return runtime??=createPermissionOuterNative287(createPermissionOuterPorts287())}
export function permissionContext287(context:ToolUseContext){const view=adaptHandbackHookContext287(context);if(!Reflect.get(view,'setSessionToolPermissionContext'))Object.defineProperty(view,'setSessionToolPermissionContext',{enumerable:true,value:(update:(current:ToolPermissionContext)=>ToolPermissionContext)=>context.setAppState(state=>{const next=update(state.toolPermissionContext);return next===state.toolPermissionContext?state:{...state,toolPermissionContext:next}})});return view}
