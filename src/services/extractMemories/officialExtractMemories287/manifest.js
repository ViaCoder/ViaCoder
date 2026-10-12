// Complete pinned official 2.1.287 extract lifecycle; see provenance.json.
export function createExtractManifest287(ports){
const {Ib,bqn,p,y}=ports;
var _W=200;
async function _$e(e,n,r,s={}){try{let h=(await bqn(e,n,s,r)).slice(0,_W);return y("memory_scan"),h}catch(h){return p("memory_scan",h instanceof Ib?"memory_scan_storage_list_failed":"memory_scan_readdir_failed"),[]}};
function aNt(e){return e.map((n)=>{let r=n.type?`[${n.type}] `:"",s=new Date(n.mtimeMs).toISOString(),h=`- ${r}${n.filename} (${s})`;return n.description?`${h}: ${n.description}`:h}).join(`
`)};
return {_$e,aNt};
}
