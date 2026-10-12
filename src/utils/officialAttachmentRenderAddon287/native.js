// Complete original visible addon cases plus whole fe/BA/FA/I/wi closures.
export function createAttachmentRenderAddon287(ports){const w=ports.memoCache,e=ports.jsx,r=ports.jsxs,s=ports.Box,n=ports.Text,Ne=ports.MessageResponse;
function I(t,n,e=n+"s"){return t===1?n:e};
function wi(n){if(!Array.isArray(n))return[];return n.every((e)=>typeof e==="string")?n:n.filter((e)=>typeof e==="string")};
var b=Symbol.for("react.memo_cache_sentinel");
function fe(m){let x=w(4),{dimColor:l,children:p,color:h}=m,y=l===void 0?!0:l,C;if(x[0]!==p||x[1]!==h||x[2]!==y)C=e(s,{children:e(Ne,{children:e(n,{color:h,dimColor:y,wrap:"wrap",children:p})})}),x[0]=p,x[1]=h,x[2]=y,x[3]=C;else C=x[3];return C};
function BA(Wr){return Wr.trim()!==""};
function FA(qd){return qd.trim()!==""};
return function AttachmentRenderAddon287({attachment:l}){let E=w(262);switch(l.type){case"at_mention_reference":{let D;if(E[24]!==l.mentions)D=l.mentions.join(", "),E[24]=l.mentions,E[25]=D;else D=E[25];let W;if(E[26]!==D)W=r(fe,{children:["Referenced ",e(n,{bold:!0,children:D})," (not read)"]}),E[26]=D,E[27]=W;else W=E[27];return W}
case"selected_lines_in_diff":{let D;if(E[42]===b)D=e(n,{"aria-hidden":!0,children:"\u29C9 "}),E[42]=D;else D=E[42];let W;if(E[43]!==l.lineCount)W=e(n,{bold:!0,children:l.lineCount}),E[43]=l.lineCount,E[44]=W;else W=E[44];let H;if(E[45]!==l.lineCount)H=I(l.lineCount,"line"),E[45]=l.lineCount,E[46]=H;else H=E[46];let q;if(E[47]!==W||E[48]!==H)q=r(fe,{children:[D,"Selected"," ",W," ",H," from diff view"]}),E[47]=W,E[48]=H,E[49]=q;else q=E[49];return q}
case"tool_hosts_notice":{let D;if(E[241]!==l.lines){let Uo=wi(l.lines).filter(BA);D=Uo.length===0?null:e(fe,{children:Uo.join(`
`)});E[241]=l.lines,E[242]=D}else D=E[242];return D}
case"tool_hosts_correction":{let D;if(E[243]!==l.lines){let Ht=wi(l.lines).filter(FA);D=Ht.length===0?null:e(fe,{children:Ht.join(`
`)});E[243]=l.lines,E[244]=D}else D=E[244];return D}}};}
