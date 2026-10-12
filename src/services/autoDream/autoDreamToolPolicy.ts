import { isAbsolute, normalize, sep } from 'node:path'
import type { ToolUseContext } from '../../Tool.js'
import type { CanUseToolFn } from '../../hooks/useCanUseTool.js'
import { BASH_TOOL_NAME } from '../../tools/BashTool/toolName.js'
import { POWERSHELL_TOOL_NAME } from '../../tools/PowerShellTool/toolName.js'
import { FILE_EDIT_TOOL_NAME } from '../../tools/FileEditTool/constants.js'
import {
  createDreamPolicySource287,
  type DreamReadPermissionPorts287,
} from './officialDreamFeedback287/native.js'

export type { DreamReadPermissionPorts287 } from './officialDreamFeedback287/native.js'

// Boundaries are source-owned. A root is handed to nK with its original trailing
// separator convention; normalize does not create a second Memory path owner.
export function dreamMemoryRoot287(root: string): string {
  const path = normalize(root)
  return path.endsWith(sep) ? path : path + sep
}
function missingReadPort(name: string): never {
  throw new Error(`Dream PHn requires the existing permission owner's ${name} port`)
}
export function getDreamReadPathPorts287(): Pick<DreamReadPermissionPorts287, 'No' | 'VUt'> {
  return {
    No(path) {
      const { getPathsForPermissionCheck } = require('../../utils/fsOperations.js') as typeof import('../../utils/fsOperations.js')
      return getPathsForPermissionCheck(path)
    },
    VUt() {
      const { getMemoryReadPolicy287 } = require('../../constants/systemComposerMemory287.js') as typeof import('../../constants/systemComposerMemory287.js')
      return getMemoryReadPolicy287().readFenceDirectoryBlocked287()
    },
  }
}
function source(readPorts?: DreamReadPermissionPorts287, bashAvailable?: () => boolean) {
  // Real getters, evaluated at use time rather than importing Write -> Read ->
  // model -> REPL constants during Dream module preinitialization.
  const { FILE_WRITE_TOOL_NAME } = require('../../tools/FileWriteTool/prompt.js') as typeof import('../../tools/FileWriteTool/prompt.js')
  const readPaths = getDreamReadPathPorts287()
  return createDreamPolicySource287({
    o0: isAbsolute, Na: normalize, Gr: sep, Ce: sep,
    kl(path) {
      const { filesystemPathRuntime287 } = require('../../utils/filesystemPathRuntime287.js') as typeof import('../../utils/filesystemPathRuntime287.js')
      return filesystemPathRuntime287.isNetworkReference(path)
    },
    async CG(command) {
      const { parseForSecurity } = await import('../../utils/bash/ast.js')
      return parseForSecurity(command)
    },
    N_t() {
      const { getAutoMemPath } = require('../../memdir/paths.js') as typeof import('../../memdir/paths.js')
      return getAutoMemPath()
    },
    oz() {
      const { getExecutionSession287 } = require('../context/execution287.js') as typeof import('../context/execution287.js')
      const flags = getExecutionSession287().sessionFlags
      return flags.memoryToggledOff() || flags.autoMemoryOffThisSession()
    },
    JQe: 'Memory is paused for this session; only the user can turn it back on.',
    C(_tool, reason) {
      return { behavior: 'deny', message: reason, decisionReason: { type: 'other', reason } }
    },
    // Lazy complete original O8n/BC from the shared public permission owner.
    ic: (require('../../tools/REPLTool/constants.js') as typeof import('../../tools/REPLTool/constants.js')).REPL_TOOL_NAME,
    dt: (require('../../tools/FileReadTool/prompt.js') as typeof import('../../tools/FileReadTool/prompt.js')).FILE_READ_TOOL_NAME,
    Jr: (require('../../tools/GrepTool/prompt.js') as typeof import('../../tools/GrepTool/prompt.js')).GREP_TOOL_NAME,
    co: (require('../../tools/GlobTool/prompt.js') as typeof import('../../tools/GlobTool/prompt.js')).GLOB_TOOL_NAME,
    dI: 'Reads outside the working directories are blocked (permissions.blockReadsOutsideWorkingDirectories). Add the directory with /add-dir, or remove that setting.',
    Ue: BASH_TOOL_NAME, wt: POWERSHELL_TOOL_NAME,
    Ot: FILE_EDIT_TOOL_NAME, Sn: FILE_WRITE_TOOL_NAME,
    $a() {
      if (process.platform !== 'win32') return true
      if (!bashAvailable) return missingReadPort('Windows Bash availability ($a/vK)')
      return bashAvailable()
    },
    O8n: readPorts?.O8n ?? ((...args) => (require('../../utils/permissions/read.js') as typeof import('../../utils/permissions/read.js')).checkReadDefense287(...args)),
    BC: readPorts?.BC ?? ((...args) => (require('../../utils/permissions/read.js') as typeof import('../../utils/permissions/read.js')).checkReadPermission287(...args)),
    No: readPorts?.No ?? readPaths.No,
    VUt: readPorts?.VUt ?? readPaths.VUt,
  })
}

export function isDreamMemoryMarkdownPath(candidate: string, memoryRoot: string): boolean {
  return source().Grt(candidate, dreamMemoryRoot287(memoryRoot))
}

export async function isAllowedDreamMarkdownDelete(command: string, memoryRoot: string): Promise<boolean> {
  const raw = source()
  const root = dreamMemoryRoot287(memoryRoot)
  // Select the parser by command family here; the actual tool callback uses
  // PHn's original Ue/wt dispatch (a PowerShell rm alias is not Bash rm).
  return /^\s*rm\b/.test(command)
    ? (await raw.Ze(command, root)) !== undefined
    : raw.Qe(command, root) !== undefined
}

export function createAutoDreamCanUseTool(
  memoryRoot: string,
  _sharedPolicy: CanUseToolFn | undefined,
  onWriteAllowed?: (path: string, toolUseID: string) => void,
  readPorts?: DreamReadPermissionPorts287,
): CanUseToolFn {
  let toolRegistry: ToolUseContext['options']['tools'] | undefined
  const raw = source(readPorts, () => {
    if (!toolRegistry) return missingReadPort('caller tool registry')
    return toolRegistry.some(tool => tool.name === BASH_TOOL_NAME)
  })
  const policy = raw.PHn(dreamMemoryRoot287(memoryRoot), undefined, { fork: 'dream', onWriteAllowed })
  return async (tool, input, context, assistant, toolUseID, forceDecision) => {
    toolRegistry = context.options?.tools
    return policy(tool, input, context, assistant, toolUseID, forceDecision)
  }
}

