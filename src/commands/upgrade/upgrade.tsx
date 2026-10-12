import type {LocalJSXCommandCall} from '../../types/command.js'
import {publicCommandSourcePort287 as read} from '../../utils/commandCompletionProducers287.js'

// Complete original handler; auth/login/gateway and completion recheck use
// the existing canonical owner. /upgrade changes a subscription, not the app.
export const call:LocalJSXCommandCall=(onDone,context,args)=>{
 const original=read('chunk-brk22yt2.js','ios') as LocalJSXCommandCall
 return original(onDone,context,args)
}
