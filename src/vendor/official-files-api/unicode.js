// Official npm 2.1.283: complete unchanged declarations.
function wt(e){return Bun.stripANSI(e)}
var s="\\p{Default_Ignorable_Code_Point}\\u2800",pde=`\\p{Cc}\\p{Cf}\\p{Cs}\\p{Co}\\p{Cn}\\u2028\\u2029${s}`,p=new RegExp(`[${pde}]+`,"gu"),o="\\u200D\\uFE0E\\uFE0F",c=new RegExp(`(?:(?![${o}])[${pde}])+`,"gu"),u=new RegExp(`(?:(?![${o}\\n])[${pde}])+`,"gu"),a=new RegExp(`(?<!\\S)[${o}]+`,"gu"),g=/\p{Cs}/gu;
function JH(e,n,r){let t=r?.keepNewlines===!0||r?.keepEmojiJoiners===!0,i=wt(e.replace(g,"\u200B")).replace(r?.keepNewlines?u:t?c:p,n);return t?i.replace(a,""):i}
export {JH};
