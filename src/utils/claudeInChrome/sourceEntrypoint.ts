import { fileURLToPath } from 'node:url'

/** Source installs need an explicit preload even when Chrome launches from /.
 * The native executable branch continues to use its original entrypoint.
 */
export function chromeSourceArgs(flag: '--chrome-native-host' | '--claude-in-chrome-mcp'): string[] {
  return [
    '--preload', fileURLToPath(new URL('../../../preload.ts', import.meta.url)),
    fileURLToPath(new URL('../../entrypoints/cli.tsx', import.meta.url)), flag,
  ]
}
