import {observeSharedTasks} from '../observeSharedTasks.js'
import {DiffPanel} from './DiffPanel.js'
import React, { useEffect, useRef, useState } from 'react'
import { sessionSettingsAccess } from './sessionSettings.js'
import type { ServeSnapshot } from '../serveSession.js'
import { newOperationId, type Capabilities, type SessionSummary, type WebAPI } from './client.js'
import { PUBLIC_COMMANDS, checkedCheckpoints, type PublicCheckpoint, checkedMemoryFiles, checkedMemoryRead, checkedRewindPreview,
  checkedTagResult, checkedTasks, checkedTextExport, helpEntries, listResumableSessions,
  nextPublicControls, publicCommandAvailable, publicRequestCurrent, publicSessionStatus, publicWorkerControl, type PublicCommandName, type PublicMemoryFile,
  type PublicCommandRequest, type PublicTask } from './publicCommandAdapters.js'

export type PublicCommandPanelProps = {
  api: WebAPI
  session: ServeSnapshot
  capabilities: Capabilities
  onTurn?: (text: string) => void
  /** App owns selection and subscription; this panel never swaps a worker itself. */
  onResumeSession?: (sessionId: string) => void
  /** A palette opens one focused operation; do not render the legacy button wall. */
  initialCommand?: PublicCommandName
  compact?: boolean
  taskRevision?: number
}

export const PUBLIC_COMMAND_LABELS: Record<PublicCommandName, string> = {
  help:'帮助', status:'状态', doctor:'诊断', diff:'变更', resume:'继续会话', session:'会话',
  skills:'技能', plugin:'插件', hooks:'钩子', memory:'记忆', branch:'分支', tag:'标签',
  export:'导出', rewind:'回退文件', tasks:'任务',
}

function outputText(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value ?? {}, null, 2)
}

const taskStatusLabels:Record<string,string>={pending:'等待中',running:'执行中',completed:'已完成',failed:'失败',killed:'已停止'}

export function PublicCommandPanel({ api, session, capabilities, onResumeSession, initialCommand = 'help', compact = false, taskRevision = 0 }: PublicCommandPanelProps) {
  const [command, setCommand] = useState<PublicCommandName>(initialCommand)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [sessions, setSessions] = useState<SessionSummary[]>([])
  const [selectedResume, setSelectedResume] = useState('')
  const [pendingResumeConfirmation, setPendingResumeConfirmation] = useState('')
  const [messageId, setMessageId] = useState('')
  const [checkpoints,setCheckpoints]=useState<PublicCheckpoint[]>([])
  const [checkpointsEnabled,setCheckpointsEnabled]=useState<boolean|null>(null)
  const [preview, setPreview] = useState<{sessionId:string; target:string; data:ReturnType<typeof checkedRewindPreview>} | null>(null)
  const [taskId, setTaskId] = useState('')
  const [tasks, setTasks] = useState<PublicTask[]>([])
  const [tasksLoading,setTasksLoading]=useState(false)
  const taskRevisionSeen=useRef(taskRevision)
  const taskChanged=useRef<()=>void>(()=>{}),refreshTasks=useRef<()=>void>(()=>{})
  const [memoryFiles, setMemoryFiles] = useState<PublicMemoryFile[]>([])
  const [memoryId, setMemoryId] = useState('')
  const [memoryContent, setMemoryContent] = useState('')
  const [memoryHash, setMemoryHash] = useState('')
  const [memoryRedacted, setMemoryRedacted] = useState(false)
  const [memorySavePending,setMemorySavePending]=useState(false)
  const [tagInput, setTagInput] = useState('')
  const [pendingTagRemoval, setPendingTagRemoval] = useState('')
  const [branchTitle, setBranchTitle] = useState('')
  const [sessionTitle, setSessionTitle] = useState(session.title ?? '')
  const pendingBranch = useRef<{ key:string; operationId:string } | null>(null)
  const pendingMutations = useRef(new Map<string,string>())
  const sessionKey = useRef(session.sessionId)
  const requestRevision = useRef(0)
  const requestLock = useRef(false)
  const catalog = useRef<{sessionId:string; controls:readonly string[]}>(
    {sessionId:session.sessionId, controls:capabilities.localWeb?.controls ?? []})
  if (sessionKey.current !== session.sessionId) {
    sessionKey.current = session.sessionId
    requestRevision.current++
    requestLock.current = false
  }
  // Retain last advertised controls across transient command-change frames;
  // a different session starts with an empty/independent catalog.
  catalog.current = nextPublicControls(catalog.current,session.sessionId,capabilities)
  const controls = catalog.current.controls
  const available = (name:PublicCommandName) => publicCommandAvailable(name,capabilities,controls)
  const visibleCommands = PUBLIC_COMMANDS.filter(name => name !== 'tag' || controls.includes('local_public_tag'))

  useEffect(() => { setOutput(''); setError(''); setPreview(null); setMemoryFiles([]); setTasks([]);
    setMemoryContent(''); setMemoryHash(''); setMemoryRedacted(false); setMemorySavePending(false); setPendingTagRemoval('');
    setSelectedResume(session.sessionId); setPendingResumeConfirmation(''); setMessageId(''); setCheckpoints([]); setCheckpointsEnabled(null); setTaskId(''); setMemoryId('');
    setTagInput(''); setBranchTitle(''); setSessionTitle(session.title ?? ''); setBusy(false); pendingBranch.current = null;
    pendingMutations.current.clear() }, [session.sessionId])
  useEffect(() => () => { requestRevision.current++; requestLock.current = false }, [])
  const run = async (task: (isCurrent: () => boolean) => Promise<unknown>) => {
    if (requestLock.current) return
    requestLock.current = true
    const expectedSession = session.sessionId, revision = ++requestRevision.current
    const isCurrent = () => publicRequestCurrent(expectedSession,revision,sessionKey.current,requestRevision.current)
    setBusy(true); setError('')
    try { const result = await task(isCurrent); if (isCurrent()) setOutput(outputText(result)) }
    catch (cause) { if (isCurrent()) setError(cause instanceof Error ? cause.message : String(cause)) }
    finally { if (isCurrent()) { requestLock.current = false; setBusy(false) } }
  }
  const mutate = async (request: PublicCommandRequest) => {
    const key = JSON.stringify([session.sessionId, request])
    let operationId = pendingMutations.current.get(key)
    if (!operationId) { operationId = newOperationId(); pendingMutations.current.set(key, operationId) }
    const response = await publicWorkerControl(api, session.sessionId, request, operationId)
    pendingMutations.current.delete(key)
    return response
  }
  const open = (name: PublicCommandName) => {
    if (name !== command) {
      requestRevision.current++; requestLock.current = false; setBusy(false)
      setCommand(name); setMemorySavePending(false); setPendingResumeConfirmation(''); setOutput(''); setError(''); setPreview(null); setPendingTagRemoval('')
    }
    if (name === 'resume') void run(async isCurrent => {
      const list = await listResumableSessions(api)
      if (isCurrent()) { setSessions(list); setSelectedResume(value => value || session.sessionId) }
      return `${list.length} 个可选择的会话。选择后需明确点击继续。`
    })
  }
  useEffect(() => { if (compact && initialCommand === 'resume') open('resume') }, [compact, initialCommand, session.sessionId])
  const loadCheckpoints=()=>void run(async isCurrent=>{
    const result=checkedCheckpoints(await publicWorkerControl(api,session.sessionId,{subtype:'local_public_checkpoints'}))
    if(isCurrent()){
      setCheckpoints(result.checkpoints);setCheckpointsEnabled(result.enabled);setPreview(null)
      setMessageId(previous=>result.checkpoints.some(point=>point.messageId===previous)?previous:result.checkpoints[0]?.messageId??'')
    }
    return ''
  })
  useEffect(()=>{if(command==='rewind'&&!session.closed&&available('rewind'))loadCheckpoints()},[command,session.sessionId,controls.includes('local_public_checkpoints')])

  useEffect(()=>{
    if(command!=='tasks'||session.closed||!available('tasks')){setTasksLoading(false);return}
    const abort=new AbortController()
    taskRevisionSeen.current=taskRevision
    refreshTasks.current=observeSharedTasks({
      async listTasks(signal){
        setTasksLoading(true)
        try{return checkedTasks(await publicWorkerControl(api,session.sessionId,{subtype:'local_public_tasks'},undefined,signal))}
        finally{if(!signal?.aborted)setTasksLoading(false)}
      },
      subscribeTaskChanges(listener){taskChanged.current=listener;return()=>{taskChanged.current=()=>{}}},
    },abort.signal,next=>{setTasks(next);setOutput(`${next.length} 个后台任务`);setError('')},setError)
    return ()=>{abort.abort();refreshTasks.current=()=>{}}
  },[api,command,session.sessionId,session.executorGeneration,session.closed,controls.includes('local_public_tasks')])
  useEffect(()=>{if(taskRevisionSeen.current!==taskRevision){taskRevisionSeen.current=taskRevision;taskChanged.current()}},[taskRevision])

  const invoke = () => {
    if (command === 'help') { setOutput([
      `Web 当前可用操作：${visibleCommands.filter(name => available(name) &&
        (!session.closed || ['help','status','resume','session'].includes(name))).map(name => `/${name}`).join(' ')}`,
      '当前执行器公布的命令（终端专用项不由 Web 文本框代执行）：',
      ...(helpEntries(capabilities).filter(item => item.name !== '/tag' || controls.includes('local_public_tag'))
        .map(item => `${item.name} ${item.description}`)),
    ].join('\n')); return }
    if (command === 'status') { void run(async () => ({
      ...publicSessionStatus(session),
      ...(!session.closed ? { 使用量: await publicWorkerControl(api, session.sessionId, { subtype:'get_usage' }) } : {}),
    })); return }
    if (command === 'session') { setOutput(outputText(publicSessionStatus(session))); return }
    if (command === 'doctor') { void run(() => publicWorkerControl(api, session.sessionId,
      { subtype:'local_public_doctor' })); return }
    if (command === 'skills') { void run(() => publicWorkerControl(api, session.sessionId, { subtype:'get_skills_dialog' })); return }
    if (command === 'plugin') { void run(() => publicWorkerControl(api, session.sessionId, { subtype:'reload_plugins' })); return }
    if (command === 'hooks') { void run(() => publicWorkerControl(api, session.sessionId, { subtype:'get_hooks_listing' })); return }
    if (command === 'tasks') {refreshTasks.current(); return}
    if (command === 'export') { void run(async isCurrent => {
      const { filename, content } = checkedTextExport(await publicWorkerControl(api, session.sessionId, { subtype:'local_public_export' }))
      if (!isCurrent()) return '会话已切换；已丢弃旧导出结果'
      const url = URL.createObjectURL(new Blob([content], { type:'text/plain;charset=utf-8' }))
      try {
        const anchor = document.createElement('a')
        anchor.href = url; anchor.download = filename
        anchor.click()
      } finally { setTimeout(() => URL.revokeObjectURL(url), 0) }
      return `已按原 /export 渲染器下载 ${filename}`
    }); return }
    if (command === 'memory') { void run(async isCurrent => {
      const files = checkedMemoryFiles(await publicWorkerControl(api, session.sessionId,
        { subtype:'local_public_memory', action:'list' }))
      if (isCurrent()) {
        setMemoryFiles(files); setMemorySavePending(false)
        if (!files.some(file => file.id === memoryId)) {
          setMemoryId(files[0]?.id ?? ''); setMemoryHash(''); setMemoryContent(''); setMemoryRedacted(false)
        }
      }
      return `${files.length} 个可选记忆文件`
    }); return }
    if (command === 'tag') { void run(async isCurrent => {
      const tag = tagInput.trim()
      if (!tag) throw new Error('请填写标签')
      const result = checkedTagResult(await mutate(
        { subtype:'local_public_tag', tag }))
      if (isCurrent()) setPendingTagRemoval(result.confirmationRequired ? tag : '')
      return result
    }); return }
    if (command === 'branch') { void run(async isCurrent => {
      const key = `${session.sessionId}\n${branchTitle.trim()}`
      const operation = pendingBranch.current?.key === key ? pendingBranch.current : { key, operationId:newOperationId() }
      pendingBranch.current = operation
      const child = await api.request<SessionSummary>(`/v1/sessions/${encodeURIComponent(session.sessionId)}/branch`,
        { method:'POST', body:JSON.stringify({ operationId:operation.operationId,
          ...(branchTitle.trim() ? { title:branchTitle.trim() } : {}) }) })
      if (!child || typeof child.sessionId !== 'string' || !child.sessionId) throw new Error('服务未返回新的分支会话')
      if (isCurrent()) { pendingBranch.current = null; onResumeSession?.(child.sessionId) }
      return `已创建并选择分支会话 ${child.title ?? child.sessionId}`
    }); return }
  }
  const previewRewind = () => void run(async isCurrent => {
    const target = messageId.trim()
    if (!target) throw new Error('请选择回退位置')
    const result = checkedRewindPreview(await publicWorkerControl(api, session.sessionId,
      { subtype:'rewind_files', user_message_id:target, dry_run:true }))
    if (isCurrent() && messageId.trim() === target) setPreview({ sessionId:session.sessionId, target, data:result })
    return ''
  })
  const confirmRewind = () => void run(async isCurrent => {
    if (!preview?.data.canRewind || preview.target !== messageId.trim() || preview.sessionId !== session.sessionId)
      throw new Error('请先取得当前会话与消息的可回退预览')
    // Confirmation is the explicit button on the current preview, not a second
    // browser-native dialog. No catalog/selection/preview action writes files.
    const result = checkedRewindPreview(await mutate(
      { subtype:'rewind_files', user_message_id:messageId.trim(), dry_run:false, confirm:true }))
    if (isCurrent()) setPreview(null)
    return result.canRewind ? '文件已回退；会话记录保持不变。' : result.error ?? '文件未回退。'
  })
  const chooseResume = () => {
    const selected = sessions.find(item => item.sessionId === selectedResume)
    if (!selectedResume || !selected) { setError('请选择当前列表中的会话'); return }
    if (sessionSettingsAccess(selected).canResume) {
      setPendingResumeConfirmation(selected.sessionId)
      setError('')
      return
    }
    // A live session is only selected; it is never passed through the resume endpoint.
    setPendingResumeConfirmation('')
    setError('')
    onResumeSession?.(selected.sessionId)
    setOutput(`已选择会话 ${selected.sessionId}`)
  }
  const continueChosen = () => void run(async isCurrent => {
    const selected = sessions.find(item => item.sessionId === selectedResume)
    if (!selected) throw new Error('所选会话不在当前列表')
    const {canResume} = sessionSettingsAccess(selected)
    if (!canResume || pendingResumeConfirmation !== selected.sessionId) throw new Error('请先确认恢复当前已结束的会话')
    const next = await api.continueSession(selected.sessionId)
    if (isCurrent()) { setPendingResumeConfirmation(''); onResumeSession?.(next.sessionId) }
    return `已选择会话 ${next.sessionId}`
  })
  const rename = () => void run(async () => {
    const title = sessionTitle.trim()
    if (!title) throw new Error('标题不能为空')
    return (await api.control(session.sessionId, { subtype:'rename_session', title })).response ?? '标题更新已发送'
  })
  const stopTask = () => void run(async isCurrent => {
    if (!taskId.trim()) throw new Error('请填写任务 ID')
    await mutate({ subtype:'stop_task', task_id:taskId.trim() })
    if (!isCurrent()) return '会话已切换'
    const value = checkedTasks(await publicWorkerControl(api, session.sessionId, { subtype:'local_public_tasks' }))
    if (isCurrent()) setTasks(value)
    return `已发送停止请求；当前记录 ${value.length} 个后台任务`
  })
  const readMemory = () => void run(async isCurrent => {
    if (!memoryId || !memoryFiles.some(file => file.id === memoryId)) throw new Error('请先从当前列表选择记忆文件')
    setMemorySavePending(false)
    const result = checkedMemoryRead(await publicWorkerControl(api, session.sessionId,
      { subtype:'local_public_memory', action:'read', id:memoryId }))
    if (isCurrent() && memoryId === result.id) {
      setMemoryContent(result.content); setMemoryHash(result.contentHash); setMemoryRedacted(result.redacted)
    }
    return result.redacted ? '文件包含已隐藏内容，此视图保持只读。' : '已读取原记忆文件，可编辑并保存。'
  })
  const writeMemory = () => void run(async isCurrent => {
    if (!memoryId || !memoryHash || memoryRedacted) throw new Error('请先读取可编辑的记忆文件')
    if (!memorySavePending) throw new Error('请先确认要保存的记忆文件')
    const value = await mutate(
      { subtype:'local_public_memory', action:'write', id:memoryId, content:memoryContent, expectedHash:memoryHash })
    const row = value && typeof value === 'object' ? value as Record<string, unknown> : null
    if (row?.written !== true || typeof row.contentHash !== 'string') throw new Error('执行器未确认记忆文件已保存')
    if (isCurrent()) { setMemoryHash(row.contentHash); setMemorySavePending(false) }
    return '记忆文件已保存'
  })
  const removeTag = () => void run(async isCurrent => {
    const tag = pendingTagRemoval
    if (!tag || tag !== tagInput.trim()) throw new Error('标签状态已变化，请重新读取')
    if (!globalThis.confirm(`确认移除标签 ${tag}？`)) return '已取消'
    const result = checkedTagResult(await mutate(
      { subtype:'local_public_tag', tag, confirmRemove:true }))
    if (isCurrent()) setPendingTagRemoval('')
    return result
  })

  return <section className={`tool-block ${compact ? 'public-command-compact' : ''}`} aria-label="公共命令" data-public-command-panel>
    {!compact && <div className="tool-title">公共命令 · 由当前会话执行器处理</div>}
    {!compact && <nav aria-label="公共命令列表" className="worker-controls">
      {visibleCommands.map(name => <button key={name} type="button" className="secondary" aria-current={command === name ? 'page' : undefined}
        onClick={() => open(name)}>/{name} · {PUBLIC_COMMAND_LABELS[name]}</button>)}
    </nav>}
    <div className="ask-card">
      {!compact && command !== 'diff' && <strong>/{command} · {PUBLIC_COMMAND_LABELS[command]}</strong>}
      {command === 'diff' && <DiffPanel key={session.sessionId} api={api} sessionId={session.sessionId} enabled={!session.closed && available('diff')}/>}
      {command === 'help' && <><p>当前执行器公布的命令目录如下；终端专用项由本面板的 Web 业务操作承接，不作为模型文本执行。</p>
        <ul aria-label="执行器公布的命令">{helpEntries(capabilities).map(item =>
          <li key={item.name}><code>{item.name}</code> {item.description}</li>)}</ul></>}
      {command === 'resume' && <><label className="ask-text-label">选择已有会话
        <select aria-label="选择继续的会话" value={selectedResume} disabled={busy} onChange={event => {setSelectedResume(event.target.value);setPendingResumeConfirmation('');setError('')}}>
          <option value="">请选择</option>{sessions.map(item => <option key={item.sessionId} value={item.sessionId}>{item.title || item.sessionId} · {sessionSettingsAccess(item).canControl ? '已接入' : sessionSettingsAccess(item).canResume ? '已结束 · 可恢复' : '仅查看'}</option>)}
        </select></label><button className="secondary" disabled={busy || !selectedResume || !onResumeSession} onClick={chooseResume}>{sessionSettingsAccess(sessions.find(item => item.sessionId === selectedResume)).canResume ? '恢复所选会话' : '打开所选会话'}</button>
        {pendingResumeConfirmation && pendingResumeConfirmation === selectedResume && sessionSettingsAccess(sessions.find(item => item.sessionId === selectedResume)).canResume && <div className="memory-confirm" role="group" aria-labelledby="resume-confirmation-title">
          <p id="resume-confirmation-title">恢复已结束的会话「{sessions.find(item => item.sessionId === selectedResume)?.title || selectedResume}」？</p>
          <div className="ask-actions"><button className="primary" disabled={busy} onClick={continueChosen}>确认恢复</button>
            <button className="secondary" disabled={busy} onClick={() => setPendingResumeConfirmation('')}>取消</button></div>
        </div>}</>}
      {command === 'session' && <div className="ask-actions"><label className="ask-text-label">会话标题
        <input aria-label="会话标题" value={sessionTitle} disabled={busy} onChange={event => setSessionTitle(event.target.value)} /></label>
        <button className="secondary" disabled={busy || session.closed || !sessionTitle.trim()} onClick={rename}>更改标题</button></div>}
      {command === 'rewind' && <div className="rewind-panel">
        <p className="muted">恢复到所选消息发送前的文件状态，不删除会话记录，也不重新执行命令。</p>
        <button className="secondary" disabled={busy||session.closed||!available('rewind')} onClick={loadCheckpoints}>刷新检查点</button>
        {checkpointsEnabled===false&&<p role="status">此会话未启用文件检查点，已有改动无法通过此处回退。</p>}
        {checkpointsEnabled===true&&!checkpoints.length&&<p role="status">此会话还没有可回退的检查点。</p>}
        {!!checkpoints.length&&<><label className="ask-text-label">回退位置
          <select aria-label="选择回退位置" value={messageId} disabled={busy} onChange={event=>{setMessageId(event.target.value);setPreview(null)}}>
            {checkpoints.map(point=><option key={point.messageId} value={point.messageId}>{new Date(point.timestamp).toLocaleString()} · {point.label}</option>)}
          </select></label>
          <button className="secondary" disabled={busy||session.closed||!messageId} onClick={previewRewind}>预览文件改动</button>
          {preview&&<div className="rewind-preview">{preview.data.error?<p role="status">{preview.data.error}</p>:<><p>{preview.data.filesChanged.length} 个文件 · +{preview.data.insertions} / −{preview.data.deletions}</p>
            <ul>{preview.data.filesChanged.map(path=><li key={path}>{path}</li>)}</ul></>}
            <button className="primary" disabled={busy||!preview.data.canRewind||preview.target!==messageId||preview.sessionId!==session.sessionId} onClick={confirmRewind}>确认回退文件</button>
          </div>}
        </>}
      </div>}
      {command === 'tasks' && <div className="ask-actions task-controls"><label className="ask-text-label">停止指定后台任务（可选）
        <input aria-label="后台任务 ID" value={taskId} disabled={busy} onChange={event => setTaskId(event.target.value)} /></label>
        <button className="secondary" disabled={busy || session.closed || !taskId.trim()} onClick={stopTask}>停止任务</button>
        {tasks.length > 0 && <ul className="task-list" aria-label="后台任务列表">{tasks.map(task => <li key={task.id}>
          <div className="task-description"><strong>{task.description}</strong><code>{task.id}</code></div>
          <span className="task-state">{taskStatusLabels[task.status] ?? task.status}</span>
          <button type="button" className="secondary" aria-label={`选择任务 ${task.id}`} aria-pressed={taskId === task.id} disabled={busy} onClick={() => setTaskId(task.id)}>选择</button>
        </li>)}</ul>}</div>}
      {command === 'memory' && <div className="memory-editor"><label className="ask-text-label">记忆文件
        <select aria-label="选择记忆文件" value={memoryId} disabled={busy} onChange={event => {setMemoryId(event.target.value); setMemoryHash(''); setMemoryContent(''); setMemoryRedacted(false); setMemorySavePending(false); setOutput(''); setError('')}}>
          <option value="">请先列出文件</option>{memoryFiles.map(file => <option key={file.id} value={file.id}>{file.label} · {file.exists ? '已存在' : '待创建'}</option>)}
        </select></label><button className="secondary" disabled={busy || !memoryId} onClick={readMemory}>读取文件</button>
        {memoryHash && <><label className="ask-text-label memory-content">文件内容
          <textarea aria-label="记忆文件内容" value={memoryContent} readOnly={memoryRedacted} disabled={busy} onChange={event => {setMemoryContent(event.target.value);setMemorySavePending(false)}} rows={12} />
        </label>{memorySavePending ? <div className="memory-confirm" role="group" aria-label="确认保存记忆">
          <p>将保存到 {memoryFiles.find(file=>file.id===memoryId)?.label}。此文件会作为后续会话的项目或个人记忆。</p>
          <div className="ask-actions"><button className="primary" disabled={busy||memoryRedacted||session.closed} onClick={writeMemory}>确认写入</button>
            <button className="secondary" disabled={busy} onClick={()=>setMemorySavePending(false)}>取消保存</button></div>
        </div> : <button className="secondary" disabled={busy||memoryRedacted||session.closed} onClick={()=>setMemorySavePending(true)}>保存修改</button>}</>}</div>}
      {command === 'tag' && <div className="ask-actions"><label className="ask-text-label">标签
        <input aria-label="会话标签" value={tagInput} maxLength={128} disabled={busy} onChange={event => {setTagInput(event.target.value); setPendingTagRemoval('')}} /></label>
        {pendingTagRemoval && <button className="secondary" disabled={busy} onClick={removeTag}>确认移除同名标签</button>}</div>}
      {command === 'branch' && <label className="ask-text-label">分支标题（可选）
        <input aria-label="分支标题" value={branchTitle} maxLength={100} disabled={busy} onChange={event => setBranchTitle(event.target.value)} /></label>}
      {!available(command) && <p role="status">{capabilities.localWeb || session.capabilities?.localWeb || controls.length
        ? '当前执行器未公布此 Web 业务控制。' : '正在读取执行器业务能力。'}</p>}
      {session.closed && !['help','status','session','resume'].includes(command) && <p role="status">此会话已停止，管理操作只读。</p>}
      {!['resume', 'rewind', 'diff'].includes(command) && <button className="primary" disabled={busy || !available(command) ||
        (command === 'branch' && !onResumeSession) || (session.closed && !['help','status','session'].includes(command))}
        onClick={invoke}>{busy ? '处理中…' : command === 'plugin' ? '从当前执行器刷新插件' : command === 'branch' ? '创建分支会话' : command === 'memory' ? '列出记忆文件' : `查看 /${command}`}</button>}
      {command === 'rewind' && output && !preview && <p role="status">{output}</p>}
      {tasksLoading && command==='tasks' && <p role="status">正在读取任务…</p>}
      {busy && <p role="status">正在处理 /{command}，请稍候…</p>}
      {error && <p role="alert" className="error-text">{error}</p>}
      {output && command !== 'rewind' && <pre className="raw" aria-live="polite">{output}</pre>}
    </div>
  </section>
}
