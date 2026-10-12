import {resolve} from 'node:path'
import {createAgentsCommand287,type AgentsCommandPorts287} from './native.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {createRoot} from '../../ink.js'
import {getBaseRenderOptions} from '../../utils/renderOptions.js'
import {checkHasTrustDialogAccepted} from '../../utils/config.js'
import {applyConfigEnvironmentVariables} from '../../utils/managedEnv.js'
import {initializeTelemetryAfterTrust} from '../../entrypoints/init.js'

function sourceModule(file:string):Readonly<Record<string,unknown>> {
  return getOriginalModsLifecycle287().clearSourceModule287(file)
}
/** Fixed imports borrow existing canonical namespaces and public host ports only. */
async function importSource(file:string):Promise<Readonly<Record<string,unknown>>> {
  switch(file) {
    case 'chunk-aatcqh6b.js': return {createRoot}
    case 'chunk-31xz0e80.js': return {getBaseRenderOptions}
    case 'chunk-5d0c5s4c.js': return {checkHasTrustDialogAccepted}
    case 'chunk-dnxk7stv.js': return {applyConfigEnvironmentVariables}
    case 'chunk-d9en3kbj.js': return {initializeTelemetryAfterTrust}
    case 'chunk-jxk14c94.js': return {printAgentsJson:sourceModule(file).N}
    case 'chunk-b5wgfjk8.js': return {mountFleetViewWithComposerBack:sourceModule(file).u}
    case 'chunk-6e2q7fgx.js': return {applyFleetViewHostWindowsEnv:sourceModule(file).nos}
    case 'chunk-n5n26kcd.js': return {startBackgroundHousekeeping:(await import('../../utils/backgroundHousekeeping.js')).startBackgroundHousekeeping}
    case 'chunk-qtcqcpaq.js': {const s=sourceModule(file);return {refuseBypassUnderRoot:s.l,applyBypassPolicyGate:s.u,ensureAgentsBypassConsent:s.c}}
    case 'chunk-k9pwjc27.js': {const s=sourceModule(file);return {agentsTrustDecision:s.D,ensureAgentsWorkspaceTrust:s.T}}
    default: throw Error('Unselected agents import: '+file)
  }
}
export function createProductionAgentsPorts287():AgentsCommandPorts287 {
  return {process,resolve,sourceModule,importSource}
}
export function getProductionAgentsCommand287() {
  return createAgentsCommand287(createProductionAgentsPorts287())
}
