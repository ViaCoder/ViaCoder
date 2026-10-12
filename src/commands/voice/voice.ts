import type {LocalCommandCall} from '../../types/command.js'
import {getOriginalVoiceCommand287} from '../../voice/official287/runtime.js'
export const call:LocalCommandCall=(args,context)=>getOriginalVoiceCommand287().call(args,context)
