import type { SettingSource } from './constants.js'
import type { SettingsJson } from './types.js'
import type { SettingsWithErrors, ValidationError } from './validation.js'
import * as asyncHooks from 'node:async_hooks'
import { basename, dirname } from 'node:path'
import isEqual from 'lodash-es/isEqual.js'
import { getSecureStorageExecutionHost } from '../secureStorage/macOsKeychainHelpers.js'
import { createSettingsStore287 } from './officialSettingsStore287/native.js'

// This is a distinct native settings registry, not the WIF/credential store.
// All app cache readers, writers and reset callers use this same backing owner.
const settingsStores = createSettingsStore287({
  s: asyncHooks, Or: isEqual, Dt: dirname, Wr: basename,
})
export const OriginalHostRegistry287=settingsStores.HostRegistry
export const OriginalSettingsSnapshotStore287=settingsStores.SnapshotStore
export const normalizeSettingsTier287=settingsStores.normalizeTier
export function getSettingsCacheStore287() {
  return settingsStores.store(getSecureStorageExecutionHost())
}
export function isSettingsPrimerEnabled287(): boolean {
  return settingsStores.primerEnabled()
}
export function getSettingsPolicyGeneration287(): object {
  return getSettingsCacheStore287().policy
}
export function getSessionSettingsCache(): SettingsWithErrors | null {
  return getSettingsCacheStore287().mergedSettings as SettingsWithErrors | null
}
export function setSessionSettingsCache(value: SettingsWithErrors): void {
  getSettingsCacheStore287().mergedSettings = value
}
export function getCachedSettingsForSource(
  source: SettingSource,
): SettingsJson | null | undefined {
  return getSettingsCacheStore287().perSource.get(source) as SettingsJson | null | undefined
}
export function setCachedSettingsForSource(
  source: SettingSource,
  value: SettingsJson | null,
): void {
  getSettingsCacheStore287().perSource.set(source, value)
}
type ParsedSettings = {
  settings: SettingsJson | null
  errors: ValidationError[]
}
export function getCachedParsedFile(path: string): ParsedSettings | undefined {
  return getSettingsCacheStore287().parsedFiles.get(path) as ParsedSettings | undefined
}
export function setCachedParsedFile(path: string, value: ParsedSettings): void {
  getSettingsCacheStore287().parsedFiles.set(path, value)
}
export function resetSettingsCache(): void {
  getSettingsCacheStore287().invalidateAll()
}
export function getPluginSettingsBase(): Record<string, unknown> | undefined {
  return getSettingsCacheStore287().pluginBase
}
export function setPluginSettingsBase(
  settings: Record<string, unknown> | undefined,
): void {
  getSettingsCacheStore287().setPluginBase(settings)
}
export function clearPluginSettingsBase(): void {
  getSettingsCacheStore287().clearPluginBase()
}
