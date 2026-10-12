// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicyLoopback287(ports){
const {}=ports;
var o=new Set(["localhost","::1","[::1]"]);
var n=/^127(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
function hL(t){return o.has(t)||n.test(t)};
return {hL};
}
