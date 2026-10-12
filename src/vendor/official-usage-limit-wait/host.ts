import {K, j, getLowPriorityHost, runInLowPriorityHost, Oe, x, c, d, i, _, p} from '../official-low-priority/host.js'
import {createUsageLimitPorts} from '../../services/usageLimitWaitPorts.js'
export {K,j,Oe,x,c,d,i,_,p}
export const m = p
export type UsageLimitPorts = ReturnType<typeof createUsageLimitPorts>
const ports = new WeakMap<object, UsageLimitPorts>()
export function getUsageLimitPorts(): UsageLimitPorts {
  const key = getLowPriorityHost()
  let value = ports.get(key)
  if (!value) {value = createUsageLimitPorts(); ports.set(key, value)}
  return value
}
// All subscriptions capture the installing host, rather than whichever host
// happens to emit. Isolated fixtures never share quota episodes with the CLI.
export function withUsageLimitHost<T>(overrides: Partial<UsageLimitPorts>, work: () => T): T {
  const key = {}
  return runInLowPriorityHost(key, () => {ports.set(key, {...createUsageLimitPorts(), ...overrides}); return work()})
}
const call = (key: keyof UsageLimitPorts) => (...args: any[]) => (getUsageLimitPorts()[key] as Function)(...args)
export const qe=call('agentId'), pt=call('subscriber'), Rn=call('account'), it=call('model'), Mh=call('modelSetting')
export const hce=(s: string) => s==='opusplan'||s==='opusplan[1m]'?'opus':s==='haiku'?'sonnet':null
export const o7=call('isOpus'), qLr=call('isSonnet'), Be=call('modelIdentity'), At=call('parseModel'), $b=call('modelFamily'), bee=call('includedModels')
export const _u=call('interactive'), Et=call('background'), Mt=call('remote'), mm=call('autoArmSuppressed')
export const wne=call('settingSources'), _k=(key: string) => wne(key).map((v: {value: unknown}) => v.value), vRe=call('keyPresence')
export const ga=call('limits'), ppo=call('probe'), sY=call('isPrompt'), ume=call('isHuman'), hF=call('queue'), hv=call('enqueue'), fb=call('remove'), KNn=call('inFlight')
export const u7='cron'
function subscribe(key: 'onRejected'|'onSettings'|'onSession', listener: Function) {
  const host = getLowPriorityHost()
  return getUsageLimitPorts()[key]((...args: any[]) => runInLowPriorityHost(host, () => listener(...args)))
}
export const CJt=(listener: Function) => subscribe('onRejected',listener)
export const Zd=(listener: Function) => subscribe('onSession',listener)
export const Ni={subscribe:(listener: Function) => subscribe('onSettings',listener)}
