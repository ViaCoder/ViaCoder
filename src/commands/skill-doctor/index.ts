import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js'
import { isEnvTruthy } from '../../utils/envUtils.js'
import { textCommand } from '../noninteractive/types.js'
// chunk-ryzzp1n6.js:JP; registry sqt().skillDoctor, NOT an unconditional command.
export function isSkillDoctorEnabled(): boolean {
  return getFeatureValue_CACHED_MAY_BE_STALE('tengu_lantern_prism', false) || isEnvTruthy(process.env.CLAUDE_CODE_LANTERN_PRISM)
}
export default textCommand('skill-doctor', 'Show which loaded skills are unused and costing context', () => import('./skill-doctor.js'), { isEnabled:isSkillDoctorEnabled, thinClientDispatch:'post-text' })
