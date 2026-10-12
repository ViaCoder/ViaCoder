import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type {PromptCommand} from '../../types/command.js'
import {createOnboardingComplete287} from '../../utils/officialPublicCommandDiscovery287/completions.js'
import proof from '../../utils/officialPublicCommandDiscovery287/completions.provenance.json' with {type:'json'}
import {publicCommandSourcePort287} from '../../utils/commandCompletionProducers287.js'
// No transcript/usage/account cache: qYt/x4o read original local files, and Ae
// writes via the existing canonical global-config/storage owner. The policy
// primitive is the same public client on(), never the Mods graph's own copy.
export function onboardingProductionPorts287():Record<string,unknown>{
 return Object.defineProperties({},Object.fromEntries(proof.groups.onboarding.ports.map(p=>[p.name,{enumerable:true,get:()=>{
  if(p.module==='fs/promises')return fs[p.imported as keyof typeof fs]
  if(p.module==='path')return path[p.imported as keyof typeof path]
  if(p.module==='chunk-b5kmgz2n.js'&&p.imported==='on')return (require('../../services/policyLimits/index.js') as typeof import('../../services/policyLimits/index.js')).isPolicyAllowed
  return publicCommandSourcePort287(p.module,p.imported)
 }}])))
}
let controller:ReturnType<typeof createOnboardingComplete287>|undefined
export function getTeamOnboardingCommand287():PromptCommand{
 return (controller??=createOnboardingComplete287(onboardingProductionPorts287())).command
}
