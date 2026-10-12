import {startupKey, validateStartupOptions, type ServeStartupOptions} from './serveStartupOptions.js'
import { randomBytes, randomUUID, timingSafeEqual } from 'node:crypto'
import { hostname, networkInterfaces } from 'node:os'
import { ServeConflict, ServeGone, ServeSessionHub, type ServeControl, type ServeTransport } from './serveSession.js'
import { createExistingHeadlessCliTransport } from './serveTransport.js'
import { findTranscriptHistory, listTranscriptHistory, transcriptHistoryPage, transcriptHistoryWindow, validateHistoryWindow } from './serveTranscriptHistory.js'
import { webAssetResponse } from './web/assets.js'
import { publishSharedService, sharedConfigKey, lookupSessionOwner, listSharedSessionOwners, observeExternalSessionWriters, assertNoExternalSessionWriter, type SharedOwner } from './serveDiscovery.js'
import { canonicalHostDirectory, listHostDirectories } from './serveDirectories.js'
import { permissionUpdateSchema } from '../utils/permissions/PermissionUpdateSchema.js'
import { permissionRuleValueFromString } from '../utils/permissions/permissionRuleParser.js'
import { validatePublicCommandControl } from './servePublicCommands.js'
import { sessionRecordedOutput } from './serveRecordedOutput.js'

import { ownerRequest, ownerSocket } from './serveOwnerProxy.js'
import { getServeReleaseIdentity } from './serveReleaseIdentity.js'
import { captureMaintenanceActivity, type CaptureMaintenanceActivityOptions } from './serveMaintenanceActivity.js'
import { createProcessProbe } from '../utils/sessionRename/registry.js'
import {assertExecutionProcess287} from '../utils/confinement287/startupPrivilege287.js'

type WsData = { owner?: SharedOwner; sessionId: string; after: number; unsubscribe?: () => void }
export type ServeOptions = {
  port?: number
  host?: string
  allowLan?: boolean
  authMode?: 'token' | 'none'
  token?: string
  cwd?: string
  /** Offline protocol fixtures can provide a worker; production uses the existing CLI. */
  transportFactory?: (sessionId: string, cwd: string, resumeFrom?: string, startup?: ServeStartupOptions) => ServeTransport
  /** Advertise this explicitly started service in the same-user private registry. */
  advertiseLocal?: boolean
  /** Offline route-test seam; production uses the native read-only observer. */
  maintenanceActivityCapture?: (options: CaptureMaintenanceActivityOptions) => Promise<unknown>
  /** Offline route-test seam for PID identity; production uses the process probe. */
  maintenanceProcessStart?: (pid: number) => Promise<string | undefined>
}

function readStartup(value: unknown): ServeStartupOptions | undefined {
  if (value === undefined) return undefined
  try { return validateStartupOptions(value) }
  catch (error) { throw new ServeConflict(error instanceof Error ? error.message : 'Invalid startup options') }
}

function isPrivateIpv4(host: string): boolean {
  const parts = host.split('.').map(Number)
  if (parts.length !== 4 || parts.some(n => !Number.isInteger(n) || n < 0 || n > 255)) return false
  return parts[0] === 10 || (parts[0] === 172 && parts[1]! >= 16 && parts[1]! <= 31) ||
    (parts[0] === 192 && parts[1] === 168)
}

/** Pick only an RFC1918 interface; never bind a wildcard/public address. */
export function findPrivateLanAddress(): string | undefined {
  for (const entries of Object.values(networkInterfaces())) {
    for (const entry of entries ?? []) {
      if (entry.family === 'IPv4' && !entry.internal && isPrivateIpv4(entry.address)) return entry.address
    }
  }
  return undefined
}

function browserOriginAllowed(request: Request): boolean {
  const site = request.headers.get('sec-fetch-site')
  if (site && site !== 'same-origin' && site !== 'none') return false
  const origin = request.headers.get('origin')
  if (!origin) return true // CLI/API clients without a browser Origin.
  try { return new URL(origin).origin === new URL(request.url).origin }
  catch { return false }
}

function json(value: unknown, status = 200): Response {
  return Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } })
}
function tokenMatches(expected: string, actual: string): boolean {
  const left = Buffer.from(expected), right = Buffer.from(actual)
  return left.length === right.length && timingSafeEqual(left, right)
}
function readCursor(url: URL): number {
  const raw = url.searchParams.get('after') ?? '0'
  if (!/^\d+$/.test(raw)) throw new ServeConflict('Invalid event cursor')
  const after = Number(raw)
  if (!Number.isSafeInteger(after)) throw new ServeConflict('Invalid event cursor')
  return after
}
async function readBody(request: Request): Promise<Record<string, unknown>> {
  const maxBodyBytes = 16 * 1024 * 1024
  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > maxBodyBytes) throw new ServeConflict('Request body too large')
  const reader = request.body?.getReader()
  if (!reader) throw new ServeConflict('Missing JSON body')
  const decoder = new TextDecoder()
  let text = '', received = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    received += value.byteLength
    if (received > maxBodyBytes) { await reader.cancel(); throw new ServeConflict('Request body too large') }
    text += decoder.decode(value, { stream: true })
  }
  text += decoder.decode()
  let value: unknown
  try { value = JSON.parse(text) } catch { throw new ServeConflict('Invalid JSON body') }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new ServeConflict('Expected JSON object')
  return value as Record<string, unknown>
}

/** Local authenticated HTTP/WS facade around a single-writer SDK session hub. */
export function startServe(options: ServeOptions = {}) {
  assertExecutionProcess287('execution-service')
  const port = options.port ?? 0
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new ServeConflict('Invalid port')
  const host = options.host ?? '127.0.0.1'
  if (host !== '127.0.0.1' && (!options.allowLan || !isPrivateIpv4(host))) {
    throw new ServeConflict('LAN binding requires an explicit private IPv4 address and permission')
  }
  const authMode = options.authMode ?? 'token'
  const token = options.token ?? randomBytes(24).toString('base64url')
  if (!token || /[\s,]/.test(token)) throw new ServeConflict('Invalid service token')
  // The launch directory is only the directory browser's initial location.
  // Each admitted session supplies and retains its own canonical worker cwd.
  const initialDirectory = canonicalHostDirectory(options.cwd ?? process.cwd())
  const instanceId = randomUUID()
  const releaseIdentity = getServeReleaseIdentity()
  const configKey = sharedConfigKey()
  const processProbe = createProcessProbe()
  let registration: ReturnType<typeof publishSharedService> | null = null
  const hub = new ServeSessionHub(options.transportFactory ?? ((id, cwd, resumeFrom, startup) =>
    createExistingHeadlessCliTransport(id, cwd, process.env, resumeFrom, startup)), 16, true,
    async (id, cwd) => registration?.claimSession(id, cwd),
    async id => { await registration?.releaseSession(id) })
  const resumes=new Map<string,Promise<import('./serveSession.js').ServeSnapshot>>()
  const server = Bun.serve<WsData>({
    hostname: host, port,
    async fetch(request, server) {
      const url = new URL(request.url)
      // Literal bound-host check blocks DNS rebinding in --no-auth mode;
      // matching Origin alone is not sufficient when a hostile hostname
      // resolves to the private listener.
      if (url.hostname !== host) return json({ error: 'Host not allowed' }, 403)
      if (request.method === 'GET' && url.pathname === '/health') return json({ status: 'ok', ...releaseIdentity })
      if (!browserOriginAllowed(request)) return json({ error: 'Cross-origin browser access denied' }, 403)
      if (request.method === 'GET') {
        const asset = await webAssetResponse(url.pathname)
        if (asset) return asset // Public code/CSS only; /v1 data still requires auth.
      }
      const route = /^\/v1\/sessions\/([0-9a-f-]+)(?:\/(turns|approvals|interactions|controls|events|history|transcript|recorded-output|ws|continue|fork|branch))?$/.exec(url.pathname)
      if (route?.[2] === 'ws' && request.headers.get('upgrade')?.toLowerCase() === 'websocket') {
        const offered = request.headers.get('sec-websocket-protocol')?.split(',').map(value => value.trim()) ?? []
        const protocol = authMode === 'token' ? `cc.serve.${token}` : 'cc.serve'
        if (authMode === 'token' && !offered.some(value => tokenMatches(protocol, value))) return json({ error: 'Unauthorized' }, 401)
        const session = hub.get(route[1]!)
        if (!session || session.snapshot.closed) {
          const owner = await lookupSessionOwner(route[1]!, initialDirectory, instanceId)
          if (owner.kind === 'active') {
            try {
              const after = readCursor(url)
              const replay = await ownerRequest(owner.owner, `/v1/sessions/${route[1]}/events?after=${after}&limit=1`)
              if (!replay.ok) return replay
              await replay.body?.cancel()
              if (server.upgrade(request, { data: { sessionId: route[1]!, after, owner: owner.owner },
                headers: offered.includes(protocol) ? { 'Sec-WebSocket-Protocol': protocol } : undefined })) return
              return json({ error: 'Upgrade failed' }, 400)
            } catch { return json({ error: 'Shared owner connection failed' }, 502) }
          }
          if (owner.kind === 'unreachable') return json({error:owner.reason},409)
        }
        if (!session) return json({ error: hub.getRecovered(route[1]!) ? 'Session worker stopped; history is read-only' : 'Session not found' },
          hub.getRecovered(route[1]!) ? 410 : 404)
        try {
          const after = readCursor(url)
          session.replay(after)
          if (server.upgrade(request, { data: { sessionId: session.id, after },
            headers: offered.includes(protocol) ? { 'Sec-WebSocket-Protocol': protocol } : undefined })) return
          return json({ error: 'Upgrade failed' }, 400)
        } catch (error) {
          return json({ error: error instanceof Error ? error.message : 'Invalid cursor' }, error instanceof ServeGone ? 410 : 409)
        }
      }
      const authorization = request.headers.get('authorization') ?? ''
      if (authMode === 'token' && (!authorization.startsWith('Bearer ') || !tokenMatches(token, authorization.slice(7)))) return json({ error: 'Unauthorized' }, 401)
      try {
        if (request.method === 'GET' && url.pathname === '/v1/identity') {
          return json({ instanceId, configKey })
        }
        if (request.method === 'GET' && url.pathname === '/v1/maintenance/activity') {
          const observedAt = Date.now()
          const processStart = options.maintenanceProcessStart ?? (pid => processProbe.start(pid))
          const pidStart = await processStart(process.pid)
          const snapshots = hub.list().map(snapshot => ({ snapshot, pid: process.pid,
            pidStart: pidStart ?? '', ownerId: snapshot.identity?.ownerId ?? '', ownerPublished: registration !== null }))
          const capture = options.maintenanceActivityCapture ?? captureMaintenanceActivity
          const report = await capture({ snapshots, snapshotsObservedAt: observedAt,
            localInstanceId: instanceId, processStart })
          return json(report)
        }
        if (request.method === 'GET' && url.pathname === '/v1/host') {
          return json({ hostname: hostname(), initialDirectory })
        }
        if (request.method === 'GET' && url.pathname === '/v1/directories') {
          return json(listHostDirectories(url.searchParams.get('path') ?? initialDirectory))
        }
        if (request.method === 'GET' && url.pathname === '/v1/sessions') {
          const [history, writers, owners] = await Promise.all([listTranscriptHistory(), observeExternalSessionWriters(), listSharedSessionOwners(instanceId)])
          const catalog = new Map<string, import('./serveSession.js').ServeSnapshot>(history.map(item => [item.sessionId,item]))
          for (const item of hub.list()) {
            const disk = catalog.get(item.sessionId)
            catalog.set(item.sessionId, { ...item, title: item.title ?? disk?.title,
              cwd: item.cwd ?? disk?.cwd, updatedAt: disk?.updatedAt ?? item.createdAt })
          }
          for (const [id,item] of catalog) {
            const local = hub.get(id)
            if (local && !local.snapshot.closed) continue
            catalog.set(id, {...item, executorState: {status: !writers || !owners || owners.get(id)?.kind === 'unreachable' ?
              'external-unknown' : writers.has(id) ? 'external-live' : 'closed', canControl:false}})
          }
          for (const result of owners?.values() ?? []) {
            if (result.kind !== 'active') continue
            const {snapshot} = result
            const disk = catalog.get(snapshot.sessionId)
            catalog.set(snapshot.sessionId, { ...snapshot, title: snapshot.title ?? disk?.title,
              updatedAt: disk?.updatedAt ?? snapshot.createdAt })
          }
          return json({ sessions: [...catalog.values()].sort((a, b) =>
            (b.updatedAt ?? b.createdAt) - (a.updatedAt ?? a.createdAt) || a.sessionId.localeCompare(b.sessionId)) })
        }
        if (request.method === 'POST' && url.pathname === '/v1/sessions') {
          const body = await readBody(request)
          if (Object.keys(body).some(key => key !== 'cwd' && key !== 'startup' && key !== 'resumeFrom')) throw new ServeConflict('Invalid session creation payload')
          let cwd = canonicalHostDirectory(body.cwd)
          let resumeFrom: string | undefined
          if (body.resumeFrom !== undefined) {
            if (typeof body.resumeFrom !== 'string') throw new ServeConflict('Invalid fork source')
            const source = hub.get(body.resumeFrom)?.snapshot ?? hub.getRecovered(body.resumeFrom)?.snapshot ??
              (await findTranscriptHistory(body.resumeFrom))?.snapshot
            if (!source?.cwd) throw new ServeConflict('Fork source has no saved host directory')
            cwd = canonicalHostDirectory(source.cwd)
            resumeFrom = body.resumeFrom
          }
          const startup = readStartup(body.startup)
          const session = hub.create(cwd, resumeFrom, startup)
          try { session.onStopped(await registration?.claimSession(session.id, cwd)) }
          catch (error) { await hub.remove(session.id); throw error }
          return json(session.snapshot, 201)
        }
        if (!route) return json({ error: 'Not found' }, 404)
        const liveSession = hub.get(route[1]!)
        const owner = !liveSession || liveSession.snapshot.closed
          ? await lookupSessionOwner(route[1]!, initialDirectory, instanceId) : {kind:'none' as const}
        if (!liveSession || liveSession.snapshot.closed) {
          if (owner.kind === 'active') return await ownerRequest(owner.owner, url.pathname + url.search,
            request.method === 'POST' ? new Request(request, {body:JSON.stringify(await readBody(request))}) : request)
          if (owner.kind === 'unreachable' && request.method !== 'GET') throw new ServeConflict(owner.reason)
        }
        const archived = liveSession ?? hub.getRecovered(route[1]!)
        const disk = archived ? undefined : await findTranscriptHistory(route[1]!)
        const session = archived ?? (disk ? { id: route[1]!, snapshot: disk.snapshot } : undefined)
        if (!session) return json({ error: 'Session not found' }, 404)
        const kind = route[2]
        if (request.method === 'GET' && kind === 'recorded-output') {
          if ([...url.searchParams.keys()].some(key => key !== 'recordId' && key !== 'index') ||
            url.searchParams.getAll('recordId').length !== 1 || url.searchParams.getAll('index').length !== 1)
            throw new ServeConflict('Invalid recorded output reference')
          const recordId = url.searchParams.get('recordId')
          const rawIndex = url.searchParams.get('index')
          if (!recordId || !rawIndex || !/^(0|[1-9]\d*)$/.test(rawIndex)) throw new ServeConflict('Invalid recorded output reference')
          return json(await sessionRecordedOutput(session.id, recordId, Number(rawIndex), archived))
        }
        if (request.method === 'GET' && !kind) {
          let executorState = session.snapshot.executorState
          if (!liveSession || liveSession.snapshot.closed) {
            const writers = await observeExternalSessionWriters()
            executorState = { status: !writers || owner.kind === 'unreachable' ? 'external-unknown' :
              writers.has(session.id) ? 'external-live' : 'closed', canControl:false }
          }
          const history=disk??await findTranscriptHistory(route[1]!)
          return json({...session.snapshot,historyState:history?.snapshot.historyState,
            eventSource:session.snapshot.eventSource??'journal',
            executorState:executorState??{status:'closed',canControl:false}})
        }
        if(request.method==='GET'&&(kind==='history'||kind==='transcript')){
          const query:import('./serveTranscriptHistory.js').HistoryWindow={limit:Number(url.searchParams.get('limit')??50),
            ...Object.fromEntries(['before','after','through'].filter(k=>url.searchParams.has(k)).map(k=>[k,Number(url.searchParams.get(k))]))}
          validateHistoryWindow(query)
          const history=disk??await findTranscriptHistory(route[1]!)
          if(history){
            const page = await transcriptHistoryWindow(route[1]!,history.filePath,query)
            // Transcript and journal have independent sequence spaces. Keep
            // full disk pagination, plus a bounded live seed/cursor; never
            // make a persisted live session fall back to transcript polling.
            if(archived){
              const after=url.searchParams.has('evidenceThrough')?Number(url.searchParams.get('evidenceThrough')):session.snapshot.lastSeq
              const evidenceAfter=Number(url.searchParams.get('evidenceAfter')??0)
              if(!Number.isSafeInteger(after)||after<0||after>session.snapshot.lastSeq||!Number.isSafeInteger(evidenceAfter)||evidenceAfter<0||evidenceAfter>after)
                throw new ServeConflict('Invalid history evidence cursor')
              const initial=query.before===undefined && query.after===undefined && !url.searchParams.has('evidenceAfter')
              // Continue the same fixed live window while evidence paginates,
              // even if the active response completes between HTTP requests.
              const liveWindow=query.before===undefined && query.after===undefined
                ?archived.replay(Math.max(0,after-query.limit),query.limit):[]
              const tail=initial?liveWindow:[]
              const pending=initial?liveSession?.pendingInputEvents()??[]:[]
              const evidence=archived.historyEvidence(page.events,after,evidenceAfter,liveWindow)
              const events=[...new Map([...evidence.events,...pending,...tail].map(event=>[event.seq,event])).values()]
                .sort((a,b)=>a.seq-b.seq).map(event=>({...event,recordId:`journal:${session.id}:${event.seq}`}))
              return json({...page,journal:{events,after,evidence:{nextAfter:evidence.nextAfter,hasMore:evidence.hasMore}}})
            }
            return json(page)
          }
          if(!archived)throw new ServeGone('Transcript not found')
          const through=query.through??session.snapshot.lastSeq
          if(through>session.snapshot.lastSeq)throw new ServeConflict('History snapshot boundary is not available')
          const end=Math.min(through+1,query.before??through+1)
          const after=query.after??Math.max(0,end-1-query.limit)
          const events=archived.replay(after,query.limit).filter(e=>e.seq<end&&e.seq<=through).map(e=>({...e,recordId:`journal:${session.id}:${e.seq}`}))
          const before=events[0]?.seq??0,nextAfter=events.at(-1)?.seq??after
          return json({events,eventSource:'journal',executorGeneration:session.snapshot.executorGeneration,
            total:through,through,before,nextAfter,hasOlder:before>1,hasMore:nextAfter<through})
        }
        if (request.method === 'GET' && kind === 'events') {
          const after = readCursor(url)
          const limitRaw = url.searchParams.get('limit') ?? '500'
          if (!/^\d+$/.test(limitRaw)) throw new ServeConflict('Invalid page size')
          if (disk) return json(await transcriptHistoryPage(disk.filePath, after, Number(limitRaw)))
          const events = archived!.replay(after, Number(limitRaw))
          const lastSeq = session.snapshot.lastSeq
          const nextCursor = events.at(-1)?.seq ?? after
          return json({ events, lastSeq, nextCursor, hasMore: nextCursor < lastSeq,eventSource:'journal',executorGeneration:session.snapshot.executorGeneration })
        }
        if (request.method === 'POST' && (kind === 'continue'||kind==='fork')) {
          const body = request.body ? await readBody(request) : {}
          if (Object.keys(body).some(key => key !== 'cwd' && key !== 'startup')) throw new ServeConflict('Invalid resume payload')
          const startup=readStartup(body.startup)
          if(kind==='continue'&&liveSession&&!liveSession.snapshot.closed){
            if(body.cwd!==undefined&&canonicalHostDirectory(body.cwd)!==liveSession.cwd)throw new ServeConflict('Resume must use the saved host directory')
            if(startup&&(Object.keys(startup.values).length||Object.keys(startup.env).length)&&startupKey(startup)!==liveSession.launchKey)throw new ServeConflict('Live shared session has different startup options; not changed')
            return json(liveSession.snapshot)
          }
          let savedCwd:string|undefined
          if(session.snapshot.cwd)try{savedCwd=canonicalHostDirectory(session.snapshot.cwd)}catch{}
          const chosenCwd=body.cwd===undefined?undefined:canonicalHostDirectory(body.cwd)
          if(savedCwd&&chosenCwd&&chosenCwd!==savedCwd)throw new ServeConflict('Resume must use the saved host directory')
          const cwd=savedCwd??chosenCwd
          if(!cwd)throw new ServeConflict('Select a host directory to resume this history')
          if(kind==='fork'){
            const fork=hub.create(cwd,session.id,startup)
            try{fork.onStopped(await registration?.claimSession(fork.id,cwd))}catch(error){await hub.remove(fork.id);throw error}
            return json(fork.snapshot,201)
          }
          let flight=resumes.get(session.id)
          if(!flight){
            flight=(async()=>{
              const owner=await lookupSessionOwner(session.id,cwd)
              if(owner.kind!=='none')throw new ServeConflict('Session already has a shared owner; attach through its registered service')
              try{await assertNoExternalSessionWriter(session.id)}catch(error){throw new ServeConflict(error instanceof Error?error.message:'Session ownership is unknown')}
              if(liveSession?.snapshot.closed){await liveSession.close();await registration?.releaseSession(session.id)}
              let release:(()=>Promise<void>)|undefined
              try{release=await registration?.claimSession(session.id,cwd)}catch(error){throw new ServeConflict(error instanceof Error?error.message:'Session ownership claim failed')}
              try{const resumed=await hub.resume(session.id,cwd,startup);resumed.onStopped(release);return resumed.snapshot}
              catch(error){await release?.();throw error}
            })()
            resumes.set(session.id,flight)
            void flight.finally(()=>resumes.delete(session.id)).catch(()=>{})
          }
          const resumed=await flight
          if(startup&&(Object.keys(startup.values).length||Object.keys(startup.env).length)&&startupKey(startup)!==resumed.launchKey)throw new ServeConflict('Live shared session has different startup options; not changed')
          return json(resumed,202)
        }
        if (!liveSession) throw new ServeGone('Session worker stopped; history is read-only')
        if (request.method === 'POST' && kind === 'branch') {
          const body = await readBody(request)
          if (typeof body.operationId !== 'string' || Object.keys(body).some(key => key !== 'operationId' && key !== 'title') ||
            (body.title !== undefined && typeof body.title !== 'string')) throw new ServeConflict('Invalid branch request')
          const branchTitle = typeof body.title === 'string' ? body.title : undefined
          const result = await liveSession.requestControl(body.operationId, {
            subtype: 'local_public_branch', ...(branchTitle !== undefined ? {title:branchTitle} : {}),
          })
          const transcriptId = result.response && 'sessionId' in result.response ? result.response.sessionId : undefined
          if (typeof transcriptId !== 'string') throw new ServeConflict('Worker did not return a branch transcript ID')
          const existing = hub.get(transcriptId) ?? hub.getRecovered(transcriptId)
          if (existing) return json(existing.snapshot)
          const cwd = canonicalHostDirectory(liveSession.cwd)
          try {
            const release=await registration?.claimSession(transcriptId, cwd)
            const child = hub.adoptTranscript(transcriptId, cwd, liveSession.id)
            child.onStopped(release)
            return json(child.snapshot, 201)
          } catch (error) { await registration?.releaseSession(transcriptId); throw error }
        }
        if (request.method === 'DELETE' && !kind) {
          await hub.remove(session.id)
          await registration?.releaseSession(session.id)
          return json({ removed: true })
        }
        if (request.method === 'POST' && kind === 'turns') {
          const body = await readBody(request)
          if (typeof body.operationId !== 'string' || (typeof body.content !== 'string' && !Array.isArray(body.content))) throw new ServeConflict('Invalid turn')
          if (body.source !== undefined && body.source !== 'terminal' && body.source !== 'web') throw new ServeConflict('Invalid client source')
          if (body.intent !== undefined && body.intent !== 'literal' && body.intent !== 'command') throw new ServeConflict('Invalid turn intent')
          if (body.source === 'terminal' && body.intent === 'literal') throw new ServeConflict('Literal intent is only available for Web turns')
          // Source is display metadata supplied by the client, not an authority
          // boundary. Both paths enter the same session queue and SDK worker.
          return json(liveSession.enqueueTurn(body.source === 'terminal' ? 'terminal' : 'web', body.operationId,
            body.content as string | Array<{ type: string; [key: string]: unknown }>, body.intent === 'literal' ? 'literal' : 'command'), 202)
        }
        if (request.method === 'POST' && kind === 'approvals') {
          const body = await readBody(request)
          if (typeof body.operationId !== 'string' || typeof body.requestId !== 'string' || typeof body.allowed !== 'boolean') throw new ServeConflict('Invalid approval')
          if (body.updatedInput !== undefined && (!body.updatedInput || typeof body.updatedInput !== 'object' || Array.isArray(body.updatedInput))) throw new ServeConflict('Invalid updatedInput')
          if (body.denyMessage !== undefined && typeof body.denyMessage !== 'string') throw new ServeConflict('Invalid denyMessage')
          if (body.interrupt !== undefined && typeof body.interrupt !== 'boolean') throw new ServeConflict('Invalid interrupt')
          if (body.decisionClassification !== undefined) throw new ServeConflict('Classification is SDK-owned')
          if (body.updatedPermissions !== undefined && !Array.isArray(body.updatedPermissions)) throw new ServeConflict('Invalid updatedPermissions')
          const result = await liveSession.answerApproval(body.operationId, body.requestId, body.allowed,
            body.updatedInput as Record<string, unknown> | undefined, body.denyMessage as string | undefined,
            body.updatedPermissions as import('../types/permissions.js').PermissionUpdate[] | undefined,
            body.interrupt as boolean | undefined)
          return json(result)
        }
        if (request.method === 'POST' && kind === 'interactions') {
          const body = await readBody(request)
          if (typeof body.operationId !== 'string' || typeof body.requestId !== 'string') throw new ServeConflict('Invalid interaction')
          return json(await liveSession.answerElicitation(body.operationId, body.requestId,
            { action: body.action, ...(body.content !== undefined ? { content: body.content } : {}) }))
        }
        if (request.method === 'POST' && kind === 'controls') {
          const body = await readBody(request)
          if (typeof body.operationId !== 'string' || !body.request || typeof body.request !== 'object' || Array.isArray(body.request)) throw new ServeConflict('Invalid control')
          const control = body.request as Record<string, unknown>
          const keys = Object.keys(control)
          const publicControl = validatePublicCommandControl(control)
          if (publicControl) {
            return json(await liveSession.requestControl(body.operationId, publicControl))
          }
          if (control.subtype === 'interrupt' || control.subtype === 'get_plan' || control.subtype === 'list_permission_rules') {
            if (keys.length !== 1) throw new ServeConflict('Invalid control payload')
          } else if (control.subtype === 'local_update_permission_rules') {
            if (keys.some(key => key !== 'subtype' && key !== 'update')) throw new ServeConflict('Invalid permission rule control')
            const update = control.update && typeof control.update === 'object' && !Array.isArray(control.update)
              ? control.update as Record<string, unknown> : null
            // Browser row deletion carries the worker's displayed rule text;
            // reuse the canonical parser here, never duplicate rule grammar in UI.
            if (update?.type === 'removeRules' && typeof update.ruleText === 'string' &&
              update.rules === undefined && Object.keys(update).every(key =>
                ['type', 'ruleText', 'behavior', 'destination'].includes(key))) {
              control.update = { type: 'removeRules', rules: [permissionRuleValueFromString(update.ruleText)],
                behavior: update.behavior, destination: update.destination }
            }
            const parsed = permissionUpdateSchema().safeParse(control.update)
            if (!parsed.success || (parsed.data.type !== 'addRules' && parsed.data.type !== 'removeRules') || !parsed.data.rules.length) throw new ServeConflict('Invalid permission rule update')
            control.update = parsed.data
          } else if (control.subtype === 'local_get_session_title') {
            if (keys.some(key => key !== 'subtype' && key !== 'session_id') || (control.session_id !== undefined && control.session_id !== session.id)) throw new ServeConflict('Invalid title observation control')
          } else if (control.subtype === 'rename_session') {
            if (keys.some(key => key !== 'subtype' && key !== 'title') || typeof control.title !== 'string') throw new ServeConflict('Invalid title control')
          } else if (control.subtype === 'set_model') {
            if (keys.some(key => key !== 'subtype' && key !== 'model') || (control.model !== undefined && typeof control.model !== 'string')) throw new ServeConflict('Invalid model control')
          } else if (control.subtype === 'set_permission_mode') {
            if (keys.some(key => key !== 'subtype' && key !== 'mode') || typeof control.mode !== 'string') throw new ServeConflict('Invalid mode control')
          } else throw new ServeConflict('Unsupported control')
          return json(await liveSession.requestControl(body.operationId, control as ServeControl))
        }
        return json({ error: 'Not found' }, 404)
      } catch (error) {
        if (error instanceof ServeGone) return json({ error: error.message }, 410)
        if (error instanceof ServeConflict) return json({ error: error.message }, 409)
        return json({ error: 'Session transport failed' }, 500)
      }
    },
    websocket: {
      open(ws) {
        if (ws.data.owner) {
          ws.data.unsubscribe = ownerSocket(ws.data.owner, ws.data.sessionId, ws.data.after,
            data => ws.send(data), () => ws.close(1013, 'Shared owner disconnected; reconnect from event cursor'))
          return
        }
        const session = hub.get(ws.data.sessionId)
        if (!session) { ws.close(1008, 'Session not found'); return }
        try {
          ws.data.unsubscribe = session.subscribe(ws.data.after, event => {
            const status = ws.send(JSON.stringify(event))
            // Bun returns 0 for a dropped frame and -1 for backpressure.
            // Close rather than leave a connected viewer silently missing
            // events; the numbered disk journal supports reattachment.
            if (status <= 0) {
              ws.close(1013, 'Viewer backpressure; reconnect from event cursor')
              throw new Error('Viewer backpressure')
            }
          })
        } catch { if (ws.readyState === WebSocket.OPEN) ws.close(1008, 'Event replay failed') }
      },
      message(ws) { ws.close(1003, 'Submit operations over HTTP') },
      close(ws) { ws.data.unsubscribe?.() },
    },
  })
  if (options.advertiseLocal) {
    registration = publishSharedService(`http://${host}:${server.port}/`, token, instanceId, authMode)
  }
  return {
    hub, token, port: server.port,
    url: `http://${host}:${server.port}`,
    authMode,
    async close() { server.stop(true); await hub.closeAll(); await registration?.close() },
  }
}
