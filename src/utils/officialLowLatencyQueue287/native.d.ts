import type { QueuedCommand, QueuePriority } from '../../types/textInputTypes.js'
export interface OfficialLowLatencyQueueOpsPorts287 { readonly commands: readonly QueuedCommand[]; readonly notify: () => void; isAbort?:(error:unknown)=>boolean;debug?:(message:string)=>void;logError?:(error:unknown)=>void }
export interface OfficialQueueIntakeOps287 {
 beginInboundIngest(uuid?:string): Disposable & {withdrawn():boolean};
 withdrawInboundIngest(uuid:string):boolean;
 setInFlightDrainBatch(commands:readonly QueuedCommand[]):void;
 clearInFlightDrainBatch(commands?:readonly QueuedCommand[]):void;
 someInFlightDrainCommand(predicate:(command:QueuedCommand)=>boolean):boolean;
 trackSubmission(command:QueuedCommand):Disposable;
 someSubmissionInFlight(predicate:(command:QueuedCommand)=>boolean):boolean;
 noteTurnAppended(messages:readonly {uuid?:string}[]):void;
 getInFlightDrainBatchStanding():'appended'|'passed-over'|undefined;
 takeInboundEnqueueTurn():{prior:Promise<void>;release():void};
}
export interface OfficialLowLatencyQueueOps287 extends OfficialQueueIntakeOps287 { beginPollEventAdmission():void;endPollEventAdmission():void;pollEventAdmissionsPending():number; markCancelPending(uuid:string,options?:{terminalEmitted?:boolean}):boolean; consumeCancelPending(uuid:string):boolean; consumeCancelPendingAcked(uuid:string):boolean; hasCancelPendingAcked(uuid:string):boolean; resetCancelPending():void; registerFoldInFlight(commands: readonly QueuedCommand[]): void; unregisterFoldInFlight(commands: readonly QueuedCommand[]): void; isFoldInFlight(uuid: string): boolean; suspendMidTurnFold(): void; isMidTurnFoldSuspended(): boolean; promoteToNow(uuid: string): boolean; demoteFromNow(uuid: string, raisedFrom: QueuePriority): boolean }
export declare function createOfficialLowLatencyQueueOps287(ports: OfficialLowLatencyQueueOpsPorts287): OfficialLowLatencyQueueOps287
export declare function commitOfficialMidTurnFold287(): void
export declare function isOfficialMidTurnFoldCommitted287(): boolean
