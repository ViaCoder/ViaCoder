import type { SandboxRuntimeConfig } from '@anthropic-ai/sandbox-runtime'
import { containsGlobChars } from '@anthropic-ai/sandbox-runtime/dist/sandbox/sandbox-utils.js'
import { homedir } from 'node:os'
import { isAbsolute, relative, resolve, sep } from 'node:path'
import { canonicalPathPreflight287, type WorkspacePolicy287 } from './workspacePolicy287.js'

function inside(root: string, path: string): boolean {
  const rest = relative(root, path)
  return rest === '' || (!isAbsolute(rest) && rest !== '..' && !rest.startsWith(`..${sep}`))
}

/** C: narrow the existing runtime config; no copies, scanning or new executor. */
export function constrainSandboxConfig287(
  config: SandboxRuntimeConfig,
  policy: WorkspacePolicy287,
  temporaryDirectory: string,
): SandboxRuntimeConfig {
  policy.assertRootIdentity()
  const root = policy.root.canonicalPath
  const temporary = canonicalPathPreflight287(resolve(temporaryDirectory)).canonical
  if (temporary === '/' || temporary === homedir() || inside(temporary, root)) {
    throw new Error('Invalid sandbox temporary directory')
  }
  // OS/runtime read paths, not additional user-data working directories. Do not
  // grant arbitrary permission rules/add-dir/worktree paths as new authority.
  // ASRT allowRead overrides denyRead and grants subtrees. /usr would therefore
  // expose /usr/local/etc; /System would also expose /System/Volumes/Data.
  // Keep explicit binary/library roots and runtime data, not either ancestor.
  const systemReadPaths = [
    '/bin', '/sbin', '/usr/bin', '/usr/sbin', '/usr/lib', '/usr/libexec', '/dev',
    '/usr/share/locale', '/usr/share/nls', '/usr/share/icu', '/usr/share/terminfo', '/usr/share/zoneinfo',
  ]
  const runtimeReadPaths = process.platform === 'darwin'
    ? [...systemReadPaths,
      // Apple's system.sb/bsd.sb runtime contract; dyld-support.sb names the
      // immutable Cryptex graft points (including snapshot/preboot aliases).
      '/System/Library', '/Library/Apple',
      '/System/Cryptexes/OS', '/System/Cryptexes/App',
      '/System/Volumes/Preboot/Cryptexes/OS', '/System/Volumes/Preboot/Cryptexes/Incoming/OS',
      '/System/Volumes/Preboot/Cryptexes/App/System',
      '/private/var/db/dyld', '/private/var/select/sh', '/private/var/db/timezone',
      '/private/etc/localtime', '/private/etc/ssl/cert.pem', '/private/etc/ssl/certs',
    ]
    : [...systemReadPaths,
      // Merged-/usr and multiarch loader locations; certificates may resolve
      // from /etc/ssl/certs into Debian's share tree or RHEL's extracted bundle.
      '/lib', '/lib64', '/lib32', '/libx32', '/usr/lib64', '/usr/lib32', '/usr/libx32',
      '/etc/ld.so.cache', '/etc/ld.so.conf', '/etc/resolv.conf', '/etc/hosts', '/etc/nsswitch.conf',
      '/etc/localtime', '/etc/ssl/cert.pem', '/etc/ssl/certs', '/usr/share/ca-certificates',
      '/etc/ca-certificates/extracted', '/etc/pki/ca-trust/extracted', '/etc/pki/tls/cert.pem', '/etc/pki/tls/certs',
    ]
  // The running interpreter itself can live outside the OS runtime directories.
  // Exact file authorization, never its entire user HOME/bin parent.
  // Other non-system tools/dependencies require the existing trusted exact-file
  // caller grants; missing grants stay denied, never expand to /usr/local/HOME.
  runtimeReadPaths.push(process.execPath)
  // These are literal authority roots, not permission-rule patterns. The
  // mature backend treats glob characters as patterns; never silently widen
  // a workspace with a literal '['/'*' in its name to sibling directories.
  if ([root, temporary, ...runtimeReadPaths].some(containsGlobChars)) {
    throw new Error('Workspace sandbox backend requires literal paths without glob characters')
  }
  const defaultUserWrites = [resolve(homedir(), '.npm/_logs'), resolve(homedir(), '.claude/debug')]
  return {
    ...config,
    filesystem: {
      denyRead: ['/', ...config.filesystem.denyRead],
      allowRead: [...new Set([root, temporary, ...runtimeReadPaths])],
      allowWrite: [...new Set([root, temporary])],
      denyWrite: [...new Set([...config.filesystem.denyWrite,
        ...defaultUserWrites.filter(path => !inside(root, path) && !inside(temporary, path))])],
    },
    // The original runtime proxies model-approved network access; neither
    // project settings nor a command may unlock host sockets or weaker nesting.
    network: {...config.network, allowUnixSockets: [], allowAllUnixSockets: false, allowLocalBinding: false},
    enableWeakerNestedSandbox: false,
    enableWeakerNetworkIsolation: false,
  }
}
