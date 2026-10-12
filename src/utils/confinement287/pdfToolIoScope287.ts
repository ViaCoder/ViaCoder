import {realpathSync, existsSync} from 'node:fs'
import {dirname, isAbsolute, relative, resolve} from 'node:path'
import {Readable} from 'node:stream'
import {quote} from 'shell-quote'
import {assertConfinedFileToolContext287, getConfinedFileToolContext287, getConfinedFileToolHandle287} from './fileToolIoScope287.js'
const runtimeFiles = new Map<string, Promise<string[]>>()

/** Poppler installed by Homebrew has non-system dylibs. Authorize its exact
 * loader dependencies, not the package tree or the user's home. This is a
 * cached trusted-runtime lookup, never a recursive project scan. */
function rendererRuntimeFiles287(executable: string): Promise<string[]> {
  let result = runtimeFiles.get(executable)
  if (result) return result
  result = (async () => {
    const files = new Set([executable])
    if (process.platform !== 'darwin') return [...files]
    const {execFileNoThrow} = await import('../execFileNoThrow.js')
    const executableDir = dirname(executable)
    const inspected = new Set<string>()
    const loadPath = (path: string, loader: string) => path
      .replace('@loader_path', dirname(loader)).replace('@executable_path', executableDir)
    for (const entry of files) {
      const file = realpathSync.native(entry)
      if (inspected.has(file)) continue
      inspected.add(file)
      const deps = await execFileNoThrow('/usr/bin/otool', ['-L', file], {useCwd: false, timeout: 5000})
      if (deps.code !== 0) throw new Error('Cannot resolve PDF renderer libraries')
      let search: string[] | undefined
      for (const line of deps.stdout.split('\n').slice(1)) {
        const name = /^\s+(.+) \(compatibility version /.exec(line)?.[1]
        if (!name || name.startsWith('/usr/lib/') || name.startsWith('/System/')) continue
        let path = loadPath(name, file)
        if (name.startsWith('@rpath/')) {
          if (!search) {
            const paths = await execFileNoThrow('/usr/bin/otool', ['-l', file], {useCwd: false, timeout: 5000})
            if (paths.code !== 0) throw new Error('Cannot resolve PDF renderer loader paths')
            search = [...paths.stdout.matchAll(/^\s*path (.+) \(offset \d+\)$/gm)].map(row => loadPath(row[1]!, file))
          }
          path = search.map(dir => resolve(dir, name.slice(7))).find(existsSync) ?? ''
        }
        if (!path.startsWith('/opt/homebrew/') && !path.startsWith('/usr/local/')) throw new Error('PDF renderer library is outside system runtime roots')
        const canonical = realpathSync.native(path)
        if (!canonical.startsWith('/opt/homebrew/') && !canonical.startsWith('/usr/local/')) throw new Error('PDF renderer library resolves outside system runtime roots')
        files.add(path)
        files.add(canonical)
      }
    }
    return [...files]
  })()
  runtimeFiles.set(executable, result)
  return result
}

/** Only original m68 input/process supplies change. Algorithms, page limits,
 * errors, scratch/result collection and their cleanup remain canonical. */
export function wrapOriginalPdfIo287(kind: 'read' | 'open' | 'process', original: (...args: any[]) => any) {
  return async (...args: any[]) => {
    const context = getConfinedFileToolContext287()
    if (!context) return original(...args)
    assertConfinedFileToolContext287(context)
    if (kind !== 'process') {
      const handle = getConfinedFileToolHandle287(args[0])
      if (!handle) throw new Error('PDF input has no confined read handle')
      if (kind === 'read') return handle.readBytes()
      return {stat: async () => {const stat = await handle.stat(); return {...stat, isFile: () => stat.regular, isDirectory: () => stat.directory}}, close: async () => {}}
    }
    const [command, argv, options = {}] = args as [string, string[], any]
    if (command !== 'pdfinfo' && command !== 'pdftoppm') return original(...args)
    const signal: AbortSignal = options.abortSignal ?? context.signal
    signal.throwIfAborted()
    const version = command === 'pdftoppm' && argv.includes('-v')
    const inputAt = command === 'pdfinfo' ? argv.length - 1 : argv.length - 2
    const handle = version ? undefined : getConfinedFileToolHandle287(argv[inputAt]!)
    if (!version && !handle) throw new Error('PDF renderer has no confined read handle')
    const input = handle && Readable.from((async function* () {
      let offset = 0
      for (;;) {
        signal.throwIfAborted()
        const bytes = await handle.readChunk(offset)
        if (!bytes.length) return
        offset += bytes.length
        yield bytes
      }
    })())
    const {findExecutable} = await import('../findExecutable.js')
    const resolved = findExecutable(command, []).cmd
    // Keep the original renderer-not-found result, not ENOENT on the PDF input.
    if (!isAbsolute(resolved)) return {stdout: '', stderr: '', code: 1}
    const executable = realpathSync.native(resolved)
    const confinedArgs = argv.slice()
    if (!version) confinedArgs[inputAt] = '-'
    const generatedDirectories: string[] = []
    if (command === 'pdftoppm' && !version) {
      const {getToolResultsDir} = await import('../toolResultStorage.js')
      const directory = dirname(argv.at(-1)!)
      if (!/^pdf-[a-f\d-]{36}$/i.test(relative(getToolResultsDir(), directory))) throw new Error('PDF output is not the original session tool-result directory')
      generatedDirectories.push(realpathSync.native(directory))
    }
    const {SandboxManager, wrapFixedFileIoCommand287} = await import('../sandbox/sandbox-adapter.js')
    const wrapped = await wrapFixedFileIoCommand287(quote(['exec', executable, ...confinedArgs]), await rendererRuntimeFiles287(executable), signal, generatedDirectories)
    const {getClaudeTempDir} = await import('../permissions/filesystem.js')
    const {getCwd} = await import('../cwd.js')
    const temporary = getClaudeTempDir()
    try {
      assertConfinedFileToolContext287(context)
      signal.throwIfAborted()
      context.policy.preflightCwd(getCwd())
      // Reuse the original execa result/timeout/cancel/capture contract and send
      // chunks from the held fd. No second input open or full-size scratch copy.
      return await original('/bin/sh', ['-c', `exec ${wrapped}`], {
        ...options, abortSignal: signal, useCwd: true, cwd: getCwd(),
        env: {PATH: '/usr/bin:/bin', HOME: temporary, TMPDIR: temporary}, extendEnv: false,
        ...(input && {input, stdin: 'pipe'}),
      })
    } finally {input?.destroy(); SandboxManager.cleanupAfterCommand()}
  }
}
