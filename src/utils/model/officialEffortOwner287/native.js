// Generated from the pinned original 2.1.287 effort owner source.
function fQ(e,n){return e===n||e.kind===n.kind&&(e.kind!=="level"||n.kind==="level"&&e.value===n.value)}
function he(e){if(e.legacyUserEffort!==void 0)return!1;for(let n in e.byModel)return!1;return!0}
function shouldPublish(next,previous){return !fQ(next.sessionEffort,previous.sessionEffort)||next.settingsEffortTable!==previous.settingsEffortTable}
export {shouldPublish as shouldPublishEffortOwner287};
export function createEffortOwnerSource287(ports){
const X=Object.freeze({kind:"inherit"});
const ee=ports.resolveSettingsEffort;
const El=ports.sourceDefaultModel;
function kd(e,n){let r=e.sessionEffort??X;switch(r.kind){case"level":return r.value;case"default":return;case"inherit":if(e.settingsEffortTable===void 0)return;if(he(e.settingsEffortTable))return e.settingsEffortTable.default;return ee(e.settingsEffortTable,n??e.mainLoopModelForSession??e.mainLoopModel??El())}}
return {read:kd};
}
