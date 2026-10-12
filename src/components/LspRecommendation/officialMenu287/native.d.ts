import type {ComponentType,ReactNode} from 'react'
export type LspRecommendationResponse287='yes'|'no'|'timeout'|'never'|'disable'|'cancelled'
export interface LspRecommendationMenuProps287 {pluginName:string;pluginDescription?:string;marketplaceName:string;fileExtension:string;onResponse:(response:LspRecommendationResponse287)=>void;wouldTakeAnswer?:()=>boolean}
export interface LspRecommendationMenuPorts287 {
 w(size:number):unknown[];b:symbol;e:(...args:any[])=>ReactNode;r:(...args:any[])=>ReactNode;n:unknown;s:unknown;Qi:unknown;$e:unknown;
 kr:(...args:any[])=>unknown;mo:number;am():boolean;
 re(text:string,limit:number):string;nt(text:string,limit:number):string;UG(text:string):boolean;pPe(text:string):string;k(text:string):boolean;abe(text:string,fallback:string):string;
 descriptionFormatter?:(text:string)=>string;identityFormatter?:(text:string,fallback:string)=>string;
}
export function createLspRecommendationMenu287(ports:LspRecommendationMenuPorts287):ComponentType<LspRecommendationMenuProps287>
