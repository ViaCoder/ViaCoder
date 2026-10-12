import type {Message} from '../../types/message.js'
export interface ArrivalConversation287 {
 readonly isHookable:boolean;keep(rows:Message[]):void;rows():Message[];cut():void;cuts():number;
 inOrder<T>(callback:()=>Promise<T>):Promise<T>;settled():Promise<unknown>;
 behindAppends(callback:()=>void):void|Promise<unknown>;
 attachLoop():{taken():Message[];[Symbol.dispose]():void};arrived(rows:Message[]):void;
}
export interface ArrivalRowsReader287 {
 through<T,R>(source:AsyncGenerator<T,R,unknown>):AsyncGenerator<T,R,unknown>;
 appended(row:Message):Promise<void>;answeredAs(row:Message,source:Message):void;
 withArrivedRows(rows:Message[]):Message[];[Symbol.dispose]():void;
}
export interface ArrivalTurnSpan287 {before?:Message['uuid'];next?:ArrivalTurnSpan287}
export interface ArrivalTurnEvents287 {
 begin():string;enqueue(event:string,callback:()=>Promise<Message[]>):void;
 settled():Promise<void>;sever():void;
}
export type SourceMessageOp287=
 | {type:'append';messages:Message[]}|{type:'replace-all';messages:Message[]}
 | {type:'remove-by-uuid';uuid:Message['uuid']}|{type:'replace-by-uuid';uuid:Message['uuid'];message:Message}
 | {type:'insert-after-uuid';uuid:Message['uuid'];messages:Message[]}
 | {type:'replace-last-ephemeral-progress';message:Extract<Message,{type:'progress'}>}
 | {type:'append-or-move-by-uuid';message:Message}
 | {type:'remove-uuids-and-append';excludeUuids:Set<Message['uuid']>;message:Message}
 | {type:'update';updater:(rows:Message[])=>Message[]};
export interface ArrivalWriter287 {
 record(force?:boolean):Promise<string|null>;appendHostRows(rows:Message[]):void;isHostRow(row:Message):boolean;
 evict(uuid:string):void;flushBeforeCompactBoundary(row:Message):Promise<void>;
 applyCompactBoundary(row:Message):void;settlePreservedTail(uuid:string):void;flushUnanchoredPreservedTail():void;
}
export interface ArrivalEngine287 {getMessages():readonly Message[];keepArrivedRows(rows:Message[]):void;appendMessages(rows:Message[]):void}
export interface ArrivalStage287 {
 submitMessage<T,O extends {abortController?:AbortController}>(input:string|import('@anthropic-ai/sdk/resources/messages.mjs').ContentBlockParam[],options:O|undefined,runner:(input:string|import('@anthropic-ai/sdk/resources/messages.mjs').ContentBlockParam[],options:O|undefined,controller:AbortController)=>AsyncGenerator<T,void,unknown>):AsyncGenerator<T|import('../../entrypoints/agentSdkTypes.js').SDKMessage,void,unknown>;
 interrupt(reason?:string):void;controller():AbortController;disposeController():void;
 linkTurnSpan(span:ArrivalTurnSpan287):void;retireTurnSpan(span:ArrivalTurnSpan287):void;
 finalizeView(writer:ArrivalWriter287,tools:import("../../Tool.js").Tools):void;
 readonly turnEvents:ArrivalTurnEvents287;flushTurnNotes(writer:Pick<ArrivalWriter287,'record'>,rows:Message[],persist:boolean,eager:boolean):Promise<void>;
 optionalPhase<T>(phase:string,callback:()=>T,fallback:undefined):T|undefined;duration(start:number,end:number):number;
 keepArrivedRows(rows:Message[]):void;appendMessages(rows:Message[]):void;
 setMessages(updater:(rows:Message[])=>Message[]):void;
 applyMessageOp(operation:SourceMessageOp287):void;
 appendInput(rows:Message[]):Promise<void>;
 enter():void;hold():void;release():void;prepare(messages:Message[],persistSession:boolean):ArrivalWriter287;finish():void;
}
export function createArrivalStage287(ports:object):ArrivalStage287
