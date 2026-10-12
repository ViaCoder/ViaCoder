import type {Message} from '../../types/message.js'
import type {CacheSafeParams,runForkedAgent} from '../forkedAgent.js'
import type {NonNullableUsage} from '../../services/api/logging.js'
export interface SideQuestionExchange287 {question:string;response:string;fallbackNotice?:string}
export interface SideQuestionHistory287 {exchanges:SideQuestionExchange287[];append(question:string,response:string,notice?:string):void}
export interface SideQuestionRetry287 {retryAttempt:number;maxRetries:number;retryInMs:number;status:number|undefined}
export interface SideQuestionResult287 {response:string|null;synthetic:boolean;usage:NonNullableUsage;aborted?:boolean;refusalFallback?:{originalModel:string;fallbackModel:string;content:string}}
export interface SideQuestionOptions287 {question:string;cacheSafeParams:CacheSafeParams;parentController?:AbortController;onRetry?:(retry:SideQuestionRetry287)=>void;threadHistory?:boolean;history?:SideQuestionExchange287[];turnInProgress?:boolean}
export interface SideQuestionPorts287 {
 Dd:typeof import('../errors.js').AbortError;Bn:()=>AbortController;th:(parent:AbortController)=>AbortController;
 IC:typeof runForkedAgent;Jc:typeof import('../messages.js').createAssistantMessage;Re:typeof import('../messages.js').createUserMessage;fo:typeof import('../messages.js').extractTextContent;
 cqe:(messages:Message[])=>{live:Message[];notice?:{originalModel:string;fallbackModel:string;content:string}};lp:NonNullableUsage;
 historyOwner:(params:CacheSafeParams)=>SideQuestionHistory287|undefined;
 extract:(messages:Message[],original:(messages:Message[])=>Pick<SideQuestionResult287,'response'|'synthetic'>)=>Pick<SideQuestionResult287,'response'|'synthetic'>;
}
export function createSideQuestion287(ports:SideQuestionPorts287):{run:(options:SideQuestionOptions287)=>Promise<SideQuestionResult287>;find:(text:string)=>{word:string;start:number;end:number}[];pending:(messages:Message[])=>Message|undefined;extract:(messages:Message[])=>Pick<SideQuestionResult287,'response'|'synthetic'>;historyMessages:(exchanges:SideQuestionExchange287[])=>Message[]};
