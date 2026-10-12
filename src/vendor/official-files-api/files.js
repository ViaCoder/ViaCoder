// Complete original 2.1.287 public Files upload/download data functions.
import St from 'axios';import {randomUUID as mXo} from 'node:crypto';import * as fU from 'node:fs/promises';import * as uy from 'node:path';
import {t,Q as ee,i,y as S,l,filesFeatureOk287 as y,filesFeatureSad287 as p,filesFeatureBad287 as m} from './host.js';
import {getCwd as oe} from '../../utils/cwd.js';
import {getFilesHeaders287 as H5t} from '../../services/api/filesHeaders287.js';
import {assertFilesApiAvailable287 as _He} from '../../services/api/filesPolicy287.js';
function Yde(){return process.env.ANTHROPIC_BASE_URL||process.env.CLAUDE_CODE_API_BASE_URL||"https://api.anthropic.com"};
function kHe(e){t(`[files-api] ${e}`,{level:"error"})};
function RE(e){t(`[files-api] ${e}`)};
var uU=3;
var _Xo=500;
var kXo=120000;
var U5t=524288000;
async function j5t(e,n){let r="";for(let s=1;s<=uU;s++){let g=await n(s);if(g.done)return g.value;if(r=g.error||`${e} failed`,RE(`${e} attempt ${s}/${uU} failed: ${r}`),s<uU){let h=_Xo*Math.pow(2,s-1);RE(`Retrying ${e} in ${h}ms...`),await ee(h)}}throw Error(`${r} after ${uU} attempts`)};
async function wXo(e,n){let r=n.baseUrl||Yde();_He(r);let s=`${r}/v1/files/${e}/content`,g=H5t(n);return RE(`Downloading file ${e} from ${s}`),j5t(`Download file ${e}`,async()=>{try{let h=await St.get(s,{headers:g,responseType:"arraybuffer",timeout:60000,validateStatus:(b)=>b<500});if(h.status===200)return RE(`Downloaded file ${e} (${h.data.length} bytes)`),{done:!0,value:Buffer.from(h.data)};if(h.status===404)throw Error(`File not found: ${e}`);if(h.status===401)throw Error("Authentication failed: invalid or missing API key");if(h.status===403)throw Error(`Access denied to file: ${e}`);return{done:!1,error:`status ${h.status}`}}catch(h){if(!St.isAxiosError(h))throw h;return{done:!1,error:h.message}}})};
function vXo(e,n,r){let s=uy.normalize(r);if(s.startsWith(".."))return kHe(`Invalid file path: ${r}. Path must not traverse above workspace`),null;let g=uy.join(e,n,"uploads"),b=[uy.join(e,n,"uploads")+uy.sep,uy.sep+"uploads"+uy.sep].find((D)=>s.startsWith(D)),w=b?s.slice(b.length):s;return uy.join(g,w)};
async function TXo(e,n){let{fileId:r,relativePath:s}=e,g=vXo(oe(),n.sessionId,s);if(!g)return{fileId:r,path:"",success:!1,error:`Invalid file path: ${s}`};try{let h=await wXo(r,n),b=uy.dirname(g);return await fU.mkdir(b,{recursive:!0}),await fU.writeFile(g,h),RE(`Saved file ${r} to ${g} (${h.length} bytes)`),{fileId:r,path:g,success:!0,bytesWritten:h.length}}catch(h){return kHe(`Failed to download file ${r}: ${l(h)}`),{fileId:r,path:g,success:!1,error:l(h)}}};
var EXo=5;
async function TIo(e,n,r=EXo){if(e.length===0)return[];RE(`Downloading ${e.length} file(s) for session ${n.sessionId}`);let s=Date.now(),g=await Promise.all(e.map($d(r,(w)=>TXo(w,n)))),h=Date.now()-s,b=G(g,(w)=>w.success);if(RE(`Downloaded ${b}/${e.length} file(s) in ${h}ms`),b===e.length)y("api_files_download");else if(b>0)p("api_files_download","partial_failed");else m("api_files_download","all_failed");return g};
async function W5t(e,n,r,s){_He(r.baseUrl||Yde()),RE(`Uploading file ${e} as ${n}`);let g;try{g=s?.content??await fU.readFile(e)}catch(h){return i("tengu_file_upload_failed",{error_type:S("file_read")}),{path:n,error:l(h),success:!1,reason:"file_read"}}return CXo(g,n,r,s)};
async function CXo(e,n,r,s){let g=r.baseUrl||Yde();_He(g);let h=`${g}/v1/files`,b=H5t(r),w=e.length;if(w>U5t)return i("tengu_file_upload_failed",{error_type:S("file_too_large")}),{path:n,error:`File exceeds maximum size of ${U5t} bytes (actual: ${w})`,success:!1,reason:"too_large"};let D=`----FormBoundary${mXo()}`,j=RXo(uy.basename(n)),z=[];if(z.push(Buffer.from(`--${D}\r
Content-Disposition: form-data; name="file"; filename="${j}"\r
Content-Type: application/octet-stream\r
\r
`)),z.push(e),z.push(Buffer.from(`\r
`)),z.push(Buffer.from(`--${D}\r
Content-Disposition: form-data; name="purpose"\r
\r
user_data\r
`)),s?.expiresInSeconds!==void 0)z.push(Buffer.from(`--${D}\r
Content-Disposition: form-data; name="expires_in_seconds"\r
\r
${s.expiresInSeconds}\r
`));z.push(Buffer.from(`--${D}--\r
`));let K=Buffer.concat(z);try{return await j5t(`Upload file ${n}`,async(he)=>{if(s?.signal?.aborted)throw new ib("Upload canceled","canceled");let _e=(ke)=>{if(he>=uU)throw i("tengu_file_upload_failed",{error_type:S("server")}),new ib(`${ke} after ${uU} attempts`,"server");return{done:!1,error:ke}};try{let ke=await St.post(h,K,{headers:{...b,"Content-Type":`multipart/form-data; boundary=${D}`,"Content-Length":K.length.toString()},timeout:s?.timeoutMs??kXo,signal:s?.signal,validateStatus:(be)=>be<500});if(ke.status===200||ke.status===201){let be=ke.data?.id;if(!be)return _e("Upload succeeded but no file ID returned");return RE(`Uploaded ${n} -> ${be} (${w} bytes)`),{done:!0,value:{path:n,fileId:be,size:w,success:!0}}}if(ke.status===401)throw i("tengu_file_upload_failed",{error_type:S("auth")}),new ib("Authentication failed: invalid or missing API key","auth");if(ke.status===403)throw i("tengu_file_upload_failed",{error_type:S("forbidden")}),new ib("Access denied for upload","forbidden");if(ke.status===413)throw i("tengu_file_upload_failed",{error_type:S("size")}),new ib("File too large for upload","too_large");if(ke.status===400||ke.status===404||ke.status===422)throw i("tengu_file_upload_failed",{error_type:S("server")}),new ib(`status ${ke.status}`,"server");return _e(`status ${ke.status}`)}catch(ke){if(ke instanceof ib)throw ke;if(St.isCancel(ke))throw new ib("Upload canceled","canceled");if(St.isAxiosError(ke)){if(s?.retryAfterTimeout===!1&&ke.code==="ECONNABORTED"&&ke.cause===void 0)throw i("tengu_file_upload_failed",{error_type:S("network")}),new ib(ke.message,"network");return{done:!1,error:ke.message}}throw ke}})}catch(he){if(he instanceof ib)return{path:n,error:he.message,success:!1,reason:he.reason};return i("tengu_file_upload_failed",{error_type:S("network")}),{path:n,error:l(he),success:!1,reason:"network"}}};
function RXo(e){return e.replace(/["\r\n]/g,(n)=>n==='"'?"%22":n==="\r"?"%0D":"%0A")};
class ib extends Error{reason;constructor(e,n){super(e);this.reason=n;this.name="UploadNonRetriableError"}};
function kIo(e){let n=[],r=e.flatMap((s)=>s.split(" ").filter(Boolean));for(let s of r){let g=s.indexOf(":");if(g===-1)continue;let h=s.substring(0,g),b=s.substring(g+1);if(!h||!b){kHe(`Invalid file spec: ${s}. Both file_id and path are required`);continue}n.push({fileId:h,relativePath:b})}return n};
function $d(i,s){let e=0,n=[];function o(){if(e<i)return e++,Promise.resolve();return new Promise((r)=>n.push(r))}function t(){let r=n.shift();if(r)r();else e--}return async(...r)=>{await o();try{return await s(...r)}finally{t()}}};
function G(n,e){let r=0;for(let t of n)r+=+!!e(t);return r};
export {Yde as UP,_He as x_,H5t as zP,j5t as GP,wXo as mJ,vXo as buildDownloadPath287,TXo as downloadAndSaveFile287,TIo as downloadSessionFiles287,kIo as parseFileSpecs287,W5t as jP,CXo as _J,RXo as bJ,ib as Co};
