// Original 2.1.287 model accessors, with the unique scoped session owner.
export function createModelSelectionAccessors287(ports){
const n=ports.executionContext;
function Kc(){return n().modelSelection.mainLoopModelOverride()}
function kL(){return n().modelSelection.initialMainLoopModel()}
function Jp(e){n().modelSelection.overrideMainLoopModel(e)}
function $Zr(e){n().modelSelection.replaceInitialMainLoopModel(e)}
return {"getMainLoopModelOverride":Kc,"getInitialMainLoopModel":kL,"setMainLoopModelOverride":Jp,"setInitialMainLoopModel":$Zr};
}
