// Complete pinned 287 /btw prefix and message-boundary closure.
export function createBtwPrefix287(ports){
const {JR,kA,kC,QB,mi}=ports;
async function $e(i){let c=Bur(i.messages),m=JR();if(m)return{systemPrompt:m.systemPrompt,userContext:m.userContext,systemContext:m.systemContext,toolUseContext:i,forkContextMessages:c,advisorModel:i.getAdvisorSetting()};let[k,C,h]=await Promise.all([kA(i.options.tools,i.options.mainLoopModel),kC(i.session,i.storageV5,i.credentials),QB(i.session,i.options.cacheBreakerPhrase)]);return{systemPrompt:mi(k),userContext:C,systemContext:h,toolUseContext:i,forkContextMessages:c,advisorModel:i.getAdvisorSetting()}}
function Bur(s,o=!0){let r=s.at(-1),a=o&&r?.type==="assistant"&&r.message.stop_reason===null;return ai(a?s.slice(0,-1):[...s])}
function ai(e,n){let r=hdt(e);return r===-1?e:e.slice(r)}
function hdt(e){for(let n=e.length-1;n>=0;n--){let r=e[n];if(r&&Bi(r))return n}return-1}
function Bi(e){return e?.type==="system"&&e.subtype==="compact_boundary"}
return {build:$e,selectMessages:Bur};
}
