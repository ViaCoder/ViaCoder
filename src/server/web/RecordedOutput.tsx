import React, {useEffect,useState} from 'react'
import {WebAPI, WebRequestError} from './client.js'
import type {RecordedOutputReference} from './recordedOutputReference.js'
import {toolSessionKey} from './toolPresentation.js'

export function RecordedOutput({api, reference}: {api:WebAPI; reference:RecordedOutputReference}) {
  const [state,setState]=useState<{content?:string;error?:string}>({})
  useEffect(()=>{
    const controller=new AbortController()
    setState({})
    const sessionId=toolSessionKey(reference.recordId,'')
    void api.recordedOutput(sessionId,reference.recordId,reference.index,controller.signal).then(result=>{
      if(!controller.signal.aborted)setState(result.recordId===reference.recordId&&result.index===reference.index&&typeof result.content==='string'
        ? {content:result.content}:{error:'外置输出响应与记录不匹配；未重新执行工具。'})
    },cause=>{
      if(controller.signal.aborted)return
      const error=cause as Error
      setState({error:error instanceof WebRequestError && error.status===410
        ? '外置输出文件已缺失；保留原记录，未重新执行工具。'
        : error instanceof WebRequestError && error.status===409
        ? '外置输出引用无效或未登记；未重新执行工具。'
        : error instanceof WebRequestError && error.status===401
        ? '外置输出读取未认证；未重新执行工具。'
        : `外置输出读取失败：${error.message}；未重新执行工具。`})
    })
    return()=>controller.abort()
  },[api,reference.recordId,reference.index])
  return <section className="recorded-output"><strong>外置保存的完整输出</strong>
    {state.content!==undefined?<pre className="raw">{state.content}</pre>:<p role={state.error?'alert':'status'}>{state.error??'正在读取已记录的外置输出…'}</p>}
  </section>
}
