import type { SecureStorage } from './types.js'
import { secureStorageCore } from './officialRuntime.js'

export function createFallbackStorage(primary: SecureStorage, secondary: SecureStorage): SecureStorage {
  return secureStorageCore.createFallback(primary, secondary)
}
