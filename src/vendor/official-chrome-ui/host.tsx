import React from 'react'
import {Text,Link} from '../../ink.js'
import {saveGlobalConfig} from '../../utils/config.js'
import {logEvent} from '../../services/analytics/index.js'
import {
  adoptStorageV5EnvPin,
  type StorageV5Backend,
  type StorageV5EnvPin,
  resolveStorageV5,
} from '../../utils/secureStorage/storageV5.js'

/** Public host factory: undefined remains the official no-host default. */
export function configStorage(storageV5?: StorageV5Backend): {storageV5: StorageV5Backend | undefined} {
  return { storageV5 }
}

/** Official Chrome toggle calls the shared writer with the supplied backend. */
export function saveConfig(
  update: Parameters<typeof saveGlobalConfig>[0],
  backend?: StorageV5Backend,
): ReturnType<typeof saveGlobalConfig> {
  return saveGlobalConfig(update, backend)
}

/** Host entry point corresponding to the official env-pin adapter. */
export function configStorageFromPin(pin?: StorageV5EnvPin): {storageV5: StorageV5Backend | undefined} {
  return configStorage(pin === undefined ? resolveStorageV5() : adoptStorageV5EnvPin(pin))
}
export function telemetrySuccess(name: string): void { logEvent(name,{success:true}) }
export function telemetryFailure(name: string, reason: string): void {
  logEvent(`${name}_${reason}`,{success:false})
}
export function LearnMore({url}: {url:string}): React.ReactNode {
  return <Text dimColor>Learn more: <Link url={url}>{url}</Link></Text>
}
