export interface CatalogTool287 {name:string}
export interface ToolCatalogPorts287<T extends CatalogTool287> {
 readonly Js: ()=>T | null
 readonly Wr: ()=>T | null
 readonly cXt: T | null
 readonly $a: ()=>boolean
 readonly fi: T | null
 readonly qR: T | null
 readonly KR: T | null
 readonly d7: ()=>ReadonlySet<string>
 readonly _V: T | null
 readonly Sv: T | null
 readonly RC: T | null
 readonly hv: T | null
 readonly ni: null | (()=>readonly (T & {underlyingV1ToolName:string})[])
 readonly vce: T | null
 readonly go: readonly T[]
 readonly gy: T | null
 readonly mo: T | null
 readonly lo: T | null
 readonly io: T | null
 readonly ze: T | null
 readonly o5: T | null
 readonly Io: T | null
 readonly Jze: T | null
 readonly RXt: T | null
 readonly Zs: T | null
 readonly ei: T | null
 readonly Fr: T | null
 readonly dk: ()=>boolean
 readonly mr: T | null
 readonly gr: T | null
 readonly Tr: T | null
 readonly wr: T | null
 readonly Dr: T | null
 readonly ri: ()=>readonly T[]
 readonly Lr: T | null
 readonly Nr: T | null
 readonly HRe: ()=>boolean
 readonly ft: T | null
 readonly krt: ()=>boolean
 readonly nr: T | null
 readonly lr: T | null
 readonly kt: ()=>T | null
 readonly ti: ()=>T | null
 readonly jr: T | null
 readonly Vt: T | null
 readonly Mr: T | null
 readonly ce: T | null
 readonly Tt: T | null
 readonly qs: readonly T[]
 readonly Cr: ()=>boolean
 readonly Gs: readonly T[]
 readonly to: T | null
 readonly vr: T | null
 readonly Rr: T | null
 readonly Or: T | null
 readonly Xt: T | null
 readonly jt: T | null
 readonly oi: readonly T[]
 readonly xr: T | null
 readonly Vs: readonly T[]
 readonly Ar: T | null
 readonly eo: T | null
 readonly Ys: T | null
 readonly Xs: T | null
 readonly Qs: T | null
 readonly Pr: T | null
 readonly Ce: T | null
 readonly zr: T | null
 readonly bt: ()=>T | null
 readonly $r: T | null
 readonly Br: ()=>T | null
 readonly zI: T | null
 readonly VI: T | null
 readonly FB: T | null
 readonly a: {readonly CLAUDE_CODE_ENABLE_REFRESH_MCP_TOOLS:boolean}
 readonly ht: T | null
 readonly Vh: ()=>boolean
 readonly Pjn: T | null
 readonly zIr: T | null
 readonly Lo: T | null
}
export function createToolCatalog287<T extends CatalogTool287>(ports:ToolCatalogPorts287<T>):()=>Array<T|null>
export interface ToolCatalogQualifiersPorts287 {Le(value:string):boolean;Neo():boolean;a:{readonly CLAUDE_CODE_ENTRYPOINT:string|undefined;readonly CLAUDE_CODE_ENABLE_TASKS:boolean|undefined};$a():boolean;Vde(name:string):CatalogTool287|undefined;co:string;Jr:string}
export function createToolCatalogQualifiers287(ports:ToolCatalogQualifiersPorts287):{bE():boolean;d7():ReadonlySet<string>;dk():boolean;HRe():boolean;krt():boolean;Wr():null}
