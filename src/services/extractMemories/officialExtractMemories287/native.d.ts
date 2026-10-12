import type {REPLHookContext} from '../../../utils/hooks/postSamplingHooks.js'
import type {SystemMessage,SystemLocalCommandMessage} from '../../../types/message.js'
export type AppendMemorySaved287=(message:Exclude<SystemMessage,SystemLocalCommandMessage>)=>void;
export interface ExtractMemories287 {Zmr(host:object):void;Xos(host:object):boolean;Jos(host:object):boolean;Qos(context:REPLHookContext,append?:AppendMemorySaved287):Promise<void>;Zos(host:object,timeout?:number):Promise<void>;Ee(count:number,manifest:string,scope:boolean,shared:boolean,account:boolean):string;Ie(paths:string[]):{source:string;summary:string;paths:string[]};tt(messages:REPLHookContext['messages'],root:string):string[];rt(cache:REPLHookContext['toolUseContext']['readFileState'],root:string):{onMessage(message:REPLHookContext['messages'][number]):void;completedWritePaths():string[]}}
export declare function createExtractMemories287(ports:Record<string,any>):ExtractMemories287;
