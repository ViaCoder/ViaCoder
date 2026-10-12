import {spawn} from 'node:child_process'
import {realpath} from 'node:fs/promises'
import {homedir} from 'node:os'
import {basename} from 'node:path'
import {createDeepLinkLauncher287,type DeepLinkLauncherPorts287} from '../officialDeepLinkLauncher287/native.js'
import {deepLinkPluginPrompt287} from '../officialDeepLinkLauncher287/pluginPrompt.js'
import {getGlobalConfig} from '../config.js'
import {logForDebugging} from '../debug.js'
import {jsonStringify} from '../slowOperations.js'
import {which} from '../which.js'
import {execFileNoThrow} from '../execFileNoThrow.js'
import {getKnownPathsForRepo,filterExistingPaths} from '../githubRepoPathMapping.js'
import {readLastFetchTime} from './banner.js'
import {parseDeepLink} from './parseDeepLink.js'
import {getDeepLinkStableEntry287} from './stableEntry287.js'
function source(file:string):Readonly<Record<string,unknown>> {
 return (require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287(file)
}
export function createDeepLinkLauncherPorts287():DeepLinkLauncherPorts287 {
 // Original D/ae realpath(process.execPath) body is preserved. Only the executable
 // host slot is the retained C stable cclaude entry (same registration owner).
 return {
  process:{get execPath(){return getDeepLinkStableEntry287()},env:process.env},env:process.env,
  featureSuccess:name=>(source('chunk-9d2ykxmy.js').y as (name:string)=>unknown)(name),
  featureFailure:(name,code)=>(source('chunk-9d2ykxmy.js').m as (name:string,code:string)=>unknown)(name,code),
  json:jsonStringify,debug:logForDebugging,which,config:getGlobalConfig,
  trackPid:pid=>(source('chunk-1nayt2j6.js').ST as (pid:number|undefined)=>void)(pid),
  exec:execFileNoThrow,parse:parseDeepLink,bundleId:'com.anthropic.claude-code-url-handler',
  knownPaths:getKnownPathsForRepo,existingPaths:filterExistingPaths,lastFetch:readLastFetchTime,
  pluginPrompt:deepLinkPluginPrompt287,realpath,homedir,spawn,basename,
 }
}
export const deepLinkLauncher287=createDeepLinkLauncher287(createDeepLinkLauncherPorts287())
