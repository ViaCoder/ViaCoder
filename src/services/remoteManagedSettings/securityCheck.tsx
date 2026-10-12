import React from 'react';
import { getIsInteractive } from '../../bootstrap/state.js';
import { ManagedSettingsSecurityDialog } from '../../components/ManagedSettingsSecurityDialog/ManagedSettingsSecurityDialog.js';
import { extractDangerousSettings, hasDangerousSettings, hasDangerousSettingsChanged } from '../../components/ManagedSettingsSecurityDialog/utils.js';
import { render } from '../../ink.js';
import { KeybindingSetup } from '../../keybindings/KeybindingProviderSetup.js';
import { AppStateProvider } from '../../state/AppState.js';
import { gracefulShutdownSync } from '../../utils/gracefulShutdown.js';
import { getBaseRenderOptions } from '../../utils/renderOptions.js';
import type { SettingsJson } from '../../utils/settings/types.js';
import { logEvent } from '../analytics/index.js';
export type SecurityCheckResult =
  | 'approved'
  | 'rejected'
  | 'no_check_needed'
  | 'deferred_non_interactive'
  | 'deferred_no_consent_surface'
  | 'superseded';

let pendingSecurityReviewCount = 0;
let pendingReview: {
  settle: (result: SecurityCheckResult) => void;
  unmount?: () => void;
} | null = null;

export function isManagedSettingsSecurityReviewPending(): boolean {
  return pendingSecurityReviewCount > 0;
}

/**
 * Check if new remote managed settings contain dangerous settings that require user approval.
 * Shows a blocking dialog if dangerous settings have changed or been added.
 *
 * @param cachedSettings The current cached settings (may be null for first run)
 * @param newSettings The new settings fetched from the API
 * @returns 'approved' if user accepts, 'rejected' if user declines, 'no_check_needed' if no dangerous changes
 */
export async function checkManagedSettingsSecurity(cachedSettings: SettingsJson | null, newSettings: SettingsJson | null): Promise<SecurityCheckResult> {
  // If new settings don't have dangerous settings, no check needed
  if (!newSettings || !hasDangerousSettings(extractDangerousSettings(newSettings))) {
    return 'no_check_needed';
  }

  // If dangerous settings haven't changed, no check needed
  if (!hasDangerousSettingsChanged(cachedSettings, newSettings)) {
    return 'no_check_needed';
  }

  // Skip dialog in non-interactive mode (consistent with trust dialog behavior)
  if (!getIsInteractive()) {
    return 'deferred_non_interactive';
  }

  // Log that dialog is being shown
  logEvent('tengu_managed_settings_security_dialog_shown', {});

  // Show blocking dialog
  return new Promise<SecurityCheckResult>(resolve => {
    // 2.1.284 gives a newer settings review ownership of the consent
    // surface. The older review is explicitly settled as superseded rather
    // than allowing two dialogs to race to approve different payloads.
    pendingReview?.unmount?.();
    pendingReview?.settle('superseded');

    pendingSecurityReviewCount += 1;
    let settled = false;
    const settle = (result: SecurityCheckResult) => {
      if (settled) return;
      settled = true;
      pendingSecurityReviewCount = Math.max(0, pendingSecurityReviewCount - 1);
      if (pendingReview?.settle === settle) pendingReview = null;
      resolve(result);
    };
    pendingReview = { settle };
    void (async () => {
      const {
        unmount
      } = await render(<AppStateProvider>
          <KeybindingSetup>
            <ManagedSettingsSecurityDialog settings={newSettings} onAccept={() => {
            logEvent('tengu_managed_settings_security_dialog_accepted', {});
            unmount();
            settle('approved');
          }} onReject={() => {
            logEvent('tengu_managed_settings_security_dialog_rejected', {});
            unmount();
            settle('rejected');
          }} />
          </KeybindingSetup>
        </AppStateProvider>, getBaseRenderOptions(false));
      if (settled) {
        unmount();
      } else if (pendingReview?.settle === settle) {
        pendingReview.unmount = unmount;
      }
    })().catch(() => settle('deferred_no_consent_surface'));
  });
}

/**
 * Handle the security check result by exiting if rejected
 * Returns true if we should continue, false if we should stop
 */
export function handleSecurityCheckResult(result: SecurityCheckResult): boolean {
  if (result === 'rejected') {
    gracefulShutdownSync(1);
    return false;
  }
  if (result === 'deferred_no_consent_surface' || result === 'superseded') {
    return false;
  }
  return true;
}
