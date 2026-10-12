/**
 * Shared constants and path builders for MDM settings modules.
 *
 * The raw runtime imports only builtins and pinned native I/O closures.
 * The path builder shares the startup raw owner.
 */

import { mdmRawReader287 } from './rawRuntime.js'

/** macOS preference domain for Claude Code MDM profiles. */
export const MACOS_PREFERENCE_DOMAIN = 'com.anthropic.claudecode'

/**
 * Windows registry key paths for Claude Code MDM policies.
 *
 * These keys live under SOFTWARE\Policies which is on the WOW64 shared key
 * list — both 32-bit and 64-bit processes see the same values without
 * redirection. Do not move these to SOFTWARE\ClaudeCode, as SOFTWARE is
 * redirected and 32-bit processes would silently read from WOW6432Node.
 * See: https://learn.microsoft.com/en-us/windows/win32/winprog64/shared-registry-keys
 */
export const WINDOWS_REGISTRY_KEY_PATH_HKLM =
  'HKLM\\SOFTWARE\\Policies\\ClaudeCode'
export const WINDOWS_REGISTRY_KEY_PATH_HKCU =
  'HKCU\\SOFTWARE\\Policies\\ClaudeCode'

/** Windows registry value name containing the JSON settings blob. */
export const WINDOWS_REGISTRY_VALUE_NAME = 'Settings'

/** Path to macOS plutil binary. */
export const PLUTIL_PATH = '/usr/bin/plutil'

/** Arguments for plutil to convert plist to JSON on stdout (append plist path). */
export const PLUTIL_ARGS_PREFIX = ['-convert', 'json', '-o', '-', '--'] as const

/** Subprocess timeout in milliseconds. */
export const MDM_SUBPROCESS_TIMEOUT_MS = 5000

/** Original platform path order; user-writable ant-only paths are not added. */
export function getMacOSPlistPaths(): Array<{ path: string; label: string }> {
  return mdmRawReader287.paths?.() ?? []
}
