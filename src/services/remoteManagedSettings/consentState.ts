import { extractDangerousSettings, hashDangerousSettings } from '../../vendor/official-managed-consent/logic.js'

import type { SettingsJson } from '../../utils/settings/types.js'

export type ConsentIdentity = {
  organizationUuid: string
  accountUuid: string
  workspaceUuid?: string
}

export type ConsentSource = 'consented_payload' | 'org_record'

export type ConsentBaseline =
  | { source: 'consented_payload'; settings: SettingsJson }
  | {
      source: 'org_record'
      dangerousSettingsHash: string
      consentedPayload: SettingsJson
    }

export type ConsentDecision =
  | 'approved'
  | 'rejected'
  | 'no_check_needed'
  | 'deferred_non_interactive'
  | 'deferred_no_consent_surface'
  | 'superseded'

export type ConsentRecord = {
  identity: ConsentIdentity
  dangerousSettingsHash: string
  recordedAt: number
}

export type ConsentInjection = {
  read: (identity: ConsentIdentity) => Promise<ConsentRecord | null>
  write: (record: ConsentRecord) => Promise<void>
  resolveLiveIdentity?: () => Promise<ConsentIdentity | null>
}

/**
 * The official client compares the dangerous portion of a managed-settings
 * payload, rather than the complete payload, when deciding whether a review
 * is required. Keep this hash stable across object-key ordering changes.
 */
export function dangerousSettingsHash(settings: SettingsJson): string {
  return hashDangerousSettings(extractDangerousSettings(settings))
}

export function consentIdentityEquals(
  left: ConsentIdentity | null | undefined,
  right: ConsentIdentity | null | undefined,
): boolean {
  return Boolean(
    left &&
      right &&
      left.organizationUuid === right.organizationUuid &&
      left.accountUuid === right.accountUuid &&
      left.workspaceUuid === right.workspaceUuid,
  )
}

export function consentBaselineFor(
  settings: SettingsJson,
  record: ConsentRecord | null,
): ConsentBaseline {
  return record
    ? {
        source: 'org_record',
        dangerousSettingsHash: record.dangerousSettingsHash,
        consentedPayload: settings,
      }
    : { source: 'consented_payload', settings }
}

type ReviewOwner = (decision: ConsentDecision) => void

export type ConsentReviewUpdate = {
  settings: SettingsJson
  baseline: ConsentBaseline
}

/**
 * Small state machine matching the 2.1.284 consent handoff semantics. A new
 * review takes ownership of an existing review and resolves the old owner as
 * `superseded`; it never manufactures approval for the replacement.
 */
export class ConsentReviewCoordinator {
  private owner: ReviewOwner | null = null
  private pending: ConsentReviewUpdate[] = []
  private noConsentSurface = false
  private reviewId = 0

  setNoConsentSurface(value = true): void {
    this.noConsentSurface = value
  }

  hasNoConsentSurface(): boolean {
    return this.noConsentSurface
  }

  takePendingUpdates(): ConsentReviewUpdate[] {
    const updates = this.pending
    this.pending = []
    return updates
  }

  review(
    settings: SettingsJson,
    baseline: ConsentBaseline,
    show: (
      settings: SettingsJson,
      baseline: ConsentBaseline,
      updates: ConsentReviewUpdate[],
    ) => Promise<ConsentDecision>,
  ): Promise<ConsentDecision> {
    return new Promise(resolve => {
      if (this.owner) {
        this.pending.push({ settings, baseline })
        const previous = this.owner
        this.owner = resolve
        previous('superseded')
        return
      }
      this.owner = resolve
      const reviewId = ++this.reviewId
      const finish = (decision: ConsentDecision) => {
        if (this.reviewId !== reviewId || !this.owner) return
        this.settle(this.owner, decision)
      }
      try {
        void show(settings, baseline, this.pending)
          .then(finish, () => finish('deferred_no_consent_surface'))
      } catch {
        finish('deferred_no_consent_surface')
      }
    })
  }

  settle(owner: ReviewOwner, decision: ConsentDecision): void {
    if (this.owner !== owner) return
    this.owner = null
    this.pending = []
    owner(decision)
  }

  reset(): void {
    this.reviewId++
    this.owner?.('superseded')
    this.owner = null
    this.pending = []
  }
}

export function consentDecisionAllowsApply(decision: ConsentDecision): boolean {
  return (
    decision === 'approved' ||
    decision === 'no_check_needed' ||
    decision === 'deferred_non_interactive'
  )
}

export function consentDecisionIsTerminalWithoutApply(
  decision: ConsentDecision,
): boolean {
  return (
    decision === 'rejected' ||
    decision === 'deferred_no_consent_surface' ||
    decision === 'superseded'
  )
}
