export function create(ports){const {requireOriginal287,importOriginal287,x,c}=ports;
async function w7r(e){return(await x(e)).url};
function T7r(e){let o=e.trim().replace(/\/+$/,"").replace(/^[a-z][a-z0-9+.-]*:\/\/[^/]*/i,"").match(/(?:[:/]|^)([^/:]+)\/([^/:]+?)(?:\.git)?$/);if(!o?.[1]||!o[2])return null;if(!c(o[1])||!c(o[2]))return null;return{owner:o[1],name:o[2]}};
return {"w7r":w7r,"T7r":T7r};}
