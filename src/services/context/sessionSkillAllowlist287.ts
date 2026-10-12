import {getExecutionSession287} from './execution287.js'
import {createSessionSkillAllowlist287} from './officialSessionSkillAllowlist287/native.js'

// The existing execution host owns the cell; no mirror or reset callback.
export const sessionSkillAllowlist287=createSessionSkillAllowlist287({execution:getExecutionSession287})
