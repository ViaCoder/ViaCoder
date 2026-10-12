/** Complete stateless st from official 2.1.287 chunk-c9me9cp7.js.
 * UTF-16 [3893,4046) SHA256 de1b282895b7dbcecff698ea854c13e16c517ec221c5594b2bd59e07b30e47e7.
 * Original mutation/hostile-value behavior is retained; no new error owner. */
export const annotatePreToolHookError287 = <T>(n:T,e:string):T=>{try{if(n!==null&&typeof n==="object"&&!("telemetryMessage"in n)&&Object.isExtensible(n))Object.assign(n,{telemetryMessage:e})}catch{}return n}
