// Generated complete original 2.1.287 declarations. See provenance.json.
export function createOAuthGatewayWait287(ports){
const {}=ports;
var s=(t,r)=>{let e=setTimeout(t,r);return()=>clearTimeout(e)};
function lt(t,r,e=s){let o=()=>{},n=new Promise((m)=>{o=e(()=>m(void 0),r)});return Promise.race([t,n]).finally(o)};
return {lt};
}
