import type {Command} from '@commander-js/extra-typings'
import type {InitAdoptedContext287} from '../entrypoints/officialInitContext287/runtime.js'
import type {CredentialStore} from '../utils/officialSecureStorage/runtime.js'
import type {StorageV5Backend} from '../utils/secureStorage/storageV5.js'
import {ordinaryPluginSource287} from '../utils/plugins/ordinaryPlugin287.js'

export type PublicSubcommandHandlesReader287 = () => Promise<InitAdoptedContext287 | undefined>
type WithStorage287 = <Args extends unknown[], Result>(
  callback: (storage: StorageV5Backend | undefined, ...args: Args) => Result,
) => (...args: Args) => Promise<Awaited<Result>>
type WithStartupHandles287 = <Args extends unknown[], Result>(
  callback: (storage: StorageV5Backend | undefined, credentials: CredentialStore | undefined, ...args: Args) => Result,
) => (...args: Args) => Promise<Awaited<Result>>
type PluginRegistration287 = (program: Command, withStorage: WithStorage287, withHandles: WithStartupHandles287) => void
type McpRegistration287 = (program: Command, withStorage: WithStorage287) => void

/** Only the ur callback ABI is transported; init owns its existing handles. */
export function createPublicSubcommandWrappers287(read: PublicSubcommandHandlesReader287) {
  const requireHandles = async () => {
    const handles = await read()
    if (handles === undefined) throw new Error('Subcommand initialization did not complete')
    return handles
  }
  const withStorage: WithStorage287 = <Args extends unknown[], Result>(
    callback: (storage: StorageV5Backend | undefined, ...args: Args) => Result,
  ) => async (...args: Args): Promise<Awaited<Result>> => {
    const handles = await requireHandles()
    return await callback(handles.storageV5, ...args)
  }
  const withHandles: WithStartupHandles287 = <Args extends unknown[], Result>(
    callback: (storage: StorageV5Backend | undefined, credentials: CredentialStore | undefined, ...args: Args) => Result,
  ) => async (...args: Args): Promise<Awaited<Result>> => {
    const handles = await requireHandles()
    return await callback(handles.storageV5, handles.credentials, ...args)
  }
  return {withStorage, withHandles}
}

/** Complete original E, including its original availability/kill switches. */
export function registerPublicPluginCommands287(program: Command, read: PublicSubcommandHandlesReader287): void {
  const {withStorage, withHandles} = createPublicSubcommandWrappers287(read)
  const register = ordinaryPluginSource287('chunk-stvp43he.js').registerPluginCommands as PluginRegistration287
  register(program, withStorage, withHandles)
}

/** Complete original de/E/T: no second parser, config store or auth owner. */
export function registerPublicMcpCommands287(program: Command, read: PublicSubcommandHandlesReader287): void {
  const {withStorage} = createPublicSubcommandWrappers287(read)
  const register = ordinaryPluginSource287('chunk-cyh6zh14.js').registerMcpCommands as McpRegistration287
  register(program, withStorage)
}
