import {createPrintSetCwd287,type PrintSetCwdHost287} from './native.js'
import {createClaimRelocation287,type ClaimRelocationHost287} from './relocation.js'
import {printClaimScreen287} from './screen.js'
import {workspaceTrustRuntime287} from './workspaceTrust.js'
import {dirname} from 'node:path'
import {stat,realpath} from 'node:fs/promises'
import {getOriginalCwd} from '../../bootstrap/state.js'
import {getErrnoCode} from '../../utils/errors.js'
import {logError} from '../../utils/log.js'
import {getCwd} from '../../utils/cwd.js'
import {expandPath} from '../../utils/path.js'
import {findCanonicalGitRoot} from '../../utils/git.js'
import {logForDebugging} from '../../utils/debug.js'
import {getSetCwdSource287} from './setCwdSourcesRuntime287.js'
/** All mutation is performed by the same relocation/trust/config/transcript
 * owners used by claim and /cd. The recovered oss does not allocate state. */
export function createSetCwdReceiverRuntime287(host:ClaimRelocationHost287) {
 const source=(file:string,name:string)=>(...args:unknown[])=>Reflect.apply(getSetCwdSource287(file,name) as (...args:unknown[])=>unknown,undefined,args)
 const relocation=createClaimRelocation287(host)
 const runtime=createPrintSetCwd287({
  CB:printClaimScreen287.screen,HD:printClaimScreen287.unsafe,
  A:dirname,O:stat,x:realpath,E:getErrnoCode,Ht:source('chunk-c9me9cp7.js','Ht'),Ee:getOriginalCwd,d:logError,
  L:source('chunk-h3rrxdgy.js','L'),Mn:source('chunk-x954y317.js','Mn'),No:source('chunk-q80zaav8.js','No'),
  Su:source('chunk-6xrs6gmd.js','Su'),ZN:source('chunk-6xrs6gmd.js','ZN'),dBt:source('chunk-6xrs6gmd.js','dBt'),
  kxe:source('chunk-6xrs6gmd.js','kxe'),sXe:source('chunk-6xrs6gmd.js','sXe'),
  ETe:source('chunk-mphp7acd.js','ETe'),On:source('chunk-db6pdgvs.js','On'),Q0:source('chunk-nankzm0s.js','Q0'),
  Xe:expandPath,_ae:workspaceTrustRuntime287.record,
  not:relocation.relocate,nw:findCanonicalGitRoot,oe:getCwd,t:logForDebugging,
 })
 return runtime
}
export type {PrintSetCwdHost287}
