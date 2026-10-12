/** Same existing print lexical caller; this adapter creates no copied business owner. */
export function createOriginalRewindContext287(input:{
 caller:Record<string,unknown>;permission:unknown;drain:unknown;discardTurn:unknown;
 prepareStop:unknown;keepAlive:unknown;detachedSlot:unknown;
 sendError:(frame:unknown,error:string)=>void;sendSuccess:(frame:unknown,response?:unknown)=>void;
}):Record<string,unknown> {
 const caller=input.caller
 for(const [key,value]of Object.entries({Yt:input.permission,qe:input.drain,Gu:input.discardTurn,Qs:input.prepareStop,Ws:input.keepAlive,KS:input.detachedSlot,We:input.sendError,Ze:input.sendSuccess})){
  if(Object.hasOwn(caller,key)){if(caller[key]!==value)throw Error('same-owner flow port mismatch '+key)}
  else Object.defineProperty(caller,key,{value,enumerable:true})
 }
 if(!Object.hasOwn(caller,'br'))Object.defineProperty(caller,'br',{value:0,writable:true,enumerable:true})
 return caller
}
