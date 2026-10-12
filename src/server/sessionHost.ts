import type { StorageV5Backend } from '../utils/secureStorage/storageV5.js'

export type SessionHostErrorCode =
  | 'InvalidArgument'
  | 'NotFound'
  | 'PermissionDenied'
  | 'NotOwner'
  | 'StaleEpoch'
  | 'IdentityChanged'
  | 'Conflict'
  | 'Unsupported'
  | 'Closed'
  | 'Transport'

export class SessionHostError extends Error {
  readonly name = 'SessionHostError'

  constructor(
    readonly code: SessionHostErrorCode,
    message: string,
    readonly identity?: SessionHostIdentity,
  ) {
    super(message)
  }
}

/** Stable conversation identity; ownerId changes when another worker takes over. */
export type SessionHostIdentity = {
  sessionId: string
  ownerId: string
  epoch: number
}

/** Capabilities are claims made by the attached host, never inferred by a viewer. */
export type SessionHostCapabilities = {
  read: boolean
  write: boolean
  delete: boolean
  subscribe: boolean
  control: boolean
  storageV5: boolean
}

export type SessionHostOwner = {
  ownerId: string
  kind: 'local' | 'private' | 'unknown'
  canControl: boolean
}

export type SessionHostSnapshot = {
  identity: SessionHostIdentity
  owner: SessionHostOwner
  capabilities: SessionHostCapabilities
  closed: boolean
}

export type SessionHostEvent = {
  type: string
  sessionId: string
  ownerId: string
  epoch: number
  seq?: number
  [field: string]: unknown
}

export type SessionHostSubscription = { unsubscribe(): void }

/**
 * The server/private host supplies this transport.  The public client does not
 * construct a server, discover a machine, or invent credentials.
 */
export interface SessionHostTransport {
  identity(): SessionHostIdentity | Promise<SessionHostIdentity>
  capabilities(): SessionHostCapabilities | Promise<SessionHostCapabilities>
  subscribe(
    after: number,
    onEvent: (event: SessionHostEvent) => void,
  ): SessionHostSubscription | Promise<SessionHostSubscription>
  storageV5?: StorageV5Backend
}

const validEpoch = (epoch: number): boolean => Number.isSafeInteger(epoch) && epoch >= 0

export function validateSessionHostIdentity(value: unknown): SessionHostIdentity {
  if (!value || typeof value !== 'object') throw new SessionHostError('InvalidArgument', 'Invalid session host identity')
  const input = value as Partial<SessionHostIdentity>
  if (typeof input.sessionId !== 'string' || !input.sessionId ||
    typeof input.ownerId !== 'string' || !input.ownerId ||
    typeof input.epoch !== 'number' || !validEpoch(input.epoch))
    throw new SessionHostError('InvalidArgument', 'Invalid session host identity')
  return { sessionId: input.sessionId, ownerId: input.ownerId, epoch: input.epoch }
}

export function validateSessionHostCapabilities(value: unknown): SessionHostCapabilities {
  if (!value || typeof value !== 'object') throw new SessionHostError('InvalidArgument', 'Invalid session host capabilities')
  const input = value as Partial<SessionHostCapabilities>
  const keys: Array<keyof SessionHostCapabilities> = ['read', 'write', 'delete', 'subscribe', 'control', 'storageV5']
  if (!keys.every(key => typeof input[key] === 'boolean'))
    throw new SessionHostError('InvalidArgument', 'Invalid session host capabilities')
  return {
    read: input.read!, write: input.write!, delete: input.delete!,
    subscribe: input.subscribe!, control: input.control!, storageV5: input.storageV5!,
  }
}

export function assertSessionHostIdentity(
  expected: SessionHostIdentity,
  actual: SessionHostIdentity,
): void {
  if (expected.sessionId !== actual.sessionId)
    throw new SessionHostError('IdentityChanged', 'Session identity changed', actual)
  if (actual.epoch < expected.epoch)
    throw new SessionHostError('StaleEpoch', 'Session host epoch is stale', actual)
  if (actual.epoch === expected.epoch && actual.ownerId !== expected.ownerId)
    throw new SessionHostError('Conflict', 'Two owners advertised the same session epoch', actual)
}

/**
 * Events from an old owner are dropped.  A higher epoch is a host-confirmed
 * handoff and becomes the new identity; a same-epoch owner change is a conflict.
 */
export function acceptSessionHostEvent(
  current: SessionHostIdentity,
  event: SessionHostEvent,
): SessionHostIdentity | undefined {
  const next = validateSessionHostIdentity(event)
  if (next.sessionId !== current.sessionId) return undefined
  if (next.epoch < current.epoch) return undefined
  if (next.epoch === current.epoch && next.ownerId !== current.ownerId) return undefined
  return next
}

export function sessionHostSnapshot(
  identity: SessionHostIdentity,
  capabilities: SessionHostCapabilities,
  owner?: Partial<SessionHostOwner>,
  closed = false,
): SessionHostSnapshot {
  const checked = validateSessionHostIdentity(identity)
  const caps = validateSessionHostCapabilities(capabilities)
  return {
    identity: checked,
    owner: {
      ownerId: owner?.ownerId ?? checked.ownerId,
      kind: owner?.kind ?? 'unknown',
      canControl: owner?.canControl ?? caps.control,
    },
    capabilities: caps,
    closed,
  }
}

/**
 * Client-side adapter for private/background/cross-host sessions.  It only
 * consumes a host transport and preserves the official identity/epoch fence;
 * it never synthesizes a transport or a backend when none is injected.
 */
export class SessionHostAdapter {
  private currentIdentity: SessionHostIdentity
  private currentCapabilities: SessionHostCapabilities
  private closed = false

  constructor(
    private readonly transport: SessionHostTransport,
    identity: SessionHostIdentity,
    capabilities: SessionHostCapabilities,
  ) {
    this.currentIdentity = validateSessionHostIdentity(identity)
    this.currentCapabilities = validateSessionHostCapabilities(capabilities)
  }

  identity(): SessionHostIdentity { return this.currentIdentity }
  capabilities(): SessionHostCapabilities { return this.currentCapabilities }
  storageV5(): StorageV5Backend | undefined {
    return this.currentCapabilities.storageV5 ? this.transport.storageV5 : undefined
  }

  updateSnapshot(snapshot: SessionHostSnapshot): void {
    if (this.closed) throw new SessionHostError('Closed', 'Session host is closed', this.currentIdentity)
    assertSessionHostIdentity(this.currentIdentity, snapshot.identity)
    this.currentIdentity = snapshot.identity
    this.currentCapabilities = validateSessionHostCapabilities(snapshot.capabilities)
    this.closed = snapshot.closed
  }

  async refreshIdentity(): Promise<SessionHostIdentity> {
    if (this.closed) throw new SessionHostError('Closed', 'Session host is closed', this.currentIdentity)
    const identity = validateSessionHostIdentity(await this.transport.identity())
    assertSessionHostIdentity(this.currentIdentity, identity)
    this.currentIdentity = identity
    return identity
  }

  async refreshCapabilities(): Promise<SessionHostCapabilities> {
    if (this.closed) throw new SessionHostError('Closed', 'Session host is closed', this.currentIdentity)
    this.currentCapabilities = validateSessionHostCapabilities(await this.transport.capabilities())
    return this.currentCapabilities
  }

  subscribe(after: number, onEvent: (event: SessionHostEvent) => void): Promise<SessionHostSubscription> {
    if (!Number.isSafeInteger(after) || after < 0)
      return Promise.reject(new SessionHostError('InvalidArgument', 'Invalid session event cursor', this.currentIdentity))
    if (!this.currentCapabilities.subscribe)
      return Promise.reject(new SessionHostError('Unsupported', 'Session host does not advertise subscription', this.currentIdentity))
    let subscription: SessionHostSubscription | undefined
    const guarded = (event: SessionHostEvent): void => {
      const next = acceptSessionHostEvent(this.currentIdentity, event)
      if (next === undefined) return
      this.currentIdentity = next
      onEvent(event)
    }
    return Promise.resolve(this.transport.subscribe(after, guarded)).then(value => {
      subscription = value
      return {
        unsubscribe: () => { subscription?.unsubscribe() },
      }
    })
  }

  close(): void { this.closed = true }
}
