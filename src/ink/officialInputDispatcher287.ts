import * as React from 'react';
import useStdin from './hooks/use-stdin.js';
import type {Key} from './events/input-event.js';
import {logError} from '../utils/log.js';
export type OfficialPreDispatchRegistration287={handler:(input:string,key:Key,sequence:string)=>boolean|void};
export type OfficialInputDispatcher287={registerPreDispatch:(registration:OfficialPreDispatchRegistration287)=>()=>void;dispatch:(input:string,key:Key,sequence:string,consume:()=>void)=>boolean};
// Complete original ert registration closure and Yt pre-dispatch closure.
// This Set is dispatch registrations, not a second UI state store.
const originalDispatcher287=new Function('d',"return ()=>{let l={current:new Set},x=l;return {registerPreDispatch:(z)=>(x.current.add(z),()=>x.current.delete(z)),dispatch:(s,u,f,x)=>{for(let h of l.current)try{if(h.handler(s,u,f)===!0)return x(),!0}catch(S){d(S)}return!1}}};")(logError) as ()=>OfficialInputDispatcher287;
export const createOfficialInputDispatcher287=originalDispatcher287;
const sourcePreDispatchHook287=new Function('yl','g','sn','R',"function zS(e,{isActive:o=!0}={}){let r=yl(),[t]=g(()=>({handler:e}));sn(()=>{t.handler=e}),R(()=>{if(!o||!r)return;return r.registerPreDispatch({handler:(s,n,i)=>t.handler(s,n,i)})},[o,r,t])};return zS;")(()=>useStdin().internal_inputDispatcher,React.useState,React.useLayoutEffect,React.useEffect) as (handler:OfficialPreDispatchRegistration287['handler'],options?:{isActive?:boolean})=>void;
export const useOfficialPreDispatch287=sourcePreDispatchHook287;
