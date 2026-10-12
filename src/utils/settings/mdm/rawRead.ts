import { mdmRawReader287 } from './rawRuntime.js'
import type { RawManagedRead287 } from '../officialMdmRawRead287/native.js'

export type RawReadResult = RawManagedRead287

/** Complete platform-native raw read, including unread sources and process outcomes. */
export function fireRawRead(): Promise<RawReadResult> {
  return mdmRawReader287.read()
}

export function startMdmRawRead(): void {
  mdmRawReader287.start()
}

export function getMdmRawReadPromise(): Promise<RawReadResult> | null {
  return mdmRawReader287.promise()
}
