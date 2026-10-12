export type MemoryEnvironment287 = { CLAUDE_CODE_REMOTE?: boolean; CLAUDE_CODE_REMOTE_MEMORY_DIR?: string; CLAUDE_COWORK_MEMORY_GUIDELINES?: string; CLAUDE_CODE_DISABLE_ORG_MEMORY?: boolean };
export type MemoryHost287 = object;
export interface MemoryHostService287<T> { of(host: MemoryHost287): T }
export interface MemoryTrackedSettings287 { markTracked(path: string): void; persistIssued(path: string): boolean; markPersistIssued(path: string): void; isTracked(path: string): boolean }
export interface MemoryConnectedStores287 { getStores(): readonly { readonly mount: string }[]; readonly decision: { readonly state: string } }
export type MemoryProjectRecord287 = { readonly localSettingsSeenGitTracked?: boolean };
export type MemoryProjectConfig287 = { readonly projects?: Readonly<Record<string, MemoryProjectRecord287>> };
export type OfficialSystemComposerMemory287Ports = {
  /** /$bunfs/root/chunk-1b21she7.js#AG; upstream to chunk-6xrs6gmd.js#_a */
  communication: { lean(model: string | undefined): boolean };
  /** /$bunfs/root/chunk-nankzm0s.js#Ae; upstream to chunk-6xrs6gmd.js#nd */
  Ae: (update: (config: MemoryProjectConfig287) => MemoryProjectConfig287, context?: object) => void;
  /** /$bunfs/root/chunk-amhtwhch.js#At; upstream to chunk-6xrs6gmd.js#Aue */
  At: () => boolean;
  /** /$bunfs/root/chunk-nankzm0s.js#GZn; upstream to chunk-6xrs6gmd.js#$s */
  GZn: () => boolean;
  /** /$bunfs/root/chunk-nankzm0s.js#HKr; upstream to chunk-6xrs6gmd.js#Thn */
  HKr: () => boolean;
  /** chunk-6xrs6gmd.js#Hu; upstream to chunk-6xrs6gmd.js#Ze */
  Hu: MemoryHostService287<{ readonly decisionRunEverStarted: boolean }>;
  /** /$bunfs/root/chunk-nankzm0s.js#J0; upstream to chunk-6xrs6gmd.js#Thn */
  J0: (options: { readonly onIndeterminate: "tracked" }) => boolean;
  /** /$bunfs/root/chunk-nankzm0s.js#Jbe; upstream to chunk-6xrs6gmd.js#$s */
  Jbe: () => boolean;
  /** /$bunfs/root/chunk-wz6xag6e.js#Js; upstream to chunk-6xrs6gmd.js#Ac */
  Js: () => boolean;
  /** chunk-6xrs6gmd.js#Nc; upstream to chunk-6xrs6gmd.js#Le */
  Nc: MemoryHostService287<MemoryConnectedStores287>;
  /** chunk-6xrs6gmd.js#Qu; upstream to chunk-6xrs6gmd.js#Thn */
  Qu: MemoryHostService287<MemoryTrackedSettings287>;
  /** /$bunfs/root/chunk-bn3p37gv.js#U; upstream to chunk-6xrs6gmd.js#Thn, chunk-6xrs6gmd.js#rWr, chunk-6xrs6gmd.js#Le, chunk-6xrs6gmd.js#Ze */
  U: () => { readonly host: MemoryHost287 };
  /** /$bunfs/root/chunk-bn3p37gv.js#Wn; upstream to chunk-6xrs6gmd.js#$s */
  Wn: () => boolean;
  /** /$bunfs/root/chunk-s3exmmq6.js#Xo; upstream to chunk-6xrs6gmd.js#Cxe */
  Xo: () => readonly string[];
  /** /$bunfs/root/chunk-nankzm0s.js#YC; upstream to chunk-6xrs6gmd.js#nd, chunk-6xrs6gmd.js#td */
  YC: () => string;
  /** /$bunfs/root/chunk-mbfze585.js#a; upstream to chunk-6xrs6gmd.js#$s, chunk-6xrs6gmd.js#hi */
  a: Readonly<MemoryEnvironment287>;
  /** chunk-6xrs6gmd.js#ar; upstream to chunk-6xrs6gmd.js#dgt */
  ar: { value: boolean };
  /** /$bunfs/root/chunk-nankzm0s.js#ci; upstream to chunk-6xrs6gmd.js#Aue */
  ci: () => { readonly orgMemoryRead?: boolean };
  /** /$bunfs/root/chunk-b5kmgz2n.js#dbe; upstream to chunk-6xrs6gmd.js#cn */
  dbe: () => boolean;
  /** /$bunfs/root/chunk-nankzm0s.js#ds; upstream to chunk-6xrs6gmd.js#Thn */
  ds: () => boolean;
  /** /$bunfs/root/chunk-nankzm0s.js#ft; upstream to chunk-6xrs6gmd.js#Ac, chunk-6xrs6gmd.js#hi */
  ft: () => boolean;
  /** /$bunfs/root/chunk-nankzm0s.js#g8; upstream to chunk-6xrs6gmd.js#Ac */
  g8: (scope: string) => boolean;
  /** /$bunfs/root/chunk-f1vb7bx7.js#ge; upstream to chunk-6xrs6gmd.js#Cxe */
  ge: (source: string) => { readonly permissions?: { readonly blockReadsOutsideWorkingDirectories?: boolean } } | undefined;
  /** /$bunfs/root/chunk-nankzm0s.js#im; upstream to chunk-6xrs6gmd.js#Ac */
  im: () => boolean;
  /** /$bunfs/root/chunk-nankzm0s.js#k; upstream to chunk-6xrs6gmd.js#$s, chunk-6xrs6gmd.js#hi, chunk-6xrs6gmd.js#Qjr, chunk-6xrs6gmd.js#agt, chunk-6xrs6gmd.js#En */
  k: (feature: string, fallback: boolean) => boolean;
  /** /$bunfs/root/chunk-nankzm0s.js#kKr; upstream to chunk-6xrs6gmd.js#VUt */
  kKr: () => string | undefined;
  /** /$bunfs/root/chunk-mnp9k227.js#lc; upstream to chunk-6xrs6gmd.js#hi */
  lc: () => string | null;
  /** /$bunfs/root/chunk-nankzm0s.js#le; upstream to chunk-6xrs6gmd.js#td */
  le: () => MemoryProjectConfig287;
  /** /$bunfs/root/chunk-b5kmgz2n.js#mPe; upstream to chunk-6xrs6gmd.js#cn */
  mPe: () => boolean;
  /** /$bunfs/root/chunk-bn3p37gv.js#oZr; upstream to chunk-6xrs6gmd.js#$s */
  oZr: () => boolean | null;
  /** /$bunfs/root/chunk-bn3p37gv.js#okn; upstream to chunk-6xrs6gmd.js#$s */
  okn: (enabled: boolean) => void;
  /** /$bunfs/root/chunk-b5kmgz2n.js#on; upstream to chunk-6xrs6gmd.js#cn */
  on: (policy: string) => boolean;
  /** node:process#env.CLAUDE_MEMORY_STORES; upstream to chunk-6xrs6gmd.js#hi */
  process: { readonly env: { readonly CLAUDE_MEMORY_STORES?: string } };
  /** /$bunfs/root/chunk-nankzm0s.js#qbe; upstream to chunk-6xrs6gmd.js#Ac, chunk-6xrs6gmd.js#hi */
  qbe: () => boolean;
  /** /$bunfs/root/chunk-nankzm0s.js#qd; upstream to chunk-6xrs6gmd.js#_a, chunk-6xrs6gmd.js#z1 */
  qd: () => boolean;
  /** /$bunfs/root/chunk-b5kmgz2n.js#rU; upstream to chunk-6xrs6gmd.js#cn, chunk-6xrs6gmd.js#er */
  rU: () => boolean;
  /** chunk-6xrs6gmd.js#rm; upstream to chunk-6xrs6gmd.js#rWr */
  rm: MemoryHostService287<{ hasTeamStore(): boolean }>;
  /** /$bunfs/root/chunk-nankzm0s.js#sz; upstream to chunk-6xrs6gmd.js#$s */
  sz: () => boolean;
  /** /$bunfs/root/chunk-bn3p37gv.js#um; upstream to chunk-6xrs6gmd.js#Thn */
  um: () => string | null;
  /** /$bunfs/root/chunk-brnn4zwp.js#yr; upstream to chunk-6xrs6gmd.js#hi */
  yr: () => boolean;
};
export type OfficialSystemComposerMemory287 = { E2o(model: string | undefined): string | null; memoryStatic(model: string | undefined): string | null; memoryLines(displayName:string, directory:string|null, options?:{extraGuidelines?:string[];skipIndex?:boolean;inlineTypes?:boolean;includeSkillUpkeep?:boolean;readOnly?:boolean}):string[] };
export function createOfficialSystemComposerMemory287(ports: OfficialSystemComposerMemory287Ports): OfficialSystemComposerMemory287;
