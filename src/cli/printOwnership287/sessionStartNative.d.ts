import type {Message} from '../../types/message.js'
import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {StdinMessage} from '../../entrypoints/sdk/controlTypes.js'
import type {SDKMessage} from '../../entrypoints/agentSdkTypes.js'
export interface ClaimFirstTurn287 {
 start():void
 firstTurnGate():Promise<void>|undefined
 pendingJoin():Promise<void>|undefined
 setAgentInitialPrompt(value:string|undefined):void
 queued(value:unknown):void
 cannotQueue(reason:string):void
 inputEnded():void
}
export function createClaimFirstTurnNative287(ports:{
 e:unknown;I:object
 WY(e:unknown,options:unknown):Promise<Message[]>
 qr(messages:Message[]):void
 wr(name:string,duration:number,start:number):void
 PIr():string|undefined
 JO:{of(e:unknown):{pending:number;tail:Promise<unknown>}}
 Q:{enqueue(command:QueuedCommand):void}
 Ge():string
 r:{prependUserMessage(value:string):void}
 qz:Function
 Jn():void
 t(message:string,options?:{level:'error'|'warn'}):void
 l(error:unknown):string
}):ClaimFirstTurn287
export interface ClaimIngressHost287 {
 prependedLines:string[]
 locallyPrependedMessages:WeakSet<object>
 prependWaker:(()=>void)|null
 hasUnconsumedInput:boolean
 maxLineChars:number
 input:AsyncIterable<string>
 processLine(line:string):Promise<StdinMessage|SDKMessage|undefined>
 exitOnFatalInput(message:string):Promise<void>
 onInputClosed():void
}
export function createClaimIngressNative287(ports:{ne(level:'info'|'warn',event:string,data:Record<string,unknown>):void;ke(message:StdinMessage|SDKMessage):Record<string,unknown>}):{
 maxLineChars:number
 read(this:ClaimIngressHost287):AsyncGenerator<StdinMessage|SDKMessage>
 prependUserMessage(this:ClaimIngressHost287,value:string):void
 isLocallyPrependedMessage(this:ClaimIngressHost287,message:object):boolean
}
