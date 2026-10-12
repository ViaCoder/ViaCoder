// Generated: fixed official 2.1.287 complete local output-style k and stateless mTe. No state owner.
export function createOutputStyleLocal287(p){
const {u1,oe,qJ,OHt,yin,Hz,dR,Kt,tr,_in,hn,Bo,yR,i,SJt,S,er,SP}=p;
var _="Couldn't save the output style (detail withheld on this connection).";
var C="a custom style";
async function k(O,o){let s=await u1(oe(),o.storageV5),u=qJ(o),m=Object.keys(s),a=u?m.filter((e)=>OHt(s[e])):m,n=mTe(),p=u?`
${yin}`:"",r=O.trim(),l=r.toLowerCase(),t=r?a.find((e)=>e.toLowerCase()===l):void 0;if(t===void 0){if(r&&!Hz.includes(l)&&!dR.includes(l))return{type:"text",value:`Unknown output style "${Kt(r)}". Available styles: ${a.map(Kt).join(", ")}${p}`};let e=a.map((c)=>{let d=s[c]?.description,f=Kt(c),g=c===n?" (current)":"";return d?`- ${f}${g}: ${Kt(d)}`:`- ${f}${g}`});return{type:"text",value:`Output style: ${u&&!OHt(s[n])?C:Kt(n)}

Available styles:
${e.join(`
`)}

Usage: /output-style <style>${p}`}}if(t===n)return{type:"text",value:`Output style is already ${Kt(t)}`};if(!tr("localSettings"))return{type:"text",value:_in};let y=await hn("localSettings",{outputStyle:t},void 0,o.storageV5);if(y.error)return{type:"text",value:Bo(o.session)?_:`Could not save output style: ${y.error.message}`};return yR("output_style"),i("tengu_output_style_changed",{style:SJt(t),source:S("slash_command"),settings_source:S("localSettings")}),{type:"text",value:`Output style set to ${Kt(t)}`}};
function mTe(){return er()?.outputStyle||SP};
return {call:k};
}
