/* Generated canonical-cell facade; original 2.1.287 state lives in accepted Mods135.
 * Raw chunk-nankzm0s.js SHA-256 9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa.
 * UTF-16 end-exclusive: lS 439285..439479, uS 439479..440047, nL/accessors 440047..440697.
 * No class, WeakMap, lazy state factory or second host/session registry is allocated here.
 */
import type {WorktreeSession} from './worktree.js'
export type WorktreeSessionState287={worktreeName:string;enteredExisting?:boolean}
export type OfficialIsolationEvidence287={spawned:Set<string>;cleanlyRemoved:Set<string>;recordSpawned(value:string):void;recordCleanlyRemoved(value:string):void;clear():void}
export type OfficialWorktreeState287<TSession extends WorktreeSessionState287=WorktreeSessionState287>={
 currentSession:TSession|null;resumeHintWorktreeName:string|null;bgTakeover:unknown|null;
 agentIsolationEvidence:OfficialIsolationEvidence287;isolationUnavailableCwd:string|null;
 setCurrentSession(value:TSession|null):void;getResumeHintWorktreeName():string|null;
 clearResumeHintWorktreeName():void;setBgTakeover(value:unknown|null):void;markIsolationUnavailable(value:string|null):void;
}
type CanonicalWorktreeOwner287={Wt():OfficialWorktreeState287<WorktreeSession>;Uc():WorktreeSession|null;z3o():string|null;rS():unknown|null}
function canonicalOwner287():CanonicalWorktreeOwner287 {
 return (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-nankzm0s.js') as unknown as CanonicalWorktreeOwner287
}
export function Wt(){return canonicalOwner287().Wt()}
export function Uc(){return canonicalOwner287().Uc()}
export function T_t(value:WorktreeSession|null){Wt().setCurrentSession(value)}
export function z3o(){return canonicalOwner287().z3o()}
export function Q3(){Wt().clearResumeHintWorktreeName()}
export function rS(){return canonicalOwner287().rS()}
export function Qwn(value:string){Wt().agentIsolationEvidence.recordSpawned(value)}
export function iKr(value:string){return Wt().agentIsolationEvidence.spawned.has(value)}
export function V3o(value:string){Wt().agentIsolationEvidence.recordCleanlyRemoved(value)}
export function q3o(value:string){return Wt().agentIsolationEvidence.cleanlyRemoved.has(value)}
export function K3o(value:string){return Wt().isolationUnavailableCwd===value}
export function Y3o(value:string){Wt().markIsolationUnavailable(value)}
export const getWorktreeState287=Wt
export const getCurrentSession287=Uc
export const setCurrentSession287=T_t
export const getResumeHintWorktreeName287=z3o
export const clearResumeHintWorktreeName287=Q3
export const getBgTakeover287=rS
