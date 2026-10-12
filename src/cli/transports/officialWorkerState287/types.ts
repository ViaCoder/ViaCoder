export interface WorkerUploaderConfig287 {
 send(body:Record<string,unknown>):Promise<boolean>
 baseDelayMs:number;maxDelayMs:number;jitterMs:number
}
export interface WorkerStateUploader287 {
 enqueue(patch:Record<string,unknown>):void
 flush():Promise<boolean>
 close():void
}
export interface WorkerStateUploaderConstructor287 {
 new(config:WorkerUploaderConfig287):WorkerStateUploader287
}
export interface BatchUploader287<T> {
 enqueue(items:T|readonly T[],options?:{release?:string;together?:boolean}):Promise<void>
 flush(options?:unknown):Promise<void>
 close(options?:unknown):number
 readonly pendingCount:number
 setHold(hold:unknown,reason?:string):void
 release(reason:string):void
}
export type CCRWorkerMethod287='initialize'|'getWorkerState'|'reportState'|'reportInternalMetadata'|'flushWorkerState'|'droppedWorkerStatePatches'|'takeUpFlushPolicy'|'noteToolCallRowsSettled'|'releaseFor'|'queueInternalEvents'|'writeInternalEvent'|'flushInternalEvents'|'internalEventsPending'
