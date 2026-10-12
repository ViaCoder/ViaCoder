import type {OfficialRequestCompression286,OfficialRequestCompressionPorts286} from '../officialRequestCompression286/runtime.js'
export type NativeCompressionPorts287={
 a:typeof import('../../../utils/authEnvironment.js').authEnvironment;
 k:(name:string,fallback:unknown)=>unknown;
 fO:()=>boolean;ry:(url:string)=>boolean;ma:()=>boolean;
 Hp:()=>string|undefined;Ph:(url:string)=>boolean;iA:()=>{cert?:unknown;key?:unknown}|undefined;
 wg:()=>Record<string,string|undefined>|undefined;
 Ms:OfficialRequestCompressionPorts286['state'];le:()=>unknown;
 Ae:OfficialRequestCompressionPorts286['updateGlobalConfig'];
 c:OfficialRequestCompressionPorts286['safeString'];i:OfficialRequestCompressionPorts286['emit'];
 p:OfficialRequestCompressionPorts286['featureFallback'];y:OfficialRequestCompressionPorts286['featureSuccessOnce'];
 t:(message:string,options:{level:'warn'})=>void;
 Y:typeof JSON.parse;
 f:<T>(create:()=>T)=>()=>T;
 o:typeof import('zod/v4').string;C:typeof import('zod/v4').number;
 u:typeof import('zod/v4').object;x:typeof import('zod/v4').literal;
 now:()=>number;
};
export declare function createNativeRequestCompression287(ports:NativeCompressionPorts287):OfficialRequestCompression286&{getGzipLevel():number|undefined};
export declare function createNativeCompressionPadding287():(body:string)=>string;
export declare function createNativeCompressionEndpoint287():(url:string)=>boolean;
export declare function createNativeCompressionRemote287(ports:Pick<NativeCompressionPorts287,'a'>):()=>boolean;
export declare function createNativeCompressionPreparation287(ports:{ymt:OfficialRequestCompression286['Lut'];dBo:OfficialRequestCompression286['pMo'];aBo:()=>number|undefined;X1t:OfficialRequestCompression286['KNt'];y_t:(body:string)=>string;f2r:OfficialRequestCompression286['SFr']}):(init:RequestInit|undefined,headers:Headers,url:string,clientRequestId:string|undefined,storageV5:unknown)=>{init:RequestInit&{compress?:unknown};compressed:boolean|undefined;body:RequestInit['body'];decision:ReturnType<OfficialRequestCompression286['Lut']>};
