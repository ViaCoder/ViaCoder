import {getClientData} from '../clientData.js'

/** Required main/session ports from the 2.1.286 context owner.
 * These are dependencies, not guessed defaults: a missing conversation owner
 * must fail at bind time rather than silently emit or suppress an ATIS value.
 */
export type OfficialClientData286Ports = Readonly<{
  isConversationAtisLatchEnabled(): boolean
  getConversationAtisLatch(): string | undefined
  setConversationAtisLatch(value: string): void
  getClientData(model?: string): Record<string, unknown> | null
}>

export type OfficialClientData286Bindings = Readonly<{
  Td(model?: string): Record<string, unknown> | null
  f6r(): string | undefined
  m6r(): void
}>

function cachedAtis(getData: OfficialClientData286Ports['getClientData']): string | undefined {
  const value = getData()?.atis
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

/** 2.1.286 UYe/f6r/m6r; the reader owns the separate native Td closure. */
export function createOfficialClientData286(ports: OfficialClientData286Ports): OfficialClientData286Bindings {
  return Object.freeze({
    Td: (model?: string) => ports.getClientData(model),
    f6r: () => {
      if (!ports.isConversationAtisLatchEnabled()) return cachedAtis(ports.getClientData)
      const latch = ports.getConversationAtisLatch()
      if (latch === undefined) return cachedAtis(ports.getClientData)
      return latch.length > 0 ? latch : undefined
    },
    m6r: () => {
      if (ports.getConversationAtisLatch() !== undefined) return
      const atis = cachedAtis(ports.getClientData)
      ports.setConversationAtisLatch(atis !== undefined && /^[\x21-\x7e]+$/.test(atis) ? atis : '')
    },
  })
}

/** Direct application binding for the existing config owner. The three
 * conversation methods remain mandatory because this repository has no
 * equivalent session latch owner in this integration surface.
 */
export function bindOfficialClientData286(
  conversation: Pick<OfficialClientData286Ports,
    'isConversationAtisLatchEnabled' | 'getConversationAtisLatch' | 'setConversationAtisLatch'>,
): OfficialClientData286Bindings {
  return createOfficialClientData286({...conversation, getClientData})
}
