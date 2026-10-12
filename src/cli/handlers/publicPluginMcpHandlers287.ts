import type {Root} from '../../ink.js'
import type {InitAdoptedContext287} from '../../entrypoints/officialInitContext287/runtime.js'
import type {StorageV5Backend} from '../../utils/secureStorage/storageV5.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
import {ordinaryPluginSource287} from '../../utils/plugins/ordinaryPlugin287.js'
import {createSubcommandRoot287} from './pluginSubcommandRoot287.js'

type RootReader = () => Promise<Root>
type Storage = StorageV5Backend | undefined
type Credentials = CredentialStore | undefined
export type PluginValidateOptions287 = {cowork?: boolean; strict?: boolean; json?: boolean}
export type PluginListOptions287 = {cowork?: boolean; json?: boolean; available?: boolean; dataSize?: string | boolean}
export type MarketplaceAddOptions287 = {cowork?: boolean; sparse?: string[]; scope?: string; claudeai?: boolean; fromLink?: boolean; resolveOnly?: boolean; json?: boolean}
export type MarketplaceRemoveOptions287 = {cowork?: boolean; scope?: string; json?: boolean}
export type MarketplaceUpdateOptions287 = {cowork?: boolean; json?: boolean}
type PluginPublicHandlers287 = {
  pluginValidateHandler(root: RootReader, path: string, options: PluginValidateOptions287): Promise<void>
  pluginListHandler(root: RootReader, options: PluginListOptions287, storage: Storage, credentials: Credentials): Promise<void>
  marketplaceAddHandler(root: Root, source: string, options: MarketplaceAddOptions287, storage: Storage, credentials: Credentials): Promise<void>
  marketplaceListHandler(root: RootReader, options: {cowork?: boolean; json?: boolean}, storage: Storage): Promise<void>
  marketplaceRemoveHandler(root: Root, name: string, options: MarketplaceRemoveOptions287, storage: Storage): Promise<void>
  marketplaceUpdateHandler(root: Root, name: string | undefined, options: MarketplaceUpdateOptions287, storage: Storage): Promise<void>
}
type McpPublicHandlers287 = {
  mcpListHandler(root: Root, storage: Storage, credentials: Credentials): Promise<void>
  mcpGetHandler(root: Root, name: string, storage: Storage, credentials: Credentials): Promise<void>
}

export function getPublicPluginHandlers287(): PluginPublicHandlers287 {
  return ordinaryPluginSource287('chunk-3q8hrxfm.js') as PluginPublicHandlers287
}
export function getPublicMcpHandlers287(): McpPublicHandlers287 {
  return ordinaryPluginSource287('chunk-c4twtxks.js') as McpPublicHandlers287
}

/** Borrow init's memoized result, never initialize a replacement credential/cache owner. */
export async function readPublicSubcommandHandles287(): Promise<InitAdoptedContext287 | undefined> {
  const {init} = await import('../../entrypoints/init.js')
  return await init()
}
export async function requirePublicSubcommandHandles287(): Promise<InitAdoptedContext287> {
  const handles = await readPublicSubcommandHandles287()
  if (handles === undefined) throw new Error('Subcommand initialization did not complete')
  return handles
}
export {createSubcommandRoot287}
