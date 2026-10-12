import type {Cursor} from '../Cursor.js';
import type {useNotifications} from '../../context/notifications.js';
export interface LeftArrowCadence287 {editedEmptyAtMs:number;armedAtMs:number;absorbAnchorMs:number;lastQualifiedLeftPressMs:number;attachConfirmArmedAtMs:number;absorbLogged:boolean}
export type LeftArrowDecision287='fire'|'arm'|'absorb'|'attach-arm'|'attach-absorb'|'reject';
export interface LeftArrowKey287 {name:'left';superKey:boolean;ctrl:boolean;meta:boolean;fn:boolean;shift:boolean;soloKeypress:boolean|undefined}
export interface LeftArrowPorts287 {
 k0n():LeftArrowCadence287;
 R0n(state:LeftArrowCadence287,now:number,solo:boolean|undefined):LeftArrowDecision287;
 x0n(state:LeftArrowCadence287,decision:LeftArrowDecision287,now:number):void;
 P0n(decision:LeftArrowDecision287,now:number,state:LeftArrowCadence287):void;
 z8t:number;A0n:string;
}
export interface LeftArrowInput287 {
 handle(cursor:Cursor,key:LeftArrowKey287,onLeftArrowOnEmpty:(()=>void)|undefined,leftArrowConfirmHint:string|undefined):Cursor;
 noteKeystrokeEmptied():void;
 disarmLeftArrowConfirm():void;
}
export function createLeftArrowInput287(ports:LeftArrowPorts287):(remove:ReturnType<typeof useNotifications>['removeNotification'],add:ReturnType<typeof useNotifications>['addNotification'])=>LeftArrowInput287;
