export interface OfficialPolicyPrincipal286 { kind: string; descriptor: string; [field: string]: unknown }
export interface OfficialPolicyPrincipalHostState286 {
  principalRung: "none" | "tunnel" | "wif" | "oauth" | "helper" | "key" | string
  tunnelSocket?: string | null
  wifAccountDiverged: boolean
  wifSourceLocation?: string
  wifRecordProfile?: string
  wifRecordedOrg?: string | null
  storedLoginNotedTokenDigest?: string
  storedLoginAccountAtWire: null | { tokenDigest: string; organizationUuid: string | null }
  oauthPrincipalMemo: null | { key: string; principal: OfficialPolicyPrincipal286 | null; daemonSnapshotWorker: boolean; expiresAtMs: number | null }
}
export interface OfficialPolicyPrincipal286Ports {
  readonly a: Readonly<Record<string, string | undefined>>
  readonly BS: () => { key?: string; source: string }
  readonly c9: () => boolean
  readonly cc: () => boolean
  readonly ct: () => boolean
  readonly de: typeof import("node:crypto").createHash
  readonly E2: unknown
  readonly GG: () => boolean
  readonly Hg: (credentials: unknown) => Promise<string>
  readonly j: () => { host: object }
  readonly kb: () => "env-quad" | "profile-implicit" | "profile-explicit" | string
  readonly kn: (...parts: string[]) => string
  readonly l: unknown
  readonly L6o: (options: { ANTHROPIC_UNIX_SOCKET: string; CLAUDE_CODE_OAUTH_TOKEN?: string; ANTHROPIC_API_KEY?: string; ANTHROPIC_AUTH_TOKEN?: string }) => boolean
  readonly Me: unknown
  readonly MSe: unknown
  readonly mWr: (storage: unknown) => Promise<string | null | undefined>
  readonly N: unknown
  readonly pn: () => { accessToken?: string } | undefined
  readonly q: new (factory: () => OfficialPolicyPrincipalHostState286) => { of(host: object): OfficialPolicyPrincipalHostState286 }
  readonly qT: () => "store" | "env" | "fd" | "none" | string
  readonly SM: unknown
  readonly t: (message: string, options?: unknown) => void
  readonly t7n: unknown
  readonly V2t: unknown
  readonly wb: () => boolean
  readonly Wc: () => boolean
  readonly Wgn: unknown
  readonly xm: unknown
  readonly Xt: (organizationUuid: string | undefined) => string | undefined
  readonly XUe: () => { organizationUuid?: string } | undefined
  readonly Yzr: unknown
}
export declare const OFFICIAL_POLICY_PRINCIPAL_286_PORTS: readonly [
  {
    "local": "a",
    "imported": "a",
    "module": "/$bunfs/root/chunk-07mxqtdh.js"
  },
  {
    "local": "BS",
    "imported": "BS",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "c9",
    "imported": "c9",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "cc",
    "imported": "cc",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "ct",
    "imported": "ct",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "de",
    "imported": "createHash",
    "module": "crypto"
  },
  {
    "local": "E2",
    "imported": "E2",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "GG",
    "imported": "GG",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "Hg",
    "imported": "Hg",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
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
    "local": "kn",
    "imported": "resolve",
    "module": "path"
  },
  {
    "local": "l",
    "imported": "l",
    "module": "/$bunfs/root/chunk-h730kz80.js"
  },
  {
    "local": "L6o",
    "imported": "L6o",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "Me",
    "imported": "Me",
    "module": "/$bunfs/root/chunk-ktw7xkh2.js"
  },
  {
    "local": "MSe",
    "imported": "MSe",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "mWr",
    "imported": "mWr",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "N",
    "imported": "N",
    "module": "/$bunfs/root/chunk-abjdv98v.js"
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
    "local": "qT",
    "imported": "qT",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "SM",
    "imported": "SM",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "t",
    "imported": "t",
    "module": "/$bunfs/root/chunk-yx145v00.js"
  },
  {
    "local": "t7n",
    "imported": "t7n",
    "module": "/$bunfs/root/chunk-efdc0n9h.js"
  },
  {
    "local": "V2t",
    "imported": "V2t",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "wb",
    "imported": "wb",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Wc",
    "imported": "Wc",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Wgn",
    "imported": "Wgn",
    "module": "/$bunfs/root/chunk-3q41nfz8.js"
  },
  {
    "local": "xm",
    "imported": "xm",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Xt",
    "imported": "Xt",
    "module": "/$bunfs/root/chunk-v6yfpapk.js"
  },
  {
    "local": "XUe",
    "imported": "XUe",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "Yzr",
    "imported": "Yzr",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  }
][]
export declare function createOfficialPolicyPrincipal286(ports: OfficialPolicyPrincipal286Ports): { xq: () => OfficialPolicyPrincipal286 | null; Kne: (principal: OfficialPolicyPrincipal286) => string; Yne: (value: string) => string; rBr: () => void; Z4n: (storage: unknown, credentials: unknown) => Promise<void>; jD: () => string | undefined; p: () => OfficialPolicyPrincipalHostState286 }
