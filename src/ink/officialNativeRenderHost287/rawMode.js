// Complete original DOM raw-mode reference functions on the existing root/App.
const Zc=new Set(["onKeyDown","onKeyDownCapture","onPaste","onPasteCapture","onWheel","onWheelCapture"]);
function dE(n){let u=n._eventHandlers;if(!u)return!1;for(let f of Zc)if(u[f]!=null)return!0;return!1}
function oy(n,u){if(n.setRawMode)n.setRawMode(u>0);else n._pendingRawModeDelta=(n._pendingRawModeDelta??0)+u}
function ey(n,u){let f=dE(n);if(f===!!n._holdsRawModeRef)return;n._holdsRawModeRef=f,oy(u,f?1:-1)}
function ly(n,u){if(n._holdsRawModeRef)n._holdsRawModeRef=!1,oy(u,-1);for(let f of n.childNodes)if(f.nodeName!=="#text")ly(f,u)}
export{Zc as RAW_MODE_HANDLER_PROPS287,dE as hasRawModeHandlers287,ey as syncRawModeReference287,ly as releaseRawModeReferences287};
