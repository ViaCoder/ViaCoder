import type {SharedSessionCommandHost} from './sharedSessionCommandHost.js'
import type {PublicTask} from './web/publicCommandAdapters.js'

/** Read the owner only while the dialog is mounted. Coalesce lifecycle events,
 * never poll or replay a task action, and discard a response invalidated in flight. */
export function observeSharedTasks(host: Pick<SharedSessionCommandHost,'listTasks'|'subscribeTaskChanges'>, signal: AbortSignal,
  onTasks: (tasks: PublicTask[]) => void, onError: (error: string) => void): () => void {
  let pending=false, dirty=false
  async function refresh() {
    if (signal.aborted) return
    if (pending) {dirty=true; return}
    pending=true
    try {
      do {
        dirty=false
        const tasks=await host.listTasks(signal)
        if (!signal.aborted && !dirty) onTasks(tasks)
      } while (dirty && !signal.aborted)
    } catch (error) {
      if (!signal.aborted) onError(String(error))
    } finally {pending=false}
  }
  try {
    const unsubscribe=host.subscribeTaskChanges(()=>void refresh())
    signal.addEventListener('abort',unsubscribe,{once:true})
  } catch(error) {onError(String(error)); return ()=>void refresh()}
  void refresh()
  return ()=>void refresh()
}
