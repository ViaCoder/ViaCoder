import {getOriginalSidechainSource287} from './resumeWriter287.js'
import type {Notification} from '../context/notifications.js'
import type {ToolUseContext} from '../Tool.js'
import type { AppState } from '../state/AppState.js'

/**
 * Parse `@agent-name message` syntax for direct team member messaging.
 */
export function parseDirectMemberMessage(input: string): {
  recipientName: string
  message: string
} | null {
  return getOriginalSidechainSource287<(value:string)=>{recipientName:string;message:string}|null>('chunk-f2cpzzp9.js','dte')(input)
}

export type DirectMessageResult =
  | { success: true; recipientName: string }
  | {
      success: false
      error: 'no_team_context' | 'unknown_recipient' | 'write_failed'
      recipientName?: string
    }

type WriteToMailboxFn = typeof import('./teammateMailbox.js').writeToMailbox

/**
 * Send a direct message to a team member, bypassing the model.
 */
export async function sendDirectMemberMessage(
  recipientName: string,
  message: string,
  teamContext: AppState['teamContext'],
  writeToMailbox?: WriteToMailboxFn,
): Promise<DirectMessageResult> {
  const original=getOriginalSidechainSource287<(
    recipient:string,message:string,team:AppState['teamContext'],writer:WriteToMailboxFn|undefined,
    storageV5?:ToolUseContext['storageV5'],
  )=>Promise<DirectMessageResult>>('chunk-f2cpzzp9.js','jCt')
  return original(recipientName,message,teamContext,writeToMailbox)
}

/** Complete original mte: a failed write is handled without clearing draft or
 * falling through into model submission. The same wS producer returns its real
 * receipt; neither this caller nor its type adapter manufactures delivery. */
export function dispatchDirectMemberMessage287(input:{
 recipientName:string;message:string;teamContext:AppState['teamContext'];writeToMailbox:WriteToMailboxFn;
 storageV5?:ToolUseContext['storageV5'];addNotification:(notification:Notification)=>void;clearInput:()=>void;
}):Promise<'handled'|'fall_through'>{
 return getOriginalSidechainSource287<(data:typeof input)=>Promise<'handled'|'fall_through'>>('chunk-f2cpzzp9.js','mte')(input)
}
