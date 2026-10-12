import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import {createOfficialFirstTokenDate286} from './runtime.js'
import {
  createOfficialFirstPartyHttp286,
  createOfficialFirstTokenDateErrors286,
  type NativeFirstPartyHttp286Ports,
  type NativeFirstPartyRequestOptions286,
} from './http.runtime.js'

export type FirstTokenDateContext286 = Readonly<{storageV5?:unknown; credentials?:CredentialStore}>
export type FirstTokenDateApplicationPorts286 = Readonly<{
  http:NativeFirstPartyHttp286Ports
  readConfig:()=>any
  saveConfig:(updater:(config:any)=>any,storageV5?:unknown)=>Promise<unknown>
  error:(error:unknown)=>void
  debug:(message:string,options?:any)=>void
  success:(feature:string)=>void
  failure:(feature:string,reason:string)=>void
}>

/** Whole native lr executes over caller-owned services; there is no hand-made envelope. */
export function createFirstTokenDateProductionBinding286(ports:FirstTokenDateApplicationPorts286) {
  const native = createOfficialFirstPartyHttp286(ports.http)
  const errors = createOfficialFirstTokenDateErrors286()
  const hPorts = {
    Wt:native.Wt, ce:ports.readConfig, Te:ports.saveConfig,
    d:ports.error, t:ports.debug, y:ports.success, m:ports.failure,
    cu:errors.expected, l:errors.message,
  }
  const run = createOfficialFirstTokenDate286(hPorts)
  return {
    hPorts,
    // K0e's original local h consumes this exact Wt get boundary.
    Wt:native.Wt,
    firstTokenDate:(context:FirstTokenDateContext286={})=>run(context.storageV5,context.credentials),
    request:native.request,
  }
}

// Synchronous h ports keep their original contracts, but access owners only when
// h runs. Constructing K0e's ports must not traverse auth -> CLI -> credentialBinding.
const configOwner = () => require('../../../utils/config.js') as typeof import('../../../utils/config.js')
const debugOwner = () => require('../../../utils/debug.js') as typeof import('../../../utils/debug.js')
const logOwner = () => require('../../../utils/log.js') as typeof import('../../../utils/log.js')
const analyticsOwner = () => require('../../analytics/index.js') as typeof import('../../analytics/index.js')

let application:Promise<FirstTokenDateApplicationPorts286>|undefined
export function firstTokenDateApplicationPorts286():Promise<FirstTokenDateApplicationPorts286> {
  return application ??= import('./applicationPorts.js').then(module=>module.firstTokenDateApplicationPorts286())
}
let native:Promise<ReturnType<typeof createFirstTokenDateProductionBinding286>>|undefined
function nativeBinding() {
  return native ??= firstTokenDateApplicationPorts286().then(createFirstTokenDateProductionBinding286)
}

// Stable enumerable facade: Carver may capture it at module initialization.
// No application imports/reads/HTTP/config operations occur during that capture.
const Wt = {
  async get<T=unknown>(path:string,options?:NativeFirstPartyRequestOptions286) {
    return (await nativeBinding()).Wt.get<T>(path,options)
  },
}
const errors = createOfficialFirstTokenDateErrors286()
const record = (name:string,metadata:Record<string,unknown>) =>
  analyticsOwner().logEvent(name,metadata as Parameters<typeof import('../../analytics/index.js').logEvent>[1])
const hPorts = {
  Wt,
  ce:()=>configOwner().getGlobalConfig(),
  Te:(updater:(config:any)=>any,storageV5?:unknown)=>configOwner().saveGlobalConfig(updater,storageV5),
  d:(error:unknown)=>logOwner().logError(error),
  t:(message:string,options?:any)=>debugOwner().logForDebugging(message,options),
  y:(feature:string)=>record('tengu_feature_ok',{feature_name:feature}),
  m:(feature:string,reason:string)=>record('tengu_feature_bad',{feature_name:feature,error_code:reason}),
  cu:errors.expected,l:errors.message,
}
const run = createOfficialFirstTokenDate286(hPorts)
const binding = {
  hPorts,Wt,
  firstTokenDate:(context:FirstTokenDateContext286={})=>run(context.storageV5,context.credentials),
  async request<T=unknown>(method:string,path:string,data?:unknown,options?:NativeFirstPartyRequestOptions286,retried?:boolean) {
    return (await nativeBinding()).request<T>(method,path,data,options,retried)
  },
}
export function getFirstTokenDateProductionBinding286() {return binding}

export type {NativeFirstPartyRequestOptions286}
