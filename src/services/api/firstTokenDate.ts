import {
  firstTokenDateApplicationPorts286,
  getFirstTokenDateProductionBinding286,
  type FirstTokenDateContext286,
} from './officialFirstTokenDate286/productionBinding.js'
import {createOfficialFirstTokenDate286} from './officialFirstTokenDate286/runtime.js'
import {createOfficialFirstPartyHttp286,createOfficialFirstTokenDateErrors286} from './officialFirstTokenDate286/http.runtime.js'

export type FirstTokenDateContext = FirstTokenDateContext286

/** Execute complete original h over the existing production auth/config owners. */
export function fetchAndStoreClaudeCodeFirstTokenDate(
  context:FirstTokenDateContext={},
):Promise<void> {
  return getFirstTokenDateProductionBinding286().firstTokenDate(context)
}

/** Compatibility factory; original lr calls this resolver with ZERO arguments. */
export type FirstTokenDateServicePorts = Readonly<{
  baseURL:string
  resolveHeaders:(context?:{credentials?:unknown;storageV5?:unknown})=>Promise<{headers:Record<string,string>;error?:string}>
  getConfig:()=>{claudeCodeFirstTokenDate?:string|null}
  saveConfig:(updater:(config:any)=>any,storageV5?:unknown)=>Promise<unknown>
  reportError:(error:unknown)=>void
  debug:(message:string,options?:any)=>void
  metric?:(name:string,result:string)=>void
}>

// Both compatibility exports execute the same whole lr, not an Axios/envelope shim.
export function createFirstTokenDateHttpGet(baseURL:string,resolveHeaders:FirstTokenDateServicePorts['resolveHeaders']) {
  let native:Promise<ReturnType<typeof createOfficialFirstPartyHttp286>>|undefined
  return async (path:string,options:Record<string,unknown>) => {
    native ??= firstTokenDateApplicationPorts286().then(ports=>createOfficialFirstPartyHttp286({
      ...ports.http,Wv:()=>baseURL,QD:()=>resolveHeaders(),
    }))
    return (await native).Wt.get(path,options)
  }
}

export function createFirstTokenDateService(ports:FirstTokenDateServicePorts) {
  const errors=createOfficialFirstTokenDateErrors286()
  const run=createOfficialFirstTokenDate286({
    Wt:{get:createFirstTokenDateHttpGet(ports.baseURL,ports.resolveHeaders)},
    ce:ports.getConfig,Te:ports.saveConfig,d:ports.reportError,t:ports.debug,
    y:feature=>getFirstTokenDateProductionBinding286().hPorts.y(feature),
    m:ports.metric??((feature,reason)=>getFirstTokenDateProductionBinding286().hPorts.m(feature,reason)),
    cu:errors.expected,l:errors.message,
  })
  return (context:FirstTokenDateContext={})=>run(context.storageV5,context.credentials)
}
