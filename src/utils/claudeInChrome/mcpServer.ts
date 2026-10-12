import {createChromeContext287,createChromeServer287} from './runtime287.js'
import {getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import type {ChromeContext287} from '../../services/mcp/officialConnected287/native.js'
import { getClaudeAIOAuthTokens } from '../auth.js'
import { getGlobalConfig } from '../config.js'
import { getAPIProvider } from '../model/providers.js'
import { getAllSocketPaths, getSocketDir } from './common.js'
import { getOauthConfig } from '../../constants/oauth.js'
import { attachLocalPairingHost } from './localPairingHost.js'
import { type createChromeDeviceHost } from './deviceHost.js'

/**
 * Build the ClaudeForChromeContext used by both the subprocess MCP server
 * and the in-process path in the MCP client.
 */
export function createChromeContext(
 env?:Record<string,string>,
 bearerGate:(token:string)=>Promise<boolean>=getMcpConnectedProducer287().chromeBearerGate(null),
 deviceHost?:ReturnType<typeof createChromeDeviceHost>,
):ChromeContext287 {
 const context=createChromeContext287(env,{bearerGate})
 // Explicit fixture/local-host injection remains a C; production uses raw Zc.
 if(deviceHost){const onPaired=context.onExtensionPaired;context.onExtensionPaired=(id,name)=>{deviceHost.onExtensionPaired(id);onPaired(id,name)};context.getPersistedDeviceId=()=>deviceHost.getPersistedDeviceId(()=>getGlobalConfig().chromeExtension?.pairedDeviceId);context.getLocalDeviceIds=deviceHost.getLocalDeviceIds;context.getHostPlatform=deviceHost.getHostPlatform}
 return context
}

// Used by both the stdio subprocess and the in-process MCP connection.
export async function prepareChromeContext(env?: Record<string, string>): Promise<ChromeContext287> {
  const mergedEnv = {...process.env, ...env}
  const source=getMcpConnectedProducer287(),policy=await source.chromePolicyPrepare({})
  if(policy.denied===true)throw new Error('Claude in Chrome is disabled by your organization policy.')
  const context=createChromeContext287(env,{bearerGate:source.chromeBearerGate(policy.verified)})
  return applyChromeLocalTransport287(context,mergedEnv)
}

/** Explicit local pairing C; original standalone K remains the default owner. */
export function applyChromeLocalTransport287(context:ChromeContext287,mergedEnv:Record<string,string|undefined>=process.env):ChromeContext287 {
  const transport = mergedEnv.CLAUDE_CHROME_TRANSPORT
  if (!transport || transport === 'bridge') return context
  if (transport !== 'local-paired') throw new Error(`Unsupported Chrome transport: ${transport}`)
  // Local host opt-in, not an upstream rollout flag. The official public CLI
  // defaults to bridge. Account/org assertions are verified by upstream ft.
  if (getAPIProvider() !== 'firstParty' || !getClaudeAIOAuthTokens()?.accessToken) {
    throw new Error('Local Chrome pairing disabled: first-party OAuth sign-in is required')
  }
  const bridge = context.bridgeConfig as {getOAuthToken: () => Promise<string>}
  const paired=attachLocalPairingHost(context, {
    apiOrigin: getOauthConfig().BASE_API_URL,
    getBearer: bridge.getOAuthToken,
    fetchImpl: globalThis.fetch.bind(globalThis),
  }, {directory: getSocketDir(), paths: getAllSocketPaths})
  Object.assign(context,paired)
  delete context.bridgeConfig
  return context
}

export async function runClaudeInChromeMcpServer(): Promise<void> {
  const {getChromeStandalone287}=await import('./standaloneRuntime287.js')
  await getChromeStandalone287().run()
}
