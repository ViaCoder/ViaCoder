import type {Command} from '../commands.js'
import type {LocalCommandCall} from '../types/command.js'
import {adaptQueryPrefixContext287} from '../utils/queryPrefixContext287.js'
import {createAdvisorOriginalCall287,createAdvisorOriginalRegistration287} from './officialAdvisor287/native.js'

// Read the accepted canonical only at gate/getter/command use, after its
// command registry has initialized. No second graph or advisor state owner.
function readAdvisorCanonicalModule287(file:string):Readonly<Record<string,unknown>> {
 return (import.meta.require('../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287(file)
}
export const call:LocalCommandCall=async(args,context)=>
 createAdvisorOriginalCall287(readAdvisorCanonicalModule287)(args,adaptQueryPrefixContext287(context))

const advisor=createAdvisorOriginalRegistration287({
 Ce:()=> (readAdvisorCanonicalModule287('chunk-bn3p37gv.js').Ce as ()=>boolean)(),
 AE:()=> (readAdvisorCanonicalModule287('chunk-09m4fzsj.js').AE as ()=>boolean)(),
 V6:()=> (readAdvisorCanonicalModule287('chunk-09m4fzsj.js').V6 as ()=>string[])(),
 loadAdvisor287:()=>Promise.resolve({call}),
}) satisfies Command
export default advisor
