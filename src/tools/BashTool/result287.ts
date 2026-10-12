import {getExecutionSession287} from '../../services/context/execution287.js'
import {getGetTaskOwner287} from '../../utils/task/getTaskSession287.js'
import {getTaskOutputPath} from '../../utils/task/diskOutput.js'
import {createBashResult287} from './officialResult287/native.js'

// Call-time owner lookup keeps ALS scopes and live feature/launch state intact.
export const mapBashResult287 = createBashResult287({
  taskEnabled: () => getGetTaskOwner287().registration.enabled(),
  backgroundAnnouncement: (...args) => getGetTaskOwner287().native.backgroundAnnouncement(...args),
  backgroundText: input => getGetTaskOwner287().native.backgroundText(input),
  outputPath: getTaskOutputPath,
  singleShotPrintSession: () => getExecutionSession287().host.launchOptions.singleShotPrintSession(),
})
