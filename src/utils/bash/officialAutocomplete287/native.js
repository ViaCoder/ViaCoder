// Generated from pinned official 2.1.287 whole declarations; see provenance.json.
export function createBashAutocomplete287(ports){
const {cb,fO,ku}=ports;
var he=1e4;
var Be=new Set(["export","declare","typeset","readonly","local","unset","unsetenv"]);
var He=new Set(["word","string","raw_string","number"]);
var G=new Set(["command_substitution","process_substitution"]);
var q=new Set(["command","declaration_command"]);
async function rYn(e){if(!e||e.length>he)return null;try{let t=cb().parse(e);if(!t)return null;let s=Mue(t,null),n=Ze(s);return{rootNode:t,envVars:n,commandNode:s,originalCommand:e}}catch{return null}};
function Mue(e,t){let{type:s,children:n}=e;if(q.has(s))return e;if(s==="variable_assignment"&&t)return t.children.find((a)=>q.has(a.type)&&a.startIndex>e.startIndex)??null;if(s==="pipeline"){for(let a of n){let r=Mue(a,e);if(r)return r}return null}if(s==="redirected_statement")return n.find((a)=>q.has(a.type))??null;for(let a of n){let r=Mue(a,e);if(r)return r}return null};
function Ze(e){if(!e||e.type!=="command")return[];let t=[];for(let s of e.children)if(s.type==="variable_assignment")t.push(s.text);else if(s.type==="command_name"||s.type==="word")break;return t};
function gXe(e){if(e.type==="declaration_command"){let n=e.children[0];return n&&Be.has(n.text)?[n.text]:[]}let t=[],s=!1;for(let n of e.children){if(n.type==="variable_assignment")continue;if(n.type==="command_name"||!s&&n.type==="word"){s=!0;let a=n.children[0]??n;if(a.type==="concatenation")t.push(a.children.some((r)=>G.has(r.type))?a.text:a.children.map(C).join(""));else t.push(C(a));continue}if(He.has(n.type))t.push(C(n));else if(n.type==="concatenation"){if(n.children.some((a)=>G.has(a.type)))break;t.push(n.children.map(C).join(""))}else if(G.has(n.type))break}return t};
function C(e){if(e.type==="word")return e.text.replace(/\\(.)/g,"$1");return Ge(e.text)};
function Ge(e){return e.length>=2&&(e[0]==='"'&&e.at(-1)==='"'||e[0]==="'"&&e.at(-1)==="'")?e.slice(1,-1):e};
async function KHn(e){if(!e||e.includes("/")||e.includes("\\"))return null;if(e.includes(".."))return null;if(e.startsWith("-")&&e!=="-")return null;if(fO()&&ku())return null;try{let n=await import(`@withfig/autocomplete/build/${e}.js`);return n.default||n}catch{return null}};
return {parseCommand:rYn,extractCommandArguments:gXe,loadFigSpec:KHn};
}
