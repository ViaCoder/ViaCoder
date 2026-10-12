import {createMcpInitialRetry287,createMcpCloseRetry287,type McpRetryPorts287} from './officialRetry287/native.js'
import type {ConnectedMCPServerV2,FailedMCPServer} from './types.js'
export type OriginalMcpRetryRuntime287=Omit<McpRetryPorts287,'to'|'Ct'|'Ro'>&{isCancelled():boolean}
/** Public 2.1.283: chunk-j76azkk1 hY/Hst, chunk-mzg9kbjz eye.
 * Cancellation settles sleeps as well as aborting dials; no detached timer loop.
 */
export const MCP_RECONNECT_ATTEMPTS = 5
export const mcpReconnectDelay = (attempt: number): number =>
  Math.min(1000 * 2 ** (attempt - 1), 30000)

function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise(resolve => {
    const finish = () => { clearTimeout(timer); signal.removeEventListener('abort', finish); resolve() }
    const timer = setTimeout(finish, ms)
    timer.unref?.()
    signal.addEventListener('abort', finish, {once: true})
    if (signal.aborted) finish()
  })
}

export class McpReconnectSupervisor {
  private jobs = new Map<string, AbortController>()
  // Source fbe to/Ct/Ro refs belong to this existing supervisor, not a
  // second reconnect engine or SDK/list cache.
  private readonly initialAttempts287={current:new Map<string,number>()}
  private readonly timers287={current:new Map<string,()=>void>()}
  private readonly connectedNames287={current:new Set<string>()}
  /** The original queue and retry closures share these refs, not copied maps. */
  queuedRefs287():import('./officialMcpStateCarrier287/queue.js').McpQueuedRefs287 {
    return {to:this.initialAttempts287,Ro:this.connectedNames287,Ct:this.timers287}
  }
  constructor(private sleep = wait) {}
  private sourcePorts287(runtime:OriginalMcpRetryRuntime287,controller:AbortController):McpRetryPorts287 {
    const current=()=>!controller.signal.aborted&&!runtime.isCancelled()
    const terminal=(name:string)=>{if(this.jobs.get(name)===controller)this.jobs.delete(name)}
    return {...runtime,to:this.initialAttempts287,Ct:this.timers287,Ro:this.connectedNames287,
      Ai:()=>!current()||runtime.Ai(),Io:name=>!current()||runtime.Io(name),
      Do:state=>{if(!current()){terminal(state.name);return}runtime.Do(state);if(state.type!=='pending')terminal(state.name)},
      qo:result=>{if(!current()){terminal(result.client.name);return}runtime.qo(result);terminal(result.client.name)},
      Ut:{now:()=>runtime.Ut.now(),setTimeout:(callback,ms)=>{
        let done=false
        const finish=()=>{if(done)return;done=true;cancelTimer();controller.signal.removeEventListener('abort',finish);callback()}
        const cancelTimer=runtime.Ut.setTimeout(finish,ms)
        controller.signal.addEventListener('abort',finish,{once:true})
        if(controller.signal.aborted)finish()
        return finish
      }},
    }
  }
  scheduleInitial287(state:FailedMCPServer,runtime:OriginalMcpRetryRuntime287):void {
    this.cancel(state.name)
    const controller=new AbortController();this.jobs.set(state.name,controller)
    createMcpInitialRetry287(this.sourcePorts287(runtime,controller))(state)
    if(!this.timers287.current.has(state.name)&&this.jobs.get(state.name)===controller)this.jobs.delete(state.name)
  }
  startClose287(client:ConnectedMCPServerV2,runtime:OriginalMcpRetryRuntime287):void {
    this.cancel(client.name)
    const controller=new AbortController();this.jobs.set(client.name,controller)
    createMcpCloseRetry287(this.sourcePorts287(runtime,controller),client)()
    if(runtime.Ai()||runtime.Io(client.name)||runtime.isCancelled())this.jobs.delete(client.name)
  }
  settledConnected287(name:string):void {
    this.initialAttempts287.current.delete(name);this.connectedNames287.current.add(name)
    const timer=this.timers287.current.get(name);this.timers287.current.delete(name);timer?.()
  }
  cancel(name: string): void {
    const job = this.jobs.get(name)
    this.jobs.delete(name)
    job?.abort()
    const timer=this.timers287.current.get(name)
    this.timers287.current.delete(name);timer?.()
    this.connectedNames287.current.delete(name)
  }
  cancelAll(): void { for (const name of new Set([...this.jobs.keys(),...this.timers287.current.keys(),...this.connectedNames287.current])) this.cancel(name) }
  get size(): number { return this.jobs.size }
  async start(name: string, attempt: (signal: AbortSignal, number: number) => Promise<boolean>): Promise<void> {
    this.cancel(name)
    const controller = new AbortController()
    this.jobs.set(name, controller)
    try {
      for (let number = 1; number <= MCP_RECONNECT_ATTEMPTS && !controller.signal.aborted; number++) {
        if (await attempt(controller.signal, number)) return
        if (number < MCP_RECONNECT_ATTEMPTS && !controller.signal.aborted)
          await this.sleep(mcpReconnectDelay(number), controller.signal)
      }
    } finally {
      if (this.jobs.get(name) === controller) this.jobs.delete(name)
    }
  }
}
