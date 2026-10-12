// Complete original 2.1.287 Bash API result method and pure helpers.

function module0(imports){

function Bh(n){if(n.length<4)return null;if(n[0]===137&&n[1]===80&&n[2]===78&&n[3]===71)return"image/png";if(n[0]===255&&n[1]===216&&n[2]===255)return"image/jpeg";if(n.length>=6&&n[0]===71&&n[1]===73&&n[2]===70&&n[3]===56&&(n[4]===55||n[4]===57)&&n[5]===97)return"image/gif";if(n[0]===82&&n[1]===73&&n[2]===70&&n[3]===70&&n.length>=12&&n[8]===87&&n[9]===69&&n[10]===66&&n[11]===80)return"image/webp";return null};
return {Bh};
}
function module1(imports){
const Bh=imports["Bh"];
const zfe=imports["zfe"];
function dlt(e){return e?"final_response":zfe()?"session":void 0};
var Gqn=/^data:([^;]+);base64,(.+)$/;
function fgt(e){let n=e.trim().match(Gqn);if(!n||!n[1]||!n[2])return null;return{mediaType:n[1],data:n[2]}};
function r6n(e,n){let r=fgt(e);if(!r)return null;let s=Bh(Buffer.from(r.data,"base64"));if(s===null)return null;return{tool_use_id:n,type:"tool_result",content:[{type:"image",source:{type:"base64",media_type:s,data:r.data}}]}};
var r6=`
`;
return {dlt,Gqn,fgt,r6n,r6};
}
function module2(imports){

function pn(t){let e=t/1024;if(e<1)return`${t} bytes`;if(e<1024)return`${e.toFixed(1).replace(/\.0$/,"")}KB`;let r=e/1024;if(r<1024)return`${r.toFixed(1).replace(/\.0$/,"")}MB`;return`${(r/1024).toFixed(1).replace(/\.0$/,"")}GB`};
return {pn};
}
function module3(imports){
const pn=imports["pn"];
var rre="<persisted-output>";
var jKn="</persisted-output>";
var iRe=2000;
function L_e(e){let n=`${rre}
`;return n+=e.truncatedAtBytes===void 0?`Output too large (${pn(e.originalSize)}). Full output saved to: ${e.filepath}

`:`Output exceeded the ${pn(e.truncatedAtBytes)} persist limit; only the first ${pn(e.truncatedAtBytes)} were saved to: ${e.filepath}

`,n+=`Preview (first ${pn(iRe)}):
`,n+=e.preview,n+=e.hasMore?`
...
`:`
`,n+=jKn,n};
function n8e(e,n){if(e.length<=n)return{preview:e,hasMore:!1};let s=e.slice(0,n).lastIndexOf(`
`),a=s>n*0.5?s:n;return{preview:e.slice(0,a),hasMore:!0}};
return {rre,jKn,iRe,L_e,n8e};
}
function module4(imports){

var gue=67108864;
return {gue};
}
function module5(imports){

var dt="Read";
return {dt};
}
export function createBashResult287(ports){
const m0=module0({});
const m1=module1({"Bh":m0["Bh"],"zfe":ports["singleShotPrintSession"]});
const m2=module2({});
const m3=module3({"pn":m2["pn"]});
const m4=module4({});
const m5=module5({});
const r6n=m1["r6n"];
const n8e=m3["n8e"];
const iRe=m3["iRe"];
const L_e=m3["L_e"];
const gue=m4["gue"];
const r6=m1["r6"];
const s6n=ports["backgroundText"];
const Sp=ports["outputPath"];
const dt=m5["dt"];
const BN=ports["taskEnabled"];
const k2n=ports["backgroundAnnouncement"];
const dlt=m1["dlt"];
return {mapToolResultToToolResultBlockParam({interrupted:e,stdout:n,stderr:r,isImage:s,backgroundTaskId:g,backgroundedByUser:h,backgroundedToDeliverMessage:b,backgroundedByTurnAbort:w,timedOutAfterMs:D,backgroundEndsWithFinalResponse:j,backgroundCwdHint:z,structuredContent:K,persistedOutputPath:he,persistedOutputSize:_e,staleReadFileStateHint:ke,ghRateLimitHint:be},ve){if(K&&K.length>0)return{tool_use_id:ve,type:"tool_result",content:K};if(s){let $e=r6n(n,ve);if($e){let Ne=typeof r==="string"?r.trim():"";if(Ne)return{...$e,content:[...Array.isArray($e.content)?$e.content:[],{type:"text",text:Ne}]};return $e}}let Te=n;if(n)Te=n.replace(/^(\s*\n)+/,""),Te=Te.trimEnd();if(he){let $e=n8e(Te,iRe);Te=L_e({filepath:he,originalSize:_e??0,isJson:!1,preview:$e.preview,hasMore:$e.hasMore,truncatedAtBytes:(_e??0)>=gue?gue:void 0})}let xe=r.trim();if(e){if(r)xe+=r6;xe+="<error>Command was aborted before completion</error>"}let Pe="";if(g){if(Pe=s6n({backgroundTaskId:g,outputPath:Sp(g),backgroundedByUser:h,backgroundedToDeliverMessage:b,backgroundedByTurnAbort:w,timedOutAfterMs:D,reapedAtFinalResponse:j,readToolName:dt}),z)Pe+=`
${z}`;if(BN())return{tool_use_id:ve,type:"tool_result",content:k2n(g,[xe,Pe].filter(Boolean).join(`
`),{backgroundedByUser:h,ending:dlt(j===!0)})}}return{tool_use_id:ve,type:"tool_result",content:[Te,xe,Pe,ke,be].filter(Boolean).join(`
`),is_error:e}}}.mapToolResultToToolResultBlockParam;
}
