import {createPrintMcpCall287} from './mcpCallNative.js'
import {createPrintLexicalPorts287} from './requesterBridgeRuntime287.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import {getMcpClientModule287,getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import {getMcpSdkErrorClassificationModule287} from '../../services/mcp/directoryProtocol287.js'
import {resolveMcpSdkGeneration} from '../../services/mcp/v2Lifecycle.js'
import type {Store} from '../../state/store.js'
import type {AppState} from '../../state/AppState.js'

export function getPrintMcpAuthOwner287(store:Store<AppState>){
 const QGe=getPrintHostSource287('chunk-3ydwrp4g.js','QGe') as {over(store:Store<AppState>):{markNeedsAuth(name:string):void}}
 return QGe.over(store)
}

/** Read the original selected client namespace from the existing connection
 * producer. This does not instantiate another module/cache or fall back to V1. */
function clientModule287(){
 const modern=resolveMcpSdkGeneration()==='v2'
 const owner=getMcpConnectedProducer287()
 const source=owner.sourceModule(modern?'chunk-amg94xhm.js':'chunk-fdjgzr8v.js')
 return {...getMcpClientModule287(),ensureConnectedClient:modern?owner.ensureModern:owner.ensureLegacy,
  callMCPToolWithUrlElicitationRetry:source[modern?'za':'Hn'],
  extractUrlElicitationsFromMcpError:source[modern?'Ba':'Nn'],
 }
}
export function createPrintMcpCallDispatcher287(caller:object){
 // createPrintLexicalPorts reads only own properties. Forward all caller
 // descriptors rather than taking a snapshot of its mutable pools and cells.
 const own=Object.defineProperties({},Object.getOwnPropertyDescriptors(caller))
 Object.defineProperties(own,Object.getOwnPropertyDescriptors({yn:clientModule287,HA:getMcpSdkErrorClassificationModule287,
  // The transport throws these constructors from its own source namespace.
  // A separately restored canonical class would fail original instanceof.
  get nI(){return getMcpConnectedProducer287().sourceModule('chunk-nankzm0s.js').nI},
  get zH(){return getMcpConnectedProducer287().sourceModule('chunk-nankzm0s.js').zH},
  staged:async()=>({runStagedMcpCall:getPrintHostSource287('chunk-knk59x38.js','xt')}),
 }))
 return createPrintMcpCall287(createPrintLexicalPorts287(own))
}
