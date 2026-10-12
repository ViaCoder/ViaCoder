import * as fs from 'node:fs'
import * as path from 'node:path'
import cloneDeep from 'lodash-es/cloneDeep.js'
import mergeWith from 'lodash-es/mergeWith.js'
import isEqual from 'lodash-es/isEqual.js'
import {createSettingsReader287,type OriginalSettingsContext287} from './officialSettingsReader287/native.js'
import {getSettingsCacheStore287,OriginalHostRegistry287,OriginalSettingsSnapshotStore287,normalizeSettingsTier287} from './settingsCache.js'
import {getPolicyParser287} from './policyParserOwner287.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getModelUsagePolicy287} from '../../services/context/modelUsagePolicy287.js'
import {getOriginalCwd} from '../../bootstrap/state.js'
import {getClaudeConfigHomeDir} from '../envUtils.js'
import {getManagedFilePath} from './managedPath.js'
import {getMdmSettings,getHkcuSettings,getMdmWslInherits287} from './mdm/settings.js'
import {getFsImplementation} from '../fsOperations.js'
import {findCanonicalGitRoot} from '../git.js'
import {authEnvironment} from '../authEnvironment.js'
import {logEvent} from '../../services/analytics/index.js'
import {logForDebugging} from '../debug.js'
import type {PolicyReadContext287} from '../../services/context/officialModelUsagePolicy287/native.js'
import type {SettingSource} from './constants.js'

interface SettingsSource287 {
 allowedSettingSources():SettingSource[];allowedSettingSourcesWithoutRepoDirSources():SettingSource[]
 flagSettingsPath():string|undefined;flagSettingsExpectedContent():string|undefined;flagSettingsFilePinnedContent():string|undefined
 flagSettingsInline():Record<string,unknown>|null;useCoworkPlugins():boolean
}
const settingsSource=()=>getExecutionSession287().host.settingsSource as SettingsSource287
const launch=()=>getExecutionSession287().host.launchOptions as unknown as {
 projectConfigRoot():string|null;workspaceRestrictionState():{restriction?:unknown}|undefined
}
const helper=()=> (require('../claudeInChrome/standaloneRuntime287.js') as typeof import('../claudeInChrome/standaloneRuntime287.js')).getChromePolicyHelperModule287()
// M and policy accept the same public fields; null cwd is meaningful only for
// the original no-project path, never silently replaced by the process cwd.
const policyContext=(ctx:OriginalSettingsContext287):PolicyReadContext287=>ctx as PolicyReadContext287
export function getOriginalSettingsReaderPorts287():Record<string,unknown>{
 const parser=getPolicyParser287()
 return {va:getSettingsCacheStore287,um:getOriginalCwd,Co:()=>launch().projectConfigRoot(),
  qOe:()=>launch().workspaceRestrictionState()?.restriction?settingsSource().allowedSettingSourcesWithoutRepoDirSources():settingsSource().allowedSettingSources(),
  ly:()=>settingsSource().flagSettingsInline(),SD:()=>settingsSource().flagSettingsPath(),TT:()=>settingsSource().flagSettingsExpectedContent(),TY:()=>settingsSource().flagSettingsFilePinnedContent(),
  z3t:()=>settingsSource().useCoworkPlugins(),aI:findCanonicalGitRoot,unusedCanonicalRootHomeProbe:()=>{throw Error('Pinned original PU returns null; home probe is not reachable')},U:getExecutionSession287,
  V:OriginalHostRegistry287,i:logEvent,
  D3t:()=>getModelUsagePolicy287().parentManaged(),a:authEnvironment,U8:getMdmSettings,gje:getHkcuSettings,IU:getMdmWslInherits287,
  or:()=>helper().or(),sr:()=>helper().sr(),ar:()=>helper().ar(),Rt:()=>helper().Rt(),czt:()=>helper().czt(),
  Bns:(source:SettingSource)=>getModelUsagePolicy287().credentialsFrom(source),bZe:(ctx:OriginalSettingsContext287)=>parser.readManaged(policyContext(ctx)),
  d6e:OriginalSettingsSnapshotStore287,we:getClaudeConfigHomeDir,gT:getManagedFilePath,
  fm:(value:string)=>{try{return fs.realpathSync(value)}catch{return null}},Mn:path.normalize,ae:getFsImplementation,t:logForDebugging,
  QF:parser.read,P_:parser.inlineSettings,I8o:(ctx:OriginalSettingsContext287)=>getModelUsagePolicy287().resolvePolicy(policyContext(ctx)),
  arr:(ctx:OriginalSettingsContext287)=>getModelUsagePolicy287().credentialHelperPolicy287(policyContext(ctx)),
  _f:cloneDeep,VF:mergeWith,Sz:parser.mergeSettings,ekn:normalizeSettingsTier287,Or:isEqual,
  d:(error:unknown)=>logForDebugging(String(error),{level:'error'}),Z:(error:unknown)=>error instanceof Error?error.message:String(error),
 }
}
let reader:ReturnType<typeof createSettingsReader287>|undefined
export function getOriginalSettingsReader287(){return reader??=createSettingsReader287(getOriginalSettingsReaderPorts287())}
export function getOriginalSettingsContext287(){return getOriginalSettingsReader287().context()}
export function engageRepoSettingsSnapshot287(){return getOriginalSettingsReader287().engage()}
