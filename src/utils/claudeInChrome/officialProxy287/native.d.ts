import type {AxiosStatic} from 'axios'
import type {HttpsProxyAgentOptions} from 'https-proxy-agent'
export type ProxyEnvironment287=Record<string,string|undefined>
export interface ChromeProxy287 {
 configure():void
 proxySource(env?:ProxyEnvironment287):{value:string;source:string}|undefined
 proxyUrl(env?:ProxyEnvironment287):string|undefined
 noProxy(env?:ProxyEnvironment287):string|undefined
 bypass(url:string,noProxy?:string):boolean
}
export function createChromeProxy287(ports:{
 axios:AxiosStatic
 mtlsAgent:typeof import('../../mtls.js').getMTLSAgent
 mtlsConfig:typeof import('../../mtls.js').getMTLSConfig
 caCerts:typeof import('../../caCerts.js').getCACertificates
 proxyAgent:typeof import('../../proxy.js').getProxyAgent
 httpsProxyAgent(url:string,options:HttpsProxyAgentOptions<string>):unknown
 require(id:string):unknown
 builtins:Record<string,unknown>
}):ChromeProxy287
