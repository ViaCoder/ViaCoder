import {execFileSync} from 'node:child_process'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const [source286 = path.resolve(root, '../.work/official-modules-2.1.286/darwin-arm64'),
  source284 = path.resolve(root, '../.work/official-modules-2.1.284/darwin-arm64')] = process.argv.slice(2)
const generator = path.resolve(root, 'scripts/official/vendor-low-priority-286.mjs')
execFileSync(process.execPath, [generator, source286, source284, '--recover'], {stdio: 'inherit'})
