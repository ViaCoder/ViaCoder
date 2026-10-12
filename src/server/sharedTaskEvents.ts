import type {ServeEvent} from './serveSession.js'
/** Same owner lifecycle invalidations for the Web panel and terminal facade. */
export function taskListChanged(event:ServeEvent,generation:string|undefined):boolean {
  if (!generation || event.executorGeneration!==generation) return false
  if (event.type==='control_completed') return event.subtype==='stop_task' && event.accepted===true
  if (event.type==='turn_completed') return true
  const message=event.message as {type?:string;subtype?:string}|undefined
  return event.type==='sdk' && message?.type==='system' &&
    (message.subtype==='task_started'||message.subtype==='task_notification')
}
