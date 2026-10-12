// Resolve lazily: constructing the canonical lifecycle also imports prompt
// assembly. Registration and prompt assembly must use its single Z_n owner.
function getBuiltinAgentSource287(){
 const {getOriginalModsLifecycle287}=import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js')
}

export const builtinAgentPolicy287={
 isEnabled(){return getBuiltinAgentSource287().dN()},
 get registry(){return getBuiltinAgentSource287().Z_n},
}
