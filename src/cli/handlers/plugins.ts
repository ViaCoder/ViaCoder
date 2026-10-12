/**
 * Plugin and marketplace subcommand handlers — extracted from main.tsx for lazy loading.
 * These are dynamically imported only when `claude plugin *` or `claude plugin marketplace *` runs.
 */
/* eslint-disable custom-rules/no-process-exit -- CLI subcommand handlers intentionally exit */
import figures from 'figures'
import { setUseCoworkPlugins } from '../../bootstrap/state.js'
import { type AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED, logEvent } from '../../services/analytics/index.js'
import { updatePluginCli, VALID_INSTALLABLE_SCOPES, VALID_UPDATE_SCOPES } from '../../services/plugins/pluginCliCommands.js'
import { errorMessage } from '../../utils/errors.js'
import { logError } from '../../utils/log.js'
import { parsePluginIdentifier } from '../../utils/plugins/pluginIdentifier.js'
import { cliError } from '../exit.js'

// Re-export for main.tsx to reference in option definitions
export { VALID_INSTALLABLE_SCOPES, VALID_UPDATE_SCOPES }

/**
 * Helper function to handle marketplace command errors consistently.
 */
export function handleMarketplaceError(error: unknown, action: string): never {
  logError(error)
  cliError(`${figures.cross} Failed to ${action}: ${errorMessage(error)}`)
}

// plugin validate
export async function pluginValidateHandler(manifestPath:string,options:import('./publicPluginMcpHandlers287.js').PluginValidateOptions287):Promise<void>{
 const {getPublicPluginHandlers287,createSubcommandRoot287}=await import('./publicPluginMcpHandlers287.js')
 await getPublicPluginHandlers287().pluginValidateHandler(createSubcommandRoot287,manifestPath,options)
}

// plugin list (lines 5217–5416)
export async function pluginListHandler(options:import('./publicPluginMcpHandlers287.js').PluginListOptions287):Promise<void>{
 const {getPublicPluginHandlers287,createSubcommandRoot287,requirePublicSubcommandHandles287}=await import('./publicPluginMcpHandlers287.js')
 const handles=await requirePublicSubcommandHandles287()
 await getPublicPluginHandlers287().pluginListHandler(createSubcommandRoot287,options,handles.storageV5,handles.credentials)
}

// marketplace add (lines 5433–5487)
export async function marketplaceAddHandler(source:string,options:import('./publicPluginMcpHandlers287.js').MarketplaceAddOptions287):Promise<void>{
 const {getPublicPluginHandlers287,createSubcommandRoot287,requirePublicSubcommandHandles287}=await import('./publicPluginMcpHandlers287.js')
 const handles=await requirePublicSubcommandHandles287()
 await getPublicPluginHandlers287().marketplaceAddHandler(await createSubcommandRoot287(),source,options,handles.storageV5,handles.credentials)
}

// marketplace list (lines 5497–5565)
export async function marketplaceListHandler(options:{cowork?:boolean;json?:boolean}):Promise<void>{
 const {getPublicPluginHandlers287,createSubcommandRoot287,requirePublicSubcommandHandles287}=await import('./publicPluginMcpHandlers287.js')
 const handles=await requirePublicSubcommandHandles287()
 await getPublicPluginHandlers287().marketplaceListHandler(createSubcommandRoot287,options,handles.storageV5)
}

// marketplace remove (lines 5576–5598)
export async function marketplaceRemoveHandler(name:string,options:import('./publicPluginMcpHandlers287.js').MarketplaceRemoveOptions287):Promise<void>{
 const {getPublicPluginHandlers287,createSubcommandRoot287,requirePublicSubcommandHandles287}=await import('./publicPluginMcpHandlers287.js')
 const handles=await requirePublicSubcommandHandles287()
 await getPublicPluginHandlers287().marketplaceRemoveHandler(await createSubcommandRoot287(),name,options,handles.storageV5)
}

// marketplace update (lines 5609–5672)
export async function marketplaceUpdateHandler(name:string|undefined,options:import('./publicPluginMcpHandlers287.js').MarketplaceUpdateOptions287):Promise<void>{
 const {getPublicPluginHandlers287,createSubcommandRoot287,requirePublicSubcommandHandles287}=await import('./publicPluginMcpHandlers287.js')
 const handles=await requirePublicSubcommandHandles287()
 await getPublicPluginHandlers287().marketplaceUpdateHandler(await createSubcommandRoot287(),name,options,handles.storageV5)
}

// plugin install (lines 5690–5721)
export async function pluginInstallHandler(
 plugin:string,
 options:import('../../utils/plugins/ordinaryPlugin287.js').OrdinaryPluginInstallCliOptions287,
):Promise<void>{
 const {installOrdinaryPluginCli287}=await import('../../utils/plugins/ordinaryPlugin287.js')
 const getRoot=async()=>{
  const [{createRoot},{getBaseRenderOptions}]=await Promise.all([import('../../ink.js'),import('../../utils/renderOptions.js')])
  return createRoot({...getBaseRenderOptions(false),patchConsole:false})
 }
 await installOrdinaryPluginCli287(getRoot,plugin,options)
}

// plugin uninstall (lines 5738–5769)
async function getPublicPluginCliRoot287():Promise<import('../../ink.js').Root>{
 const {createSubcommandRoot287}=await import('./pluginSubcommandRoot287.js')
 return createSubcommandRoot287()
}
export async function pluginUninstallHandler(plugin:string,options:import('../../utils/plugins/ordinaryPlugin287.js').OrdinaryPluginUninstallCliOptions287):Promise<void>{
 const {uninstallOrdinaryPluginCli287}=await import('../../utils/plugins/ordinaryPlugin287.js')
 await uninstallOrdinaryPluginCli287(getPublicPluginCliRoot287,plugin,options)
}
export async function pluginPruneHandler(options:import('../../utils/plugins/ordinaryPlugin287.js').OrdinaryPluginPruneCliOptions287):Promise<void>{
 const {pruneOrdinaryPluginCli287}=await import('../../utils/plugins/ordinaryPlugin287.js')
 await pruneOrdinaryPluginCli287(await getPublicPluginCliRoot287(),options)
}
// plugin enable: original ha owns alias resolution, settings and JSON output.
export async function pluginEnableHandler(plugin:string,options:import('../../utils/plugins/ordinaryPlugin287.js').OrdinaryPluginEnableCliOptions287):Promise<void>{
 const {enableOrdinaryPluginCli287}=await import('../../utils/plugins/ordinaryPlugin287.js')
 await enableOrdinaryPluginCli287(getPublicPluginCliRoot287,plugin,options)
}
// plugin disable: original ka owns --all validation and the same writer.
export async function pluginDisableHandler(plugin:string|undefined,options:import('../../utils/plugins/ordinaryPlugin287.js').OrdinaryPluginDisableCliOptions287):Promise<void>{
 const {disableOrdinaryPluginCli287}=await import('../../utils/plugins/ordinaryPlugin287.js')
 await disableOrdinaryPluginCli287(getPublicPluginCliRoot287,plugin,options)
}

// plugin update (lines 5918–5948)
export async function pluginUpdateHandler(
  plugin: string,
  options: { scope?: string; cowork?: boolean; yes?: boolean; json?: boolean; acceptCommand?: string },
): Promise<void> {
  if (options.cowork) setUseCoworkPlugins(true)
  const { name, marketplace } = parsePluginIdentifier(plugin)
  logEvent('tengu_plugin_update_command', {
    _PROTO_plugin_name: name as AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED,
    ...(marketplace && {
      _PROTO_marketplace_name:
        marketplace as AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED,
    }),
  })

  let scope: (typeof VALID_UPDATE_SCOPES)[number] = 'user'
  if (options.scope) {
    if (
      !VALID_UPDATE_SCOPES.includes(
        options.scope as (typeof VALID_UPDATE_SCOPES)[number],
      )
    ) {
      cliError(
        `Invalid scope "${options.scope}". Valid scopes: ${VALID_UPDATE_SCOPES.join(', ')}`,
      )
    }
    scope = options.scope as (typeof VALID_UPDATE_SCOPES)[number]
  }
  if (options.cowork && scope !== 'user') {
    cliError('--cowork can only be used with user scope')
  }

  await updatePluginCli(plugin, options.scope ? scope : undefined, {yes:options.yes,json:options.json,acceptCommand:options.acceptCommand})
}
