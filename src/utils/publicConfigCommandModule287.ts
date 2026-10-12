import {getConfigWriterController287} from './commandCallbackWriters287.js'
import {getConfigArgumentCompletions287} from './commandCompletionProducers287.js'

/** Original chunk-crq2m5kr public re-export namespace, no additional state. */
function createPublicConfigCommandModule287(){
 const source=getConfigWriterController287()
 return {
  applyConfigShorthand:source.apply,
  collapseShorthandResultOffBox:source.format,
  commitThroughConfigSet:source.change,
  configRowHandles:source.rows,
  describedSettings:source.labels,
  getConfigArgumentCompletions:getConfigArgumentCompletions287,
  listConfigKeys:source.list,
  parseConfigShorthand:source.parse,
  pluginConfigSettings:source.pluginRows,
  shownSettingValue:source.display,
  throughConfigSet:source.decorate,
 }
}

let namespace:ReturnType<typeof createPublicConfigCommandModule287>|undefined
export function getPublicConfigCommandModule287(){return namespace??=Object.freeze(createPublicConfigCommandModule287())}
