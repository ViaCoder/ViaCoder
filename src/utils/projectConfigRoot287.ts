import {Option} from '@commander-js/extra-typings'
import chalk from 'chalk'
import {writeFileSync} from 'node:fs'
import {opendir,realpath,stat} from 'node:fs/promises'
import {homedir} from 'node:os'
import {dirname,isAbsolute,join,resolve,sep} from 'node:path'
import {getProjectRoot} from '../bootstrap/state.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {createProjectConfigRoot287} from './officialProjectConfigRoot287/native.js'
import {filesystemPathRuntime287 as paths} from './filesystemPathRuntime287.js'
import {findGitRoot,findCanonicalGitRoot} from './git.js'
import {normalizePathForComparison} from './file.js'
import {logForDebugging} from './debug.js'
// Original Co/reo use the existing mutable je owner. All network classifier
// ports reuse the original filesystem runtime's caches, not a second graph.
export const projectConfigRoot287=createProjectConfigRoot287({
 n:getExecutionSession287,Ln:paths.isUncPath,ca:paths.isAutomountPath,
 SR:paths.isNetworkBrowsePath,jS:paths.isKernelNamespacePath,
 Jr:isAbsolute,Kr:realpath,qr:opendir,Zo:Option,fe:chalk,f:writeFileSync,c:join,
 rzt:findGitRoot,aI:findCanonicalGitRoot,eP:getProjectRoot,
 lr:findGitRoot,bs:findCanonicalGitRoot,ap:normalizePathForComparison,
 ET:join,owe:resolve,BRn:homedir,URn:dirname,HRn:sep,
 yX:stat,t:logForDebugging,
})

// Add the selected config tree to existing loader cache keys, retaining each
// consumer's existing cache owner and explicit cache invalidation APIs.
export function projectConfigTreeCacheKey287(cwd:string):string {
 return JSON.stringify([cwd,projectConfigRoot287.get()])
}
