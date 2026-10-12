import type {LocalJSXCommandContext,LocalJSXCommandOnDone} from '../../types/command.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getScrollSpeedRuntime287} from './runtime287.js'
export async function call(onDone:LocalJSXCommandOnDone,context:LocalJSXCommandContext,_args:string){
 return getScrollSpeedRuntime287().call(onDone,{messages:context.messages,session:getExecutionSession287()})
}
