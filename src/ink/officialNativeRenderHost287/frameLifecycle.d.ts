import type {Frame} from '../frame.js'
import type {Terminal} from '../terminal.js'
export interface NativeFrameLifecycle287 {
 keepForNextFrame(data:string):boolean;
 takeKeptForNextFrame():string;
 writeKeptForNextFrame():void;
 writeAfterKept(data:string):void;
 readonly nativeCursorSeq:string;
 readonly lastFrameFillsCurrentViewport:boolean;
 readonly hasUnmounted:boolean;
 handoffAltScreen():void;
 handoffRawMode():void;
}
export interface NativeTerminalModes287 {
 readonly isSuspended:boolean;
 isSet(mode:string):boolean;
 set(mode:string,value?:string|{foreground?:string;background?:string}):string;
 reset(mode:string):string;
 resetAll():string;
}
export interface NativeFrameSources287 {
 pYt:(terminal:Terminal,data:string)=>void;
 DI:string; MI:string;
 Y0n:(stdout:NodeJS.WriteStream,warn:(message:string)=>void)=>{rows:number;cols:number};
 Ko:(frame:Frame)=>boolean;
}
export function installNativeFrameLifecycle287(owner:NativeFrameLifecycle287,source:NativeFrameSources287):void;
