import {createLspRecommendationMenu287} from './officialMenu287/native.js'
import * as React from 'react';
import * as compilerRuntime from 'react/compiler-runtime';
const compiler=(compilerRuntime as unknown as {c(size:number):any[]}).c;
import { jsx, jsxs } from 'react/jsx-runtime';
import { Box,Text } from '../../ink.js';
import { Select } from '../CustomSelect/select.js';
import { PermissionDialog } from '../permissions/PermissionDialog.js';
import { executionRecommendationGates287 } from '../../services/context/execution287.js';
import {useOfficialRltTimer287,useOfficialRltClaim287,useOfficialRltAskTally287} from '../../utils/officialRlt287.js';
import {truncateToWidth} from '../../utils/truncate.js';
import {partiallySanitizeUnicode} from '../../utils/sanitization.js';
export type LspRecommendationResponse287='yes'|'no'|'timeout'|'never'|'disable'|'cancelled';
type Props={pluginName:string;pluginDescription?:string;marketplaceName:string;fileExtension:string;onResponse:(response:LspRecommendationResponse287)=>void;wouldTakeAnswer?:()=>boolean};
// Full original upe/iR/cYt/nQe. Existing local Text/Box/Select/PermissionDialog
// are host UI ports; the timer, selection readiness and am result are original.
// Text formatting remains the existing local Unicode sanitizer/width renderer.
function readFormatter287(file:string,name:string):unknown {
 return (import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287(file)[name]
}
const originalLspRecommendationMenu287=createLspRecommendationMenu287({w:compiler,b:Symbol.for('react.memo_cache_sentinel'),e:jsx,r:jsxs,n:Text,s:Box,Qi:LspRecommendationPermission287,$e:LspRecommendationSelect287,kr:useOfficialRltTimer287,mo:250,am:executionRecommendationGates287.am,
 re:(text,limit)=>(readFormatter287('chunk-eske5nfz.js','re') as (text:string,limit:number)=>string)(text,limit),
 nt:(text,limit)=>(readFormatter287('chunk-m59srz4k.js','nt') as (text:string,limit:number)=>string)(text,limit),
 UG:text=>(readFormatter287('chunk-b5kmgz2n.js','UG') as (text:string)=>boolean)(text),
 pPe:text=>(readFormatter287('chunk-b5kmgz2n.js','pPe') as (text:string)=>string)(text),
 k:text=>(readFormatter287('chunk-b5kmgz2n.js','k') as (text:string)=>boolean)(text),
 abe:(text,fallback)=>(readFormatter287('chunk-b5kmgz2n.js','abe') as (text:string,fallback:string)=>string)(text,fallback),
 descriptionFormatter:(value:string)=>truncateToWidth(partiallySanitizeUnicode(value).replace(/[\r\n\t ]+/g,' ').trim(),160),
 identityFormatter:(value:string,fallback:string)=>{const text=partiallySanitizeUnicode(value).replace(/\s+/g,' ').trim();return text||fallback},
});
function LspRecommendationSelect287(props:React.ComponentProps<typeof Select>):React.ReactNode {
 const claim=useOfficialRltClaim287(),focusedOnce=React.useRef(false);
 return React.createElement(Select,{...props,onChange:(value:string)=>{claim();props.onChange?.(value)},onFocus:(value:string)=>{if(focusedOnce.current)claim();else focusedOnce.current=true;props.onFocus?.(value)}});
}
export function LspRecommendationMenu(props:Props):React.ReactNode {return React.createElement(originalLspRecommendationMenu287,props)}
function LspRecommendationPermission287(props:React.ComponentProps<typeof PermissionDialog>):React.ReactNode {
 const tally=useOfficialRltAskTally287();
 return React.createElement(PermissionDialog,{...props,titleRight:tally===null?props.titleRight:React.createElement(Text,{dimColor:true},tally)});
}
