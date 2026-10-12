import {basename,dirname,join} from 'node:path'
import {getWorkflowExecutionSource287} from '../../tools/WorkflowTool/officialExecution287/runtime.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import type {LocalWorkflowTaskState} from './LocalWorkflowTask.js'
export type WorkflowJournalRecord=
 | {type:'launched'}
 | {type:'started';key:string;agentId:string;remoteSessionId?:string}
 | {type:'result';key:string;agentId:string;result:unknown;foreignArtifactContent?:boolean}
 | {type:'failed';key:string;agentId:string}
export type PersistedWorkflowRun=Pick<LocalWorkflowTaskState,'workflowName'|'summary'|'status'|'startTime'|'scriptPath'|'args'|'result'|'error'|'workflowProgress'|'agentCount'|'totalTokens'|'totalToolCalls'|'logs'|'title'|'phases'|'defaultModel'> & {runId:string;taskId:string;timestamp?:string;script?:string;durationMs?:number;endTime?:number;outputFile?:string}
export function getWorkflowRunDirectory(runId:string):string{
 if(!/^wf_[a-z0-9_-]{6,64}$/.test(runId))throw Error('Invalid workflow run ID')
 return (getOriginalModsLifecycle287().clearLifecycleSource287('chunk-vnd55cbp.js','MO') as (id:string)=>string)(runId)
}
export function getWorkflowRunBaseDirectory():string{return dirname(getWorkflowRunDirectory('wf_base000'))}
export function listPersistedWorkflowRuns():Promise<PersistedWorkflowRun[]>{return (getWorkflowExecutionSource287('chunk-vnd55cbp.js').Iyr as ()=>Promise<PersistedWorkflowRun[]>)()}
export function workflowAgentKey(index:number,prompt:string,options:unknown):string{return (getWorkflowExecutionSource287('chunk-jxy1fa30.js')._o as (p:string,o:unknown,label:string)=>string)(prompt,options,String(index))}
interface OriginalJournal287 {path:string;load():Promise<{results:Map<string,Extract<WorkflowJournalRecord,{type:'result'}>>;started:Map<string,WorkflowJournalRecord[]>;failed:Set<string>}>;append(record:WorkflowJournalRecord):Promise<void>;restoreState():Promise<string>}
// Compatibility reader delegates v2 records to the original Zt file/StorageV5
// journal. Production jkt/xo keeps its original instance and original key ABI.
export class WorkflowJournal {
 readonly original:OriginalJournal287
 constructor(runDirectory:string){const Zt=getWorkflowExecutionSource287('chunk-jxy1fa30.js').Zt as new(id:string)=>OriginalJournal287;this.original=new Zt(basename(runDirectory))}
 get path():string{return this.original.path}
 async load():Promise<Map<string,unknown>>{return new Map([...(await this.original.load()).results].map(([key,record])=>[key,record.result]))}
 append(record:WorkflowJournalRecord):Promise<void>{return this.original.append(record)}
}
