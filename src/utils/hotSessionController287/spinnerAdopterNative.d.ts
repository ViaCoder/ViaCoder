import type {OfficialRltSpinnerState287} from '../../state/officialRltSpinner287.js'
export interface HotSpinnerMethods287 {
 setMode(mode:OfficialRltSpinnerState287['mode'],recovery?:unknown):void;setMessage(message:string|null):void;
 setColors(color:string|null,shimmer:string|null):void;setTurnEffort(effort:string|null,model?:string|null):void;
 setRetryStatus(status:unknown):void;setCompacting(value:boolean,hint?:string|null):void;resetOverrides():void;applyCompactProgress(event:unknown):void;
}
export interface HotSpinnerStore287 {
 getSnapshot():Readonly<Record<string,OfficialRltSpinnerState287>>;getState():Readonly<Record<string,OfficialRltSpinnerState287>>;
 setState(update:(state:Readonly<Record<string,OfficialRltSpinnerState287>>)=>Readonly<Record<string,OfficialRltSpinnerState287>>):void;
 subscribe(listener:()=>void):()=>void;get(id?:string):OfficialRltSpinnerState287;bind(id:string):HotSpinnerMethods287;
 main:HotSpinnerMethods287;evict(id:string):void;applyEvent(event:unknown):void;
}
export function createHotSpinnerAdopterFactory287(bindings:Record<string,unknown>):(input?:{onMalformedRetryStatus?(kind:string):void})=>HotSpinnerStore287
