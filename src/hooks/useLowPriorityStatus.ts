import {useSyncExternalStore} from 'react'
import {getLowPriorityStatus, subscribeLowPriorityStatus} from '../utils/lowPriority.js'

export function useLowPriorityStatus() {
  return useSyncExternalStore(subscribeLowPriorityStatus, getLowPriorityStatus, getLowPriorityStatus)
}
