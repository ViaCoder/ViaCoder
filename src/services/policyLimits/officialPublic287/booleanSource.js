// Original 287 primitive: boolean-only registered reader; no backend implementation.
export function createPolicyBooleanSource287(reader){
class Am{reader=null;register(e){let n=this.reader;return this.reader=e,n}servedTrue(e){let n=this.reader;if(!n)return!1;try{return n(e,!1)===!0}catch{return!1}}};
const source=new Am;source.register(reader);return source;
}
