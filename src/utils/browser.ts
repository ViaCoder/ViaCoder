import { getBrowserOpener287 } from './officialBrowser287/runtime.js'
import { execFileNoThrow } from './execFileNoThrow.js'

/**
 * Open a file or folder path using the system's default handler.
 * Uses `open` on macOS, `explorer` on Windows, `xdg-open` on Linux.
 */
export async function openPath(path: string): Promise<boolean> {
  try {
    const platform = process.platform
    if (platform === 'win32') {
      const { code } = await execFileNoThrow('explorer', [path])
      return code === 0
    }
    const command = platform === 'darwin' ? 'open' : 'xdg-open'
    const { code } = await execFileNoThrow(command, [path])
    return code === 0
  } catch (_) {
    return false
  }
}

export async function openBrowser(url: string): Promise<boolean> {
  return getBrowserOpener287().open(url)
}
