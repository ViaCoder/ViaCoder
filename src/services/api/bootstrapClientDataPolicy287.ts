import {createPublishedClientDataPolicyHelpers287} from './officialBootstrap287/clientDataPolicy.js'
import {getPermissionTrustTrackingOwner287} from '../../utils/config.js'
import {C$ as getEffectivePolicyTaints} from '../../vendor/official-files-api/taints.js'
import {getOfficialPolicyPrincipal286} from '../policyLimits/officialIdentityBindings286.js'
import {getPublishedClientDataPolicyRestrictions287,isPolicyLimitsEligible} from '../policyLimits/index.js'
const helpers=createPublishedClientDataPolicyHelpers287({Jt:{
 servedTrue:name=>(getPermissionTrustTrackingOwner287() as unknown as {servedTrue(name:string):boolean}).servedTrue(name),
}})
// Specialize original on ONLY for the public catalog/document policy. Its
// registry has onCacheMiss=allow, no hold/fail-open/transcript/server gates.
// Full source ljt/M determines actual taint/explicit verdict precedence.
// This is not a replacement policy service or a restored attribution fetch.
export function isPublishedClientDataPolicyAllowed287(policy:string):boolean {
 if(policy!=='allow_model_catalog')throw new TypeError('Published client-data policy port only accepts allow_model_catalog')
 const restrictions=getPublishedClientDataPolicyRestrictions287()
 const taints=getEffectivePolicyTaints()
 const hints=getOfficialPolicyPrincipal286().p() as unknown as {hintedTaints:string[];hintedDeniedKeys:string[]}
 if(restrictions===null){
  if(helpers.M(policy,taints))return false
  // Exact on: hints only qualify the eligible policy principal. Missing auth
  // is not fabricated into an eligible organization or accepted document.
  if(!isPolicyLimitsEligible())return true
  if(hints.hintedDeniedKeys.includes(policy))return false
  return helpers.ljt({restrictions:{},compliance_taints:[]},policy,hints.hintedTaints)
 }
 if(restrictions[policy]===undefined&&hints.hintedDeniedKeys.includes(policy))return false
 return helpers.ljt({restrictions,compliance_taints:[]},policy,[...taints,...hints.hintedTaints])
}
