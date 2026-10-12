import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {logError} from '../../utils/log.js'
import {createSubagentStatsNative287,type SubagentStatsNative287} from './subagentStatsNative287.js'
let native:SubagentStatsNative287|undefined
const execution=()=>require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js')
function owner(){return native??=createSubagentStatsNative287({sessionRegistry:execution().executionSessionRegistryConstructor287,logError})}
// AgentTool participates in bootstrap's static import graph. Bind the one
// original IMe only when its real writer/getter is called, after execution's
// canonical constructor exists. No second registry, Task map, or stats cache.
export const subagentStats287={
 get registry(){return owner().registry},
 snapshot(session?:ExecutionSession287){return owner().snapshot(session)},
}
export function getSubagentStatsOwner287(){return subagentStats287.registry.of(execution().getExecutionSession287())}
export function getSubagentStatsSnapshot287(){return subagentStats287.snapshot(execution().getExecutionSession287())}
