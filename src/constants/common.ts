import {createPrintClaimDate287} from '../cli/printOwnership287/native.js'
import {getExecutionSession287,executionSessionRegistryConstructor287} from '../services/context/execution287.js'

// This ensures you get the LOCAL date in ISO format
export function getLocalISODate(): string {
  // Check for ant-only date override
  if (process.env.CLAUDE_CODE_OVERRIDE_DATE) {
    return process.env.CLAUDE_CODE_OVERRIDE_DATE
  }

  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Memoized for prompt-cache stability — captures the date once at session start.
// The main interactive path gets this behavior via memoize(getUserContext) in
// context.ts; simple mode (--bare) calls getSystemPrompt per-request and needs
// an explicit memoized date to avoid busting the cached prefix at midnight.
// When midnight rolls over, getDateChangeAttachments appends the new date at
// the tail (though simple mode disables attachments, so the trade-off there is:
// stale date after midnight vs. ~entire-conversation cache bust — stale wins).
let sessionDate287:ReturnType<typeof createPrintClaimDate287>|undefined
export function getSessionStartDateOwner287(session=getExecutionSession287()) {
  // Original LBt owns the current root's capture. Preserve local date override C.
  sessionDate287??=createPrintClaimDate287({Tt:executionSessionRegistryConstructor287,WWr:getLocalISODate})
  return sessionDate287.owner.of(session)
}
export const getSessionStartDate=Object.assign(()=>getSessionStartDateOwner287().get(),{cache:{clear(){getSessionStartDateOwner287().clear()}}})

// Returns "Month YYYY" (e.g. "February 2026") in the user's local timezone.
// Changes monthly, not daily — used in tool prompts to minimize cache busting.
export function getLocalMonthYear(): string {
  const date = process.env.CLAUDE_CODE_OVERRIDE_DATE
    ? new Date(process.env.CLAUDE_CODE_OVERRIDE_DATE)
    : new Date()
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' })
}
