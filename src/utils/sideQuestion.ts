/**
 * Side Question ("/btw") feature - allows asking quick questions without
 * interrupting the main agent context.
 *
 * Uses runForkedAgent to leverage prompt caching from the parent context
 * while keeping the side question response separate from main conversation.
 */

import { formatAPIError } from '../services/api/errorUtils.js'
import { EMPTY_USAGE } from '../services/api/logging.js'
import { isRefusalMessage } from '../services/api/refusalFallback.js'
import type { Message, SystemAPIErrorMessage } from '../types/message.js'
import { type CacheSafeParams, runForkedAgent } from './forkedAgent.js'
import { createAssistantMessage, createUserMessage, extractTextContent } from './messages.js'
import {getBtwHistoryForSession287,type BtwHistory} from '../commands/btw/history.js'
import { createAbortController, createChildAbortController } from './abortController.js'
import { AbortError } from './errors.js'

import type {ExecutionSession287} from '../services/context/officialExecutionOwners287/native.js'
import {createSideQuestion287,type SideQuestionRetry287,type SideQuestionExchange287,type SideQuestionResult287} from './officialSideQuestion287/native.js'
// Original request/response helpers use the existing fork, usage and message owners.
// The two explicit generated cuts retain the local UI history and frozen refusal projection.
function originalSideQuestion(history?:BtwHistory,controller?:AbortController) {
  return createSideQuestion287({
    Dd:AbortError,Bn:()=>controller??createAbortController(),th:parent=>controller??createChildAbortController(parent),
    IC:params=>runForkedAgent(params),Jc:createAssistantMessage,Re:createUserMessage,fo:extractTextContent,
    cqe:messages=>({live:messages}),lp:EMPTY_USAGE,historyOwner:params=>history??getBtwHistoryForSession287((params.toolUseContext as CacheSafeParams['toolUseContext'] & {session?:ExecutionSession287}).session),
    extract:(messages,original)=>{
      if(!messages.some(isRefusalMessage))return original(messages)
      const hasAnswerText=messages.some(message=>message.type==='assistant'&&!isRefusalMessage(message)&&message.message.content.some(block=>block.type==='text'&&!!block.text.trim()))
      return {response:extractSideQuestionResponse(messages),synthetic:!hasAnswerText}
    },
  })
}
export function findBtwTriggerPositions(text:string):Array<{word:string;start:number;end:number}> {
  return originalSideQuestion().find(text)
}
export type SideQuestionResult=Omit<SideQuestionResult287,'synthetic'> & {synthetic?:boolean}
export function buildBtwHistoryMessages(history?:BtwHistory):Message[] {
  return originalSideQuestion().historyMessages(history?.exchanges??[])
}
export async function runSideQuestion({question,cacheSafeParams,parentController,turnInProgress=true,history,onRetry,threadHistory=true}: {
  question:string;cacheSafeParams:CacheSafeParams;parentController?:AbortController;turnInProgress?:boolean;
  history?:BtwHistory|SideQuestionExchange287[];onRetry?:(retry:SideQuestionRetry287)=>void;threadHistory?:boolean;
}):Promise<SideQuestionResult> {
  const controller=parentController?createChildAbortController(parentController):createAbortController()
  // Preserve the accepted cooperative-abort boundary without cancelling the parent.
  if(controller.signal.aborted)return {response:null,usage:{...EMPTY_USAGE},aborted:true}
  const owner=history&&!Array.isArray(history)?history:undefined
  const result=await originalSideQuestion(owner,controller).run({question,cacheSafeParams,parentController,turnInProgress,onRetry,threadHistory,history:Array.isArray(history)?history:history?.exchanges})
  if(controller.signal.aborted)return {response:null,usage:result.usage,aborted:true}
  return result
}
export function createPendingSideQuestionResults(messages:Message[]):Message|undefined {
  return originalSideQuestion().pending(messages)
}

function extractSideQuestionResponse(messages: Message[]): string | null {
  const hasActionableAssistant = messages.some(
    message => message.type === 'assistant' && !isRefusalMessage(message),
  )
  if (messages.some(isRefusalMessage) && !hasActionableAssistant) {
    return 'subtask_incomplete\nno_actionable_result'
  }

  // Flatten all assistant content blocks across the per-block messages.
  const assistantBlocks = messages.flatMap(m =>
    m.type === 'assistant' && !isRefusalMessage(m) ? m.message.content : [],
  )

  if (assistantBlocks.length > 0) {
    // Concatenate all text blocks (there's normally at most one, but be safe).
    const text = extractTextContent(assistantBlocks, '\n\n').trim()
    if (text) return text

    // No text — check if the model tried to call a tool despite instructions.
    const toolUse = assistantBlocks.find(b => b.type === 'tool_use')
    if (toolUse) {
      const toolName = 'name' in toolUse ? toolUse.name : 'a tool'
      return `(The model tried to call ${toolName} instead of answering directly. Try rephrasing or ask in the main conversation.)`
    }
  }

  // No assistant content — likely API error exhausted retries. Surface the
  // first system api_error message so the user sees what happened.
  const apiErr = messages.find(
    (m): m is SystemAPIErrorMessage =>
      m.type === 'system' && 'subtype' in m && m.subtype === 'api_error',
  )
  if (apiErr) {
    return `(API error: ${formatAPIError(apiErr.error)})`
  }

  return null
}
