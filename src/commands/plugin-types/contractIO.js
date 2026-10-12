// Host adapters for official EFe/Aon/Ddn. Never follow a final-component symlink.
import { constants } from 'node:fs'
import { open, realpath, stat } from 'node:fs/promises'
import { isAbsolute, relative, sep } from 'node:path'
export const h0t = 'claude-code.d.ts'
export const cqe = 262144
export const l = error => error instanceof Error ? error.message : String(error)
export const E = error => error && typeof error === 'object' ? error.code : undefined
export const fr = value => value.replace(/[\p{Cc}\p{Cf}\p{Cs}\p{Default_Ignorable_Code_Point}\u2028\u2029]/gu, '').replace(/\s+/g, ' ').trim()
export const xr = value => value.split('\n')[0]
export const uLr = (prefix, message) => message.startsWith(`${prefix}: `) ? message.slice(prefix.length + 2) : message
export const vFe = ({plugin, key}) => `${plugin}.${key}`
export const Ddn = (_filename, contents) => new Bun.Transpiler({loader:'ts', macro:false}).transformSync(contents)
export async function EFe(file, root, label) {
  const [folder, real] = await Promise.all([realpath(root), realpath(file)])
  const path = relative(folder, real)
  if (path === '..' || path.startsWith(`..${sep}`) || isAbsolute(path)) throw new Error(`${label}: ${file}: ${real} resolves outside the plugin's folder`)
  const info = await stat(real)
  if (!info.isFile()) throw new Error(`${label}: ${file}: not a regular file`)
  return {real, size:info.size}
}
export async function Aon(file) {
  const handle = await open(file, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0))
  try {
    const info = await handle.stat()
    if (!info.isFile() || info.size > cqe) throw new Error('is over the size cap, or not a regular file, and was not read')
    return (await handle.readFile({encoding:'utf8'})).replace(/^\uFEFF/, '')
  } finally { await handle.close() }
}
