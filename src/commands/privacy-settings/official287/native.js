// Fixed official 2.1.287 chunk-p7tndbc1.js: complete c/D, UTF-16 pins in provenance.json.
// Host imports only; local analytics C remains the existing no-op sink.
import {jsx as e} from 'react/jsx-runtime'
import {logEvent as i} from '../../../services/analytics/index.js'
import {getGroveSettings as EX,isQualifiedForGrove as NVe,getGroveNoticeConfig as Cge} from '../../../services/api/grove.js'
import {GroveDialog as dPn,PrivacySettingsDialog as uPn} from '../../../components/grove/Grove.js'
import {publicCommandSourcePort287} from '../../../utils/commandCompletionProducers287.js'
const S=(value)=>publicCommandSourcePort287('chunk-n4qghq20.js','S')(value)
var c="Review and manage your privacy settings at https://claude.ai/settings/data-privacy-controls";
async function D(t,a){if(!await NVe(a.storageV5,a.credentials))return t(c),null;let[r,l]=await Promise.all([EX(a.credentials),Cge(a.credentials)]);if(!r.success)return t(c),null;let o=r.data,g=l.success?l.data:null;async function u(s){if(s==="escape"||s==="defer"){t("Privacy settings dialog dismissed",{display:"system"});return}await d()}async function d(){let s=await EX(a.credentials);if(!s.success){t("Unable to retrieve updated privacy settings",{display:"system"});return}let n=s.data,m=n.grove_enabled?"true":"false";if(t(`"Help improve our AI models" set to ${m}.`),o.grove_enabled!==null&&o.grove_enabled!==n.grove_enabled)i("tengu_grove_policy_toggled",{state:n.grove_enabled??void 0,location:S("settings")})}if(o.grove_enabled!==null)return e(uPn,{settings:o,domainExcluded:g?.domain_excluded,onDone:d});return e(dPn,{showIfAlreadyViewed:!0,onDone:u,location:"settings"})}
export {D as call}
