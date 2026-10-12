import { lstatSync, realpathSync } from 'node:fs'
import { basename, dirname, isAbsolute, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'shell-quote'
import type { SandboxRuntimeConfig } from '@anthropic-ai/sandbox-runtime'
import { containsGlobChars, expandGlobPattern, normalizePathForSandbox, removeTrailingGlobSuffix } from '@anthropic-ai/sandbox-runtime/dist/sandbox/sandbox-utils.js'
import type { ISandboxManager } from '@anthropic-ai/sandbox-runtime/dist/sandbox/sandbox-manager.js'

type NetworkPorts287 = Pick<ISandboxManager,
  'getProxyPort' | 'getSocksProxyPort' | 'getLinuxHttpSocketPath' |
  'getLinuxSocksSocketPath' | 'waitForNetworkInitialization'>

/** Fixed confinement uses the installed package's filter, never a project or
 * global-npm substitute. The upstream optional warning is not a fallback here. */
export async function requiredLinuxSeccomp287(arch = process.arch) {
  if (arch !== 'x64' && arch !== 'arm64') throw new Error('Required Linux seccomp architecture is unsupported')
  const base = new URL(`../vendor/seccomp/${arch}/`, import.meta.resolve('@anthropic-ai/sandbox-runtime'))
  const bpfPath = fileURLToPath(new URL('unix-block.bpf', base))
  const applyPath = fileURLToPath(new URL('apply-seccomp', base))
  for (const path of [bpfPath, applyPath]) {
    const file = lstatSync(path)
    if (!file.isFile() || file.isSymbolicLink() || file.size === 0 ||
        (path === applyPath && !(file.mode & 0o111))) throw new Error('Required Linux seccomp assets are unavailable')
  }
  const {getPreGeneratedBpfPath, getApplySeccompBinaryPath} = await import('@anthropic-ai/sandbox-runtime/dist/sandbox/generate-seccomp-filter.js')
  // Bind the upstream lookups before wrapping; a missing file later makes
  // execution fail, rather than silently selecting another filter or no filter.
  if (getPreGeneratedBpfPath(bpfPath) !== bpfPath || getApplySeccompBinaryPath(applyPath) !== applyPath) {
    throw new Error('Required Linux seccomp assets resolved outside the installed package')
  }
  return {bpfPath, applyPath}
}

/** Local C: call the original platform constructors with the fixed effective
 * filesystem policy. The manager's generic wrap adds global /tmp/claude and
 * HOME write paths; those are not additional workspace authority. Keep its
 * existing proxy lifecycle, platform profiles and cleanup, not a new launcher.
 */
export async function wrapBoundSandboxCommand287(
  command: string,
  binShell: string | undefined,
  config: SandboxRuntimeConfig,
  network: NetworkPorts287,
  abortSignal?: AbortSignal,
  trustedRuntimeFiles: readonly string[] = [],
  trustedGeneratedDirectories: readonly string[] = [],
): Promise<string> {
  if (abortSignal?.aborted) throw abortSignal.reason ?? new Error('Command cancelled')
  if (!await network.waitForNetworkInitialization()) {
    throw new Error('Required workspace sandbox network was not initialized')
  }
  if (abortSignal?.aborted) throw abortSignal.reason ?? new Error('Command cancelled')
  // Preserve the mature manager's path-pattern normalization; only its
  // implicit global write roots are deliberately omitted for the fixed bound.
  const stripWriteGlobs = (paths: string[]) => paths
    .map(removeTrailingGlobSuffix)
    .filter(path => process.platform !== 'linux' || !containsGlobChars(path))
  const expandReadGlobs = (paths: string[]) => paths.flatMap(path => {
    const stripped = removeTrailingGlobSuffix(path)
    return process.platform === 'linux' && containsGlobChars(stripped)
      ? expandGlobPattern(path) : [stripped]
  })
  // Executable source dependencies, supplied only by the trusted helper caller.
  // Grant exact regular files, not their parent directories or import search roots.
  const runtimeFiles = [...new Set(trustedRuntimeFiles.flatMap(file => {
    if (!isAbsolute(file) || containsGlobChars(file)) {
      throw new Error('Invalid fixed file-I/O runtime file')
    }
    const canonical = realpathSync.native(file)
    if (!lstatSync(canonical).isFile()) throw new Error('Invalid fixed file-I/O runtime file')
    // dyld checks both the published Homebrew alias and its resolved leaf.
    // Both are exact files; their ancestors get metadata, not subtree grants.
    return [file, join(realpathSync.native(dirname(file)), basename(file)), canonical]
  }))]
  const generatedDirectories = trustedGeneratedDirectories.map(directory => {
    if (!isAbsolute(directory) || containsGlobChars(directory) ||
        !lstatSync(directory).isDirectory() || realpathSync.native(directory) !== directory) {
      throw new Error('Invalid fixed tool-result directory')
    }
    return directory
  })
  const readConfig = {
    denyOnly: expandReadGlobs(config.filesystem.denyRead),
    allowWithinDeny: [...expandReadGlobs(config.filesystem.allowRead ?? []), ...runtimeFiles, ...generatedDirectories],
  }
  const writeConfig = {
    allowOnly: [...stripWriteGlobs(config.filesystem.allowWrite), ...generatedDirectories],
    denyWithinAllow: stripWriteGlobs(config.filesystem.denyWrite),
  }
  if (process.platform === 'darwin') {
    const { wrapCommandWithSandboxMacOS } = await import('@anthropic-ai/sandbox-runtime/dist/sandbox/macos-sandbox-utils.js')
    const wrapped = wrapCommandWithSandboxMacOS({
      command, binShell, readConfig, writeConfig, needsNetworkRestriction: true,
      httpProxyPort: network.getProxyPort(), socksProxyPort: network.getSocksProxyPort(),
      allowUnixSockets: [], allowAllUnixSockets: false, allowLocalBinding: false,
      allowPty: config.allowPty, allowGitConfig: config.filesystem.allowGitConfig,
      ignoreViolations: config.ignoreViolations, enableWeakerNetworkIsolation: false,
    })
    const rootReadDeny = readConfig.denyOnly.some(path => normalizePathForSandbox(path) === '/')
    if (!runtimeFiles.length && !rootReadDeny) return wrapped
    // Bun opens ancestor directory descriptors during module resolution. A
    // literal directory read grants names/metadata, NOT descendant contents.
    // Keep the upstream profile and quote implementation; no parent subpaths.
    const args = parse(wrapped).map(arg => {
      if (typeof arg === 'string') return arg
      // Upstream NO_PROXY contains *.local as a literal env value.
      if ('op' in arg && arg.op === 'glob' && 'pattern' in arg) return arg.pattern
      throw new Error('Unexpected file-I/O sandbox wrapper')
    })
    const profileAt = args.indexOf('-p') + 1
    if (profileAt === 0 || !args.includes('sandbox-exec') || !args[profileAt]?.startsWith('(version 1)')) {
      throw new Error('Unexpected file-I/O sandbox profile')
    }
    if (rootReadDeny && writeConfig.allowOnly.length) {
      // Upstream protects every denyRead path from movement. Its root rule
      // also blocks atomic rename/unlink inside the fixed write roots. Narrow
      // only that read-section blanket; concrete read/write denies stay intact.
      const profile = args[profileAt]!, readAt = profile.indexOf('\n; File read\n'), writeAt = profile.indexOf('\n; File write\n')
      if (readAt < 0 || writeAt <= readAt) throw new Error('Unexpected sandbox read/write sections')
      const writable = [...new Set(writeConfig.allowOnly.map(normalizePathForSandbox))]
      const exclusions = writable.map(path => `\n    (require-not (subpath ${JSON.stringify(path)}))`).join('')
      const readRules = profile.slice(readAt, writeAt).replace(
        /\(deny file-write-unlink\n  \(subpath "\/"\)\n  (\(with message "[^"\n]*"\))\)/g,
        (_rule, message: string) => `(deny file-write-unlink\n  (require-all (subpath "/")${exclusions})\n  ${message})`,
      )
      args[profileAt] = profile.slice(0, readAt) + readRules + profile.slice(writeAt)
    }
    const directories = new Set<string>()
    for (const file of runtimeFiles) for (let dir = dirname(file); dir !== '/'; dir = dirname(dir)) directories.add(dir)
    args[profileAt] += [...directories].map(dir => `\n(allow file-read-metadata file-read-data (literal ${JSON.stringify(dir)}))`).join('')
    // Keep the caller's command byte-for-byte. Re-quoting a nested command
    // with shell-quote's double-quote arm preserves extra backslashes before
    // `!` in POSIX sh (e.g. rg's exclusion globs when a pattern contains ').
    args[args.length - 1] = command
    return args.map(arg => `'${arg.replaceAll("'", "'\"'\"'")}'`).join(' ')
  }
  if (process.platform === 'linux') {
    const seccompConfig = await requiredLinuxSeccomp287()
    if (abortSignal?.aborted) throw abortSignal.reason ?? new Error('Command cancelled')
    const { wrapCommandWithSandboxLinux } = await import('@anthropic-ai/sandbox-runtime/dist/sandbox/linux-sandbox-utils.js')
    return wrapCommandWithSandboxLinux({
      command, binShell,
      readConfig: {...readConfig, allowWithinDeny: [...readConfig.allowWithinDeny, seccompConfig.bpfPath, seccompConfig.applyPath]},
      writeConfig, needsNetworkRestriction: true,
      httpSocketPath: network.getLinuxHttpSocketPath(), socksSocketPath: network.getLinuxSocksSocketPath(),
      httpProxyPort: network.getProxyPort(), socksProxyPort: network.getSocksProxyPort(),
      enableWeakerNestedSandbox: false, allowAllUnixSockets: false,
      ripgrepConfig: config.ripgrep, mandatoryDenySearchDepth: config.mandatoryDenySearchDepth,
      allowGitConfig: config.filesystem.allowGitConfig, seccompConfig, abortSignal,
    })
  }
  throw new Error('Required workspace sandbox has no supported platform backend')
}
