import axios from 'axios'
import {Agent} from 'node:https'
import {lookup} from 'node:dns'
import {checkServerIdentity} from 'node:tls'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getSecureStorage} from '../../utils/secureStorage/index.js'
import {filesCredentialSlots} from '../../vendor/official-files-api/slots.js'
import {sharedOAuthDescriptor} from '../../utils/sharedOAuthDescriptor.js'
import {sharedOAuthDescriptorReaders} from '../../utils/sharedOAuthHandoff.js'
import {logForDebugging} from '../../utils/debug.js'
import {getCACertificates} from '../../utils/caCerts.js'
import {getMTLSConfig} from '../../utils/mtls.js'
import {getProxyUrl,shouldBypassProxy} from '../../utils/proxy.js'
import {getOauthConfig} from '../../constants/oauth.js'
import {isSettingsPrimerEnabled287} from '../../utils/settings/settingsCache.js'
import {createGatewayRefresh287,type GatewayCredential287} from './officialGatewayRefresh287/native.js'
import {createOfficialGatewayTransport287} from './officialGatewayTransport287/native.js'

// The original shared credential slot, not a copy or a second auth cache.
export function getNativeGatewayAuth287():GatewayCredential287|null|undefined {
 return filesCredentialSlots.gatewayAuth()
}
export const nativeGatewayTransport287=createOfficialGatewayTransport287({
 proxyConfigured:()=>getProxyUrl(),proxyBypass:url=>shouldBypassProxy(url),certificateAuthority:()=>getCACertificates(),
 mtlsOptions:()=>getMTLSConfig(),debug:logForDebugging,httpsAgent:Agent,dnsLookup:lookup,checkServerIdentity,
})
export const nativeGatewayRefresh287=createGatewayRefresh287({
 version:MACRO.VERSION,environment:authEnvironment,gatewayAuth:getNativeGatewayAuth287,
 replaceGatewayAuth:value=>filesCredentialSlots.replaceGatewayAuth(value),
 refreshInFlight:()=>filesCredentialSlots.gatewayRefreshInFlight(),
 replaceRefreshInFlight:value=>filesCredentialSlots.replaceGatewayRefreshInFlight(value),
 storage:()=>getSecureStorage(),primerEnabled:isSettingsPrimerEnabled287,
 descriptorToken:()=>filesCredentialSlots.gatewayTokenFromDescriptor(),
 replaceDescriptorToken:value=>filesCredentialSlots.replaceGatewayTokenFromDescriptor(value),
 consumeSnapshot:()=>sharedOAuthDescriptor.consume(),isSocket:sharedOAuthDescriptorReaders.isSocket,
 inheritedDescriptor:sharedOAuthDescriptorReaders.inherited,
 httpAxios:axios,oauthConfig:getOauthConfig,debug:logForDebugging,pinnedAgent:nativeGatewayTransport287.spe,
})
