export interface WindowsShellHost287 {
  getPlatform(): string
  getOSName(): string
  /** Nullable result of the source-derived Git Bash discovery closure; discovery errors are not converted to null. */
  getGitBashPath(): string | null
  getPowerShellToolSetting(): boolean | undefined
  getFeatureValue(name: string, fallback: boolean): unknown
  getShell(): string | undefined
  getCache(): { shellDescription?: string; gitBashPath?: string | null }
}

export interface OfficialWindowsShell287 {
  Ta(): boolean
  Yb(): unknown
  shellDescription(): string
}

export function createOfficialWindowsShell287(host: WindowsShellHost287): OfficialWindowsShell287
