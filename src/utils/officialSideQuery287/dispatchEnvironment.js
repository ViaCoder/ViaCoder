// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryDispatchEnvironment287(ports){
const {B7o}=ports;
function ZZe(t,o){let _=Object.create(o);for(let[r,s]of Object.entries(t)){let n=_,e;Object.defineProperty(_,r,{get:()=>{let C=process.env[r];if(C!==n)e=s.parse(C),n=C;return e},enumerable:!0,configurable:!0})}return Object.defineProperties(_,{set:{value:(r,s)=>{process.env[r]=B7o(s)}},unset:{value:(r)=>{delete process.env[r]}}}),_};
var JU={};
var Dn=ZZe(JU,null);
return {Dn};
}
