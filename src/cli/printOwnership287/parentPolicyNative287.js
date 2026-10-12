// Whole original bje/AXr/its and settingsSource accessors; no policy state.
export function createPrintParentPolicy287(ports){
const {M,uO,tR,n,gt,t,Ro}=ports;
function bje(){return AXr(M())}
function AXr(e){if(uO(e).composes==="tier")return!1;return tR(e).parentIncluded}
function Jeo(e){n().host.settingsSource.replaceParentManagedSettings(e)}
function Qeo(e){n().host.settingsSource.replaceParentManagedSettingsInvalid(e)}
function w6e(){return n().host.settingsSource.parentManagedSettingsInvalid()}
function its(e){let r=gt(e.trim(),!1);if(!r||typeof r!=="object"||Array.isArray(r)){t("--managed-settings ignored: invalid JSON object",{level:"warn"}),Qeo(!0);return}Jeo(r),Ro()}
return {included:bje,load:its,invalid:w6e};
}
