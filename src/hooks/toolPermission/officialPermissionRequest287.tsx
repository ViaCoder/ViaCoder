import {officialPermissionTiming287} from './officialPermissionLifecycle287/timedRuntime.js';
import {sourceRemoteInput287} from './officialPermissionLifecycle287/remoteInput.js';
import {createPublicPermissionCatalog287} from './officialPermissionLifecycle287/catalog.js';
import {createPermissionHookRunner287} from './officialPermissionLifecycle287/hook.js';
import {permissionDescriptors287,buildPermissionDescriptor287} from './officialPermissionDescriptors287/runtime.js';
import {getHookFailureNoticeOwner287} from '../../utils/hooks/modelSwitch287/engineRuntime.js';
import {createHookEngineTruncate287} from '../../utils/hooks/modelSwitch287/engine.js';
import {AskUserQuestionTool} from '../../tools/AskUserQuestionTool/AskUserQuestionTool.js';
import {FileWriteTool} from '../../tools/FileWriteTool/FileWriteTool.js';
import {FileReadTool} from '../../tools/FileReadTool/FileReadTool.js';
import {FileEditTool} from '../../tools/FileEditTool/FileEditTool.js';
import {NotebookEditTool} from '../../tools/NotebookEditTool/NotebookEditTool.js';
import {GrepTool} from '../../tools/GrepTool/GrepTool.js';
import {GlobTool} from '../../tools/GlobTool/GlobTool.js';
import {readConfirmationPermissionContext} from '../../utils/permissions/confirmWithUser.js';
import {logError} from '../../utils/log.js';
import * as React from 'react';
import {useMemo,useSyncExternalStore} from 'react';
import {executionSessionRegistryConstructor287,getExecutionSession287} from '../../services/context/execution287.js';
import type {ToolUseConfirm,PermissionRequestProps} from '../../components/permissions/PermissionRequest.js';
import {PermissionRequest} from '../../components/permissions/PermissionRequest.js';
import {officialRltCountedAskConstructor287,officialPermissionDialogSpecs287,requestOfficialRltPermission287,createOfficialRltCountedAsk287,getOfficialRltTop287,type OfficialRltDialogStore287,type OfficialRltDialog287,type OfficialRltRequestHost287} from '../../utils/officialRlt287.js';
import {OfficialRltSourceHost287,type OfficialRltRendererLayout287} from '../../utils/officialRltRenderer287.js';
import {createOfficialPermissionResolveOnce287} from '../../utils/officialRlt287.js';
import {createOfficialPermissionLifecycle287} from './officialPermissionLifecycle287/native.js';
import {officialPermissionRecheck287} from './officialPermissionLifecycle287/runtime.js';
import {createPermissionRecords287} from './officialPermissionLifecycle287/toolState.js';
import {createPermissionSurface287} from './officialPermissionLifecycle287/surface.js';
import {permissionRuleValueFromString} from '../../utils/permissions/permissionRuleParser.js';
import {permissionRecheckBypassImmune287} from './officialPermissionLifecycle287/gates.js';
import {hasPermissionsToUseTool,checkRuleBasedPermissions} from '../../utils/permissions/permissions.js';
import {executePermissionRequestHooks} from '../../utils/hooks.js';
import {logForDebugging} from '../../utils/debug.js';
import {isAbortError,toError} from '../../utils/errors.js';
import {SandboxManager} from '../../utils/sandbox/sandbox-adapter.js';
import {logEvent} from '../../services/analytics/index.js';
import {sanitizeToolNameForAnalytics} from '../../services/analytics/metadata.js';
import {logUnaryEvent} from '../../utils/unaryLogging.js';
export {createOfficialPermissionResolveOnce287} from '../../utils/officialRlt287.js';
import type {PermissionQueueOps} from './PermissionContext.js';
import type {PermissionUpdate} from '../../utils/permissions/PermissionUpdateSchema.js';
import type {ContentBlockParam} from '@anthropic-ai/sdk/resources/messages.mjs';
// Full original V/et/Mt: one host-scoped order clock, never a lane counter.
const orderClock287=new Function("class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};class et{last=0;next(){return this.last+=1,this.last}};var Mt=new V(()=>new et);return Mt;")();
// The raw xe.io public foreground scheduling expressions, including its first
// order reservation and the second reservation for person-only requests.
const sourceUnderGate287=new Function("function zv(e){return e.agentType===\"subagent\"};function eI(e){return e.hookCaller!==void 0||e.pluginSteered===!0};function s6t(e){return e.agentContext.agentType===\"teammate\"||zv(e.agentContext)&&e.agentContext.isAsync===!0||e.forRemoteExecution===!0||eI(e)};return s6t;")();
export function officialPermissionOptions287(host:object,item:ToolUseConfirm){
 const context=item.toolUseContext;
 if(!context.dialogAgentContext287)throw Error('Interactive request lacks actual Agent provenance');
 const J=orderClock287.of(host),X=J.next(),F=sourceUnderGate287({...context,agentContext:context.dialogAgentContext287}),uo=item.permissionResult.behavior==='ask'&&item.permissionResult.personOnly===true,qe=F||uo,fo=false,go=qe?J.next():X;
 return {place:qe?'under' as const:fo?undefined:'queue' as const,askOrder:go,armInputGrace:F||uo};
}
// Full bo/jan/x7, sharing A3's stateless original truncation port and unique EE.
const sourceTruncate287=createHookEngineTruncate287({});
const sourceAskLabel287=new Function('cd','Vm','Gs','lb',"function jan(e){let n=typeof e===\"object\"&&e!==null?e:void 0,r=Array.isArray(n?.questions)?n.questions:[],s=[],g=\"\";for(let w of r){let D=w;if(typeof D?.question!==\"string\")continue;g||=D.question;let j=Array.isArray(D.options)?D.options.flatMap((z)=>{let K=z;return typeof K?.label===\"string\"?[{label:K.label,description:typeof K.description===\"string\"?K.description:\"\"}]:[]}):[];if(j.length>0)s.push({question:D.question,options:j})}let h=s[0]?.options.map((w)=>w.label).join(\" \\xB7 \");return{text:g?x7(`answer: ${g}${h?` (${h})`:\"\"}`):\"answer question\",questions:s.length>0?s:void 0}};\nfunction x7(e){return cd(e.replace(/\\s+/g,\" \").trim(),Vm)};\nfunction bo(e){let s=e.input;if(e.tool.name===Gs)return jan(s);if(e.tool.name===lb)return{text:\"approve plan\"};let n=e.tool.userFacingName(e.input).trim(),r=typeof s?.command===\"string\"?s.command:typeof s?.file_path===\"string\"?s.file_path:typeof s?.url===\"string\"?s.url:\"\",g=n||e.tool.name;return{text:r&&!g.includes(r)?x7(`approve ${g}: ${r}`):`approve ${g}`}};\nreturn bo;")(sourceTruncate287.cd,sourceTruncate287.Vm,'AskUserQuestion','ExitPlanMode') as (item:ToolUseConfirm)=>{text:string;questions?:unknown};
const publicFileTools287=new Set<import('../../Tool.js').Tool>([FileReadTool,FileWriteTool,FileEditTool,NotebookEditTool,GrepTool,GlobTool]);
const publicKinds=new Set(['permission_file','permission_ask_user_question']);
function rows(store:OfficialRltDialogStore287){return store.getState().open.filter(row=>publicKinds.has(row.kind)&&(row.payload as {permissionProducer287?:boolean}|undefined)?.permissionProducer287===true).toReversed()}
function isPublicRequest(item:ToolUseConfirm){return (item.tool===AskUserQuestionTool||item.tool===FileWriteTool)&&item.permissionResult.behavior==='ask'&&(!('denialLimitFallback' in item.permissionResult)||item.permissionResult.denialLimitFallback===undefined)&&(!('autoDenyWindow' in item.permissionResult)||item.permissionResult.autoDenyWindow===undefined)}
/** Existing PermissionContext callbacks stay in the request's await closure.
 * Only Hpr owns live payload/order; the compatibility queue is a readonly view.
 * Other not-yet-migrated tools retain their existing setter and are not claimed.
 */
export function createOfficialPermissionQueueOps287(store:OfficialRltDialogStore287,host:OfficialRltRequestHost287,legacy:PermissionQueueOps):PermissionQueueOps{
 return {
  requestSource287(params,resolve){
   return startPublicPermissionLifecycle287(host,params,resolve);
  },
  push(item){
   if(!isPublicRequest(item)){legacy.push(item);return}
   const countedAsk=createOfficialRltCountedAsk287();
   const kind=item.tool.name==='AskUserQuestion'?'permission_ask_user_question':'permission_file';
   const N=item.permissionResult.behavior==='ask'?item.permissionResult.askPatience:undefined;
   // Raw xe reserves its host order between the outer hold and io's hold.
   N?.hold();
   const options=officialPermissionOptions287(getExecutionSession287().host,item);
   N?.hold();
   const descriptor287=buildPermissionDescriptor287(item);
   const payload={...item,descriptor287,permissionProducer287:true,requestId:item.toolUseID,toolName:item.tool.name,...kind==='permission_ask_user_question'?{questions:item.input.questions}:{filePath:item.input.file_path,operationType:'write'}};
   // Complete DO/Ao lives on the same Hpr payload. The leaf host callbacks
   // remain explicit adapters until full xe/YTt transport replaces them.
   const notices=getHookFailureNoticeOwner287();
   notices.openAsk({...sourceAskLabel287(item),toolUseID:item.toolUseID},{order:options.askOrder,onTop:false});
   const reply=requestOfficialRltPermission287(host,kind,payload,{...options,onFirstReveal:N?.resume,signal:item.toolUseContext.abortController.signal,...kind!=='permission_ask_user_question'&&{countedAsk}});
   const business=reply.then(result=>{
    notices.clearHookFailure(item.toolUseID);notices.closeAsk(item.toolUseID);
    if(result.behavior==='allow')return item.onAllow(result.updatedInput,(result.permissionUpdates??[]) as PermissionUpdate[],result.feedback,result.contentBlocks as ContentBlockParam[]|undefined);
    if(result.behavior==='deny')return item.onReject(result.feedback,result.contentBlocks as ContentBlockParam[]|undefined);
    return item.onAbort();
   });
   countedAsk.settleWhen(business);
   void business.catch(error=>{item.onAbort();logError(error)});
  },
  remove(toolUseID){for(const row of rows(store))if((row.payload as ToolUseConfirm).toolUseID===toolUseID)store.dismiss(row.id!);legacy.remove(toolUseID)},
  update(toolUseID,patch){for(const row of rows(store))if((row.payload as ToolUseConfirm).toolUseID===toolUseID)store.update(row.id!,{...row.payload as object,...patch});legacy.update(toolUseID,patch)},
 }
}
export function useOfficialPermissionRequests287(store:OfficialRltDialogStore287){
 const state=useSyncExternalStore(store.subscribe,store.getState,store.getState);
 return useMemo(()=>state.open.filter(row=>publicKinds.has(row.kind)&&(row.payload as {permissionProducer287?:boolean}|undefined)?.permissionProducer287===true).toReversed(),[state]);
}
export function OfficialPermissionRequestRenderer287({store,request,layout,input,...props}:Omit<PermissionRequestProps,'toolUseConfirm'|'onDone'>&{store:OfficialRltDialogStore287;request:OfficialRltDialog287&{id:string};layout:OfficialRltRendererLayout287;input:{value:string;active:boolean}}){
 const item=request.payload as ToolUseConfirm;
 const child=React.useRef({item,props,request});child.current={item,props,request};
 const Component=useMemo(()=>function PermissionComponent287({answer,wouldTakeAnswer}:{answer:(value:unknown)=>boolean;wouldTakeAnswer:()=>boolean}){
  const {item,props,request}=child.current;
  const submit=(value:unknown)=>wouldTakeAnswer()&&(answer as (value:unknown)=>boolean)(value);
  const confirm:ToolUseConfirm={...item,dialogRequestId287:request.id,wouldTakeAnswer287:wouldTakeAnswer,answer287:submit,
   onAbort:()=>{submit({behavior:'cancelled'})},
   onAllow:(updatedInput,permissionUpdates,feedback,contentBlocks)=>{submit({behavior:'allow',updatedInput,permissionUpdates,feedback,contentBlocks})},
   onReject:(feedback,contentBlocks)=>{submit({behavior:'deny',feedback,contentBlocks})},
  };
  // Noncanonical onDone remains implemented for the existing host interface;
  // canonical leaf callbacks explicitly use the answer port, never this path.
  return <PermissionRequest {...props} toolUseContext={item.toolUseContext} toolUseConfirm={confirm} onDone={()=>store.dismiss(request.id)}/>;
 },[store]);
 const components=useMemo(()=>({permission_file:Component,permission_ask_user_question:Component}),[Component]);
 const state=useSyncExternalStore(store.subscribe,store.getState,store.getState);
 // Complete raw tv/$ye operates on Hpr, but only when this registered public
 // request is the actual WL top; unrelated user panels keep their existing UI.
 if(!isOfficialPermissionRequestTop287(state,request))return null;
 return <OfficialRltSourceHost287 store={store} components={components} meta={permissionMeta287} input={input} layout={layout} variant="inline"/>;
}

// Exact relevant Zf + Qh records; existing notification timing is unchanged.
// C15s is the separate assistant blocking budget, not this notification timer.
const permissionMeta287=Object.freeze({permission_file:{notification:{text:"Claude needs your permission"}},permission_ask_user_question:{waitingFor:"input needed",notification:{text:"Claude needs your permission"}}});

export function isOfficialPermissionRequestTop287(state:import('../../utils/officialRlt287.js').OfficialRltDialogState287,request:OfficialRltDialog287){return getOfficialRltTop287(state)===request&&!state.open.some(row=>row.userInvoked===true)}

// Scope is deliberately explicit: relays, specialized asks and remote
// permission policy retain their existing caller until those ports are restored.
// This is not a default handler for arbitrary permission kinds.
function sourceLifecycleApplicable287(params:import('./handlers/interactiveHandler.js').InteractivePermissionParams){
 const {ctx,result}=params,context=ctx.toolUseContext;
 return (ctx.tool===AskUserQuestionTool||publicFileTools287.has(ctx.tool))&&context.abortController.constructor===AbortController&&!sourceRemoteInput287(result.updatedInput??ctx.input)&&
  !params.bridgeCallbacks&&!params.channelCallbacks&&
  !('forRemoteExecution' in context&&context.forRemoteExecution===true)&&!('permissionPhase' in context)&&
  !context.options.mcpClients.some(client=>client.config.type==='sse-ide'||client.config.type==='ws-ide'||client.type==='connected'&&client.name==='ide')&&
  !('offersBlockOutsideReads' in result)&&!('serverApprovalWatch' in result);
}
const permissionRecords287=createPermissionRecords287({d:logError,t:logForDebugging});
const permissionSurface287=createPermissionSurface287({Tt:executionSessionRegistryConstructor287,jn:permissionRuleValueFromString});
function startPublicPermissionLifecycle287(host:OfficialRltRequestHost287,params:import('./handlers/interactiveHandler.js').InteractivePermissionParams,resolve:(result:import('../../types/permissions.js').PermissionDecision)=>void){
 if(!sourceLifecycleApplicable287(params))return false;
 const {ctx,result}=params,context=ctx.toolUseContext;
 if(!context.dialogAgentContext287)throw Error('Source permission lifecycle lacks actual Agent provenance');
 const session=getExecutionSession287();
 const nativeContext={...context,session,agentContext:context.dialogAgentContext287,
  applyAttributionOp(op:{kind:string}){
   if(op.kind!=='incrementPermissionPrompt')throw Error('Unbound attribution operation '+op.kind);
   context.setAppState(state=>({...state,attribution:{...state.attribution,permissionPromptCount:state.attribution.permissionPromptCount+1}}));
  },
  requestDialog(spec:{kind:'permission_ask_user_question'|'permission_file'},descriptor:import('./officialPermissionDescriptors287/native.js').OfficialPermissionDescriptor287|AsyncIterable<import('./officialPermissionDescriptors287/native.js').OfficialPermissionDescriptor287>,options:import('../../utils/officialRlt287.js').OfficialRltRequestOptions287){
   const payload=(descriptor:import('./officialPermissionDescriptors287/native.js').OfficialPermissionDescriptor287)=>({
    assistantMessage:ctx.assistantMessage,tool:ctx.tool,description:params.description,input:descriptor.input,
    toolUseContext:context,toolUseID:ctx.toolUseID,permissionResult:descriptor.permissionResult,descriptor287:descriptor,
    sourceLifecycle287:true,permissionProducer287:true,...descriptor,
    onAbort(){throw Error('Source permission answer must use Hpr')},onAllow(){throw Error('Source permission answer must use Hpr')},onReject(){throw Error('Source permission answer must use Hpr')},
    onUserInteraction(){(require('../../utils/classifierApprovals.js') as typeof import('../../utils/classifierApprovals.js')).clearClassifierChecking(ctx.toolUseID)},recheckPermission:async()=>officialPermissionRecheck287.emit(),
   });
   const data=Symbol.asyncIterator in descriptor?(async function*(){for await(const next of descriptor as AsyncIterable<import('./officialPermissionDescriptors287/native.js').OfficialPermissionDescriptor287>)yield payload(next)})():payload(descriptor as import('./officialPermissionDescriptors287/native.js').OfficialPermissionDescriptor287);
   return requestOfficialRltPermission287(host,spec.kind,data,options);
  },
 };
 // The confirmation reader borrows the original ToolUseContext. The native
 // permission requester below is a specialized Hpr port, not its generic dialog ABI.
 const nativeCtx={...ctx,toolUseContext:nativeContext,permissionMode:readConfirmationPermissionContext(context).mode,
  runHooks:undefined as unknown as ReturnType<typeof createPermissionHookRunner287>,
  handleHookAllow(finalInput:Record<string,unknown>,updates:PermissionUpdate[],suppress:boolean,ended:()=>boolean,time:number){
   if(ended())return ctx.buildAllow(finalInput,{decisionReason:{type:'hook',hookName:'PermissionRequest'}});
   const tool=ctx.tool as typeof ctx.tool&{suppressesAllPermissionUpdates?(input:Record<string,unknown>):boolean;suppressesAlwaysAllowRule?(input:Record<string,unknown>):boolean};
   const filtered=tool.suppressesAllPermissionUpdates?.(ctx.input)===true?permissionDescriptors287.x6(updates):tool.suppressesAlwaysAllowRule?.(ctx.input)===true||suppress?permissionDescriptors287.R6(updates,ctx.tool,readConfirmationPermissionContext(context)):updates;
   return ctx.handleHookAllow(finalInput,filtered,time);
  },
  handleUserAllow(input:Record<string,unknown>,updates:PermissionUpdate[],opts:{feedback?:string;permissionPromptStartTimeMs?:number;contentBlocks?:ContentBlockParam[];decisionReason?:import('../../types/permissions.js').PermissionDecisionReason}){
   permissionSurface287.TWo(session,updates);
   return ctx.handleUserAllow(input,updates,opts.feedback,opts.permissionPromptStartTimeMs,opts.contentBlocks,opts.decisionReason);
  },
 };
 nativeCtx.runHooks=createPermissionHookRunner287({e:ctx.tool,n:nativeContext,s:ctx.input,g:ctx.toolUseID,rFe:executePermissionRequestHooks,wRo:permissionRecords287.wRo,
  // Existing local safety/rule pipeline is an explicit outstanding bP port,
  // not advertised as the whole original predicate.
  bP:async(tool:typeof ctx.tool,input:Record<string,unknown>)=>{tool.inputSchema.parse(input);return checkRuleBasedPermissions(tool,input,context)},
  lne:()=>{throw Error('Account-memory hook rewrite is outside this public tool caller')},LKe:()=>{throw Error('Account-memory answer comparator is not bound')},
  // Raw XM returns the same controller for this explicitly plain-controller
  // caller. Original jpe turn-controller wrappers remain outside this adapter.
  t:logForDebugging,XM:(controller:AbortController)=>controller,
 }).bind(nativeCtx);
 const unavailable=(name:string)=>(..._args:unknown[])=>{throw Error('Unbound source permission port '+name)};
 const native=createOfficialPermissionLifecycle287({
  uge:officialRltCountedAskConstructor287,CHn:createOfficialPermissionResolveOnce287,
  Ko:unavailable('WorkflowTool'),Zo:unavailable('WorkflowConsent'),
  Vbe:officialPermissionDialogSpecs287.Vbe,ZDe:officialPermissionDialogSpecs287.ZDe,
  DO:permissionDescriptors287.DO,Yze:permissionDescriptors287.Yze,
  Ft:createPublicPermissionCatalog287(AskUserQuestionTool,officialPermissionDialogSpecs287.gae,permissionDescriptors287.Ao),
  RC:(require('../../tools/FileEditTool/FileEditTool.js') as typeof import('../../tools/FileEditTool/FileEditTool.js')).FileEditTool,hv:FileWriteTool,
  vce:(require('../../tools/NotebookEditTool/NotebookEditTool.js') as typeof import('../../tools/NotebookEditTool/NotebookEditTool.js')).NotebookEditTool,
  qR:(require('../../tools/FileReadTool/FileReadTool.js') as typeof import('../../tools/FileReadTool/FileReadTool.js')).FileReadTool,
  KR:(require('../../tools/GrepTool/GrepTool.js') as typeof import('../../tools/GrepTool/GrepTool.js')).GrepTool,
  Sv:(require('../../tools/GlobTool/GlobTool.js') as typeof import('../../tools/GlobTool/GlobTool.js')).GlobTool,
  Td:sourceRemoteInput287,
  mf:(require('../../utils/permissions/autoModeState.js') as typeof import('../../utils/permissions/autoModeState.js')).isAutoModeActive,
  Qlt:unavailable('commandNetworkListsOffered'),agn:unavailable('networkListHost'),
  // Telemetry remains disabled by local C. This existing none language port is
  // not a restored plugin syntax registry and is outside the permission result.
  k9e:()=>Promise.resolve('none'),
  le:unavailable('IDE settings'),vt:unavailable('IDE preview'),Lo:unavailable('IDE racer'),
  gae:officialPermissionDialogSpecs287.gae,
  y:()=>{},t:logForDebugging,l:(e:unknown)=>e instanceof Error?e.message:String(e),d:logError,
  pe:readConfirmationPermissionContext,
  Mt:orderClock287,S:(v:unknown)=>v,me:(v:unknown)=>v,c:(v:unknown)=>v,ye:(v:unknown)=>v,
  a:{platform:process.platform},je:SandboxManager,i:logEvent,Ze:logUnaryEvent,Nn:sanitizeToolNameForAnalytics,
  Ybe:unavailable('MCP tool name'),tso:unavailable('MCP metadata'),Qe:(c:typeof nativeContext)=>permissionDescriptors287.Qe(c),
  EE:getHookFailureNoticeOwner287(),ele:officialPermissionRecheck287,
  ...officialPermissionTiming287,bse:permissionRecheckBypassImmune287,
  hae:(c:typeof nativeContext)=>'permissionPhase' in c,
  kf:hasPermissionsToUseTool,vRo:permissionRecords287.vRo,ERo:permissionRecords287.ERo,
  f2t:permissionSurface287.f2t,
  at:isAbortError,st:(e:Error,message:string)=>Object.assign(e,{message:message+': '+e.message}),Z:toError,
  bo:sourceAskLabel287,Z_t:(v:unknown)=>v!==null&&typeof v==='object'&&Symbol.asyncIterator in v,
  Hl:class UnboundControlStreamClosed287 extends Error{},
  tne:(_setter:unknown,id:string)=>{(require('../../utils/classifierApprovals.js') as typeof import('../../utils/classifierApprovals.js')).clearClassifierChecking(id)},
 });
 void native.YTt({...params,ctx:nativeCtx},value=>{
  void Promise.resolve(value).then(resolve,error=>{logError(error);resolve(ctx.cancelAndAbort(undefined,true))});
 }).catch(error=>{logError(error);resolve(ctx.cancelAndAbort(undefined,true))});
 return true;
}
