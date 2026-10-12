// Generated from complete official npm 2.1.286 Wc source and lexical closure. Do not edit by hand.
// @ts-nocheck
export interface OfficialPolicyWifEligibility286Ports {
  readonly a: unknown
  readonly Bn: unknown
  readonly d0: unknown
  readonly ge: unknown
  readonly hEn: unknown
  readonly i: unknown
  readonly I6o: unknown
  readonly j: unknown
  readonly kb: unknown
  readonly kr: unknown
  readonly pn: unknown
  readonly q: unknown
  readonly q2t: unknown
  readonly t: unknown
  readonly Xn: unknown
  readonly Yc: unknown
}

export const OFFICIAL_POLICY_WIF_ELIGIBILITY_286_PORTS = [
  {
    "local": "a",
    "imported": "a",
    "module": "/$bunfs/root/chunk-07mxqtdh.js"
  },
  {
    "local": "Bn",
    "imported": "Bn",
    "module": "/$bunfs/root/chunk-0sv6vt2c.js"
  },
  {
    "local": "d0",
    "imported": "d0",
    "module": "/$bunfs/root/chunk-f09yefd8.js"
  },
  {
    "local": "ge",
    "imported": "ge",
    "module": "/$bunfs/root/chunk-z4sfh6wh.js"
  },
  {
    "local": "hEn",
    "imported": "hEn",
    "module": "/$bunfs/root/chunk-0shqxty0.js"
  },
  {
    "local": "i",
    "imported": "i",
    "module": "/$bunfs/root/chunk-kgb116ys.js"
  },
  {
    "local": "I6o",
    "imported": "I6o",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "j",
    "imported": "j",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "kb",
    "imported": "kb",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "kr",
    "imported": "kr",
    "module": "/$bunfs/root/chunk-gxp5am6q.js"
  },
  {
    "local": "pn",
    "imported": "pn",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "q",
    "imported": "q",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "q2t",
    "imported": "q2t",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "t",
    "imported": "t",
    "module": "/$bunfs/root/chunk-yx145v00.js"
  },
  {
    "local": "Xn",
    "imported": "Xn",
    "module": "/$bunfs/root/chunk-z4sfh6wh.js"
  },
  {
    "local": "Yc",
    "imported": "Yc",
    "module": "/$bunfs/root/chunk-exsxfgv0.js"
  }
] as const

export function createOfficialPolicyWifEligibility286(ports: OfficialPolicyWifEligibility286Ports) {
  const missing = ["a", "Bn", "d0", "ge", "hEn", "i", "I6o", "j", "kb", "kr", "pn", "q", "q2t", "t", "Xn", "Yc"].filter(name => !Object.prototype.hasOwnProperty.call(ports, name))
  if (missing.length) throw new TypeError(`Missing official policy WIF eligibility ports: ${missing.join(', ')}`)
  const { a, Bn, d0, ge, hEn, i, I6o, j, kb, kr, pn, q, q2t, t, Xn, Yc } = ports as any
  function fr(){return a.CLAUDE_CODE_REMOTE||Yc()}
  function cc(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
  class vk{implicitProfileSkippedLogged=!1;profileAuthSelectedLogged=!1}
  var PYo=new q(()=>new vk);
  function EH(e){if(e.implicitProfileSkippedLogged)return;t(`An Anthropic profile (~/.config/anthropic) is configured, but a claude.ai login exists \u2014 using the claude.ai login. Set ANTHROPIC_PROFILE=<name> to use the profile instead.${""}`,{level:"warn"}),queueMicrotask(()=>i("tengu_wif_implicit_profile_skipped_stored_login",{})),e.implicitProfileSkippedLogged=!0}
  function wH(e){if(e.profileAuthSelectedLogged)return;let n=kb()??"profile";t(`Using Anthropic profile auth (${n}); ${q2t()?"a claude.ai login (/login) would take precedence over it":"this takes precedence over any stored claude.ai login"}`,{level:"info"}),e.profileAuthSelectedLogged=!0}
  function v8n(e={}){return Boolean(r9()||a.ANTHROPIC_UNIX_SOCKET||fr()||cc()||a.ANTHROPIC_AUTH_TOKEN||a.CLAUDE_CODE_OAUTH_TOKEN||d0()||(e.skipApiKeyHelper?!1:ih())||!Bn())}
  function Wc(e={}){if(!I6o())return!1;if(v8n(e))return!1;let n=e.skipApiKeyHelper?void 0:PYo.of(j().host);if(kb()==="profile-implicit"){let r=pn();if(QUt(r)&&q2t()){if(n)EH(n);return!1}}if(n)wH(n);return!0}
  function r9(){if(!kr())return!1;return!0}
  function ih(){if(kr())return ge("flagSettings")?.apiKeyHelper;if(cc())return;return(Xn()||{}).apiKeyHelper}
  function QUt(e){return h1(e?.scopes)&&!!e?.accessToken}
  function h1(e){return hEn(e)}
  return { Wc, selectorState: PYo }
}
