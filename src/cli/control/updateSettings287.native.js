// Complete official 2.1.287 update_settings validator and effort parser.
export function createSdkSettingsValidation287({nu}){
function $v(e){return nu.includes(e)}
var z={med:"medium"};
function Uue(e){let n=e.trim().toLowerCase(),r=z[n]??n;return $v(r)?r:void 0}
var AA={localSettings:new Set(["outputStyle"]),userSettings:new Set(["effortLevel"])};
function DA(e){return e==="localSettings"||e==="userSettings"}
var Ow=`update_settings: effortLevel must be one of ${nu.join(", ")}`;
function OA(e,r,n,s){if(e)return"update_settings is not available over a remote transport";if(typeof s!=="object"||s===null||Array.isArray(s))return`update_settings requires \`settings\` to be an object, got ${s===null?"null":Array.isArray(s)?"an array":typeof s}`;if(!DA(n))return`update_settings: unsupported source ${String(n)}`;if(!r)return`update_settings: the ${n} source is disabled for this session (--setting-sources)`;let g=s;if(Object.keys(g).length===0)return"update_settings requires at least one key";let w=AA[n],h=Object.keys(g).filter((v)=>!w.has(v));if(h.length>0)return`update_settings keys not allowed: ${h.sort().join(", ")}`;let M=Object.keys(g).filter((v)=>typeof g[v]!=="string");if(M.length>0)return`update_settings values must be strings (deletion is not supported): ${M.sort().join(", ")}`;if(n==="userSettings"&&(typeof g.effortLevel!=="string"||Uue(g.effortLevel)===void 0))return Ow;return null}
return {OA,Uue,Ow};
}
