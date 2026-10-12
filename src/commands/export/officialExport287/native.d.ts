import type {ReactNode} from 'react'
import type {ToolUseContext} from '../../../Tool.js'
import type {Message} from '../../../types/message.js'
import type {LocalJSXCommandOnDone} from '../../../types/command.js'
export interface ExportDialogProps287{content:string;defaultFilename:string;onDone(result:{success:boolean;message:string}):void}
export interface ExportCommand287{call(onDone:LocalJSXCommandOnDone,context:ToolUseContext & {session:unknown},args:string):Promise<ReactNode>;Dialog(props:ExportDialogProps287):ReactNode;resolvePath(name:string):string;write(name:string,content:string):Promise<string>;name(messages:Message[],date?:Date):string;firstPrompt(messages:Message[]):string;sanitize(value:string):string}
export function createExportCommand287(ports:Record<string,unknown>):ExportCommand287;
