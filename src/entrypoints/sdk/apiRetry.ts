import type { SystemAPIErrorMessage } from '../../types/message.js'
import type { SDKAPIRetryMessage, SDKAssistantMessageError } from './coreTypes.recovered.js'

/** Map internal retry telemetry to the public SDK wire event. */
export function toSDKAPIRetryMessage(
  message: SystemAPIErrorMessage,
  sessionId: string,
  error: SDKAssistantMessageError,
): SDKAPIRetryMessage {
  return {
    type: 'system',
    subtype: 'api_retry',
    attempt: message.retryAttempt,
    max_retries: message.maxRetries,
    retry_delay_ms: message.retryInMs,
    error_status: message.error.status ?? null,
    error,
    ...(message.noResponse && {
      no_response: {
        waited_ms: message.noResponse.waitedMs,
        retry_wait_ms: message.noResponse.retryWaitMs,
      },
    }),
    session_id: sessionId,
    uuid: message.uuid,
  }
}
