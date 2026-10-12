/** coreSchemas.ts documents this as a mapped type over API Usage. */
import type { BetaUsage } from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
// Official 285 initializes fallback_credit to null: it is an outcome, not
// a numeric counter with a zero default.
export type NonNullableUsage = {
  [K in keyof BetaUsage]: K extends 'fallback_credit' ? BetaUsage[K] : NonNullable<BetaUsage[K]>
}
