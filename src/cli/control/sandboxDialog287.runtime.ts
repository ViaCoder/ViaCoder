import {SandboxManager as BaseSandboxManager} from '@anthropic-ai/sandbox-runtime'
import {SandboxManager} from '../../utils/sandbox/sandbox-adapter.js'
import {getPlatform} from '../../utils/platform.js'
import {getPrintHostSource287} from '../printOwnership287/publicHostRuntime287.js'
import {createSandboxDialog287,createSandboxDialogDependencyProbe287} from './sandboxDialog287.native.js'
import type {SandboxDependencyPorts287,SandboxDependencyProbe287,SandboxDialogOwner287,SandboxDialogPorts287} from './sandboxDialog287.native.js'

/** Lexical view of the running adapter's existing probe/cache and backend. */
export function createActualSandboxDialog287(
 actual:typeof SandboxManager,base:typeof BaseSandboxManager,
 source:(module:string,name:string)=>unknown,platform:()=>string,
) {
 const sandbox=(name:string)=>source('chunk-5vadtxaa.js',name)
 const state={
  get checkDependenciesProbe(){return actual.checkDependencies as SandboxDependencyProbe287},
 }
 const dependencies=createSandboxDialogDependencyProbe287({
  O:platform,jJ:()=>actual.isSupportedPlatform(),$t:()=>state,
  _B:sandbox('_B') as string,wB:sandbox('wB') as SandboxDependencyPorts287['wB'],
  b9:sandbox('b9') as SandboxDependencyPorts287['b9'],
  TB:sandbox('TB') as SandboxDependencyPorts287['TB'],
  // Windows availability still stops at the actual R13 owner. Never borrow Jt.
  Jt:base as unknown as SandboxDependencyPorts287['Jt'],
 })
 const owner:SandboxDialogOwner287={
  ...actual,checkDependenciesAsync:dependencies,
  isAutoAllowBashIfSandboxedEnabled:sandbox('Yee') as ()=>boolean,
  areUnsandboxedCommandsForbiddenByPolicy:sandbox('OB') as ()=>boolean,
  isUnsandboxedFallbackClosedByTrustedTier:sandbox('BB') as ()=>boolean,
  isAutoAllowSupported:sandbox('CB') as ()=>boolean,
  getConfiguredNetworkAllowances:sandbox('FB') as SandboxDialogOwner287['getConfiguredNetworkAllowances'],
  getConfiguredFilesystemGrants:sandbox('cte') as SandboxDialogOwner287['getConfiguredFilesystemGrants'],
 }
 return createSandboxDialog287({
  Ro:source('chunk-s3exmmq6.js','Ro') as ()=>void,O:platform,je:owner,
  er:source('chunk-f1vb7bx7.js','er') as SandboxDialogPorts287['er'],
  kre:sandbox('kre') as ()=>boolean,GJ:sandbox('GJ') as ()=>boolean,
 })
}
export function buildActualSandboxDialog287() {
 return createActualSandboxDialog287(SandboxManager,BaseSandboxManager,getPrintHostSource287,getPlatform)()
}
