import type { ClientOptions } from '@anthropic-ai/sdk'

// Hz selects a credential; Voe recovers that credential's failed token snapshot.
// These records are request provenance only, not another credential/cache store.
type RecoverableAuth =
  | { kind: 'oauth'; token: string }
  | { kind: 'wif'; token: string; invalidate: () => void }
type SelectedAuth = RecoverableAuth | { kind: 'other' }
const clients = new WeakMap<object, object>()
const responses = new WeakMap<Headers, { owner: object; auth: RecoverableAuth }>()

export function trackClientAuth(selected: SelectedAuth, inner: NonNullable<ClientOptions['fetch']>) {
  const owner = {}
  const fetch: NonNullable<ClientOptions['fetch']> = async (input, init) => {
    // SDK default/per-request headers have already been merged here. Never
    // assign a custom bearer (or ambiguous key+bearer) to a saved OAuth login.
    const headers = new Headers(init?.headers ?? (input instanceof Request ? input.headers : undefined))
    const auth = selected.kind !== 'other' && !headers.has('x-api-key') &&
      headers.get('authorization') === `Bearer ${selected.token}` ? selected : undefined
    const response = await inner(input, init)
    // SDK makeStatusError keeps this exact Headers instance. Per-response
    // attribution remains correct when requests on one client overlap.
    if (auth) responses.set(response.headers, { owner, auth })
    return response
  }
  return { fetch, bind<T extends object>(client: T): T { clients.set(client, owner); return client } }
}

export function getFailedClientAuth(client: object | null, headers: Headers | undefined): RecoverableAuth | undefined {
  if (!client || !headers) return undefined
  const record = responses.get(headers)
  return record && record.owner === clients.get(client) ? record.auth : undefined
}
