import * as React from 'react';
export interface OfficialUiSignal287{subscribe(listener:()=>void):()=>void;emit():void}
export interface OfficialUiStore287<T>{getState():T;subscribe(listener:()=>void):()=>void;setState(writer:(previous:T)=>T):void}
export interface OfficialRltUiEvents287{autoDenyPresence:OfficialUiSignal287;blockingToolProgress:OfficialUiStore287<{active:boolean}>;dialogHostUnmounted:OfficialUiStore287<{unmounted:boolean}>;onScreenBlockingDialog:OfficialUiStore287<{surfaceMounted:boolean;kind:string|null}>}
// Complete original e/ta and dependencies: process singleton, same original
// owner for writers/selectors/input presence. No shadow UI flags.
const originalUiRuntime287=new Function("var s=globalThis.process?.getBuiltinModule?.(\"async_hooks\");\nvar wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;\nfunction Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,\"Signal listener(s) threw\")},clear(){e.clear()}}};\nfunction Ls(t,e){let r=t,S=new Set,a=e&&wKt(e),s=()=>r;return{getSnapshot:s,getState:s,setState:(n)=>{let o=r,i=n(o);if(Object.is(i,o))return;r=i,a?.({newState:i,oldState:o});for(let u of S)u()},subscribe:(n)=>{let o=wKt(n);return S.add(o),()=>S.delete(o)}}};\nvar o={notice:null,shownLoggedForDraftId:null,promptedCount:0,sessionDraftCount:0,seededFromDisk:!1,seedStarted:!1,toolCallCount:0};\nclass e{autoDenyPresence=Me();mainLoopBusy=Ls({busy:!1});blockingToolProgress=Ls({active:!1});dialogHostUnmounted=Ls({unmounted:!1});onScreenBlockingDialog=Ls({surfaceMounted:!1,kind:null});pendingSurveyFeedbackSource=null;terminalFocus=\"unknown\";terminalFocusGainedAt=Number.NEGATIVE_INFINITY;terminalFocusChanged=Me();feedbackNotice=Ls(o);clawdEntranceTaken=!1;startupUpdateSummary=void 0;experimentEnrollmentsUnseen=void 0;orgMemoryWritesRowSeen=!1;orgMemoryReadRowSeen=!1;remoteHomeSettingsRowSeen=!1};\nvar ta=new e;\nfunction dN(h){ta.blockingToolProgress.setState((v)=>v.active===h?v:{active:h})};\nfunction uN(h){ta.dialogHostUnmounted.setState((v)=>v.unmounted===h?v:{unmounted:h})};\nfunction BRe(){return ta.blockingToolProgress.getState().active};\nfunction URe(){return ta.dialogHostUnmounted.getState().unmounted};\nfunction cvo(){return uN(!1)};\nfunction hvo(){return dN(!1)};\nfunction VSe(h){for(let v of h.values())if(zmo[v.kind])return!0;return!1};\nvar zmo={background_hint:!1,bash_mode_progress:!0,agent_progress:!1};\nreturn {ta,Me,dN,uN,BRe,URe,cvo,hvo,VSe};")() as {Me:()=>OfficialUiSignal287;ta:OfficialRltUiEvents287;dN(value:boolean):void;uN(value:boolean):void;BRe():boolean;URe():boolean;cvo():void;hvo():void;VSe(progress:ReadonlyMap<string,{kind:string}>):boolean};
export const createOfficialRltSignal287=originalUiRuntime287.Me;
export const officialRltUiEvents287=originalUiRuntime287.ta;
export const setOfficialRltBlockingProgress287=originalUiRuntime287.dN;
export const setOfficialRltHostUnmounted287=originalUiRuntime287.uN;
export const readOfficialRltBlockingProgress287=originalUiRuntime287.VSe;
export function useOfficialRltUiVisibility287(){return {progress:React.useSyncExternalStore(officialRltUiEvents287.blockingToolProgress.subscribe,originalUiRuntime287.BRe),unmounted:React.useSyncExternalStore(officialRltUiEvents287.dialogHostUnmounted.subscribe,originalUiRuntime287.URe)}}
const sourceHostEffect287=new Function('uN','cvo','Ds',"return ()=>(uN(Ds===\"transcript\"),cvo)") as (set:(value:boolean)=>void,cleanup:()=>void,screen:string)=>()=>()=>void;
export function useOfficialRltHostScreen287(screen:'prompt'|'transcript'){React.useLayoutEffect(sourceHostEffect287(originalUiRuntime287.uN,originalUiRuntime287.cvo,screen),[screen])}

// Vve's original source effect: only VSe's bash_mode_progress is blocking.
// The transient Map is a view of the existing JSX owner, not retained state.
export function useOfficialRltProgress287(kind:string|undefined){const active=readOfficialRltBlockingProgress287(new Map(kind===undefined?[]:[['local-tool-jsx',{kind}]]));React.useLayoutEffect(sourceProgressEffect287(originalUiRuntime287.dN,originalUiRuntime287.hvo,active),[active])}
const sourceVisibility287=new Function('dft','kT','uft','mft',"function _f(){let h=dft(),v=kT(),D=uft(),N=mft();return h?\"progress\":D?\"panel\":N?\"draft\":v?\"typing\":null};return _f;") as (progress:()=>boolean,typing:()=>boolean,panel:()=>boolean,draft:()=>boolean)=>()=> 'progress'|'panel'|'draft'|'typing'|null;
export function readOfficialRltVisibilityReason287(progress:boolean,typing:boolean,panel:boolean,draft:boolean){return sourceVisibility287(()=>progress,()=>typing,()=>panel,()=>draft)()}

const sourceProgressEffect287=new Function('dN','hvo','$c',"return ()=>(dN($c),hvo)") as (set:(value:boolean)=>void,cleanup:()=>void,active:boolean)=>()=>()=>void;

export function useOfficialRltProgressStore287(owner:Pick<import('./officialRltToolProgress287.js').OfficialRltToolProgressOwner287,'subscribe'|'getSnapshot'>){
 const snapshot=React.useSyncExternalStore(owner.subscribe,owner.getSnapshot);
 const active=readOfficialRltBlockingProgress287(snapshot.toolProgress);
 React.useLayoutEffect(sourceProgressEffect287(originalUiRuntime287.dN,originalUiRuntime287.hvo,active),[active]);
}
