// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicyBoundedRead287(ports){
const {}=ports;
async function rO(e,n,r,s){let t=await e.stat(n);if(!t.isFile()||t.size>r)return s?.(t),null;return await e.readFile(n,{encoding:"utf8"})};
return {rO};
}
