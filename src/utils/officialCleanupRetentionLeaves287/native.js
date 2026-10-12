// Complete original image and per-setting cleanup leaf implementations.
export function createCleanupRetentionLeaves287({ae,se,we,q,t,Qk}){
var Pe="image-cache";
async function ie(){let e=ae(),r=se(we(),Pe),n=q();try{let s;try{s=await e.readdir(r)}catch{return}for(let a of s){if(a.name===n)continue;let p=se(r,a.name);try{await e.rm(p,{recursive:!0,force:!0}),t(`Cleaned up old image cache: ${p}`)}catch{}}try{if((await e.lstat(r)).isDirectory())await e.rmdir(r)}catch{}}catch{}}
function de(e,r){let n=Qk(e)[0]??r;if(n===0)return null;return new Date(Date.now()-n*24*60*60*1000)}
return {images:ie,settingCutoff:de};
}
