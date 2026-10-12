import type {QueuedCommand} from '../../types/textInputTypes.js'
export interface PrintDispatchQueue287 {
 peek(predicate:(command:QueuedCommand)=>boolean):QueuedCommand|undefined
 dequeue(predicate:(command:QueuedCommand)=>boolean):QueuedCommand|undefined
 getCommandQueue():QueuedCommand[]
 getCommandQueueSnapshot():readonly QueuedCommand[]
 subscribe(listener:()=>void):()=>void
 consumeCancelPending(uuid:string):boolean
 consumeCancelPendingAcked(uuid:string):boolean
}
export interface PrintDispatchStart287 {
 waitForHead(predicate:()=>((command:QueuedCommand)=>boolean)):Promise<void>|undefined
 takeHead(predicate:(command:QueuedCommand)=>boolean,take:()=>QueuedCommand|undefined):QueuedCommand|undefined
 admits(command:QueuedCommand):boolean
}
export declare function createPrintDispatchStartNative287(ports:{mainAgentId():string;isMainThreadAgent(command:QueuedCommand):boolean;startUuids:{get():Set<string>|undefined};startJoin:{get():Promise<void>|undefined};aheadUuids:{has(uuid:string|undefined):boolean}}):{
 notifyTurnStarting(this:{onTurnStarting?:(mode:string,taskId?:string)=>void},mode:string,taskId?:string):void;
 isMainThread(command:QueuedCommand):boolean;endSessionHead(command:QueuedCommand):boolean;
 StartGate:new(queue:PrintDispatchQueue287,stopping:()=>boolean)=>PrintDispatchStart287
}
