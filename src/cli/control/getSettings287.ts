import {createGetSettings287} from './getSettings287.native.js'
/** 2.1.287 get_settings branch, separated from print.ts so its caller binds
 * the existing host/model/settings owners without creating another owner. */
export type GetSettings287Response = Record<string, unknown> & {
  remote_control_policy_lock_reason: string | undefined
  applied: {
    model: string
    effort: string | null
    advisor: unknown
    ultracode: unknown
    ultracodeRequested: boolean
    ultracodeAvailable: unknown
  }
  errors: Array<{ file: unknown; path: unknown; message: unknown }> | undefined
}

/** Integration contract for Main (no caller edit is performed here). Bind
 * each port from the named live symbol in the existing chunk-xapeakym.js
 * print runtime: qm/We/Ze/Cr; v/rt/jw/jb/kd; Btr/R_; cYe; o_e/jC/Sx;
 * P3/N1/$J/zb. Keep the current request object and control lane identities. */
export const GET_SETTINGS_287_CANONICAL_CALLER_CONTRACT = {
  rawModule: 'chunk-xapeakym.js',
  connectionAndDispatch: { isRedactedConnection: 'qm(e)', deny: 'We(A, message)', success: 'Ze(A, body)', schedule: 'Cr(work)' },
  settingsAndModel: {
    getAppState: 'v()', getMainLoopModel: 'rt()', modelSupportsEffort: 'jw(model)',
    configuredEffort: 'kd(appState)', resolveAppliedEffort: 'jb(model, configured)',
    getSettingsWithSources: 'Btr()', getSettingsErrors: 'R_().errors',
  },
  appliedFields: {
    getRemoteControlPolicyLockReason: 'cYe()', getAdvisorApplied: 'o_e(appState.advisorModel, model)',
    getUltracodeApplied: 'jC(appState.ultracode, model)', isUltracodeAvailable: 'Sx(model)',
  },
  policyWait: {
    isPolicyWaitSuppressed: 'P3()', isPolicyWaitAlreadyResolved: 'N1()',
    waitForPolicyApplication: '$J()', waitForPolicyClearance: 'zb()',
  },
} as const

/** Main supplies the canonical live owners. Every port is required: this
 * module intentionally contains no default-success or capability fallback. */
export interface GetSettings287Ports<State extends { advisorModel?: unknown; ultracode?: unknown }> {
  isRedactedConnection(): boolean
  getAppState(): State
  getMainLoopModel(): string
  modelSupportsEffort(model: string): boolean
  configuredEffort(state: State): unknown
  resolveAppliedEffort(model: string, configured: unknown): unknown
  getSettingsWithSources(): Record<string, unknown>
  getSettingsErrors(): { errors: Array<{ severity: string; file: unknown; path: unknown; message: unknown }> }
  getRemoteControlPolicyLockReason(): string | null
  getAdvisorApplied(configuredAdvisor: unknown, model: string): unknown
  getUltracodeApplied(configured: unknown, model: string): unknown
  isUltracodeAvailable(model: string): unknown
  /** Original P3() / N1() conditions, in original short-circuit order. */
  isPolicyWaitSuppressed(): boolean
  isPolicyWaitAlreadyResolved(): boolean
  waitForPolicyApplication(): Promise<unknown>
  waitForPolicyClearance(): Promise<unknown>
  /** Original Cr() scheduling lane. */
  scheduleControlWork(work: () => Promise<void>): void
  sendControlError(message: unknown, error: string): void
  sendControlSuccess(message: unknown, body: GetSettings287Response): void
}

/** Named host adapter around the unchanged original branch. */
export function handleGetSettings287<State extends {advisorModel?:unknown;ultracode?:unknown}>(message:unknown,ports:GetSettings287Ports<State>):boolean {
  createGetSettings287({
    qm:ports.isRedactedConnection,e:undefined,v:ports.getAppState,rt:ports.getMainLoopModel,
    jw:ports.modelSupportsEffort,kd:ports.configuredEffort,jb:ports.resolveAppliedEffort,
    Btr:ports.getSettingsWithSources,R_:ports.getSettingsErrors,cYe:ports.getRemoteControlPolicyLockReason,
    o_e:ports.getAdvisorApplied,jC:ports.getUltracodeApplied,Sx:ports.isUltracodeAvailable,
    P3:ports.isPolicyWaitSuppressed,N1:ports.isPolicyWaitAlreadyResolved,
    $J:ports.waitForPolicyApplication,zb:ports.waitForPolicyClearance,
    Cr:ports.scheduleControlWork,We:ports.sendControlError,Ze:ports.sendControlSuccess,
  })(message)
  return true
}
