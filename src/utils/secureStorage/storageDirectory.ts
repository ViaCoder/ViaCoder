import { homedir } from 'os'
import { join } from 'path'
import { getClaudeConfigHomeDir } from '../envUtils.js'

// Official 2.1.283 Bw, chunk-n8y6ywk9: an explicit empty override selects
// the default secure store even when the general config directory differs.
export function getSecureStorageConfigHomeDir(): string {
  const directory = process.env.CLAUDE_SECURESTORAGE_CONFIG_DIR
  if (directory !== undefined) return (directory || join(homedir(), '.claude')).normalize('NFC')
  return getClaudeConfigHomeDir()
}
