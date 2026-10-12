import type {TypedEnvironment287} from '../../../utils/officialTypedEnvironment287/native.js'

export type SurfaceEnvironment287 = Pick<TypedEnvironment287,
  'CLAUDE_CODE_ENTRYPOINT' | 'CLAUDE_CODE_SESSION_ATTENDED' |
  'CLAUDE_CODE_CHILD_SESSION' | 'CLAUDECODE' | 'CLAUDE_CODE_COWORK_FRAME_ARTIFACTS' |
  'CLAUDE_CODE_HOST_SCHEDULED_RUN' | 'CLAUDE_CODE_REMOTE_SESSION_ID' |
  'CLAUDE_CHROME_TAB_GROUP_KEY' | 'CLAUDE_CODE_ACTION' | 'set' | 'unset'>

export interface SurfaceIdentity287 {
  entrypoint: string | undefined
  interactive: boolean
  spawnedByAttendedSession: boolean | undefined
  childSession: boolean
  claudecode: boolean
  coworkFrameArtifacts: boolean
  hostScheduledRun: boolean
  chromeTabGroupKey: string | undefined
  remoteControlOwnerDeclared: boolean
  setEntrypoint(value: string | undefined): void
  setInteractive(value: boolean): void
  setSpawnedByAttendedSession(value: boolean | undefined): void
  setChildSession(value: boolean): void
  setClaudecode(value: boolean): void
  setCoworkFrameArtifacts(value: boolean): void
  setHostScheduledRun(value: boolean): void
  setChromeTabGroupKey(value: string | undefined): void
  setRemoteControlOwnerDeclared(value: boolean): void
}

export interface CanonicalReplHandle287 {refreshGitBranch?:()=>void}
export interface HistoryPrefetchEntry287 {path:string;written:Promise<string|null>;settled:boolean;pageSize:number;settledAt?:number;settledOk?:boolean}
export interface SurfaceBridgeRuntime287 {replHandle:CanonicalReplHandle287|null;historySpoolDir:string|null;readonly historyPrefetchEntries:Map<string,HistoryPrefetchEntry287>;readonly [slot:string]:unknown}
export interface SurfaceRuntime287 {
  readonly bridgeRuntimeOwner287:{of(host:object):SurfaceBridgeRuntime287}
  bridgeRuntime():SurfaceBridgeRuntime287
  replHandle():CanonicalReplHandle287|null
  surface(): SurfaceIdentity287
  entrypoint(): string | undefined
  initialize(nonInteractive: boolean): void
}

export function createSurfaceIdentity287(ports: {
  environment: SurfaceEnvironment287
  execution(): {host: object}
}): SurfaceRuntime287
