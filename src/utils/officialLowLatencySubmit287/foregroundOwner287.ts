import {
  backgroundDetachedCalls287,
  printForegroundSlot287,
} from '../../cli/printOwnership287/detached287.js'
import type { ForegroundCall287 } from '../../cli/printOwnership287/detachedRuntimeNative.js'
import type { OfficialLowLatencySourceBindings287 } from './native.js'

/**
 * The original qEt `cTe` and `ZTo` ports share the actual detached-tool
 * foreground slot used by `toolExecution`.  This exports references to that
 * owner; it does not allocate a second slot or synthesize backgroundNow calls.
 */
export const officialLowLatencyForegroundBindings287: Pick<
  OfficialLowLatencySourceBindings287,
  'cTe' | 'ZTo'
> = {
  cTe: printForegroundSlot287,
  ZTo(calls: ForegroundCall287[]): number {
    return backgroundDetachedCalls287(calls)
  },
}
