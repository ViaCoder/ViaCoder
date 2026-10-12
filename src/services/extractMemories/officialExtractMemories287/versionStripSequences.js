// Complete pinned official 2.1.287 extract lifecycle; see provenance.json.
export function createExtractVersionStripSequences287(ports){
const {Nz}=ports;
function _(e){let n=e.replace(/[\p{Cf}\p{Co}\p{Cn}]/gu,"");return n=n.replace(/[\u200B-\u200F]/g,"").replace(/[\u202A-\u202E]/g,"").replace(/[\u2066-\u2069]/g,"").replace(/[\uFEFF]/g,"").replace(/[\uE000-\uF8FF]/g,""),n};
function bf(e){let n=Nz(e);for(let r=0;r<10;r++){let t=_(n);if(t===n)return n;n=t}return n};
return {bf};
}
