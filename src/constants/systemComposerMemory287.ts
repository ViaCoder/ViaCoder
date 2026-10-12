// Personal-use adapter; independent of prompts.ts and the composer entrance.
// Full raw owner declarations below are pinned, not inferred/default hosts.
import {z} from 'zod/v4'
import {excludedMemorySource287} from '../utils/officialQueryContext287/native.js'
import type {SystemComposerDynamicCallPorts287} from './officialSystemComposer287/native.js'
import type {createDefaultCommunication287} from './communication287.js'
import {createMemoryTrackingOrigin287,createMemoryIndexPersistence287,systemComposerMemoryTrackingOwner287,memoryDynamicSource287,memoryDynamicEventSource287,type MemoryHostRegistryConstructor287,type MemoryTrackingTrust287} from './systemComposerMemoryTracking287.js'
import {memoryFrontmatter287,memoryAccessGuidance287} from '../memdir/officialMemoryFormat287/native.js'
import {getFsImplementation} from '../utils/fsOperations.js'
import {getErrnoCode,errorMessage} from '../utils/errors.js'
import {logEvent} from '../services/analytics/index.js'
import {join,sep} from 'node:path'
import {getExecutionSession287} from '../services/context/execution287.js'
import {getRuntimeMemo287} from '../services/context/runtimeMemo287.js'
import type {RuntimeMemo287} from '../services/context/officialRuntimeMemo287/native.js'
import type {ExecutionSession287} from '../services/context/officialExecutionOwners287/native.js'
import type {ExecutionLifecycleContext287} from '../services/context/officialExecutionLifecycle287/native.js'
import {authEnvironment} from '../utils/authEnvironment.js'
import {getInitialSettings,getSettingsForSource} from '../utils/settings/settings.js'
import {getEnabledSettingSources,type SettingSource} from '../utils/settings/constants.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {getClaudeAIOAuthTokens,isClaudeAISubscriber,getAnthropicApiKey} from '../utils/auth.js'
import {isFirstPartyRequestEndpoint} from '../utils/model/providers.js'
import {getGlobalConfig,saveGlobalConfig} from '../utils/config.js'
import {isEssentialTrafficOnly} from '../utils/privacyLevel.js'
import {getAutoMemPath} from '../memdir/paths.js'
import {logForDebugging} from '../utils/debug.js'
import {jsonStringify,jsonParse} from '../utils/slowOperations.js'
import {createOfficialSystemComposerMemory287,type OfficialSystemComposerMemory287Ports,type MemoryConnectedStores287,type MemoryProjectConfig287} from './officialSystemComposerMemory287/native.js'

export const memoryOwnerSource287 =[
  {
    "file": "chunk-5qqrzb2c.js",
    "name": "i",
    "kind": "declaration",
    "startCodeUnits": 615,
    "endCodeUnits": 918,
    "moduleSha256": "91b433ccc5add9cada15ca727fd71e45dc2b3042168625a06d879b12cab45945",
    "sha256": "ac8fa5a2a589fa1dd648bd6ea9451f06fb378142827f2b065f3628d8134987d9",
    "source": "class i{resetters=[];built=[];lazy(e){let t,r=()=>{t=void 0};return this.resetters.push(r),()=>{if(t===void 0)t=e(),this.built.push(r);return t}}builtCount(){return this.built.length}releaseBuiltSince(e){for(let t of this.built.splice(e))t()}reset(){for(let e of this.resetters)e();this.built.length=0}}"
  },
  {
    "file": "chunk-5qqrzb2c.js",
    "name": "_rr",
    "kind": "variable",
    "startCodeUnits": 922,
    "endCodeUnits": 931,
    "moduleSha256": "91b433ccc5add9cada15ca727fd71e45dc2b3042168625a06d879b12cab45945",
    "sha256": "a044ed0ffcd2af33f87dba4847114fcfa941b77911af4eff3fc5c51c8011e070",
    "source": "_rr=new i"
  },
  {
    "file": "chunk-5qqrzb2c.js",
    "name": "f",
    "kind": "declaration",
    "startCodeUnits": 932,
    "endCodeUnits": 965,
    "moduleSha256": "91b433ccc5add9cada15ca727fd71e45dc2b3042168625a06d879b12cab45945",
    "sha256": "d9356663a66c8ccff1054002018547334d12bd2d053a1f041a6d6e6b128d3e1e",
    "source": "function f(e){return _rr.lazy(e)}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "Kwn",
    "kind": "declaration",
    "startCodeUnits": 421573,
    "endCodeUnits": 421595,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "8b077f1f52cbe9cfeadbaeed900cdce0fae7ac1512409f04a59ebf1fbe8c52f8",
    "source": "function Kwn(){return}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "qbe",
    "kind": "declaration",
    "startCodeUnits": 421595,
    "endCodeUnits": 421632,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "a04c6ff8f757ab8e745ada8283ae79b67739223383cc8867251efadfa673afde",
    "source": "function qbe(){return Kwn()!==void 0}"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "V",
    "kind": "declaration",
    "startCodeUnits": 10007,
    "endCodeUnits": 10151,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "3b223ad86a79e9969e8241054c03d04d80d046aab19dd519973e4aed1e79e9e9",
    "source": "class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}"
  },
  {
    "file": "chunk-x954y317.js",
    "name": "ct",
    "kind": "declaration",
    "startCodeUnits": 5356,
    "endCodeUnits": 5382,
    "moduleSha256": "c7315d9d19dfef6318f4eeceb3dbc792344d7feed2814f6d9b06bc28831e0c43",
    "sha256": "5da0f7703a355ff03a7692122a7882ea1749f0801ed8f38d6b64ce727d2cd856",
    "source": "function ct(t,e){return t}"
  },
  {
    "file": "chunk-4s38z9x2.js",
    "name": "s",
    "kind": "variable",
    "startCodeUnits": 1098,
    "endCodeUnits": 1153,
    "moduleSha256": "eb46628147f83403bbcd57ca88b3370e05c6631bf027a80117844f770b276b2d",
    "sha256": "8b79e9ad51e95ede56e4385a196d4187b05a3d78fde643acd8c68658ff8e8521",
    "source": "s=globalThis.process?.getBuiltinModule?.(\"async_hooks\")"
  },
  {
    "file": "chunk-4s38z9x2.js",
    "name": "wKt",
    "kind": "variable",
    "startCodeUnits": 1154,
    "endCodeUnits": 1195,
    "moduleSha256": "eb46628147f83403bbcd57ca88b3370e05c6631bf027a80117844f770b276b2d",
    "sha256": "d871ff458e10c6c5509c5b70f7944fba032e2a42697e09aec182aaaac06d05b4",
    "source": "wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e"
  },
  {
    "file": "chunk-4s38z9x2.js",
    "name": "Me",
    "kind": "declaration",
    "startCodeUnits": 1196,
    "endCodeUnits": 1457,
    "moduleSha256": "eb46628147f83403bbcd57ca88b3370e05c6631bf027a80117844f770b276b2d",
    "sha256": "08c491676ef2243b475f885c45f1163b2f0abed6075a2e5fa3a32cdd2afb308a",
    "source": "function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,\"Signal listener(s) threw\")},clear(){e.clear()}}}"
  },
  {
    "file": "chunk-nc9hhjpp.js",
    "name": "aY",
    "kind": "declaration",
    "startCodeUnits": 17473,
    "endCodeUnits": 18287,
    "moduleSha256": "cabf97b3f2736c97d156ca520a2934462a309daebc5bf57adbf5b349127c6e7b",
    "sha256": "eb92adb00412ae9a5b1ad411aea826772ae693ec771822570a37445fe626cb5d",
    "source": "function aY(e,i=300000,s){let n=(o)=>typeof i===\"function\"?i(o):i,r=new Map,h=new Map,l=async(...o)=>{let a=_(o),f=r.get(a);if(f&&s&&!s(f.value,f.timestamp)){if(f.refreshPromise)return f.refreshPromise;r.delete(a),f=void 0}let d=Date.now();if(!f){let g=h.get(a);if(g)return g;let u=e(...o);h.set(a,u);try{let w=await u;if(h.get(a)===u)r.set(a,{value:w,timestamp:Date.now(),refreshing:!1,lifetimeMs:n(w)});return w}finally{if(h.get(a)===u)h.delete(a)}}if(f&&d-f.timestamp>f.lifetimeMs&&!f.refreshing){f.refreshing=!0;let g=f,u=e(...o);return g.refreshPromise=u,u.then((w)=>{if(r.get(a)===g)r.set(a,{value:w,timestamp:Date.now(),refreshing:!1,lifetimeMs:n(w)})}).catch((w)=>{if(t(String(w),{level:\"error\"}),r.get(a)===g)r.delete(a)}),f.value}return r.get(a).value};return l.cache={clear:()=>{r.clear(),h.clear()}},l}"
  },
  {
    "file": "chunk-f2n7vgt8.js",
    "name": "ee",
    "kind": "declaration",
    "startCodeUnits": 1118,
    "endCodeUnits": 1504,
    "moduleSha256": "d5f5cbf26110e86d1eab22e59072276597718b0d07654b6b0bc9e0d4aa3032ee",
    "sha256": "89744c32a63aab1d61c366d1bd710063e69b776ee53af4f8458c6794a5ccaaa0",
    "source": "function ee(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error(\"aborted\"));else o();return}let m=(e?.clock??aB).setTimeout(()=>{r?.removeEventListener(\"abort\",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error(\"aborted\"));else o()}r?.addEventListener(\"abort\",i,{once:!0})})}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Ai",
    "kind": "declaration",
    "startCodeUnits": 20110,
    "endCodeUnits": 22808,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "98b9146d1c963ae9baffea7e5256b4a7960f4cc8a5bd0ecddfc835e4a83ad02d",
    "source": "class Ai{decision={state:\"undecided\"};servedIdentity=null;settleDeadlineConsumed=!1;settled=Me();shrunk=Me();reset(){this.decision={state:\"undecided\"},this.servedIdentity=null,this.settleDeadlineConsumed=!1}async waitForSettled(e,n,r){if(this.decision.state!==\"undecided\")return;let s=()=>{},g=new Promise((h)=>{s=this.settled.subscribe(h)});try{if(this.decision.state!==\"undecided\")return;await Promise.race([g,ee(e,n,r)])}finally{s()}}async waitForSettledOnce(e,n){if(this.settleDeadlineConsumed)return;if(await this.waitForSettled(e,n),this.decision.state===\"undecided\"&&n?.aborted!==!0)this.settleDeadlineConsumed=!0}getStores(){return this.decision.state===\"on\"?this.decision.stores:[]}settleOn(e){if(this.decision.state!==\"undecided\")return!1;if(this.servedIdentity!==null&&this.servedIdentity!==e.identity)return this.settleOff(\"superseded\"),!1;return this.servedIdentity??=e.identity,this.decision={state:\"on\",identity:e.identity,stores:Object.freeze([...e.stores]),request:e.request,selectionSource:e.selectionSource,initialGrant:Object.freeze([...e.initialGrant]),degraded:e.degraded},wn(this.settled,\"settle\"),i(\"tengu_org_memory_decision\",{outcome:S(\"on\"),store_count:e.stores.length,asked_write:e.request.writeAccess,selection_source:c(e.selectionSource),selection_kind:c(e.selectionKind),private_selection:jUt(e.initialGrant),degraded:e.degraded}),!0}settleOff(e){if(this.decision.state!==\"undecided\")return!1;return this.decision={state:\"off\",cause:e},wn(this.settled,\"settle\"),i(\"tengu_org_memory_decision\",{outcome:S(\"off\"),cause:c(e)}),!0}park(e){if(this.decision.state!==\"on\")return;this.decision={state:\"parked\",identity:this.decision.identity,cause:e},wn(this.shrunk,\"shrink\"),i(\"tengu_org_memory_decision_parked\",{cause:c(e)})}shrinkWriteAsk(){if(this.decision.state!==\"on\"||!this.decision.request.writeAccess)return!1;return this.decision={...this.decision,request:{...this.decision.request,writeAccess:!1},stores:Object.freeze(this.decision.stores.map((e)=>e.scope===\"team\"&&e.mode===\"rw\"?{...e,mode:\"ro\"}:e))},wn(this.shrunk,\"shrink\"),i(\"tengu_org_memory_decision_write_shrunk\",{}),!0}onAuthCompletion(e){if(this.decision.state!==\"on\"&&this.decision.state!==\"parked\")return;if(e===this.decision.identity)return;let n=e===null?\"logout\":\"account_switch\";this.decision={state:\"ended\",cause:n},wn(this.shrunk,\"shrink\"),i(\"tengu_org_memory_decision_ended\",{cause:c(n)})}reopen(){let e=this.decision;if(e.state===\"undecided\"||e.state===\"ended\"||e.state===\"off\"&&e.cause===\"superseded\")return null;return this.decision={state:\"undecided\"},this.settleDeadlineConsumed=!1,i(\"tengu_org_memory_decision_reopened\",{from_state:c(e.state),...e.state!==\"on\"&&{from_cause:c(e.cause)}}),e}}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Nc",
    "kind": "variable",
    "startCodeUnits": 22812,
    "endCodeUnits": 22832,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "93a8ce9f87b669da375b4f7bb8d8962a5b76d3fa59076026dd5a8e27749633e1",
    "source": "Nc=new V(()=>new Ai)"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "ku",
    "kind": "declaration",
    "startCodeUnits": 47254,
    "endCodeUnits": 47401,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "572c16671eb39e0c701d6987983f3ec13deaed1084e4f27e070d10e081b85cf8",
    "source": "function ku(e){if(!e.startsWith(\"/\"))return!1;try{return new URL(e,\"https://sentinel.invalid\").origin===\"https://sentinel.invalid\"}catch{return!1}}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Ru",
    "kind": "declaration",
    "startCodeUnits": 47401,
    "endCodeUnits": 47686,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "fc2b6ddc580f47de18adc1a556bcd1161c98854af860f6faeb77e475e06497fd",
    "source": "function Ru(e){let n=e.replace(/\\/+$/,\"\"),r=n.slice(n.lastIndexOf(\"/\")+1);if(r===\"\")throw Error(`cannot derive mount name from path: ${e}`);let s=r.replace(/[^A-Za-z0-9_-]/g,\"-\");if(s===\"\"||s===\".\"||s===\"..\")throw Error(`derived mount name is not a valid path segment: ${r}`);return s}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Pu",
    "kind": "variable",
    "startCodeUnits": 47690,
    "endCodeUnits": 47730,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "043a466457fa2c330face477d0814d4b2bdedc2d6188ff370d806e0c1556cba6",
    "source": "Pu=\"mount must match /^[A-Za-z0-9_-]+$/\""
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Qi",
    "kind": "variable",
    "startCodeUnits": 48022,
    "endCodeUnits": 48123,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "cbcfb4a1360679c9d434764b5f8d0729a611654287c57c61dd277d83fa8719b8",
    "source": "Qi=f(()=>o().min(1).refine(ku,{message:\"path must be path-absolute and must not override the host\"}))"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Au",
    "kind": "variable",
    "startCodeUnits": 48124,
    "endCodeUnits": 48129,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "0187d0b52420a7eb02cc8ccff9fd5ec62451e5455ac2bb30e183d2502e8983dc",
    "source": "Au=10"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "es",
    "kind": "variable",
    "startCodeUnits": 48130,
    "endCodeUnits": 48234,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "611e7781a7c0e594af8e86bfb25383c99c1ea59d5cf60c8a50895e99a1b241bf",
    "source": "es=f(()=>o().min(1).refine(qmt,{message:\"segments must match [A-Za-z0-9._-]+ and must not be . or ..\"}))"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Tu",
    "kind": "variable",
    "startCodeUnits": 48235,
    "endCodeUnits": 48634,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "a81607b3ce1581ba8c4ae054a3a2b14d4a579e576f809b8d5986e4cafc0b67ca",
    "source": "Tu=f(()=>Fe([Qi(),u({path:Qi(),mode:B([\"rw\",\"ro\"]).default(\"rw\"),scope:B([\"user\",\"team\"]).default(\"team\"),mount:o().min(1).refine((e)=>/^[A-Za-z0-9_-]+$/.test(e),{message:Pu}).optional(),promptIndex:es().optional(),skillsDirs:T(es().refine((e)=>e.split(\"/\").at(-1)===\"skills\",{message:\"the last segment must be 'skills'\"})).max(Au).optional(),promptIndexMaxBytes:C().int().positive().optional()})]))"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "qmt",
    "kind": "declaration",
    "startCodeUnits": 48635,
    "endCodeUnits": 48755,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "7c745aacf3c0f577e1f14a00fe904e94743a5205f5c4de67cfc6a84f0944df27",
    "source": "function qmt(e){if(e.length===0)return!1;return e.split(\"/\").every((r)=>/^[A-Za-z0-9._-]+$/.test(r)&&r!==\".\"&&r!==\"..\")}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "T9",
    "kind": "declaration",
    "startCodeUnits": 48755,
    "endCodeUnits": 48975,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "c45b6da267dd2cf71c2bf8464c3662cad14e9d906e550c8a1cdbc1478f944aa8",
    "source": "function T9(){let e=a.CLAUDE_MEMORY_STORES;if(!e)return null;let n;try{n=Y(e)}catch(r){throw Error(`CLAUDE_MEMORY_STORES is not valid JSON: ${r instanceof Error?r.message:String(r)}`)}return eo(n,\"CLAUDE_MEMORY_STORES\")}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "eo",
    "kind": "declaration",
    "startCodeUnits": 48975,
    "endCodeUnits": 49788,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "30d00fae9b0ae0a409d6bbe635a7b704c3584bd7e1fa487a8829c56c38e93238",
    "source": "function eo(e,n){let r=T(Tu()).safeParse(e);if(!r.success)throw Error(`${n} failed validation: ${r.error.message}`);let s=[],g=new Set,h=!1;for(let w of r.data){let b=typeof w===\"string\"?{path:w,mode:\"rw\",scope:\"team\"}:w,R=b.mount??Ru(b.path);if(g.has(R))throw Error(`${n} has duplicate mount: ${R}`);if(g.add(R),b.scope===\"user\"){if(h)throw Error(`${n} has more than one scope:\"user\" entry`);h=!0}s.push({path:b.path,mode:b.mode,scope:b.scope,mount:R,...b.promptIndex!==void 0&&{promptIndex:b.promptIndex},...b.promptIndexMaxBytes!==void 0&&{promptIndexMaxBytes:b.promptIndexMaxBytes},...b.skillsDirs!==void 0&&b.skillsDirs.length>0&&{skillsDirs:b.skillsDirs}})}if(s.length===0)return null;return t(`memory-stores: parsed ${s.length} store(s): `+s.map((w)=>`${w.mount}(${w.mode})`).join(\", \"),{level:\"debug\"}),s}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Bu",
    "kind": "variable",
    "startCodeUnits": 53985,
    "endCodeUnits": 53992,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "7c92f43014408efa1dbfcb3253c8c2ae2b58147fd89f31c0dfe90ca1276b6d6e",
    "source": "Bu=1500"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "rs",
    "kind": "declaration",
    "startCodeUnits": 53993,
    "endCodeUnits": 54021,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "3866ebf01bc37f25de04a301d3596a617281a53e5ee52ca52382a3ad217e6e6e",
    "source": "function rs(){return ee(Bu)}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Uu",
    "kind": "variable",
    "startCodeUnits": 54427,
    "endCodeUnits": 54437,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "62157faa22485df059d30b9fb59f730f140dd7f9b0ae71692ee30f473f3f1fbe",
    "source": "Uu=3600000"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "gs",
    "kind": "declaration",
    "startCodeUnits": 54447,
    "endCodeUnits": 65788,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "ba547248b7360360ff0b5fda5ab883a37591ef65e1f3ec77981f5d41700c0c28",
    "source": "class gs{lastPickerData=null;discoveryGeneration=0;grantMissingEmitted=!1;selectionNotGrantedEmitted=!1;promptIndexFallbackEmitted=!1;identityWaitSpentGen=-1;identityWaitDelay;decidingRun=!1;decisionRunEverStarted=!1;shrinkSubscribed=!1;disarmLateSettleRebuild=null;reconnectChain=Promise.resolve();storageV5=void 0;credentials=void 0;discoverMemoized=aY(()=>this.runDiscovery(),Uu,()=>!(this.decidingRun&&Wh().state===\"undecided\"));constructor(e=rs){this.identityWaitDelay=e}setIdentityWaitDelay(e){this.identityWaitDelay=e??rs}clearCaches(){this.lastPickerData=null,this.discoverMemoized.cache.clear()}clearAccountState(){this.discoveryGeneration++,this.grantMissingEmitted=!1,this.selectionNotGrantedEmitted=!1,this.promptIndexFallbackEmitted=!1,this.clearCaches()}reset(){this.disarmLateSettleRebuild?.(),this.disarmLateSettleRebuild=null,this.discoveryGeneration=0,this.grantMissingEmitted=!1,this.selectionNotGrantedEmitted=!1,this.promptIndexFallbackEmitted=!1,this.identityWaitSpentGen=-1,this.decidingRun=!1,this.decisionRunEverStarted=!1,this.reconnectChain=Promise.resolve(),this.storageV5=void 0,this.credentials=void 0,this.clearCaches()}adoptHandIns(e,n){if(e!==void 0)this.storageV5=e;if(n===void 0)return;if(this.credentials!==void 0&&this.credentials!==n){t(\"org-memory-discovery: a credentials store was already handed in; the later one is ignored\");return}this.credentials=n}emitGrantMissingOnce(){if(!this.grantMissingEmitted)this.grantMissingEmitted=!0,p(\"org_memory_picker\",\"grant_missing\")}pickedCandidateIsPrivate(e){return this.lastPickerData?.candidates.some((n)=>n.id===e&&n.visibility===\"private\")===!0}rootPromptIndexFocus(e){let n=e.prompt_index;if(n!==void 0&&qmt(n))return{index:n,source:\"mirror\"};if(!this.promptIndexFallbackEmitted&&!fhn())this.promptIndexFallbackEmitted=!0,p(\"org_memory_picker\",\"prompt_index_absent\");return{index:ro,source:\"fallback\"}}withSelectedGroupingMounts(e,n,r){let s=qYe()?e.filter((x)=>JN(x.path)!==void 0):e,g=tr(n);if(g===void 0){if(!fhn())this.emitGrantMissingOnce();return s}if(!Ht(g.path))return t(\"org-memory-discovery: granted grouping path failed the partition pin \\u2014 not mounting\",{level:\"warn\"}),this.emitGrantMissingOnce(),s;let h=[...s],w=(x)=>h.some((I)=>K_(I.path)===K_(x)),b=(x,I)=>{if(w(I))return!0;return h=ns(h,x,I),!1};for(let x of Xr().filter(gn)){let I=K_(x.path),A=I.slice(I.lastIndexOf(\"/\")+1);if(!A.startsWith(\"cagt_\")||!Ht(x.path)){t(\"org-memory-discovery: granted silo entry failed the tag or partition pin \\u2014 not mounting\",{level:\"warn\"});continue}let j=`silo_${A.replace(/[^A-Za-z0-9_-]/g,\"-\")}`;if(b(j,x.path))continue;h.push({path:x.path,mount:j,scope:\"team\",mode:r&&x.mode===\"rw\"?\"rw\":\"ro\",promptIndex:\"MEMORY.md\"})}let R=`project_${n.replace(/[^A-Za-z0-9_-]/g,\"-\")}`;if(!b(R,g.path))h.push({path:g.path,mount:R,scope:\"team\",mode:\"ro\",promptIndex:\"MEMORY.md\",...g.visibility===\"private\"&&{owned:!0}});else if(g.visibility===\"private\")h.forEach((x,I)=>{if(K_(x.path)===K_(g.path))h[I]={...x,owned:!0}});let M=fn();if(M!==void 0&&Ht(M.path)&&!b(zt,M.path))h.push({path:M.path,mount:zt,scope:\"team\",mode:\"ro\",promptIndex:ro});return h}withSelectedGroupingRootMount(e,n,r){let s=qYe()?e.filter((A)=>JN(A.path)!==void 0):e,g=fn();if(g===void 0){if(!fhn())this.emitGrantMissingOnce();return s}if(!Ht(g.path))return t(\"org-memory-discovery: granted grouping-root path failed the partition pin \\u2014 not mounting\",{level:\"warn\"}),this.emitGrantMissingOnce(),s;let h=vue(n)?void 0:this.rootPromptIndexFocus(g),w=vue(n),b=r&&!w&&Kr()?\"rw\":\"ro\";if(r){let A=Ei();i(\"tengu_org_memory_root_write_outcome\",{outcome:c(b===\"rw\"?\"rw_granted\":w?\"legacy_selection\":A===\"private_candidate\"?\"private_candidate_veto\":A===\"conflicted_mirror\"?\"conflicted_mirror\":A===\"private_grouping\"?\"private_grouping\":A===\"mirror_ro\"?\"mirror_ro\":\"verdict_failed\")})}let R=s.some((A)=>K_(A.path)===K_(g.path)),M=R?s:ns(s,zt,g.path),x=R?h===void 0?M:M.map((A)=>K_(A.path)===K_(g.path)?{...A,promptIndex:h.index}:A):[...M,{path:g.path,mount:zt,scope:\"team\",mode:b,promptIndex:h?.index??ro}],I=x.find((A)=>K_(A.path)===K_(g.path));return i(\"tengu_org_memory_root_mount_derived\",{mount_name:I?.mount===zt?S(zt):S(\"discovered\"),mode:c(I?.mode??\"ro\"),prompt_index_source:c(h?.source??\"none\")}),x}async awaitSelectionIdentity(){let e=rQ();if(e!==null)return e;if(this.identityWaitSpentGen===this.discoveryGeneration)return null;this.identityWaitSpentGen=this.discoveryGeneration;for(let n=0;e===null&&n<Gu;n++)await this.identityWaitDelay(),e=rQ();return e}async applyGrantAdjustments(e,n,r){let s=Wh();if(s.state!==\"undecided\")return s.state===\"on\"?[...s.stores]:null;if(!this.decidingRun)return null;let g=await this.awaitSelectionIdentity(),h=()=>{if(this.discoveryGeneration!==e)return!0;let A=n??g;if(A===null)return!1;let j=rQ();return j!==null&&j!==A};if(h())return G1(\"superseded\"),null;if(g===null)return G1(\"identity_unresolved\"),t(\"org-memory-discovery: identity unresolved at decision time \\u2014 org memory off for this session\"),null;let w;try{w=await r2o(this.credentials,this.storageV5)}catch(A){return t(`org-memory-discovery: decision-time negotiation failed: ${l(A)}`),G1(this.discoveryGeneration===e?\"negotiation_failed\":\"superseded\"),null}let b=w.request,R=b.selection!==null&&nr(b.selection)&&Kr(),M=b.writeAccess?r.map((A)=>{if(JN(A.path)!==\"rw\")return A;if(vi(A.path))return{...A,mode:\"rw\"};if(R&&Mi(A.path))return{...A,mode:\"rw\"};return A}):r;if(b.selection!==null){let A=ps(b.selection);M=A===\"root\"?this.withSelectedGroupingRootMount(M,b.selection,b.writeAccess):A===\"silo\"?this.withSelectedSiloMount(M,b.selection,b.writeAccess):this.withSelectedGroupingMounts(M,b.selection,b.writeAccess)}else if(qYe())M=M.filter((A)=>JN(A.path)!==void 0);if(h())return G1(\"superseded\"),null;if(M.length===0)return G1(\"no_stores\"),null;let x=b.selection===null&&!w.degraded?Ci():null;if(!c2o({identity:g,stores:M,request:{writeAccess:b.writeAccess,selection:b.selection??x},selectionKind:Ti(b.selection??x),selectionSource:b.selection!==null?\"preference\":x!==null?\"pinned_default\":\"none\",initialGrant:Xr(),degraded:w.degraded}))return null;return M}withSelectedSiloMount(e,n,r){if(!qYe())return e;let s=e.filter((w)=>JN(w.path)!==void 0),g=qr(n);if(g===void 0)return this.emitGrantMissingOnce(),s;if(!Ht(g.path))return t(\"org-memory-discovery: granted silo path failed the partition pin \\u2014 not mounting\",{level:\"warn\"}),this.emitGrantMissingOnce(),s;if(!yn(g.path,n)){if(!this.selectionNotGrantedEmitted&&!fhn())this.selectionNotGrantedEmitted=!0,p(\"org_memory_picker\",\"selection_not_granted\");return s}if(s.some((w)=>K_(w.path)===K_(g.path)))return s;let h=`silo_${n.replace(/[^A-Za-z0-9_-]/g,\"-\")}`;if(s.some((w)=>w.mount===h))return s;return[...s,{path:g.path,mount:h,scope:\"team\",mode:r&&g.mode===\"rw\"?\"rw\":\"ro\",promptIndex:\"MEMORY.md\"}]}async runDiscovery(){let e=this.discoveryGeneration;Si((M)=>this.pickedCandidateIsPrivate(M));let n=(M)=>{if(e===this.discoveryGeneration)this.lastPickerData=M};switch(cn()){case\"held\":return null;case\"closed\":if(er())return null;return G1(\"gates_closed\"),null;case\"open\":break}let r=oe(),s=no(),g=()=>s!==null&&e===this.discoveryGeneration&&no()===s,h=s===null?void 0:(await Fu(this.storageV5))[r];if(s!==null&&Wu(h)&&h.account===s){if(h.stores===null)return G1(\"server_off\"),n(null),y(\"org_memory_discovery\",{off:!0,cached:!0}),null;let M=ts(h.stores);if(M.kind===\"configs\"){let x=to(h.candidates);return n({candidates:x,writeOptInAvailable:h.writeOptInAvailable===!0}),y(\"org_memory_discovery\",{stores:M.configs.length,cached:!0,...sr(x)}),this.applyGrantAdjustments(e,s,M.configs)}if(M.kind===\"empty\"){let x=to(h.candidates);if(x.length>0){if(n({candidates:x,writeOptInAvailable:h.writeOptInAvailable===!0}),y(\"org_memory_discovery\",{stores:0,cached:!0,...sr(x)}),Wh().state!==\"undecided\"||await this.awaitSelectionIdentity()===null||Kmt()!==null)return this.applyGrantAdjustments(e,s,[]);return G1(\"no_selection\"),null}n(null)}t(\"org-memory-discovery: cached stores payload failed validation \\u2014 refetching\",{level:\"warn\"})}let w=await ju(this.credentials);if(w.kind===\"transient\")return G1(\"transient\"),p(\"org_memory_discovery\",\"transient\"),null;let b=w.kind===\"stores\"?{candidates:to(w.candidates),writeOptInAvailable:w.writeOptIn===!0}:null;if(w.kind===\"off\"){if(n(null),s!==null&&e===this.discoveryGeneration&&no()===s)await fs(r,{fetchedAt:Date.now(),account:s,stores:null},this.storageV5);return y(\"org_memory_discovery\",{off:!0,cached:!1}),G1(\"server_off\"),null}let R=ts(w.stores);if(R.kind===\"invalid\")return G1(\"invalid\"),n(null),m(\"org_memory_discovery\",\"invalid_stores\"),null;if(R.kind===\"configs\"&&s!==null&&g())await os(r,s,w,this.storageV5);if(R.kind===\"empty\"){if(b!==null&&b.candidates.length>0){if(w.stores.length===0&&s!==null&&g())await os(r,s,w,this.storageV5);if(n(b),w.stores.length===0)y(\"org_memory_discovery\",{stores:0,cached:!1,...sr(b.candidates)});else p(\"org_memory_discovery\",\"all_stores_dropped\");if(Wh().state!==\"undecided\"||await this.awaitSelectionIdentity()===null||Kmt()!==null)return this.applyGrantAdjustments(e,s,[]);return G1(\"no_selection\"),null}if(Array.isArray(w.candidates)&&w.candidates.length===0&&w.stores.length===0&&b!==null){if(n(b),y(\"org_memory_discovery\",{stores:0,cached:!1}),Wh().state!==\"undecided\")return this.applyGrantAdjustments(e,s,[]);return G1(\"empty\"),null}if(w.candidates===void 0&&w.stores.length===0)return G1(\"empty\"),n(null),y(\"org_memory_discovery\",{stores:0,cached:!1}),null;return G1(\"empty\"),n(null),p(\"org_memory_discovery\",\"all_stores_dropped\"),null}return n(b),y(\"org_memory_discovery\",{stores:R.configs.length,cached:!1,...sr(b?.candidates??[])}),this.applyGrantAdjustments(e,s,R.configs)}ensureShrinkSubscription(){if(this.shrinkSubscribed)return;this.shrinkSubscribed=!0,a2o(()=>{this.discoverMemoized.cache.clear(),tgt()})}rebuildMemoryPromptOnLateSettle(){this.disarmLateSettleRebuild?.(),this.disarmLateSettleRebuild=l2o(()=>{if(this.disarmLateSettleRebuild?.(),this.disarmLateSettleRebuild=null,KYe().length>0)tgt()})}async discoverForDecision(e,n){this.adoptHandIns(e,n),this.ensureShrinkSubscription(),this.decidingRun=!0,this.decisionRunEverStarted=!0;try{return await this.discover()}catch(r){throw G1(\"transient\"),r}finally{this.decidingRun=!1}}async discover(e,n){if(this.adoptHandIns(e,n),this.ensureShrinkSubscription(),ci().orgMemoryRead===!1)return G1(\"read_disabled\"),null;return this.discoverMemoized()}reconnect(e){let n=()=>(e?.(),this.runReconnect()),r=this.reconnectChain.then(n,n);return this.reconnectChain=r,r}async runReconnect(){if(!ds())return{kind:\"refused\",reason:\"untrusted_workspace\"};let e=Wh(),n=hhn();if(n!==null&&rQ()!==n||e.state!==\"undecided\"&&Fjr()===null)return k9(),{kind:\"refused\",reason:\"account_boundary\"};if(k9(),this.decidingRun)return await Ymt(zu),{kind:\"redecided\",previous:e,current:Wh()};this.discoverMemoized.cache.clear();try{await this.discoverForDecision()}catch(r){t(`org-memory-discovery: reconnect run failed: ${l(r)}`,{level:\"warn\"})}return{kind:\"redecided\",previous:e,current:Wh()}}disconnect(e){let n=()=>(e?.(),this.runDisconnect()),r=this.reconnectChain.then(n,n);return this.reconnectChain=r,r}runDisconnect(){let e=Wh();if(k9(),this.discoverMemoized.cache.clear(),e.state===\"on\"||e.state===\"parked\")Fjr();return G1(\"no_selection\"),{kind:\"redecided\",previous:e,current:Wh()}}}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Hu",
    "kind": "variable",
    "startCodeUnits": 65792,
    "endCodeUnits": 65812,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "b24629d8bccfa26c53956384d6048d39d3787e338f1c20ae4e083a94b0b0189b",
    "source": "Hu=new V(()=>new gs)"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "ws",
    "kind": "declaration",
    "startCodeUnits": 70035,
    "endCodeUnits": 70243,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "5969b70adbf4aae40cb30fa03e65138d2e573a0c44f4aea6cbd1fef73f9891a3",
    "source": "class ws{tracked=new Set;persisted=new Set;isTracked(e){return this.tracked.has(e)}markTracked(e){this.tracked.add(e)}persistIssued(e){return this.persisted.has(e)}markPersistIssued(e){this.persisted.add(e)}}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "Qu",
    "kind": "variable",
    "startCodeUnits": 70247,
    "endCodeUnits": 70267,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "1ee68b14a4c0b3ace99a17fd1b0e71126e60bd4c55a85ecb3579b16d3a69a8dd",
    "source": "Qu=new V(()=>new ws)"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "ar",
    "kind": "variable",
    "startCodeUnits": 73925,
    "endCodeUnits": 73960,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "80e89f43541d2ed4053d83f6427dab3e7f9eb7d0fa9f24ca318f5bf3fa2f5477",
    "source": "ar=ct({value:!1},(e)=>{e.value=!1})"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "pa",
    "kind": "declaration",
    "startCodeUnits": 125709,
    "endCodeUnits": 125913,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "afebc14a9526da804cafa53ce5087348a0dd7a5c96322e8431db1256b4fb9426",
    "source": "class pa{raw=void 0;valid=!1;hasTeamStore(){let e=process.env.CLAUDE_MEMORY_STORES;if(e!==this.raw){this.raw=e;try{this.valid=T9()?.some((n)=>n.scope===\"team\")??!1}catch{this.valid=!1}}return this.valid}}"
  },
  {
    "file": "chunk-6xrs6gmd.js",
    "name": "rm",
    "kind": "variable",
    "startCodeUnits": 125917,
    "endCodeUnits": 125937,
    "moduleSha256": "f9dd0da1e467d32595bc9af036ebe3d18edca89a87e6204bf2519aeb61615e17",
    "sha256": "4885892454c80a3eb466c3e454b11e4b7e77ccfebe86f2fbc16d6c04f46a02bd",
    "source": "rm=new V(()=>new pa)"
  }
] as const

// Type-only declarations of existing COMPLETE me/pe/ve/je constructors.
// Original AST and the actual production prototypes are verified by the test.
// No cast, owner replacement, mutable global mirror or empty host is created.
declare module '../tools/AgentTool/officialAgentPromptState287/native.js' {
 interface LaunchOptions287 {restrictedSession():boolean;replaceRestrictedSession(value:boolean):void}
}
declare module '../services/context/officialExecutionOwners287/native.js' {
 interface ExecutionSurfaceCapabilities287 {markRemote(value:boolean):void}
}
type MemorySession287=ExecutionSession287
const execution=getExecutionSession287

export class MissingMemoryOwner287 extends Error {
 constructor(readonly qualifiedSymbol: string) {super(`Unbound real memory owner: ${qualifiedSymbol}`); this.name='MissingMemoryOwner287'}
}
// Public shared helper contract, not an arbitrary four-callback replacement.
export type MemoryTrackingOwner287 = MemoryTrackingTrust287
export interface MemoryComposerCallPorts287 {
 readonly E2o:ReturnType<typeof createOfficialSystemComposerMemory287>['E2o']
 readonly XUt:(model:string|undefined,options?:{readonly analysisOnly?:boolean})=>Promise<string|null>
 readonly v2o:(model:string|undefined,options?:{readonly analysisOnly?:boolean},credentials?:unknown)=>Promise<string|null>
}
export interface MemoryClientStore287 {
 readonly path:string;readonly mount:string;readonly mode:'ro'|'rw';readonly scope:'user'|'team'
 readonly promptIndex?:string;readonly promptIndexMaxBytes?:number;readonly skillsDirs?:readonly string[]
}
export type MemoryPrivateOwner287 = Pick<OfficialSystemComposerMemory287Ports, 'Nc' | 'Hu' | 'dbe' | 'mPe' | 'rU' | 'on'>
export interface MemoryProductionOptions287 {
 /** Pass the existing communication instance: do not manufacture a second surface/model memo owner. */
 readonly communication: OfficialSystemComposerMemory287Ports['communication']
 /** Same unique original permission helper instance used by the caller.
  * Defaults to the existing named-import helper; an explicit facade must
  * reference those same functions. No fake
  * tracking callbacks, second Ac/Sns, or eager memory gate is installed. */
 readonly tracking?: MemoryTrackingOwner287
 /** Genuine discovery/policy owner bundle; each missing policy call throws only when original gates actually reach it. */
 readonly privateOwners?: MemoryPrivateOwner287
 /** Service-index/connected-store/remote filesystem hand-ins only. Ordinary
  * filesystem memory does not manufacture those stores or grants. */
 readonly privateDynamic?:MemoryPrivateDynamic287
}
export interface MemoryPromptIndex287 {readonly mount:string;readonly promptIndex:string;readonly content:string}
/** Exact fields returned by chunk-6xrs6gmd.js#m8n and consumed by na/Zjr. */
export interface MemoryConnectedView287 {
 readonly id:string;readonly description:string;readonly indexPath:string;readonly projectDir:string;readonly readOnly:boolean
}
/** Consumption of the original mm hand-in; not the older one-argument
 * StorageV5Backend.listEntries contract and not a filesystem substitute. */
export interface MemoryDirectoryHandIn287 {
 listEntries(scope:{readonly namespace:'memory';readonly projectKey:string},options:{readonly skipScopeStats:true;readonly skipKeyStats:true;readonly cursor?:string}):Promise<
  {readonly ok:false}|{readonly ok:true;readonly value:{readonly items:readonly {readonly kind:string;readonly viaSymlink?:boolean}[];readonly cursor?:string}}
 >
}
export interface MemoryPrivateDynamic287 {
 JYe(path:string):Promise<boolean>
 SG(path:string):string|undefined
 mm(handIn:MemoryDirectoryHandIn287,key:string):Promise<{readonly total_file_count:number;readonly total_subdir_count:number}|undefined>
 Ymt(timeout:number):Promise<boolean>
 u2o():void
 oQ():readonly MemoryClientStore287[]
 Ls():string|null
 sa(store:MemoryClientStore287,timeout:number,connected:boolean):Promise<MemoryPromptIndex287|null>
 Qd:{of(host:object):{entriesFor(key:string,count:number,load:()=>Promise<MemoryPromptIndex287[]>):Promise<MemoryPromptIndex287[]>}}
 oWr(label:string,path:string):string
 RSe(store:MemoryClientStore287):string
 XYe(store:MemoryClientStore287):boolean
 sWr(label:string,path:string,content:string):string
 rgt(stores:readonly MemoryClientStore287[]):readonly MemoryClientStore287[]
 m8n(store:MemoryClientStore287,writable:boolean,label:string,description:string):MemoryConnectedView287
 ogt(store:MemoryClientStore287):string
 na(views:readonly MemoryConnectedView287[],options:{readonly extraGuidelines?:readonly string[];readonly indexLoaded:boolean;readonly personalMemoryDir:string;readonly personalSkipIndex:boolean;readonly lean:boolean}):string
 ya(writable:readonly Pick<MemoryClientStore287,'mount'|'promptIndex'|'skillsDirs'>[],readOnly:readonly Pick<MemoryClientStore287,'mount'|'promptIndex'|'skillsDirs'>[],guidelines:readonly string[]|undefined,skipIndex:boolean):string
 ha(guidelines:readonly string[]|undefined,skipIndex:boolean):string
}
interface ClosedDiscovery287 {readonly decisionRunEverStarted: boolean; reset(): void}
interface ClosedDecision287 extends MemoryConnectedStores287 {reset(): void}
interface LocalOwners287 {
 Qu: OfficialSystemComposerMemory287Ports['Qu']; rm: OfficialSystemComposerMemory287Ports['rm']
 Nc: {of(host: object): ClosedDecision287}; Hu: {of(host: object): ClosedDiscovery287}
 V:MemoryHostRegistryConstructor287
 ar: {value: boolean}; qbe(): boolean
 T9():readonly MemoryClientStore287[]|null
}

// Original complete declarations, including all methods. Restore once per
// module, and let original V key each constructor by the REAL execution host.
// gs/Ai private operations are deliberately not exposed by this closed facade:
// their discovery/grant/telemetry imports are not bound. No service registration
// or discovery is attempted. Reached private policy operations require privateOwners.
const originalOwnerProgram = memoryOwnerSource287.map(row => row.kind==='variable' ? `var ${row.source};` : row.source).join('\n')
const restoreLocalOwners = new Function('deps', `
 const {T,u,B,o,C,Fe,_,Y,t,a,process}=deps;
 ${originalOwnerProgram}
 function Wh(){return Nc.of(deps.execution().host).decision}
 return {Qu,rm,Nc,Hu,ar,qbe,V,T9};
`) as (deps: {
 T: typeof z.array; u: typeof z.object; B: typeof z.enum; o: typeof z.string; C: typeof z.number; Fe: typeof z.union
 _: typeof jsonStringify; Y: typeof jsonParse; t: typeof logForDebugging
 a: typeof authEnvironment; process: NodeJS.Process; execution: () => MemorySession287
}) => LocalOwners287
const localOwners=restoreLocalOwners({T:z.array,u:z.object,B:z.enum,o:z.string,C:z.number,Fe:z.union,_:jsonStringify,Y:jsonParse,t:logForDebugging,a:authEnvironment,process,execution})

function settingSource(source: string): SettingSource {
 switch(source){case'userSettings':case'projectSettings':case'localSettings':case'flagSettings':case'policySettings':return source}
 throw new MissingMemoryOwner287(`/$bunfs/root/chunk-f1vb7bx7.js#ge(${source})`)
}
export const memoryPublicGateSource287 = [
  {
    "file": "chunk-4s38z9x2.js",
    "name": "Le",
    "kind": "declaration",
    "startCodeUnits": 615,
    "endCodeUnits": 757,
    "moduleSha256": "eb46628147f83403bbcd57ca88b3370e05c6631bf027a80117844f770b276b2d",
    "sha256": "c7c851b23895c896ce38865f13ecbb54e11e83018c8ced9cae422c41298e6dfd",
    "source": "function Le(e){if(!e)return!1;if(typeof e===\"boolean\")return e;let n=String(e).toLowerCase().trim();return[\"1\",\"true\",\"yes\",\"on\"].includes(n)}"
  },
  {
    "file": "chunk-4s38z9x2.js",
    "name": "gs",
    "kind": "declaration",
    "startCodeUnits": 757,
    "endCodeUnits": 908,
    "moduleSha256": "eb46628147f83403bbcd57ca88b3370e05c6631bf027a80117844f770b276b2d",
    "sha256": "179a1d5ab26e1fe5a886487bf5243904864209c435ef03702a82ba2c01b38596",
    "source": "function gs(e){if(e===void 0)return!1;if(typeof e===\"boolean\")return!e;let n=String(e).toLowerCase().trim();return[\"0\",\"false\",\"no\",\"off\"].includes(n)}"
  },
  {
    "file": "chunk-brnn4zwp.js",
    "name": "i",
    "kind": "declaration",
    "startCodeUnits": 3660,
    "endCodeUnits": 3771,
    "moduleSha256": "6fc81e7fe2a8a0809d0901a28e8bd5487b116b245931c3ac30fcf9b6655400c7",
    "sha256": "6ee098a4efd998219bd2e44f5770d0512a56f657819a9fc14ef432d5228f5893",
    "source": "function i(e){let n=process.argv.indexOf(\"--\");return(n===-1?process.argv:process.argv.slice(0,n)).includes(e)}"
  },
  {
    "file": "chunk-brnn4zwp.js",
    "name": "yr",
    "kind": "declaration",
    "startCodeUnits": 3840,
    "endCodeUnits": 3917,
    "moduleSha256": "6fc81e7fe2a8a0809d0901a28e8bd5487b116b245931c3ac30fcf9b6655400c7",
    "sha256": "e681ccb2913ec8dbb1b9ef0148cfdd74e294fdef28890e472f87ec9254394df5",
    "source": "function yr(){return Le(process.env.CLAUDE_CODE_SAFE_MODE)||i(\"--safe-mode\")}"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "oZr",
    "kind": "declaration",
    "startCodeUnits": 76575,
    "endCodeUnits": 76638,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "b827d444f5fd188b5f6ddfae4326e3c0fb451bbd57ef7aa2a08d801acf234bf4",
    "source": "function oZr(){return n().sessionFlags.memoryToolsShapeLatch()}"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "okn",
    "kind": "declaration",
    "startCodeUnits": 76638,
    "endCodeUnits": 76703,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "a720e664431f7c3161e833adb82af2d9e8f11bb5f779795b25e97c31e263621d",
    "source": "function okn(e){n().sessionFlags.replaceMemoryToolsShapeLatch(e)}"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "Kc",
    "kind": "declaration",
    "startCodeUnits": 81181,
    "endCodeUnits": 81245,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "b4862b3423b8e60a896158101a0e5a3c52dac21dfa991a95d3cb5dc938ca4046",
    "source": "function Kc(){return n().modelSelection.mainLoopModelOverride()}"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "kL",
    "kind": "declaration",
    "startCodeUnits": 81245,
    "endCodeUnits": 81308,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "cd4a7811566361ba9118a7bdd889388439ddb7477b5ffc31f90efae2ae43d3e3",
    "source": "function kL(){return n().modelSelection.initialMainLoopModel()}"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "AT",
    "kind": "declaration",
    "startCodeUnits": 90367,
    "endCodeUnits": 90431,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "5fe7c5b3d55fbd0dea9160d856a3eed9608bf04acdfd53b3e5afbe6a2a351503",
    "source": "function AT(){return n().host.launchOptions.restrictedSession()}"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "hA",
    "kind": "declaration",
    "startCodeUnits": 91044,
    "endCodeUnits": 91101,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "3692d055c01eafa7a21d51cd9739d964723e6ca0d47fe1cecfbe54905c67ca47",
    "source": "function hA(){return n().sessionFlags.memoryToggledOff()}"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "dee",
    "kind": "declaration",
    "startCodeUnits": 91308,
    "endCodeUnits": 91374,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "ee0fbcd59fb8925667f59d0485888bd3ca70a836108c152ff172528ede2ac575",
    "source": "function dee(){return n().sessionFlags.autoMemoryOffThisSession()}"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "Wn",
    "kind": "declaration",
    "startCodeUnits": 108898,
    "endCodeUnits": 108971,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "63389ea0c9a9e5563d1a3674ca2bb909390ca204e5214df95d273bb249de1ea9",
    "source": "function Wn(){return n().surfaceCapabilities.caps().workspace===\"remote\"}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "zJn",
    "kind": "declaration",
    "startCodeUnits": 204862,
    "endCodeUnits": 204999,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "e370a055819c5ff05d7b272540cf399a7ed1bda1e734771d643114b3ff10c57a",
    "source": "function zJn(e,n){let r=e.toLowerCase();for(let s of n)if(typeof s===\"string\"&&s.length>0&&r.includes(s.toLowerCase()))return!0;return!1}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "qd",
    "kind": "declaration",
    "startCodeUnits": 510991,
    "endCodeUnits": 511034,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "e300797797318926219db437924ddadfa4eac3c9930bfdfb4defddd0fd54ea85",
    "source": "function qd(){if(oz())return!1;return sz()}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "oz",
    "kind": "declaration",
    "startCodeUnits": 511034,
    "endCodeUnits": 511067,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "e62dd095f72d126fb70a24c7480507a3b1d051c2fd80bef0010f2eaabcd1cac0",
    "source": "function oz(){return hA()||dee()}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "sz",
    "kind": "declaration",
    "startCodeUnits": 511067,
    "endCodeUnits": 511186,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "cb370c025d2917635d30337812891147c421f97651f502c85922be688228fc35",
    "source": "function sz(){switch(dE()){case\"off\":return!1;case\"forced_on\":return!0;case\"unset\":break}if(wJe())return!1;return s0()}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "s0",
    "kind": "declaration",
    "startCodeUnits": 511404,
    "endCodeUnits": 511497,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "e3892dd1a57b677bd36b801bbd59bf30fa375506569c24521f487964ee827aa2",
    "source": "function s0(){let e=tt();if(e.autoMemoryEnabled!==void 0)return e.autoMemoryEnabled;return!0}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "dE",
    "kind": "declaration",
    "startCodeUnits": 511694,
    "endCodeUnits": 511872,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "60ca84e625c062ff4c1f315c54cfa0921c775318c85ec7f31d057782a93770d8",
    "source": "function dE(){if(yr())return\"off\";if(AT())return\"off\";let e=process.env.CLAUDE_CODE_DISABLE_AUTO_MEMORY;if(Le(e))return\"off\";if(gs(e))return\"forced_on\";return cE()?\"off\":\"unset\"}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "cE",
    "kind": "declaration",
    "startCodeUnits": 511872,
    "endCodeUnits": 512039,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "6c61b1c7c9b762a46416e32bd0d0071e5a2b9f3a2bd9a1d9d0cb66dfba6fc081",
    "source": "function cE(){if(a.CLAUDE_CODE_SIMPLE)return!0;return Boolean(a.CLAUDE_CODE_REMOTE)&&!process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR&&!a.CLAUDE_COWORK_MEMORY_PATH_OVERRIDE}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "GZn",
    "kind": "declaration",
    "startCodeUnits": 512151,
    "endCodeUnits": 512215,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "3c5cc364b4cda8887e24d83f71601330cc3f63063e056625735520f20a74e2c9",
    "source": "function GZn(){return!!process.env.CLAUDE_MEMORY_STORES?.trim()}"
  },
  {
    "file": "chunk-nankzm0s.js",
    "name": "wJe",
    "kind": "declaration",
    "startCodeUnits": 512215,
    "endCodeUnits": 512420,
    "moduleSha256": "9079ca3b46000d8e97a924af7c7de432c859148354d3463ce1495c571d2161fa",
    "sha256": "0543d8202ee57ad122d3d40d3d03239d0f5d4fcbdfb2a37a9ba3ab7c2d597c71",
    "source": "function wJe(){let e=k(\"tengu_sepia_cormorant\",null);if(!Array.isArray(e)||e.length===0)return!1;let n=Kc(),r=n!==void 0?n:kL();if(typeof r!==\"string\"||!zJn(r,e))return!1;return k(\"tengu_umber_petrel\",!1)}"
  }
] as const
interface PublicGates287 {
 sz():boolean; qd():boolean; yr():boolean; GZn():boolean; Wn():boolean; oZr():boolean|null; okn(value:boolean):void
}
const restorePublicGates287=new Function('imports',`
 const {n,a,k,tt,process}=imports;
 ${memoryPublicGateSource287.map(row=>row.source).join('\n')}
 return {sz,qd,yr,GZn,Wn,oZr,okn};
`) as (imports:{
 n:()=>MemorySession287; a:typeof authEnvironment; process:NodeJS.Process
 k:<T>(name:string,fallback:T)=>T; tt:()=>{readonly autoMemoryEnabled?:boolean}
})=>PublicGates287
function feature<T>(name:string,fallback:T):T{return getFeatureValue_CACHED_MAY_BE_STALE(name,fallback)}
export const memoryHostRegistryConstructor287=localOwners.V

// Shared permission functions are direct imports. Their public owner has
// documented parity boundaries; no full fi${USER_HOME} claim is made here. No
// Ac/Sns trust latch, Git cache or classifier is reproduced by memory here.
const memoryTrackingTrust287:MemoryTrackingTrust287=systemComposerMemoryTrackingOwner287
function requireMemoryTrackingTrust287(symbol:keyof MemoryTrackingTrust287):MemoryTrackingTrust287 {
 void symbol // Keep the qualified required-port consumption visible to audit.
 return memoryTrackingTrust287
}
export function bindSystemComposerMemoryTracking287(owner:MemoryTrackingTrust287):void {
 if(memoryTrackingTrust287===owner)return
 if(owner.ds===memoryTrackingTrust287.ds&&owner.J0===memoryTrackingTrust287.J0&&owner.OE===memoryTrackingTrust287.OE&&owner.bs===memoryTrackingTrust287.bs)return
 throw Error('Different shared memory tracking owner: use the unique permission helper')
}
const memoryOrigin287=createMemoryTrackingOrigin287(localOwners.V,()=>requireMemoryTrackingTrust287('ds').ds())
/** Same host-scoped gE owner consumed by the system composer and the actual
 * ordinary MEMORY.md context loader. Its memo key follows live project state. */
export function getSystemComposerMemoryDirectory287():string|null {
 return memoryOrigin287.owner().resolve()
}
const memoryIndexPersistence287=createMemoryIndexPersistence287({
 ds:()=>requireMemoryTrackingTrust287('ds').ds(),OE:()=>requireMemoryTrackingTrust287('OE').OE(),
})
const publicGates=restorePublicGates287({n:execution,a:authEnvironment,k:feature,tt:getInitialSettings,process})

function dynamicProgram287(file:string,names?:readonly string[]):string{
 return memoryDynamicSource287.filter(row=>row.file===file&&(!names||names.includes(row.name)))
  .map(row=>row.kind==='variable'?`var ${row.source};`:row.source).join('\n')
}
export type MemoryServedState287=RuntimeMemo287
// The original ko/r/e is also used by context and fork policy, not copied here.
export const getMemoryServedState287=getRuntimeMemo287

interface DynamicInputs287 {
 staticPorts:OfficialSystemComposerMemory287Ports
 T9:LocalOwners287['T9'];VH:typeof memoryOrigin287.owner;tt:typeof getInitialSettings
 ae:typeof getFsImplementation;E:typeof getErrnoCode;l:typeof errorMessage
 t:typeof logForDebugging;i:typeof logEvent;ko:typeof getMemoryServedState287
 Jt:typeof join;wo:typeof join;la:typeof join;Dn:string;ho:readonly string[]
 privatePort<K extends keyof MemoryPrivateDynamic287>(symbol:K):MemoryPrivateDynamic287[K]
}
interface DynamicRuntime287 extends MemoryComposerCallPorts287 {
 memoryStatic:MemoryComposerCallPorts287['E2o']
 memoryLines:ReturnType<typeof createOfficialSystemComposerMemory287>['memoryLines']
 /** Original chunk-6xrs6gmd.js#a3 read-fence gate in this same live owner closure. */
 a3():boolean
 VUt():boolean
 dgt():boolean
 Xs():string
 ia(timeout?:number,options?:{readonly serveConnectedStores?:boolean}):Promise<MemoryPromptIndex287[]>
}
// Reuse the existing COMPLETE static factory's actual function body. Only its
// factory export footer is extended; no static function/prose/gate is copied
// or rewritten, and E2o/XUt share one lexical fr/vo/ar/Qu/T9 binding.
const staticFactorySource287=createOfficialSystemComposerMemory287.toString()
const staticFooter287=/return\s*\{\s*E2o\s*,\s*memoryStatic\s*:\s*E2o\s*,\s*memoryLines\s*:\s*vo\s*\}\s*;?/
if([...staticFactorySource287.matchAll(new RegExp(staticFooter287.source,'g'))].length!==1)throw Error('Pinned memory factory export footer changed')
const dynamicPrivateNames287=['JYe','SG','mm','Ymt','u2o','oQ','Ls','sa','oWr','RSe','XYe','sWr','rgt','m8n','ogt','na','ya','ha'] as const satisfies readonly (keyof MemoryPrivateDynamic287)[]
const dynamicDeclarations287=[
 dynamicProgram287('chunk-2z86j2rq.js'),
 dynamicProgram287('chunk-6xrs6gmd.js'),
 dynamicProgram287('chunk-nankzm0s.js'),
 dynamicProgram287('chunk-bn3p37gv.js',['an','gR']),
 dynamicProgram287('chunk-x02yxv10.js'),
 dynamicProgram287('chunk-a6fqs976.js'),
 memoryDynamicEventSource287.filter(row=>row.file==='chunk-9d2ykxmy.js').map(row=>row.source).join('\n'),
 excludedMemorySource287.source,
].join('\n')
const dynamicHeader287=`
const {T9,VH,tt,ae,E,l,t,i,ko,Jt,wo,la,Dn,ho}=extra;
const {S,c,tme}=(function(){
 ${dynamicProgram287('chunk-n4qghq20.js')}
 ${memoryDynamicEventSource287.filter(row=>row.file!=='chunk-9d2ykxmy.js').map(row=>row.source).join('\n')}
 return {S,c,tme};})();
${dynamicPrivateNames287.map(name=>`const ${name}=(...args)=>extra.privatePort(${JSON.stringify(name)})(...args);`).join('\n')}
const Qd={of:(host)=>extra.privatePort('Qd').of(host)};
`
const sharedFactorySource287=staticFactorySource287.replace('{',`{\n${dynamicHeader287}`)
 .replace(staticFooter287,`${dynamicDeclarations287}\nreturn {E2o,memoryStatic:E2o,memoryLines:vo,XUt,v2o,ia,a3,VUt,dgt,Xs};`)
const restoreDynamicRuntime287=new Function('extra','memoryFrontmatter287','memoryAccessGuidance287',`return (${sharedFactorySource287})(extra.staticPorts);`) as (extra:DynamicInputs287,frontmatter:typeof memoryFrontmatter287,guidance:typeof memoryAccessGuidance287)=>DynamicRuntime287

export function createSystemComposerMemory287(options: MemoryProductionOptions287) {
 if(options.tracking!==undefined)bindSystemComposerMemoryTracking287(options.tracking)
 const requirePrivate=(symbol: keyof MemoryPrivateOwner287): MemoryPrivateOwner287 => {
  if(!options.privateOwners)throw new MissingMemoryOwner287(`/$bunfs/root/${symbol==='Nc'||symbol==='Hu'?'chunk-6xrs6gmd':'chunk-b5kmgz2n'}.js#${symbol}`)
  return options.privateOwners
 }
 const ports: OfficialSystemComposerMemory287Ports = {
  communication: options.communication,
  Ae(update,context){void saveGlobalConfig(current=>update(current as typeof current & MemoryProjectConfig287) as typeof current,context)},
  At:isEssentialTrafficOnly,
  GZn:publicGates.GZn,
  HKr:memoryIndexPersistence287,
  Hu:{of:host=>options.privateOwners?options.privateOwners.Hu.of(host):localOwners.Hu.of(host)},
  J0:input=>requireMemoryTrackingTrust287('J0').J0(input),
  Jbe:memoryOrigin287.Jbe,
  Js:isFirstPartyRequestEndpoint,
  Nc:{of:host=>options.privateOwners?options.privateOwners.Nc.of(host):localOwners.Nc.of(host)},
  Qu:localOwners.Qu,
  U:execution,
  Wn:publicGates.Wn,
  Xo:getEnabledSettingSources,
  YC:()=>{const {getProjectPathForConfig}=require('../utils/config.js') as typeof import('../utils/config.js');return getProjectPathForConfig()},
  a:authEnvironment,
  ar:localOwners.ar,
  ci:()=>{const {getCurrentProjectConfig}=require('../utils/config.js') as typeof import('../utils/config.js');return getCurrentProjectConfig() as ReturnType<typeof getCurrentProjectConfig> & {orgMemoryRead?:boolean}},
  dbe:()=>requirePrivate('dbe').dbe(),
  ds:()=>requireMemoryTrackingTrust287('ds').ds(),
  ft:isClaudeAISubscriber,
  g8:scope=>{const scopes=getClaudeAIOAuthTokens()?.scopes;return Array.isArray(scopes)&&scopes.includes(scope)},
  ge(source):ReturnType<OfficialSystemComposerMemory287Ports['ge']>{
   const settings=getSettingsForSource(settingSource(source))
   if(settings===null)return undefined
   const blocked=settings.permissions?.blockReadsOutsideWorkingDirectories
   if(blocked!==undefined&&typeof blocked!=='boolean')throw Error('Invalid typed memory read-fence setting')
   const readFence:boolean|undefined=typeof blocked==='boolean'?blocked:undefined
   return {permissions:settings.permissions?{blockReadsOutsideWorkingDirectories:readFence}:undefined}
  },
  im:()=>getClaudeAIOAuthTokens()?.accessToken!=null,
  k:feature,
  kKr:memoryOrigin287.kKr,
  lc:()=>process.env.CLAUDE_CODE_SESSION_ACCESS_TOKEN||getAnthropicApiKey(),
  le:()=>getGlobalConfig() as ReturnType<typeof getGlobalConfig> & MemoryProjectConfig287,
  mPe:()=>requirePrivate('mPe').mPe(),
  oZr:publicGates.oZr,
  okn:publicGates.okn,
  on:policy=>requirePrivate('on').on(policy),
  process:{env:{get CLAUDE_MEMORY_STORES(){return process.env.CLAUDE_MEMORY_STORES}}},
  qbe:localOwners.qbe, // Original qbe -> Kwn, not a replacement boolean.
  qd:publicGates.qd,
  rU:()=>requirePrivate('rU').rU(),
  rm:localOwners.rm,
  sz:publicGates.sz,
  um:()=>{const project=execution().project;return project===null?null:project.originalCwd},
  yr:publicGates.yr,
 }
 const dynamicSourcePorts:DynamicInputs287={staticPorts:ports,T9:localOwners.T9,VH:memoryOrigin287.owner,tt:getInitialSettings,
  ae:getFsImplementation,E:getErrnoCode,l:errorMessage,t:logForDebugging,i:logEvent,ko:getMemoryServedState287,
  Jt:join,wo:join,la:join,Dn:sep,
  // ho is the existing formatter's exact one-element tail, source-verified
  // below in the dynamic fixture; do not duplicate its frozen prose.
  ho:memoryFrontmatter287([]).slice(-1),
  privatePort(symbol){if(!options.privateDynamic)throw new MissingMemoryOwner287(`/$bunfs/root/chunk-6xrs6gmd.js#${symbol}`);return options.privateDynamic[symbol]},
 }
 const native=restoreDynamicRuntime287(dynamicSourcePorts,memoryFrontmatter287,memoryAccessGuidance287)
 const composerPorts:MemoryComposerCallPorts287={E2o:native.E2o,XUt:native.XUt,v2o:native.v2o} satisfies Pick<SystemComposerDynamicCallPorts287,'E2o'|'XUt'> & Pick<MemoryComposerCallPorts287,'v2o'>
 return {
  /** Audit/VM parity surface: real bindings, not a second fixture configuration. */
  ports,
  sourcePorts:ports,
  dynamicSourcePorts,
  /** Source E2o import for main's unified composer. Model is already resolved
   * by that caller; do not repeat modelForPrompt or wrap its original gates. */
  composerPorts,
  E2o:native.E2o,
  memoryStatic:native.E2o,
  memoryLines:native.memoryLines,
  readFenceBlocked287:native.a3,
  readFenceDirectoryBlocked287:native.VUt,
  readFenceEnabled287:native.dgt,
  requiredMemoryDirectory287:native.Xs,
  memoryDynamic:native.XUt,
  loadStorePromptIndexes:native.ia,
  servedState:getMemoryServedState287,
  /** Same complete original T9/eo parser used by pa, not discovery.getStores.
   * No mount is loaded, backend contacted, or promptIndex content injected. */
  clientStores:localOwners.T9,
  projectConfigKey:ports.YC,
  /** Reuse the existing memory PATH service, not its different/older prompt text. */
  memoryDirectory:getAutoMemPath,
  trackingDirectory:memoryOrigin287.owner,
 }
}

/** Main's existing communication287 is the required owner, not a fresh
 * communication factory. Bind once at the caller and spread composerPorts;
 * the returned E2o keeps reading the live settings/session/config owners.
 * This module deliberately does not import prompts.ts (which owns that
 * communication instance) or choose a model before the original yRt caller.
 */
export function bindSystemComposerMemoryCaller287(
 communication:Pick<ReturnType<typeof createDefaultCommunication287>,'leanForPrompt'>,
 options:Omit<MemoryProductionOptions287,'communication'>={},
){
 return createSystemComposerMemory287({...options,communication:{lean:communication.leanForPrompt}})
}

/** Evidence only: reuse these existing native constructors, never copy them. */
export const memoryNativeSlotSource287=[
  {
    "file": "chunk-bn3p37gv.js",
    "name": "pe",
    "startCodeUnits": 28559,
    "endCodeUnits": 30157,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "bfed4602cf4bdd95ce88a9dd60964b64ce3a5eefecb47ede6f5365a84d4fe028"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "me",
    "startCodeUnits": 33246,
    "endCodeUnits": 36513,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "5cccc6243aeffc41d30cae5ed08a8be248de0fd9525094dd5ebabf6dbf56550d"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "ve",
    "startCodeUnits": 38899,
    "endCodeUnits": 40281,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "254f28705d120f9701d627c9155ecd8db0c3c3d1bd698ef3d1211866f6a0c0e3"
  },
  {
    "file": "chunk-bn3p37gv.js",
    "name": "je",
    "startCodeUnits": 53046,
    "endCodeUnits": 57745,
    "moduleSha256": "29c5bee6774af95c55e4ad4d7f1857459fcca3370ab5647e9af68ed32766d0a5",
    "sha256": "e0fbb530d7b28e728f253d7ef9d4ef1254f94e17ab4736549f0abc651f8c936f"
  }
] as const

/**
 * Exact 287 a3 gate, wired to the existing settings, permission-trust,
 * memory-origin, and host-state owners. This closure shares the module's
 * canonical state and does not construct or contact any Storage backend.
 */
let memoryReadPolicy287:ReturnType<typeof createSystemComposerMemory287>|undefined
export function getMemoryReadPolicy287() {
 // Load the canonical communication owner only at the first real policy/prompt call.
 // An eager import re-enters prompts.ts while communication is initializing.
 const {communication287}=require('./communication287.js') as typeof import('./communication287.js')
 return memoryReadPolicy287??=createSystemComposerMemory287({
  communication:{lean:communication287.leanForPrompt}
 })
}
export function createAutoDreamReadFence287(): () => boolean {
 return getMemoryReadPolicy287().readFenceBlocked287
}
export const isPublicAutoMemoryEnabled287=publicGates.qd
export const hasMemoryStoreOverride287=publicGates.GZn
export function getSystemComposerMemoryDirectoryOwner287() {
 return memoryOrigin287.owner()
}
