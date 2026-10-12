export interface WindowsGitBashCache287 {
  gitBashPath?: string | null
  shellDescription?: string
}

export interface WindowsGitBashDiscoveryPorts287 {
  getOverride(): string | undefined
  existsSync(path: string): boolean
  /** The original `uor("git")` boundary; callers supply the source-equivalent executable resolver. */
  findExecutable(name: string): string | null | undefined
  warn(message: string, metadata: {level: 'warn'}): void
}

export function createWindowsGitBashDiscovery287(ports: WindowsGitBashDiscoveryPorts287): () => string | null
export function createCachedWindowsGitBashPath287(cache: WindowsGitBashCache287, discover: () => string | null): () => string | null
