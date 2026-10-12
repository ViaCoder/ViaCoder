import {createAtomicStaging287} from './officialAtomicStaging287/native.js'
import {getCwd} from './cwd.js'
import {executionRecommendationGates287,executionLifecycle287,getExecutionSession287,getLegacyExecutionContext287} from '../services/context/execution287.js'
import {authEnvironment} from './authEnvironment.js'
import {getClaudeConfigHomeDir} from './envUtils.js'
import {getOriginalSettingsReader287} from './settings/settingsReader287.js'
import {getAtomicWriter287,recordAtomicStagingDirectory287} from './atomicWriter287.js'
import {execFileNoThrowWithCwd} from './execFileNoThrow.js'
import {dirIsInGitRepo} from './git.js'
import {logForDebugging} from './debug.js'
import {logEvent} from '../services/analytics/index.js'

// Complete original Ee/cr/tP: legacy project getters and selected session
// project are distinct; Es is the already accepted canonical requireProject.
const stagingCwdOwners287=new Function('c','n','Es',
 "function Ee(){return c()?.originalCwd??Es(n()).originalCwd}\nfunction cr(){return c()?.projectRoot??Es(n()).projectRoot}\nfunction tP(){return Es(n()).cwd};return {Ee,cr,tP};"
)(getLegacyExecutionContext287,getExecutionSession287,executionLifecycle287.requireProject) as {Ee():string;cr():string;tP():string}

// Full public pB owns staging setup; all identities are registered in the same
// ne used by rC. mB's original publication latch is not an atomic/cache clone.
export function getAtomicStagingPorts287():Record<string,unknown>{
 return {originalCwd:stagingCwdOwners287.Ee,cwd:stagingCwdOwners287.tP,projectRoot:stagingCwdOwners287.cr,
  configHome:getClaudeConfigHomeDir,remoteWorkspace:executionRecommendationGates287.Ft,
  settingsPath:(source:import('./settings/constants.js').SettingSource)=>{const reader=getOriginalSettingsReader287();return reader.path(source,reader.context())},
  record:recordAtomicStagingDirectory287,
  tampered:(message:string)=>getAtomicWriter287().tampered(message),
  inGitRepo:dirIsInGitRepo,exec:execFileNoThrowWithCwd,environment:authEnvironment,
  debug:logForDebugging,
  // Preserve cancelled telemetry; business publication/error branches still run.
  sad:()=>logEvent('tengu_feature_sad',{}),ok:()=>logEvent('tengu_feature_ok',{}),bad:()=>logEvent('tengu_feature_bad',{}),
 }
}
let owner:ReturnType<typeof createAtomicStaging287>|undefined
export function getAtomicStaging287(){
 if(!owner){
  owner=createAtomicStaging287(getAtomicStagingPorts287())
  const publishGitignore=owner.publishGitignore
  // Original xtr's default n=oe() must not use fB's tP() port. The full
  // accepted xtr closure remains unchanged; only its public default argument
  // is supplied by the existing canonical async-CWD callable.
  owner.publishGitignore=(pattern,cwd=getCwd())=>publishGitignore(pattern,cwd)
 }
 return owner
}
export const ensureAtomicWriteStagingDirs287=()=>getAtomicStaging287().ensure()
