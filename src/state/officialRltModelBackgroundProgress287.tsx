import {renderOfficialAgentToolProgress287} from './officialRltAgentProgress287.js';
import type {Tools} from '../Tool.js';
import * as React from 'react';
import * as compilerRuntime from 'react/compiler-runtime';
import {jsx} from 'react/jsx-runtime';
import {Box} from '../ink.js';
import {BackgroundHint} from '../tools/BashTool/UI.js';
import type {OfficialRltToolProgressOwner287,OfficialRltToolProgress287} from './officialRltToolProgress287.js';
// Full KSe/Aet/XJ, with existing C BackgroundHint as the public UI host port.
// background_hint and the original forked-command agent_progress share this map. Other kinds keep their actual
// existing consumers; this filtered map is a render view, not a second owner.
const sourceModelBackgroundProgress287=new Function('w','e','s','rc','GSe',"function KSe(h){let v=[],D=!1,N=!1;for(let X of h.values()){if(X.kind===\"background_hint\"){if(X.keyOnly?N:D)continue;if(X.keyOnly)N=!0;else D=!0}v.push(X)}return v};\nfunction Aet(h,v){switch(h.kind){case\"background_hint\":return GSe.background_hint(h,v);case\"bash_mode_progress\":return GSe.bash_mode_progress(h,v);case\"agent_progress\":return GSe.agent_progress(h,v);default:{let D=h;return null}}};\nfunction XJ(h){let N=w(7),{progress:v,tools:D}=h;if(v.size===0){return null}let X;if(N[0]!==v||N[1]!==D){let Se;if(N[3]!==D)Se=(_e)=>e(rc,{children:Aet(_e,{tools:D})},_e.toolUseId),N[3]=D,N[4]=Se;else Se=N[4];X=KSe(v).map(Se);N[0]=v,N[1]=D,N[2]=X}else X=N[2];let Se;if(N[5]!==X)Se=e(s,{flexDirection:\"column\",width:\"100%\",children:X}),N[5]=X,N[6]=Se;else Se=N[6];return Se};return XJ;")((compilerRuntime as unknown as {c(size:number):unknown[]}).c,jsx,Box,React.Fragment,{background_hint:(event:{toolUseId:string;keyOnly?:boolean})=>jsx(BackgroundHint,{toolUseId:event.toolUseId,keyOnly:event.keyOnly}),bash_mode_progress:()=>{throw Error('unmigrated Bash JSX must not enter model background renderer')},agent_progress:(event:{progressMessages:import('../types/message.js').ProgressMessage[]},host:{tools:Tools})=>renderOfficialAgentToolProgress287(event.progressMessages,{tools:host.tools,verbose:false})}) as React.ComponentType<{progress:ReadonlyMap<string,OfficialRltToolProgress287>;tools:readonly unknown[]}>;
const noTools:Tools=[];Object.freeze(noTools);
export function OfficialRltModelBackgroundProgress287({owner,tools=noTools}:{owner:Pick<OfficialRltToolProgressOwner287,'subscribe'|'getSnapshot'>;tools?:Tools}){
 const snapshot=React.useSyncExternalStore(owner.subscribe,owner.getSnapshot);
 const progress=React.useMemo(()=>new Map([...snapshot.toolProgress].filter(([,event])=>event.kind==='background_hint'||event.kind==='agent_progress')),[snapshot.toolProgress]);
 return React.createElement(sourceModelBackgroundProgress287,{progress,tools});
}
