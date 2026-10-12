import * as React from 'react'
import {ExecutionSessionProvider287} from '../../context/executionProject287.js'
import type {ToolUseContext} from '../../Tool.js'
import type {Message} from '../../types/message.js'
import type {LocalJSXCommandOnDone} from '../../types/command.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {getExportCommandRuntime287} from './runtime287.js'

export const extractFirstPrompt=(messages:Message[]):string=>getExportCommandRuntime287().firstPrompt(messages)
export const sanitizeFilename=(value:string):string=>getExportCommandRuntime287().sanitize(value)
export const exportDefaultFilename287=(messages:Message[],date?:Date):string=>getExportCommandRuntime287().name(messages,date)
export const writeExportFile287=(filename:string,content:string):Promise<string>=>getExportCommandRuntime287().write(filename,content)

/** Original wo forwards the same messages/tools/storage and never rewrites an
 * existing extension. The overlay only supplies the canonical execution ABI. */
export async function call(onDone:LocalJSXCommandOnDone,context:ToolUseContext,args:string):Promise<React.ReactNode>{
 const current=context as ToolUseContext & {session?:ExecutionSession287}
 const input=Object.assign(Object.create(context),{session:current.session??getExecutionSession287()}) as ToolUseContext & {session:ExecutionSession287}
 const dialog=await getExportCommandRuntime287().call(onDone,input,args)
 return dialog===null?null:React.createElement(ExecutionSessionProvider287,{session:input.session,children:dialog})
}
