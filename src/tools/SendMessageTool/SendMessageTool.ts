import {renderToolResultMessage} from './UI.js'
import {createPublicSendMessageTool287} from './production287.js'

/** Static public ABI only. Schema and all validation are read from original Ss. */
export type Input = {
  to: string
  summary?: string
  notify_when_idle?: boolean
  message?: string
    | {type: 'shutdown_request'; reason?: string}
    | {type: 'shutdown_response'; request_id: string; approve: boolean; reason?: string}
    | {type: 'plan_approval_response'; request_id: string; approve: boolean; feedback?: string}
}

export type MessageRouting = {
  sender: string
  senderColor?: string
  target: string
  targetColor?: string
  summary?: string
  content?: string
}

export type MessageOutput = {
  success: boolean
  message: string
  msg_id?: string
  routing?: MessageRouting
}

export type BroadcastOutput = {
  success: boolean
  message: string
  recipients: string[]
  routing?: MessageRouting
}

export type RequestOutput = {
  success: boolean
  message: string
  request_id: string
  target: string
}

export type ResponseOutput = {
  success: boolean
  message: string
  request_id?: string
}

export type SendMessageToolOutput =
  | MessageOutput
  | BroadcastOutput
  | RequestOutput
  | ResponseOutput

/** Every business property is read from the sole installed complete Ss/Wt.
 * The mature result renderer is a presentation-only C bridge; it owns no
 * permission, task, queue, session, or message routing state. */
export const SendMessageTool = createPublicSendMessageTool287(renderToolResultMessage)
