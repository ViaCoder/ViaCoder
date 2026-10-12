import { randomUUID } from 'crypto'
import type { HookEvent } from 'src/entrypoints/agentSdkTypes.js'
import { queryModelWithoutStreaming } from '../../services/api/claude.js'
import type { ToolUseContext } from '../../Tool.js'
import type { Message } from '../../types/message.js'
import { createAttachmentMessage } from '../attachments.js'
import { createCombinedAbortSignal } from '../combinedAbortSignal.js'
import { logForDebugging } from '../debug.js'
import { errorMessage } from '../errors.js'
import type { HookResult } from '../hooks.js'
import { safeParseJSON } from '../json.js'
import { createUserMessage, extractTextContent } from '../messages.js'
import { getSmallFastModel } from '../model/model.js'
import type { PromptHook } from '../settings/types.js'
import { asSystemPrompt } from '../systemPromptType.js'
import { addArgumentsToPrompt, hookResponseSchema } from './hookHelpers.js'
import { HOOK_SYSTEM_PROMPT, STOP_HOOK_SYSTEM_PROMPT } from './promptHookPrompts.js'
import { trimPromptHookTranscript } from './promptHookTranscript.js'
import { isPromptTooLongMessage } from '../../services/api/errors.js'

/**
 * Execute a prompt-based hook using an LLM
 */
export async function execPromptHook(
  hook: PromptHook,
  hookName: string,
  hookEvent: HookEvent,
  jsonInput: string,
  signal: AbortSignal,
  toolUseContext: ToolUseContext,
  messages?: Message[],
  toolUseID?: string,
): Promise<HookResult> {
  // Use provided toolUseID or generate a new one
  const effectiveToolUseID = toolUseID || `hook-${randomUUID()}`
  const isStop = hookEvent === 'Stop' || hookEvent === 'SubagentStop'
  try {
    // Replace $ARGUMENTS with the JSON input
    const processedPrompt = addArgumentsToPrompt(isStop
      ? `Based on the conversation transcript above, has the following stopping condition been satisfied? Answer based on transcript evidence only.\n\nCondition: ${hook.prompt}`
      : hook.prompt, jsonInput)
    logForDebugging(
      `Hooks: Processing prompt hook with prompt: ${processedPrompt}`,
    )

    // Create user message directly - no need for processUserInput which would
    // trigger UserPromptSubmit hooks and cause infinite recursion
    const userMessage = createUserMessage({ content: processedPrompt })

    // Prepend conversation history if provided
    const model = hook.model ?? getSmallFastModel()
    const messagesToQuery =
      messages && messages.length > 0
        ? [...trimPromptHookTranscript(messages, model), userMessage]
        : [userMessage]

    logForDebugging(
      `Hooks: Querying model with ${messagesToQuery.length} messages`,
    )

    // Query the model with Haiku
    const hookTimeoutMs = hook.timeout ? hook.timeout * 1000 : 30000

    // Combined signal: aborts if either the hook signal or timeout triggers
    const { signal: combinedSignal, cleanup: cleanupSignal } =
      createCombinedAbortSignal(signal, { timeoutMs: hookTimeoutMs })

    try {
      const queryEvaluator = (transcript: Message[]) => queryModelWithoutStreaming({
        messages: transcript,
        systemPrompt: asSystemPrompt([isStop ? STOP_HOOK_SYSTEM_PROMPT : HOOK_SYSTEM_PROMPT]),
        thinkingConfig: { type: 'disabled' as const },
        tools: [],
        signal: combinedSignal,
        options: {
          async getToolPermissionContext() {
            const appState = toolUseContext.getAppState()
            return appState.toolPermissionContext
          },
          model,
          toolChoice: undefined,
          isNonInteractiveSession: true,
          hasAppendSystemPrompt: false,
          agents: [],
          querySource: 'hook_prompt',
          mcpTools: [],
          agentId: toolUseContext.agentId,
          outputFormat: {
            type: 'json_schema',
            schema: {
              type: 'object',
              properties: {
                ok: { type: 'boolean' },
                reason: { type: 'string' },
                impossible: { type: 'boolean' },
              },
              required: ['ok', 'reason'],
              additionalProperties: false,
            },
          },
        },
      })

      let response = await queryEvaluator(messagesToQuery)
      if (isPromptTooLongMessage(response) && messages?.length)
        response = await queryEvaluator([...trimPromptHookTranscript(messages, model, 0.25), userMessage])

      cleanupSignal()

      if (response.isApiErrorMessage) return {hook, outcome: 'non_blocking_error',
        message: createAttachmentMessage({type: 'hook_non_blocking_error', hookName,
          toolUseID: effectiveToolUseID, hookEvent, stderr: `Hook evaluator API error: ${extractTextContent(response.message.content).trim()}`,
          stdout: '', exitCode: 1})}

      // Extract text content from response
      const content = extractTextContent(response.message.content)

      // Update response length for spinner display
      toolUseContext.setResponseLength?.(length => length + content.length)

      const fullResponse = content.trim()
      logForDebugging(`Hooks: Model response: ${fullResponse}`)

      const json = safeParseJSON(fullResponse)
      if (!json) {
        logForDebugging(
          `Hooks: error parsing response as JSON: ${fullResponse}`,
        )
        return {
          hook,
          outcome: 'non_blocking_error',
          message: createAttachmentMessage({
            type: 'hook_non_blocking_error',
            hookName,
            toolUseID: effectiveToolUseID,
            hookEvent,
            stderr: 'JSON validation failed',
            stdout: fullResponse,
            exitCode: 1,
          }),
        }
      }

      const parsed = hookResponseSchema().safeParse(json)
      if (!parsed.success) {
        logForDebugging(
          `Hooks: model response does not conform to expected schema: ${parsed.error.message}`,
        )
        return {
          hook,
          outcome: 'non_blocking_error',
          message: createAttachmentMessage({
            type: 'hook_non_blocking_error',
            hookName,
            toolUseID: effectiveToolUseID,
            hookEvent,
            stderr: `Schema validation failed: ${parsed.error.message}`,
            stdout: fullResponse,
            exitCode: 1,
          }),
        }
      }

      // Failed to meet condition
      if (!parsed.data.ok) {
        if (isStop && parsed.data.impossible === true) {
          return {hook, outcome: 'success', impossible: true, stopReason: parsed.data.reason,
            message: createAttachmentMessage({type: 'hook_success', hookName,
              toolUseID: effectiveToolUseID, hookEvent, content: ''})}
        }
        logForDebugging(
          `Hooks: Prompt hook condition was not met: ${parsed.data.reason}`,
        )
        return {
          hook,
          outcome: 'blocking',
          blockingError: {
            blockingError: `[${hook.prompt}]: ${parsed.data.reason}`,
            command: hook.prompt,
          },
          preventContinuation: !isStop && hook.continueOnBlock !== true,
          stopReason: parsed.data.reason,
        }
      }

      // Condition was met
      logForDebugging(`Hooks: Prompt hook condition was met`)
      return {
        hook,
        outcome: 'success',
        stopReason: parsed.data.reason,
        message: createAttachmentMessage({
          type: 'hook_success',
          hookName,
          toolUseID: effectiveToolUseID,
          hookEvent,
          content: '',
        }),
      }
    } catch (error) {
      cleanupSignal()

      if (combinedSignal.aborted) {
        return {
          hook,
          outcome: 'cancelled',
          timedOut: !toolUseContext.abortController.signal.aborted,
        }
      }
      throw error
    }
  } catch (error) {
    const errorMsg = errorMessage(error)
    logForDebugging(`Hooks: Prompt hook error: ${errorMsg}`)
    return {
      hook,
      outcome: 'non_blocking_error',
      message: createAttachmentMessage({
        type: 'hook_non_blocking_error',
        hookName,
        toolUseID: effectiveToolUseID,
        hookEvent,
        stderr: `Error executing prompt hook: ${errorMsg}`,
        stdout: '',
        exitCode: 1,
      }),
    }
  }
}
