import type {ShellProgress} from '../types/tools.js';
import {logError} from '../utils/log.js';
import {createOfficialRltSignal287} from './officialRltUiEvents287.js';
export type OfficialRltToolProgress287=
 | {kind:'bash_mode_progress';toolUseId:string;input:string;progress:ShellProgress|null;verbose:boolean}
 | {kind:'agent_progress'|'background_hint';toolUseId:string;[field:string]:unknown};
export type OfficialRltToolProgressEvent287=OfficialRltToolProgress287|{kind:'clear';toolUseId:string};
export interface OfficialRltToolProgressOwner287 {
 subscribe(listener:()=>void):()=>void;getSnapshot():{toolProgress:ReadonlyMap<string,OfficialRltToolProgress287>};
 emitToolProgress(event:OfficialRltToolProgressEvent287):void;
 showDrainedShellLine(input:string,verbose:boolean):()=>void;clearToolProgress():void;
 _sweepResolvedToolProgress(messages:readonly unknown[]):void;
}
// Full original progress methods from mSe; only the progress snapshot slice is
// attached to the already-existing rltStream. JSX is presentation, not a map owner.
export const createOfficialRltToolProgressOwner287=new Function('Me','d',"function dSe(h,v){if(v.kind===\"clear\"){if(!h.has(v.toolUseId))return h;let X=new Map(h);return X.delete(v.toolUseId),X}let D=h.get(v.toolUseId);if(v.kind===\"background_hint\"&&D?.kind===v.kind)return h;let N=new Map(h);return N.set(v.toolUseId,v),N};\nfunction aZe(h,v){if(h.size===0)return h;let D=null;for(let N of h.keys())if(v.has(N)){if(D===null)D=new Map(h);D.delete(N)}return D??h};\nvar dZe=new Map;\nvar MJ=\"drained-shell-line\";\nclass mSe{_snapshot={toolProgress:dZe};_changed=Me();subscribe=this._changed.subscribe;getSnapshot=()=>this._snapshot;emitToolProgress=(h)=>{let v=this._snapshot.toolProgress,D=dSe(h.kind===\"bash_mode_progress\"?dSe(v,{kind:\"clear\",toolUseId:MJ}):v,h);if(D===v)return;this._publish({toolProgress:D})};\nshowDrainedShellLine(h,v){let D={kind:\"bash_mode_progress\",toolUseId:MJ,input:h,progress:null,verbose:v};return this.emitToolProgress(D),()=>{if(this._snapshot.toolProgress.get(MJ)===D)this.emitToolProgress({kind:\"clear\",toolUseId:MJ})}}\nclearToolProgress(){if(this._snapshot.toolProgress.size===0)return;this._publish({toolProgress:dZe})}\n_sweepResolvedToolProgress(h){let v=this._snapshot.toolProgress;if(v.size===0)return;let D=new Set;for(let X of h){if(X.type!==\"user\"||!Array.isArray(X.message.content))continue;for(let Se of X.message.content)if(Se.type===\"tool_result\"&&v.has(Se.tool_use_id))D.add(Se.tool_use_id)}let N=aZe(v,D);if(N===v)return;this._publish({toolProgress:N})}\n_publish(h){this._snapshot={...this._snapshot,...h};try{this._changed.emit()}catch(v){d(v)}}};return ()=>new mSe;")(createOfficialRltSignal287,logError) as ()=>OfficialRltToolProgressOwner287;
