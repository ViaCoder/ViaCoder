import {AttachmentCard} from './AttachmentCard.js'
import {taskListChanged} from '../sharedTaskEvents.js'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { WebAPI, WebRequestError, newOperationId, type Capabilities, type Command, type HostInfo, type SessionSummary, type WebControl } from './client.js'
import { object, formatValue, resolvedInteractions, toDisplayRecords, thinkingText, type RecordView } from './records.js'
import type { ServeEvent } from '../serveSession.js'
import { shouldSubmitOnEnter } from './upstream/sendShortcut.js'
import { useWorkspaceAdaptiveLayout } from './upstream/useWorkspaceAdaptiveLayout.js'
import { AskUserCard } from './AskUserCard.js'
import { ComputerUseWebApproval287 } from '../../utils/computerUse/ComputerUseWebApproval287.js'
import { PlanApprovalCard } from './PlanApprovalCard.js'
import { ElicitationCard } from './ElicitationCard.js'
import { composeTurnContent, readSupportedAttachment, type ImageAttachment } from './attachments.js'
import { PermissionRulesPanel } from './PermissionRulesPanel.js'
import { PermissionModePicker } from './PermissionModePicker.js'
import { EffortControl } from './EffortControl.js'
import { HostDirectoryPicker } from './HostDirectoryPicker.js'
import { PublicCommandPanel, PUBLIC_COMMAND_LABELS } from './PublicCommandPanel.js'
import { PUBLIC_COMMANDS, publicCommandAvailable, type PublicCommandName } from './publicCommandAdapters.js'
import type { PermissionUpdate } from '../../types/permissions.js'
import type { PermissionRulesState } from '../../cli/control/permissionRules.js'
import { mergeJournalEvents, mergeSessionSnapshots, sessionDisplayTitle, sessionTitleSaveStatus } from './sessionState.js'
import { useHistory } from './useHistory.js'
import { VirtualTranscript, type VirtualTranscriptHandle } from './VirtualTranscript.js'
import { isPureToolResultRecord, presentationForBlock, toolPresentations, toolSessionKey, type ToolPresentation } from './toolPresentation.js'
import { connectionPresentation } from './connectionPresentation.js'
import { hasPersistedOutputMarker, recordedOutputReferenceForBlock, recordedOutputReferencesFromEvents, type RecordedOutputReference } from './recordedOutputReference.js'
import { RecordedOutput } from './RecordedOutput.js'
import { currentExecutorCapabilities, createRequestScope, sessionSettingsAccess, readonlySettingsReason } from './sessionSettings.js'
import {submissionRecords,type LocalSubmission} from './submissionState.js'
import {RecordStatus} from './RecordStatus.js'
import {getSlashCandidates,selectSlashCandidate,expandSlashToken,removeSlashToken,serializeSlashComposer,type SlashToken,type SlashDraft} from './slashComposer.js'
import {ToolCallCard} from './ToolCallCard.js'
import {groupToolCalls,approvalLabel,presentationSourceKeys,type ApprovalLabel} from './toolCallGrouping.js'
import {ModelPicker} from './ModelPicker.js'
import { CopyButton } from './CopyButton.js'
import { useComposerCommandMenu } from './useComposerCommandMenu.js'
import { version } from '../../../package.json'

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, string> = { terminal:'m5 7 5 5-5 5M13 17h6', plus:'M12 5v14M5 12h14', menu:'M4 6h16M4 12h16M4 18h16', close:'m6 6 12 12M6 18 18 6', send:'m5 12 7-7 7 7M12 5v14', search:'m21 21-5-5M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14', detail:'M4 4h16v16H4zM14 4v16M7 8h4M7 12h4', down:'m6 9 6 6 6-6', chat:'M4 4h16v12H9l-5 4z', check:'m5 12 4 4L19 6', arrow:'m9 5 7 7-7 7', clock:'M12 8v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18' }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] ?? paths.chat} /></svg>
}
function Markdown({ text }: { text: string }) {
  // Same mature rendering pair used upstream. Raw HTML is sanitized, and
  // embedded remote images are not fetched on merely opening a transcript.
  const html = useMemo(() => DOMPurify.sanitize(marked.parse(text, { async: false }) as string, {
    FORBID_TAGS: ['img','iframe','style','form','input','video','audio'], FORBID_ATTR: ['style'],
  }), [text])
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
}
function Raw({ value }: { value: unknown }) { return <pre className="raw">{formatValue(value)}</pre> }
function Block({ block, expanded, full, onToggle, presentation, api, outputReference }: { block: Record<string, unknown>; expanded: boolean; full: boolean; onToggle: () => void; presentation?: ToolPresentation; api: WebAPI; outputReference: RecordedOutputReference | null }) {
  if (block.type === 'text') return null
  if (block.type === 'local_file') return <AttachmentCard name={String(block.title ?? '附件')} source={object(block.source)} />
  if (block.type === 'unassociated_opaque') {
    const sourceEvents = Array.isArray(block.events) ? block.events : []
    return <details className="thinking-block thinking-unassociated" open={full || expanded}><summary onClick={event => {event.preventDefault();if (!full) onToggle()}}>查看完整原始值（{sourceEvents.length} 条事件）</summary>
      {(full || expanded) && <div className="thinking-raw-body"><CopyButton value={formatValue(sourceEvents)} label="复制原始事件" /><Raw value={sourceEvents} /></div>}</details>
  }
  if (block.type === 'image') {
    const source = object(block.source)
    if (source?.type === 'base64' && ['image/png','image/jpeg','image/gif','image/webp'].includes(String(source.media_type)) && typeof source.data === 'string') return <img className="record-image" alt="会话图片" src={`data:${source.media_type};base64,${source.data}`} />
  }
  if (block.type === 'document' && object(block.source)?.media_type === 'application/pdf')
    return <AttachmentCard name={typeof block.title === 'string' ? block.title : 'PDF 文档'} source={object(block.source)} />
  if (block.type === 'thinking' || block.type === 'redacted_thinking') {
    const plain = thinkingText(block), signature = typeof block.signature === 'string' ? block.signature : null
    const encrypted = block.type === 'redacted_thinking' ? block.data : undefined
    const hasRaw = signature !== null || encrypted !== undefined
    const label = plain ? '思考' : [encrypted !== undefined ? '加密思考块' : '', signature !== null ? '思考签名' : ''].filter(Boolean).join(' · ') || '思考'
    return <section className={`thinking-block ${plain ? '' : 'thinking-opaque'}`}><div className="thinking-label">{label}{!plain && ' · 无可读正文'}</div>
      {plain && <div className="thinking-body">{plain}</div>}
      {hasRaw && <details className="thinking-raw" open={full || expanded}><summary onClick={event => {event.preventDefault();if (!full) onToggle()}}>{plain ? `${signature !== null ? '思考签名' : ''}${signature !== null && encrypted !== undefined ? ' · ' : ''}${encrypted !== undefined ? '加密思考块' : ''} · ` : ''}查看原始数据</summary>
        {(full || expanded) && <div className="thinking-raw-body">{signature !== null && <><strong>思考签名</strong><pre>{signature}</pre><CopyButton value={signature} label="复制签名原值" /></>}{encrypted !== undefined && <><strong>加密思考块</strong><pre>{formatValue(encrypted)}</pre><CopyButton value={formatValue(encrypted)} label="复制加密原值" /></>}<details open={full}><summary onClick={event => {if (full) event.preventDefault()}}>完整块记录</summary><Raw value={block} /></details></div>}</details>}
    </section>
  }
  const title = presentation?.name ?? String(block.type ?? '内容块')
  return <details className="tool-block" open={full || expanded}><summary className="tool-title" onClick={event => {event.preventDefault();if (!full) onToggle()}}><span className="mono">{block.type === 'tool_use' ? '›_' : '↳'}</span><strong>{title}</strong>{presentation && <><span className={`tool-status ${presentation.status === '失败' ? 'tool-status-error' : ''}`}>{presentation.status}</span><span className="tool-summary">{presentation.summary}</span></>}</summary>{(full || expanded) && <><Raw value={block} />{outputReference ? <RecordedOutput api={api} reference={outputReference} /> : hasPersistedOutputMarker(block) ? <p className="recorded-output-missing" role="alert">外置输出引用未随此记录保存；未重新执行工具。</p> : null}</>}</details>
}
type RecordCardProps = { record: RecordView; decision: ApprovalLabel; full: boolean; presentations: Map<string, ToolPresentation>; api: WebAPI; resolved: boolean; actionKey: string; actionState: {busy:boolean;error:string}; setActionState: (key:string,state:{busy:boolean;error:string}) => void; expanded: Set<string>; toggleExpanded: (id:string) => void; onInspect: () => void; onApprove: (allowed: boolean, updatedInput?: Record<string, unknown>, updatedPermissions?: PermissionUpdate[], denial?: { message?: string; interrupt?: boolean }) => Promise<void>; onGetPlan: () => Promise<{ exists: false } | { exists: true; content: string }>; onElicit: (action: 'accept' | 'decline' | 'cancel', content?: Record<string, unknown>) => Promise<void> }
type ApprovalProps = Pick<RecordCardProps, 'record'|'full'|'resolved'|'decision'|'actionKey'|'actionState'|'setActionState'|'onApprove'|'onGetPlan'>
function ApprovalContent({record,full,resolved,decision,actionKey,actionState,setActionState,onApprove,onGetPlan}:ApprovalProps) {
  const {busy,error}=actionState
  const respond = async (allowed: boolean, updatedPermissions?: PermissionUpdate[], interrupt = false) => { if (busy) return; setActionState(actionKey,{busy:true,error:''}); try { await onApprove(allowed, undefined, updatedPermissions,
    interrupt ? { message: 'User denied and interrupted', interrupt: true } : undefined) } catch (e) { setActionState(actionKey,{busy:false,error:String(e)}); return } setActionState(actionKey,{busy:false,error:''}) }
  const suggestions = object(record.event.request)?.permission_suggestions
  if (record.event.type === 'permission_request' && resolved) return <div className="approval-outcome">{record.event.historical === true && <span>历史审批 · 仅查看 · </span>}{decision}</div>
  return <>{record.event.type === 'permission_request' && (record.event.historical === true
      ? <div><span className="badge">原会话历史交互 · 只读，不授权当前执行器</span><span className="badge">{decision}</span></div>
      : record.event.toolName === 'ComputerUseApproval'
      ? <ComputerUseWebApproval287 input={record.event.input} onAnswer={(allowed,answer) => onApprove(allowed,answer)} />
      : record.event.toolName === 'AskUserQuestion'
      ? <AskUserCard draftKey={actionKey} input={object(record.event.input) ?? {}} resolved={resolved}
          onSubmit={updatedInput => onApprove(true, updatedInput)} onCancel={() => onApprove(false)} />
      : record.event.toolName === 'ExitPlanMode'
      ? <PlanApprovalCard draftKey={actionKey} input={object(record.event.input) ?? {}} resolved={resolved}
          getPlan={onGetPlan}
          onAllow={mode => onApprove(true, object(record.event.input) ?? {}, [{ type: 'setMode', mode, destination: 'session' }])} onDeny={() => onApprove(false)} />
      : <div className="approval-actions">{resolved ? <span className="badge">{decision}</span> : <>
          <button disabled={busy} className="primary" onClick={() => void respond(true)}>允许本次</button>
          <button disabled={busy} className="secondary" onClick={() => void respond(false)}>拒绝</button>
          <details className="approval-more" open={full}><summary onClick={event=>{if(full)event.preventDefault()}}>更多选项</summary>
            {Array.isArray(suggestions) && suggestions.length > 0 && <><p>权限建议与保存范围（不会默认应用）</p><Raw value={suggestions} /><button disabled={busy} className="secondary" onClick={() => void respond(true, suggestions as PermissionUpdate[])}>允许并应用上述建议</button></>}
            <button disabled={busy} className="secondary" onClick={() => void respond(false, undefined, true)}>拒绝并中断本轮</button>
          </details>
        </>}{error && <p role="alert" className="error-text">{error}</p>}</div>)}</>
}
export function RecordCard({ record, decision, full, presentations, api, resolved, actionKey, actionState, setActionState, expanded, toggleExpanded, onInspect, onApprove, onGetPlan, onElicit }: RecordCardProps) {
  const system = record.kind === 'system'
  const pureToolResult = isPureToolResultRecord(record)
  const turnNotice = !full && system && (record.event.type === 'turn_interrupted' || record.event.type === 'turn_completed' || object(record.event.message)?.type === 'result')
  const showText = (!system || full || record.notice) && !(record.kind === 'approval' && ['AskUserQuestion','ExitPlanMode'].includes(String(record.event.toolName)))
  const hasTextBlock = Boolean(record.blocks?.some(block => block.type === 'text'))
  const fallbackAfterBlocks = Boolean(record.blocks?.some(block => block.type === 'thinking' || block.type === 'redacted_thinking'))
  const textNode = (value: string, key: string) => value && showText ? <div key={key} className="record-content">{record.kind === 'assistant' ? <Markdown text={value} /> : <pre className="plain-text">{value}</pre>}</div> : null
  const summaryOpen = full || expanded.has(`${record.id}:compact-summary`)
  const fallbackText = record.compactSummary && !full
    ? <details className="compact-summary" open={summaryOpen}><summary onClick={event=>{event.preventDefault();toggleExpanded(`${record.id}:compact-summary`)}}>查看完整压缩摘要</summary>{summaryOpen && <Markdown text={record.text} />}</details>
    : !hasTextBlock ? textNode(record.text, `${record.id}:text`) : null
  return <article className={`record record-${record.kind} ${turnNotice ? 'turn-notice' : ''} ${!full && (record.kind === 'assistant' || record.kind === 'user' && !pureToolResult) ? 'chat-message' : ''}`} data-seq={record.id}>
    <div className="record-heading"><span className={`avatar avatar-${pureToolResult ? 'tool' : record.kind}`}>{pureToolResult ? '⌘' : record.kind === 'assistant' ? '✳' : record.kind === 'user' ? <Icon name="chat" size={14} /> : system ? '·' : '⌘'}</span><strong>{pureToolResult ? '工具结果' : record.title}</strong>{Number.isFinite(record.at) && record.at > 0 && <time dateTime={new Date(record.at).toISOString()}>{new Date(record.at).toLocaleTimeString('zh-CN', { hour:'2-digit', minute:'2-digit' })}</time>}{record.text && <CopyButton className="message-copy" value={record.text} />}<button className="record-inspect" onClick={onInspect} title="查看完整事件" aria-label={`查看第 ${record.id} 条记录详情`}><Icon name="detail" size={16} /></button></div>
    <div className="message-body">
    <RecordStatus status={record.status} />
    {!fallbackAfterBlocks && fallbackText}
    {record.blocks?.map((block, i) => block.type === 'text' ? textNode(String(block.text ?? ''), `${record.id}:block:${i}`) : <Block key={i} block={block} api={api} outputReference={recordedOutputReferenceForBlock(record,block)} full={full} expanded={expanded.has(`${record.id}:block:${i}`)} onToggle={() => toggleExpanded(`${record.id}:block:${i}`)} presentation={block.type === 'tool_use' || block.type === 'tool_result' ? presentationForBlock(block, toolSessionKey(record.event.recordId, record.event.sessionId), full ? presentations : new Map()) : undefined} />)}
    {fallbackAfterBlocks && fallbackText}
    {record.event.type === 'elicitation_request' && <ElicitationCard draftKey={actionKey} request={object(record.event.request) ?? {}} resolved={resolved} onAnswer={onElicit} />}
    </div>
    <ApprovalContent record={record} full={full} resolved={resolved} decision={decision} actionKey={actionKey} actionState={actionState} setActionState={setActionState} onApprove={onApprove} onGetPlan={onGetPlan} />
    {full && <details className="event-details" open><summary onClick={event => event.preventDefault()}>原始事件 · #{record.id}</summary><Raw value={record.sourceEvents ?? record.event} /></details>}
  </article>
}
export function App() {
  const [token, setToken] = useState(() => sessionStorage.getItem('cc-serve-token') ?? '')
  const api = useMemo(() => new WebAPI(token), [token])
  const [sessions, setSessions] = useState<SessionSummary[]>([]), [selected, setSelected] = useState('')
  const [sessionsLoaded, setSessionsLoaded] = useState(false), [sessionsError, setSessionsError] = useState('')
  const [host, setHost] = useState<HostInfo | null>(null)
  const [hostLoading, setHostLoading] = useState(true), [hostError, setHostError] = useState(''), [hostRefreshEpoch, setHostRefreshEpoch] = useState(0)
  const [selectedCwd, setSelectedCwd] = useState<string | null>(null)
  const [resumeDirectoryFor, setResumeDirectoryFor] = useState<string | null>(null)
  const [resumeDirectories, setResumeDirectories] = useState<Record<string,string>>({})
  const [directoryPickerOpen, setDirectoryPickerOpen] = useState(false)
  const [creating, setCreating] = useState(false), [continuing, setContinuing] = useState(false)
  const [eventsBySession, setEventsBySession] = useState<Record<string, ServeEvent[]>>({})
  const [error, setError] = useState(''), [authRequired, setAuthRequired] = useState(false)
  const [syncErrors, setSyncErrors] = useState<Record<string,string>>({})
  const [drafts, setDrafts] = useState<Record<string,{input:string;attachments:ImageAttachment[];token?:SlashToken|null}>>({})
  const input = drafts[selected]?.input ?? '', attachments = drafts[selected]?.attachments ?? []
  const commandToken = drafts[selected]?.token ?? null
  const [slashCursor,setSlashCursor] = useState(0),[slashIndex,setSlashIndex] = useState(0),[slashDismissed,setSlashDismissed] = useState(false),[composing,setComposing] = useState(false)
  const setInput = (next: React.SetStateAction<string>) => setDrafts(previous => {
    const before = previous[selected] ?? {input:'',attachments:[]}
    return {...previous,[selected]:{...before,input:typeof next === 'function' ? next(before.input) : next}}
  })
  const setAttachments = (next: React.SetStateAction<ImageAttachment[]>) => setDrafts(previous => {
    const before = previous[selected] ?? {input:'',attachments:[]}
    return {...previous,[selected]:{...before,attachments:typeof next === 'function' ? next(before.attachments) : next}}
  })
  const [submissionsBySession,setSubmissionsBySession] = useState<Record<string,LocalSubmission[]>>({})
  const [sendingBySession, setSendingBySession] = useState<Record<string,boolean>>({})
  const [readingBySession, setReadingBySession] = useState<Record<string,boolean>>({})
  const sending = Boolean(sendingBySession[selected]), readingAttachments = Boolean(readingBySession[selected])
  const [editingTitle, setEditingTitle] = useState(false), [titleInput, setTitleInput] = useState(''), [titleBusy, setTitleBusy] = useState(false)
  const [controlBusyBySession, setControlBusyBySession] = useState<Record<string,boolean>>({})
  const controlBusy = Boolean(controlBusyBySession[selected])
  const [permissionRules, setPermissionRules] = useState<PermissionRulesState | null>(null)
  const [permissionRulesBusy, setPermissionRulesBusy] = useState(false)
  const [sidebar, setSidebar] = useState(false), [full, setFull] = useState(false)
  const [inspectedBySession, setInspectedBySession] = useState<Record<string,ServeEvent|null>>({})
  const [expandedBySession, setExpandedBySession] = useState<Record<string,Set<string>>>({})
  const [actionByRecord, setActionByRecord] = useState<Record<string,{busy:boolean;error:string}>>({})
  const setActionState = (key:string,state:{busy:boolean;error:string}) => setActionByRecord(previous => ({...previous,[key]:state}))
  const expanded = expandedBySession[selected] ?? new Set<string>()
  const toggleExpanded = (key:string, linkedKeys:string[] = []) => setExpandedBySession(previous => {
    const next = new Set(previous[selected] ?? [])
    const keys=[key,...linkedKeys],wasOpen=keys.some(id=>next.has(id))
    for (const id of keys) { if (wasOpen) next.delete(id); else next.add(id) }
    return {...previous,[selected]:next}
  })
  const inspected = inspectedBySession[selected] ?? null
  const setInspected = (value: ServeEvent|null) => setInspectedBySession(previous => ({...previous,[selected]:value}))
  const [unreadCount, setUnreadCount] = useState(0)
  const [search, setSearch] = useState(''), [commandOpen, setCommandOpen] = useState(false), [commandIndex, setCommandIndex] = useState(0)
  const [commandQuery, setCommandQuery] = useState(''), [publicDetail, setPublicDetail] = useState<PublicCommandName | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsError, setSettingsError] = useState('')
  const sessionScope = useRef(createRequestScope()).current
  const settingsScope = useRef(createRequestScope()).current
  const commandSearchRef = useRef<HTMLInputElement>(null)
  const slashMenuRef = useRef<HTMLDivElement>(null)
  const composerRef = useRef<HTMLDivElement>(null), commandMenuRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null), scrollRef = useRef<HTMLDivElement>(null)
  const virtualRef = useRef<VirtualTranscriptHandle>(null)
  const presentationAnchor = useRef<{session:string;id:string;offset:number;sources:string[]}|null>(null)
  const detailRef = useRef<HTMLElement>(null), pinned = useRef(true)
  const compactDetail = useWorkspaceAdaptiveLayout(detailRef, Boolean(inspected))
  const pendingSubmission = useRef<Record<string,{ key: string; id: string }>>({})
  const [followEpoch, setFollowEpoch] = useState(0)
  const resetScope = useRef(createRequestScope()).current
  resetScope.update([selected, followEpoch, api])
  const refreshGeneration = useRef(0)
  const selectedRef = useRef(selected)
  selectedRef.current = selected
  const selectSession = (id:string) => {
    setSelected(id); setCommandOpen(false); setSettingsOpen(false); setSlashDismissed(false); setSlashIndex(0); setComposing(false)
    setSidebar(false)
  }
  const refresh = async () => {
    const generation = ++refreshGeneration.current
    try { const list = await api.list(); if (generation === refreshGeneration.current) { setSessions(previous => mergeSessionSnapshots(previous, list)); setSessionsLoaded(true); setSessionsError(''); setAuthRequired(false) } return list }
    catch (e) { if (generation === refreshGeneration.current) { const message = (e as Error).message; setSessionsLoaded(true); setSessionsError(message); setAuthRequired(message === 'Unauthorized') } return [] }
  }
  useEffect(() => { setSessions([]); setSessionsLoaded(false); setSessionsError(''); void refresh(); const timer = setInterval(() => void refresh(), 5000); return () => { clearInterval(timer); refreshGeneration.current++ } }, [api])
  useEffect(() => {
    if (!selected) return
    const controller = new AbortController()
    const update = () => void api.request<SessionSummary>(`/v1/sessions/${encodeURIComponent(selected)}`, {}, controller.signal)
      .then(snapshot => { if (!controller.signal.aborted) setSessions(list => mergeSessionSnapshots(list,[snapshot])) },
        cause => { if (!controller.signal.aborted) setSyncErrors(previous => ({...previous,[selected]:(cause as Error).message})) })
    update()
    const timer = setInterval(update, 5000)
    return () => { controller.abort(); clearInterval(timer) }
  }, [api, selected])
  useEffect(() => {
    const controller = new AbortController()
    setHost(null); setHostLoading(true); setHostError('')
    void api.host(controller.signal).then(value => { if (!controller.signal.aborted) { setHost(value); setHostLoading(false) } }, cause => {
      if (!controller.signal.aborted) { setHostLoading(false); setHostError((cause as Error).message) }
    })
    return () => controller.abort()
  }, [api, hostRefreshEpoch])
  const history = useHistory({api,sessionId:selected || null,resetKey:followEpoch,onEvents:batch => {
    if (!pinned.current && selectedRef.current === selected) setUnreadCount(count => count + batch.length)
    for (const event of batch) {
      if (event.type === 'session_reset' && typeof event.nextSessionId === 'string' &&
        selectedRef.current === selected && sessions.some(session => session.sessionId === selected &&
          !session.closed && session.executorGeneration === event.executorGeneration)) {
        const nextId = event.nextSessionId
        const current = resetScope.capture()
        // The old route is already archived. Apply that fact before waiting
        // for its successor, so reopening history cannot replay this handoff.
        setSessions(previous => previous.map(session => session.sessionId === selected
          ? {...session, lastSeq:Math.max(session.lastSeq,event.seq), closed:true, activeOperationId:null, queuedOperationIds:[], executorState:{status:'closed' as const,canControl:false}}
          : session))
        void api.request<SessionSummary>(`/v1/sessions/${encodeURIComponent(nextId)}`).then(snapshot => {
          if (!current() || selectedRef.current !== selected) return
          setSessions(previous => mergeSessionSnapshots(previous, [snapshot]))
          setDrafts(previous => {
            if (!previous[selected] || previous[nextId]) return previous
            const next = {...previous, [nextId]:{...previous[selected]!,token:null}}
            delete next[selected]
            return next
          })
          selectSession(nextId)
        }, cause => { if (current() && selectedRef.current === selected) setError((cause as Error).message) })
      }
      if (event.type === 'title_state' && event.state && typeof event.state === 'object') {
        const state = event.state as SessionSummary['titleObservation']
        if (state?.session_id === selected) setSessions(list => mergeSessionSnapshots(list,
          list.filter(session => session.sessionId === selected).map(session => ({...session,titleObservation:state}))))
      }
      if (event.type === 'permission_rules_changed' && event.state && typeof event.state === 'object' && selectedRef.current === selected)
        setPermissionRules(previous => previous ? event.state as PermissionRulesState : previous)
    }
  },onStatus:(_value,phase) => {
    if (phase === 'live' || phase === 'history-follow' || phase === 'stopped') setSyncErrors(previous => ({...previous,[selected]:''}))
  },onError:cause => setSyncErrors(previous => ({...previous,[selected]:cause.message}))})
  const events = history.events
  useEffect(() => {
    setError(''); setEditingTitle(false); setTitleInput(''); setPermissionRules(null)
    pinned.current = true; setUnreadCount(0)
  }, [selected, followEpoch])
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'o') { e.preventDefault(); setFull(value => !value) }
      if (e.key === 'Escape') { setSidebar(false); setInspected(null); setCommandOpen(false); setPublicDetail(null); setSettingsOpen(false); setDirectoryPickerOpen(false); setResumeDirectoryFor(null) }
    }
    addEventListener('keydown', key); return () => removeEventListener('keydown', key)
  }, [selected])
  const activeSession = sessions.find(item => item.sessionId === selected)
  const executorState = activeSession?.executorState
  const historyState = activeSession?.historyState
  const {canControl, canResume} = sessionSettingsAccess(activeSession)
  sessionScope.update([selected, followEpoch, activeSession?.executorGeneration, api, canControl])
  const settingsRevision = settingsScope.update([selected, followEpoch, activeSession?.executorGeneration, api, settingsOpen, canControl])
  useEffect(() => {
    setSettingsError(''); setEditingTitle(false); setTitleInput('')
    setPermissionRules(null); setPermissionRulesBusy(false); setTitleBusy(false)
  }, [settingsRevision])
  const isHistory = Boolean(activeSession && !canControl)
  const connection = connectionPresentation(activeSession, history.phase, history.error || syncErrors[selected] || '', Boolean(selected))
  const taskRevision=useMemo(()=>events.reduce((latest,event)=>taskListChanged(event,activeSession?.executorGeneration)?Math.max(latest,event.seq):latest,0),[events,activeSession?.executorGeneration])
  const capabilities = useMemo(() => currentExecutorCapabilities(activeSession, events), [events, activeSession])
  const commands = capabilities.commands ?? []
  const slashSessionKey = JSON.stringify([selected,activeSession?.executorGeneration??null])
  const slashCandidates = canControl && !commandOpen && !slashDismissed ? getSlashCandidates(input,slashCursor,commands,{composing,selected:commandToken}) : []
  const slashSelectedIndex = Math.min(slashIndex,Math.max(0,slashCandidates.length-1))
  const slashSerialized = serializeSlashComposer({input,token:commandToken},commands,slashSessionKey,{literalBoundaryAvailable:true})
  useEffect(() => {
    const menu=slashMenuRef.current,option=menu?.querySelector<HTMLElement>('[aria-selected="true"]')
    if(menu&&option){const bounds=menu.getBoundingClientRect(),item=option.getBoundingClientRect();if(item.top<bounds.top)menu.scrollTop-=bounds.top-item.top;else if(item.bottom>bounds.bottom)menu.scrollTop+=item.bottom-bounds.bottom}
  },[slashSelectedIndex,slashCandidates.length])
  useEffect(() => {
    if(!slashCandidates.length)return
    const outside=(event:PointerEvent)=>{if(event.target instanceof Node&&!inputRef.current?.closest('.composer')?.contains(event.target))setSlashDismissed(true)}
    document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside)
  },[slashCandidates.length])
  const applySlashDraft = (draft:SlashDraft) => {
    setDrafts(previous => ({...previous,[selected]:{...(previous[selected]??{attachments:[]}),input:draft.input,token:draft.token}}))
    setSlashDismissed(false);setSlashIndex(0)
    requestAnimationFrame(() => {inputRef.current?.focus({preventScroll:true});const position=draft.token?draft.input.length:slashCursor;inputRef.current?.setSelectionRange(position,position);setSlashCursor(position)})
  }
  const selectSlash = (name:string) => {
    const draft=selectSlashCandidate(input,name,commands,slashSessionKey,{composing})
    if(draft)applySlashDraft(draft)
  }

  const paletteEntries = useMemo(() => [
    ...PUBLIC_COMMANDS.filter(name => name !== 'tag' || publicCommandAvailable(name, capabilities)).map(name => ({kind:'public' as const,name,label:PUBLIC_COMMAND_LABELS[name],description:''})),
    ...commands.filter(command => !PUBLIC_COMMANDS.some(name => name === command.name)).map(command => ({kind:'sdk' as const,name:command.name,label:command.name,description:command.description ?? command.argumentHint ?? '当前执行器指令',supported:command.supported})),
    {kind:'settings' as const,name:'settings',label:'会话设置',description:'标题、模型、权限规则与高级选项'},
  ], [commands, capabilities.localWeb?.controls])
  const filteredCommands = paletteEntries.filter(entry => `${entry.name} ${entry.label} ${entry.description}`.toLowerCase().includes(commandQuery.trim().replace(/^\//,'').toLowerCase()))
  const resolved = useMemo(() => resolvedInteractions(events), [events])
  const ancestorIds: string[] = []
  let ancestor = activeSession?.continuedFrom
  while (ancestor && ancestor !== selected && !ancestorIds.includes(ancestor)) {
    ancestorIds.unshift(ancestor)
    ancestor = sessions.find(item => item.sessionId === ancestor)?.continuedFrom
  }
  const ancestorKey = ancestorIds.join(',')
  useEffect(() => {
    if (!ancestorKey) return
    const controller = new AbortController()
    for (const id of ancestorKey.split(',')) void api.history(id, controller.signal).then(batch => {
      if (!controller.signal.aborted) setEventsBySession(previous => ({...previous,[id]:mergeJournalEvents(previous[id] ?? [],batch)}))
    }, cause => { if (!controller.signal.aborted) setSyncErrors(previous => ({...previous,[selected]:`原会话历史：${(cause as Error).message}`})) })
    return () => controller.abort()
  }, [api, selected, ancestorKey])
  // Parent approvals are historical, never permissions for the new worker.
  const baseRecords = useMemo(() => [...(ancestorKey ? ancestorKey.split(',') : []).flatMap(id =>
    toDisplayRecords((eventsBySession[id] ?? []).map(event => ({...event,historical:true})),full).map(record => ({...record,id:`${id}:${record.id}`}))),
    ...toDisplayRecords(isHistory ? events.map(event => ({...event,historical:true})) : events,full),
    ...submissionRecords(submissionsBySession[selected]??[],events)], [events, eventsBySession, ancestorKey, full, isHistory,submissionsBySession,selected])
  useEffect(() => {
    const admitted=new Set(events.filter(event=>event.type==='turn_queued').map(event=>event.operationId))
    setSubmissionsBySession(previous=>{
      const entries=previous[selected]
      if(!entries?.some(item=>item.phase!=='pending'&&admitted.has(item.id)))return previous
      return {...previous,[selected]:entries.filter(item=>item.phase==='pending'||!admitted.has(item.id))}
    })
  },[events,selected,submissionsBySession])
  const presentationEvents = useMemo(() => [...(ancestorKey ? ancestorKey.split(',') : []).flatMap(id => eventsBySession[id] ?? []), ...events], [events, eventsBySession, ancestorKey])
  const toolGrouping = useMemo(() => groupToolCalls(baseRecords, presentationEvents, {full,sessionId:selected,activeGeneration:activeSession?.executorGeneration,activeOperationId:canControl?activeSession?.activeOperationId:null}), [baseRecords,presentationEvents,full,canControl,activeSession?.activeOperationId,activeSession?.executorGeneration,selected])
  const records = toolGrouping.records
  const anchorRows = useMemo(() => {
    const byId=new Map(records.map(record=>[record.id,record])),bySource=new Map<string,RecordView>()
    for(const record of records)for(const source of presentationSourceKeys(record))if(!bySource.has(source))bySource.set(source,record)
    return {byId,bySource}
  },[records])
  useLayoutEffect(() => {
    const anchor=presentationAnchor.current
    if(!anchor||anchor.session!==selected||pinned.current||anchorRows.byId.has(anchor.id))return
    const target=anchor.sources.map(source=>anchorRows.bySource.get(source)).find(Boolean)
    if(target&&virtualRef.current?.scrollToId(target.id,'start')&&scrollRef.current){
      scrollRef.current.scrollTop=Math.max(0,scrollRef.current.scrollTop-anchor.offset)
      presentationAnchor.current={...anchor,id:target.id,sources:presentationSourceKeys(target)}
    }
  },[anchorRows,selected])
  const presentations = useMemo(() => toolPresentations(baseRecords), [baseRecords])
  const visibleError = error || (history.error && !records.length ? '' : syncErrors[selected] || '')
  const preserveIds = useMemo(() => new Set(records.filter(record => canControl && record.kind === 'approval' &&
    !resolved.has(String(record.event.requestId))).map(record => record.id).concat([...toolGrouping.groups.values()].filter(group => canControl && group.approvals.some(record => record.event.historical !== true && !resolved.has(String(record.event.requestId)) && approvalLabel(record,toolGrouping.decisions)==='等待审批')).map(group => group.key))), [records, resolved, canControl,toolGrouping])
  const sessionList = sessions.filter(session => `${sessionDisplayTitle(session) ?? ''} ${session.sessionId} ${session.cwd ?? ''}`.toLowerCase().includes(search.toLowerCase()))
  const workerControl = async (request: WebControl, propagate = false) => {
    const current = sessionScope.capture()
    const currentSettings = settingsScope.capture()
    const id = selected
    if (!id || controlBusyBySession[id] || !canControl) return
    setControlBusyBySession(previous => ({...previous,[id]:true})); setError(''); setSettingsError('')
    try { await api.control(id, request)
      if (request.subtype === 'set_model' || request.subtype === 'set_permission_mode' || request.subtype === 'local_public_effort') {
        const snapshot = await api.request<SessionSummary>(`/v1/sessions/${encodeURIComponent(id)}`)
        if (current()) setSessions(list => mergeSessionSnapshots(list,[snapshot]))
      }
    }
    catch (e) {
      if (current()) setError(`会话 ${id.slice(0,8)}：${(e as Error).message}`)
      if (currentSettings()) setSettingsError((e as Error).message)
      if (propagate) throw e
    }
    finally { setControlBusyBySession(previous => ({...previous,[id]:false})) }
  }
  const loadPermissionRules = async () => {
    const id = selected
    const currentSettings = settingsScope.capture()
    if (!id || permissionRulesBusy || !canControl) return
    setPermissionRulesBusy(true); setSettingsError('')
    try {
      const state = await api.listPermissionRules(id)
      if (currentSettings()) setPermissionRules(state)
    } catch (cause) { if (currentSettings()) setSettingsError(`权限规则：${(cause as Error).message}`) }
    finally { if (currentSettings()) setPermissionRulesBusy(false) }
  }
  const updatePermissionRules = async (update: Extract<WebControl, {subtype:'local_update_permission_rules'}>['update']) => {
    const id = selected
    const currentSettings = settingsScope.capture()
    if (!id || permissionRulesBusy || !canControl) return
    setPermissionRulesBusy(true); setSettingsError('')
    try {
      const state = await api.updatePermissionRules(id, update)
      if (currentSettings()) setPermissionRules(state)
    } catch (cause) { if (currentSettings()) setSettingsError(`权限规则：${(cause as Error).message}`) }
    finally { if (currentSettings()) setPermissionRulesBusy(false) }
  }
  const renameSession = async (event: React.FormEvent) => {
    event.preventDefault()
    const id = selected
    const currentSettings = settingsScope.capture()
    if (!id || !titleInput.trim() || titleBusy || !canControl) return
    setTitleBusy(true); setSettingsError('')
    try {
      await api.control(id, { subtype: 'rename_session', title: titleInput })
      if (currentSettings()) {
        const current = await api.request<SessionSummary>(`/v1/sessions/${encodeURIComponent(id)}`)
        if (!currentSettings()) return
        setSessions(list => mergeSessionSnapshots(list,[current]))
        setEditingTitle(false)
      }
    } catch (cause) { if (currentSettings()) setSettingsError((cause as Error).message) }
    finally { if (currentSettings()) setTitleBusy(false) }
  }
  const create = async (cwd = selectedCwd) => {
    if (!cwd) { setDirectoryPickerOpen(true); return }
    if (creating) return
    const current = sessionScope.capture(), cwdAtStart = cwd
    setCreating(true); setError('')
    try { const session = await api.create(cwdAtStart); setSessions(list => mergeSessionSnapshots(list,[session])); if (current()) selectSession(session.sessionId) }
    catch (e) { if (current()) setError((e as Error).message) }
    finally { setCreating(false) }
  }
  const continueArchived = async () => {
    const oldId = selected
    if (!oldId || !canResume || continuing) return
    const current = sessionScope.capture()
    const currentSettings = settingsScope.capture()
    if (!activeSession?.cwd && !resumeDirectories[oldId]) { setResumeDirectoryFor(oldId); setSettingsOpen(false); setDirectoryPickerOpen(true); return }
    setContinuing(true); setError('')
    try {
      const session = await api.continueSession(oldId, resumeDirectories[oldId])
      if (current()) {
        setSessions(list => mergeSessionSnapshots(list,[session]))
        if (session.sessionId === oldId) setFollowEpoch(value => value + 1)
        else selectSession(session.sessionId)
      }
    } catch (cause) { if (current()) setError((cause as Error).message); if (currentSettings()) setSettingsError((cause as Error).message) }
    finally { setContinuing(false) }
  }
  const closeCommandMenu = useCallback((restoreFocus: boolean) => {
    setCommandOpen(false)
    if (restoreFocus) inputRef.current?.focus({preventScroll:true})
  }, [])
  useComposerCommandMenu(commandOpen, commandMenuRef, composerRef, closeCommandMenu)
  useEffect(() => {
    const menu = commandMenuRef.current?.querySelector<HTMLElement>('.palette-results')
    const option = menu?.querySelector<HTMLElement>('[aria-selected="true"]')
    if (menu && option) {
      const box = menu.getBoundingClientRect(), item = option.getBoundingClientRect()
      if (item.top < box.top) menu.scrollTop -= box.top - item.top
      else if (item.bottom > box.bottom) menu.scrollTop += item.bottom - box.bottom
    }
  }, [commandOpen, commandIndex, commandQuery])
  const openPalette = (query = '') => { setCommandQuery(query); setCommandIndex(0); setSlashDismissed(true); setCommandOpen(true); requestAnimationFrame(() => commandSearchRef.current?.focus({preventScroll:true})) }
  const chooseCommand = (entry: typeof paletteEntries[number]) => {
    if (entry.kind === 'sdk') { if (entry.supported === false || !canControl) return; const draft=selectSlashCandidate(`/${entry.name} `,entry.name,commands,slashSessionKey); if(draft)applySlashDraft({...draft,input}); setCommandOpen(false); return }
    setCommandOpen(false)
    if (entry.kind === 'settings') setSettingsOpen(true)
    else setPublicDetail(entry.name as PublicCommandName)
  }
  const addAttachments = async (files: FileList | null) => {
    if (!files?.length || !selected || readingAttachments) return
    const owner = selected
    setReadingBySession(previous => ({...previous,[owner]:true})); setError('')
    try {
      const added = await Promise.all(Array.from(files, readSupportedAttachment))
      const next = [...attachments, ...added]
      if (next.reduce((sum, image) => sum + image.data.length, 0) > 12 * 1024 * 1024) {
        if (selectedRef.current === owner) setError('附件总大小超过当前消息限制')
      } else setDrafts(previous => ({...previous,[owner]:{...previous[owner],input:previous[owner]?.input ?? '',attachments:next}}))
    } catch (cause) { if (selectedRef.current === owner) setError((cause as Error).message) }
    finally { setReadingBySession(previous => ({...previous,[owner]:false})) }
  }
  const send = async () => {
    if (!selected || !canControl || (!input.trim() && !commandToken && !attachments.length) || sending || readingAttachments) return
    if (commandToken && attachments.length) { setError('指令与附件请分开发送；草稿和附件已保留。移除指令标签后可作为普通消息发送。'); return }
    if (slashSerialized.kind === 'blocked') { setError(slashSerialized.reason === 'literal-boundary-required' ? '尚未选择指令标签：以 / 开头的普通文字暂不支持原样发送；请选择指令或修改开头，草稿已保留。' : '此指令标签已失效，请按当前会话能力重新选择；草稿已保留。'); return }
    const owner = selected
    setSendingBySession(previous => ({...previous,[owner]:true})); setError('')
    const content = composeTurnContent(slashSerialized.text, attachments)
    const key = JSON.stringify({content,intent:slashSerialized.intent})
    // Reuse only for an explicitly repeated submission whose HTTP outcome was
    // unknown; reconnecting a viewer never resends user/model operations.
    const operation = pendingSubmission.current[owner]?.key === key ? pendingSubmission.current[owner]! : { key, id: newOperationId() }
    pendingSubmission.current[owner] = operation
    pinned.current = true
    const updateSubmission=(phase:LocalSubmission['phase'])=>setSubmissionsBySession(previous=>{
      const entries=previous[owner]??[],old=entries.find(item=>item.id===operation.id)
      return {...previous,[owner]:[...entries.filter(item=>item.id!==operation.id),{id:operation.id,content,at:old?.at??Date.now(),phase}]}
    })
    updateSubmission('pending')
    requestAnimationFrame(()=>{if(selectedRef.current===owner)virtualRef.current?.scrollToEnd()})
    try {
      await api.turn(owner, operation.id, content, slashSerialized.intent)
      updateSubmission('accepted')
      delete pendingSubmission.current[owner]
      setDrafts(previous => { const draft = previous[owner]; if (!draft) return previous; return {...previous,[owner]:{
        ...draft,
        input:draft.input === input ? '' : draft.input,
        token:draft.input === input && draft.token === commandToken ? null : draft.token,
        attachments:draft.attachments === attachments ? [] : draft.attachments,
      }} })
      if (selectedRef.current === owner) {
        setCommandOpen(false); pinned.current = true
      }
    } catch (e) { updateSubmission(e instanceof WebRequestError && e.status>=400 && e.status<500?'rejected':'unknown'); if (selectedRef.current === owner) setError(`会话 ${owner.slice(0,8)}：${(e as Error).message}`) } finally { setSendingBySession(previous => ({...previous,[owner]:false})) }
  }
  const pending = canControl ? events.filter(event => (event.type === 'permission_request' || event.type === 'elicitation_request') && !resolved.has(String(event.requestId))).length : 0
  const executorControls = <>
          {capabilities.models?.length ? <ModelPicker key={`model:${selected}:${followEpoch}:${activeSession?.executorGeneration}`} currentModel={capabilities.currentModel} currentModelChoice={capabilities.currentModelChoice} models={capabilities.models} pendingModel={capabilities.modelPending} disabled={controlBusy || !canControl} onChange={model=>workerControl({subtype:'set_model',model},true)} /> : <span className="history-meta">模型：{capabilities.currentModel ?? '等待执行器确认'}</span>}
          {capabilities.permissionMode ? <PermissionModePicker key={`permission:${selected}:${followEpoch}:${activeSession?.executorGeneration}`} sessionId={selected} currentMode={capabilities.permissionMode} availability={capabilities.permissionModes} busy={controlBusy} disabled={!canControl || !capabilities.permissionMode} onChange={mode => workerControl({subtype:'set_permission_mode',mode},true)} /> : <span className="history-meta">权限：等待执行器确认</span>}

</>
  return <div className={`workspace ${sidebar ? 'sidebar-open' : ''}`}>
    {sidebar && <button className="mobile-backdrop" aria-label="关闭会话列表" onClick={() => setSidebar(false)} />}
    <aside className="sidebar" aria-label="会话列表">
      <div className="brand"><span className="brand-mark"><Icon name="terminal" size={23} /></span><span className="brand-caption"><strong>ViaCoder</strong><small>工作空间</small></span><button className="icon-button mobile-only" aria-label="关闭会话列表" onClick={() => setSidebar(false)}><Icon name="close" /></button></div>
      <button className="new-session" disabled={creating || hostLoading} onClick={() => {setResumeDirectoryFor(null);setDirectoryPickerOpen(true);if (!host) setHostRefreshEpoch(value => value + 1)}}><Icon name="plus" />{creating ? '创建中…' : hostLoading ? '正在读取主机…' : '新建会话'}</button>
      <label className="session-search"><Icon name="search" size={17} /><input aria-label="搜索会话" placeholder="搜索会话" value={search} onChange={e => setSearch(e.target.value)} /></label>
      <div className="sidebar-label">会话记录 <span>{sessions.length}</span></div>
      <nav className="session-list">{sessionList.map(session => {const displayTitle=sessionDisplayTitle(session);const titleStatus=sessionTitleSaveStatus(session);return <button key={session.sessionId} className={`session-item ${selected === session.sessionId ? 'selected' : ''}`} onClick={() => selectSession(session.sessionId)}><Icon name="chat" size={17} /><span><strong>{displayTitle || `会话 ${session.sessionId.slice(0, 8)}`}</strong><small>{session.executorState?.canControl ? session.activeOperationId ? '正在执行 · ' : session.queuedOperationIds?.length ? '排队中 · ' : '' : session.executorState?.status === 'closed' ? '会话已关闭 · ' : session.executorState?.status === 'starting' ? '启动中 · ' : '历史记录 · '}{titleStatus === '临时名称 · 尚未保存' ? `${titleStatus} · ` : ''}{session.cwd ?? '原目录未知'} · {new Date(session.updatedAt ?? session.createdAt).toLocaleString('zh-CN')}</small></span>{session.activeOperationId && <i className="status-dot" />}</button>})}{!sessionList.length && <p className="sidebar-empty" role={sessionsLoaded && sessionsError ? 'alert' : 'status'}>{!sessionsLoaded ? '正在读取会话…' : sessionsError ? `会话列表读取失败：${sessionsError}` : search ? '没有匹配的会话。' : '暂无会话，选择项目目录后即可新建。'}</p>}{sessionsError && sessions.length > 0 && <p className="sidebar-empty" role="alert">列表更新失败：{sessionsError}</p>}{sessionsError && <button className="sidebar-retry" onClick={() => void refresh()}>重试读取会话</button>}</nav>
      <div className="sidebar-footer"><span className="version">{version}</span></div>
    </aside>
    <main className="main">
      <header className="topbar">
        <button className="icon-button mobile-only" aria-label="打开会话列表" onClick={() => setSidebar(true)}><Icon name="menu" /></button>
        <div className="breadcrumb"><strong>{sessionDisplayTitle(activeSession) ?? (selected ? `会话 ${selected.slice(0, 8)}` : '新的开始')}</strong><small>{activeSession?.cwd ?? selectedCwd ?? '未选项目目录'}{sessionTitleSaveStatus(activeSession)==='临时名称 · 尚未保存' ? ' · 临时名称 · 尚未保存' : ''}</small></div>
        <div className="top-actions">{connection.tone !== 'live' && <span className="connection" title={connection.note}><i className="status-dot idle" />{connection.label}</span>}<button className={`icon-button ${full ? 'active' : ''}`} aria-label="完整详情（Ctrl+O）" aria-pressed={full} title="完整详情 · Ctrl+O" onClick={() => setFull(value => !value)}><Icon name="detail" /></button><button className="icon-button" aria-label="打开指令与功能" title="指令与功能" data-command-menu-trigger aria-expanded={commandOpen} aria-controls="composer-command-menu" onClick={() => openPalette()}><Icon name="search" /></button></div>
      </header>
      {selected && <div className="session-controls" aria-label="会话状态与设置">
        {canControl ? <>{executorControls}{activeSession?.activeOperationId && <button className="subtle-action" disabled={controlBusy} onClick={() => void workerControl({subtype:'interrupt'})}>中断</button>}</> : <><span className="history-label" title={connection.note}>{executorState?.status === 'starting' ? '执行器启动中' : '仅查看'}</span>{historyState?.model && <span className="history-meta">记录模型：{historyState.model}</span>}{historyState?.permissionMode && <span className="history-meta">记录权限：{historyState.permissionMode}</span>}{canResume && <button className="continue-inline" disabled={continuing} onClick={() => void continueArchived()}>{continuing ? '正在恢复…' : '恢复会话'}</button>}</>}
          <button className="subtle-action settings-entry" onClick={() => setSettingsOpen(true)} aria-label="会话设置">设置</button>
      </div>}
      {directoryPickerOpen && <div className="modal-backdrop" onMouseDown={event => {if (event.target === event.currentTarget) {setDirectoryPickerOpen(false);setResumeDirectoryFor(null)}}}>
      {host && <HostDirectoryPicker api={api} hostname={host.hostname} initialDirectory={selectedCwd ?? host.initialDirectory} onChoose={path => { if (resumeDirectoryFor) setResumeDirectories(previous => ({...previous,[resumeDirectoryFor]:path})); else {setSelectedCwd(path);void create(path)}; setResumeDirectoryFor(null); setDirectoryPickerOpen(false) }} onClose={() => {setDirectoryPickerOpen(false);setResumeDirectoryFor(null)}} />}
      {!host && <section className="host-directory-picker action-dialog" role="dialog" aria-modal="true" aria-label="选择主机项目目录"><header><strong>选择项目目录</strong><button className="secondary" onClick={() => setDirectoryPickerOpen(false)}>关闭</button></header><p className="empty-transcript" role={hostError ? 'alert' : 'status'}>{hostLoading ? '正在读取主机目录…' : `主机目录读取失败：${hostError || '状态未知'}`}</p>{!hostLoading && <button className="secondary" onClick={() => setHostRefreshEpoch(value => value + 1)}>重试读取</button>}</section>}
      </div>}
      {visibleError && <div className="error-banner" role="alert"><span>{visibleError}</span><button className="icon-button" aria-label="关闭提示" onClick={() => {setError('');setSyncErrors(previous => ({...previous,[selected]:''}))}}><Icon name="close" size={16} /></button></div>}
      {authRequired && <form className="auth-form" onSubmit={e => { e.preventDefault(); const value = new FormData(e.currentTarget).get('token') as string; sessionStorage.setItem('cc-serve-token',value); setToken(value) }}><label>连接令牌<input name="token" type="password" required autoComplete="off" placeholder="输入服务令牌，不是模型 API key" /></label><button className="primary">连接</button></form>}
      <div className="main-row"><div className="conversation-column">
        {!selected ? <div className="transcript"><section className="welcome"><div className="welcome-orbit"><Icon name="terminal" size={42} /></div><p className="eyebrow">VIACODER WORKSPACE</p><h1>你的工作，随处继续。</h1><p className="welcome-description">先选择主机上的项目目录，再开始会话。<br />每个会话使用自己的工作目录。</p><button className="primary welcome-button" disabled={hostLoading} onClick={() => selectedCwd ? void create() : host ? setDirectoryPickerOpen(true) : setHostRefreshEpoch(value => value + 1)}><Icon name="plus" size={18} />{hostLoading ? '正在读取主机目录…' : selectedCwd ? '开始新会话' : hostError ? '重试连接主机' : '选择项目目录'}</button><div className="welcome-notes"><span><Icon name="clock" size={16} />完整历史</span><span><Icon name="detail" size={16} />透明执行</span><span><Icon name="check" size={16} />审批同步</span></div></section></div> : <VirtualTranscript records={records} scrollRef={scrollRef} handleRef={virtualRef} resetKey={`${selected}:${followEpoch}`}
          loading={history.loading || !activeSession} loadingOlder={history.loadingOlder} hasOlder={history.hasOlder} preserveIds={preserveIds} onReachStart={() => void history.loadOlder()}
          onAnchorChange={anchor => {const record=anchor&&anchorRows.byId.get(anchor.id);presentationAnchor.current=anchor&&record?{session:selected,...anchor,sources:presentationSourceKeys(record)}:null}}
          onPinnedChange={value => { pinned.current = value; if (value) setUnreadCount(0) }}
          children={!history.loading && activeSession && !records.length ? <div className="empty-transcript">{history.error ? <><span role="alert">历史读取失败：{history.error}</span><button className="secondary history-retry" onClick={() => setFollowEpoch(value => value + 1)}>重试读取</button></> : isHistory ? '此历史暂无可显示的消息。可开启完整详情查看记录。' : '输入消息，开始这一轮工作。'}</div> : null}
          renderRecord={record => toolGrouping.groups.has(record.id) ? <ToolCallCard group={toolGrouping.groups.get(record.id)!} api={api} expanded={toolGrouping.groups.get(record.id)!.expansionKeys.some(key=>expanded.has(key))} onToggle={() => toggleExpanded(`${record.id}:details`,toolGrouping.groups.get(record.id)!.expansionKeys)}
            onInspect={() => setInspected({...record.event,sourceEvents:record.sourceEvents})}
            renderApproval={approval => <ApprovalContent record={approval} full={false} resolved={!canControl || approval.event.historical === true || resolved.has(String(approval.event.requestId)) || approvalLabel(approval,toolGrouping.decisions)!=='等待审批'} decision={approvalLabel(approval,toolGrouping.decisions, resolved.has(String(approval.event.requestId)))}
              actionKey={`${selected}:${approval.id}`} actionState={actionByRecord[`${selected}:${approval.id}`] ?? {busy:false,error:''}} setActionState={setActionState}
              onApprove={(allowed,updatedInput,updatedPermissions,denial) => api.approve(selected,String(approval.event.requestId),allowed,updatedInput??object(approval.event.input)??{},updatedPermissions,denial).then(()=>{})} onGetPlan={() => api.getPlan(selected)} />}
            /> : <RecordCard decision={approvalLabel(record,toolGrouping.decisions,resolved.has(String(record.event.requestId)))} key={`${selected}:${record.id}`} record={record} full={full} presentations={presentations} api={api}
            resolved={!canControl || record.event.historical === true || resolved.has(String(record.event.requestId))} actionKey={`${selected}:${record.id}`} actionState={actionByRecord[`${selected}:${record.id}`] ?? {busy:false,error:''}} setActionState={setActionState} expanded={expanded} toggleExpanded={toggleExpanded}
            onInspect={() => setInspected(record.sourceEvents ? {...record.event,sourceEvents:record.sourceEvents} : record.event)}
            onApprove={(allowed, updatedInput, updatedPermissions, denial) => api.approve(selected, String(record.event.requestId), allowed, updatedInput ?? object(record.event.input) ?? {}, updatedPermissions, denial).then(() => {})}
            onGetPlan={() => api.getPlan(selected)} onElicit={(action, content) => api.answerElicitation(selected, String(record.event.requestId), action, content).then(() => {})} />} />}
        <div className="composer-region">
          {canResume && !activeSession?.cwd && !resumeDirectories[selected] && <div className="history-directory"><span>继续前请选择项目目录</span><button onClick={() => {setResumeDirectoryFor(selected);setSettingsOpen(false);setDirectoryPickerOpen(true)}}>选择目录</button></div>}
          {pending > 0 && <div className="pending-banner"><span className="status-dot" />{pending} 项操作等待你的答复<button onClick={() => { const target = events.find(e => (e.type === 'permission_request' || e.type === 'elicitation_request') && !resolved.has(String(e.requestId))); const record = records.find(row => row.event === target || row.sourceEvents?.includes(target!) || row.event.seq === target?.seq); if (!record || !virtualRef.current?.scrollToId(record.id)) setError('待处理记录尚未载入，请向上加载历史。') }}>查看</button></div>}
          <div className="composer" ref={composerRef}>
      {commandOpen && <section ref={commandMenuRef} id="composer-command-menu" popover="manual" className="command-palette composer-command-palette" role="region" aria-label="指令与功能">
        <div className="palette-search"><Icon name="search" size={19} /><input ref={commandSearchRef} aria-label="搜索指令与功能" placeholder="搜索指令或功能" value={commandQuery} onChange={event => {setCommandQuery(event.target.value);setCommandIndex(0)}} onKeyDown={event => {
          if (event.nativeEvent.isComposing || event.keyCode === 229) return
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setCommandIndex(index => (index + (event.key === 'ArrowDown' ? 1 : -1) + filteredCommands.length) % Math.max(1, filteredCommands.length)) }
          if (event.key === 'Enter' && filteredCommands[commandIndex]) { event.preventDefault(); chooseCommand(filteredCommands[commandIndex]!) }
        }} /><kbd>Esc</kbd><button type="button" aria-label="关闭指令与功能" onClick={() => closeCommandMenu(true)}>×</button></div>
        <div className="palette-results" role="listbox" aria-label="匹配的指令与功能">{filteredCommands.map((entry,index) => <button key={`${entry.kind}:${entry.name}`} role="option" aria-selected={index === commandIndex} className={index === commandIndex ? 'selected' : ''} disabled={entry.kind === 'sdk' && (entry.supported === false || !canControl)} onMouseEnter={() => setCommandIndex(index)} onClick={() => chooseCommand(entry)} title={[entry.kind === 'settings' ? entry.label : `/${entry.name}`, entry.label !== entry.name && entry.kind !== 'settings' ? entry.label : '', entry.description].filter(Boolean).join(' · ')} aria-label={[entry.kind === 'settings' ? entry.label : `/${entry.name}`, entry.kind === 'public' ? entry.label : entry.description].filter(Boolean).join(' · ')}><span className="palette-command-name">{entry.kind === 'settings' ? entry.label : `/${entry.name}`}</span><span className="palette-command-label">{entry.kind === 'public' ? entry.label : entry.description}</span></button>)}{!filteredCommands.length && <p className="palette-empty">没有匹配结果</p>}</div>
        <div className="palette-foot">指令选中后发送才执行 · ↑ ↓ 选择 · Esc 返回草稿</div>
      </section>}

          {slashCandidates.length>0 && <div className="composer-slash-menu" ref={slashMenuRef} role="listbox" id="composer-slash-candidates" aria-label="指令候选">{slashCandidates.map((candidate,index)=><button type="button" key={candidate.name} id={`composer-slash-option-${index}`} role="option" aria-selected={index===slashSelectedIndex} className={index===slashSelectedIndex?'selected':''} onMouseDown={event=>event.preventDefault()} onClick={()=>selectSlash(candidate.name)}><strong>/{candidate.name}</strong><span>{candidate.description}</span>{candidate.argumentHint&&<small>{candidate.argumentHint}</small>}</button>)}</div>}
          {commandToken && <div className="composer-command-chip" aria-label="已选指令"><span>/{commandToken.name}</span><small>{slashSerialized.kind==='blocked'?'标签已失效，请重选':attachments.length?'附件需单独发送':'发送时执行'}</small><button type="button" aria-label="移除指令标签" onClick={()=>applySlashDraft(removeSlashToken({input,token:commandToken}))}>×</button></div>}
          <div className="composer-input-wrap"><textarea ref={inputRef} value={input} disabled={!selected || !canControl} aria-label="发送消息或斜杠指令" aria-expanded={slashCandidates.length>0} aria-controls={slashCandidates.length?'composer-slash-candidates':undefined} aria-activedescendant={slashCandidates.length?`composer-slash-option-${slashSelectedIndex}`:undefined}
            onSelect={event=>setSlashCursor(event.currentTarget.selectionStart)} onCompositionStart={()=>setComposing(true)} onCompositionEnd={event=>{setComposing(false);setSlashCursor(event.currentTarget.selectionStart)}} data-command-selected={Boolean(commandToken)} placeholder={commandToken ? '输入指令参数（可选）' : isHistory ? canResume ? '恢复会话后即可发送消息' : '仅查看记录；尚未连接可交互执行器' : selected ? '发送消息… 输入 / 查找指令' : '先创建或选择一个会话'} rows={2} onChange={e => {if(e.target.value.startsWith('/'))setCommandOpen(false);setInput(e.target.value);setSlashCursor(e.target.selectionStart);setSlashIndex(0);setSlashDismissed(false)}} onKeyDown={e => {
            if (composing || e.nativeEvent.isComposing || e.keyCode === 229) return
            if (e.key === 'Escape' && slashCandidates.length) {e.preventDefault();e.stopPropagation();setSlashDismissed(true);return}
            if (slashCandidates.length && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {e.preventDefault();setSlashIndex((slashSelectedIndex+(e.key==='ArrowDown'?1:-1)+slashCandidates.length)%slashCandidates.length);return}
            if (slashCandidates.length && e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {e.preventDefault();selectSlash(slashCandidates[slashSelectedIndex]!.name);return}
            if (e.key === 'Backspace' && commandToken && e.currentTarget.selectionStart===0 && e.currentTarget.selectionEnd===0) {e.preventDefault();const draft=expandSlashToken({input,token:commandToken});applySlashDraft(draft);requestAnimationFrame(()=>{const position=commandToken.name.length+1;inputRef.current?.setSelectionRange(position,position);setSlashCursor(position)});return}
            if (shouldSubmitOnEnter(e, matchMedia('(pointer: coarse)').matches ? 'modifierEnter' : 'enter')) { e.preventDefault(); void send() }
          }} /></div>
          {attachments.length > 0 && <div className="attachment-draft" aria-label="待发送附件">{attachments.map((item, index) => <span key={`${item.name}-${index}`}>{['image/png','image/jpeg','image/gif','image/webp'].includes(item.mediaType) ? <img alt="" src={`data:${item.mediaType};base64,${item.data}`} /> : <strong>{item.mediaType === 'application/pdf' ? 'PDF' : '文件'}</strong>}<span className="attachment-name">{item.name}</span><button aria-label={`移除 ${item.name}`} disabled={sending || readingAttachments} onClick={() => setAttachments(current => current.filter((_, position) => position !== index))}>×</button></span>)}</div>}
          <div className="composer-toolbar"><button className="command-toggle" data-command-menu-trigger aria-expanded={commandOpen} aria-controls="composer-command-menu" disabled={!selected} onClick={() => openPalette()}><span>/</span>指令与功能</button><label className="attachment-picker command-toggle">附件<input type="file" multiple disabled={!selected || sending || readingAttachments || !canControl} onChange={event => { void addAttachments(event.target.files); event.target.value = '' }} /></label><span className="composer-hint">{readingAttachments ? '读取附件…' : 'Shift + Enter 换行'}</span><button className="send-button" aria-label="发送消息" disabled={!canControl || (!input.trim() && !commandToken && !attachments.length) || sending || readingAttachments} onClick={() => void send()}>{sending ? <span className="sending-dot" aria-label="发送中"><i /><i /><i /></span> : <Icon name="send" />}</button></div>
          </div><div className="composer-footnote"><span>{unreadCount > 0 ? '有新消息' : ''}</span><button onClick={() => { pinned.current = true; setUnreadCount(0); virtualRef.current?.scrollToEnd() }}>回到最新 <Icon name="down" size={12} /></button></div>
        </div>
      </div>
      {inspected && <aside ref={detailRef} className={`detail-panel ${compactDetail ? 'detail-overlay' : ''}`} aria-label="完整事件详情"><header><div><span className="eyebrow">事件详情</span><h2>记录 #{inspected.seq}</h2></div><button className="icon-button" aria-label="关闭详情" onClick={() => setInspected(null)}><Icon name="close" /></button></header><dl><dt>类型</dt><dd>{inspected.type}</dd><dt>时间</dt><dd>{Number.isFinite(inspected.at) && inspected.at > 0 ? new Date(inspected.at).toLocaleString() : '未记录'}</dd></dl><Raw value={inspected} />{recordedOutputReferencesFromEvents(Array.isArray(inspected.sourceEvents) ? inspected.sourceEvents as ServeEvent[] : [inspected]).map(reference => <RecordedOutput key={`${reference.recordId}:${reference.index}`} api={api} reference={reference} />)}</aside>}
      </div>
      {publicDetail && activeSession && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setPublicDetail(null) }}><section className={`action-dialog command-dialog${publicDetail === 'diff' ? ' diff-dialog' : publicDetail === 'tasks' ? ' tasks-dialog' : ''}`} role="dialog" aria-modal="true" aria-label={`/${publicDetail} ${PUBLIC_COMMAND_LABELS[publicDetail]}`}><header><div><small>会话功能</small><h2>/{publicDetail} · {PUBLIC_COMMAND_LABELS[publicDetail]}</h2></div><button className="icon-button" aria-label="关闭功能详情" onClick={() => setPublicDetail(null)}><Icon name="close" /></button></header><PublicCommandPanel key={`${selected}:${publicDetail}`} api={api} session={activeSession} capabilities={capabilities} initialCommand={publicDetail} taskRevision={taskRevision} compact onResumeSession={id => {selectSession(id);setPublicDetail(null)}} /></section></div>}
      {settingsOpen && activeSession && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSettingsOpen(false) }}><section className="action-dialog settings-dialog" role="dialog" aria-modal="true" aria-label="会话设置"><header><div><h2>会话设置</h2></div><button className="icon-button" aria-label="关闭会话设置" onClick={() => setSettingsOpen(false)}><Icon name="close" /></button></header>
        <div className="settings-body">{settingsError && <p className="settings-error" role="alert">{settingsError}</p>}
          {canControl ? <section aria-label="常用设置"><div className="settings-executor-controls">{executorControls}</div></section> : <section className="settings-executor"><p>{readonlySettingsReason(activeSession)}</p><p>标题：{sessionDisplayTitle(activeSession) ?? '未命名'}<br />记录模型：{historyState?.model ?? (activeSession.capabilities as Capabilities | null)?.currentModel ?? '未记录'}<br />记录权限：{historyState?.permissionMode ?? (activeSession.capabilities as Capabilities | null)?.permissionMode ?? '未记录'}</p></section>}
          {canControl && <section><h3>会话标题</h3>{!editingTitle && <p>{sessionDisplayTitle(activeSession) ?? "未命名会话"}</p>}{editingTitle ? <form className="title-form" onSubmit={event => void renameSession(event)}><input aria-label="会话标题" disabled={titleBusy} value={titleInput} maxLength={200} onChange={event => setTitleInput(event.target.value)} /><button className="secondary" disabled={!titleInput.trim() || titleBusy || !canControl}>{titleBusy ? '保存中…' : '保存'}</button><button type="button" className="secondary" disabled={titleBusy} onClick={() => setEditingTitle(false)}>取消</button></form> : <button className="secondary" disabled={!canControl} onClick={() => {setTitleInput(sessionDisplayTitle(activeSession) ?? '');setEditingTitle(true)}}>编辑</button>}{sessionTitleSaveStatus(activeSession) && <small aria-label="标题保存状态">{sessionTitleSaveStatus(activeSession)}</small>}</section>}
          {canControl && capabilities.localWeb?.controls.includes('local_public_effort') && capabilities.effortState && capabilities.effortState.model===capabilities.currentModel && <EffortControl state={capabilities.effortState} disabled={controlBusy} onChange={value=>void workerControl({subtype:'local_public_effort',value,expectedModel:capabilities.currentModel})} />}
          {canResume && <button className="primary" disabled={continuing} onClick={() => void continueArchived()}>{continuing ? '正在恢复…' : '恢复同一会话'}</button>}
          {canControl && <details className="settings-more" key={`${selected}:${settingsRevision}`}><summary>权限规则</summary>
          {canControl && <section><button className="secondary" disabled={!canControl || permissionRulesBusy} onClick={() => void loadPermissionRules()}>{permissionRulesBusy ? '读取中…' : '查看权限规则'}</button>{permissionRules && <PermissionRulesPanel key={`${selected}:${activeSession.executorGeneration}`} state={permissionRules} busy={permissionRulesBusy} editable={Boolean(capabilities.localWeb?.controls.includes('local_update_permission_rules'))} onUpdate={update => void updatePermissionRules(update)} onClose={() => {settingsScope.update([]);setPermissionRules(null);setPermissionRulesBusy(false)}} onRefresh={() => void loadPermissionRules()} />}</section>}
          </details>}
          {canControl && commands.some(command => command.name === 'config' && command.supported !== false) && <button className="subtle-action settings-config-entry" onClick={() => {const entry=paletteEntries.find(item=>item.kind==='sdk'&&item.name==='config');if(entry){setSettingsOpen(false);chooseCommand(entry)}}}>更多偏好 · /config</button>}
        </div></section></div>}
    </main>
  </div>
}
