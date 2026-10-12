// Original worker constructor/options; only the package-local URL is adapted.
const Nvt=()=>new URL('../../../plugins/functionHooks/hooks-worker/hooks-worker.js',import.meta.url);
var vts=9;
var Ets=3;
function geo(){let e=new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT*vts),n=new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT*Ets);return{worker:new Worker(Nvt(),Ovt(e,n)),stamp:new Int32Array(e),marks:new Int32Array(n)}};
var Ovt=(e,n)=>({name:"hooks",workerData:{stamp:e,marks:n}});
export {geo as createHooksWorker287};
