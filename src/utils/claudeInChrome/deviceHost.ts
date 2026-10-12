/** Official 2.1.283: chunk-x81d715s v4o/Ffr/$fr/Ufr/Bfr.
 * Locality is a host-supplied live hint, NOT inferred from a saved pairing,
 * browser profile, OS name or the mere presence of a native socket.
 */
export type BrowserHints = {
  preferredDeviceId?: string
  localDeviceIds: string[]
  hostPlatform?: string
}

export function createChromeDeviceHost() {
  let hints: BrowserHints | undefined
  let lastSentPreferredDeviceId: string | undefined
  let binding: { selected: () => string | undefined; clear: () => void } | undefined
  return {
    updateBrowserHints(next: BrowserHints) {
      const previous = lastSentPreferredDeviceId
      const preservePick = hints !== undefined && hints.preferredDeviceId === undefined &&
        previous !== undefined && next.preferredDeviceId === previous
      lastSentPreferredDeviceId = next.preferredDeviceId
      hints = next.preferredDeviceId === undefined && next.localDeviceIds.length === 0
        ? undefined
        : { ...next, localDeviceIds: [...next.localDeviceIds],
            ...(preservePick && { preferredDeviceId: undefined }) }
      if (binding && next.preferredDeviceId !== undefined &&
          next.preferredDeviceId !== previous && binding.selected() !== next.preferredDeviceId) {
        binding.clear()
      }
    },
    onExtensionPaired(deviceId: string) {
      if (hints?.preferredDeviceId !== undefined && hints.preferredDeviceId !== deviceId) {
        hints = { ...hints, preferredDeviceId: undefined }
      }
    },
    getPersistedDeviceId(readSaved: () => string | undefined) {
      return hints?.preferredDeviceId ?? readSaved()
    },
    async getLocalDeviceIds(): Promise<Map<string, 'live'> | undefined> {
      return hints && new Map(hints.localDeviceIds.map(id => [id, 'live'] as const))
    },
    getHostPlatform: () => hints?.hostPlatform,
    // clear must clear BOTH the official dispatcher's selection cache and client
    // selection (igr), not just the transport's selectedDeviceId.
    bindSelection(selected: () => string | undefined, clear: () => void) {
      const current = { selected, clear }
      binding = current
      return () => { if (binding === current) binding = undefined }
    },
  }
}

export const chromeDeviceHost = createChromeDeviceHost()
