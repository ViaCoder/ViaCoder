// Generated complete original Ake reader, both error types, stream lifecycle and verified-handle arm.
export function createReadFileRange287(ports){
function module0(imports){

function pn(t){let e=t/1024;if(e<1)return`${t} bytes`;if(e<1024)return`${e.toFixed(1).replace(/\.0$/,"")}KB`;let r=e/1024;if(r<1024)return`${r.toFixed(1).replace(/\.0$/,"")}MB`;return`${(r/1024).toFixed(1).replace(/\.0$/,"")}GB`};
return {pn};
}
function module1(imports){

class Ye extends Error{constructor(n){super(n);this.name="AbortError"}};
function Z(n){return n instanceof Error?n:Error(String(n))};
return {Ye,Z};
}
function module2(imports){
const rW=imports["rW"];
const pn=imports["pn"];
const oW=imports["oW"];
const eW=imports["eW"];
const Z=imports["Z"];
const Ye=imports["Ye"];
const tW=imports["tW"];
const ZG=imports["ZG"];
const nW=imports["nW"];
var sW=10485760;
var iW=134217728;
class Tut extends Error{sizeInBytes;maxSizeBytes;constructor(e,n){super(`File content (${pn(e)}) exceeds maximum allowed size (${pn(n)}). Use offset and limit parameters to read specific portions of the file, or search for specific content instead of reading the whole file.`);this.sizeInBytes=e;this.maxSizeBytes=n;this.name="FileTooLargeError"}};
class ZLt extends Error{selectedBytes;maxSelectedBytes;constructor(e,n){super(`The requested line range contains over ${pn(n)} of text, more than a read can return. Use a smaller limit \u2014 or, if a single line is this large, no limit will fit it: search for specific content instead.`);this.selectedBytes=e;this.maxSelectedBytes=n;this.name="SelectedRangeTooLargeError"}};
async function Ake(e,n=0,r,s,h,g){h?.throwIfAborted();let b=g?.truncateOnByteLimit??!1,w=g?.maxSelectedBytes,R=g?.handle,A=R?g?.handleStats??await R.stat():await rW(e);if(w!==void 0&&A.isFile()&&A.size<=w)w=void 0;if(A.isDirectory())throw Object.assign(Error(`EISDIR: illegal operation on a directory, read '${e}'`),{code:"EISDIR",errno:-21,syscall:"read",path:e});if(A.isFile()&&A.size<sW){if(!b&&s!==void 0&&A.size>s)throw new Tut(A.size,s);let M=R?await R.readFile({signal:h}):await oW(e,{signal:h});if(!b&&s!==void 0){if(M.length>s)throw new Tut(M.length,s)}let D=M.toString("utf8");return aW(D,A.size,A.mtimeMs,n,r,b?s:void 0,w)}return dW(e,n,r,s,w,A.isFile()?void 0:iW,b,h,R?{handle:R,mtimeMs:A.mtimeMs,positional:A.isFile()}:void 0)};
function aW(e,n,r,s,h,g,b){let w=e.charCodeAt(0)===65279;if(w)n-=3;let R=w?e.slice(1):e;if(s===0&&h===void 0&&g===void 0&&b===void 0){let ce=R.includes("\r")?R.replaceAll(`\r
`,`
`):R;if(ce.endsWith("\r"))ce=ce.slice(0,-1);let Q=1,fe=ce.indexOf(`
`);while(fe!==-1)Q++,fe=ce.indexOf(`
`,fe+1);return{content:ce,lineCount:Q,totalLines:Q,totalBytes:n,readBytes:Buffer.byteLength(ce,"utf8"),mtimeMs:r,truncatedByBytes:!1}}let A=h!==void 0?s+h:1/0,M=[],D=0,z=0,j,K=0,X=!1;function J(ce){if(b!==void 0||g!==void 0){let Q=M.length>0?1:0,fe=K+Q+Buffer.byteLength(ce);if(g!==void 0&&fe>g)return X=!0,!1;if(b!==void 0&&fe>b)throw new ZLt(fe,b);K=fe}return M.push(ce),!0}while((j=R.indexOf(`
`,z))!==-1){if(D>=s&&D<A&&!X){let ce=R.slice(z,j);if(ce.endsWith("\r"))ce=ce.slice(0,-1);J(ce)}D++,z=j+1}if(D>=s&&D<A&&!X){let ce=R.slice(z);if(ce.endsWith("\r"))ce=ce.slice(0,-1);J(ce)}D++;let te=M.join(`
`);return{content:te,lineCount:M.length,totalLines:D,totalBytes:n,readBytes:Buffer.byteLength(te,"utf8"),mtimeMs:r,truncatedByBytes:X}};
function lW(e){nW(e,(n,r)=>{this.resolveMtime(n?0:r.mtimeMs)})};
function cW(e){let n=this.decoder.write(e);if(n.length>0)BT.call(this,n)};
function BT(e){let n=e;if(this.isFirstChunk){if(this.isFirstChunk=!1,n.charCodeAt(0)===65279)n=n.slice(1)}let r=Buffer.byteLength(n);if(this.totalBytesRead+=r,this.hardCapBytes!==void 0&&this.totalBytesRead>this.hardCapBytes){this.stream.destroy(new Tut(this.totalBytesRead,this.hardCapBytes));return}if(!this.truncateOnByteLimit&&this.maxBytes!==void 0&&this.totalBytesRead>this.maxBytes){this.stream.destroy(new Tut(this.totalBytesRead,this.maxBytes));return}let s=this.partial.length>0?this.partial+n:n,h=this.partialBytes+r;this.partial="",this.partialBytes=0;let g=0,b;while((b=s.indexOf(`
`,g))!==-1){if(this.currentLineIndex>=this.offset&&this.currentLineIndex<this.endLine){let w=s.slice(g,b);if(w.endsWith("\r"))w=w.slice(0,-1);let R=this.truncateOnByteLimit&&this.maxBytes!==void 0;if(R||this.maxSelectedBytes!==void 0){let A=this.selectedLines.length>0?1:0,M=this.selectedBytes+A+Buffer.byteLength(w);if(R&&M>this.maxBytes)this.truncatedByBytes=!0,this.endLine=this.currentLineIndex;else if(this.maxSelectedBytes!==void 0&&M>this.maxSelectedBytes){this.stream.destroy(new ZLt(M,this.maxSelectedBytes));return}else this.selectedBytes=M,this.selectedLines.push(w)}else this.selectedLines.push(w)}this.currentLineIndex++,g=b+1}if(g<s.length){if(this.currentLineIndex>=this.offset&&this.currentLineIndex<this.endLine){let w=s.slice(g),R=g===0?h:Buffer.byteLength(w),A=this.truncateOnByteLimit&&this.maxBytes!==void 0;if(A||this.maxSelectedBytes!==void 0){let M=this.selectedLines.length>0?1:0,D=this.selectedBytes+M+R;if(A&&D>this.maxBytes){this.truncatedByBytes=!0,this.endLine=this.currentLineIndex;return}if(this.maxSelectedBytes!==void 0&&D>this.maxSelectedBytes){this.stream.destroy(new ZLt(D,this.maxSelectedBytes));return}}this.partial=w,this.partialBytes=R}}};
function uW(){let e=this.decoder.end();if(e.length>0){if(BT.call(this,e),this.stream.destroyed)return}let n=this.partial;if(n.endsWith("\r"))n=n.slice(0,-1);if(this.currentLineIndex>=this.offset&&this.currentLineIndex<this.endLine)if(this.truncateOnByteLimit&&this.maxBytes!==void 0){let h=this.selectedLines.length>0?1:0;if(this.selectedBytes+h+Buffer.byteLength(n)>this.maxBytes)this.truncatedByBytes=!0;else this.selectedLines.push(n)}else this.selectedLines.push(n);this.currentLineIndex++;let r=this.selectedLines.join(`
`),s=this.truncatedByBytes;this.mtimeReady.then((h)=>{this.resolve({content:r,lineCount:this.selectedLines.length,totalLines:this.currentLineIndex,totalBytes:this.totalBytesRead,readBytes:Buffer.byteLength(r,"utf8"),mtimeMs:h,truncatedByBytes:s})})};
function dW(e,n,r,s,h,g,b,w,R){return new Promise((A,M)=>{let D={stream:R?VMr(R.handle,R.positional,w):tW(e,{highWaterMark:524288,...w?{signal:w}:void 0}),decoder:new ZG("utf8"),offset:n,endLine:r!==void 0?n+r:1/0,maxBytes:s,maxSelectedBytes:h,hardCapBytes:g,truncateOnByteLimit:b,resolve:A,totalBytesRead:0,selectedBytes:0,truncatedByBytes:!1,currentLineIndex:0,selectedLines:[],partial:"",partialBytes:0,isFirstChunk:!0,resolveMtime:()=>{},mtimeReady:null};if(D.mtimeReady=new Promise((z)=>{D.resolveMtime=z}),R)D.resolveMtime(R.mtimeMs);else D.stream.once("open",lW.bind(D));D.stream.on("data",fW.bind(D)),D.stream.once("end",pW.bind(D)),D.stream.once("error",M)})};
function $T(e){return function(...n){try{e.apply(this,n)}catch(r){this.stream.destroy(Z(r))}}};
var fW=$T(cW);
var pW=$T(uW);
function VMr(e,n,r){let h=Buffer.allocUnsafe(524288),g=n?0:null,b=!1,w=new eW({read(){if(b)return;b=!0,e.read(h,0,524288,g).then(({bytesRead:R})=>{if(b=!1,w.destroyed)return;if(R===0){w.push(null);return}if(g!==null)g+=R;w.push(Buffer.from(h.subarray(0,R)))}).catch((R)=>{b=!1,w.destroy(Z(R))})}});if(r){let R=()=>{w.destroy(r.reason instanceof Error?r.reason:new Ye)};if(r.aborted)R();else r.addEventListener("abort",R,{once:!0}),w.once("close",()=>r.removeEventListener("abort",R))}return w};
return {sW,iW,Tut,ZLt,Ake,aW,lW,cW,BT,uW,dW,$T,fW,pW,VMr};
}
const m0=module0({});
const m1=module1({});
const m2=module2({"rW":ports["fs/promises"]["stat"],"pn":m0["pn"],"oW":ports["fs/promises"]["readFile"],"eW":ports["stream"]["Readable"],"Z":m1["Z"],"Ye":m1["Ye"],"tW":ports["fs"]["createReadStream"],"ZG":ports["string_decoder"]["StringDecoder"],"nW":ports["fs"]["fstat"]});
return {"readRange":m2.Ake,"fileTooLarge":m2.Tut,"selectedTooLarge":m2.ZLt};
}
