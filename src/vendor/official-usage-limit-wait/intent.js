// Official npm 2.1.283: entire module declarations unchanged; imports adapted. See NOTICE.
import{K}from"./host.js";
var wvt=86400000;
function RG(e){return e.status==="rejected"&&e.resetsAt!==void 0&&Number.isFinite(e.resetsAt)&&e.isUsingOverage!==!0&&e.overageInUse!==!0}
class t{#e=null;get provided(){return this.#e!==null}provide(e){this.#e=e}hasIntent(){return this.#e?.()??!1}}
var G5t=new K(()=>new t);
export{wvt,RG,G5t};
