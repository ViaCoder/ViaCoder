import {getPolicyParser287} from '../policyParserOwner287.js'
import {getSettingsCacheStore287} from '../settingsCache.js'
import type {MdmPolicyRead287,ConsumedMdm287} from '../officialPolicyParser287/native.js'
/**
 * MDM (Mobile Device Management) profile enforcement for Claude Code managed settings.
 *
 * Reads enterprise settings from OS-level MDM configuration:
 * - macOS: `com.anthropic.claudecode` preference domain
 *   (MDM profiles at /Library/Managed Preferences/ only — not user-writable ~/Library/Preferences/)
 * - Windows: `HKLM\SOFTWARE\Policies\ClaudeCode` (admin-only)
 *   and `HKCU\SOFTWARE\Policies\ClaudeCode` (user-writable, lowest priority)
 * - Linux: No MDM equivalent (uses /etc/claude-code/managed-settings.json instead)
 *
 * Policy settings use "first source wins" — the highest-priority source that exists
 * provides all policy settings. Priority (highest to lowest):
 *   remote → HKLM/plist → managed-settings.json → HKCU
 *
 * Architecture:
 *   constants.ts — shared constants and plist path builder (zero heavy imports)
 *   rawRead.ts   — subprocess I/O only (zero heavy imports, fires at main.tsx evaluation)
 *   settings.ts  — parsing, caching, first-source-wins logic (this file)
 */

import {parseRegistry287} from '../officialMdmRawRead287/native.js'
import {profileCheckpoint} from '../../startupProfiler.js'
import {fireRawRead,type RawReadResult} from './rawRead.js'

// ---------------------------------------------------------------------------
// Types and cache
// ---------------------------------------------------------------------------

type MdmResult = MdmPolicyRead287
const mdmOwner=()=>getPolicyParser287().mdmOwner()
export function getMdmWslInherits287():boolean {return getPolicyParser287().wslInherits()}

// ---------------------------------------------------------------------------
// Startup load — fires early, awaited before first settings read
// ---------------------------------------------------------------------------

/**
 * Kick off async MDM/HKCU reads. Call this as early as possible in
 * startup so the subprocess runs in parallel with module loading.
 */
export function startMdmSettingsLoad(): void {
  const owner=mdmOwner()
  if(owner.loadPromise)return
  profileCheckpoint('mdm_load_start')
  owner.startLoad(getSettingsCacheStore287())
  owner.loadPromise=owner.loadPromise!.then(()=>profileCheckpoint('mdm_load_end'))
}

/**
 * Await the in-flight MDM load. Call this before the first settings read.
 * If startMdmSettingsLoad() was called early enough, this resolves immediately.
 */
export async function ensureMdmSettingsLoaded(): Promise<void> {
  if (!mdmOwner().loadPromise) {
    startMdmSettingsLoad()
  }
  await mdmOwner().loadPromise
}

// ---------------------------------------------------------------------------
// Sync cache readers — used by the settings pipeline (loadSettingsFromDisk)
// ---------------------------------------------------------------------------

/**
 * Read admin-controlled MDM settings from the session cache.
 *
 * Returns settings from admin-only sources:
 * - macOS: /Library/Managed Preferences/ (requires root)
 * - Windows: HKLM registry (requires admin)
 *
 * Does NOT include HKCU (user-writable) — use getHkcuSettings() for that.
 */
export function getMdmSettings(): MdmResult {
  return getPolicyParser287().mdmRead()
}

/**
 * Read HKCU registry settings (user-writable, lowest policy priority).
 * Only relevant on Windows — returns empty on other platforms.
 */
export function getHkcuSettings(): MdmResult {
  return getPolicyParser287().hkcuRead()
}

// ---------------------------------------------------------------------------
// Cache management
// ---------------------------------------------------------------------------

/**
 * Clear the MDM and HKCU settings caches, forcing a fresh read on next load.
 */
export function clearMdmSettingsCache(): void {
  mdmOwner().reset()
}

/**
 * Update the session caches directly. Used by the change detector poll.
 */
export function setMdmSettingsCache(mdm:MdmResult,hkcu:MdmResult,wslInherits=mdmOwner().wslInherits): void {
  getPolicyParser287().setMdm(mdm,hkcu,wslInherits)
}

// ---------------------------------------------------------------------------
// Refresh — fires a fresh raw read, parses, returns results.
// Used by the 30-minute poll in changeDetector.ts.
// ---------------------------------------------------------------------------

/**
 * Fire a fresh MDM subprocess read and parse the results.
 * Does NOT update the cache — caller decides whether to apply.
 */
export async function refreshMdmSettings(): Promise<ConsumedMdm287> {
  const raw = await fireRawRead()
  return consumeRawReadResult(raw)
}

// ---------------------------------------------------------------------------
// Parsing — converts raw subprocess output to validated MdmResult
// ---------------------------------------------------------------------------

/**
 * Parse JSON command output (plutil stdout or registry JSON value) into SettingsJson.
 * Filters invalid permission rules before schema validation so one bad rule
 * doesn't cause the entire MDM settings to be rejected.
 */
export function parseCommandOutputAsSettings(
  stdout:string,sourcePath:string,options?:{userWritable?:boolean},
): MdmResult {
  return getPolicyParser287().command(stdout,sourcePath,options)
}

/**
 * Parse reg query stdout to extract a registry string value.
 * Matches both REG_SZ and REG_EXPAND_SZ, case-insensitive.
 *
 * Expected format:
 *     Settings    REG_SZ    {"json":"value"}
 */
export function parseRegQueryStdout(
  stdout: string,
  valueName = 'Settings',
): string | null {
  return parseRegistry287(stdout, valueName)
}

/**
 * Convert raw subprocess output into parsed MDM and HKCU results,
 * applying the first-source-wins policy.
 */
export function consumeRawReadResult(raw:RawReadResult):Promise<ConsumedMdm287> {
  return getPolicyParser287().consume(raw,getSettingsCacheStore287())
}
