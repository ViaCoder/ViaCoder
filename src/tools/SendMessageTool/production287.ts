import type {z} from 'zod/v4'
import type {Tool} from '../../Tool.js'
import type {Input,SendMessageToolOutput} from './SendMessageTool.js'
import type {renderToolResultMessage} from './UI.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {captureMcpToolContext287} from '../../services/mcp/toolContext287.js'
import {SEND_MESSAGE_TOOL_NAME} from './constants.js'

export type SendMessageInput287=Input
export type SendMessageTool287=Tool<z.ZodType<SendMessageInput287>,SendMessageToolOutput>
type Source287=Omit<SendMessageTool287,'renderToolResultMessage'>&{create(deps:unknown):unknown}
function isSource287(value:unknown):value is Source287 {
 if(typeof value!=='object'||value===null||Reflect.get(value,'name')!==SEND_MESSAGE_TOOL_NAME)return false
 return ['call','create','checkPermissions','validateInput','coerceInput'].every(key=>typeof Reflect.get(value,key)==='function')
}
export function getOriginalSendMessageTool287():Source287 {
 const value=getOriginalModsLifecycle287().clearSourceModule287('chunk-qaczaftn.js').Ss
 if(!isSource287(value))throw Error('Complete canonical SendMessage Ss/Wt is not installed')
 return value
}
/** Lazy projection has no tool definition/closure/state allocation. All business
 * descriptors and callbacks are those of the original single canonical Ss. */
export function createPublicSendMessageTool287(render:typeof renderToolResultMessage):SendMessageTool287 {
 const call:SendMessageTool287['call']=(input,context,permission,parent,progress,options)=>
  getOriginalSendMessageTool287().call(input,captureMcpToolContext287(context),permission,parent,progress,options)
 return new Proxy({} as SendMessageTool287,{
  get(_target,key){
   if(key==='name')return SEND_MESSAGE_TOOL_NAME
   if(key==='call')return call
   if(key==='renderToolResultMessage')return render
   return Reflect.get(getOriginalSendMessageTool287(),key)
  },
  has(_target,key){return key==='renderToolResultMessage'||Reflect.has(getOriginalSendMessageTool287(),key)},
  ownKeys(){return [...new Set([...Reflect.ownKeys(getOriginalSendMessageTool287()),'renderToolResultMessage'])]},
  getOwnPropertyDescriptor(_target,key){
   if(key==='renderToolResultMessage')return {value:render,writable:false,enumerable:true,configurable:true}
   // Descriptor-preserving public consumers must receive the same transport
   // adapter as direct reads, not bypass the canonical context adoption.
   if(key==='call'){const descriptor=Reflect.getOwnPropertyDescriptor(getOriginalSendMessageTool287(),key);return {...descriptor,value:call,configurable:true}}
   const descriptor=Reflect.getOwnPropertyDescriptor(getOriginalSendMessageTool287(),key)
   return descriptor&&{...descriptor,configurable:true}
  },
 })
}
