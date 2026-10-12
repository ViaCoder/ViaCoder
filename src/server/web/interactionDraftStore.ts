import { useCallback, useEffect, useId, useSyncExternalStore } from 'react'

type Cell<T> = { value: T; listeners: Set<() => void> }
const cells = new Map<string, Cell<unknown>>()
function cell<T>(key: string, initial: () => T): Cell<T> {
  let found = cells.get(key) as Cell<T> | undefined
  if (!found) { found = { value: initial(), listeners: new Set() }; cells.set(key, found) }
  return found
}

/** In-memory only: keep in-flight interaction state across virtual unmount/session switches. */
export function useInteractionDraft<T>(draftKey: string | undefined, field: string, initial: () => T):
  [T, (next: T | ((previous: T) => T)) => void] {
  const localId = useId()
  const key = `${draftKey ?? localId}:${field}`
  const subscribe = useCallback((listener: () => void) => {
    const entry = cell(key, initial)
    entry.listeners.add(listener)
    return () => { entry.listeners.delete(listener) }
  }, [key])
  const getSnapshot = useCallback(() => cell(key, initial).value, [key])
  const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const set = useCallback((next: T | ((previous: T) => T)) => {
    const entry = cell(key, initial)
    const value = typeof next === 'function' ? (next as (previous: T) => T)(entry.value) : next
    if (Object.is(value, entry.value)) return
    entry.value = value
    for (const listener of entry.listeners) listener()
  }, [key])
  useEffect(() => () => { if (!draftKey) cells.delete(key) }, [key, draftKey])
  return [value, set]
}

export function clearInteractionDraft(draftKey: string): void {
  for (const key of [...cells.keys()]) if (key.startsWith(`${draftKey}:`)) {
    const entry = cells.get(key)!
    cells.delete(key)
    for (const listener of entry.listeners) listener()
  }
}
