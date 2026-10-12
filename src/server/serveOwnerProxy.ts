import type { SharedOwner } from './serveDiscovery.js'

/** Only a verified private-registry owner reaches here. Never accept a URL,
 * credential or path from the browser, and never forward browser credentials. */
export async function ownerRequest(owner: SharedOwner, path: string, request?: Request): Promise<Response> {
  const headers = new Headers()
  if (owner.authMode === 'token') headers.set('authorization', `Bearer ${owner.authToken}`)
  if (request?.headers.has('content-type')) headers.set('content-type', request.headers.get('content-type')!)
  const method = request?.method ?? 'GET'
  const response = await fetch(new URL(path, owner.serverUrl), {
    method, headers, redirect: 'error',
    ...(method !== 'GET' && method !== 'HEAD' ? { body: await request!.arrayBuffer() } : {}),
    // The existing worker owns acknowledgement/cancellation lifetime. A slow
    // public control must not become a facade-only timeout after admission.
    // Viewer disconnect aborts only this HTTP observation, never the operation.
    signal: request?.signal,
  })
  // Tokens, cookies and service-local redirects must not cross the facade.
  return new Response(response.body, { status: response.status, headers: {
    'content-type': response.headers.get('content-type') ?? 'application/json', 'cache-control': 'no-store',
  } })
}

export function ownerSocket(owner: SharedOwner, sessionId: string, after: number,
  send: (data: string) => number, close: () => void): () => void {
  const url = new URL(`/v1/sessions/${sessionId}/ws?after=${after}`, owner.serverUrl)
  url.protocol = 'ws:'
  const upstream = new WebSocket(url, owner.authMode === 'token' ? `cc.serve.${owner.authToken}` : 'cc.serve')
  upstream.onmessage = event => { if (typeof event.data !== 'string' || send(event.data) <= 0) { upstream.close(); close() } }
  upstream.onerror = close
  upstream.onclose = close
  return () => { upstream.onclose = null; upstream.onerror = null; upstream.close() }
}
