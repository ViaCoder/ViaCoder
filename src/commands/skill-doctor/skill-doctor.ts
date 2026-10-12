import type {LocalCommandCall} from '../../types/command.js'
import {getOriginalSkillDoctorCommand287} from './official287/runtime.js'
// Full 287 Zyr/k/f closure, using the existing session/transport and skill owner.
export const call:LocalCommandCall=(args,context)=>getOriginalSkillDoctorCommand287().call(args,context)
