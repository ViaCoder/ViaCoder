import {createRadioComplete287,createRadioBrowserComplete287} from '../../utils/officialPublicCommandDiscovery287/completions.js'
import proof from '../../utils/officialPublicCommandDiscovery287/completions.provenance.json' with {type:'json'}
import {publicCommandSourcePort287} from '../../utils/commandCompletionProducers287.js'
// The original full opener borrows existing launch preferences/platform/env
// and execFile owner. It has no private transport, second cache or subprocess.
const browser=createRadioBrowserComplete287(Object.fromEntries(proof.groups.radioBrowser.ports.map(p=>[p.name,publicCommandSourcePort287(p.module,p.imported)])))
export const call=createRadioComplete287({ls:browser.open}).call
