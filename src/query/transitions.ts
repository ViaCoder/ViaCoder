// Query loop terminal/continuation contracts recovered from 2.1.283 query
// return sites. Distinguish an API failure from a completed model turn.
export type GoalPass = 'met' | 'impossible' | 'not_met' | 'deferred' | 'error' | 'cancelled'
export type Terminal =
  | {reason: 'completed'; goalPass?: GoalPass}
  | {reason: 'api_error'; errorKind?: string; isTransient?: boolean; quotaLimits?: {status: string; resetsAt?: number; isUsingOverage?: boolean; overageInUse?: boolean}}
  | {reason: 'model_error'; error?: unknown}
  | {reason: 'max_turns'; turnCount?: number}
  | {reason: 'blocking_limit' | 'prompt_too_long' | 'image_error' | 'aborted_streaming' | 'aborted_tools' | 'stop_hook_prevented' | 'hook_stopped' | 'rapid_refill_breaker' | 'malformed_tool_use_exhausted' | 'tool_deferred' | 'background_requested'}
export type Continue =
  | {reason: 'collapse_drain_retry'; committed: number}
  | {reason: 'reactive_compact_retry' | 'precomputed_compact_swap' | 'max_output_tokens_escalate' | 'stop_hook_blocking' | 'token_budget_continuation' | 'next_turn'}
  | {reason: 'max_output_tokens_recovery'; attempt: number}
