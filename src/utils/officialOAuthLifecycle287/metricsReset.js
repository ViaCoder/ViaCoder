// Generated complete original 2.1.287 declarations. See provenance.json.
export function createOAuthMetricsReset287(ports){
const {E_,Gt,NM,Ope,Tj,U,V,aY,dn,l,m,t,y}=ports;
var S=3600000;
var h="/api/claude_code/organizations/metrics_enabled";
class o extends Error{};
async function w(){let e=Ope(await NM(),`${dn().BASE_API_URL}${h}`);if(e.error)throw new o("Auth error: no credential usable for the metrics opt-out check");let n=await Gt.get(h,{auth:"none",headers:e.headers,timeout:5000,bypassEssentialTrafficOnly:!0,maxRedirects:0});if(!n.ok)throw new o(`metrics_enabled unavailable: ${n.reason}`);if(typeof n.data?.metrics_logging_enabled!=="boolean")throw Error("metrics_enabled response missing metrics_logging_enabled");return n.data};
async function M(e){try{let n=await E_(w,{also403Revoked:!0,gateToSessionOAuthCredential:!0,oauthRefreshLatch:e});return e.attempted=!1,t(`${Tj} Metrics opt-out API response: enabled=${n.metrics_logging_enabled}`),y("api_metrics_opt_out_check"),{enabled:n.metrics_logging_enabled,hasError:!1}}catch(n){return t(`${Tj} Failed to check metrics opt-out status: ${l(n)}`,n instanceof o?{level:"error"}:void 0),m("api_metrics_opt_out_check","request_failed"),{enabled:!1,hasError:!0}}};
var _=new V(()=>{let e={attempted:!1};return{memo:aY(()=>M(e),S),oauthRefreshLatch:e}});
var E=new V(()=>({identity:void 0}));
function xgo(){let e=U().host,n=_.of(e);n.memo.cache.clear(),n.oauthRefreshLatch.attempted=!1,E.of(e).identity=void 0};
return {xgo,_,E};
}
