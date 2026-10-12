import React,{useEffect,useRef,useState} from 'react'
import {Box,Text} from '../../ink.js'
import {Dialog} from '../design-system/Dialog.js'
import {Select} from '../CustomSelect/select.js'
import type {SharedSessionCommandHost} from '../../server/sharedSessionCommandHost.js'
import {observeSharedTasks} from '../../server/observeSharedTasks.js'
import type {PublicTask} from '../../server/web/publicCommandAdapters.js'
import type {LocalJSXCommandOnDone} from '../../types/command.js'

/** A shared viewer has no local process handles. Use the same task registry and
 * stop control as Web, while retaining the official terminal dialog/select. */
export function SharedBackgroundTasksDialog({host,onDone,initialDetailTaskId}: {
  host:SharedSessionCommandHost;onDone:LocalJSXCommandOnDone;initialDetailTaskId?:string
}) {
  const [tasks,setTasks]=useState<PublicTask[]>(),[selected,setSelected]=useState(initialDetailTaskId)
  const [error,setError]=useState(''),[busy,setBusy]=useState(false)
  const controller=useRef<AbortController|undefined>(undefined),refresh=useRef<()=>void>(()=>{})
  useEffect(()=>{
    const abort=new AbortController();controller.current=abort
    setTasks(undefined);setError('')
    refresh.current=observeSharedTasks(host,abort.signal,next=>{setTasks(next);setError('')},setError)
    return ()=>abort.abort()
  },[host])
  const close=()=>{controller.current?.abort();onDone('Background tasks dialog dismissed',{display:'system'})}
  const task=tasks?.find(item=>item.id===selected)
  async function stop() {
    if (!task || busy || !controller.current) return
    const signal=controller.current.signal
    setBusy(true);setError('')
    try {await host.stopTask(task.id,signal);if(!signal.aborted)refresh.current()}
    catch(error){if(!signal.aborted)setError(String(error))}
    finally{if(!signal.aborted)setBusy(false)}
  }
  return <Dialog title="Background tasks" subtitle="Connected session" onCancel={close} color="background">
    <Box flexDirection="column">
      {error&&<Text color="error">{error}</Text>}
      {tasks===undefined?<Text>{error?'Owner tasks unavailable. Close and reconnect.':'Loading owner tasks…'}</Text>:task?<>
        <Text>{task.description}</Text><Text dimColor>{task.id} · {task.type} · {task.status}</Text>
        <Select isDisabled={busy} options={[
          ...(['pending','running'].includes(task.status)?[{value:'stop',label:'Stop task on owner'}]:[]),
          {value:'back',label:'Back to tasks'},
        ]} onChange={value=>{if(value==='stop')void stop();else setSelected(undefined)}} onCancel={()=>setSelected(undefined)}/>
      </>:<>{tasks.length===0&&<Text dimColor>No tasks currently running</Text>}
        <Select options={[...tasks.map(item=>({value:`task:${item.id}`,label:`${item.description} · ${item.status}`})),
          {value:'refresh',label:'Refresh tasks'},{value:'close',label:'Close'}]}
          onChange={value=>{if(value==='close')close();else if(value==='refresh')refresh.current();else setSelected(value.slice(5))}} onCancel={close}/>
      </>}
      {busy&&<Text dimColor>Waiting for owner confirmation…</Text>}
    </Box>
  </Dialog>
}
