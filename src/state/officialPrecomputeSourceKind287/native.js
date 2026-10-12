// Complete fixed287 pure key/source classification. No telemetry sender or state.
function r(n){return n};
function bn(n){return r(n)};
function YPe(e){if(e?.startsWith("agent:custom:"))return"agent:custom";return e};
function rs(e){return bn(YPe(e)??"")};
function Cet(e){return e??"main"};
export {Cet,rs,YPe};
