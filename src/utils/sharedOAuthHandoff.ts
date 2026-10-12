import {closeSync,constants,fstatSync,openSync,readSync} from 'node:fs'
import {filesCredentialSlots} from '../vendor/official-files-api/slots.js'
import {authEnvironment} from './authEnvironment.js'
import {logForDebugging} from './debug.js'
import {errorMessage,getErrnoCode} from './errors.js'
import {createOAuthDescriptorError} from './officialOAuthRecovery/runtime.js'
import {createOAuthDescriptorReaders287} from './officialOAuthRefresh287/descriptor.js'
import {createOAuthHandoff287} from './officialOAuthRefresh287/handoff.js'
import {getPlatform} from './platform.js'
import {slowLogging} from './slowOperations.js'

export const sharedOAuthDescriptorReaders=createOAuthDescriptorReaders287({D:fstatSync,Hm:slowLogging,L:closeSync,P:createOAuthDescriptorError(),R:openSync,de:readSync,w:constants})
// Injected credential stores own async handoff I/O. No filesystem substitute is
// invented when a host supplies its store; the original methods run unchanged.
export const sharedOAuthHandoff=createOAuthHandoff287({
 G_t:scopes=>filesCredentialSlots.replaceOauthScopesFromFd(scopes),JJn:sharedOAuthDescriptorReaders.isSocket,
 KEn:name=>filesCredentialSlots.markDescriptorAnnouncementConsumed(name),O:getPlatform,
 W_t:value=>filesCredentialSlots.replaceOauthTokenFromBgSnapshot(value),YEn:token=>filesCredentialSlots.replaceGatewayTokenFromDescriptor(token),
 a:authEnvironment,bj:()=>filesCredentialSlots.oauthTokenFromFd(),fVo:sharedOAuthDescriptorReaders.inherited,
 iU:token=>filesCredentialSlots.replaceOauthTokenFromFd(token),l:errorMessage,t:logForDebugging,t2e:sharedOAuthDescriptorReaders.bounded,v:getErrnoCode,
})
