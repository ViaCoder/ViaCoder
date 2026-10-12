// Complete original Hl; same existing DOM, Yoga, focus and raw-mode ports.
export function createNativeChildRemoval287({cs,cE,ly}){return function Hl(n,u){if(cs(n,u),cE(u),u.nodeName==="#text")return;let f=n;while(f.parentNode)f=f.parentNode;if(!f.focusManager)return;f.focusManager.handleNodeRemoved(u,f),ly(u,f)}}
