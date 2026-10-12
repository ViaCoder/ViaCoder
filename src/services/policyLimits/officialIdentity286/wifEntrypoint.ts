// Generated from complete official npm 2.1.286 Yc entrypoint helper and lexical closure. Do not edit by hand.
// @ts-nocheck
export interface OfficialPolicyEntrypoint286Ports {
  readonly a: unknown
}
export const OFFICIAL_POLICY_ENTRYPOINT_286_PORTS = [
  {
    "local": "a",
    "imported": "a",
    "module": "/$bunfs/root/chunk-07mxqtdh.js"
  }
] as const
export function createOfficialPolicyEntrypoint286(ports: OfficialPolicyEntrypoint286Ports) {
  const missing = ["a"].filter(name => !Object.prototype.hasOwnProperty.call(ports, name))
  if (missing.length) throw new TypeError(`Missing official entrypoint ports: ${missing.join(', ')}`)
  const { a } = ports as any
  var r=new Set(["claude-desktop","claude-desktop-3p","local-agent"]);
  function Yc(){let e=a.CLAUDE_CODE_ENTRYPOINT;return e!==void 0&&r.has(e)}
  return { Yc }
}
