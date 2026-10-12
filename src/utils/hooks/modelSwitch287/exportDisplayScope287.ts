import {AsyncLocalStorage} from 'node:async_hooks'
import type {ComponentType} from 'react'
/** A stateless export-only display binding. The original Gy/OI store and Ree
 * selectors remain mounted; the callback owns neither state nor listeners. */
export type ExportMessagesRenderer287=ComponentType<Record<string,unknown>>
const displayScope287=new AsyncLocalStorage<ExportMessagesRenderer287>()
export function runWithExportMessagesRenderer287<T>(renderer:ExportMessagesRenderer287,work:()=>T):T {
 return displayScope287.run(renderer,work)
}
export function getExportMessagesRenderer287():ExportMessagesRenderer287|undefined {
 return displayScope287.getStore()
}
/** Same entrypoint name used by the product export caller. */
export const withExportDisplayScope287=runWithExportMessagesRenderer287
