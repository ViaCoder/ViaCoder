import {createPermissionTiming287} from './timed.js'
import {officialRltUiEvents287} from '../../../state/officialRltUiEvents287.js'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {isAutoModeActive} from '../../../utils/permissions/autoModeState.js'
// One process-original hre closure; never recreated for a request. Actual ta,
// AppState.denialTracking and launch options are the original source ports.
export const officialPermissionTiming287=createPermissionTiming287({
 ta:officialRltUiEvents287,
 Ce:()=>!getExecutionSession287().host.launchOptions.isInteractive(),
 mf:isAutoModeActive,
})
