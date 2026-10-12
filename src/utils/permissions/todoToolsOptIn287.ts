import {createPermissionRuleProducers287} from './officialRuleProducers287/native.js'
import {searchToolOptIn287} from './searchToolOptIn287.js'
import {getExecutionSession287} from '../../services/context/execution287.js'

// HEr uses the same source parser/normalizer as Feo; Ueo writes the host,
// not a per-project copy or the default exposed tool list.
export const todoToolsOptIn287=createPermissionRuleProducers287({
 ruleHelpers:{
  parseList:values=>searchToolOptIn287.parseList([...values]),
  parseBase:searchToolOptIn287.parseBase,
  parseRule:searchToolOptIn287.parseRule,
  formatRule:searchToolOptIn287.formatRule,
  normalize:searchToolOptIn287.normalize,
  preset:searchToolOptIn287.preset,
  validateAllow:searchToolOptIn287.validateAllow,
 },
 hostLaunch:{replaceTodoToolsOptIn:value=>getExecutionSession287().host.launchOptions.replaceTodoToolsOptIn(value)},
})
