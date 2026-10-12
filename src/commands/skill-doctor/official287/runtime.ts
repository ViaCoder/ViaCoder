import {publicCommandSourcePort287} from '../../../utils/commandCompletionProducers287.js'
import {createOriginalSkillDoctor287} from './native.js'
import proof from './provenance.json' with {type:'json'}
let owner:ReturnType<typeof createOriginalSkillDoctor287>|undefined
export function getOriginalSkillDoctorCommand287(){
 return owner??=createOriginalSkillDoctor287(Object.fromEntries(proof.imports.map(row=>[row.local,publicCommandSourcePort287(row.module,row.imported)])))
}
