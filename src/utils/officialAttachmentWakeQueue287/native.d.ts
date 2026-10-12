import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {ContentBlockParam} from '@anthropic-ai/sdk/resources/messages.mjs'
export interface PollEventInput287 {kind:string;content?:string;element?:string;declared?:{declaration:{kind:string;fields:{name:string;is:unknown;required?:boolean}[]};at:string;fields:object};wake?:boolean;media?:ContentBlockParam[];provenance?:unknown;allowReservedKind?:boolean}
export interface AttachmentWakeQueuePorts287 {
 commands:QueuedCommand[];count:typeof import('../array.js').count;
 execution():{id:string;identity:{mainAgentId(id:string):string}};
 legacy():{sessionId?:string}|undefined;
 notify?():void;log?(operation:'enqueue'|'dequeue',content?:string):void;
 sourceBindings?:Readonly<Record<"q8e" | "Y8e" | "Nmn" | "Bmn" | "R2n" | "$mn" | "eUo" | "jmn" | "P" | "m" | "j_e" | "X1e" | "oue" | "Q8e" | "lSe" | "tb" | "YUr",unknown>>;
}
export function createAttachmentWakeQueue287(ports:AttachmentWakeQueuePorts287):{countRemainingWakePollEventsAfter(commands:readonly QueuedCommand[]):number;countWakePollEvents():number;currentAgentId():string;enqueuePollEvent(input:PollEventInput287):Promise<void>;enqueuePollEventGroup(inputs:PollEventInput287[]):Promise<void>;takeWakePollEvents():{commands:QueuedCommand[];remainingWakeCount:number};settleDelivered(commands:readonly QueuedCommand[]):void;settleDropped(commands:readonly QueuedCommand[],reason:string):void;selectPollEvents(commands:QueuedCommand[]):QueuedCommand[]}
