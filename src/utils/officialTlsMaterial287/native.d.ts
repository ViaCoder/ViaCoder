import type {Agent} from 'node:https'
import type {authEnvironment} from '../authEnvironment.js'
import type {FsOperations} from '../fsOperations.js'
import type {TlsSessionState287} from '../officialTlsDispatch287/native.js'

export type MTLSMaterialConfig287 = {cert?:string;key?:string;passphrase?:string}
export type MaterialFile287 = {path:string;content:string}
export type MaterialLoadResult287 = {changed:boolean;readFailed:boolean;mismatched:boolean}
export type MaterialEvent287 = (feature:string,reason:string,metadata?:Record<string,unknown>)=>unknown
export type MaterialSuccess287 = (feature:string,metadata?:Record<string,unknown>)=>unknown
export interface TlsMaterialPorts287 {
 execution():{host:object}
 environment:Pick<typeof authEnvironment,'CLAUDE_CODE_CERT_STORE'|'NODE_EXTRA_CA_CERTS'|'NODE_OPTIONS'|'CLAUDE_CODE_CLIENT_CERT'|'CLAUDE_CODE_CLIENT_KEY'|'CLAUDE_CODE_CLIENT_KEY_PASSPHRASE'>
 filesystem():Pick<FsOperations,'stat'|'statSync'|'readFile'|'readFileSync'>
 require:NodeRequire
 debug:typeof import('../debug.js').logForDebugging
 failure:MaterialEvent287;fallback:MaterialEvent287;success:MaterialSuccess287
 builtins:Record<string,Record<string,unknown>>
}
export interface TlsMaterialState287 extends TlsSessionState287 {
 clientCert:MaterialFile287|null;clientKey:MaterialFile287|null
 config:()=>MTLSMaterialConfig287|undefined
 agentCache:{config:MTLSMaterialConfig287|undefined;ca:string[]|undefined;agent:Agent|undefined}|null
}
export interface TlsMaterial287 {
 getCACertificates():string[]|undefined;clearCACertsCache():void;loadExtraCACerts():Promise<boolean>
 getMTLSConfig():MTLSMaterialConfig287|undefined;clearMTLSCache():void;loadMTLSClientMaterial():Promise<MaterialLoadResult287>
 getMTLSAgent():Agent|undefined;getWebSocketTLSOptions():MTLSMaterialConfig287&{ca?:string[]}|undefined
 configureGlobalMTLS():void;mtlsState():TlsMaterialState287
}
export function createTlsMaterial287(ports:TlsMaterialPorts287):TlsMaterial287
export interface TlsReloadPorts287 {
 a:Pick<typeof authEnvironment,'CLAUDE_CODE_CLIENT_CERT'|'CLAUDE_CODE_DISABLE_MTLS_RELOAD_ON_STALE_CONNECTION'>
 Nse():Promise<MaterialLoadResult287>;Fse():void;lw():void
 d(error:unknown):void;m:MaterialEvent287;p:MaterialEvent287;t:typeof import('../debug.js').logForDebugging;y:MaterialSuccess287
 Jd:typeof import('@anthropic-ai/sdk').APIConnectionError
}
export type TlsReloadResult287={reportedFailure:boolean;attempted:boolean}
export function createTlsReload287(ports:TlsReloadPorts287):{shouldReload(error:unknown):boolean;reload(reportFailure:boolean):Promise<TlsReloadResult287>}
