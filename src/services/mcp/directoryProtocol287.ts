import {getMcpConnectedProducer287} from './connectedProducer287.js'
import {resolveMcpSdkGeneration} from './v2Lifecycle.js'
import {
 createModernDirectoryRead287,createLegacyDirectoryRead287,
 createModernMcpErrorClassification287,createLegacyMcpErrorClassification287,
 type DirectorySharedPorts287,type ModernDirectoryPorts287,type LegacyDirectoryPorts287,
} from './officialDirectory287/native.js'

// These are the current producer's original selected namespaces, not copied
// schemas, clients, or caches. The source contract pins every imported member.
function sharedPorts287():DirectorySharedPorts287 {
 const owner=getMcpConnectedProducer287()
 const {Y1t}=owner.sourceModule('chunk-gr2z631p.js')
 const {Ja}=owner.sourceModule('chunk-sbndfme5.js')
 const {te}=owner.sourceModule('chunk-amhtwhch.js')
 const {Os}=owner.sourceModule('chunk-3c9s3x4q.js')
 return {Y1t,Ja,te,Os}
}
function modernPorts287():ModernDirectoryPorts287 {
 const owner=getMcpConnectedProducer287()
 const {EAe}=owner.sourceModule('chunk-27kqvvhz.js')
 const {Fs,_l}=owner.sourceModule('chunk-nzxrj88k.js')
 return {...sharedPorts287(),EAe,Fs,_l}
}
function legacyPorts287():LegacyDirectoryPorts287 {
 const owner=getMcpConnectedProducer287()
 const {$s,ZLe}=owner.sourceModule('chunk-764ypttr.js')
 // The existing legacyClient host cut uses this npm SDK. Its unbranded error
 // class must be the same constructor that the actual transport throws.
 const {McpError}=require('@modelcontextprotocol/sdk/types.js') as typeof import('@modelcontextprotocol/sdk/types.js')
 return {...sharedPorts287(),$s,ZLe,Ps:McpError}
}
export function getMcpDirectoryReadModule287(){
 return resolveMcpSdkGeneration()==='v2'?createModernDirectoryRead287(modernPorts287()):createLegacyDirectoryRead287(legacyPorts287())
}
export function getMcpSdkErrorClassificationModule287(){
 return resolveMcpSdkGeneration()==='v2'?createModernMcpErrorClassification287(modernPorts287()):createLegacyMcpErrorClassification287(legacyPorts287())
}
