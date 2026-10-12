/**
 * Files are loaded in the following order:
 *
 * 1. Managed memory (eg. /etc/claude-code/CLAUDE.md) - Global instructions for all users
 * 2. User memory (~/.claude/CLAUDE.md) - Private global instructions for all projects
 * 3. Project memory (CLAUDE.md, .claude/CLAUDE.md, and .claude/rules/*.md in project roots) - Instructions checked into the codebase
 * 4. Local memory (CLAUDE.local.md in project roots) - Private project-specific instructions
 *
 * Files are loaded in reverse order of priority, i.e. the latest files are highest priority
 * with the model paying more attention to them.
 *
 * File discovery:
 * - User memory is loaded from the user's home directory
 * - Project and Local files are discovered by traversing from the current directory up to root
 * - Files closer to the current directory have higher priority (loaded later)
 * - CLAUDE.md, .claude/CLAUDE.md, and all .md files in .claude/rules/ are checked in each directory for Project memory
 *
 * Memory @include directive:
 * - Memory files can include other files using @ notation
 * - Syntax: @path, @./relative/path, @~/home/path, or @/absolute/path
 * - @path (without prefix) is treated as a relative path (same as @./path)
 * - Works in leaf text nodes only (not inside code blocks or code strings)
 * - Included files are added as separate entries before the including file
 * - Circular references are prevented by tracking processed files
 * - Non-existent files are silently ignored
 */

import { feature } from 'bun:bundle'
import {createMemoryLoader287,type MemoryLoader287,type MemoryLoaderPorts287} from './officialMemoryLoader287/native.js'
import {getMemoryDirectoryRuntime287} from '../memdir/memoryDirectoryRuntime287.js'
import {authEnvironment} from './authEnvironment.js'
import {getManagedFilePath} from './settings/managedPath.js'
import ignore from 'ignore'
import { Lexer } from 'marked'
import {
  basename,
  dirname,
  extname,
  isAbsolute,
  join,
  relative,
  sep,
} from 'path'
import {sanitizeOfficialMemoryContent} from '../services/context/attachments.js'
import {createInstructionFormatter287} from './officialInstructionFormat287/native.js'
import {parseMemoryPathsFrontmatter287,extractMemoryIncludes287, parsePersonalMemory287, stripMemoryComments287 as stripHtmlCommentsFromTokens} from './officialPersonalMemory287/native.js'
import {createMemoryFileReader287, type MemoryReadResult287} from './officialMemoryRead287/native.js'
import * as nodePath from 'node:path'
import {createMemoryReadFence287,type MemoryReadFence287,type MemoryReadStore287,type MemoryExclusion287} from './officialMemoryReadFence287/native.js'
import {createMemoryRules287,type MemoryRules287,type MemoryRulesInput287} from './officialMemoryRules287/native.js'
import {isStorageV5PinnedOn} from './secureStorage/storageV5.js'
import {filesystemPathRuntime287} from './filesystemPathRuntime287.js'
import {windowsPathToPosixPath287} from './pathRuntime287.js'
import {getPlatform} from './platform.js'
import {getSurfaceIdentity287} from '../services/context/surface287.js'
import {getExecutionSession287,runWithExecutionSession287,executionRecommendationGates287,executionSessionRegistryConstructor287} from '../services/context/execution287.js'
import type {ExecutionSession287} from '../services/context/officialExecutionOwners287/native.js'
import {createMemorySession287,type MemorySession287,type MemorySessionCache287,type MemorySessionTracking287} from './officialMemorySession287/native.js'
import type {MemoryRulesBackend287} from './officialMemoryRules287/native.js'
import {memoryHostRegistryConstructor287,getMemoryReadPolicy287,hasMemoryStoreOverride287,isPublicAutoMemoryEnabled287,getSystemComposerMemoryDirectoryOwner287} from '../constants/systemComposerMemory287.js'
import { logEvent } from 'src/services/analytics/index.js'
import {
  getAllowedSettingSources,
  getAdditionalDirectoriesForClaudeMd,
  getOriginalCwd,
} from '../bootstrap/state.js'
import { truncateEntrypointContent } from '../memdir/memdir.js'
import { getSystemComposerMemoryDirectory287 } from '../constants/systemComposerMemory287.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../services/analytics/growthbook.js'
import {
  getCurrentProjectConfig,
  getManagedClaudeRulesDir,
  getMemoryPath,
  getUserClaudeRulesDir,
} from './config.js'
import { logForDebugging } from './debug.js'
import { logForDiagnosticsNoPII } from './diagLogs.js'
import { getClaudeConfigHomeDir } from './envUtils.js'
import { normalizePathForComparison } from './file.js'
import { cacheKeys, type FileStateCache } from './fileStateCache.js'
import {
  parseFrontmatter,
  splitPathInFrontmatter,
} from './frontmatterParser.js'
import { getFsImplementation, safeResolvePath } from './fsOperations.js'
import { findCanonicalGitRoot, findGitRoot } from './git.js'
import {
  executeInstructionsLoadedHooks,
  hasInstructionsLoadedHook,
  type InstructionsLoadReason,
} from './hooks.js'
import type { MemoryType } from './memory/types.js'
import { expandPath } from './path.js'
import {isNetworkReference287} from './officialMemoryNetworkPaths287/native.js'
import { isSettingSourceEnabled } from './settings/constants.js'
import { getInitialSettings,getSettingsForSource } from './settings/settings.js'

/* eslint-disable @typescript-eslint/no-require-imports */
const teamMemPaths = feature('TEAMMEM')
  ? (require('../memdir/teamMemPaths.js') as typeof import('../memdir/teamMemPaths.js'))
  : null
/* eslint-enable @typescript-eslint/no-require-imports */


const MEMORY_INSTRUCTION_PROMPT =
  'Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.'
// Recommended max character count for a memory file
export const MAX_MEMORY_CHARACTER_COUNT = 40000

// File extensions that are allowed for @include directives
// This prevents binary files (images, PDFs, etc.) from being loaded into memory


export type MemoryFileInfo = {
  path: string
  type: MemoryType
  content: string
  parent?: string // Path of the file that included this one
  linkedFrom?: string // Original symlink boundary shown for a discovered rule
  globs?: string[] // Glob patterns for file paths this rule applies to
  // True when auto-injection transformed `content` (stripped HTML comments,
  // stripped frontmatter, truncated MEMORY.md) such that it no longer matches
  // the bytes on disk. When set, `rawContent` holds the unmodified disk bytes
  // so callers can cache a `isPartialView` readFileState entry — presence in
  // cache provides dedup + change detection, but Edit/Write still require an
  // explicit Read before proceeding.
  contentDiffersFromDisk?: boolean
  rawContent?: string
}

function pathInOriginalCwd(path: string): boolean {
  return getMemoryReadFence287().within(path)
}

/**
 * Parses raw content to extract both content and glob patterns from frontmatter
 * @param rawContent Raw file content with frontmatter
 * @returns Object with content and globs (undefined if no paths or match-all pattern)
 */
function parseFrontmatterPaths(rawContent: string): {
  content: string
  paths?: string[]
} {
  return parseMemoryPathsFrontmatter287(rawContent,{
    Hs:parseFrontmatter,
    dht:splitPathInFrontmatter,
  })
}

/**
 * Strip block-level HTML comments (<!-- ... -->) from markdown content.
 *
 * Uses the marked lexer to identify comments at the block level only, so
 * comments inside inline code spans and fenced code blocks are preserved.
 * Inline HTML comments inside a paragraph are also left intact; the intended
 * use case is authorial notes that occupy their own lines.
 *
 * Unclosed comments (`<!--` with no matching `-->`) are left in place so a
 * typo doesn't silently swallow the rest of the file.
 */
export function stripHtmlComments(content: string): {
  content: string
  stripped: boolean
} {
  if (!content.includes('<!--')) {
    return { content, stripped: false }
  }
  // gfm:false is fine here — html-block detection is a CommonMark rule.
  return stripHtmlCommentsFromTokens(new Lexer({ gfm: false }).lex(content))
}

/**
 * Parses raw memory file content into a MemoryFileInfo. Pure function — no I/O.
 *
 * When includeBasePath is given, @include paths are resolved in the same lex
 * pass and returned alongside the parsed file (so processMemoryFile doesn't
 * need to lex the same content a second time).
 */
function parseMemoryFileContent(
  rawContent: string,
  filePath: string,
  type: MemoryType,
  includeBasePath?: string,
): MemoryReadResult287 {
  return parsePersonalMemory287(rawContent, filePath, type, includeBasePath, {
    l0n: extname,
    t: logForDebugging,
    y0n: parseFrontmatterPaths,
    Rq: Lexer,
    v0n: extractIncludePathsFromTokens,
    jQ: sanitizeOfficialMemoryContent,
    Ihn: truncateEntrypointContent,
  })
}

// Original mat/rO own the read boundary and per-host diagnostics. Keep the
// existing parser as a shared port until its full imported closure is restored.
// Bind on first actual read: claudemd and the composer share an import cycle.
// The original S0n registry remains the sole read-diagnostic owner thereafter.
let memoryFileReader287: ReturnType<typeof createMemoryFileReader287> | undefined
function safelyReadMemoryFileAsync(filePath:string,type:MemoryType,includeBasePath?:string):Promise<MemoryReadResult287>
function safelyReadMemoryFileAsync(filePath:string,type:MemoryType,includeBasePath:string|undefined,store:MemoryReadStore287|undefined):Promise<MemoryReadResult287|null>
function safelyReadMemoryFileAsync(
  filePath: string,
  type: MemoryType,
  includeBasePath?: string,
  store?:MemoryReadStore287,
):Promise<MemoryReadResult287|null> {
  const reader=getMemoryFileReader287()
  return store===undefined ? reader.mat(filePath,type,includeBasePath) : reader.mat(filePath,type,includeBasePath,store)
}

function getMemoryFileReader287():ReturnType<typeof createMemoryFileReader287> {
  memoryFileReader287 ??= createMemoryFileReader287({
    V: memoryHostRegistryConstructor287,
    U: getExecutionSession287,
    ae: getFsImplementation,
    t: logForDebugging,
    we: getClaudeConfigHomeDir,
    i: logEvent,
    uat: parseMemoryFileContent,
  })
  return memoryFileReader287
}

// Original v0n uses the shared network predicate and path expansion owner.
function extractIncludePathsFromTokens(tokens:ReturnType<Lexer['lex']>,basePath:string):string[] {
  return extractMemoryIncludes287(tokens,basePath,{PR:isNetworkReference287,Xe:expandPath,kw:dirname})
}

// Full original g7/_at/MF/E0n exclusion and read fence. Bind lazily because
// config/composer/Memory share import cycles; all ports use existing real owners.
let memoryReadFence287:MemoryReadFence287|undefined
function getMemoryReadFence287():MemoryReadFence287 {
 return memoryReadFence287??=createMemoryReadFence287({
  path:nodePath,platform:getPlatform,filesystem:getFsImplementation,resolve:safeResolvePath,
  network:filesystemPathRuntime287.isNetworkReference,networkVolume:filesystemPathRuntime287.isNetworkVolumePath,
  entrypoint:()=>getSurfaceIdentity287().entrypoint,settings:getInitialSettings,originalCwd:getOriginalCwd,
  expand:expandPath,windowsToPosix:windowsPathToPosixPath287,read:safelyReadMemoryFileAsync,
 })
}
export async function processMemoryFile(
 filePath:string,type:MemoryType,processedPaths:Set<string>,includeExternal:boolean,depth=0,parent?:string,
 store?:MemoryReadStore287,exclude?:MemoryExclusion287,
):Promise<MemoryFileInfo[]> {
 return getMemoryReadFence287().process(filePath,type,processedPaths,includeExternal,depth,parent,store,exclude)
}

/**
 * Processes all .md files in the .claude/rules/ directory and its subdirectories
 * @param rulesDir The path to the rules directory
 * @param type Type of memory file (User, Project, Local)
 * @param processedPaths Set of already processed file paths
 * @param includeExternal Whether to include external files
 * @param conditionalRule If true, only include files with frontmatter paths; if false, only include files without frontmatter paths
 * @param visitedDirs Set of already visited directory real paths (for cycle detection)
 * @returns Array of MemoryFileInfo objects
 */
let memoryRules287:MemoryRules287|undefined
function getMemoryRules287():MemoryRules287 {
 return memoryRules287??=createMemoryRules287({
  path:nodePath,filesystem:getFsImplementation,resolve:safeResolvePath,
  network:filesystemPathRuntime287.isNetworkReference,networkVolume:filesystemPathRuntime287.isNetworkVolumePath,
  entrypoint:()=>getSurfaceIdentity287().entrypoint,expand:expandPath,platform:getPlatform,windowsToPosix:windowsPathToPosixPath287,
  userRules:getUserClaudeRulesDir,storageEnabled:isStorageV5PinnedOn,debug:logForDebugging,originalCwd:getOriginalCwd,
  env:process.env,additionalDirectories:getAdditionalDirectoriesForClaudeMd,projectConfig:getCurrentProjectConfig,
  excluded:(path,type,exclude)=>getMemoryReadFence287().excluded(path,type,exclude),processFile:processMemoryFile,
  event:logEvent,configHome:getClaudeConfigHomeDir,readState:()=>getMemoryFileReader287().wEe(),
 })
}
export function processMdRules(input:MemoryRulesInput287):Promise<MemoryFileInfo[]> {
 return getMemoryRules287().walk(input)
}

let memorySession287:MemorySession287|undefined
function getMemorySession287():MemorySession287 {
 return memorySession287??=createMemorySession287({
  path:nodePath,sessionRegistry:executionSessionRegistryConstructor287,session:getExecutionSession287,
  load:loadSessionMemoryFiles287,feature:getFeatureValue_CACHED_MAY_BE_STALE,
  hasMemoryStores:hasMemoryStoreOverride287,memoryDirectory:getSystemComposerMemoryDirectory287,
  requiredMemoryDirectory:()=>getMemoryReadPolicy287().requiredMemoryDirectory287(),
  readFenceEnabled:()=>getMemoryReadPolicy287().readFenceEnabled287(),
  readPathCandidates:filesystemPathRuntime287.readPathCandidates,
  truncateIndex:truncateEntrypointContent,indexPath:()=>join(getMemoryReadPolicy287().requiredMemoryDirectory287(),'MEMORY.md'),
 })
}
const readMemoryFilesCached287=(forceIncludeExternal=false):Promise<MemoryFileInfo[]>=>getMemorySession287().get(getExecutionSession287(),forceIncludeExternal)
/** Original vw caller can select a root/backend without allocating another cache. */
export function getMemoryFilesForSession287(session:ExecutionSession287,forceIncludeExternal=false,storageV5?:MemoryRulesBackend287):Promise<MemoryFileInfo[]> {
 return runWithExecutionSession287(session,()=>getMemorySession287().get(session,forceIncludeExternal,storageV5))
}
export const getMemoryFiles=Object.defineProperty(
 readMemoryFilesCached287,
 'cache',{get:()=>getMemorySession287().cache(getExecutionSession287()).files},
) as ((forceIncludeExternal?:boolean)=>Promise<MemoryFileInfo[]>)&{readonly cache:Map<boolean,Promise<MemoryFileInfo[]>>}

/** Actual per-root source owners; alias project views share these registries. */
export function getMemorySessionCache287():MemorySessionCache287 {return getMemorySession287().cache(getExecutionSession287())}
export function getMemorySessionTracking287():MemorySessionTracking287 {return getMemorySession287().trackingRegistry.of(getExecutionSession287())}

let memoryLoader287:MemoryLoader287|undefined
function getMemoryLoader287():MemoryLoader287 {
 return memoryLoader287??=createMemoryLoader287(getMemoryLoaderPorts287())
}

/** Actual ports for the raw-source differential oracle; no fixture or shadow state. */
export function getMemoryLoaderPorts287():MemoryLoaderPorts287 {
 return {
  path:nodePath,remoteWorkspace:executionRecommendationGates287.Ft,
  track:(tracking,files)=>getMemorySession287().track(tracking,files),
  diagnostic:logForDiagnosticsNoPII,projectConfig:getCurrentProjectConfig,
  excludeMatcher:()=>getMemoryReadFence287().exclusion(),managedHome:getManagedFilePath,memoryPath:getMemoryPath,
  managedRules:getManagedClaudeRulesDir,settingEnabled:isSettingSourceEnabled,configHome:getClaudeConfigHomeDir,userRules:getUserClaudeRulesDir,
  restriction:()=>{
   // Original O3t, same complete je instance. The public restricted entry remains blocked.
   const launch=getExecutionSession287().host.launchOptions as ExecutionSession287['host']['launchOptions']&{workspaceRestrictionState():{restriction:import('./officialMemoryLoader287/native.js').MemoryWorkspaceRestriction287}|null}
   return launch.workspaceRestrictionState()?.restriction??null
  },
  allowedSources:getAllowedSettingSources,originalCwd:getOriginalCwd,gitRoot:findGitRoot,canonicalGitRoot:findCanonicalGitRoot,
  normalize:normalizePathForComparison,filesystem:getFsImplementation,resolve:safeResolvePath,ancestry:filesystemPathRuntime287.ancestry,
  skipped:(...args)=>getMemoryReadFence287().skipped(...args),processFile:processMemoryFile,
  // R04: no enterprise helper is installed. Original ir()/lCn() return null
  // for that absent source state; this does not emulate a helper or backend.
  helperInstructions:()=>null,settingsForSource:getSettingsForSource,rules:processMdRules,
  network:filesystemPathRuntime287.isNetworkReference,networkVolume:filesystemPathRuntime287.isNetworkVolumePath,
  additionalRegistry:getMemorySession287().additionalRegistry,env:authEnvironment,additionalDirectories:getAdditionalDirectoriesForClaudeMd,
  memoryEnabled:isPublicAutoMemoryEnabled287,memoryBlocked:()=>getMemoryReadPolicy287().readFenceBlocked287(),
  directoryOwner:getSystemComposerMemoryDirectoryOwner287,indexPath:()=>join(getMemoryReadPolicy287().requiredMemoryDirectory287(),'MEMORY.md'),
  requiredDirectory:()=>getMemoryReadPolicy287().requiredMemoryDirectory287(),readAllowed:path=>getMemorySession287().readAllowed(path),
  read:(path,type)=>safelyReadMemoryFileAsync(path,type),indexOverride:content=>getMemorySession287().indexOverride(content),
  hasMemoryStores:hasMemoryStoreOverride287,backfill:(host,directory)=>getMemoryDirectoryRuntime287().backfill(host,directory),
  feature:getFeatureValue_CACHED_MAY_BE_STALE,event:logEvent,consumeHook:state=>getMemorySession287().consumeHook(state),
  hasInstructionsHook:hasInstructionsLoadedHook,
  // Preserve the current hook dispatcher in the exact session scope. Its
  // complete AP/storage/credentials/Mods contract is a separate open audit,
  // not claimed as restored by this outer-loader change.
  instructionsHook:(session,path,type,reason,options)=>runWithExecutionSession287(session,()=>executeInstructionsLoadedHooks(path,type,reason,options)),
  expand:expandPath,platform:getPlatform,windowsToPosix:windowsPathToPosixPath287,
 }
}
async function loadSessionMemoryFiles287(
 session:ExecutionSession287,state:MemorySessionCache287,tracking:MemorySessionTracking287,
 forceIncludeExternal:boolean,storageV5?:MemoryRulesBackend287,credentials?:unknown,
):Promise<MemoryFileInfo[]> {
 const files=await getMemoryLoader287().load(session,state,tracking,forceIncludeExternal,storageV5,credentials)
 // Existing feature-limited local addition; do not replace it while restoring P.
 if(feature('TEAMMEM')&&teamMemPaths!.isTeamMemoryEnabled()) {
  const {info}=await safelyReadMemoryFileAsync(teamMemPaths!.getTeamMemEntrypoint(),'TeamMem')
  if(info&&!files.some(file=>normalizePathForComparison(file.path)===normalizePathForComparison(info.path)))files.push(info)
 }
 return files
}

/** Plain invalidation keeps the original one-shot reason and epoch unchanged. */
export function clearMemoryFileCaches():void {getMemorySession287().clearCurrent()}

/** An eager reset increments the source epoch before invalidating this root. */
export function resetGetMemoryFilesCache(reason:InstructionsLoadReason='session_start'):void {
 getMemorySession287().resetCurrent(reason)
}

export function getLargeMemoryFiles(files: MemoryFileInfo[]): MemoryFileInfo[] {
  return files.filter(f => f.content.length > MAX_MEMORY_CHARACTER_COUNT)
}

/**
 * When tengu_moth_copse is on, the findRelevantMemories prefetch surfaces
 * memory files via attachments, so the MEMORY.md index is no longer injected
 * into the system prompt. Callsites that care about "what's actually in
 * context" (context builder, /context viz) should filter through this.
 */
const instructionFormatter287 = createInstructionFormatter287({
  E8:()=>getMemoryLoader287().indexSuppressed(),
  k:getFeatureValue_CACHED_MAY_BE_STALE,
  jQ:content=>sanitizeOfficialMemoryContent(content),
})

export function filterInjectedMemoryFiles(files:MemoryFileInfo[]):MemoryFileInfo[] {
  const filtered=instructionFormatter287.filterInjectedMemoryFiles(files)
  // Preserve the established TeamMem C gate; the original E8 additionally
  // suppresses AutoMem for memory-store overrides, not that local extension.
  return feature('TEAMMEM')&&getFeatureValue_CACHED_MAY_BE_STALE('tengu_moth_copse',false)
    ? filtered.filter(file=>file.type!=='TeamMem') : filtered
}

export const filterInstructionFiles287=instructionFormatter287.filterInstructions

export const getClaudeMds=(memoryFiles:MemoryFileInfo[],filter?:(type:MemoryType)=>boolean):string=>{
  // Keep the established shared-memory wrapper only where that local extension
  // actually contributes files; normal source kinds execute whole original CPe.
  if(feature('TEAMMEM')&&memoryFiles.some(file=>file.type==='TeamMem'))return formatTeamMemoryInstructions(memoryFiles,filter)
  return instructionFormatter287.formatInstructions(instructionFormatter287.filterInstructions(memoryFiles,filter))
}

const formatTeamMemoryInstructions = (
  memoryFiles: MemoryFileInfo[],
  filter?: (type: MemoryType) => boolean,
): string => {
  const memories: string[] = []
  const skipProjectLevel = getFeatureValue_CACHED_MAY_BE_STALE(
    'tengu_paper_halyard',
    false,
  )

  for (const file of memoryFiles) {
    if (filter && !filter(file.type)) continue
    if (skipProjectLevel && (file.type === 'Project' || file.type === 'Local'))
      continue
    if (file.content) {
      const description =
        file.type === 'Project'
          ? ' (project instructions, checked into the codebase)'
          : file.type === 'Local'
            ? " (user's private project instructions, not checked in)"
            : feature('TEAMMEM') && file.type === 'TeamMem'
              ? ' (shared team memory, synced across the organization)'
              : file.type === 'AutoMem'
                ? " (user's auto-memory, persists across conversations)"
                : " (user's private global instructions for all projects)"

      const content = file.content.trim()
      if (feature('TEAMMEM') && file.type === 'TeamMem') {
        memories.push(
          `Contents of ${file.path}${description}:\n\n<team-memory-content source="shared">\n${content}\n</team-memory-content>`,
        )
      } else {
        memories.push(`Contents of ${file.path}${description}:\n\n${content}`)
      }
    }
  }

  if (memories.length === 0) {
    return ''
  }

  return `${MEMORY_INSTRUCTION_PROMPT}\n\n${memories.join('\n\n')}`
}

/**
 * Gets managed and user conditional rules that match the target path.
 * This is the first phase of nested memory loading.
 *
 * @param targetPath The target file path to match against glob patterns
 * @param processedPaths Set of already processed file paths (will be mutated)
 * @returns Array of MemoryFileInfo objects for matching conditional rules
 */
export async function getManagedAndUserConditionalRules(
  targetPath: string,
  processedPaths: Set<string>,
): Promise<MemoryFileInfo[]> {
  const result: MemoryFileInfo[] = []

  // Process Managed conditional .claude/rules/*.md files
  const managedClaudeRulesDir = getManagedClaudeRulesDir()
  result.push(
    ...(await processConditionedMdRules(
      targetPath,
      managedClaudeRulesDir,
      'Managed',
      processedPaths,
      false,
    )),
  )

  if (isSettingSourceEnabled('userSettings')) {
    // Process User conditional .claude/rules/*.md files
    const userClaudeRulesDir = getUserClaudeRulesDir()
    result.push(
      ...(await processConditionedMdRules(
        targetPath,
        userClaudeRulesDir,
        'User',
        processedPaths,
        true,
      )),
    )
  }

  return result
}

/**
 * Gets memory files for a single nested directory (between CWD and target).
 * Loads CLAUDE.md, unconditional rules, and conditional rules for that directory.
 *
 * @param dir The directory to process
 * @param targetPath The target file path (for conditional rule matching)
 * @param processedPaths Set of already processed file paths (will be mutated)
 * @returns Array of MemoryFileInfo objects
 */
export async function getMemoryFilesForNestedDirectory(
  dir: string,
  targetPath: string,
  processedPaths: Set<string>,
): Promise<MemoryFileInfo[]> {
  const result: MemoryFileInfo[] = []

  // Process project memory files (CLAUDE.md and .claude/CLAUDE.md)
  if (isSettingSourceEnabled('projectSettings')) {
    const projectPath = join(dir, 'CLAUDE.md')
    result.push(
      ...(await processMemoryFile(
        projectPath,
        'Project',
        processedPaths,
        false,
      )),
    )
    const dotClaudePath = join(dir, '.claude', 'CLAUDE.md')
    result.push(
      ...(await processMemoryFile(
        dotClaudePath,
        'Project',
        processedPaths,
        false,
      )),
    )
  }

  // Process local memory file (CLAUDE.local.md)
  if (isSettingSourceEnabled('localSettings')) {
    const localPath = join(dir, 'CLAUDE.local.md')
    result.push(
      ...(await processMemoryFile(localPath, 'Local', processedPaths, false)),
    )
  }

  const rulesDir = join(dir, '.claude', 'rules')

  // Process project unconditional .claude/rules/*.md files, which were not eagerly loaded
  // Use a separate processedPaths set to avoid marking conditional rule files as processed
  const unconditionalProcessedPaths = new Set(processedPaths)
  result.push(
    ...(await processMdRules({
      rulesDir,
      type: 'Project',
      processedPaths: unconditionalProcessedPaths,
      includeExternal: false,
      conditionalRule: false,
    })),
  )

  // Process project conditional .claude/rules/*.md files
  result.push(
    ...(await processConditionedMdRules(
      targetPath,
      rulesDir,
      'Project',
      processedPaths,
      false,
    )),
  )

  // processedPaths must be seeded with unconditional paths for subsequent directories
  for (const path of unconditionalProcessedPaths) {
    processedPaths.add(path)
  }

  return result
}

/**
 * Gets conditional rules for a CWD-level directory (from root up to CWD).
 * Only processes conditional rules since unconditional rules are already loaded eagerly.
 *
 * @param dir The directory to process
 * @param targetPath The target file path (for conditional rule matching)
 * @param processedPaths Set of already processed file paths (will be mutated)
 * @returns Array of MemoryFileInfo objects
 */
export async function getConditionalRulesForCwdLevelDirectory(
  dir: string,
  targetPath: string,
  processedPaths: Set<string>,
): Promise<MemoryFileInfo[]> {
  const rulesDir = join(dir, '.claude', 'rules')
  return processConditionedMdRules(
    targetPath,
    rulesDir,
    'Project',
    processedPaths,
    false,
  )
}

/**
 * Processes all .md files in the .claude/rules/ directory and its subdirectories,
 * filtering to only include files with frontmatter paths that match the target path
 * @param targetPath The file path to match against frontmatter glob patterns
 * @param rulesDir The path to the rules directory
 * @param type Type of memory file (User, Project, Local)
 * @param processedPaths Set of already processed file paths
 * @param includeExternal Whether to include external files
 * @returns Array of MemoryFileInfo objects that match the target path
 */
export async function processConditionedMdRules(
  targetPath: string,
  rulesDir: string,
  type: MemoryType,
  processedPaths: Set<string>,
  includeExternal: boolean,
): Promise<MemoryFileInfo[]> {
  const conditionedRuleMdFiles = await processMdRules({
    rulesDir,
    type,
    processedPaths,
    includeExternal,
    conditionalRule: true,
  })

  // Filter to only include files whose globs patterns match the targetPath
  return conditionedRuleMdFiles.filter(file => {
    if (!file.globs || file.globs.length === 0) {
      return false
    }

    // For Project rules: glob patterns are relative to the directory containing .claude
    // For Managed/User rules: glob patterns are relative to the original CWD
    const baseDir =
      type === 'Project'
        ? dirname(dirname(rulesDir)) // Parent of .claude
        : getOriginalCwd() // Project root for managed/user rules

    const relativePath = isAbsolute(targetPath)
      ? relative(baseDir, targetPath)
      : targetPath
    // ignore() throws on empty strings, paths escaping the base (../),
    // and absolute paths (Windows cross-drive relative() returns absolute).
    // Files outside baseDir can't match baseDir-relative globs anyway.
    if (
      !relativePath ||
      relativePath.startsWith('..') ||
      isAbsolute(relativePath)
    ) {
      return false
    }
    return ignore().add(file.globs).ignores(relativePath)
  })
}

export type ExternalClaudeMdInclude = {
  path: string
  parent: string
}

export function getExternalClaudeMdIncludes(
  files: MemoryFileInfo[],
): ExternalClaudeMdInclude[] {
  const externals: ExternalClaudeMdInclude[] = []
  for (const file of files) {
    if (file.type !== 'User' && file.parent && !pathInOriginalCwd(file.path)) {
      externals.push({ path: file.path, parent: file.parent })
    }
  }
  return externals
}

export function hasExternalClaudeMdIncludes(files: MemoryFileInfo[]): boolean {
  return getExternalClaudeMdIncludes(files).length > 0
}

export async function shouldShowClaudeMdExternalIncludesWarning(): Promise<boolean> {
  const config = getCurrentProjectConfig()
  if (
    config.hasClaudeMdExternalIncludesApproved ||
    config.hasClaudeMdExternalIncludesWarningShown
  ) {
    return false
  }

  return hasExternalClaudeMdIncludes(await getMemoryFiles(true))
}

/**
 * Check if a file path is a memory file (CLAUDE.md, CLAUDE.local.md, or .claude/rules/*.md)
 */
export function isMemoryFilePath(filePath: string): boolean {
  const name = basename(filePath)

  // CLAUDE.md or CLAUDE.local.md anywhere
  if (name === 'CLAUDE.md' || name === 'CLAUDE.local.md') {
    return true
  }

  // .md files in .claude/rules/ directories
  if (
    name.endsWith('.md') &&
    filePath.includes(`${sep}.claude${sep}rules${sep}`)
  ) {
    return true
  }

  return false
}

/**
 * Get all memory file paths from both standard discovery and readFileState.
 * Combines:
 * - getMemoryFiles() paths (CWD upward to root)
 * - readFileState paths matching memory patterns (includes child directories)
 */
export function getAllMemoryFilePaths(
  files: MemoryFileInfo[],
  readFileState: FileStateCache,
): string[] {
  const paths = new Set<string>()
  for (const file of files) {
    if (file.content.trim().length > 0) {
      paths.add(file.path)
    }
  }

  // Add memory files from readFileState (includes child directories)
  for (const filePath of cacheKeys(readFileState)) {
    if (isMemoryFilePath(filePath)) {
      paths.add(filePath)
    }
  }

  return Array.from(paths)
}
