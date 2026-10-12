import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ServeEvent } from '../serveSession.js'
import { WebAPI, type FollowPhase, type HistoryPage, type HistoryPageQuery } from './client.js'
import { mergeJournalEvents } from './sessionState.js'

const PAGE_SIZE = 80
export type HistoryState = { events: ServeEvent[]; loading: boolean; loadingOlder: boolean; hasOlder: boolean;
  total: number; source: HistoryPage['eventSource'] | null; error: string; status: string; phase: FollowPhase | null }
const initial: HistoryState = { events: [], loading: false, loadingOlder: false, hasOlder: false,
  total: 0, source: null, error: '', status: '', phase: null }
export type UseHistoryOptions = { api: WebAPI; sessionId: string | null; enabled?: boolean; resetKey?: string | number;
  pollIntervalMs?: number;
  onEvents?: (events: ServeEvent[]) => void; onStatus?: (status: string, phase?: FollowPhase) => void; onError?: (error: Error) => void }

/** Owns only bounded pages. A new selection aborts every older/poll request and closes its follower. */
export function useHistory({ api, sessionId, enabled = true, resetKey = 0, pollIntervalMs = 15000,
  onEvents, onStatus, onError }: UseHistoryOptions) {
  const selectionKey = `${sessionId ?? ''}\0${String(resetKey)}\0${enabled}`
  const [state, setState] = useState<HistoryState & { selectionKey: string; ownerApi: WebAPI }>(() => ({
    ...initial, selectionKey, ownerApi: api, loading: Boolean(sessionId && enabled),
    status: sessionId && enabled ? '读取历史' : '', phase: sessionId && enabled ? 'loading' : null,
  }))
  const committedSelection = useRef(selectionKey)
  const committedApi = useRef(api)
  useLayoutEffect(() => { committedSelection.current = selectionKey; committedApi.current = api }, [selectionKey, api])
  // Passive effect cleanup runs after the first render of a new selection.
  // Mask the previous session's rows immediately, before that effect fires.
  const visible: typeof state = state.selectionKey === selectionKey && state.ownerApi === api ? state : {
    ...initial, selectionKey, ownerApi: api, loading: Boolean(sessionId && enabled),
    status: sessionId && enabled ? '读取历史' : '', phase: sessionId && enabled ? 'loading' : null,
  }
  const generation = useRef(0)
  const pageControl = useRef<AbortController | null>(null)
  const olderBusy = useRef(false)
  const cursor = useRef({ before: 0, after: 0, through: 0, source: null as HistoryPage['eventSource'] | null })
  const callbacks = useRef({ onEvents, onStatus, onError })
  callbacks.current = { onEvents, onStatus, onError }
  const hydrateEvidence = useCallback(async (page:HistoryPage, query:HistoryPageQuery, control:AbortController, requestGeneration:number) => {
    if(!sessionId||!page.journal?.evidence?.hasMore)return
    for await(const batch of api.historyEvidencePages(sessionId,page,query,control.signal)){
      if(control.signal.aborted||requestGeneration!==generation.current||committedSelection.current!==selectionKey||committedApi.current!==api)return
      setState(old=>({...old,events:mergeJournalEvents(old.events,batch)}))
    }
  },[api,sessionId,selectionKey])
  const loadOlder = useCallback(async () => {
    if (!sessionId || !enabled || committedSelection.current !== selectionKey || committedApi.current !== api ||
      !cursor.current.before || !visible.hasOlder || olderBusy.current || visible.loading) return
    olderBusy.current = true
    const requestGeneration = generation.current
    const control = new AbortController()
    pageControl.current = control
    const before = cursor.current.before, through = cursor.current.through, source = cursor.current.source
    setState(old => ({ ...old, loadingOlder: true, error: '' }))
    try {
      const page = await api.historyPage(sessionId, { before, through, limit: PAGE_SIZE }, control.signal)
      if (requestGeneration !== generation.current || committedSelection.current !== selectionKey || committedApi.current !== api || control.signal.aborted) return
      if (page.eventSource !== source || page.events.some(event => event.seq >= before)) throw Error('历史来源在翻页期间已改变')
      cursor.current.before = page.before
      setState(old => ({ ...old, events: mergeJournalEvents(mergeJournalEvents(page.events, old.events), page.journal?.events ?? []), hasOlder: page.hasOlder,
        total: Math.max(old.total, page.total) }))
      await hydrateEvidence(page,{before,through,limit:PAGE_SIZE},control,requestGeneration)
      if(requestGeneration===generation.current&&!control.signal.aborted)setState(old=>({...old,loadingOlder:false}))
    } catch (cause) {
      if (control.signal.aborted || requestGeneration !== generation.current || committedSelection.current !== selectionKey || committedApi.current !== api) return
      const error = cause as Error
      setState(old => ({ ...old, loadingOlder: false, error: error.message }))
      callbacks.current.onError?.(error)
    } finally { if (requestGeneration === generation.current) olderBusy.current = false }
  }, [api, sessionId, enabled, selectionKey, visible.hasOlder, visible.loading, hydrateEvidence])

  useEffect(() => {
    const requestGeneration = ++generation.current
    pageControl.current?.abort()
    olderBusy.current = false
    const control = new AbortController()
    pageControl.current = control
    cursor.current = { before: 0, after: 0, through: 0, source: null }
    setState({ ...initial, selectionKey, ownerApi: api, loading: Boolean(sessionId && enabled), status: sessionId && enabled ? '读取历史' : '', phase: sessionId && enabled ? 'loading' : null })
    if (!sessionId || !enabled) return () => { control.abort(); generation.current++ }
    let journalAfter: number | undefined
    let stopFollow: (() => void) | undefined
    let timer: ReturnType<typeof setTimeout> | undefined
    const live = (events: ServeEvent[]) => {
      if (requestGeneration !== generation.current || committedSelection.current !== selectionKey || committedApi.current !== api || !events.length) return
      const fresh = events.filter(event => event.seq > (journalAfter ?? cursor.current.after))
      if (!fresh.length) return
      if (journalAfter !== undefined) journalAfter = fresh.at(-1)!.seq
      else cursor.current.after = fresh.at(-1)!.seq
      setState(old => ({ ...old, events: mergeJournalEvents(old.events, fresh), total: Math.max(old.total, cursor.current.after) }))
      callbacks.current.onEvents?.(fresh)
    }
    const status = (value: string, phase?: FollowPhase) => {
      if (requestGeneration !== generation.current || committedSelection.current !== selectionKey || committedApi.current !== api) return
      setState(old => ({ ...old, status: value, phase: phase ?? old.phase,
        ...(phase === 'live' || phase === 'history-follow' || phase === 'stopped' ? {error: ''} : {}) }))
      callbacks.current.onStatus?.(value, phase)
    }
    const fail = (error: Error) => {
      if (requestGeneration !== generation.current || committedSelection.current !== selectionKey || committedApi.current !== api) return
      setState(old => ({ ...old, error: error.message, phase: 'failed' }))
      callbacks.current.onError?.(error)
    }
    const pollTranscript = async () => {
      if (control.signal.aborted || requestGeneration !== generation.current || committedSelection.current !== selectionKey || committedApi.current !== api) return
      try {
        const page = await api.historyPage(sessionId, { after: cursor.current.after, limit: PAGE_SIZE }, control.signal)
        if (control.signal.aborted || requestGeneration !== generation.current || committedSelection.current !== selectionKey || committedApi.current !== api) return
        if (page.eventSource !== cursor.current.source) {
          // A same-ID resume may switch the active journal. Keep already loaded
          // transcript records rather than mixing independent sequence spaces.
          fail(Error('历史来源已切换；请重新打开会话以查看新执行记录'))
          return
        }
        live(page.events)
        if (page.hasMore) { timer = setTimeout(pollTranscript, 0); return }
        status('只读跟随 · 外部进程状态未知', 'history-follow')
      } catch (cause) { if (!control.signal.aborted) fail(cause as Error) }
      if (!control.signal.aborted) timer = setTimeout(pollTranscript, pollIntervalMs)
    }
    void api.historyPage(sessionId, { limit: PAGE_SIZE }, control.signal).then(page => {
      if (control.signal.aborted || requestGeneration !== generation.current || committedSelection.current !== selectionKey || committedApi.current !== api) return
      cursor.current = { before: page.before, after: page.nextAfter, through: page.through, source: page.eventSource }
      journalAfter = page.journal?.after
      const initialEvents = page.journal ? mergeJournalEvents(page.events,page.journal.events) : page.events
      setState({ selectionKey, ownerApi: api, events: initialEvents, loading: false, loadingOlder: false, hasOlder: page.hasOlder,
        total: page.total, source: page.eventSource, error: '', status: '读取历史完成',
        phase: page.journal || page.eventSource === 'journal' ? 'connecting' : 'history-follow' })
      callbacks.current.onEvents?.(initialEvents)
      void hydrateEvidence(page,{limit:PAGE_SIZE},control,requestGeneration).catch(error=>{if(!control.signal.aborted)fail(error as Error)})
      if (page.journal || page.eventSource === 'journal') stopFollow = api.follow(sessionId, live, status, fail, page.journal?.after ?? page.nextAfter)
      else timer = setTimeout(pollTranscript, pollIntervalMs)
    }, cause => { if (!control.signal.aborted && requestGeneration === generation.current && committedSelection.current === selectionKey && committedApi.current === api) {
      fail(cause as Error); setState(old => ({ ...old, loading: false }))
    } })
    return () => { control.abort(); pageControl.current?.abort(); clearTimeout(timer); stopFollow?.(); generation.current++ }
  }, [api, sessionId, enabled, resetKey, pollIntervalMs, hydrateEvidence])
  const { selectionKey: _selectionKey, ownerApi: _ownerApi, ...publicState } = visible
  return { ...publicState, loadOlder }
}
