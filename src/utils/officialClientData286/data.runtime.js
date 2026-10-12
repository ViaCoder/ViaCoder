// Generated from manifest-verified 2.1.286 complete Td/zYn/dw/Mgt closure.
// ce and oe remain existing application-owned readers; no body rewrites.
export function createOfficialClientDataReader286(ports) {
const {ce,oe}=ports
var Rc="bi1-";
var DYn=`${Rc}key-unavailable`;
function Mgt(e){return typeof e==="object"&&e!==null&&"data"in e&&"at"in e&&typeof e.at==="number"}
function Td(e){return zYn(e)?.data??null}
function zYn(e){let n=oe();if(n.clientDataReadGate&&!n.clientDataReadGate())return null;let r=dw(n,e);if(!n.clientDataOverride)return r;let s=r?.data??null,g=n.clientDataOverride(s,e);return g===s?r:{data:g,model:r?.model??e}}
function dw(e,n){if(!e.clientDataCacheKeyGetter)return null;let r=ce(),s=e.clientDataCacheKeyGetter(n),g=r.clientDataCacheSlots;if(g!=null&&Object.hasOwn(g,s)){let E=g[s];return Mgt(E)?{data:E.data??null,model:E.model}:null}if(n!==void 0&&(s===DYn||s!==e.clientDataCacheKeyGetter()))return null;let h=e.clientDataWindowSeed;if(h!==null&&h.key===s)return{data:h.data};let b=r.clientDataCache;return typeof b==="object"&&b!==null?{data:b}:null}
return {Td,zYn,dw,Mgt,DYn}
}
