/** chunk-crht2na0 B/b: Escape consumes idle presses but aborts active CU calls. */
export function createDesktopCallLifecycle<T extends { abortController: AbortController }>() {
  let current: T | undefined
  let callsInFlight = 0
  return {
    get current() { return current },
    get callsInFlight() { return callsInFlight },
    isAborted: () => current?.abortController.signal.aborted ?? false,
    onEscape() {
      if (callsInFlight === 0) return false
      current?.abortController.abort()
      return true
    },
    async run<R>(context: T, dispatch: () => Promise<R>): Promise<R> {
      current = context
      callsInFlight++
      try { return await dispatch() }
      finally { callsInFlight-- }
    },
  }
}
