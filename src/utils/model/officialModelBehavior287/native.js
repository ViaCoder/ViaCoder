// Complete original 287 behavior graph, with existing identity/settings/served owners as ports.
export function createModelBehavior287({cL,Tb,Doe,fb,Xr,Vs,va,Xo,ge}){
function Fn(e){return e.replace(/\[(1|2)m\]/gi,"")}
function Ct(e){return e.replace(/\[1m\]$/i,"")}
function Wy(e){cL().modelKnowledge=e}
function Be(e,n){let r=Tb(e,n);if(n?.identity===!0||Doe(r))return r;let s=Xy(e);if(s===e)return r;return Tb(s,n)}
function Xy(e){let n=cL().modelKnowledge;if(n===void 0)return e;let r=Vs();if(r===null&&!Md(Pd(n)))return e;let s=uWt(r,e);return s.status==="mapped"?s.target:e}
function Pd(e){let n=Xr(),r=e.settingsGeneration(),s=n.behavesAsMemo;if(s!==void 0&&s.lookup===e&&s.settingsGeneration===r)return s;let g={lookup:e,settingsGeneration:r,settingsMappingsDeclared:void 0,withoutRows:jy(),byCatalog:new WeakMap};return n.behavesAsMemo=g,g}
function Md(e){return e.settingsMappingsDeclared??=e.lookup.hasSettingsBehavesAs(),e.settingsMappingsDeclared}
function jy(){return{byModel:new Map,offeredRows:void 0,familySpellingTargets:void 0,familySpellingVouchGeneration:void 0}}
function zy(e,n){if(n===null)return e.withoutRows;let r=e.byCatalog.get(n);if(r===void 0)r=jy(),e.byCatalog.set(n,r);return r}
var xd={status:"known"};
var $D=256;
function uWt(e,n){let r=cL().modelKnowledge;if(r===void 0)return xd;let s=Pd(r),g=zy(s,e),h=g.byModel.get(n);if(h!==void 0)return h;let b=GD(e,n,s);if(g.byModel.size>=$D)g.byModel.clear();return g.byModel.set(n,b),b}
function GD(e,n,r){if(r.lookup.isKnown(n))return xd;if(e===null&&!Md(r))return Ky;let s=new Set([kp(n)]),g=Yy(e,n,r,s,0);if(g!==void 0)return{status:"mapped",target:g.target,source:g.source,hops:g.hops};return Vy(e,n,r)?xd:Ky}
var Ky={status:"unknown"};
function Yy(e,n,r,s,g){if(g>=KD)return;for(let h of jD(e,n,r)){let b=kp(h.target);if(b===""||s.has(b))continue;if(WD(e,h.target,r))return{target:h.target,source:h.source,hops:g+1};s.add(b);let v=Yy(e,h.target,r,s,g+1);if(v!==void 0)return{target:v.target,source:h.source,hops:v.hops}}return}
var KD=8;
function jD(e,n,r){let s=[],g=zD(n,r),h=e===null?void 0:Gy(g,(b)=>YQ(e,b)?.behaves_as);if(h!==void 0)s.push({target:h,source:"served"});if(Md(r)){let b=Gy(g,(v)=>r.lookup.settingsBehavesAs(v));if(b!==void 0)s.push({target:b,source:"settings"})}return s}
function zD(e,n){let r=n.lookup.identitySpelling(e);return kp(r)===kp(e)?[e]:[e,r]}
function Gy(e,n){for(let r of e){let s=n(r)?.trim()??"";if(s!=="")return s}return}
function WD(e,n,r){return r.lookup.isKnown(n)||Vy(e,n,r)}
function Vy(e,n,r){return!1}
function kp(e){return Fn(e).trim().toLowerCase()}
function qE(e){return e.config.models??[]}
function YQ(e,n){let r=kp(n);return qE(e).find((s)=>kp(s.id)===r)}
function _pe(){let e=Xo(),n=fse("modelPicker").find((r)=>e.includes(r.source));return n?{picker:n.value,source:n.source}:void 0}
function NI(e){let n=kp(e);if(n==="")return;let r=_pe()?.picker.options.find((s)=>kp(s.model)===n)?.behavesAs?.trim();return r===void 0||r===""?void 0:r}
function FI(){return _pe()?.picker.options.some((e)=>(e.behavesAs?.trim()??"")!=="")??!1}
var Vns=["policySettings","flagSettings","userSettings"];
function fse(e){let n=[];for(let r of Vns){let s=ge(r)?.[e];if(s!==void 0)n.push({source:r,value:s})}return n}
Wy({isKnown:e=>Doe(Tb(e,{identity:!0})),identitySpelling:e=>fb(Ct(e.toLowerCase()).trim()),settingsBehavesAs:NI,hasSettingsBehavesAs:FI,settingsGeneration:()=>va().policy});
return {canonical:Be,lookup:uWt};
}
export function createModelPickerSchema287({f,u,o,T,H}){
var ps=f(()=>u({model:o().describe('Model to select, taken verbatim: an alias ("opus"), an Anthropic model ID, or a provider-format ID (Vertex, Bedrock, gateway). Same values --model accepts.'),label:o().optional().describe("Row title. Defaults to the model name."),description:o().optional().describe("Row subtitle. Defaults to a generic description."),behavesAs:o().optional().describe("For a model this version of Claude Code does not know: the ID of a model it does know "+'(e.g. "claude-opus-4-8") whose client-side handling \u2014 prompt profile, capability and effort '+"defaults \u2014 applies to it. Changes neither the row's label nor the model ID sent. Without it, "+"a model-catalog row for a model this version does not know is not offered until Claude Code is updated.")}));
return (()=>u({options:T(ps()).describe("Rows to show in the /model picker, in order."),replaceBuiltInOptions:H().optional().describe("When true, the picker shows only the Default row and these options \u2014 the built-in "+"lineup, gateway-discovered models and ANTHROPIC_CUSTOM_MODEL_OPTION are hidden. When false or unset, these options are added after the built-in lineup.")}).optional().describe("Curate the /model picker: an ordered list of models with your own labels, independent of the built-in lineup and of Claude Code releases. availableModels still applies to these rows. Honored from managed, --settings/SDK, and user settings only (not from a project checkout); the highest-precedence of those that defines modelPicker wins outright (no merging across sources). Typically set in managed settings by enterprise administrators."))();
}
