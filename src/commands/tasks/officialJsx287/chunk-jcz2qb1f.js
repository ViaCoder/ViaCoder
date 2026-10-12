export function create(ports){const {requireOriginal287,importOriginal287,re,Jt}=ports;
var due=128;
function fmt(r){return re(r.replace(/[\p{Cc}\p{Cf}\p{Cs}\p{Zl}\p{Zp}\p{Variation_Selector}]+/gu,""),due)};
function s3(r){return re(fmt(r),8)};
function r2r(r){if(!Number.isFinite(r)||r<=0)return;return r<1000?`${r}ms`:Jt(r)};
return {"due":due,"fmt":fmt,"s3":s3,"r2r":r2r};}
