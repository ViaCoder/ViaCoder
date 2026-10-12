// Full official 2.1.287 declarations. Only the import boundary is transported.
export function createSkillsDialog287(ports){
const {Ro,QPr,Nc,Lo,nan,_ce,wP,TTe,tr,ge,gK,ow,Gjt}=ports;
function XOr(e){return[e.name,e.description,e.whenToUse].filter(Boolean).join(" ")}
function DFe(e,n){return Nc(XOr(e),n)}
function gKe(e){return e.type==="prompt"&&e.loadedFrom==="syncedSkills"&&e.unqualifiedName!=null&&(e.aliases?.includes(e.unqualifiedName)??!1)?e.unqualifiedName:void 0}
function COt(e){let n=gKe(e);return n!==void 0&&Gjt(n)?n:void 0}
function x(e){return e.type==="prompt"&&(e.loadedFrom==="skills"||e.loadedFrom==="syncedSkills"||e.loadedFrom==="commands_DEPRECATED"||e.loadedFrom==="plugin"||e.loadedFrom==="mcp")}
function Cfr(e){let o=nan(e);if(o)return{value:o.value,source:o.source==="policySettings"?"policy":"flag"};if(!_ce(e.name))return{value:e.disableModelInvocation?"user-invocable-only":"on",source:"reserved-name"};if(e.disableModelInvocation)return{value:"user-invocable-only",source:"author"};if(e.source==="plugin")return{value:"on",source:"plugin"};return}
function w(e,{skipLocalBareKey:o=!1}={}){let i=(l)=>tr(l)?ge(l)?.skillOverrides:void 0,n=(l)=>wP(i("projectSettings"),l)??wP(i("userSettings"),l),r=TTe(e),d=o?void 0:wP(ge("localSettings")?.skillOverrides,r);return n(e.name)??(r!=null?d??n(r):void 0)}
function Fve(e,o){if(o==="syncedSkills")return gK;switch(e){case"mcp":case"plugin":return e;case"memoryStore":return"memory store";case"bundled":case"builtin":return"built-in";default:return ow(e)}}
function LDe(e){let o=COt(e);return o!==void 0&&Lo(e)===o?o:e.name}
function NDe(e,{sortByTokens:o=!1}={}){let i=e.filter(x);if(o){let n=new Map(i.map((r)=>[r,DFe(r)]));return i.sort((r,d)=>(n.get(d)??0)-(n.get(r)??0)||LDe(r).localeCompare(LDe(d)))}return i.sort((n,r)=>Fve(n.source,n.loadedFrom).localeCompare(Fve(r.source,r.loadedFrom))||LDe(n).localeCompare(LDe(r)))}
function yOn(){return Object.assign(Object.create(null),ge("localSettings")?.skillOverrides)}
function FDe(e,o=yOn()){let i=new Map,n=new Map;for(let r of e){let d=w(r);if(d)i.set(r.name,d);let l=Cfr(r);if(l)n.set(r,l)}return{localOverrides:o,lowerTier:i,locked:n}}
function $De(e,o){let i=Object.create(null);for(let n of e){if(Object.hasOwn(i,n.name))continue;i[n.name]=o.locked.get(n)?.value??wP(o.localOverrides,n.name)??o.lowerTier.get(n.name)??"on"}return i}
function g({commands:s,bytesPerToken:m}){Ro();let n=NDe(s),r=FDe(n),i=$De(n,r),t=new Map;for(let e of n){let o=r.locked.get(e);if(o&&!t.has(e.name))t.set(e.name,o)}let a=new Map;for(let e of s)if(!a.has(e.name))a.set(e.name,e);return{skills:n.map((e)=>{let o=t.get(e.name),d=QPr(e)&&a.get(e.name)===e;return{name:e.name,display_name:Lo(e),description:e.description??"",source:Fve(e.source,e.loadedFrom),tokens:DFe(e,m),state:o?.value??i[e.name]??"on",...o&&{locked_by:o.source},advertised:d,handles:{...e.unqualifiedName!==void 0&&{unqualified_name:e.unqualifiedName},...e.aliases?.length&&{aliases:[...e.aliases]},...e.bareNameReserved!==void 0&&{bare_name_reserved:e.bareNameReserved}}}})}}
return {build:g};
}

const skillsCommandsFactory287=new Function("p","with(p){function cn(b=v().mcp.commands){return KEt(Ro,b,dde())};return cn}");
export function createSkillsDialogCommands287(ports){return skillsCommandsFactory287(ports)}
