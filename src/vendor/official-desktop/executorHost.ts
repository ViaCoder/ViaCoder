// Host state adapter for the unchanged official executor's Xg().inputModule.
const runtime: { inputModule?: Record<string, any> } = {}
export const getExecutorRuntime = () => runtime

// chunk-9nbfnb6f Nt contract: reject the wait, do not claim to cancel native work.
export function withNativeTimeout<T>(work: Promise<T>, ms: number, message: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms)
  })
  return Promise.race([work, timeout]).finally(() => clearTimeout(timer))
}
