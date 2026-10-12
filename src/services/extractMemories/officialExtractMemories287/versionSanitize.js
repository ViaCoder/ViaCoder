// Complete pinned official 2.1.287 extract lifecycle; see provenance.json.
export function createExtractVersionSanitize287(ports){
const {M2e,bf}=ports;
function DM(t){let r="";for(let n of M2e(bf(t.replace(/\r\n?|[\u2028\u2029]/g,`
`)))){let e=n.codePointAt(0),o=e!==9&&e!==10&&(e<32||e>=127&&e<=159);r+=o?"\uFFFD":n}return r};
return {DM};
}
