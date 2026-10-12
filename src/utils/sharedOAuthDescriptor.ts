import {mkdirSync,writeFileSync} from 'node:fs'
import {unlink} from 'node:fs/promises'
import {filesCredentialSlots} from '../vendor/official-files-api/slots.js'
import {authEnvironment} from './authEnvironment.js'
import {logForDebugging} from './debug.js'
import {errorMessage,getErrnoCode,isENOENT} from './errors.js'
import {createOAuthSyncDescriptor} from './officialOAuthDescriptor/runtime.js'
import {getPlatform} from './platform.js'
import {sharedOAuthDescriptorReaders} from './sharedOAuthHandoff.js'

export const sharedOAuthDescriptor=createOAuthSyncDescriptor({
 G:isENOENT,G_t:scopes=>filesCredentialSlots.replaceOauthScopesFromFd(scopes),H:mkdirSync,JJn:sharedOAuthDescriptorReaders.isSocket,
 KEn:name=>filesCredentialSlots.markDescriptorAnnouncementConsumed(name),L:unlink,N:writeFileSync,O:getPlatform,
 W_t:flag=>filesCredentialSlots.replaceOauthTokenFromBgSnapshot(flag),YEn:token=>filesCredentialSlots.replaceGatewayTokenFromDescriptor(token),
 a:authEnvironment,bj:()=>filesCredentialSlots.oauthTokenFromFd(),fVo:sharedOAuthDescriptorReaders.inherited,
 iU:token=>filesCredentialSlots.replaceOauthTokenFromFd(token),l:errorMessage,t:logForDebugging,t2e:sharedOAuthDescriptorReaders.bounded,v:getErrnoCode,
})
