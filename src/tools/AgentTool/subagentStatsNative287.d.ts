import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
export type SubagentKillCause287='parent'|'user'|'system'
export type SubagentRefusal287='depth_limit'|'concurrency_limit'|'budget'
export interface SubagentRunToken287 {completed():void;failed():void;killed(cause?:SubagentKillCause287):void;cancelledAfterCompletion():void}
export interface SubagentStatsSnapshot287 {
 spawned:number;requested:{background:number;foreground:number;unset:number};started_in_background:number;max_depth:number;spawned_by_subagents:number;completed:number;failed:number;killed:Record<SubagentKillCause287,number>;refused:Record<SubagentRefusal287,number>;by_type:Record<string,number>
}
export interface SubagentStatsOwner287 {
 recordSpawn(input:{agentType:string;runInBackground?:boolean;runsInBackground:boolean;depth:number}):SubagentRunToken287
 recordRefused(reason:SubagentRefusal287):void
 snapshot():SubagentStatsSnapshot287
 reset():void
}
export interface SubagentStatsNative287 {registry:{of(session:ExecutionSession287):SubagentStatsOwner287;peek(session:ExecutionSession287):SubagentStatsOwner287|undefined;drop(session:ExecutionSession287):void};snapshot(session?:ExecutionSession287):SubagentStatsSnapshot287|undefined}
export function createSubagentStatsNative287(ports:{sessionRegistry:new<T>(factory:()=>T)=>{of(session:ExecutionSession287):T;peek(session:ExecutionSession287):T|undefined;drop(session:ExecutionSession287):void};logError(error:unknown):void}):SubagentStatsNative287
