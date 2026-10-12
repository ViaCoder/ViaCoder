// Generated from complete official npm 2.1.286 WIF attribution declarations. Do not edit by hand.
// @ts-nocheck
export interface OfficialPolicyWifAttribution286Ports {
  readonly bn: unknown
  readonly Dt: unknown
  readonly g: unknown
  readonly j: unknown
  readonly q: unknown
  readonly tt: unknown
}

export const OFFICIAL_POLICY_WIF_ATTRIBUTION_286_PORTS = [
  {
    "local": "bn",
    "imported": "bn",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "Dt",
    "imported": "Dt",
    "module": "/$bunfs/root/chunk-h730kz80.js"
  },
  {
    "local": "g",
    "imported": "join",
    "module": "path"
  },
  {
    "local": "j",
    "imported": "j",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "q",
    "imported": "q",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "tt",
    "imported": "readFileSync",
    "module": "fs"
  }
] as const

export function createOfficialPolicyWifAttribution286(ports: OfficialPolicyWifAttribution286Ports) {
  const missing = ["bn", "Dt", "g", "j", "q", "tt"].filter(name => !Object.prototype.hasOwnProperty.call(ports, name))
  if (missing.length) throw new TypeError(`Missing official policy WIF attribution ports: ${missing.join(', ')}`)
  const { bn, Dt, g, j, q, tt } = ports as any
  var at=["ANTHROPIC_FEDERATION_RULE_ID","ANTHROPIC_ORGANIZATION_ID"];
  class ue{precedenceSource={filled:!1};authType={filled:!1};profileBaseUrl={filled:!1};accountInfo={filled:!1};federationIdentity={filled:!1};profileStoreDenyPaths={filled:!1};settingsBearerRejected=!1;primedFiles=void 0}
  var A=new q(()=>new ue);
  function kb(){let e=A.of(j().host);if(e.precedenceSource.filled)return e.precedenceSource.value;let r=ft();return e.precedenceSource={filled:!0,value:r},r}
  function ft(){let e=SM(),r=de();if(r){if(e===null)return null;let n=k(e,r);return n==="oidc_federation"||n==="user_oauth"?"profile-explicit":null}if(pe())return"env-quad";if(e!==null){let n=k(e,MSe(e));if(n==="oidc_federation"||n==="user_oauth")return"profile-implicit"}return null}
  function V2t(){A.of(j().host).accountInfo={filled:!1}}
  function XUe(){let e=A.of(j().host);if(e.accountInfo.filled)return e.accountInfo.value;let r=ut();return e.accountInfo={filled:!0,value:r},r}
  function ut(){let e=kb();if(e===null||e==="env-quad")return;let r=SM();if(r===null)return;let n=e==="profile-explicit"?process.env.ANTHROPIC_PROFILE?.trim()??"default":MSe(r),s=S(F(r,n));if(s===null)return;try{let i=JSON.parse(s);return{organizationUuid:i.organization_uuid,organizationName:i.organization_name,accountEmail:i.account_email,workspaceId:i.workspace_id,workspaceName:i.workspace_name}}catch{return}}
  function MSe(e){return S(g(e,"active_config"))?.trim()||"default"}
  function Yzr(e){return process.env.ANTHROPIC_PROFILE?.trim()||MSe(e)}
  function k(e,r){let n=S(g(e,"configs",`${r}.json`));if(n===null)return null;let s;try{s=JSON.parse(n)}catch{return null}let i=s?.authentication?.type??null;if(i==="user_oauth"){if(!S(F(e,r,s))?.trim())return null}return i}
  function F(e,r,n){if(n===void 0){let s=S(g(e,"configs",`${r}.json`));if(s!==null)try{n=JSON.parse(s)}catch{}}return n?.authentication?.credentials_path??g(e,"credentials",`${r}.json`)}
  function SM(){return ce()?.dir??null}
  function ce(){if(bn())return null;let e=process.env,r=e.ANTHROPIC_CONFIG_DIR?.trim();if(r)return{dir:r,space:"userNamed"};let n=e.XDG_CONFIG_HOME?.trim();if(n)return{dir:g(n,"anthropic"),space:"home"};let s=e.HOME?.trim();return s?{dir:g(s,".config","anthropic"),space:"home"}:null}
  function de(){return process.env.ANTHROPIC_PROFILE?.trim()}
  function pe(){return at.every((e)=>process.env[e]?.trim())}
  function S(e){let r=A.of(j().host).primedFiles;if(r!==void 0&&r.has(e))return r.get(e)??null;try{return tt(e,"utf-8")}catch(n){if(Dt(n))return null;throw n}}
  function L6o(e){let{CLAUDE_CODE_OAUTH_TOKEN:r,ANTHROPIC_API_KEY:n}=e;return!!e.ANTHROPIC_UNIX_SOCKET&&!e.ANTHROPIC_AUTH_TOKEN&&(r==="ssh-placeholder"&&!n||n==="ssh-placeholder"&&!r)}
  return { kb, L6o, MSe, SM, V2t, XUe, Yzr }
}
