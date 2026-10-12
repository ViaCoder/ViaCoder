/** Missing SSH support is a failure, never a local/unauthenticated substitute. */
export async function loadSSHRuntime<T>(load: () => Promise<T>): Promise<T> {
  try { return await load() }
  catch (cause) {
    if (!(cause instanceof Error) || !/Cannot find|Module not found|module not found|Failed to resolve/i.test(cause.message)) throw cause
    const error = new Error('SSH sessions are not supported in this checkout: the SSH runtime or a required dependency is missing. No SSH connection, authentication proxy, or Plan/clear remote host was started.', { cause })
    error.name = 'SSHRuntimeUnavailableError'
    throw error
  }
}
