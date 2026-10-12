import {useEffect,useLayoutEffect,useMemo,useRef,useState,type RefObject} from 'react'
import type {ScrollBoxHandle} from '../ink/components/ScrollBox.js'
import type {Message} from '../types/message.js'
import {TranscriptArchive} from '../utils/transcriptArchive.js'
import {uniqueTranscriptMessages} from '../components/messages/transcriptDetail.js'

/** Ctrl+O owns a separate history projection; query messages stay untouched. */
export function useTranscriptArchive(path:string|undefined,messages:Message[],scrollRef?:RefObject<ScrollBoxHandle|null>) {
  const [archive,setArchive]=useState<{path?:string;messages:Message[];status?:string}>({messages:[]})
  const anchor=useRef<{path:string;height:number}|null>(null)
  useEffect(()=>{
    if(!path)return
    let reader:TranscriptArchive|undefined,disposed=false,loading=false,failed=false
    setArchive({path,messages:[],status:'Loading recorded history…'})
    const load=async()=>{
      if(disposed || loading || failed || reader?.done)return
      loading=true
      try{
        if(!reader)reader=await TranscriptArchive.open(path)
        if(disposed){await reader.close();return}
        let page=await reader.previous()
        // The explicit non-viewport mode uses terminal scrollback; there is
        // no scroll subscription that could request another page afterward.
        if(!scrollRef)while(!disposed && !reader.done)page=[...await reader.previous(),...page]
        if(disposed)return
        const handle=scrollRef?.current
        if(handle && !handle.isSticky())anchor.current={path,height:handle.getFreshScrollHeight()}
        setArchive(previous=>({path,messages:[...page,...(previous.path===path?previous.messages:[])],status:reader!.done?undefined:'Scroll up to load earlier records'}))
      }catch(error){
        if(disposed)return
        failed=true
        const unavailable=error instanceof Error?error.message:String(error)
        setArchive(previous=>({...previous,path,status:`Recorded history unavailable: ${unavailable}`}))
      }finally{loading=false}
    }
    void load()
    const unsubscribe=scrollRef?.current?.subscribe(()=>{
      const handle=scrollRef.current
      if(handle && !handle.isSticky() && handle.getScrollTop()<40)void load()
    })
    return()=>{disposed=true;unsubscribe?.();void reader?.close()}
  },[path,scrollRef])
  useLayoutEffect(()=>{
    const before=anchor.current
    if(!before || before.path!==path)return
    anchor.current=null
    const handle=scrollRef?.current
    if(!handle || handle.isSticky())return
    const delta=handle.getFreshScrollHeight()-before.height
    if(delta>0)handle.scrollBy(delta)
  },[archive,path,scrollRef])
  const rows=useMemo(()=>path && archive.path===path?uniqueTranscriptMessages([...archive.messages,...messages]):messages,[path,archive,messages])
  return {messages:rows,status:archive.path===path?archive.status:undefined}
}
