import { constants } from 'node:fs'
import { toJSONSchema } from 'zod/v4'
import { lstat, mkdir, open, readdir, rm, writeFile } from 'node:fs/promises'
import { resolve, join, relative } from 'node:path'
import type { LocalCommandCall } from '../../types/command.js'
import { getCwd } from '../../utils/cwd.js'
import { zodToJsonSchema } from '../../utils/zodToJsonSchema.js'
import { pluginDeclarations, mcpDeclarations, mcpSchemas } from './declarations.js'
import { K2o, Ubt, CZr } from './contracts.js'
import { readLoadedTypeContract } from './manifest.js'

export async function writeFresh(path: string, contents: string) {
  await rm(path, { force: true, recursive: true })
  const handle = await open(path, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | (constants.O_NOFOLLOW ?? 0))
  try { await handle.writeFile(contents, 'utf8') } finally { await handle.close() }
}
export async function writeContracts(root: string, contracts: {files: {path:string; text:string}[]; text:string}) {
  const folder = resolve(root, Ubt)
  const expected = new Set(contracts.files.map(file => resolve(root, file.path)))
  await mkdir(folder, { recursive: true })
  if (!(await lstat(folder)).isDirectory()) throw new Error('the contracts folder is a link, not a folder; remove it and rerun')
  const stale = (await readdir(folder, { withFileTypes: true })).filter(entry => expected.has(join(folder, entry.name)) ? !entry.isFile() : entry.name.endsWith('.d.ts'))
  await Promise.all(stale.map(entry => rm(join(folder, entry.name), { force: true, recursive: true })))
  await Promise.all(contracts.files.map(file => writeFresh(resolve(root, file.path), file.text)))
  await writeFresh(resolve(root, CZr), contracts.text)
}
// Official Lsr uses unrepresentable:any for output-only transforms.
export function outputJsonSchemaOf(schema: Parameters<typeof toJSONSchema>[0]) {
  try { return toJSONSchema(schema, { unrepresentable: 'any' }) } catch { return undefined }
}
export function builtinToolSchemasOf(tools: readonly {name:string; isMcp?:boolean; inputJSONSchema?:unknown; inputSchema:unknown; outputSchema?:unknown}[]) {
  return tools.filter(tool => !tool.isMcp).map(tool => ({ name: tool.name,
    inputSchema: tool.inputJSONSchema ?? zodToJsonSchema(tool.inputSchema as Parameters<typeof zodToJsonSchema>[0]),
    ...(tool.outputSchema !== undefined ? {outputSchema: outputJsonSchemaOf(tool.outputSchema as Parameters<typeof toJSONSchema>[0])} : {}),
  }))
}
// chunk-jbhpqsch.js:J. Use the session snapshot; never reload/install plugins here.
export const call: LocalCommandCall = async (args, context) => {
  const cwd = getCwd(), root = resolve(cwd, args.trim() || '.claude/types')
  const state = context.getAppState()
  const mcp = mcpSchemas(await Promise.all(state.mcp.tools.filter(tool => tool.isMcp === true).map(async tool => ({
    name: tool.name, inputJSONSchema: tool.inputJSONSchema,
    description: await tool.description({}, {isNonInteractiveSession:context.options.isNonInteractiveSession,toolPermissionContext:state.toolPermissionContext,tools:context.options.tools}),
  }))))
  const builtin = builtinToolSchemasOf(context.options.tools)
  const snapshots = state.plugins.needsRefresh ? [] : await Promise.all(state.plugins.enabled.map(async plugin => ({plugin,...await readLoadedTypeContract(plugin)})))
  const warnings = snapshots.flatMap(snapshot=>snapshot.warning ? [snapshot.warning] : [])
  const entries = snapshots.flatMap(({plugin,types}) => types === undefined ? [] : [{name:plugin.name,version:plugin.manifest.version,tier:'user',root:plugin.path,types}])
    .sort((a,b) => a.name.localeCompare(b.name))
  const contracts = state.plugins.needsRefresh ? undefined : await K2o('2.1.287', entries)
  await mkdir(root, { recursive: true })
  const apiPath = resolve(root,'claude-code.d.ts'), mcpPath = resolve(root,'claude-code-mcp.d.ts'), contractsPath = resolve(root,CZr)
  await writeFile(apiPath, pluginDeclarations('2.1.287', builtin), 'utf8')
  if (contracts) await writeContracts(root, contracts)
  await writeFile(mcpPath, mcpDeclarations(mcp), 'utf8')
  const contractLine = !contracts ? `Left ${contractsPath} as it was: this session's plugins are not loaded right now (a reload is pending); run /reload-plugins, then /plugin-types again.`
    : contracts.written.length === 0 && contracts.skipped.length === 0 && !warnings.length ? `Wrote ${contractsPath}: no enabled plugin names a type contract (plugin.json \`types\`), so it declares nothing.`
    : `Wrote ${contractsPath}: ${contracts.written.length} plugin contract${contracts.written.length === 1 ? '' : 's'}${contracts.written.length ? ` (${contracts.written.join(', ')})` : ''}, each its own file under ${Ubt}/.${contracts.skipped.map((item:{label:string;problems:string[]}) => ` Skipped ${item.label}: ${item.problems.join('; ')}.`).join('')}`
  return { type:'text', value:[`Wrote ${apiPath}: the plugin API (module 'claude-code', early access: it may change between releases) and ${builtin.length} built-in tool${builtin.length === 1 ? '' : 's'}.`,contractLine,...warnings,
    mcp.length ? `Wrote ${mcpPath}: ${mcp.length} MCP tool${mcp.length === 1 ? '' : 's'} from ${new Set(mcp.map((tool:{name:string}) => tool.name.split('__')[1] ?? tool.name)).size} server(s).` : `Wrote ${mcpPath}: no MCP tools are connected, so it is empty (every mcp__* tool stays loosely typed).`,
    `Point the plugin's tsconfig.json (or jsconfig.json) at them: "include": ["${relative(cwd, root) || '.'}", "hooks"] with "lib": ["es2023"] and "jsx": "react", "jsxFactory": "h"; the header of claude-code.d.ts has the whole file.`].join('\n') }
}
