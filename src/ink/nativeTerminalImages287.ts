/** The original Id lives on the actual Ink root, never in an adapter cache. */
export interface NativeTerminalImages287 {
 readonly live:Map<number,{isSent:boolean;resend:(()=>string)|undefined;onRefused?: (reason:string)=>void}>
 readonly size:number
 allocate(width:number,onRefused?:(reason:string)=>void):number|undefined
 transmit(id:number,source:(id:number)=>string,options?:{resend:boolean}):boolean
 isBackedUp(id:number):boolean
 refused(id:number,reason:string):void
 free(id:number):void
 retransmitAll():void
 drain():string
}
export function createRootTerminalImages287(requestFrame:()=>void):NativeTerminalImages287 {
 const {getNativeKeybindingModule287}=require('../keybindings/nativeKeybindingHost287.js') as typeof import('../keybindings/nativeKeybindingHost287.js')
 const Id=getNativeKeybindingModule287('chunk-p50qybax.js').Id
 return new Id(requestFrame)
}
