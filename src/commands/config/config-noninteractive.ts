import {configNonInteractiveCall287} from '../../utils/commandCallbackWriters287.js'
import type { LocalCommandCall, LocalJSXCommandContext } from '../../types/command.js'
export type ConfigAssignment = {key:string; raw:string}
export type ConfigOutcome = {kind:'save-failure'|'locked'|'refusal';message:string}
export type ConfigCommandHost = {
  /** Must use the same dynamic rows, policy locks and consent gates as /config UI. */
  list(): Promise<string> | string
  apply(assignments:ConfigAssignment[],context:LocalJSXCommandContext): Promise<ConfigOutcome[]>
  persistsOffBox(): boolean
}
// Exact parser of chunk-azjf17r6.js:QEt; one assignment may contain spaces.
export function parseConfigAssignments(args:string): ConfigAssignment[] | null {
  const value = args.trim()
  if (!value || !value.includes('=')) return null
  const parts = value.split(/\s+/)
  if (parts.filter(part => part.includes('=')).length === 1) {
    const index = value.indexOf('='), key = value.slice(0,index)
    if (!key || /\s/.test(key)) return null
    return [{key,raw:value.slice(index+1)}]
  }
  const assignments:ConfigAssignment[] = []
  for (const part of parts) {
    const index = part.indexOf('=')
    if (index <= 0) return null
    assignments.push({key:part.slice(0,index),raw:part.slice(index+1)})
  }
  return assignments
}
export function formatConfigOutcome(result:ConfigOutcome, offBox:boolean): string {
  if (!offBox || result.kind === 'refusal') return result.message
  return result.kind === 'locked' ? "Couldn't save this setting: a trusted policy owns it (detail withheld on this connection)." : "Couldn't save this setting (detail withheld on this connection)."
}
// Full 287 chunk-2921nda0:c → Fxt/Hst/Tqe/fe/SNn on canonical writers.
export const call:LocalCommandCall=configNonInteractiveCall287
