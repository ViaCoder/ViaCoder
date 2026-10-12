import {z} from 'zod/v4'
import {getClaudeAIOAuthTokens,getOauthAccountInfo,getRateLimitTier,getSubscriptionType} from '../auth.js'
import {CLAUDE_AI_INFERENCE_SCOPE} from '../../constants/oauth.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {getGlobalConfig} from '../config.js'
import {firstPartyNameToCanonical,getCanonicalName} from '../model/model.js'
import {resolveOverriddenModel} from '../model/modelStrings.js'
import {getOAuthResetExecutionContext286} from '../officialHttpWif286/runtime.js'
import {logForDebugging} from '../debug.js'
import {getAPIProvider} from '../model/providers.js'
import {hasGatewayInjection} from '../../services/remoteManagedSettings/clientRuntime.js'
import {authEnvironment} from '../authEnvironment.js'

// Original native 2.1.287 callback declarations are kept verbatim below.
// The surrounding adapter binds their original lexical dependencies.
export function createNativeQuotaCredit287(ports) {
  const names=['In','Be','Me','ft','qv','ar','C','DS','n3','t','le','kts','n']
  for(const name of names)if(typeof ports?.[name]!=='function')throw new TypeError(`createNativeQuotaCredit287 requires native function port ${name}`)
  if(ports?.a===null||typeof ports.a!=='object')throw new TypeError('createNativeQuotaCredit287 requires native object port a')
  const In=ports.In,Be=ports.Be,a=ports.a,Me=ports.Me,ft=ports.ft,qv=ports.qv,ar=ports.ar,kts=ports.kts
  const C=ports.C,DS=ports.DS,n3=ports.n3,t=ports.t,le=ports.le,n=ports.n
  var vO=['enterprise']
  function kt(e){return e.replace(/\[1m\]$/i,"")}
  function n8(e){let n=a.ANTHROPIC_DEFAULT_FABLE_MODEL;if(!n)return!1;return kt(e)===kt(n)}
  function bN(){return In()?.billingType==="usage_based"}
  function Ry(e,n){return Be(e,n?.identity?{identity:!0}:void 0).startsWith("claude-fable-")||n8(e)}
  function mK(){return Me()!=="firstParty"||!ft()||Pzt()||qv()==="default_claude_zero"}
  function ode(){if(o3())return!0;let e=ar();if(e===null)return!1;return r3().includes(e)}
  function CLt(){let e=FS();if(e===null)return lsr();let n=In();if(!n)return lsr();let r=n.accountUuid!==void 0?`acct:${n.accountUuid}`:void 0,s=SZr();if(s!==null&&(s===e||s===r))return!0;let h=le().fableOverageConsentV2;return n.organizationUuid!==void 0&&h?.[n.organizationUuid]===!0||r!==void 0&&h?.[r]===!0}
  function zAn(e){n().host.accountCreditLatches.replaceFableCreditsRequired(e)}
  function FS(){let e=In();if(!e)return null;if(e.organizationUuid)return e.organizationUuid;return e.accountUuid?`acct:${e.accountUuid}`:null}
  function Pzt(){return ar()==="enterprise"&&kts()==="enterprise_usage_based"}
  function o3(){return ar()==="enterprise"&&!Pzt()}
  function r3(){let e=C("tengu_saffron_credits_only_tiers",vO),n=DS();if(n.creditsOnlyTiers===null||n.creditsOnlyTiers.raw!==e){let r=n3().safeParse(e);if(!r.success)t("tengu_saffron_credits_only_tiers: unparseable value, using default",{level:"warn"});n.creditsOnlyTiers={raw:e,parsed:r.success?r.data:vO}}return n.creditsOnlyTiers.parsed}
  function lsr(){return n().fableConsentSlots.fableConsentSessionFallback()}
  function SZr(){return n().fableConsentSlots.sessionConsentKey()}
  function getAccountCreditLatches(){return n().host.accountCreditLatches}
  return {bN,Ry,mK,ode,CLt,zAn,FS,Pzt,o3,r3,lsr,SZr,kt,n8,getAccountCreditLatches}
}

/** Readable production bindings for verified local APIs. DS is the required
 * root-bound promo cache accessor. */
export function createCurrentQuotaCredit287Adapter({DS}={}) {
  if(typeof DS!=='function')throw new TypeError('createCurrentQuotaCredit287Adapter requires the original native DS() quota-credit cache accessor')
  const ports={
    In:()=>getOauthAccountInfo(),
    Be:(model,options)=>options?.identity?firstPartyNameToCanonical(resolveOverriddenModel(model)):getCanonicalName(model),
    a:authEnvironment,
    Me:()=>hasGatewayInjection()?'gateway':getAPIProvider(),
    ft:()=>Boolean(getClaudeAIOAuthTokens()?.scopes?.includes(CLAUDE_AI_INFERENCE_SCOPE)),
    qv:getRateLimitTier,
    ar:getSubscriptionType,
    C:(key,fallback)=>getFeatureValue_CACHED_MAY_BE_STALE(key,fallback),
    DS,
    n3:()=>z.array(z.string()),
    t:logForDebugging,
    le:getGlobalConfig,
    kts:()=>getOauthAccountInfo()?.seatTier??null,
    n:getOAuthResetExecutionContext286,
  }
  return createNativeQuotaCredit287(ports)
}

let sharedQuotaCredit287
// Exact 2.1.287 cache-owner semantics: the owner is keyed by session root,
// never by the per-call execution-context clone returned by the shared accessor.
class At{#e;#t=new WeakMap;constructor(e){this.#e=e}peek(e){return this.#t.get(e.root)}of(e){let t=e.root,o=this.#t.get(t);if(o!==void 0)return o;let r=this.#e();return this.#t.set(t,r),r}drop(e){this.#t.delete(e.root)}}
export function createRootQuotaCreditPromoCache287(getContext){
  if(typeof getContext!=='function')throw new TypeError('createRootQuotaCreditPromoCache287 requires the shared context getter')
  const owner=new At(()=>({fablePromo:{launchConfig:null,planLimitsEndDate:null,creditsOnlyTiers:null}}))
  const access=()=>{
    const context=getContext()
    if(!context?.root||typeof context.root!=='object')
      throw new Error('quota-credit cache requires the shared execution-context root identity')
    return owner.of(context).fablePromo
  }
  access.drop=context=>owner.drop(context)
  return access
}
const getQuotaCreditPromoCache287=createRootQuotaCreditPromoCache287(getOAuthResetExecutionContext286)
/** Lazy singleton consumed by claudeAiLimits. Uses the shared session-root
 * identity and existing config/auth/catalog/GrowthBook functions. */
export function getQuotaCredit287(){
  if(!sharedQuotaCredit287)sharedQuotaCredit287=createCurrentQuotaCredit287Adapter({DS:getQuotaCreditPromoCache287})
  return sharedQuotaCredit287
}
