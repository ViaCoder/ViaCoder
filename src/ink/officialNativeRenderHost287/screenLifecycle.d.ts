import type {Frame} from '../frame.js'
export interface NativeScreenLifecycle287 {
 nativeSetAltScreenActive287(active:boolean,mouseTracking?:'off'|'full'):string;
 stdoutSize():{columns:number;rows:number};
 forgetPointer():void;
 readonly isHandedOff:boolean;
 readonly holdsRawMode:boolean;
 syncMousePixels():void;
 retainFinePointer():()=>void;
 mouseReportsInPixels():boolean;
}
export interface NativeScreenSources287 {
 O:()=>string;
 Us:()=>Map<NodeJS.WriteStream,object>;
 Ko:(frame:Frame)=>boolean;
 zv:(cursor:Frame['cursor'],display:Frame['cursor']|null)=>string;
 s$:(row:number,column:number)=>string;
 Fbt:(lines:number)=>string;
 ks:(value:number|undefined,fallback:number,max:number,mode:'fallback'|'clamp',warn:(message:string)=>void)=>number;
 Fv:number;Uv:number;
 PD:()=>{now:(mode:string)=>boolean;onSettle:(mode:string,callback:()=>void)=>()=>void};
 FT:()=>{cellPixels?:{width:number;height:number}};
 t:(message:string)=>void;
}
export function installNativeScreenLifecycle287(owner:NativeScreenLifecycle287,source:NativeScreenSources287):void;
