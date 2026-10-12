import * as fs from 'node:fs'
import * as promises from 'node:fs/promises'
import * as path from 'node:path'
import * as crypto from 'node:crypto'
import * as events from 'node:events'
import {createMemoryDirectory287,type MemoryDirectoryRuntime287} from '../utils/officialMemoryDirectory287/native.js'
import {parseFrontmatter} from '../utils/frontmatterParser.js'
import {normalizeMemoryFrontmatter287} from './officialMemoryFormat287/native.js'
import {readFileInRange} from '../utils/readFileInRange.js'
import {getClaudeConfigHomeDir} from '../utils/envUtils.js'
import {logForDebugging} from '../utils/debug.js'
import {logEvent} from '../services/analytics/index.js'

let directoryRuntime287:MemoryDirectoryRuntime287|undefined
export function getMemoryDirectoryRuntime287():MemoryDirectoryRuntime287 {
 if(directoryRuntime287)return directoryRuntime287
 const {memoryHostRegistryConstructor287,getMemoryReadPolicy287}=require('../constants/systemComposerMemory287.js') as typeof import('../constants/systemComposerMemory287.js')
 directoryRuntime287=createMemoryDirectory287({
  fs,'fs/promises':promises,path,crypto,events,
  hostRegistry:memoryHostRegistryConstructor287,
  stores:()=>getMemoryReadPolicy287().clientStores(),
  memoryDirectory:()=>getMemoryReadPolicy287().requiredMemoryDirectory287(),
  // Original Dp is config-home/projects, not getMemoryBaseDir's remote override.
  memoryBase:()=>path.join(getClaudeConfigHomeDir(),'projects'),
  frontmatter:parseFrontmatter,normalizeFrontmatter:normalizeMemoryFrontmatter287,readRange:readFileInRange,
  debug:logForDebugging,event:logEvent,
  // These exact telemetry leaves remain disabled by the accepted C layer.
  sad:(feature_name,error_code)=>logEvent('tengu_feature_sad',{feature_name:feature_name as never,error_code:error_code as never}),
  ok:feature_name=>logEvent('tengu_feature_ok',{feature_name:feature_name as never}),
 })
 return directoryRuntime287
}
