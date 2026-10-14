import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// Offline tests must never discover the developer's real config or OAuth
// environment. Apply isolation before any application module is imported.
const home = mkdtempSync(join(tmpdir(), 'cc-tests-'))
for (const key of Object.keys(process.env)) {
  if (key.startsWith('ANTHROPIC_') || key.startsWith('CLAUDE_CODE_') ||
      key.startsWith('AWS_') || key.startsWith('GOOGLE_')) delete process.env[key]
}
Object.assign(process.env, {
  HOME: home, CLAUDE_CONFIG_DIR: join(home, 'config'),
  ANTHROPIC_BASE_URL: 'http://127.0.0.1:9',
  ANTHROPIC_API_KEY: 'offline-fixture-not-a-real-key',
  DISABLE_TELEMETRY: '1', CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: '1',
})
process.on('exit', () => rmSync(home, {recursive: true, force: true}))
