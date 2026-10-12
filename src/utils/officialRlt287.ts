import {createOfficialRltToolProgressOwner287} from '../state/officialRltToolProgress287.js';
import * as React from 'react'
import * as compilerRuntime from 'react/compiler-runtime'
import { useCallback, useRef, useState, useEffect, useSyncExternalStore } from 'react'
import { z } from 'zod'
import { OfficialRltSourceRenderer287 } from './officialRltRenderer287.js';
import { SYNC_OUTPUT_SUPPORTED } from '../ink/terminal.js';
import { isFullscreenEnvEnabled } from './fullscreen.js';
import { logError } from './log.js'
import type { ExecutionSession287 } from '../services/context/officialExecutionOwners287/native.js'

// Source: official 2.1.287 darwin-arm64 chunk-f2cpzzp9.js, SHA-256
// ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae.
// JP [76668,76803), cm [76804,76890), Rlt [78883,79294), UTF-16 offsets.

export interface OfficialRltDialog287 {
  kind: string
  id?: string
  payload?: unknown
  userInvoked?: boolean
  hideWhile?: readonly string[]
  holdsTop?: boolean
  place?: "under" | "queue"
  askOrder?: number
  countedAsk?: OfficialRltCountedAsk287
  succeeds?: boolean
  shownAt?: number
  revealSeq?: number
  onFirstReveal?: () => void
  onClaimed?: () => void
  [field: string]: unknown
}
export interface OfficialRltDialogState287 { open: OfficialRltDialog287[] }
export interface OfficialRltSpinnerStore287 {
  mode: string
  isCompacting: boolean
  [field: string]: unknown
}
export interface OfficialRltStore287 {
  getState(): { transcripts: Record<string, { inProgressToolUseIDs?: ReadonlySet<string> } | undefined> }
}

// Full 2.1.287 JP set from chunk-f2cpzzp9.js [76668,76803). The optional
// kPr/qHt kinds are null in this pinned build; spreading them contributes no
// entries. Names are the source dialog `kind` values, not UI labels.
export const officialRltIgnoredDialogKinds287: ReadonlySet<string> = new Set([
  'ide_onboarding', 'left_arrow_confirm', 'lsp_recommendation', 'plugin_hint',
  'goal_proposal', 'remote_callout', 'effort_medium_nudge', 'ultraplan_choice',
  'cost_threshold', 'resume_return', 'cold_resume_quota', 'newer_model_offer',
  'fullscreen_upsell',
])

// Exact cm(h) behavior from the pinned source.
export function cm287(state: OfficialRltDialogState287): OfficialRltDialog287 | null {
  return state.open.findLast(dialog => dialog.userInvoked !== true && !officialRltIgnoredDialogKinds287.has(dialog.kind)) ?? null
}

export interface OfficialRltPorts287 {
  who(session: ExecutionSession287): boolean
  mainAgentId(): string
}

/** Exact Rlt closure body with only source-host accessors explicitly ported. */
export function createOfficialRlt287(ports: OfficialRltPorts287) {
  return function Rlt(input: {
    turn: { stream: { isMainResponseStreaming: boolean } }
    store: OfficialRltStore287
    session: ExecutionSession287
    spinnerStore: { get(): OfficialRltSpinnerStore287 }
    dialogStore: { getState(): OfficialRltDialogState287 }
  }) {
    const spinner = input.spinnerStore.get()
    const dialog = input.dialogStore.getState()
    const inProgressToolUseIDs = input.store.getState().transcripts[ports.mainAgentId()]?.inProgressToolUseIDs
    return {
      isHeldByDialog: ports.who(input.session) || cm287(dialog) !== null || dialog.open.some(item => item.userInvoked === true),
      isToolCallStarting: (inProgressToolUseIDs?.size ?? 0) > 0 || spinner.mode === 'tool-input',
      isCompacting: spinner.isCompacting,
      isMainRequestAnnounced: input.turn.stream.isMainResponseStreaming || spinner.mode === 'requesting',
    }
  }
}


// BEGIN ORIGINAL_DIALOG_STREAM_RUNTIME_287
// Full original declarations; compiled once, never read raw at runtime.
export const officialRltProducerEvidence287 = {
  "version": "2.1.287",
  "manifestSha256": "ad7d73a99c7d564a7ae4867cbdcd0ef190a5549e9aa2f63ba809d2e7b35d3db5",
  "offsetUnit": "UTF-16 code units (end-exclusive)",
  "rows": [
    {
      "file": "chunk-62ct6c99.js",
      "name": "WL",
      "start": 863,
      "end": 928,
      "moduleSha256": "65d634c0c0375dac3d971639d46f271e44d9f7f1e46dfe8573cead63c07a40b6",
      "sha256": "fc0cb65b7794c963a15229c045c21067e21ac5bbe3b0d2218a6ecedc64f9aa9a",
      "source": "function WL(n){return n.open.findLast((e)=>!e.userInvoked)??null}",
      "variable": false
    },
    {
      "file": "chunk-62ct6c99.js",
      "name": "Hpr",
      "start": 1052,
      "end": 2547,
      "moduleSha256": "65d634c0c0375dac3d971639d46f271e44d9f7f1e46dfe8573cead63c07a40b6",
      "sha256": "486d8b89334e3ec4cee57ecb5cb6bf67d0b45da651220fbfd20e880ad6aa6f9c",
      "source": "function Hpr(n=()=>Date.now()){let e=Ls({open:[]}),i=Me(),l=new Xmr,u=Number.NEGATIVE_INFINITY,d=new Set,s=(o,t)=>`${o}:${t}`,g=(o)=>{for(let t of d)if(t.startsWith(`${o}:`))d.delete(t)},f=(o)=>{let{removed:t,closedBlockingTopBare:a}=m(e,o);if(!t)return!1;if(a)u=Date.now();return g(o),!0},r={getState:e.getState,subscribe:e.subscribe,onClosed:i.subscribe,askTally:l,open(o){if(o.countedAsk!==void 0)l.join(o.countedAsk);e.setState((t)=>{let a=o.place===\"queue\"?v(t.open,o):void 0;if(a!==void 0)return{open:[...t.open.slice(0,a),o,...t.open.slice(a)]};let c=WL(t),S=c?.holdsTop===!0&&D(c,o)&&o.succeeds!==!0;if((o.place===\"under\"||S)&&t.open.some((p)=>p.userInvoked!==!0))return{open:[o,...t.open]};let k=t.open.some((p)=>D(p,o))||o.userInvoked!==!0&&t.open.some((p)=>p.userInvoked===!0),b=o.userInvoked!==!0&&Dl(n,u),y=k||b?{...o,shownAt:Date.now()}:o;return{open:[...t.open,y]}})},update(o,t){e.setState((a)=>{let c=a.open.findIndex((k)=>k.id===o);if(c===-1)return a;let S=a.open.slice();return S[c]={...a.open[c],payload:t,shownAt:Date.now()},{open:S}})},answer(o,t){if(e.getState().open.find((a)=>a.id===o)?.countedAsk?.settle(),!f(o))return;i.emit({id:o,type:\"answered\",result:t})},dismiss(o){if(!f(o))return;i.emit({id:o,type:\"dismissed\"})},firstReveal(o,t){if(!e.getState().open.some((c)=>c.id===o))return!1;let a=s(o,t);if(d.has(a))return!1;return d.add(a),!0},hasRevealed(o,t){return d.has(s(o,t))},dismissKind(o){for(let t of e.getState().open)if(t.kind===o)r.dismiss(t.id)}};return r}",
      "variable": false
    },
    {
      "file": "chunk-62ct6c99.js",
      "name": "m",
      "start": 2547,
      "end": 2920,
      "moduleSha256": "65d634c0c0375dac3d971639d46f271e44d9f7f1e46dfe8573cead63c07a40b6",
      "sha256": "de3f98547604458cea971541db369348756b3d714b4d3b84d0c23f9204c43036",
      "source": "function m(n,e){let i=!1,l=!1;return n.setState((u)=>{let d=u.open.find((o)=>o.id===e);if(!d)return u;i=!0;let s=u.open.filter((o)=>o!==d),g=u.open.filter((o)=>D(o,d)),f=g.at(-1)===d,r=g.at(-2);if(l=f&&!r&&d.userInvoked!==!0,!f||!r)return{open:s};return{open:s.map((o)=>o===r?{...r,shownAt:Date.now(),revealSeq:(r.revealSeq??0)+1}:o)}}),{removed:i,closedBlockingTopBare:l}}",
      "variable": false
    },
    {
      "file": "chunk-62ct6c99.js",
      "name": "v",
      "start": 2920,
      "end": 3503,
      "moduleSha256": "65d634c0c0375dac3d971639d46f271e44d9f7f1e46dfe8573cead63c07a40b6",
      "sha256": "1b6e1b0285dde46d185f42dea8be961069e7c28addfedd1be28be34da910ef8d",
      "source": "function v(n,e){let i=e.askOrder??Number.POSITIVE_INFINITY,l=n.findIndex((s)=>s.place!==void 0&&s.askOrder!==void 0&&s.askOrder<=i);if(l===-1){let s=n.findLastIndex((r)=>r.place===\"queue\"&&r.askOrder!==void 0),g=n.findLastIndex((r)=>r.place!==void 0&&r.askOrder!==void 0),f=n.slice(g+1).some((r)=>r.askOrder===void 0&&r.holdsTop!==!0&&r.userInvoked!==!0);l=s!==-1&&!f?g+1:n.findIndex((r)=>r.place===void 0&&r.askOrder!==void 0)}if(l===-1)return;let u=n.findIndex((s)=>s.place===void 0&&s.askOrder!==void 0);if(u!==-1&&u<l)l=u;return n.slice(l).some((s)=>s.userInvoked!==!0)?l:void 0}",
      "variable": false
    },
    {
      "file": "chunk-62ct6c99.js",
      "name": "D",
      "start": 3503,
      "end": 3568,
      "moduleSha256": "65d634c0c0375dac3d971639d46f271e44d9f7f1e46dfe8573cead63c07a40b6",
      "sha256": "ce238d9d21e68eea1df7924c3a1144088f4677e079b7c231920c988e0a4f8801",
      "source": "function D(n,e){return n.userInvoked===!0===(e.userInvoked===!0)}",
      "variable": false
    },
    {
      "file": "chunk-szqmqh92.js",
      "name": "Xmr",
      "start": 1032,
      "end": 1440,
      "moduleSha256": "0b95f6f2628a14f0ae1518acda0c8839f0396a8eaca0bfd0566090f754f2e284",
      "sha256": "aac9a2b3d8fc57cf508a695e4acbcc09a1178665b5d2e69d5e1256ae7a284ca3",
      "source": "class Xmr{#e=new Map;#t=0;#i=Me();subscribe=(e)=>this.#i.subscribe(e);join(e){if(e.settled||this.#e.has(e))return;this.#e.set(e,e.onSettle(()=>this.#s(e))),this.#i.emit()}positionLabel(e){if(!this.#e.has(e))return null;let i=this.#t+this.#e.size;return i<2?null:`${this.#t+1} of ${i}`}#s(e){let i=this.#e.get(e);if(i===void 0)return;i(),this.#e.delete(e),this.#t=this.#e.size===0?0:this.#t+1,this.#i.emit()}}",
      "variable": false
    },
    {
      "file": "chunk-jed7c28t.js",
      "name": "nV",
      "start": 718,
      "end": 724,
      "moduleSha256": "5f02303ee4fed0ef3e1cfaeb5a5bd037cedc7a2fc63a8ab8cc581e6ad97b64bc",
      "sha256": "8d137e4e26cc747046c9c68c3dd626d3031cd1560127034df6be7d9a6eb63391",
      "source": "nV=150",
      "variable": true
    },
    {
      "file": "chunk-jed7c28t.js",
      "name": "Dl",
      "start": 732,
      "end": 806,
      "moduleSha256": "5f02303ee4fed0ef3e1cfaeb5a5bd037cedc7a2fc63a8ab8cc581e6ad97b64bc",
      "sha256": "95862fb00be2cce73da623bb3c08a26424238ac0697297ff71af50419383e269",
      "source": "function Dl(e,n,t=nV){let o=e()-n;if(o>=0)return o<t;return n<=Date.now()}",
      "variable": false
    },
    {
      "file": "chunk-4s38z9x2.js",
      "name": "s",
      "start": 1098,
      "end": 1153,
      "moduleSha256": "eb46628147f83403bbcd57ca88b3370e05c6631bf027a80117844f770b276b2d",
      "sha256": "8b79e9ad51e95ede56e4385a196d4187b05a3d78fde643acd8c68658ff8e8521",
      "source": "s=globalThis.process?.getBuiltinModule?.(\"async_hooks\")",
      "variable": true
    },
    {
      "file": "chunk-4s38z9x2.js",
      "name": "wKt",
      "start": 1154,
      "end": 1195,
      "moduleSha256": "eb46628147f83403bbcd57ca88b3370e05c6631bf027a80117844f770b276b2d",
      "sha256": "d871ff458e10c6c5509c5b70f7944fba032e2a42697e09aec182aaaac06d05b4",
      "source": "wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e",
      "variable": true
    },
    {
      "file": "chunk-4s38z9x2.js",
      "name": "Me",
      "start": 1196,
      "end": 1457,
      "moduleSha256": "eb46628147f83403bbcd57ca88b3370e05c6631bf027a80117844f770b276b2d",
      "sha256": "08c491676ef2243b475f885c45f1163b2f0abed6075a2e5fa3a32cdd2afb308a",
      "source": "function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,\"Signal listener(s) threw\")},clear(){e.clear()}}}",
      "variable": false
    },
    {
      "file": "chunk-s1bsd5xr.js",
      "name": "Ls",
      "start": 1141,
      "end": 1399,
      "moduleSha256": "01026c112b0e184dd3611de7dd5c0d7197ed41d36134a8408972cae12e0b8de6",
      "sha256": "c733414f44c04f9f81aa9594171ed41ed4ef9169f99d6405308066545eacb99e",
      "source": "function Ls(t,e){let r=t,S=new Set,a=e&&wKt(e),s=()=>r;return{getSnapshot:s,getState:s,setState:(n)=>{let o=r,i=n(o);if(Object.is(i,o))return;r=i,a?.({newState:i,oldState:o});for(let u of S)u()},subscribe:(n)=>{let o=wKt(n);return S.add(o),()=>S.delete(o)}}}",
      "variable": false
    },
    {
      "file": "chunk-f3vd025c.js",
      "name": "bco",
      "start": 26737,
      "end": 27990,
      "moduleSha256": "3581bd0ffb98fbc226ad71257a91947cbe72729107e03bc6371723ded5adc639",
      "sha256": "f79954f79b3028b45caba673c2f477421a0009623e828956b63bb41ba7e028b1",
      "source": "function bco({entries:l,responseLength:t,event:u}){if(u.type===\"start\")return l.push({id:u.id,ttftMs:u.ttftMs,firstTokenTime:Date.now(),lastTokenTime:Date.now(),responseLengthBaseline:t,endResponseLength:t}),t;let o=u.id!=null?l.find((m)=>m.id===u.id):l.findLast((m)=>m.id==null);if(!o)return t;if(u.type===\"content_block_start\")return o.thinkingTokenEstimate=0,o.thinkingBlockBaseline=t,o.sawEstimatedTokensThisBlock=!1,t;if(u.type===\"thinking_progress\"){if(o.sawEstimatedTokensThisBlock=!0,o.thinkingTokenEstimate=(o.thinkingTokenEstimate??0)+u.estimatedTokensDelta,o.outputTokens==null&&u.id==null){let m=o.thinkingBlockBaseline??o.responseLengthBaseline;return Math.max(t,m+o.thinkingTokenEstimate*4)}return t}if(u.type===\"thinking_signature\"){if(u.chars>0&&o.outputTokens==null){if(o.lastTokenTime=Date.now(),o.sawEstimatedTokensThisBlock){o.thinkingTokenEstimate=Math.max(o.thinkingTokenEstimate??0,Math.ceil(u.chars/4));let h=o.thinkingBlockBaseline??o.responseLengthBaseline,T=Math.max(t,h+o.thinkingTokenEstimate*4);return o.endResponseLength=T,T}let m=t+u.chars;return o.endResponseLength=m,m}return t}if(o.outputTokens=u.outputTokens,o.lastTokenTime=Date.now(),u.id==null)return Math.max(t,o.responseLengthBaseline+u.outputTokens*4);return t}",
      "variable": false
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "jhe",
      "start": 1207399,
      "end": 1207593,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "9d2c89e85338d13cc6a0508ac735dcada31d99038539eb4aa61c8730c6e39a01",
      "source": "function jhe(h){let v=mio(h);if(v!==void 0)return{status:\"waiting\",waitingFor:v,working:!1};return{status:h.isLoading||h.delegatedActive?\"busy\":\"idle\",waitingFor:void 0,working:h.isQueryActive}}",
      "variable": false
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "mio",
      "start": 1207593,
      "end": 1207917,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "44b0e2a0fc98393b748388cff4accf061f048deb2414a454bf722eeefc4377bc",
      "source": "function mio(h){if(h.queuedElicitation)return\"input needed\";if(h.topDialogWaitingFor!==void 0)return h.topDialogWaitingFor;if(h.pendingWorkerRequest)return\"worker request\";if(h.pendingSandboxRequest)return\"sandbox request\";if(h.isShowingLocalJSXCommand&&!h.isResponseStreaming&&!h.delegatedActive)return\"dialog open\";return}",
      "variable": false
    },
    {
      "file": "chunk-y1ndyy9p.js",
      "name": "yi",
      "start": 709,
      "end": 775,
      "moduleSha256": "5cbcdae6d0cb9e7cd6271f2375e79d7c7937b664e6786c07cdd2ec6ae569b30f",
      "sha256": "c1264e4bbd4574b112a6c46d8562b63cacbd135b45d261a53648b17a6bee6ce6",
      "source": "function yi(e){return e===\"completed\"||e===\"failed\"||e===\"killed\"}",
      "variable": false
    },
    {
      "file": "chunk-y1ndyy9p.js",
      "name": "l",
      "start": 816,
      "end": 896,
      "moduleSha256": "5cbcdae6d0cb9e7cd6271f2375e79d7c7937b664e6786c07cdd2ec6ae569b30f",
      "sha256": "951e36cb16a5c18bf2f8e522c990829a03eefd4e2590f3bea006410ea1094c01",
      "source": "l=new Set([\"local_agent\",\"remote_agent\",\"in_process_teammate\",\"local_workflow\"])",
      "variable": true
    },
    {
      "file": "chunk-y1ndyy9p.js",
      "name": "B1",
      "start": 897,
      "end": 946,
      "moduleSha256": "5cbcdae6d0cb9e7cd6271f2375e79d7c7937b664e6786c07cdd2ec6ae569b30f",
      "sha256": "81fd724a70f71877e7cfe37af3dd9f19c3121acdbd647afbdeb08a73d39e1305",
      "source": "function B1(e){return Object.values(e).some(C9n)}",
      "variable": false
    },
    {
      "file": "chunk-y1ndyy9p.js",
      "name": "C9n",
      "start": 946,
      "end": 1088,
      "moduleSha256": "5cbcdae6d0cb9e7cd6271f2375e79d7c7937b664e6786c07cdd2ec6ae569b30f",
      "sha256": "1c3ba29774c6fbc4f13a7c9c52b333eeba925d5821c9e3412b4ccd14c37f9ad3",
      "source": "function C9n(e){return l.has(e.type)&&!yi(e.status)&&!(e.type===\"in_process_teammate\"&&e.isIdle)&&!(e.type===\"remote_agent\"&&e.isLongRunning)}",
      "variable": false
    }
  ]
} as const
const originalDialogStreamRuntime287 = new Function("function WL(n){return n.open.findLast((e)=>!e.userInvoked)??null};\nfunction Hpr(n=()=>Date.now()){let e=Ls({open:[]}),i=Me(),l=new Xmr,u=Number.NEGATIVE_INFINITY,d=new Set,s=(o,t)=>`${o}:${t}`,g=(o)=>{for(let t of d)if(t.startsWith(`${o}:`))d.delete(t)},f=(o)=>{let{removed:t,closedBlockingTopBare:a}=m(e,o);if(!t)return!1;if(a)u=Date.now();return g(o),!0},r={getState:e.getState,subscribe:e.subscribe,onClosed:i.subscribe,askTally:l,open(o){if(o.countedAsk!==void 0)l.join(o.countedAsk);e.setState((t)=>{let a=o.place===\"queue\"?v(t.open,o):void 0;if(a!==void 0)return{open:[...t.open.slice(0,a),o,...t.open.slice(a)]};let c=WL(t),S=c?.holdsTop===!0&&D(c,o)&&o.succeeds!==!0;if((o.place===\"under\"||S)&&t.open.some((p)=>p.userInvoked!==!0))return{open:[o,...t.open]};let k=t.open.some((p)=>D(p,o))||o.userInvoked!==!0&&t.open.some((p)=>p.userInvoked===!0),b=o.userInvoked!==!0&&Dl(n,u),y=k||b?{...o,shownAt:Date.now()}:o;return{open:[...t.open,y]}})},update(o,t){e.setState((a)=>{let c=a.open.findIndex((k)=>k.id===o);if(c===-1)return a;let S=a.open.slice();return S[c]={...a.open[c],payload:t,shownAt:Date.now()},{open:S}})},answer(o,t){if(e.getState().open.find((a)=>a.id===o)?.countedAsk?.settle(),!f(o))return;i.emit({id:o,type:\"answered\",result:t})},dismiss(o){if(!f(o))return;i.emit({id:o,type:\"dismissed\"})},firstReveal(o,t){if(!e.getState().open.some((c)=>c.id===o))return!1;let a=s(o,t);if(d.has(a))return!1;return d.add(a),!0},hasRevealed(o,t){return d.has(s(o,t))},dismissKind(o){for(let t of e.getState().open)if(t.kind===o)r.dismiss(t.id)}};return r};\nfunction m(n,e){let i=!1,l=!1;return n.setState((u)=>{let d=u.open.find((o)=>o.id===e);if(!d)return u;i=!0;let s=u.open.filter((o)=>o!==d),g=u.open.filter((o)=>D(o,d)),f=g.at(-1)===d,r=g.at(-2);if(l=f&&!r&&d.userInvoked!==!0,!f||!r)return{open:s};return{open:s.map((o)=>o===r?{...r,shownAt:Date.now(),revealSeq:(r.revealSeq??0)+1}:o)}}),{removed:i,closedBlockingTopBare:l}};\nfunction v(n,e){let i=e.askOrder??Number.POSITIVE_INFINITY,l=n.findIndex((s)=>s.place!==void 0&&s.askOrder!==void 0&&s.askOrder<=i);if(l===-1){let s=n.findLastIndex((r)=>r.place===\"queue\"&&r.askOrder!==void 0),g=n.findLastIndex((r)=>r.place!==void 0&&r.askOrder!==void 0),f=n.slice(g+1).some((r)=>r.askOrder===void 0&&r.holdsTop!==!0&&r.userInvoked!==!0);l=s!==-1&&!f?g+1:n.findIndex((r)=>r.place===void 0&&r.askOrder!==void 0)}if(l===-1)return;let u=n.findIndex((s)=>s.place===void 0&&s.askOrder!==void 0);if(u!==-1&&u<l)l=u;return n.slice(l).some((s)=>s.userInvoked!==!0)?l:void 0};\nfunction D(n,e){return n.userInvoked===!0===(e.userInvoked===!0)};\nclass Xmr{#e=new Map;#t=0;#i=Me();subscribe=(e)=>this.#i.subscribe(e);join(e){if(e.settled||this.#e.has(e))return;this.#e.set(e,e.onSettle(()=>this.#s(e))),this.#i.emit()}positionLabel(e){if(!this.#e.has(e))return null;let i=this.#t+this.#e.size;return i<2?null:`${this.#t+1} of ${i}`}#s(e){let i=this.#e.get(e);if(i===void 0)return;i(),this.#e.delete(e),this.#t=this.#e.size===0?0:this.#t+1,this.#i.emit()}};\nvar nV=150;\nfunction Dl(e,n,t=nV){let o=e()-n;if(o>=0)return o<t;return n<=Date.now()};\nvar s=globalThis.process?.getBuiltinModule?.(\"async_hooks\");\nvar wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;\nfunction Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,\"Signal listener(s) threw\")},clear(){e.clear()}}};\nfunction Ls(t,e){let r=t,S=new Set,a=e&&wKt(e),s=()=>r;return{getSnapshot:s,getState:s,setState:(n)=>{let o=r,i=n(o);if(Object.is(i,o))return;r=i,a?.({newState:i,oldState:o});for(let u of S)u()},subscribe:(n)=>{let o=wKt(n);return S.add(o),()=>S.delete(o)}}};\nfunction bco({entries:l,responseLength:t,event:u}){if(u.type===\"start\")return l.push({id:u.id,ttftMs:u.ttftMs,firstTokenTime:Date.now(),lastTokenTime:Date.now(),responseLengthBaseline:t,endResponseLength:t}),t;let o=u.id!=null?l.find((m)=>m.id===u.id):l.findLast((m)=>m.id==null);if(!o)return t;if(u.type===\"content_block_start\")return o.thinkingTokenEstimate=0,o.thinkingBlockBaseline=t,o.sawEstimatedTokensThisBlock=!1,t;if(u.type===\"thinking_progress\"){if(o.sawEstimatedTokensThisBlock=!0,o.thinkingTokenEstimate=(o.thinkingTokenEstimate??0)+u.estimatedTokensDelta,o.outputTokens==null&&u.id==null){let m=o.thinkingBlockBaseline??o.responseLengthBaseline;return Math.max(t,m+o.thinkingTokenEstimate*4)}return t}if(u.type===\"thinking_signature\"){if(u.chars>0&&o.outputTokens==null){if(o.lastTokenTime=Date.now(),o.sawEstimatedTokensThisBlock){o.thinkingTokenEstimate=Math.max(o.thinkingTokenEstimate??0,Math.ceil(u.chars/4));let h=o.thinkingBlockBaseline??o.responseLengthBaseline,T=Math.max(t,h+o.thinkingTokenEstimate*4);return o.endResponseLength=T,T}let m=t+u.chars;return o.endResponseLength=m,m}return t}if(o.outputTokens=u.outputTokens,o.lastTokenTime=Date.now(),u.id==null)return Math.max(t,o.responseLengthBaseline+u.outputTokens*4);return t};\nfunction jhe(h){let v=mio(h);if(v!==void 0)return{status:\"waiting\",waitingFor:v,working:!1};return{status:h.isLoading||h.delegatedActive?\"busy\":\"idle\",waitingFor:void 0,working:h.isQueryActive}};\nfunction mio(h){if(h.queuedElicitation)return\"input needed\";if(h.topDialogWaitingFor!==void 0)return h.topDialogWaitingFor;if(h.pendingWorkerRequest)return\"worker request\";if(h.pendingSandboxRequest)return\"sandbox request\";if(h.isShowingLocalJSXCommand&&!h.isResponseStreaming&&!h.delegatedActive)return\"dialog open\";return};\nfunction yi(e){return e===\"completed\"||e===\"failed\"||e===\"killed\"};\nvar l=new Set([\"local_agent\",\"remote_agent\",\"in_process_teammate\",\"local_workflow\"]);\nfunction B1(e){return Object.values(e).some(C9n)};\nfunction C9n(e){return l.has(e.type)&&!yi(e.status)&&!(e.type===\"in_process_teammate\"&&e.isIdle)&&!(e.type===\"remote_agent\"&&e.isLongRunning)};\nreturn {Hpr,WL,mio,jhe,bco,B1};")() as {
 B1(tasks:Record<string,{type:string;status:string;isIdle?:boolean;isLongRunning?:boolean}>):boolean
 Hpr(clock?:()=>number): OfficialRltDialogStore287
 WL(state:OfficialRltDialogState287):OfficialRltDialog287|null
 jhe(input:OfficialRltUserWaitingInput287):{status:"waiting"|"busy"|"idle";waitingFor:string|undefined;working:boolean}
 bco(input:{entries:OfficialRltApiMetric287[];responseLength:number;event:OfficialRltApiMetricEvent287}):number
}
// END ORIGINAL_DIALOG_STREAM_RUNTIME_287



export interface OfficialRltDialogStore287 {
  getState(): OfficialRltDialogState287
  readonly askTally:{subscribe(listener:()=>void):()=>void;positionLabel(ask:OfficialRltCountedAsk287):string|null}
  subscribe(listener:()=>void):()=>void
  onClosed(listener:(event:{id:string;type:'answered'|'dismissed';result?:unknown})=>void):()=>void
  open(dialog:OfficialRltDialog287 & {id:string}):void
  update(id:string,payload:unknown):void
  answer(id:string,result:unknown):void
  dismiss(id:string):void
  dismissKind(kind:string):void
  firstReveal(id:string,phase:string):boolean
  hasRevealed(id:string,phase:string):boolean
}
export function createOfficialRltDialogStore287(clock?:()=>number):OfficialRltDialogStore287 {
  return originalDialogStreamRuntime287.Hpr(clock)
}

/** Dialog payload is the actual UI state owner, not a second queue/cache. */
export function useOfficialRltDialogState287<T>(
  dialogStore:OfficialRltDialogStore287,
  id:string,
  kind:string,
  inactive:T,
  active:(value:T)=>boolean,
  userInvoked=false,
  initial:T|(()=>T)=inactive,
):[T,(action:T|((previous:T)=>T))=>void] {
  const activeRef = useRef(active)
  activeRef.current = active
  const [empty] = useState(inactive)
  const [initialized] = useState(()=>{
    const first=typeof initial==='function' ? (initial as ()=>T)() : initial
    if(active(first)) dialogStore.open({id,kind,payload:first,userInvoked})
    return true
  })
  void initialized
  const getSnapshot=useCallback(()=>{
    const dialog=dialogStore.getState().open.find(row=>row.id===id)
    return dialog ? dialog.payload as T : empty
  },[dialogStore,id,empty])
  const value=useSyncExternalStore(dialogStore.subscribe,getSnapshot,getSnapshot)
  const setter=useCallback((action:T|((previous:T)=>T))=>{
    const dialog=dialogStore.getState().open.find(row=>row.id===id)
    const previous=dialog ? dialog.payload as T : empty
    const next=typeof action==='function' ? (action as (previous:T)=>T)(previous) : action
    if(Object.is(previous,next))return
    if(!activeRef.current(next))dialogStore.dismiss(id)
    else if(dialog)dialogStore.update(id,next)
    else dialogStore.open({id,kind,payload:next,userInvoked})
  },[dialogStore,id,kind,empty,userInvoked])
  return [value,setter]
}

export type OfficialRltRecommendationRunner287 = (key: 'lsp' | 'hint', task: () => Promise<void>) => void;

// Complete Ibe, chunk-f2cpzzp9.js [1530728,1530980), SHA256
// 259194151b2d69a2ca2749e2d9d9b670385568f26ab4590fb1b79bc568b2a157.
// The original keyed pending-work map is not recommendation state/cache.
const originalRecommendationRunner287 = new Function('A', 'ce', 'Ft', 'am', 'd',
  "function Ibe(){let h=A(!1),v=A(new Map),D=ce((N,X)=>{if(Ft()||am())return;if(h.current){v.current.set(N,X);return}h.current=!0,X().catch(d).finally(()=>{h.current=!1;let[Se]=v.current;if(Se){let[_e,Pe]=Se;v.current.delete(_e),D(_e,Pe)}})},[]);return D};return Ibe;"
) as (
  ref: typeof useRef, callback: typeof useCallback,
  remote: () => boolean, unavailable: () => boolean, error: (value: unknown) => void,
) => () => OfficialRltRecommendationRunner287;

export function useOfficialRltRecommendationRunner287(
  isRemote: () => boolean, isUnavailable: () => boolean, onError: (error: unknown) => void,
): OfficialRltRecommendationRunner287 {
  const ports = useRef({ isRemote, isUnavailable, onError });
  ports.current = { isRemote, isUnavailable, onError };
  return originalRecommendationRunner287(useRef, useCallback,
    () => ports.current.isRemote(), () => ports.current.isUnavailable(),
    error => ports.current.onError(error),
  )();
}


// BEGIN ORIGINAL_TYPED_DIALOG_REQUEST_287
export interface OfficialRltCountedAsk287 {
 readonly settled:boolean;settle():void;settleWhen(promise:Promise<unknown>):void;onSettle(listener:()=>void):()=>void;
}
export interface OfficialRltRequestOptions287 {
 signal?:AbortSignal;place?:'under'|'queue';askOrder?:number;armInputGrace?:boolean;succeeds?:boolean;
 onFirstReveal?:()=>void;onClaimed?:()=>void;countedAsk?:OfficialRltCountedAsk287;
}
export interface OfficialRltRequestHost287 {
 subscribe(listener:(request:OfficialRltDialog287&{id:string})=>void):()=>void;
 onCancel(listener:(id:string)=>void):()=>void;
 onUpdate(listener:(value:{id:string;payload:unknown})=>void):()=>void;
 reply(value:{id:string;result?:unknown;cancelled?:boolean}):void;
 request(input:Pick<OfficialRltDialog287,'kind'|'payload'|'userInvoked'|'hideWhile'|'holdsTop'>,options?:OfficialRltRequestOptions287):{
 id:string;replied:Promise<{id:string;result?:unknown;cancelled?:boolean}>;update(payload:unknown):void;
 };
}
// Full Vxe/D/T/Ho/Bb/Hb/uge and full UE subscription closure. Pending replies
// are original transport state; only the existing Hpr owns dialog payload/order.
const originalTypedDialogRequest287 = new Function('u','o','B','t','Qh',"class i{resetters=[];built=[];lazy(e){let t,r=()=>{t=void 0};return this.resetters.push(r),()=>{if(t===void 0)t=e(),this.built.push(r);return t}}builtCount(){return this.built.length}releaseBuiltSince(e){for(let t of this.built.splice(e))t()}reset(){for(let e of this.resetters)e();this.built.length=0}};\nvar _rr=new i;\nfunction f(e){return _rr.lazy(e)};\nvar s=globalThis.process?.getBuiltinModule?.(\"async_hooks\");\nvar wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;\nfunction Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,\"Signal listener(s) threw\")},clear(){e.clear()}}};\n\n\nfunction Vxe(){let h=Me(),v=Me(),D=Me(),N=new Map,X=0,Se=0;return{subscribe(_e){Se+=1;let Pe=h.subscribe(_e),Ie=!1;return()=>{if(Ie)return;Ie=!0,Se-=1,Pe()}},onCancel:v.subscribe,onUpdate:D.subscribe,reply(_e){let Pe=N.get(_e.id);if(!Pe)return;N.delete(_e.id),Pe(_e)},request({kind:_e,payload:Pe,userInvoked:Ie,hideWhile:Oe,holdsTop:Ne},Ve){X+=1;let qe=`dialog-${X}`,{promise:ze,resolve:pt}=Promise.withResolvers(),St=Ve?.signal;if(St?.aborted||Se===0)return queueMicrotask(()=>pt({id:qe,cancelled:!0})),{id:qe,replied:ze,update:()=>{}};let ht;if(N.set(qe,(yt)=>{if(St&&ht)St.removeEventListener(\"abort\",ht);pt(yt)}),St)ht=()=>{if(N.delete(qe))pt({id:qe,cancelled:!0}),v.emit(qe)},St.addEventListener(\"abort\",ht,{once:!0});return h.emit({id:qe,kind:_e,payload:Pe,place:Ve?.place,askOrder:Ve?.askOrder,shownAt:Ve?.armInputGrace?Date.now():void 0,succeeds:Ve?.succeeds,userInvoked:Ie,hideWhile:Oe,holdsTop:Ne,onFirstReveal:Ve?.onFirstReveal,onClaimed:Ve?.onClaimed,countedAsk:Ve?.countedAsk}),{id:qe,replied:ze,update:(yt)=>{if(N.has(qe))D.emit({id:qe,payload:yt})}}}}};\nasync function D(e,t,o,n){let i=t.payload().safeParse(o);if(!i.success)return t.default;let a;try{let{replied:r}=e.request({kind:t.kind,payload:i.data,userInvoked:t.userInvoked,hideWhile:t.hideWhile,holdsTop:t.holdsTop},n);a=await r}catch{return t.default}if(\"cancelled\"in a)return t.default;let l=t.result().safeParse(a.result);return l.success?l.data:t.default};\nasync function T(e,t,o,n){let i=o[Symbol.asyncIterator](),a=await i.next();if(a.done)return t.default;let l=t.payload().safeParse(a.value);if(!l.success)return i.return?.(void 0),t.default;let r=new AbortController,s=()=>r.abort();if(n?.signal)if(n.signal.aborted)r.abort();else n.signal.addEventListener(\"abort\",s,{once:!0});let{replied:P,update:m}=e.request({kind:t.kind,payload:l.data,userInvoked:t.userInvoked,hideWhile:t.hideWhile,holdsTop:t.holdsTop},{signal:r.signal,place:n?.place,askOrder:n?.askOrder,armInputGrace:n?.armInputGrace,succeeds:n?.succeeds,onFirstReveal:n?.onFirstReveal,onClaimed:n?.onClaimed,countedAsk:n?.countedAsk}),p;(async()=>{try{while(!r.signal.aborted){let d=await i.next();if(d.done)return;if(r.signal.aborted)return;let c=t.payload().safeParse(d.value);if(!c.success)continue;m(c.data)}}catch(d){p=d,r.abort()}})().catch(()=>{});let u;try{u=await P}finally{n?.signal?.removeEventListener(\"abort\",s),i.return?.(void 0)}if(p!==void 0)throw p;if(\"cancelled\"in u)return t.default;let y=t.result().safeParse(u.result);return y.success?y.data:t.default};\nfunction Ho({hideWhile:e=h,...t}){return{...t,hideWhile:e}};\nvar h=[\"panel\"];\nvar Bb=Ho({kind:\"lsp_recommendation\",payload:f(()=>u({pluginName:o(),pluginDescription:o().optional(),marketplaceName:o(),fileExtension:o()})),result:f(()=>B([\"yes\",\"no\",\"timeout\",\"never\",\"disable\",\"cancelled\"])),default:\"cancelled\",hideWhile:[\"panel\",\"draft\"]});\nvar Hb=Ho({kind:\"plugin_hint\",payload:f(()=>u({pluginName:o(),pluginDescription:o().optional(),marketplaceName:o(),sourceCommand:o()})),result:f(()=>B([\"yes\",\"no\",\"disable\",\"cancelled\"])),default:\"cancelled\",hideWhile:[\"panel\",\"draft\"]});\nclass uge{#e=!1;#t=Me();get settled(){return this.#e}settle(){if(this.#e)return;this.#e=!0;try{this.#t.emit()}catch(e){t(`CountedAsk: a listener threw while the request settled: ${String(e)}`,{level:\"error\"})}this.#t.clear()}settleWhen(e){e.then(()=>this.settle(),()=>this.settle())}onSettle(e){return this.#t.subscribe(e)}};var Vbe=Ho({kind:\"permission_prompt\",payload:f(()=>Qh((e)=>typeof e===\"object\"&&e!==null&&(\"requestId\"in e)&&(\"toolName\"in e)&&(\"permissionResult\"in e))),result:f(()=>Qh((e)=>typeof e===\"object\"&&e!==null&&(\"behavior\"in e))),default:{behavior:\"cancelled\"}});var gae=Ho({kind:\"permission_ask_user_question\",payload:f(()=>Qh((e)=>typeof e===\"object\"&&e!==null&&(\"requestId\"in e)&&(\"toolName\"in e)&&(\"permissionResult\"in e)&&(\"questions\"in e))),result:f(()=>Qh((e)=>typeof e===\"object\"&&e!==null&&(\"behavior\"in e))),default:{behavior:\"cancelled\"}});var ZDe=Ho({kind:\"permission_file\",payload:f(()=>Qh((e)=>typeof e===\"object\"&&e!==null&&(\"requestId\"in e)&&(\"toolName\"in e)&&(\"permissionResult\"in e)&&(\"filePath\"in e)&&(\"operationType\"in e))),result:f(()=>Qh((e)=>typeof e===\"object\"&&e!==null&&(\"behavior\"in e))),default:{behavior:\"cancelled\"}});return {Vxe,D,T,Bb,Hb,uge,Vbe,gae,ZDe};")(z.object,z.string,z.enum,logError,z.custom) as {
 Vxe():OfficialRltRequestHost287;
 D<Result=string>(host:OfficialRltRequestHost287,spec:unknown,payload:unknown,options?:OfficialRltRequestOptions287):Promise<Result>;
 T(host:OfficialRltRequestHost287,spec:unknown,payload:AsyncIterable<unknown>,options?:OfficialRltRequestOptions287):Promise<string>;
 Bb:unknown;Hb:unknown;Vbe:unknown;gae:unknown;ZDe:unknown;uge:new()=>OfficialRltCountedAsk287;
};
export const officialPermissionDialogSpecs287={Vbe:originalTypedDialogRequest287.Vbe,gae:originalTypedDialogRequest287.gae,ZDe:originalTypedDialogRequest287.ZDe};
export const createOfficialRltRequestHost287=originalTypedDialogRequest287.Vxe;
/** Typed view of the same complete D, including structured public dialog replies. */
export function requestOfficialRltDialog287<Result>(host:OfficialRltRequestHost287,spec:{default:Result},payload:unknown,options?:OfficialRltRequestOptions287):Promise<Result>{
 return originalTypedDialogRequest287.D<Result>(host,spec,payload,options);
}
export const officialRltCountedAskConstructor287=originalTypedDialogRequest287.uge;
export const createOfficialRltCountedAsk287=()=>new originalTypedDialogRequest287.uge();
export const connectOfficialRltRequests287 = new Function('h','v',"return (()=>{if(!h){return}let Se=new Set;let Pe=h.subscribe((_e)=>{Se.add(_e.id),v.open(_e)});let Oe=h.onCancel((Ie)=>{v.dismiss(Ie)});let ze=h.onUpdate((Ne)=>{let{id:Ve,payload:qe}=Ne;if(Se.has(Ve))v.update(Ve,qe)});let St=v.onClosed((pt)=>{if(!Se.delete(pt.id)){return}h.reply(pt.type===\"answered\"?{id:pt.id,result:pt.result}:{id:pt.id,cancelled:!0})});return()=>{Pe(),Oe(),ze(),St();for(const ht of Se)v.dismiss(ht),h.reply({id:ht,cancelled:!0});Se.clear()}})();") as (host:OfficialRltRequestHost287,store:OfficialRltDialogStore287)=>()=>void;
export function useOfficialRltRequestHost287(store:OfficialRltDialogStore287):OfficialRltRequestHost287 {
 const [host]=useState(createOfficialRltRequestHost287);
 useEffect(()=>connectOfficialRltRequests287(host,store),[host,store]);
 return host;
}
export function requestOfficialRltRecommendation287(host:OfficialRltRequestHost287,kind:'lsp_recommendation'|'plugin_hint',payload:unknown|AsyncIterable<unknown>,options?:OfficialRltRequestOptions287):Promise<string> {
 const spec=kind==='lsp_recommendation'?originalTypedDialogRequest287.Bb:originalTypedDialogRequest287.Hb;
 return payload!==null&&typeof payload==='object'&&Symbol.asyncIterator in payload
  ?originalTypedDialogRequest287.T(host,spec,payload as AsyncIterable<unknown>,options)
  :originalTypedDialogRequest287.D(host,spec,payload,options);
}
export type OfficialRltPermissionAnswer287={behavior:'allow';updatedInput:Record<string,unknown>;permissionUpdates?:readonly unknown[];feedback?:string;contentBlocks?:readonly unknown[]}|{behavior:'deny'|'cancelled';feedback?:string;contentBlocks?:readonly unknown[]};
export function requestOfficialRltPermission287(host:OfficialRltRequestHost287,kind:'permission_prompt'|'permission_ask_user_question'|'permission_file',payload:unknown,options?:OfficialRltRequestOptions287):Promise<OfficialRltPermissionAnswer287>{
 const spec=kind==='permission_ask_user_question'?originalTypedDialogRequest287.gae:kind==='permission_file'?originalTypedDialogRequest287.ZDe:originalTypedDialogRequest287.Vbe;
 return (payload!==null&&typeof payload==='object'&&Symbol.asyncIterator in payload?originalTypedDialogRequest287.T(host,spec,payload as AsyncIterable<unknown>,options):originalTypedDialogRequest287.D(host,spec,payload,options)) as unknown as Promise<OfficialRltPermissionAnswer287>;
}
// END ORIGINAL_TYPED_DIALOG_REQUEST_287

/** A lane selects a schema/kind, never an identity. Every request gets the
 * original Vxe dialog-N id; only Hpr stores validated public payloads. */
export function useOfficialRltRecommendation287<T>(store:OfficialRltDialogStore287,kind:'lsp_recommendation'|'plugin_hint',host:OfficialRltRequestHost287) {
 const getSnapshot=useCallback(()=>store.getState().open.findLast(row=>row.kind===kind)??null,[store,kind]);
 const request=useSyncExternalStore(store.subscribe,getSnapshot,getSnapshot);
 const recommendation=request?request.payload as T:null;
 const setRecommendation=useCallback((payload:T)=>requestOfficialRltRecommendation287(host,kind,payload,{place:'under'}),[host,kind]);
 const closeRecommendation=useCallback((response?:string,expected?:T)=>{
  const row=getSnapshot();if(!row?.id||(expected!==undefined&&!Object.is(row.payload,expected)))return false;
  if(response===undefined)store.dismiss(row.id);else store.answer(row.id,response);return true;
 },[store,getSnapshot]);
 return {request,recommendation,setRecommendation,closeRecommendation};
}

/** External AppState/hook producers own payloads; Hpr alone owns open ordering. */
export function syncOfficialRltDialog287(store:OfficialRltDialogStore287,id:string,kind:string,payload:unknown,active:boolean,userInvoked=false):void {
  const previous=store.getState().open.find(row=>row.id===id)
  if(!active){if(previous)store.dismiss(id);return}
  if(!previous)store.open({id,kind,payload,userInvoked})
  else if(previous.kind!==kind||previous.userInvoked!==userInvoked){store.dismiss(id);store.open({id,kind,payload,userInvoked})}
  else if(!Object.is(previous.payload,payload))store.update(id,payload)
}

export interface OfficialRltUserWaitingInput287 {
  topDialogWaitingFor:string|undefined
  queuedElicitation:boolean
  pendingWorkerRequest:boolean
  pendingSandboxRequest:boolean
  isShowingLocalJSXCommand:boolean
  isResponseStreaming:boolean
  isLoading:boolean
  isQueryActive:boolean
  delegatedActive:boolean
}
export const officialRltWaitingKindEvidence287 = {
  "table": {
    "it2_setup": "input needed",
    "cost_threshold": "dialog open",
    "auto_mode_server_fallback": "dialog open",
    "resume_return": "dialog open",
    "cold_resume_quota": "dialog open",
    "newer_model_offer": "dialog open",
    "managed_settings_security": "dialog open",
    "ide_onboarding": "dialog open",
    "sandbox_network_access": "sandbox request",
    "left_arrow_confirm": "dialog open",
    "remote_callout": "dialog open",
    "ultraplan_launch": "dialog open",
    "ultraplan_choice": "dialog open",
    "lsp_recommendation": "dialog open",
    "plugin_hint": "dialog open",
    "auto_default_nudge": "dialog open",
    "effort_medium_nudge": "dialog open",
    "fullscreen_upsell": "dialog open",
    "mcp_elicitation": "input needed",
    "mcp_elicitation_waiting": "input needed",
    "mcp_url_elicitation": "input needed",
    "permission_ask_user_question": "input needed",
    "goal_proposal": "goal proposal",
    "refusal_fallback_prompt": "dialog open",
    "fable_overage_consent_prompt": "dialog open"
  },
  "ignored": [
    "lsp_recommendation",
    "plugin_hint",
    "left_arrow_confirm",
    "goal_proposal",
    "remote_callout",
    "ultraplan_choice",
    "cost_threshold",
    "resume_return",
    "cold_resume_quota",
    "newer_model_offer",
    "ide_onboarding",
    "fullscreen_upsell",
    "effort_medium_nudge"
  ],
  "rows": [
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "Zf",
      "start": 1178246,
      "end": 1181475,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "85864277aebfeb251e6e38fbe08209c31ca22fa861eb07fed0916f241a650803",
      "source": "Zf={[Um.kind]:{layout:(h,v)=>v===\"fullscreen\"?\"modal\":xhe(h)?.immediate?\"bottom\":\"inline\"},[Urt.kind]:{waitingFor:\"input needed\",needs:\"choose: install the iTerm2 integration or use tmux\",notification:{text:\"Teammate setup needs your input\",type:\"agent_needs_input\"}},[yit.kind]:{needs:\"choose: allow or deny the computer-use action\",notification:Qh},[BR.kind]:{waitingFor:\"dialog open\"},[XNe.kind]:{waitingFor:\"dialog open\",needs:\"acknowledge the classifier billing notice (Enter continues in auto mode)\",notification:{text:\"Auto mode has a classifier billing notice to acknowledge\",type:\"agent_needs_input\"},layout:\"bottom\"},[CT.kind]:{waitingFor:\"dialog open\"},[STe]:{waitingFor:\"dialog open\"},[bTe]:{waitingFor:\"dialog open\"},[gT.kind]:{waitingFor:\"dialog open\",notification:{text:\"Managed settings need your review before they apply\"}},[Fb.kind]:{waitingFor:\"dialog open\"},[Ny.kind]:{waitingFor:\"sandbox request\",notification:{text:\"A sandboxed command needs network access\"}},[nw.kind]:{waitingFor:\"dialog open\"},[m4.kind]:{waitingFor:\"dialog open\"},[QMt.kind]:{waitingFor:\"dialog open\",needs:\"choose: run ultraplan in the cloud\"},[tke.kind]:{waitingFor:\"dialog open\",layout:\"modal\"},[Bb.kind]:{waitingFor:\"dialog open\"},[Hb.kind]:{waitingFor:\"dialog open\"},[rct]:{waitingFor:\"dialog open\",needs:\"choose: make auto mode the default permission mode\"},[YNe]:{waitingFor:\"dialog open\"},[ZO.kind]:{waitingFor:\"dialog open\"},...Vro,...Kro,...Gro,[KX.kind]:{waitingFor:\"input needed\",notification:(h)=>({text:x4e,type:Yro(h)?\"elicitation_url_dialog\":\"elicitation_dialog\"}),layout:\"bottom\"},[xte.kind]:{waitingFor:\"input needed\",notification:(h)=>Jro(h)?{text:x4e,type:\"elicitation_url_dialog\"}:void 0,layout:\"bottom\"},[WX.kind]:{waitingFor:\"input needed\",needs:\"MCP input: open link\",notification:{text:\"An MCP server needs your input\",type:\"elicitation_url_dialog\"},layout:\"bottom\"},[Vbe.kind]:{notification:Qh},[qTt.kind]:{notification:Qh},[VTt.kind]:{notification:Qh},[zTt.kind]:{notification:Qh},[ZDe.kind]:{notification:Qh},[gae.kind]:{waitingFor:\"input needed\",notification:Qh},[jTt.kind]:{notification:{text:\"Claude Code wants to enter plan mode\"}},[CX.kind]:{waitingFor:\"goal proposal\",notification:{text:\"Claude proposed a session goal\"}},[WTt.kind]:{notification:{text:\"Claude Code needs your approval for the plan\"},layout:\"modal\"},[GTt.kind]:{notification:Qh},[Kze.kind]:{notification:Qh},[iH.kind]:{waitingFor:\"dialog open\",needs:\"choose: retry on fallback model or edit prompt\",notification:{text:\"Session paused\"}},[Zhe.kind]:{waitingFor:\"dialog open\",needs:\"choose: continue on usage credits or switch models\",notification:{text:\"Session paused\"}},[BTt.kind]:{notification:Qh},[Fy.kind]:{notification:{text:\"A message from another session needs your approval\"}},[Evt.kind]:{notification:{text:\"Claude wants to use your browser\"}},[vvt.kind]:{notification:{text:\"Setting up Claude in Chrome\"}},...{},...T4e&&{[T4e.kind]:{notification:{text:\"Claude needs your approval for a review artifact\"}}},...{},...{},[$ro.kind]:{notification:Qh},...Qro,[FEt.kind]:{notification:{text:\"Auto-mode setup proposal is ready for review\"}},[$Et.kind]:{notification:{text:\"Auto-mode setup flagged some permission rules for review\"}}}"
    },
    {
      "file": "chunk-s8kwnk8w.js",
      "name": "Urt",
      "start": 762,
      "end": 900,
      "moduleSha256": "a762eabc2f53c47e5d854c57c74613068ef1a0e25fdfff02714e94606e596b29",
      "sha256": "cd3a0d298a34c998eb168f354e9da6eede3144df071bf7fbde880dc490b1bc0b",
      "source": "Urt=Ho({kind:\"it2_setup\",payload:f(()=>u({tmuxAvailable:H()})),result:f(()=>B([\"installed\",\"use-tmux\",\"cancelled\"])),default:\"cancelled\"})"
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "BR",
      "start": 1135807,
      "end": 1135911,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "aad5c7066d5d0b696037c9e3f6fe32efd8eb87c2da74f249078e5672597050eb",
      "source": "BR=Ho({kind:zHt,payload:f(()=>u({})),result:f(()=>B([\"acknowledged\",\"cancelled\"])),default:\"cancelled\"})"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "zHt",
      "start": 2554832,
      "end": 2554852,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "c9025762bd003bde97ab1888552925d82afcd666557990daea967c79448f4c9a",
      "source": "zHt=\"cost_threshold\""
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "XNe",
      "start": 2555003,
      "end": 2555182,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "1b4f42e424de98796e663a5fe8c04973e4ba5e9337f545ca3718436b39d01325",
      "source": "XNe=Ho({kind:Din,payload:f(()=>u({gatewayHost:o().optional(),title:o(),paragraphs:T(o()),helpUrl:o()})),result:f(()=>B([\"continue\",\"interrupt\",\"cancelled\"])),default:\"cancelled\"})"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "Din",
      "start": 2554853,
      "end": 2554884,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "4c05e44ead5dc2159bc672fb43f19239ca017a21200cab06f489d94f68c90830",
      "source": "Din=\"auto_mode_server_fallback\""
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "CT",
      "start": 274365,
      "end": 274573,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "dd17850c5f24f9bbfbd426bbdb56d89d13d7b1554771de3010f75df65ad462c7",
      "source": "CT=Ho({kind:VHt,payload:f(()=>u({sessionAgeMinutes:C(),estimatedTokens:C(),hasPrecomputedSummary:H()})),result:f(()=>B([\"compact\",\"continue\",\"dismiss\",\"never\",\"cancelled\"])),default:\"cancelled\",hideWhile:[]})"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "VHt",
      "start": 2554885,
      "end": 2554904,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "ef7771cb155ad67434883088fea54f9a3f4d587de11dce4b6fda1218eedb1267",
      "source": "VHt=\"resume_return\""
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "STe",
      "start": 2554905,
      "end": 2554928,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "0d6afa56ac61124bc6e58e111d73da712862c74f279f3f25e66956bd7b614927",
      "source": "STe=\"cold_resume_quota\""
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "bTe",
      "start": 2554929,
      "end": 2554952,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "fced748d48ba017a614aca5078a60d82c37a374b2cc686836d6a92d4a33023f9",
      "source": "bTe=\"newer_model_offer\""
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "gT",
      "start": 143021,
      "end": 143325,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "1ee5917a3d98510902d02c0be20b458e5b880dce9f9417b75b5e90bd25862bd3",
      "source": "gT=Ho({kind:\"managed_settings_security\",payload:f(()=>u({settings:Id((h)=>typeof h===\"object\"&&h!==null),baseline:Id((h)=>h===null||typeof h===\"object\"),reveal:B([\"login_handoff\",\"default\"])})),result:f(()=>B([\"approved\",\"rejected\",\"deferred_no_consent_surface\"])),default:\"deferred_no_consent_surface\"})"
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "Fb",
      "start": 75737,
      "end": 75919,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "1306a75bd462759b0bd796604569bca088c703c64d81aacc33ff8bca18c34a86",
      "source": "Fb=Ho({kind:\"ide_onboarding\",payload:f(()=>u({installationStatus:Id((h)=>typeof h===\"object\"&&h!==null).nullable()})),result:f(()=>B([\"dismissed\",\"cancelled\"])),default:\"cancelled\"})"
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "Ny",
      "start": 146700,
      "end": 146970,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "8a25e98492160e85402fc9142e863cf0c502c94be7ddc6ddd9149c75ba2aa4e7",
      "source": "Ny=Ho({kind:\"sandbox_network_access\",payload:f(()=>u({host:o(),port:C().optional(),forwardedFromWorker:x(!0).optional(),workerName:o().optional()})),result:f(()=>Fe([u({allow:H(),persistToSettings:H(),persistRow:Fso().optional()}),x(\"cancelled\")])),default:\"cancelled\"})"
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "nw",
      "start": 75924,
      "end": 76166,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "96cf6d381395fffa6e4efd4b29fe38b34a00a1aa88b6b999311bfda39d2cd232",
      "source": "nw=Ho({kind:\"left_arrow_confirm\",payload:f(()=>u({summary:o(),carryOverCount:C(),monitorParkCount:C(),workflowAgents:u({running:C(),finished:C(),rerun:C()})})),result:f(()=>B([\"confirm\",\"stay\",\"cancelled\"])),default:\"cancelled\",hideWhile:[]})"
    },
    {
      "file": "chunk-mm3w0met.js",
      "name": "m4",
      "start": 760,
      "end": 909,
      "moduleSha256": "41728ae21752ea9f1ecf3a7a3b22dda51041d7111eb6592a9f9900463066763e",
      "sha256": "6b3f41492e07342809618c6ee1913c46a5df7de1caa54245faabf1a549201c55",
      "source": "m4=Ho({kind:\"remote_callout\",payload:f(()=>u({})),result:f(()=>B([\"enable\",\"dismiss\",\"cancelled\"])),default:\"cancelled\",hideWhile:[\"panel\",\"draft\"]})"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "QMt",
      "start": 2849979,
      "end": 2850168,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "7fb65ff617231dd24981e8bc89ce12c157d746f5b5f9ef52bed2ae03f320c996",
      "source": "QMt=Ho({kind:\"ultraplan_launch\",payload:f(()=>u({promptIdentifier:B(a4t),showTerms:H(),prompt:o(),deliveredByRelay:H()})),result:f(()=>B([\"run\",\"cancel\",\"cancelled\"])),default:\"cancelled\"})"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "tke",
      "start": 2847006,
      "end": 2847156,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "79d46688d77062da26026b894a60bd5206efa795c0a4c41a7ddc984dd7d478b7",
      "source": "tke=Ho({kind:uWn,payload:f(()=>u({plan:o()})),result:f(()=>B([\"here\",\"fresh\",\"cancel\",\"cancelled\"])),default:\"cancelled\",hideWhile:[\"panel\",\"draft\"]})"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "uWn",
      "start": 2554809,
      "end": 2554831,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "a0dabb410367e42e3a66585deaadf2741b958548cf0ace566fb5b289320b7536",
      "source": "uWn=\"ultraplan_choice\""
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "Bb",
      "start": 76171,
      "end": 76429,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "4b970e434942980a4d04238a95e896504a445dfcdf99716867e82395c30c3dd0",
      "source": "Bb=Ho({kind:\"lsp_recommendation\",payload:f(()=>u({pluginName:o(),pluginDescription:o().optional(),marketplaceName:o(),fileExtension:o()})),result:f(()=>B([\"yes\",\"no\",\"timeout\",\"never\",\"disable\",\"cancelled\"])),default:\"cancelled\",hideWhile:[\"panel\",\"draft\"]})"
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "Hb",
      "start": 76430,
      "end": 76663,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "fa31530bb11e8b43681e61fbc9cac53114560756a8f2189dfe891d739a1f5dba",
      "source": "Hb=Ho({kind:\"plugin_hint\",payload:f(()=>u({pluginName:o(),pluginDescription:o().optional(),marketplaceName:o(),sourceCommand:o()})),result:f(()=>B([\"yes\",\"no\",\"disable\",\"cancelled\"])),default:\"cancelled\",hideWhile:[\"panel\",\"draft\"]})"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "rct",
      "start": 2554784,
      "end": 2554808,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "4df0123b7ef7718d59c620932f28368cf50db16ca063886d4d2b5a129212b652",
      "source": "rct=\"auto_default_nudge\""
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "YNe",
      "start": 2554758,
      "end": 2554783,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "cc11aa00bc38b0efd5626b600986611d2242b9f72c08aa960d989c691ea801db",
      "source": "YNe=\"effort_medium_nudge\""
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "ZO",
      "start": 141482,
      "end": 141590,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "7b2c2d380038cabc0e8410cd3ae71f28f4f22d12064c544298a712b19d8aafea",
      "source": "ZO=Ho({kind:pWn,payload:f(()=>u({})),result:f(()=>B([\"accept\",\"dismiss\",\"cancelled\"])),default:\"cancelled\"})"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "pWn",
      "start": 2554953,
      "end": 2554976,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "1c51f3122f1746237342ec8a6ccee2c96fcedea479655599d0d14ef28ea7a4f7",
      "source": "pWn=\"fullscreen_upsell\""
    },
    {
      "file": "chunk-v04h2gjw.js",
      "name": "KX",
      "start": 761,
      "end": 973,
      "moduleSha256": "ff593d2fac590fecbf6eb7c06eb61c5623e4b5e7f2aefa807952f5038b0a67f6",
      "sha256": "28be14a1680e7aeaacb9fb3272ad54dbd695f22f6374a282357bfab55631960a",
      "source": "KX=Ho({kind:\"mcp_elicitation\",payload:f(()=>Id((t)=>typeof t===\"object\"&&t!==null&&(\"serverName\"in t)&&(\"params\"in t))),result:f(()=>Id((t)=>typeof t===\"object\"&&t!==null)),default:{action:\"cancel\"},holdsTop:!0})"
    },
    {
      "file": "chunk-v04h2gjw.js",
      "name": "xte",
      "start": 974,
      "end": 1182,
      "moduleSha256": "ff593d2fac590fecbf6eb7c06eb61c5623e4b5e7f2aefa807952f5038b0a67f6",
      "sha256": "ac8348d29d7eb528f1f8444e998bcc099ccf7c7929127e4f1182aa2d3d8f17c9",
      "source": "xte=Ho({kind:\"mcp_elicitation_waiting\",payload:f(()=>Id((t)=>typeof t===\"object\"&&t!==null&&(\"serverName\"in t)&&(\"params\"in t))),result:f(()=>B([\"dismiss\",\"retry\",\"cancel\",\"cancelled\"])),default:\"cancelled\"})"
    },
    {
      "file": "chunk-43v15e84.js",
      "name": "WX",
      "start": 857,
      "end": 1061,
      "moduleSha256": "9bb8e853ee11fb316b1937de68839ef36dc74e5c536d1ca10dde269c21877f04",
      "sha256": "50463747c02109697c72986fad5dec376b8b1c706d416204a01f992cd58adb70",
      "source": "WX=Ho({kind:\"mcp_url_elicitation\",payload:f(()=>Id((e)=>typeof e===\"object\"&&e!==null&&(\"serverName\"in e)&&(\"params\"in e))),result:f(()=>Id((e)=>typeof e===\"object\"&&e!==null)),default:{action:\"cancel\"}})"
    },
    {
      "file": "chunk-wsccbnna.js",
      "name": "gae",
      "start": 4732,
      "end": 5015,
      "moduleSha256": "1b95d6dd7a9ae42fda5d73ca209ff27a0b1aa13d854e3a9f4d6a20f6f4f09a7c",
      "sha256": "43be6a56799129a986294bc8bd3685ee3842054b35bde6093f0b05729e5e21a6",
      "source": "gae=Ho({kind:\"permission_ask_user_question\",payload:f(()=>Qh((e)=>typeof e===\"object\"&&e!==null&&(\"requestId\"in e)&&(\"toolName\"in e)&&(\"permissionResult\"in e)&&(\"questions\"in e))),result:f(()=>Qh((e)=>typeof e===\"object\"&&e!==null&&(\"behavior\"in e))),default:{behavior:\"cancelled\"}})"
    },
    {
      "file": "chunk-vpchszge.js",
      "name": "CX",
      "start": 762,
      "end": 903,
      "moduleSha256": "8edbc24ee82e239bbdaa146d9d83671eb03033550a4c1ddd1eff85b965f6d807",
      "sha256": "6276e7cc2e0c67897f478cc106300988baa1c3ee96b569248c88c9e478affc2c",
      "source": "CX=Ho({kind:\"goal_proposal\",payload:f(()=>u({condition:o()})),result:f(()=>u({approved:H(),explicit:H().optional()})),default:{approved:!1}})"
    },
    {
      "file": "chunk-09m4fzsj.js",
      "name": "iH",
      "start": 574120,
      "end": 574682,
      "moduleSha256": "b7e3a951949d16458b1df3b61fb11e679d85661777cbae88952799458b3f956f",
      "sha256": "dadb10ff8ebebdf7f8a9564a5f73dd8e456c8949e5ef20b688d74d5fae700999",
      "source": "iH=Ho({kind:\"refusal_fallback_prompt\",payload:f(()=>u({originalModel:o(),fallbackModel:o(),apiRefusalCategory:o().nullable().optional(),guidanceText:o().optional(),retractedMessageUuids:T(o()).optional().describe(\"Wire uuids of the already-streamed messages this refusal concerns. Evict on RESOLUTION (your own response \\u2014 any choice \\u2014 or control_cancel_request retirement), never on receipt; a turn torn down mid-dialog keeps the partials. Eviction is idempotent.\")})),result:f(()=>B([\"retry_fallback\",\"edit_prompt\",\"cancelled\"])),default:\"cancelled\"})"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "Zhe",
      "start": 1089196,
      "end": 1089462,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "7509dda34a8ead9c53ed9143663dc2eba0bd60140aadb5e7cf33ea00b627df02",
      "source": "Zhe=Ho({kind:\"fable_overage_consent_prompt\",payload:f(()=>u({overagesEnabled:H(),modelName:Id(rIe).optional(),balanceCents:C().nullable().optional(),currency:o().nullable().optional()})),result:f(()=>B([\"consent\",\"switch_default\",\"cancelled\"])),default:\"cancelled\"})"
    },
    {
      "file": "chunk-f2cpzzp9.js",
      "name": "JP",
      "start": 76668,
      "end": 76803,
      "moduleSha256": "ecf059605929abc2d38c30fc6d3b5b0b69ef05c9d344e934443f320a48256dae",
      "sha256": "613596a01453d3946afca4c363df99bfd871f6358a8f03c43e7fc10feb598d3b",
      "source": "JP=new Set([Bb.kind,Hb.kind,nw.kind,CX.kind,m4.kind,uWn,zHt,VHt,STe,bTe,Fb.kind,pWn,...kPr===null?[]:[kPr],...qHt===null?[]:[qHt],YNe])"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "kPr",
      "start": 2554981,
      "end": 2554989,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "dda75fbc77a444b39af8ebf190804783feba10f6f02c4f6df2dcd543cd92389c",
      "source": "kPr=null"
    },
    {
      "file": "chunk-mphp7acd.js",
      "name": "qHt",
      "start": 2554990,
      "end": 2554998,
      "moduleSha256": "cc43640e5f66aa04eb3757b878e50f5f5ecbf3fb35ac7a5d9cc7459276feb384",
      "sha256": "ef4020450d7d407389440000ba058c58dd1db64a4bd95a9617adb71b4db25680",
      "source": "qHt=null"
    }
  ]
} as const
const DIALOG_WAITING_FOR_287:Readonly<Record<string,string>> = officialRltWaitingKindEvidence287.table
/** Complete Bhe/R4e/mio/jhe semantics; known local dialog kinds explicitly adapted. */
export function readOfficialRltUserWaiting287(
  state:OfficialRltDialogState287,
  input:Omit<OfficialRltUserWaitingInput287,'topDialogWaitingFor'|'queuedElicitation'>,
){
  const top=originalDialogStreamRuntime287.WL(state)
  const blocking=input.isLoading||input.delegatedActive ? cm287(state) : top
  const queuedElicitation=state.open.some(row=>row!==top&&row.kind==='mcp_elicitation')
  const topDialogWaitingFor=blocking===null ? undefined : DIALOG_WAITING_FOR_287[blocking.kind] ?? 'permission prompt'
  return originalDialogStreamRuntime287.jhe({...input,topDialogWaitingFor,queuedElicitation})
}

export interface OfficialRltApiMetric287 {
  id?:string|null
  outputTokens?:number|null
  ttftMs:number
  firstTokenTime:number
  lastTokenTime:number
  responseLengthBaseline:number
  endResponseLength:number
  thinkingTokenEstimate?:number
  thinkingBlockBaseline?:number
  sawEstimatedTokensThisBlock?:boolean
}
export type OfficialRltApiMetricEvent287=
 | {type:'start';id?:string|null;ttftMs:number}
 | {type:'end';id?:string|null;outputTokens:number}
 | {type:'content_block_start';id?:string|null}
 | {type:'thinking_progress';id?:string|null;estimatedTokensDelta:number}
 | {type:'thinking_signature';id?:string|null;chars:number}
/** Main-request lifecycle is metrics based, never inferred from a spinner verb. */
export function createOfficialRltStreamState287(){
  const progress=createOfficialRltToolProgressOwner287();
  let entries:OfficialRltApiMetric287[]=[]
  let responseLength=0
  return {
    subscribe:progress.subscribe,getSnapshot:progress.getSnapshot,
    emitToolProgress:progress.emitToolProgress,
    clearToolProgress:()=>progress.clearToolProgress(),
    showDrainedShellLine:(input:string,verbose:boolean)=>progress.showDrainedShellLine(input,verbose),
    sweepResolvedToolProgress:(messages:readonly unknown[])=>progress._sweepResolvedToolProgress(messages),
    get isMainResponseStreaming(){
      const main=entries.findLast(row=>row.id==null)
      return main!==undefined&&main.outputTokens==null
    },
    record(event:OfficialRltApiMetricEvent287){responseLength=originalDialogStreamRuntime287.bco({entries,responseLength,event})},
    observe(event:{type:string;ttftMs?:number;event?:{type:string;usage?:{output_tokens?:number}}}){
      if(event.type!=='stream_event')return
      const raw=event.event
      // HOr: a start is emitted only for a real ttft; final usage closes
      // metrics at message_delta, not at message_stop (which only changes UI).
      if(raw?.type==='message_start'&&event.ttftMs!=null)this.record({type:'start',ttftMs:event.ttftMs})
      else if(raw?.type==='content_block_start')this.record({type:'content_block_start'})
      else if(raw?.type==='message_delta'&&raw.usage?.output_tokens!=null)this.record({type:'end',outputTokens:raw.usage.output_tokens})
    },
    reset(){entries=[];responseLength=0;progress.clearToolProgress()},
  }
}

export function readOfficialRltDelegatedActive287(tasks:Record<string,{type:string;status:string;isIdle?:boolean;isLongRunning?:boolean}>):boolean {
  return originalDialogStreamRuntime287.B1(tasks)
}

// Complete mSe.isMainResponseStreaming getter, UTF16 [1280901,1281020).
// Its exact range/hash is checked independently by the production differential.

// BEGIN ORIGINAL_RECOMMENDATION_REVEAL_TIMER_287
export const OfficialRltDialogContext287=React.createContext<OfficialRltDialogStore287|null>(null);
export const OfficialRltRequestIdContext287=React.createContext<string|null>(null);
export const OfficialRltTimerContext287=React.createContext<{setTimeout(callback:()=>void,ms:number):()=>void}|null>(null);
const originalRecommendationUiLifecycle287 = new Function('ke','A','Q','kt','ao','g','R','xb','XGe','Xie','d',"function kr(o,r,l){let u=ke(xb),d=typeof o===\"function\",m=d?o:null,f=d?r:o,C=d?void 0:r,v=A(m);v.current=m;let h=A(null),S=u?.setTimeout??OR,x=Q(()=>{if(f===null)return ODe;let P=(T)=>(h.current=null,T(),S(()=>{if(h.current=P,d)v.current?.();else T()},f));return P},[S,f,d,C,...l??[]]),E=kt(x,d?zo:()=>h.current===x);if(!d)return E};\nvar zo=()=>!1;\nvar OR=(c,r)=>{let t=setTimeout(c,r);return()=>clearTimeout(t)};\nvar ODe=()=>()=>{};\nfunction oX(u,i,{perReveal:t=!1}={}){let a=ke(XGe),o=ke(Xie),h=ao(i),[f]=g(()=>t&&a!==null&&o?o.getState().open.find((p)=>p.id===a)?.revealSeq??0:0);R(()=>{if(a!==null&&o){if(!o.firstReveal(a,t?`${u}@${f}`:u))return}h()},[a,o,u,t,f])};\nfunction mco(){let u=ke(XGe),i=ke(Xie);return()=>{if(u===null||!i)return;try{i.getState().open.find((t)=>t.id===u)?.onClaimed?.()}catch(t){d(t)}}};\nvar nV=150;\nfunction Dl(e,n,t=nV){let o=e()-n;if(o>=0)return o<t;return n<=Date.now()};;function X(){let u=ke(XGe),i=ke(Xie),t=u===null||!i?void 0:i.getState().open.find((o)=>o.id===u)?.countedAsk,a=t===void 0?void 0:i?.askTally;return kt(a?.subscribe??V,()=>t===void 0||!a?null:a.positionLabel(t))};function V(){return()=>{}};return {kr,oX,mco,Dl,X};")(React.useContext,useRef,React.useMemo,useSyncExternalStore,React.useEffectEvent,useState,useEffect,OfficialRltTimerContext287,OfficialRltRequestIdContext287,OfficialRltDialogContext287,logError) as {
 kr(ms:number):boolean;kr(callback:()=>void,ms:number|null,deps:readonly unknown[]):void;
 oX(phase:string,callback:()=>void,options?:{perReveal?:boolean}):void;
 X():string|null;mco():()=>void;Dl(clock:()=>number,shownAt:number,grace?:number):boolean;
};
export const useOfficialRltTimer287=originalRecommendationUiLifecycle287.kr;
export const useOfficialRltFirstReveal287=originalRecommendationUiLifecycle287.oX;
export const useOfficialRltAskTally287=originalRecommendationUiLifecycle287.X;
export const useOfficialRltClaim287=originalRecommendationUiLifecycle287.mco;
// Complete original h0n and cA; their host ports read current state/reason,
// never a mirrored recommendation lane or synthetic presence owner.
const originalRecommendationVisibility287=new Function('WL','Tco','_f','jRe',"function h0n(n,e){return n?.hideWhile?.includes(e)===!0};function cA(){let h=Tco(),v=_f(),D=jRe();return v!==null||D?null:h};return {h0n,cA};") as (top:(state:OfficialRltDialogState287)=>OfficialRltDialog287|null,readTop:()=>OfficialRltDialog287|null,reason:()=>string|null,unmounted:()=>boolean)=>{h0n(row:OfficialRltDialog287|null,reason:string):boolean;cA():OfficialRltDialog287|null};
export function readOfficialRltRecommendationHideWhile287(state:OfficialRltDialogState287,reason:'panel'|'draft') {
 return originalRecommendationVisibility287(originalDialogStreamRuntime287.WL,()=>originalDialogStreamRuntime287.WL(state),()=>null,()=>false).h0n(originalDialogStreamRuntime287.WL(state),reason);
}
export function getOfficialRltRecommendationToRender287(state:OfficialRltDialogState287,reason:'panel'|'draft'|'typing'|'progress'|null,hostUnmounted:boolean) {
 const row=originalRecommendationVisibility287(originalDialogStreamRuntime287.WL,()=>originalDialogStreamRuntime287.WL(state),()=>reason,()=>hostUnmounted).cA();
 return row?.kind==='lsp_recommendation'||row?.kind==='plugin_hint'?row:null;
}
export function OfficialRltRecommendationRenderer287({store,request,hostShownAt=0,children}:{store:OfficialRltDialogStore287;request:OfficialRltDialog287&{id:string};hostShownAt?:number;children:(ports:{answer:(result:string)=>boolean;wouldTakeAnswer:()=>boolean})=>React.ReactNode}):React.ReactNode {
 // The full original $ye owns pre-dispatch presence, first reveal and answer.
 // Preserve the existing local terminal layout; reserve consumer restoration
 // remains distinct from source request/presence/notification parity.
 const state=useSyncExternalStore(store.subscribe,store.getState);
 const fullscreen=isFullscreenEnvEnabled();
 // Ink's local DECSTBM branch requires alt-screen and synchronized output.
 // For this scoped non-user host, WR is true exactly while WL is present.
 return React.createElement(OfficialRltSourceRenderer287,{store,request,hostShownAt,children,layout:{fullscreen,decstbm:fullscreen&&SYNC_OUTPUT_SUPPORTED,promptShown:originalDialogStreamRuntime287.WL(state)===null}});
}
// END ORIGINAL_RECOMMENDATION_REVEAL_TIMER_287

// Full original qye display/displacement clock: transient UI timing, not a
// second dialog state. REPL passes actual panel/typing visibility, not flags.
const originalRecommendationHostTiming287 = new Function('w','g','_f',"function qye(h){let Ve=w(3),v=_f()!==null,[D,N]=g(v),[X,Se]=g(0);if(D!==v){if(N(v),!v)Se(Date.now())}let[_e,Pe]=g(h),[Ie,Oe]=g(0);if(_e!==h){if(Pe(h),_e!==\"\"&&h!==\"\")Oe(Date.now())}const Ne=Math.max(X,Ie);let qe;if(Ve[0]!==Ie||Ve[1]!==Ne)qe={shownAt:Ne,displacedAt:Ie},Ve[0]=Ie,Ve[1]=Ne,Ve[2]=qe;else qe=Ve[2];return qe};return qye;") as (compiler:(size:number)=>any[],state:typeof useState,reason:()=>string|null)=>(id:string)=>{shownAt:number;displacedAt:number};
export function useOfficialRltHostTiming287(id:string,hidden:boolean){return originalRecommendationHostTiming287((compilerRuntime as unknown as {c(size:number):any[]}).c,useState,()=>hidden?'hidden':null)(id)}


// Full original CHn; pure request guard avoids importing the permission UI in tool dispatch.
export const createOfficialPermissionResolveOnce287=new Function("function CHn(e){let s=!1,n=!1;return{resolve(r){if(n)return;n=!0,s=!0,e(r)},isResolved(){return s},claim(){if(s)return!1;return s=!0,!0}}};return CHn;")() as <T>(deliver:(value:T)=>void)=>{resolve(value:T):void;claim():boolean;isResolved():boolean};
export const getOfficialRltTop287=(state:OfficialRltDialogState287)=>originalDialogStreamRuntime287.WL(state);

/** Same D/T parser and schema closure; no second Vxe/Hpr transport. */
export function getOfficialTypedDialogCallees287(){return {D:originalTypedDialogRequest287.D,T:originalTypedDialogRequest287.T}}
