// Official 2.1.287 settings aggregation functions _G/Ju/PSe/h8n; external host/state effects are typed ports.
export function createOfficialPermissionSettings287(ports){
function cgt(){return ports.evalConfined()}
function Gh(){return ports.getSettingsForSource("policySettings")?.allowManagedPermissionRulesOnly===!0}
function h8n(e,n){if(!e||!e.permissions)return[];let{permissions:r}=e,s=[];for(let g of ports.permissionBehaviors){let h=r[g];if(h)for(let w of h)s.push({source:n,ruleBehavior:g,ruleValue:ports.parseRuleValue(w)})}return s}
function PSe(e){let n=ports.getSettingsForSource(e);return h8n(n,e)}
function Ju(e={}){if(Gh())return PSe("policySettings");let n=[];for(let r of ports.enabledSources())n.push(...PSe(r));if(!(e.strictPersistedTrust??ports.persistedTrust())){let{gateProject:r,gateLocal:s}=ports.ruleTrustGates(),g=new Set,h=n.filter((w)=>{if(w.ruleBehavior!=="allow")return!0;if(w.source==="projectSettings"&&r)return g.add(".claude/settings.json"),!1;if(w.source==="localSettings"&&s)return g.add(".claude/settings.local.json"),!1;return!0});if(h.length!==n.length)ports.reportDroppedAllows("permissions.allow",n.length-h.length,[...g]);return h}return n}
function _G(e={}){let n=Ju(e);return cgt()?n.filter((r)=>r.ruleBehavior!=="allow"):n}
return {_G,Ju,PSe,h8n};
}
