import {createHookResultProcessor287} from './officialHooksConfiguration287/result.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {createAttachmentMessage} from '../attachments.js'
import {env} from '../env.js'
import {jsonStringify} from '../slowOperations.js'
import {logForDebugging} from '../debug.js'
import {logEvent} from '../../services/analytics/index.js'

// Full kV/Zve closure: the real surface owner determines terminal and mux;
// no renderer flags, second cache or private qualification are manufactured.
export const hookResultProcessor287=createHookResultProcessor287({
 execution:getExecutionSession287,
 environment:{
  get terminal(){return env.terminal},
  get TMUX(){return process.env.TMUX},
  get STY(){return process.env.STY},
  get ZELLIJ(){return process.env.ZELLIJ},
 },
 attachment:createAttachmentMessage,
 stringify:jsonStringify,
 debug:logForDebugging,
 // Existing local telemetry cancellation remains at the shared logEvent owner.
 analytics:logEvent,
 analyticsIdentity:value=>value,
})
