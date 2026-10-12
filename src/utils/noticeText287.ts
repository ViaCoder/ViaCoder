import {stripVTControlCharacters as t} from 'node:util'
// Original 287 chunk-69cpcmpv.js Dm [663,743), UTF-16 end-exclusive.
// One public sanitizer, used by Config values and canonical lifecycle notices.
export function Dm(r:string){return t(r).replace(/(?![\t\n])[\p{Cc}\p{Cf}\u2028\u2029]/gu,"")}
