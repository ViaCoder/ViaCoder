export async function loadRemoteSkill(..._args: unknown[]): Promise<never> {
  throw new Error('Remote skill search is disabled in local builds')
}
