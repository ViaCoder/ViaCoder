import axios from 'axios'
import {createHash} from 'node:crypto'
import {fileURLToPath} from 'node:url'
import {join} from 'node:path'
import {isIPv4,isIPv6} from 'node:net'
import {stripVTControlCharacters} from 'node:util'
import {z} from 'zod/v4'
import {createOfficialDownloadTransport287,createOfficialPublishedDocumentReader287,createOfficialPublishedFloor287,createOfficialClientDataUrl287,type PublishedFloorMark287} from './officialBootstrap287/signed.js'
import {getBootstrapModelCacheOwner287} from './bootstrapCache.js'
import {Bt} from '../../utils/officialHostFilesystem287/native.js'
import {getFsImplementation} from '../../utils/fsOperations.js'
import {getClaudeConfigHomeDir} from '../../utils/envUtils.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {lazySchema} from '../../utils/lazySchema.js'
import {safeParseJSON} from '../../utils/json.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {getAPIProvider} from '../../utils/model/providers.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {getMainLoopModel} from '../../utils/model/model.js'
import {stripModelContextSuffix} from '../../utils/model/modelIdentity.js'
import {isPublishedClientDataPolicyAllowed287} from './bootstrapClientDataPolicy287.js'

// All three readers/writers (A3 catalog state, URL document, anti-replay floor)
// resolve the SAME Xr. Existing Bt/FS abstraction performs actual serialized IO.
export function getClientDataUrlOwner287() {
  const owner = getBootstrapModelCacheOwner287() as ReturnType<typeof getBootstrapModelCacheOwner287> & {
    publishedCatalogFloorMarks?: Map<string,PublishedFloorMark287>
    publishedCatalogFloorRead?: Promise<void>
    publishedCatalogFloorWrite?: Promise<void>
  }
  owner.publishedCatalogFloorMarks ??= new Map()
  return owner
}
const transport = createOfficialDownloadTransport287({St: axios})
const schemaPorts = {f:lazySchema,u:z.object,o:z.string,C:z.number,de:z.record,x:z.literal}
export function bindPublishedDocumentReaderPorts287(): Record<string,unknown> { return {
  ...schemaPorts,M:createHash,G:fileURLToPath,Ru:isIPv4,Pr:isIPv6,
  t:(message:string)=>logForDebugging(message),ae:()=>getFsImplementation(),
  sa:transport.sa,N2:transport.N2,n$:transport.n$,$0e:transport.$0e,gt:safeParseJSON,
} }
export const publishedDocumentReader287 = createOfficialPublishedDocumentReader287(bindPublishedDocumentReaderPorts287())
export const publishedDocumentFloor287 = createOfficialPublishedFloor287({
  ...schemaPorts,Xr:getClientDataUrlOwner287,Bt:()=>Bt(),Qd:join,we:()=>getClaudeConfigHomeDir(),b:join,
  gt:safeParseJSON,_:JSON.stringify,t:(message:string)=>logForDebugging(message),
})
// Exact native startup uses compiled release roots, no managed trust override
// or test credential. The public document and sidecar carry no auth headers.
export function bindClientDataUrlPorts287(): Record<string,unknown> { return {
  ...schemaPorts,Xr:getClientDataUrlOwner287,rt:()=>getMainLoopModel(),a:authEnvironment,
  t:(message:string)=>logForDebugging(message),d:(error:unknown)=>logError(error),gt:safeParseJSON,
  He:()=>{getAPIProvider();return getNativeAPIProvider287()},n$:transport.n$,
  on:(policy:string)=>isPublishedClientDataPolicyAllowed287(policy),dPt:publishedDocumentReader287.dPt,
  TEr:publishedDocumentReader287.TEr,ien:publishedDocumentReader287.ien,Kst:publishedDocumentReader287.Kst,
  aen:publishedDocumentFloor287.aen,Yst:publishedDocumentFloor287.Yst,
  Fn:(model:string)=>stripModelContextSuffix(model),se:z.unknown,T:z.array,L:stripVTControlCharacters,
} }
export const clientDataUrl287 = createOfficialClientDataUrl287(bindClientDataUrlPorts287())
// Controller startup contract: await load before resolving the model, fail
// startup on its returned error string, then validate coverage after selection.
// Do not invoke this as swallowed-error/background bootstrap work.
export const loadClientDataUrl287 = clientDataUrl287.Ebo
export const validateClientDataUrlModel287 = clientDataUrl287.vbo
export const getClientDataUrlStatus287 = clientDataUrl287.Abo
