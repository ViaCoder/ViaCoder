// Complete original npm 2.1.287 declarations; explicit existing-owner ports.
export function createOAuthDescriptorReaders287(ports){
const {D,Hm:ng,P,L:x,de,w,R:k}=ports;
function iWe(e,{maxBytes:n,symlinkAtPath:r="follow",regularFileOnly:o=r==="refuse"}){using f=ng`fs.readBoundedSync(${e}, max ${n} bytes)`;let i="r";if(r==="refuse")i=w.O_RDONLY|w.O_NOFOLLOW|w.O_NONBLOCK;else if(o)i=w.O_RDONLY|w.O_NONBLOCK;let s=k(e,i);try{if(o){if(!D(s).isFile())throw Object.assign(Error("EINVAL: not a regular file"),{code:"EINVAL"})}return ie(s,e,n)}finally{x(s)}};
function $8o(e,{maxBytes:n}){using r=ng`fs.readInheritedFdSync(fd ${e}, max ${n} bytes)`;let o=D(e);if(!o.isSocket()&&!o.isFIFO())throw new P(`refusing to read fd ${e}: not a pipe or socket`,"readInheritedFdSync: descriptor is not a pipe or socket");return he(e,n)};
function frr(e){try{return D(e).isSocket()}catch{return!1}};
function he(e,n){try{return ie(e,`fd ${e}`,n,{untilNewline:!0})}finally{x(e)}};
function ie(e,n,r,{untilNewline:o=!1}={}){let f=[],i=0,s=Buffer.alloc(8192);while(!0){let u=de(e,s,0,s.length,null);if(u===0)return Buffer.concat(f).toString("utf8");if(i+=u,i>r)throw new P(`refusing to read ${n}: content exceeds ${r} byte limit`,"readBoundedSync: content exceeds byte limit");let y=o?s.subarray(0,u).indexOf(10):-1;if(f.push(Buffer.from(s.subarray(0,y===-1?u:y+1))),y!==-1)return Buffer.concat(f).toString("utf8")}};
return {bounded:iWe,inherited:$8o,isSocket:frr};
}
