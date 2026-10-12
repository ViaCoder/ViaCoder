import {createContext} from 'react'
import {createRecentInputClockContext287} from '../officialInputClock287/native.js'
/** Original V0n, shared by the App provider and every bound input guard.
 * The value reads the App's scoped input timestamp; it owns no clock state. */
export const RecentInputClockContext=createRecentInputClockContext287(createContext)
