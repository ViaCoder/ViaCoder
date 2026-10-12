import {useEffect,useMemo,useState} from 'react'
import type {SharedThinkingHost,SharedThinkingState,SharedThinkingChange} from '../../server/sharedThinkingState.js'
import {ThinkingRequestSuperseded} from '../../server/sharedThinkingState.js'
type State={snapshot?:SharedThinkingState;pending:boolean;error?:string}
export class SharedThinkingController {
 state:State={pending:true}
 private alive=true
 private writing=false
 private reading=false
 private again=false
 private revision=0
 private abort=new AbortController()
 private unsubscribe?:()=>void
 private undo?:{token:string;expected:string}
 constructor(private host:SharedThinkingHost,private publish:(state:State)=>void){}
 get hasChanges(){return Boolean(this.undo)}
 private emit(state:State){if(this.alive){this.state=state;this.publish(state)}}
 start(){this.unsubscribe=this.host.subscribeSettingsChanges?.(()=>{void this.refresh()});void this.refresh()}
 async refresh(){
  if(!this.alive)return
  if(this.writing||this.reading){this.again=true;return}
  this.reading=true;const revision=++this.revision
  try{
   if(!this.host.thinking)throw Error('Owner thinking controls are not available')
   const result=await this.host.thinking({},this.abort.signal)
   if(revision===this.revision)this.emit({snapshot:result.state,pending:false})
  }catch(error){if(!(error instanceof ThinkingRequestSuperseded)&&revision===this.revision)this.emit({...this.state,pending:false,error:String(error)})}
  finally{this.reading=false;if(this.again&&!this.writing){this.again=false;void this.refresh()}}
 }
 async update(enabled:boolean){
  if(!this.state.snapshot)return false
  return this.write({update:{enabled,expected:this.state.snapshot.revision}})
 }
 async revert(){return this.undo?this.write({restore:this.undo}):!this.writing}
 private async write(change:SharedThinkingChange):Promise<boolean>{
  if(!this.alive||this.writing)return false
  this.writing=true;++this.revision;this.emit({...this.state,pending:true,error:undefined})
  try{
   if(!this.host.thinking)throw Error('Owner thinking controls are not available')
   const result=await this.host.thinking(change,this.abort.signal)
   if(!this.alive)return false
   if(change.restore)this.undo=undefined
   else{
    // A deliberate new edit after an external update starts a new rollback
    // baseline; never carry an older dialog token across that external write.
    const token=(change.update?.expected===this.undo?.expected?this.undo?.token:undefined)??result.undoToken
    if(!token)throw Error('Owner did not acknowledge thinking rollback state')
    this.undo={token,expected:result.state.revision}
   }
   this.emit({snapshot:result.state,pending:false});return true
  }catch(error){this.emit({...this.state,pending:false,error:String(error)});return false}
  finally{this.writing=false;if(this.again){this.again=false;void this.refresh()}}
 }
 dispose(){this.alive=false;++this.revision;this.abort.abort();this.unsubscribe?.()}
}
export function useSharedThinking(host?:SharedThinkingHost){
 const [published,setPublished]=useState<{host?:SharedThinkingHost;state:State}>({host,state:{pending:Boolean(host)}})
 const controller=useMemo(()=>host?new SharedThinkingController(host,state=>setPublished({host,state})):undefined,[host])
 useEffect(()=>{controller?.start();return()=>controller?.dispose()},[controller])
 return{controller,...(published.host===host?published.state:{pending:Boolean(host)})}
}
