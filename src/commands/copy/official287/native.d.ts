import type {LocalJSXCommandCall} from '../../../types/command.js';
import type {Message} from '../../../types/message.js';
export function createCopyCommand287(ports:Record<string,unknown>):{call:LocalJSXCommandCall;copy(text:string,filename:string):Promise<string>;collect(messages:Message[]):string[]};
