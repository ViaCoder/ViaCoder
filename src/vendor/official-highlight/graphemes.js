var a=null;
function Sa(){if(!a)a=new Intl.Segmenter(void 0,{granularity:"grapheme"});return a}
function y(e){for(let t=0;t<e.length;t++){let r=e.charCodeAt(t);if(r>=128||r===13)return!0}return!1}
function mhn(e){if(e.length<2)return e;let t=e.join("");if(!y(t))return e;let r=[],n="",i=0,o=e[0].length;for(let{segment:h,index:I}of Sa().segment(t)){while(I>=o&&i<e.length-1)r.push(n),n="",i++,o+=e[i].length;n+=h}r.push(n);while(r.length<e.length)r.push("");return r}
export {mhn};
