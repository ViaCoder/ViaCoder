function et(e){return{params:{entrypoint:e.entrypoint,model:e.model},userAgent:`claude-code/${e.ccVersion}`}}
export {et as getBootstrapRequestContext287};
export function createBootstrapNormalAuthPorts287({nZ,fn,WK}){
function Xb(){try{return nZ()}catch{return null}}
function zp(){let e=fn()?.scopes;return Array.isArray(e)&&e.includes(WK)}
return {Xb,zp};
}
