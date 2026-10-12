import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { checkBun } from './platform.js'
import { createSource, hash, verifySource } from './source.js'
import { installSource, rollback } from './installer.js'
import { run, verifyInstalled } from './verify.js'
import { localFacts, preflightArgs } from './preflight.js'
import { createRemoteLifecycle } from './maintenance/lifecycle.js'

const usage = `Source+Bun release (not a standalone native executable)
  cc-install pack SOURCE OUTPUT_DIR
  cc-install inspect ARTIFACT_DIR
  cc-install delivery ARTIFACT_DIR RECORDS_DIR OUTPUT_DIR METADATA_JSON
  cc-install verify INSTALLED_DIR
  cc-install probe
  cc-install preflight --target USER@HOST [--facts INVENTORY.json]
  cc-install install ARTIFACT_DIR [--prefix DIR] [--bin-dir DIR] [--offline|--online] [--cache-dir DIR] [--remote-lifecycle]
  cc-install rollback [--prefix DIR] [--bin-dir DIR]
Defaults: ~/.local/share/cc, ~/.local/bin/viacoder. Install is OFFLINE unless --online is explicit.
Only use source artifacts from a trusted producer; SHA256 detects corruption, not publisher identity.`
async function main(args: string[]) {
  if (!args.length || args[0] === '--help') { console.log(usage); return }
  checkBun()
  const command = args.shift()
  if (command === 'probe') {
    if (args.length) throw Error('Probe accepts no options; it reports only local platform/runtime facts.')
    console.log(JSON.stringify(localFacts(), null, 2)); return
  }
  if (command === 'preflight') {
    const result = preflightArgs(args)
    console.log(JSON.stringify(result, null, 2))
    if (result.status === 'blocked') process.exitCode = 2
    return
  }
  if (command === 'pack') {
    if (args.length !== 2) throw Error(usage)
    const root = createSource(args[0]!, args[1]!)
    const archive = `${root}.tar.gz`
    if (existsSync(archive)) throw Error(`Archive already exists: ${archive}`)
    run(['tar', '-czf', archive, '-C', dirname(root), '--', basename(root)], dirname(root), { PATH: process.env.PATH ?? '/usr/bin:/bin', COPYFILE_DISABLE: '1' })
    const digest = hash(readFileSync(archive))
    writeFileSync(`${archive}.sha256`, `${digest}  ${basename(archive)}\n`, { flag: 'wx' })
    console.log(JSON.stringify({ root, archive, sha256: digest }, null, 2)); return
  }
  if (command === 'delivery') {
    if (args.length !== 4) throw Error(usage)
    const { createDeliveryBundle } = await import('./delivery.js')
    const metadata = JSON.parse(readFileSync(resolve(args[3]!), 'utf8'))
    console.log(createDeliveryBundle(resolve(args[0]!), resolve(args[1]!), resolve(args[2]!), metadata))
    return
  }
  if (command === 'inspect' || command === 'verify') {
    if (args.length !== 1) throw Error(usage)
    const root = resolve(args[0]!)
    if (command === 'verify') await verifyInstalled(root)
    const manifest = verifySource(root, command === 'verify')
    console.log(JSON.stringify({ kind: manifest.kind, version: manifest.version, files: manifest.files.length, targets: manifest.targets }, null, 2)); return
  }
  if (command !== 'install' && command !== 'rollback') throw Error(usage)
  const source = command === 'install' ? args.shift() : undefined
  if (command === 'install' && (!source || source.startsWith('--'))) throw Error(usage)
  if (!process.env.HOME) throw Error('HOME is required')
  const options = { prefix: join(process.env.HOME, '.local/share/cc'), binDir: join(process.env.HOME, '.local/bin'), offline: true, cache: undefined as string | undefined }
  let remoteLifecycle = false
  while (args.length) {
    const flag = args.shift()
    if (flag === '--offline') options.offline = true
    else if (flag === '--online') options.offline = false
    else if (flag === '--remote-lifecycle' && command === 'install') remoteLifecycle = true
    else if (flag === '--prefix' || flag === '--bin-dir' || flag === '--cache-dir') {
      const value = args.shift()
      if (!value || value.startsWith('--')) throw Error(`Missing value: ${flag}`)
      if (flag === '--prefix') options.prefix = resolve(value)
      else if (flag === '--bin-dir') options.binDir = resolve(value)
      else options.cache = resolve(value)
    } else throw Error(`Unknown option: ${flag}`)
  }
  const lifecycle = remoteLifecycle ? createRemoteLifecycle({ unitSource: join(import.meta.dir, 'cc-serve.service'),
    onManualCleanup: items => { for (const item of items) console.error(`Manual cleanup required: ${item}`) } }) : undefined
  console.log(command === 'install' ? await installSource(resolve(source!), options, undefined, lifecycle) : await rollback(options))
}
if (import.meta.main) {
  try { await main(process.argv.slice(2)) }
  catch (error) { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1 }
}
