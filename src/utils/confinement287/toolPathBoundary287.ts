import { statSync } from 'node:fs'
import type { Tool } from '../../Tool.js'
import { getExecutionWorkspaceConfinement287, requireExecutionWorkspaceConfinement287 } from '../../services/context/execution287.js'
import { getCwd } from '../cwd.js'
import { expandPath } from '../path.js'
import { ConfinementPolicyError287 } from './confinementError287.js'

/** Local C287: call-boundary preflight, NOT OS isolation or a file-tool registry.
 * Registered names/inputs: Read/Write/Edit.file_path, NotebookEdit.notebook_path,
 * Glob.pattern + optional path, Grep.optional path. MultiEdit/LS are not in the
 * current production catalog (directory listing is Bash); do not invent ABIs.
 * Xe/expandPath uses getCwd(), including the existing async cwd override, not
 * process.cwd() or a newly derived authority. Glob's original getPath also
 * handles absolute pattern bases, which can override its explicit path.
 * No tree scan/copy. Recursive searches, hardlinks created after the check and
 * path replacement between this check and original IO still require OS isolation.
 */
export function assertFileToolPathBoundary287(
  tool: Pick<Tool, 'name' | 'getPath'>,
  input: unknown,
): void {
  let field: 'file_path' | 'notebook_path' | 'path'
  let access: 'read' | 'write'
  switch (tool.name) {
    case 'Read': field = 'file_path'; access = 'read'; break
    case 'Write':
    case 'Edit': field = 'file_path'; access = 'write'; break
    case 'NotebookEdit': field = 'notebook_path'; access = 'write'; break
    case 'Glob':
    case 'Grep': field = 'path'; access = 'read'; break
    default: return // Bash, MCP and other tools belong to their actual owners.
  }
  const policy = requireExecutionWorkspaceConfinement287()
  if (!input || typeof input !== 'object') invalid()
  const value = Reflect.get(input, field)
  if (field !== 'path' && typeof value !== 'string' ||
      value !== undefined && typeof value !== 'string') invalid()
  // Preserve the owner's rejection of raw traversal before Xe normalizes it.
  // Tilde/trim/Windows conversion are delegated to the SAME production Xe.
  const checkRaw = (path: string) => {
    if (path.includes('\0') || path.trim().split(process.platform === 'win32' ? /[\\/]/ : /\//).includes('..')) invalid()
  }
  if (typeof value === 'string') checkRaw(value)
  if (tool.name === 'Glob') {
    const pattern = Reflect.get(input, 'pattern')
    if (typeof pattern !== 'string') invalid()
    checkRaw(pattern)
  }
  const cwd = getCwd()
  policy.preflightCwd(cwd) // An async override cannot enlarge the fixed root.
  let path: string
  if (field === 'path') {
    // Use the registered original path selector, not guessed glob fields.
    if (!tool.getPath) invalid()
    path = tool.getPath(input as Record<string, unknown>)
    if (typeof path !== 'string') invalid()
    path = expandPath(path, cwd)
  } else {
    path = expandPath(value as string, cwd)
  }
  const candidate = policy.preflightPath(path, access, cwd)
  if (candidate.exists) {
    const metadata = statSync(candidate.canonicalCandidate)
    // A pathname beneath root can still alias an external regular inode.
    // Reject multiply-linked files without trying to inventory the filesystem.
    if (metadata.isFile() && metadata.nlink > 1 ||
        !metadata.isFile() && !metadata.isDirectory()) {
      throw new ConfinementPolicyError287('PATH_OUTSIDE_WORKSPACE')
    }
  }
}

function invalid(): never {
  throw new ConfinementPolicyError287('INVALID_WORKSPACE_POLICY')
}

/** C mandatory backend admission. Registered mutation adapters use the private
 * scoped I/O transport; only the actual mature OS backend can admit execution.
 * No setting/model-provided success boolean or unconfined fallback exists.
 * Windows remains stopped until it has an accepted kernel execution backend.
 */
export async function assertDirectFileMutationCapability287(tool: Pick<Tool, 'name'>): Promise<void> {
  if (tool.name !== 'Write' && tool.name !== 'Edit' && tool.name !== 'NotebookEdit') return
  const policy = getExecutionWorkspaceConfinement287()
  if (!policy) return // Preserve non-fixed-policy behavior; never synthesize authority.
  policy.assertRootIdentity()
  if (process.platform !== 'darwin' && process.platform !== 'linux') throw new ConfinementPolicyError287('DIRECT_MUTATION_KERNEL_BACKEND_UNAVAILABLE')
  const {SandboxManager} = await import('../sandbox/sandbox-adapter.js')
  await SandboxManager.initialize()
  if (!SandboxManager.isSandboxingEnabled()) throw new ConfinementPolicyError287('DIRECT_MUTATION_KERNEL_BACKEND_UNAVAILABLE')
}
