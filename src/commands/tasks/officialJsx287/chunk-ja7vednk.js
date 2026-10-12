export function create(ports){const {requireOriginal287,importOriginal287,nn,Jt,ce,kt,Qt}=ports;
function AO(r,o,t=1000,a=0,e){let n=nn(),u=()=>Jt(Math.max(0,(e??Date.now())-r-a)),l=ce((f)=>{if(!o)return()=>{};let i,s=()=>{try{f()}finally{i=n.setTimeout(s,t)}};return i=n.setTimeout(s,t),()=>i()},[o,t,n]);return kt(l,u,u)};
function R$({onClose:r,onBack:o,onKill:t}){return Qt({"confirm:yes":r},{context:"Confirmation"}),function(e){if(e.key===" ")e.preventDefault(),r();else if(e.key==="left"&&o)e.preventDefault(),o();else if(e.key==="x"&&!e.ctrl&&!e.meta&&t)e.preventDefault(),t()}};
return {"AO":AO,"R$":R$};}
