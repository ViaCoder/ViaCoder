export type PolicySignedCacheKind287='managed-settings'|'policy-limits'
export interface PolicySignedCacheIdentity287 {typ:string;aud?:string;sub?:string;ws?:string}
export interface PolicySignatureCheck287 {
 jws?:string;kind:PolicySignedCacheKind287;orgUuid?:string;accountUuid?:string;workspaceUuid?:string
 bodySha:string;highWaterIat?:number;nowMs:number;roots:Array<{pem:string;marker:string}>
}
export interface PolicySignatureReport287 {
 result:'unsigned'|'malformed'|'no_embedded_root'|'bad_chain'|'cert_expired'|'no_marker'|'bad_signature'|'wrong_type'|'aud_mismatch'|'sub_mismatch'|'ws_mismatch'|'sha_mismatch'|'future_iat'|'stale'|'rollback'|'valid'
 issuedAt?:number;ageSeconds?:number;wsUnanchored?:boolean;certDaysLeft?:number
}
export declare function createPolicySignature287(ports:Record<string,unknown>):{
 Y2t(headers:unknown):string|undefined;KGr(value:unknown):string|undefined
 uPe(path:string,jws:string|undefined):Promise<void>;X2t(path:string):Promise<void>;J2t(path:string,force?:boolean):Promise<boolean>
 aGo(path:string):Promise<{jws:string;receivedAt:number}|null>
 lGo(path:string,identity:PolicySignedCacheIdentity287):Promise<number|undefined>
 iGo(check:PolicySignatureCheck287):PolicySignatureReport287
 cGo(path:string,identity:PolicySignedCacheIdentity287,iat:number):Promise<void>
}
