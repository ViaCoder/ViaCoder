import {test,expect} from 'bun:test'
import '../screens/REPL.js'
import {createExecutionOwners287} from '../services/context/officialExecutionOwners287/native.js'
import {getExecutionSession287,runWithExecutionSession287,getLegacyExecutionContext287} from '../services/context/execution287.js'
import {getPrintHostSource287} from '../cli/printOwnership287/publicHostRuntime287.js'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getProductionHotMessageQueue287} from '../utils/hotSessionController287/runtime.js'
import * as legacy from '../utils/messageQueueManager.js'
import {getDefaultAppState} from '../state/AppStateStore.js'
import {registerTask} from '../utils/task/framework.js'
import {setOriginalCwd,setProjectRoot,setCwdState,setIsInteractive} from '../bootstrap/state.js'
import {createPrintLifecycle287} from '../tools/GetTaskTool/printLifecycle287.js'
import {createPrintControlRuntime287} from '../cli/printOwnership287/controlNative.js'
import {commandLacksUserIntent287} from '../cli/printOwnership287/dispatchPolicyNative.js'
import {readFileSync,writeFileSync} from 'node:fs'
import {asAgentId} from '../types/ids.js'
import type {QueuedCommand} from '../types/textInputTypes.js'

// The original queue's internal persistence flag is not part of the public input ABI.
function enqueueUnlogged(command:QueuedCommand):void {
 const unlogged:QueuedCommand & {unlogged:boolean}={...command,unlogged:true}
 legacy.enqueue(unlogged)
}

test.skipIf(!process.env.C2_QUEUE_ROOT)('production canonical notification queue has one session-root owner',async()=>{
const base=process.env.C2_QUEUE_ROOT!,project=base+'/tmp/project'
const report:any={scope:'Production manager facade -> original Ml/Gm/Tct -> original ZPo/Dbn/hy -> actual CLI DispatchIntake; duplicate/root/subscription/removal/cancel/fold/ingest/poll. No Agent launch, Read, model/network/OS launcher',runs:[]}
const unexpected=(name:string)=>()=>{throw Error('unexpected fixture capability '+name)}
const owners=createExecutionOwners287({executionContext:getExecutionSession287,legacyContext:getLegacyExecutionContext287})
const session=owners.createSession({host:owners.createHost(),id:'c2-notification-canonical',project:{cwd:project,originalCwd:project,projectRoot:project}})
const foreign=owners.createSession({host:session.host,id:'c2-foreign-root',project:{cwd:project,originalCwd:project,projectRoot:project}})
const printSource=readFileSync(new URL('../cli/print.ts',import.meta.url),'utf8')
const controlStart=printSource.indexOf('  const printControlQueue287 = {'),controlEnd=printSource.indexOf('\n  const printPrepareTurn287',controlStart)
const queueStart=printSource.indexOf('  const printSourceQueue287='),queueEnd=printSource.indexOf('\n  const printLexicalCaller287',queueStart)
if([controlStart,controlEnd,queueStart,queueEnd].some(n=>n<0))throw Error('actual print queue blocks drift')
const blocks=printSource.slice(controlStart,controlEnd)+'\n'+printSource.slice(queueStart,queueEnd)
const compiled=new Bun.Transpiler({loader:'ts'}).transformSync(blocks)
const makePrintQueue=new Function('queueCaller287','printControlMainAgentId287','with(queueCaller287){'+compiled+';return printSourceQueue287;}')
let app:any=getDefaultAppState(),cli:any,prewait:any
const setAppState=(f:any)=>{app=f(app)}
function makeIntake(queue:any){
 const ctl=createPrintControlRuntime287({executionContext:getExecutionSession287,legacyContext:getLegacyExecutionContext287,noteStop:unexpected('noteStop'),midTurnFoldCommitted:legacy.isMidTurnFoldSuspended,analytics:unexpected('analytics'),logError:unexpected('logError'),revokeCodeliveredFollowups:unexpected('revoke'),cancelArtifactHandoffs:unexpected('cancelArtifact')})
 prewait=new ctl.prewaitLatch({messageQueue:queue,commandLacksUserIntent:commandLacksUserIntent287})
 cli=createPrintLifecycle287({getAppState:()=>app,setAppState,state:{running:false,inputClosed:false,abortController:undefined,runPhase:undefined},maxBudgetUsd:undefined,remoteTransport:()=>false,output:{enqueue:unexpected('output')},receivedMessageUuids:{has:()=>false,track:unexpected('track')},kick:unexpected('kick')})
 return cli.createDispatchIntake({messageQueue:queue,prewaitLatch:prewait,commandLacksUserIntent:commandLacksUserIntent287,holdsEvalSettles:()=>false,notifyCommandLifecycle:unexpected('commandLifecycle')})
}

 if(process.env.HOME!==base+'/tmp/home'||process.env.CLAUDE_CONFIG_DIR!==process.env.HOME+'/config'||Reflect.get(globalThis,'confinementFileGuardViolations287')!==0)throw Error('original offline guard and isolated HOME required')
 let unsub:undefined|(()=>void),unremove:undefined|(()=>void)
 try{
 setOriginalCwd(project);setProjectRoot(project);setCwdState(project);setIsInteractive(false)
 await runWithExecutionSession287(session,async()=>{
  const lifecycle=getOriginalModsLifecycle287(),raw=lifecycle.clearSourceModule287('chunk-mphp7acd.js') as any
  const clear=(name:string)=>lifecycle.clearLifecycleSource287('chunk-mphp7acd.js',name) as any
  expect(clear('hy')).toBe(raw.hy);expect(clear('Mi')).toBe(raw.Mi);expect(clear('Tct')).toBe(raw.Tct);expect(clear('ZPo')).toBe(raw.ZPo)
  expect(raw.Dbn.of(session)).toBe(raw.tQe());expect(raw.tQe().installed).toBe(false)
  const initial=raw.hy(),main=asAgentId(session.identity.mainAgentId(session.id))
  const Ml=getPrintHostSource287('chunk-xapeakym.js','Ml') as Function
  const host={session,getAppState:()=>app,setAppState,tools:[],commands:[],mcpClients:[],agents:[],thinkingConfig:{type:'disabled'},customSystemPrompt:'queue-only fixture'}
  const turn={phase:'query',messages:[],mainLoopModel:'unused',appState:app,abortController:new AbortController()}
  const bootstrap=Ml(host,turn)
  const id='c2-production-terminal',description='queue-only terminal task',finalMessage='C2_ACTUAL_FACADE_QUEUE_MARKER'
  const notify=(id:string,context:any)=>raw.Tct({taskId:id,description,status:'completed',taskRegistry:context.taskRegistry,finalMessage})
  const task=(id:string)=>registerTask({id,type:'local_agent',status:'completed',description,notified:false,startTime:Date.now(),ownerAgentId:main,outputFileUnreadable:true} as any,setAppState)
  task(id);notify(id,bootstrap)
  const notice=initial.getCommandQueue().find((c:any)=>c.taskId===id)
  expect(notice).toBeDefined();expect(app.tasks[id].notified).toBe(true);expect(notice.agentId).toBe(main)
  const queue=legacy.getCanonicalMessageQueue287(),repl=getProductionHotMessageQueue287(),print=makePrintQueue(legacy,main)
  expect(queue).toBe(raw.hy());expect(raw.tQe().installed).toBe(true);expect(queue.getCommandQueue()[0]).toBe(notice);expect(initial.getCommandQueue()).toHaveLength(0)
  expect(legacy.getPendingNotificationsSnapshot()).toBe(queue.getCommandQueueSnapshot());expect(repl.getCommandQueue()[0]).toBe(notice);expect(print.getCommandQueue()[0]).toBe(notice)
  expect(raw.ZPo(unexpected('second installation'))).toBe(queue)
  const ctx=Ml({...host,messageQueue:print},turn)
  expect(ctx.session).toBe(session);expect(ctx.messageQueue).toBe(print);expect(ctx.agentContext.agentType).toBe('main')
  notify(id,ctx);expect(queue.getCommandQueue()).toHaveLength(1)
  let changed=0,removed:readonly any[]|undefined
  unsub=legacy.subscribeToCommandQueue(()=>{expect(getExecutionSession287().root).toBe(session.root);changed++})
  unremove=legacy.subscribeToRemovals(commands=>{expect(getExecutionSession287().root).toBe(session.root);removed=commands})
  const view=session.withProject({cwd:project})
  expect(runWithExecutionSession287(view,legacy.getCanonicalMessageQueue287)).toBe(queue)
  const foreignQueue=runWithExecutionSession287(foreign,()=>{enqueueUnlogged({mode:'prompt',value:'foreign input'});return legacy.getCanonicalMessageQueue287()})
  expect(foreignQueue).not.toBe(queue);expect(foreignQueue.getCommandQueueLength()).toBe(1);expect(changed).toBe(0)
  runWithExecutionSession287(foreign,()=>queue.recheckCommandQueue());expect(changed).toBe(1)
  const intake=makeIntake(print),taken=await intake.take()
  expect(taken?.command).toBe(notice);expect(String(taken?.command.value)).toContain(finalMessage);expect(queue.getCommandQueue()).toHaveLength(0);prewait.dispose()
  const id2='c2-production-post-install';task(id2);notify(id2,ctx)
  const second=raw.hy().getCommandQueue()[0]
  expect(legacy.peek(c=>c.taskId===id2)).toBe(second);expect(repl.getCommandQueueSnapshot()[0]).toBe(second)
  expect(legacy.removeByFilter(c=>c===second,{reason:'fixture notification consumed'})).toEqual([second]);expect(removed?.[0]).toBe(second)
  notify(id2,ctx);expect(legacy.getCommandQueue()).toHaveLength(0)
  enqueueUnlogged({mode:'prompt',value:'priority test',uuid:'00000000-0000-4000-8000-000000000287'})
  const command=legacy.peek()!;expect(command.agentId).toBe(main)
  expect(legacy.promoteToNow('00000000-0000-4000-8000-000000000287')).toBe(true);expect(raw.hy().peek().priority).toBe('now')
  legacy.registerFoldInFlight([command]);expect(raw.hy().isFoldInFlight('00000000-0000-4000-8000-000000000287')).toBe(true);expect(legacy.demoteFromNow('00000000-0000-4000-8000-000000000287','next')).toBe(true);expect(legacy.promoteToNow('00000000-0000-4000-8000-000000000287')).toBe(false)
  legacy.unregisterFoldInFlight([command]);expect(legacy.promoteToNow('00000000-0000-4000-8000-000000000287')).toBe(true);expect(legacy.demoteFromNow('00000000-0000-4000-8000-000000000287','next')).toBe(true)
  expect(legacy.markCancelPending('00000000-0000-4000-8000-000000000287',{terminalEmitted:true})).toBe(true);expect(raw.hy().hasCancelPendingAcked('00000000-0000-4000-8000-000000000287')).toBe(true);expect(legacy.consumeCancelPending('00000000-0000-4000-8000-000000000287')).toBe(true);expect(legacy.consumeCancelPendingAcked('00000000-0000-4000-8000-000000000287')).toBe(true)
  legacy.remove([command]);expect(removed?.[0]).toBe(command);expect(legacy.getCommandQueue()).toHaveLength(0)
  const inbound=legacy.beginInboundIngest('c2-ingest');expect(raw.hy().withdrawInboundIngest('c2-ingest')).toBe(true);expect(inbound.withdrawn()).toBe(true);inbound[Symbol.dispose]()
  const submission={mode:'prompt',value:'submission',uuid:'c2-standing',agentId:main} as any
  const lease=legacy.trackSubmission(submission);expect(raw.hy().someSubmissionInFlight((c:any)=>c===submission)).toBe(true)
  legacy.setInFlightDrainBatch([submission]);expect(raw.hy().someInFlightDrainCommand((c:any)=>c===submission)).toBe(true)
  legacy.noteTurnAppended([{uuid:'c2-standing'}]);expect(raw.hy().getInFlightDrainBatchStanding()).toBe('appended');expect(legacy.someSubmissionInFlight(c=>c===submission)).toBe(false);legacy.clearInFlightDrainBatch([submission]);lease[Symbol.dispose]()
  legacy.beginPollEventAdmission();expect(raw.hy().pollEventAdmissionsPending()).toBe(1);raw.hy().endPollEventAdmission();expect(legacy.pollEventAdmissionsPending()).toBe(0)
  const delivered=legacy.enqueuePollEvent287({kind:'c2-fixture-event',content:'poll delivery',wake:true})
  const poll=raw.hy().getCommandQueue()[0];expect(poll.mode).toBe('poll-event');expect(legacy.countWakePollEvents287()).toBe(1)
  expect(legacy.selectPollEventChunk287([poll])[0]).toBe(poll);expect(legacy.countRemainingWakePollEventsAfter287([poll])).toBe(0)
  const chunk=legacy.takeWakePollEvents287();expect(chunk.commands[0]).toBe(poll);expect(chunk.remainingWakeCount).toBe(0);legacy.settleDeliveredPollEvents287(chunk.commands);await delivered
  const group=legacy.enqueuePollEventGroup287([{kind:'c2-fixture-event',content:'first'},{kind:'c2-fixture-event',content:'second'}])
  const grouped=raw.hy().getCommandQueue();expect(grouped).toHaveLength(2);expect(grouped[0].pollEvent.group).toBe(grouped[1].pollEvent.group)
  const groupedChunk=legacy.takeWakePollEvents287();expect(groupedChunk.commands[0]).toBe(grouped[0]);legacy.settleDeliveredPollEvents287(groupedChunk.commands);await group
  const dropped=legacy.enqueuePollEvent287({kind:'c2-fixture-event',content:'drop',wake:true});const rejected=dropped.then(()=>{throw Error('drop unexpectedly delivered')},error=>String(error))
  legacy.clearCommandQueue({reason:'fixture clear'});expect(await rejected).toContain('discarded undelivered');expect(legacy.getCommandQueue()).toHaveLength(0)
  legacy.suspendMidTurnFold();expect(raw.hy().isMidTurnFoldSuspended()).toBe(true)
  legacy.resetCommandQueue();expect(raw.hy().isMidTurnFoldSuspended()).toBe(false);expect(legacy.getPendingNotificationsSnapshot()).toBe(raw.hy().getCommandQueueSnapshot())
  const changeCount=changed;unsub();unsub=undefined;unremove();unremove=undefined
  enqueueUnlogged({mode:'prompt',value:'unsubscribed'});expect(changed).toBe(changeCount);legacy.dequeueAll()
  expect(foreignQueue.getCommandQueueLength()).toBe(1);runWithExecutionSession287(foreign,legacy.resetCommandQueue)
  report.owner={sameRawClear:true,ZPoOriginal:true,sameQueue:queue===raw.hy(),installed:true,adoptedObjectIdentity:true,actualCLITakeSameObject:taken?.command===notice,taskNotified:true,duplicateCount:1,sameRootView:true,foreignRootIsolated:true,subscriptionOwnerPinned:true,removedObjectIdentity:true,pollGroupDelivered:true,pollDropRejected:true,foldCancelIngestShared:true}
  report.status='production-facade-canonicalTct-actualCLI-take-passed'
 })
 }catch(error){report.error=String(error);throw error}
 finally{unsub?.();unremove?.();prewait?.dispose();report.guardViolations=Reflect.get(globalThis,'confinementFileGuardViolations287');writeFileSync(base+'/implementation/production-observation.json',JSON.stringify(report,null,2));expect(report.guardViolations).toBe(0)}
},15000)
