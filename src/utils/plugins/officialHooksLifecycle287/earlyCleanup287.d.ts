import type {CleanupAction287,CleanupUnregister287} from '../../cleanupRegistry.js';
export interface OriginalCleanupOwner287 {cleanup:{readonly drainStarted:boolean;readonly sizeForTesting:number};preExitFlush:{readonly drainStarted:boolean;readonly sizeForTesting:number}}
export const cleanupSlot287:{of(host:object):OriginalCleanupOwner287};
export function se():OriginalCleanupOwner287;
export function _t(action:CleanupAction287):CleanupUnregister287;
export function uet():Promise<void>;
export function mA():boolean;
export function uR(action:CleanupAction287):CleanupUnregister287;
export function jTn():Promise<void>;
