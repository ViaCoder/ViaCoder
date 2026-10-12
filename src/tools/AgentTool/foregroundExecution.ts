// 2.1.283 chunk-3qcnxvnw foreground lifecycle / Rmo / Mle: both modes own
// the SAME execution/controller. Moving it never starts a second query.
export function linkForegroundAbort(
  parent: AbortController,
  child: AbortController,
  isBackgrounded: () => boolean,
): () => void {
  const propagate = () => {
    if (!isBackgrounded()) child.abort(parent.signal.reason)
  }
  if (parent.signal.aborted) propagate()
  else parent.signal.addEventListener('abort', propagate, {once: true})
  return () => parent.signal.removeEventListener('abort', propagate)
}

// A pending next() is owned by the foreground race. Consume it exactly once
// before draining the remainder; return()+restart loses that event and replays
// the tools already executed in the foreground.
export async function* continueAgentExecution<T>(
  iterator: AsyncGenerator<T, void>,
  pending: Promise<IteratorResult<T, void>>,
): AsyncGenerator<T, void> {
  const first = await pending
  if (first.done === true) return
  yield first.value
  yield* iterator
}
