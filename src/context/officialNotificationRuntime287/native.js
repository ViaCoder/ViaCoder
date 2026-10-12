// Complete original287 pinned sort/item/render declarations; no state owner.
export function createPinnedNotificationDisplay287({w,e,r,n,Sb,jme,Znt}){
function TEt(Ve,qe){return Znt[Ve.priority]-Znt[qe.priority]};
function xEt(ze){return e(pre,{notice:ze},ze.key)};
function pre(h){let X=w(14),{notice:v}=h,D=v.wrap?"wrap":"truncate";if("jsx"in v){const N=v.color??"warning";let Se;if(X[0]!==v.jsx||X[1]!==N||X[2]!==D)Se=r(n,{color:N,wrap:D,children:[Sb," ",v.jsx]}),X[0]=v.jsx,X[1]=N,X[2]=D,X[3]=Se;else Se=X[3];return Se}if("segments"in v){const N=v.color??"warning";let Se;if(X[4]!==v.segments)Se=e(jme,{segments:v.segments}),X[4]=v.segments,X[5]=Se;else Se=X[5];let _e;if(X[6]!==N||X[7]!==Se||X[8]!==D)_e=r(n,{color:N,wrap:D,children:[Sb," ",Se]}),X[6]=N,X[7]=Se,X[8]=D,X[9]=_e;else _e=X[9];return _e}const N=v.color??"warning";let Se;if(X[10]!==v.text||X[11]!==N||X[12]!==D)Se=r(n,{color:N,wrap:D,children:[Sb," ",v.text]}),X[10]=v.text,X[11]=N,X[12]=D,X[13]=Se;else Se=X[13];return Se};
return {compare:TEt,item:xEt,Notice:pre};
}
