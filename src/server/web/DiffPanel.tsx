import React, {useEffect, useRef, useState} from 'react'
import {projectPublicDiffResult} from '../serveDiffResult.js'
import {publicWorkerControl} from './publicCommandAdapters.js'
import type {WebAPI} from './client.js'

export type DiffHunk = {oldStart:number; oldLines:number; newStart:number; newLines:number; lines:string[]}
export type DiffFile = {path:string; linesAdded:number; linesRemoved:number; isBinary:boolean; isUntracked?:boolean; detailUnavailable?:boolean; hunks:DiffHunk[]}
export type DiffData = {available:boolean; stats:{filesCount:number; linesAdded:number; linesRemoved:number}|null; files:DiffFile[]}
export function checkedDiff(value:unknown):DiffData {
  const result = projectPublicDiffResult(value)
  if (!result) throw Error('变更数据格式无效，请刷新')
  return result as DiffData
}
export function diffRows(file:DiffFile) {
  return file.hunks.flatMap(hunk => {
    let oldLine=hunk.oldStart, newLine=hunk.newStart
    return [{kind:'hunk',oldLine:'',newLine:'',text:`@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`},
      ...hunk.lines.map(text => {
        const prefix=text[0]
        const kind=prefix==='+'?'added':prefix==='-'?'removed':prefix==='\\'?'note':'context'
        return {kind,oldLine:kind==='removed'||kind==='context'?String(oldLine++):'',
          newLine:kind==='added'||kind==='context'?String(newLine++):'',text}
      })]
  })
}
export function DiffFileContent({file,limit=400}:{file:DiffFile;limit?:number}) {
  const [visible,setVisible]=useState(limit)
  useEffect(()=>setVisible(limit),[file,limit])
  if(file.isBinary) return <p className="diff-empty">二进制文件有变化，不显示文本差异。</p>
  if(file.detailUnavailable) return <p className="diff-empty">内容未能读取：文件可能过大、已移动，或不是可预览的文本文件。</p>
  const rows=diffRows(file)
  if(!rows.length) return <p className="diff-empty">没有可显示的文本差异（可能是空文件、重命名或文件属性变化）。</p>
  return <><div className="diff-code" tabIndex={0} role="region" aria-label={`${file.path} 逐行差异`}>
    <table><tbody>{rows.slice(0,visible).map((row,i)=><tr key={i} className={`diff-${row.kind}`}>
      <td className="diff-number" aria-label="原行号">{row.oldLine}</td><td className="diff-number" aria-label="新行号">{row.newLine}</td>
      <td className="diff-line"><code>{row.text || ' '}</code></td></tr>)}</tbody></table>
  </div>{visible<rows.length&&<button className="secondary diff-more" onClick={()=>setVisible(value=>value+400)}>继续显示（剩余 {rows.length-visible} 行）</button>}</>
}

export function DiffPanel({api,sessionId,enabled}:{api:WebAPI;sessionId:string;enabled:boolean}) {
  const [data,setData]=useState<DiffData|null>(null),[selected,setSelected]=useState('')
  const [detail,setDetail]=useState<DiffFile|null>(null),[loading,setLoading]=useState(false),[error,setError]=useState('')
  const [fileLoading,setFileLoading]=useState(false),[fileError,setFileError]=useState('')
  const revision=useRef(0),fileRevision=useRef(0)
  const refresh=async()=>{
    const rev=++revision.current; fileRevision.current++
    setLoading(true);setError('');setFileError('');setFileLoading(false);setDetail(null);setSelected('');setData(null)
    try {
      const result=checkedDiff(await publicWorkerControl(api,sessionId,{subtype:'local_public_diff'}))
      if(revision.current===rev) setData(result)
    } catch(error){if(revision.current===rev)setError(error instanceof Error?error.message:String(error))}
    finally {if(revision.current===rev)setLoading(false)}
  }
  useEffect(()=>{
    if(enabled)void refresh()
    return ()=>{revision.current++;fileRevision.current++}
  },[sessionId,enabled])
  const choose=async(file:DiffFile)=>{
    const rev=++fileRevision.current
    setSelected(file.path);setDetail(file);setFileError('');setFileLoading(false)
    if(file.isBinary)return
    setFileLoading(true)
    try{
      const result=checkedDiff(await publicWorkerControl(api,sessionId,{subtype:'local_public_diff',path:file.path}))
      const loaded=result.files.find(item=>item.path===file.path)
      if(!loaded)throw Error('文件已变化，请刷新列表')
      if(fileRevision.current===rev)setDetail(loaded)
    }catch(error){if(fileRevision.current===rev)setFileError(error instanceof Error?error.message:String(error))}
    finally{if(fileRevision.current===rev)setFileLoading(false)}
  }
  return <section className="diff-panel" aria-label="文件变更">
    <div className="diff-toolbar"><span>{loading?'正在读取变更…':data?.available?`${data.stats?.filesCount ?? data.files.length} 个文件`:'文件变更'}</span>
      <button className="secondary" disabled={!enabled||loading} onClick={()=>void refresh()}>刷新</button></div>
    {error&&<p role="alert" className="error-text">{error}</p>}
    {!enabled&&<p className="diff-empty">当前会话未接入执行器，暂时无法读取工作目录变更。</p>}
    {data&&!data.available&&<p className="diff-empty">当前目录没有可用的 Git 变更。仓库未初始化或正在合并时，变更视图可能不可用。</p>}
    {data?.available&&!data.files.length&&<p className="diff-empty">工作目录没有待查看的变更。</p>}
    {!!data?.files.length&&<div className="diff-workspace"><div className="diff-file-sidebar">
      <nav className="diff-files" aria-label="变更文件列表">{data.files.map(file=><button key={file.path} type="button"
        aria-pressed={selected===file.path} onClick={()=>void choose(file)}>
        <span className="diff-path">{file.path}</span><span className="diff-file-meta">{file.isBinary?'二进制':file.isUntracked?'新增文件':<><span className="diff-add-count">+{file.linesAdded}</span> <span className="diff-remove-count">−{file.linesRemoved}</span></>}</span>
      </button>)}</nav>
      {data.stats&&data.stats.filesCount>data.files.length&&<p className="diff-empty">当前列出 {data.files.length} / {data.stats.filesCount} 个文件（执行器列表上限）。</p>}
      </div><div className="diff-preview-area">{!selected&&<p className="diff-empty">选择文件查看具体改动。</p>}
      {detail&&<div className="diff-detail" key={selected}><div className="diff-detail-title">{detail.path}</div>
        {fileLoading?<p role="status" className="diff-empty">正在读取文件…</p>:fileError?<p role="alert" className="error-text">{fileError}</p>:<DiffFileContent file={detail}/>}</div>}
    </div></div>}
  </section>
}
