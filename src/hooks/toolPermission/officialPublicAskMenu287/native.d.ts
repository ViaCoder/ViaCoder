import type {ReactNode} from 'react'
import type {PastedContent} from '../../../utils/config.js'
import type {OfficialPermissionDescriptor287,OfficialQuestionState287} from '../officialPermissionDescriptors287/native.js'
export interface SourceAskMenuProps287 {payload:OfficialPermissionDescriptor287;asked:NonNullable<OfficialPermissionDescriptor287['questions']>;answer(value:unknown):boolean;wouldTakeAnswer():boolean;highlight:unknown;afkTimeoutMs:number|null;state:OfficialQuestionState287}
export interface PublicAskMenu287 {xge(props:SourceAskMenuProps287):ReactNode;HY(props:Record<string,unknown>):ReactNode;LY(props:Record<string,unknown>):ReactNode;sXe(value:unknown):number|null}
export interface SourceImageLimits287 {maxWidth:number;maxHeight:number;maxBase64Size:number;targetRawSize:number;rejectMaxWidth?:number;rejectMaxHeight?:number}
export function createPublicAskMenu287(ports:Record<string,unknown>):PublicAskMenu287
export function createPublicAskPaste287(ports:Record<string,unknown>):{PC(text?:string,pasted?:Record<number,PastedContent>):number;eq(read:()=>string[]):()=>void}
export function createPublicAskImageConstants287(ports:Record<string,unknown>):{gI:SourceImageLimits287;AYo:number}
export function createPublicAskImageLimits287(ports:Record<string,unknown>):{ql(model:string|undefined):SourceImageLimits287;bMr:Record<'60s'|'5m'|'10m',number>}
export function createPublicAskPasteScan287(ports:Record<string,unknown>):{OLt(value:number):boolean;wd(text:string):{id:number;index:number;match:string}[]}
export function createPublicAskPreferences287(ports:Record<string,unknown>):{jQe():unknown}
export function createPublicAskPresenceConstants287(ports:Record<string,unknown>):{g3t:number}
export function createPublicAskStrings287(ports:Record<string,unknown>):{XK(value:unknown):unknown;pi(...args:unknown[]):unknown;Mr(text:string):string}
export function createPublicAskNotice287(ports:Record<string,unknown>):{B4e(plugin:string,text:string):string}
export function createPublicAskDivider287(ports:Record<string,unknown>):{Va(props:Record<string,unknown>):ReactNode}
export function createPublicAskTitle287(ports:Record<string,unknown>):{b4(props:Record<string,unknown>):ReactNode}
export function createPublicAskBullet287(ports:Record<string,unknown>):{Kf(props:Record<string,unknown>):ReactNode}
export function createPublicAskBadge287(ports:Record<string,unknown>):{Rb(props:Record<string,unknown>):ReactNode}
export function createPublicAskStatus287(ports:Record<string,unknown>):{Cf(props:Record<string,unknown>):ReactNode}
export function createPublicAskStatusIcons287(ports:Record<string,unknown>):{TAt:unknown;Qe(props:Record<string,unknown>):ReactNode}
export function createPublicAskConfirm287(ports:Record<string,unknown>):{qn(props:Record<string,unknown>):ReactNode}

export function createPublicAskStatusConstants287(ports:Record<string,unknown>):{Kr:string}
export function createPublicAskAnswerConstants287(ports:Record<string,unknown>):{QPt:string}
export function createPublicAskWrap287(ports:Record<string,unknown>):{Au(text:string,width:number,options?:{hard?:boolean;trim?:boolean}):string;zZ(options?:Record<string,unknown>):unknown;vo(text:string,width:number,firstLine?:boolean):string}
export function createPublicAskTruncate287(ports:Record<string,unknown>):{sV(text:string):string;OAt(text:string,width:number,position:'start'|'middle'|'end'):{head:string;tail:string}|null;gze:string}
export function createPublicAskTabs287(ports:Record<string,unknown>):{v8(text:string):string;Bs(text:string):string}
export function createPublicAskIdentity287(ports:Record<string,unknown>):{iK(text:string):string}
export function createPublicAskPluginLabel287(ports:Record<string,unknown>):{moe(text:unknown):string|null}

export function createPublicAskAccessible287(ports:Record<string,unknown>):{xD(props:{children?:ReactNode;fallback?:ReactNode}):ReactNode}

export function createPublicAskImageStore287(ports:Record<string,unknown>):{Sme(content:PastedContent,setter:(update:(paths:Map<number,string>)=>Map<number,string>)=>void):string|null;bme(content:PastedContent,setter:(update:(paths:Map<number,string>)=>Map<number,string>)=>void):Promise<string|null>}

export function createPublicAskBackground287(ports:Record<string,unknown>):{Pt():boolean}
