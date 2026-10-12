import {createPostTurnClientNative287,createPostTurnAttemptRecorderNative287,type PostTurnClientNative287,type CacheJournalRequest287,type CacheAttemptUsage287} from './native.js'
import proof from './provenance.json' with {type:'json'}
import {getExecutionSession287,executionSessionRegistryConstructor287} from '../../services/context/execution287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getReadPermissions287} from '../../utils/permissions/read.js'
import {getOutsideHookRuntime287} from '../../utils/hooks/outsideRuntime287.js'
import {getMcpConnectedProducer287,getMcpSessionWiring287} from '../../services/mcp/connectedProducer287.js'
import {getAnthropicApiKeyWithSource} from '../../utils/auth.js'
import {getMainLoopModel,getUserSpecifiedModelSetting,getDefaultSonnetModel} from '../../utils/model/model.js'
import {createOfficialModelMenuPolicyPorts287,getOfficialModelMenuPolicy287} from '../../utils/model/officialModelPicker287.js'
import {bindSideQueryPorts287} from '../../utils/officialSideQuery287/bindings.js'
import {executeSideQuery287} from '../../utils/officialSideQuery287/bindings.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {getSurfaceIdentity287} from '../../services/context/surface287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getSessionId,getTotalOutputTokens} from '../../bootstrap/state.js'
import {isStorageV5PinnedOn} from '../../utils/secureStorage/storageV5.js'
import {getClaudeConfigHomeDir} from '../../utils/envUtils.js'
import {rS} from '../../utils/officialWorktreeState287.generated.js'
import {getCwd} from '../../utils/cwd.js'
import {isAutoCompactEnabled} from '../../services/compact/autoCompact.js'
import {getQuotaOwner287} from '../../services/claudeAiLimits.js'
import {jsonParse,jsonStringify} from '../../utils/slowOperations.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {errorMessage,isAbortError,AbortError} from '../../utils/errors.js'
import {createSignal} from '../../utils/signal.js'
import {lazySchema} from '../../utils/lazySchema.js'
import {z} from 'zod/v4'
import {toolMatchesName} from '../../Tool.js'
import {sleep} from '../../utils/sleep.js'
import {join,basename} from 'node:path'
import {stat,lstat,readFile,appendFile,open} from 'node:fs/promises'
import {statSync} from 'node:fs'
import {getConcurrentSessionWatchOwner287} from '../../utils/concurrentSessions.js'
import {getHookFailureNoticeOwner287} from '../../utils/hooks/modelSwitch287/engineRuntime.js'
import {getAppStateJobOwner287,getAppStateJobWriteState287} from '../../state/appStateJobs287.js'

/** Same source factories, no speculative host/backend or duplicate registry. */
export function canonicalPostTurnSource287(file:string,name:string):unknown {
 for(const read of [()=>getReadPermissions287().sourceModule('/$bunfs/root/'+file),()=>getOutsideHookRuntime287().sourceModule(file),()=>getMcpConnectedProducer287().dynamicModules[file],()=>getOriginalModsLifecycle287().clearSourceModule287(file)]){
  let module:Record<string,unknown>|undefined
  try{module=read()}catch{}
  if(module&&Object.hasOwn(module,name))return module[name]
 }
 const shared=getOriginalModsLifecycle287().sourceBindings
 const key=file+':'+name
 if(Object.hasOwn(shared,key))return Reflect.get(shared,key)
 throw Error(`Original post-turn source port not installed: ${key}`)
}
function sourceCall(file:string,name:string,...args:unknown[]){const value=canonicalPostTurnSource287(file,name);if(typeof value!=='function')throw Error(`Original post-turn non-callable: ${file}:${name}`);return value(...args)}
let runtime:PostTurnClientNative287|undefined
// The complete original h6r/Ie registry is the sole Ts/sn owner.
export function getPostTurnCacheJournal287(){return getPostTurnClient287().cache.Ie()}
export function recordPostTurnCacheRequest287(key:string,request:CacheJournalRequest287){return getPostTurnClient287().cache.zjo(key,request)}
export function createPostTurnPorts287():Record<string,unknown>{
 const generic:Record<string,unknown>={U:getExecutionSession287,Tt:executionSessionRegistryConstructor287,V:canonicalPostTurnSource287('chunk-bn3p37gv.js','V'),rt:getMainLoopModel,Xh:getUserSpecifiedModelSetting,
 TB:()=>getOriginalModsLifecycle287().postTurnOwners287.snapshotState(),
 t4:()=> (getExecutionSession287().requestJournal as unknown as {lastMainThreadCacheTtlMs():number|null}).lastMainThreadCacheTtlMs(),Tk:3600000,
 xet:()=> (getExecutionSession287().requestJournal as unknown as {lastMainThreadContextTokens():number|null}).lastMainThreadContextTokens(),
 PEe:()=> (getExecutionSession287().requestJournal as unknown as {lastMainThreadRequestAt():number|null}).lastMainThreadRequestAt(),
 oBe:()=>getPostTurnClient287().cache.oBe(),bm:isAutoCompactEnabled,pa:()=>getQuotaOwner287().currentLimits,
 k:getFeatureValue_CACHED_MAY_BE_STALE,a:authEnvironment,Dn:authEnvironment,F:isStorageV5PinnedOn,rS,q:getSessionId,vf:getTotalOutputTokens,
 n:getSurfaceIdentity287,cS:()=>getExecutionSession287().host.extensionsConfig.teammateAgentId(),
 i:()=>{},y:()=>{},m:()=>{},p:()=>{},c:(v:unknown)=>v,S:(v:unknown)=>v,me:(v:unknown)=>v,
 t:logForDebugging,d:logError,l:errorMessage,at:isAbortError,Ye:AbortError,W:(e:unknown)=>(e as NodeJS.ErrnoException).code==='ENOENT',E:(e:unknown)=>(e as NodeJS.ErrnoException).code,
 _:jsonStringify,Y:jsonParse,Me:createSignal,f:lazySchema,mt:z.object,u:z.object,ue:z.union,o:z.string,B:z.enum,C:z.number,T:z.array,x:z.literal,H:z.boolean,de:z.record,se:z.unknown,Ql:z.enum,Cg:z.discriminatedUnion,Gc:z.boolean,
 G:(values:unknown[],predicate:(v:unknown)=>boolean)=>values.filter(predicate).length,Mt:toolMatchesName,dS:()=>getMcpSessionWiring287().clientsFromAccessor(),
 ee:sleep,EE:getHookFailureNoticeOwner287(),
 Fr:(...args:Parameters<ReturnType<typeof getAppStateJobOwner287>['Fr']>)=>getAppStateJobOwner287().Fr(...args),
 ul:(...args:Parameters<ReturnType<typeof getAppStateJobOwner287>['ul']>)=>getAppStateJobOwner287().ul(...args),
 Nl:(error:unknown)=>getAppStateJobOwner287().Nl(error),
 R2:getAppStateJobWriteState287,
 EKn:getOriginalModsLifecycle287().clearSourceModule287('chunk-1jqp49rh.js').EKn,
 j:join,J:basename,ze:join,oS:join,we:getClaudeConfigHomeDir,A:join,kt:join,rL:statSync,GH:getConcurrentSessionWatchOwner287,it:errorMessage,oe:getCwd,te:stat,pe:readFile,qe:appendFile,Ge:open,
 Pt:()=>authEnvironment.CLAUDE_CODE_SESSION_KIND==='bg',xc:()=>authEnvironment.CLAUDE_CODE_SESSION_KIND==='bg'||rS()!==null,
 t2:executeSideQuery287,mb:getAnthropicApiKeyWithSource,
 }
 const namespace=(file:string)=>{
  const groups=proof.modules.filter(row=>row.file===file);const result:Record<string,unknown>={...generic}
  if(file==='chunk-1jqp49rh.js')result.te=lstat
  // pj aliases are original ZodString/ZodBoolean/ZodRecord/ZodEnum, not union.
  if(file==='chunk-7fkv6k8a.js')Object.assign(result,{ue:z.string,Gc:z.boolean,Cg:z.record,Ql:z.enum})
  if(file==='chunk-nankzm0s.js')Object.assign(result,createOfficialModelMenuPolicyPorts287(),getOfficialModelMenuPolicy287(),bindSideQueryPorts287(),{xm:getDefaultSonnetModel,...generic})
  if(file==='chunk-9hy804jg.js')Object.assign(result,{...bindSideQueryPorts287(),xm:getDefaultSonnetModel,...generic})
  for(const group of groups)for(const [name,origin] of Object.entries(group.importOrigins??{}))if(!(name in result)){try{result[name]=canonicalPostTurnSource287(origin.file,origin.name)}catch{result[name]=(...args:unknown[])=>sourceCall(origin.file,origin.name,...args)}}
  if(file==='chunk-09m4fzsj.js')Object.assign(result,createOfficialModelMenuPolicyPorts287(),getOfficialModelMenuPolicy287(),bindSideQueryPorts287(),generic)
  return result
 }
 return {namespace,cacheOwner:getOriginalModsLifecycle287().clearSourceModule287('chunk-1b21she7.js'),nativeImport:(file:string)=>{const module=getMcpConnectedProducer287().dynamicModules[file.split('/').at(-1)!];if(!module)throw Error('Original post-turn optional namespace not installed: '+file);return Promise.resolve(module)}}
}
export function getPostTurnClient287(){return runtime??=createPostTurnClientNative287(createPostTurnPorts287())}
/** Original public chunk exports, backed by the same client and caller-held Rn. */
export function getPostTurnJobExports287(){
 const job=getPostTurnClient287().job
 return {LINK_SCAN_MAX_BYTES:job.ne,appendTimelineLine:job.ye,createClassifierJobState:job.Rn,captureLatestAsk:job.Dn,findLatestRealUserAsk:job.vn,classifyAndPush:job.ut,classifyAndPushDebounced:job.Fn,markTurnAborted:job.xn,markTurnActive:job.Bn,ensurePermissionBridge:job.nt,captureIntent:job.In,classify:job.Le,markApiFailure:job.Nn,pushInFlightProgress:job.ot,redactForClassify:job.Te,scanLinkRecords:job.je,setPermissionBlock:job.We,setWorktreeOwnership:job.tt,stashBgStructuredResult:job.Ln,summarizeToolCalls:job.pe,worktreeOwnershipFields:job.se}
}

/** Whole original per-attempt Zs/Nv/Zf, same cache owner. Legacy absent main ABI maps to original main descriptor only. */
export function createPostTurnCacheAttemptRecorder287(input:{agentContext:import('../../utils/agentContext.js').AgentContext|{agentType:'main'}|undefined;querySource:string;forkPointUuid?:string;clock:{now():number};ttl:'1h'|undefined}){
 const cache=getPostTurnClient287().cache
 const recorder=createPostTurnAttemptRecorderNative287({Rp:agent=>{const fn=getPostTurnClient287().classificationMainAgentPredicate;if(typeof fn!=='function')throw Error('Original Rp ABI');return fn(agent)},z:{agentContext:input.agentContext??{agentType:'main'},querySource:input.querySource,forkPointUuid:input.forkPointUuid},K:input.clock,xp:input.ttl,zjo:cache.zjo,Z1:cache.Z1,IYn:cache.IYn,OYn:cache.OYn})
 if(recorder.main)(getExecutionSession287().requestJournal as ReturnType<typeof getExecutionSession287>['requestJournal'] & {replaceLastMainThreadCacheTtlMs(value:number):void}).replaceLastMainThreadCacheTtlMs(input.ttl==='1h'?cache.Tk:cache.g3)
 return recorder
}
