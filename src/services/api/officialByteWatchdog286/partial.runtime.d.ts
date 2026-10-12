import type {AssistantMessage,StreamEvent} from '../../../types/message.js'
export declare function createOfficialPartialFinal286(ports:{
 Zs:boolean;ug:boolean;Pa:string;zd:boolean;$u:boolean;ef:boolean;jpe:boolean;xT:boolean
 Ko:(input:{content:string;error:'server_error';truncatedAfterOutput?:boolean})=>AssistantMessage
}):AssistantMessage
export declare function createOfficialStreamClose286(ports:{El:boolean;Gi:number|null}):()=>Generator<StreamEvent,void>
