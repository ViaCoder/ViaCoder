// Official npm 2.1.283: entire module declarations unchanged; imports adapted. See NOTICE.
import{_u}from"./host.js";
import{Mt}from"./host.js";
import{_k}from"./host.js";
import{Et,x}from"./host.js";
function Svt(){return _k("autoContinueAtUsageLimit")[0]}
function j5t(e){return Svt()??e==="absent"}
var u="tengu_marble_heron";
function qRn(){let e=n();return o(e)?e:{}}
function pwe(){let e=n();return r(o(e)?e.enabled:e)}
function bvt(){return _u()&&!Et()&&!Mt()}
function Rso(){return bvt()&&pwe()}
function W5t(){return r(qRn().autoArm)}
function n(){return x(u,{})}
function o(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}
function r(e){if(e===void 0)return!0;if(typeof e==="string"){let t=e.trim().toLowerCase();return t!==""&&t!=="false"&&t!=="0"}return Boolean(e)}
export{Svt,j5t,qRn,pwe,bvt,Rso,W5t};
