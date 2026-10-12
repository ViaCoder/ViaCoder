import {getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import type {ChromeContext287,ChromeContextOptions287,ChromeSocketClient287,ChromeServer287} from '../../services/mcp/officialConnected287/native.js'

export function createChromeContext287(env:Record<string,string>|undefined,options:ChromeContextOptions287):ChromeContext287 {
 return getMcpConnectedProducer287().dynamicModules['chunk-7eyrbz6k.js'].createChromeContext(env,options)
}
/** Keep the existing local lifecycle C: closing the canonical MCP Server must
 * also terminate its exact bridge socket, pending requests and reconnect timer.
 * The fixed287 qFn/Vwo bodies and single Zc binding are unchanged. */
export function createChromeServer287(context:ChromeContext287,client?:ChromeSocketClient287):ChromeServer287 {
 const source=getMcpConnectedProducer287(),makeSocket=source.dynamicModules['chunk-z87hm33f.js'].createChromeSocketClient
 const socket=client??(context.localPairing?(require('./localPairingHost.js') as typeof import('./localPairingHost.js')).createIdentityBoundPairingClient(context,makeSocket):makeSocket(context))
 source.dynamicModules['chunk-y05pa6gs.js'].setChromeBinding(context,socket)
 source.dynamicModules['chunk-kd5efewf.js'].registerChromeTabGroupCleanup()
 const server=source.dynamicModules['chunk-z87hm33f.js'].createClaudeForChromeMcpServer(context,socket)
 return server
}
export function getChromePermissionOverrides287(name:string){return getMcpConnectedProducer287().dynamicModules['chunk-y05pa6gs.js'].getClaudeInChromePermissionOverrides(name)}
