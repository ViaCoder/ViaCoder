// Generated complete original 2.1.287 declarations. See provenance.json.
export function createOAuthGithub287(ports){
const {$k,Ae,B,Gt,In,V,a,d,f,k,le,o,p,u,y}=ports;
async function h(e,{timeout:n,isBackground:i}){try{let r=await Gt.get("/api/oauth/organizations/:orgUUID/sync/github/auth",{auth:"teleport-org",timeout:n,isBackground:i,validateStatus:()=>!0,credentials:e});if(!r.ok||r.status!==200)return null;let s=r.data?.auth_source;return{isAuthenticated:r.data?.is_authenticated===!0,authSource:s==="oauth"||s==="cli_import"?s:null}}catch{return null}};
async function l(e){let n=await h(e,{timeout:3000,isBackground:!0});if(n===null)return p("api_github_connection_status","request_failed"),"unknown";return y("api_github_connection_status"),n.isAuthenticated?"connected":"not_connected"};
class m{inFlight=void 0;status=void 0;generation=0;async read(e,n){if(this.seedFromPersisted(),this.inFlight)await this.inFlight;else if(!c())await this.fetch(e,n);return this.status??"unknown"}async readLive(e,n){if(this.seedFromPersisted(),!this.inFlight&&c())return"unknown";let i=this.generation,r=await(this.inFlight??this.fetch(e,n));return i===this.generation?r:"unknown"}peek(e,n){if(this.seedFromPersisted(),this.status===void 0&&!this.inFlight&&!c())this.fetch(e,n);return this.status}markConnected(e){this.generation++,this.inFlight=void 0,this.status="connected",g("connected",e)}clear(){this.generation++,this.inFlight=void 0,this.status=void 0}seedFromPersisted(){if(this.status!==void 0||this.inFlight)return;let e=S();if(e)this.status=b(le(),e)}fetch(e,n){let i=this.generation,r=l(e).then((s)=>(this.settle(i,s,n),s),(s)=>(d(s),this.settle(i,"unknown",n),"unknown"));return this.inFlight=r,r}settle(e,n,i){if(e!==this.generation)return;if(this.inFlight=void 0,n==="unknown"){this.status??=n;return}this.status=n,g(n,i)}};
var U$=new V(()=>new m);
function c(){return k("tengu_cheerful_horizon",!1)};
var C=f(()=>u({accountUuid:o(),orgUuid:o(),status:B(["connected","not_connected"])}));
function S(){let e=In();if(!e?.organizationUuid)return;let n=a.CLAUDE_CODE_ORGANIZATION_UUID;if(n&&n!==e.organizationUuid)return;if($k()!=="store")return;return{accountUuid:e.accountUuid,orgUuid:e.organizationUuid}};
function b(e,n){let i=C().safeParse(e.githubWebConnectionStatusCache);if(!i.success||i.data.accountUuid!==n.accountUuid||i.data.orgUuid!==n.orgUuid)return;return i.data.status};
function g(e,n){let i=S();if(!i)return;Ae((r)=>b(r,i)===e?r:{...r,githubWebConnectionStatusCache:{...i,status:e}},n)};
return {U$};
}
