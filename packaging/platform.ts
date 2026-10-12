export const TARGETS = ['darwin-x64', 'darwin-arm64', 'linux-x64', 'linux-arm64', 'win32-x64', 'win32-arm64'] as const
export type Target = typeof TARGETS[number]
// Source releases use the latest publicly published Bun. The Bun build
// embedded in the official native package is a comparison baseline, not an
// extractable runtime dependency.
export const OFFICIAL_BUN_VERSION = '1.4.3'
export const MIN_BUN = OFFICIAL_BUN_VERSION

export function targetFor(os: string, arch: string, glibc?: string): Target {
  const cpu = arch === 'amd64' || arch === 'x86_64' ? 'x64' : arch === 'aarch64' ? 'arm64' : arch
  const platform = os === 'Darwin' ? 'darwin' : os === 'Linux' ? 'linux' : os === 'Windows_NT' || os === 'Windows' ? 'win32' : os
  const target = `${platform}-${cpu}`
  if (!TARGETS.includes(target as Target)) throw Error(`Unsupported platform: ${target}`)
  const libcVersion = glibc && /^\d+\.\d+(?:\.\d+)?$/.test(glibc)
    ? (glibc.split('.').length === 2 ? `${glibc}.0` : glibc) : undefined
  if (platform === 'linux' && (!libcVersion || Bun.semver.order(libcVersion, '2.26.0') < 0)) {
    throw Error('Linux source releases require glibc >= 2.26; musl is not supported')
  }
  return target as Target
}
export function hostTarget(): Target {
  const { header } = process.report.getReport() as { header: { glibcVersionRuntime?: string } }
  return targetFor(process.platform, process.arch, header?.glibcVersionRuntime)
}
export function checkBun(version = Bun.version): void {
  if (version !== OFFICIAL_BUN_VERSION) {
    throw Error(`Bun ${OFFICIAL_BUN_VERSION} is required for the source release; got ${version}`)
  }
}
export function nativePackages(target: Target) {
  const packages = {
    [`@vscode/ripgrep-${target}`]: '1.18.0',
    [`@img/sharp-${target}`]: '0.34.5',
  }
  // sharp publishes a Windows native package without a separate libvips
  // optional package; requiring one would invent a package absent from bun.lock.
  return target.startsWith('win32-') ? packages : { ...packages, [`@img/sharp-libvips-${target}`]: '1.2.4' }
}
/** Official Mac computer-use payloads are universal Mach-O today. Keep a
 * target-specific path/provenance and never substitute one CPU's extraction
 * when its matching payload is absent. Linux/Windows use independent hosts. */
export function desktopNativeFiles(target: Target): string[] {
  if (!target.startsWith('darwin-')) return []
  return ['computer-use-swift.node', 'computer-use-input.node']
    .map(name => `src/vendor/official-desktop/native/${target}/${name}`)
}
export function dependencyArgs(target: Target, offline: boolean, cache?: string): string[] {
  const [os, cpu] = target.split('-')
  return ['install', '--frozen-lockfile', '--production', '--ignore-scripts', '--backend=copyfile',
    '--registry=https://registry.npmjs.org',
    `--os=${os}`, `--cpu=${cpu}`, ...(offline ? ['--offline'] : []), ...(cache ? [`--cache-dir=${cache}`] : [])]
}
