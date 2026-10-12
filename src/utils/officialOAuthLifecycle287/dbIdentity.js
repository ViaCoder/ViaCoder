// Generated complete original 2.1.287 declarations. See provenance.json.
export function createOAuthDbIdentity287(ports){
const {V}=ports;
function rvo(e){let{resolvedMeIds:t,inFlightMeIds:r}=ke.of(e);t.clear(),r.clear()};
class ye{resolvedMeIds=new Map;inFlightMeIds=new Map};
var ke=new V(()=>new ye);
return {rvo,ke};
}
