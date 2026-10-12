export function create(ports){const {requireOriginal287,importOriginal287,Tu}=ports;
var Gkt="usage limit";
var O7t=` (after ${Gkt})`;
function xyr(e,t=!1){let r=Tu(e,t);if(r===void 0)return;return/^\d/.test(r)?`resets at ${r}`:`resets ${r}`};
function n(e){let t=xyr(e);return t===void 0?Gkt:`${Gkt} ${t}`};
function Fmo(e){return`Paused \xB7 ${n(e)}`};
return {"Gkt":Gkt,"O7t":O7t,"xyr":xyr,"n":n,"Fmo":Fmo};}
