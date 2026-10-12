import type {UUID} from 'node:crypto'
import type {MessageOrigin} from '../../types/message.js'
import type {AgentTaskRegistry287} from '../AgentTool/agentAdmissionNative287.js'
export interface AgentDeliveryProof287 {sender:string;recipient:string;senderName?:string;flagged?:boolean;report?:unknown}
export interface AgentPendingMessage287 {text:string;origin?:MessageOrigin;isMeta?:boolean;shownAs?:UUID;userInitiatedAt?:number;forwarded?:unknown}
export interface AgentDeliveryOptions287 {origin?:MessageOrigin;isMeta?:boolean;shownAs?:UUID;userInitiated?:boolean;forwarded?:unknown}
export interface AgentDeliveryNative287 {
 Zpe(sender:string,body:string):string;eQe(body:string):string
 ADt(id:string,message:string,registry:AgentTaskRegistry287,options?:AgentDeliveryOptions287):void
 P5(id:string,message:string,registry:AgentTaskRegistry287,options?:AgentDeliveryOptions287):boolean
 x5(id:string,registry:AgentTaskRegistry287):AgentPendingMessage287[]
 w4e(task:unknown):boolean
 _9n(proof:AgentDeliveryProof287):AgentDeliveryProof287
 vgn(sender:string,recipient:string):AgentDeliveryProof287|undefined
 IUo(sender:string):boolean;hSe(sender:string):void
 _Ye(task:unknown,sender:string):AgentDeliveryProof287[]|undefined
}
export function createAgentDeliveryNative287(ports:Record<string,unknown>&{logError(error:unknown):void;event(event:string,reason:string):void;taskSession():{agentStrandedMessages:{emit(id:string):void}}}):AgentDeliveryNative287
export interface HandbackReport287 {text:string;warning?:string}
export interface HandbackContract287 {handbackContract?:boolean;handbackRecipient?:string;handbackBounces?:number;handbackReport?:HandbackReport287}
export type HandbackReview287={kind:'blocked';reason:string}|{kind:'refused'}|{kind:'unavailable';model?:string;httpStatus?:number;errorKind?:string}
export interface AgentDeliveryNative287 {
 HFe(text:string,origin:Extract<MessageOrigin,{kind:'peer'}>,metadata?:{isMeta?:boolean;sendMessageToolAbsent?:boolean}):string
 BRo(message:unknown):false|'tool'|'mcp_meta'
 $Me(tool:import('../../Tool.js').Tool,input:Record<string,unknown>,context:import('../../Tool.js').ToolUseContext,result:import('../../types/permissions.js').PermissionDecision):import('../../types/permissions.js').PermissionDecision|undefined
 kre(tool:import('../../Tool.js').Tool,result:import('../../types/permissions.js').PermissionDecision):import('../../types/permissions.js').PermissionDecision
 OUo(id:string,contract:boolean):void;HUo(id:string):void
 Dw:string;yYe():boolean;DUo(context:{mode:string}):boolean
 BUo(input:{contract:boolean;registered:{recipient?:string};callerInbox:string;resumerInbox:string;inboxReadable(id:string):boolean}):HandbackContract287
 UUo(task:unknown):boolean|undefined;$Uo(messages:readonly unknown[]):'reminder'|'countermand'|undefined
 MUo():string;LUo():string;WUo:string;GUo(continuable:boolean):string;jUo(flagged:boolean,name:string):string
 cx(text:string,options?:{prependMarker?:boolean}):{sanitized:string;findings:unknown[]}
 qUo(content:{type:'text';text:string}[]):{content:{type:'text';text:string}[];findings:unknown[]}
 w9n(text:string):string;mmt(text:string):string;aUe(content:{text:string}[]):string
 ban(id:string,registry:AgentTaskRegistry287):boolean
 YRo(input:{result:{handback?:string;content:readonly unknown[]};deliveries?:readonly AgentDeliveryProof287[];reviewWarning?:string|null;worktreePath?:string;maxTurnsReached?:unknown;checkpoint?:boolean;reportedBeforePass?:boolean}):string|undefined
 rQe(input:{handbackRecipient?:string;routedAgentId?:string}):boolean
 UMe(toolUseId:string,review:HandbackReview287):void;nRo(toolUseId?:string):HandbackReview287|undefined
 Rxt(result:{shouldBlock:boolean;refusedBySafeguard?:boolean;unavailable?:boolean;transcriptTooLong?:boolean;failureMode?:string;errorKind?:string;model?:string;httpStatus?:number}):HandbackReview287|undefined
 createHandback(ports:Record<string,unknown>):import('../../Tool.js').Tool
}

export interface AgentDeliveryNative287 {S9n(task:unknown):({handbackBounces?:number}|undefined);FUo:number;NUo:string;sq(id:string,registry:AgentTaskRegistry287):void;b4e(id:string,registry:AgentTaskRegistry287):boolean}
