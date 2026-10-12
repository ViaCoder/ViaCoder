// Complete official 2.1.287 public declarations. Host imports only; no body rewriting.
function create_darwin_arm64(ports){
const P=ports.SafeError;
const Ln=ports.isUnc;
const By=ports.hasParent;
const pm=ports.isNetwork;
const Sf=ports.ancestry;
const sy=ports.filesystem;
const IQr=ports.sanitize;
const OJ=ports.marketplace;
const JSt=ports.githubSlug;
const sZe=ports.officialMarketplace;
var XY="claude-cli";
function h(e,{allowNewlineAndTab:t=!1}={}){for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=31||r>=127&&r<=159){if(t&&(r===10||r===9))continue;return!0}}return!1}
var u=/^[\w.-]+\/[\w.-]+$/;
var p=5000;
var c=4096;
var w=/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/;
var f=/^(?:https:\/\/\w[\w.-]*(?::\d{1,5})?(?:\/[\w.~:/+-]*)?|\w[\w-]{0,63}@\w[\w.-]*:[\w.~:/+-]+)$/;
var g=/^\w[\w./-]{0,127}$/;
var d=256;
var E=OJ.repo;
function Zcr(e,t=sy){if(Ln(e)||pm(e))throw Error(`Invalid cwd in deep link: UNC / network paths are not supported, got "${e}"`);if(By(e))throw new P(`Invalid cwd in deep link: parent-directory segments are not supported, got "${e}"`,"Invalid cwd in deep link: parent-directory segments are not supported");if(!e.startsWith("/")&&!/^[a-zA-Z]:[/\\]/.test(e))throw Error(`Invalid cwd in deep link: must be an absolute path, got "${e}"`);if(h(e))throw Error("Deep link cwd contains disallowed control characters");if(/(?![\u200C\u200D\uFE00-\uFE0F\u{E0100}-\u{E01EF}])[\p{Default_Ignorable_Code_Point}\u2028\u2029\u2800\uFFF9-\uFFFB\u{1D173}-\u{1D17A}]/u.test(e))throw Error("Deep link cwd contains invisible or bidirectional control characters");if(e.length>c)throw Error(`Deep link cwd exceeds ${c} characters (got ${e.length})`);if(Sf(t,e,{surfaceNetworkRaw:!0,unreadableAncestry:"unverified"})!==void 0)throw new P(`Invalid cwd in deep link: the path resolves through a network link, got "${e}"`,"Invalid cwd in deep link: the path resolves through a network link")}
function edr(e){let t=IQr(e).replace(/\r\n?/g,`
`);if(h(t,{allowNewlineAndTab:!0}))throw Error("Deep link query contains disallowed control characters");if(t.length>p)throw Error(`Deep link query exceeds ${p} characters (got ${t.length})`);return t}
function tdr(e){if(!w.test(e))throw Error('Invalid plugin in deep link: expected a plugin name of ASCII letters, digits, ".", "_" and "-" (at most 100 characters)')}
function Qtt(e){if(e.length>d)throw new P(`Deep link marketplace exceeds ${d} characters (got ${e.length})`,"Deep link marketplace exceeds the length limit");let t=e.indexOf("#"),n=t===-1?e:e.slice(0,t),r=t===-1?void 0:e.slice(t+1),i=n.indexOf("@");if(r===void 0&&i!==-1&&!n.includes(":"))r=n.slice(i+1),n=n.slice(0,i);if(n.includes("%"))throw Error("Invalid marketplace in deep link: percent-encoded characters are not allowed in the source");if(!JSt.test(n)&&!f.test(n))throw Error('Invalid marketplace in deep link: expected a GitHub "owner/repo", an https:// URL, or a git SSH URL like git@host:owner/repo.git');if(/(?:^|[/:])\.\.?(?=[/:]|$)/.test(n)||n.replace(/^https:\/\//,"").includes("//"))throw Error('Invalid marketplace in deep link: ".", ".." and empty path segments are not allowed');if(r!==void 0&&!g.test(r))throw Error('Invalid marketplace in deep link: the git ref after "#" or "@" may only contain letters, digits, ".", "_", "-" and "/"');if(r!==void 0&&sZe(n))throw Error("Invalid marketplace in deep link: an Anthropic marketplace can't be pinned to a git ref")}
function vao(e){let t=e.startsWith(`${XY}://`)?e:e.startsWith(`${XY}:`)?e.replace(`${XY}:`,`${XY}://`):null;if(!t)throw Error(`Invalid deep link: expected ${XY}:// scheme, got "${e}"`);let n;try{n=new URL(t)}catch{throw Error(`Invalid deep link URL: "${e}"`)}if(n.hostname==="install-plugin"){if(n.hash)throw Error('Invalid deep link: install-plugin has a raw "#"; encode a marketplace ref as %23 (marketplace=owner/repo%23v1)');let o=n.searchParams.get("plugin");if(!o)throw Error("Invalid deep link: install-plugin requires a plugin parameter");tdr(o);let l=n.searchParams.get("marketplace")??E;return Qtt(l),{action:"install-plugin",plugin:o,marketplace:l}}if(n.hostname!=="open")throw Error(`Unknown deep link action: "${n.hostname}"`);let r=n.searchParams.get("cwd")??void 0,i=n.searchParams.get("repo")??void 0,a=n.searchParams.get("q");if(r)Zcr(r);if(i&&!u.test(i))throw Error(`Invalid repo in deep link: expected "owner/repo", got "${i}"`);let s;if(a&&a.trim().length>0)s=edr(a.trim());return{action:"open",query:s,cwd:r,repo:i}}
return {protocol:XY,cwd:Zcr,query:edr,plugin:tdr,marketplace:Qtt,parse:vao};
}
function create_darwin_x64(ports){
const H=ports.SafeError;
const Dn=ports.isUnc;
const By=ports.hasParent;
const pm=ports.isNetwork;
const Sf=ports.ancestry;
const sy=ports.filesystem;
const IQr=ports.sanitize;
const PJ=ports.marketplace;
const JSt=ports.githubSlug;
const sZe=ports.officialMarketplace;
var XY="claude-cli";
function h(e,{allowNewlineAndTab:t=!1}={}){for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=31||r>=127&&r<=159){if(t&&(r===10||r===9))continue;return!0}}return!1}
var u=/^[\w.-]+\/[\w.-]+$/;
var p=5000;
var c=4096;
var w=/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/;
var f=/^(?:https:\/\/\w[\w.-]*(?::\d{1,5})?(?:\/[\w.~:/+-]*)?|\w[\w-]{0,63}@\w[\w.-]*:[\w.~:/+-]+)$/;
var g=/^\w[\w./-]{0,127}$/;
var d=256;
var E=PJ.repo;
function Zcr(e,t=sy){if(Dn(e)||pm(e))throw Error(`Invalid cwd in deep link: UNC / network paths are not supported, got "${e}"`);if(By(e))throw new H(`Invalid cwd in deep link: parent-directory segments are not supported, got "${e}"`,"Invalid cwd in deep link: parent-directory segments are not supported");if(!e.startsWith("/")&&!/^[a-zA-Z]:[/\\]/.test(e))throw Error(`Invalid cwd in deep link: must be an absolute path, got "${e}"`);if(h(e))throw Error("Deep link cwd contains disallowed control characters");if(/(?![\u200C\u200D\uFE00-\uFE0F\u{E0100}-\u{E01EF}])[\p{Default_Ignorable_Code_Point}\u2028\u2029\u2800\uFFF9-\uFFFB\u{1D173}-\u{1D17A}]/u.test(e))throw Error("Deep link cwd contains invisible or bidirectional control characters");if(e.length>c)throw Error(`Deep link cwd exceeds ${c} characters (got ${e.length})`);if(Sf(t,e,{surfaceNetworkRaw:!0,unreadableAncestry:"unverified"})!==void 0)throw new H(`Invalid cwd in deep link: the path resolves through a network link, got "${e}"`,"Invalid cwd in deep link: the path resolves through a network link")}
function edr(e){let t=IQr(e).replace(/\r\n?/g,`
`);if(h(t,{allowNewlineAndTab:!0}))throw Error("Deep link query contains disallowed control characters");if(t.length>p)throw Error(`Deep link query exceeds ${p} characters (got ${t.length})`);return t}
function tdr(e){if(!w.test(e))throw Error('Invalid plugin in deep link: expected a plugin name of ASCII letters, digits, ".", "_" and "-" (at most 100 characters)')}
function Qtt(e){if(e.length>d)throw new H(`Deep link marketplace exceeds ${d} characters (got ${e.length})`,"Deep link marketplace exceeds the length limit");let t=e.indexOf("#"),n=t===-1?e:e.slice(0,t),r=t===-1?void 0:e.slice(t+1),i=n.indexOf("@");if(r===void 0&&i!==-1&&!n.includes(":"))r=n.slice(i+1),n=n.slice(0,i);if(n.includes("%"))throw Error("Invalid marketplace in deep link: percent-encoded characters are not allowed in the source");if(!JSt.test(n)&&!f.test(n))throw Error('Invalid marketplace in deep link: expected a GitHub "owner/repo", an https:// URL, or a git SSH URL like git@host:owner/repo.git');if(/(?:^|[/:])\.\.?(?=[/:]|$)/.test(n)||n.replace(/^https:\/\//,"").includes("//"))throw Error('Invalid marketplace in deep link: ".", ".." and empty path segments are not allowed');if(r!==void 0&&!g.test(r))throw Error('Invalid marketplace in deep link: the git ref after "#" or "@" may only contain letters, digits, ".", "_", "-" and "/"');if(r!==void 0&&sZe(n))throw Error("Invalid marketplace in deep link: an Anthropic marketplace can't be pinned to a git ref")}
function vao(e){let t=e.startsWith(`${XY}://`)?e:e.startsWith(`${XY}:`)?e.replace(`${XY}:`,`${XY}://`):null;if(!t)throw Error(`Invalid deep link: expected ${XY}:// scheme, got "${e}"`);let n;try{n=new URL(t)}catch{throw Error(`Invalid deep link URL: "${e}"`)}if(n.hostname==="install-plugin"){if(n.hash)throw Error('Invalid deep link: install-plugin has a raw "#"; encode a marketplace ref as %23 (marketplace=owner/repo%23v1)');let o=n.searchParams.get("plugin");if(!o)throw Error("Invalid deep link: install-plugin requires a plugin parameter");tdr(o);let l=n.searchParams.get("marketplace")??E;return Qtt(l),{action:"install-plugin",plugin:o,marketplace:l}}if(n.hostname!=="open")throw Error(`Unknown deep link action: "${n.hostname}"`);let r=n.searchParams.get("cwd")??void 0,i=n.searchParams.get("repo")??void 0,a=n.searchParams.get("q");if(r)Zcr(r);if(i&&!u.test(i))throw Error(`Invalid repo in deep link: expected "owner/repo", got "${i}"`);let s;if(a&&a.trim().length>0)s=edr(a.trim());return{action:"open",query:s,cwd:r,repo:i}}
return {protocol:XY,cwd:Zcr,query:edr,plugin:tdr,marketplace:Qtt,parse:vao};
}
function create_linux_arm64(ports){
const P=ports.SafeError;
const Ln=ports.isUnc;
const By=ports.hasParent;
const pm=ports.isNetwork;
const bf=ports.ancestry;
const oy=ports.filesystem;
const nQr=ports.sanitize;
const T7=ports.marketplace;
const Fbt=ports.githubSlug;
const GQe=ports.officialMarketplace;
var W8="claude-cli";
function h(e,{allowNewlineAndTab:t=!1}={}){for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=31||r>=127&&r<=159){if(t&&(r===10||r===9))continue;return!0}}return!1}
var u=/^[\w.-]+\/[\w.-]+$/;
var p=5000;
var c=4096;
var w=/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/;
var f=/^(?:https:\/\/\w[\w.-]*(?::\d{1,5})?(?:\/[\w.~:/+-]*)?|\w[\w-]{0,63}@\w[\w.-]*:[\w.~:/+-]+)$/;
var g=/^\w[\w./-]{0,127}$/;
var d=256;
var E=T7.repo;
function xcr(e,t=oy){if(Ln(e)||pm(e))throw Error(`Invalid cwd in deep link: UNC / network paths are not supported, got "${e}"`);if(By(e))throw new P(`Invalid cwd in deep link: parent-directory segments are not supported, got "${e}"`,"Invalid cwd in deep link: parent-directory segments are not supported");if(!e.startsWith("/")&&!/^[a-zA-Z]:[/\\]/.test(e))throw Error(`Invalid cwd in deep link: must be an absolute path, got "${e}"`);if(h(e))throw Error("Deep link cwd contains disallowed control characters");if(/(?![\u200C\u200D\uFE00-\uFE0F\u{E0100}-\u{E01EF}])[\p{Default_Ignorable_Code_Point}\u2028\u2029\u2800\uFFF9-\uFFFB\u{1D173}-\u{1D17A}]/u.test(e))throw Error("Deep link cwd contains invisible or bidirectional control characters");if(e.length>c)throw Error(`Deep link cwd exceeds ${c} characters (got ${e.length})`);if(bf(t,e,{surfaceNetworkRaw:!0,unreadableAncestry:"unverified"})!==void 0)throw new P(`Invalid cwd in deep link: the path resolves through a network link, got "${e}"`,"Invalid cwd in deep link: the path resolves through a network link")}
function Pcr(e){let t=nQr(e).replace(/\r\n?/g,`
`);if(h(t,{allowNewlineAndTab:!0}))throw Error("Deep link query contains disallowed control characters");if(t.length>p)throw Error(`Deep link query exceeds ${p} characters (got ${t.length})`);return t}
function Ocr(e){if(!w.test(e))throw Error('Invalid plugin in deep link: expected a plugin name of ASCII letters, digits, ".", "_" and "-" (at most 100 characters)')}
function ztt(e){if(e.length>d)throw new P(`Deep link marketplace exceeds ${d} characters (got ${e.length})`,"Deep link marketplace exceeds the length limit");let t=e.indexOf("#"),n=t===-1?e:e.slice(0,t),r=t===-1?void 0:e.slice(t+1),i=n.indexOf("@");if(r===void 0&&i!==-1&&!n.includes(":"))r=n.slice(i+1),n=n.slice(0,i);if(n.includes("%"))throw Error("Invalid marketplace in deep link: percent-encoded characters are not allowed in the source");if(!Fbt.test(n)&&!f.test(n))throw Error('Invalid marketplace in deep link: expected a GitHub "owner/repo", an https:// URL, or a git SSH URL like git@host:owner/repo.git');if(/(?:^|[/:])\.\.?(?=[/:]|$)/.test(n)||n.replace(/^https:\/\//,"").includes("//"))throw Error('Invalid marketplace in deep link: ".", ".." and empty path segments are not allowed');if(r!==void 0&&!g.test(r))throw Error('Invalid marketplace in deep link: the git ref after "#" or "@" may only contain letters, digits, ".", "_", "-" and "/"');if(r!==void 0&&GQe(n))throw Error("Invalid marketplace in deep link: an Anthropic marketplace can't be pinned to a git ref")}
function Vio(e){let t=e.startsWith(`${W8}://`)?e:e.startsWith(`${W8}:`)?e.replace(`${W8}:`,`${W8}://`):null;if(!t)throw Error(`Invalid deep link: expected ${W8}:// scheme, got "${e}"`);let n;try{n=new URL(t)}catch{throw Error(`Invalid deep link URL: "${e}"`)}if(n.hostname==="install-plugin"){if(n.hash)throw Error('Invalid deep link: install-plugin has a raw "#"; encode a marketplace ref as %23 (marketplace=owner/repo%23v1)');let o=n.searchParams.get("plugin");if(!o)throw Error("Invalid deep link: install-plugin requires a plugin parameter");Ocr(o);let l=n.searchParams.get("marketplace")??E;return ztt(l),{action:"install-plugin",plugin:o,marketplace:l}}if(n.hostname!=="open")throw Error(`Unknown deep link action: "${n.hostname}"`);let r=n.searchParams.get("cwd")??void 0,i=n.searchParams.get("repo")??void 0,a=n.searchParams.get("q");if(r)xcr(r);if(i&&!u.test(i))throw Error(`Invalid repo in deep link: expected "owner/repo", got "${i}"`);let s;if(a&&a.trim().length>0)s=Pcr(a.trim());return{action:"open",query:s,cwd:r,repo:i}}
return {protocol:W8,cwd:xcr,query:Pcr,plugin:Ocr,marketplace:ztt,parse:Vio};
}
function create_linux_x64(ports){
const P=ports.SafeError;
const Ln=ports.isUnc;
const Uy=ports.hasParent;
const pm=ports.isNetwork;
const bf=ports.ancestry;
const oy=ports.filesystem;
const nQr=ports.sanitize;
const T7=ports.marketplace;
const Nbt=ports.githubSlug;
const GQe=ports.officialMarketplace;
var W9="claude-cli";
function h(e,{allowNewlineAndTab:t=!1}={}){for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=31||r>=127&&r<=159){if(t&&(r===10||r===9))continue;return!0}}return!1}
var u=/^[\w.-]+\/[\w.-]+$/;
var p=5000;
var c=4096;
var w=/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/;
var f=/^(?:https:\/\/\w[\w.-]*(?::\d{1,5})?(?:\/[\w.~:/+-]*)?|\w[\w-]{0,63}@\w[\w.-]*:[\w.~:/+-]+)$/;
var g=/^\w[\w./-]{0,127}$/;
var d=256;
var E=T7.repo;
function xcr(e,t=oy){if(Ln(e)||pm(e))throw Error(`Invalid cwd in deep link: UNC / network paths are not supported, got "${e}"`);if(Uy(e))throw new P(`Invalid cwd in deep link: parent-directory segments are not supported, got "${e}"`,"Invalid cwd in deep link: parent-directory segments are not supported");if(!e.startsWith("/")&&!/^[a-zA-Z]:[/\\]/.test(e))throw Error(`Invalid cwd in deep link: must be an absolute path, got "${e}"`);if(h(e))throw Error("Deep link cwd contains disallowed control characters");if(/(?![\u200C\u200D\uFE00-\uFE0F\u{E0100}-\u{E01EF}])[\p{Default_Ignorable_Code_Point}\u2028\u2029\u2800\uFFF9-\uFFFB\u{1D173}-\u{1D17A}]/u.test(e))throw Error("Deep link cwd contains invisible or bidirectional control characters");if(e.length>c)throw Error(`Deep link cwd exceeds ${c} characters (got ${e.length})`);if(bf(t,e,{surfaceNetworkRaw:!0,unreadableAncestry:"unverified"})!==void 0)throw new P(`Invalid cwd in deep link: the path resolves through a network link, got "${e}"`,"Invalid cwd in deep link: the path resolves through a network link")}
function Pcr(e){let t=nQr(e).replace(/\r\n?/g,`
`);if(h(t,{allowNewlineAndTab:!0}))throw Error("Deep link query contains disallowed control characters");if(t.length>p)throw Error(`Deep link query exceeds ${p} characters (got ${t.length})`);return t}
function Icr(e){if(!w.test(e))throw Error('Invalid plugin in deep link: expected a plugin name of ASCII letters, digits, ".", "_" and "-" (at most 100 characters)')}
function ztt(e){if(e.length>d)throw new P(`Deep link marketplace exceeds ${d} characters (got ${e.length})`,"Deep link marketplace exceeds the length limit");let t=e.indexOf("#"),n=t===-1?e:e.slice(0,t),r=t===-1?void 0:e.slice(t+1),i=n.indexOf("@");if(r===void 0&&i!==-1&&!n.includes(":"))r=n.slice(i+1),n=n.slice(0,i);if(n.includes("%"))throw Error("Invalid marketplace in deep link: percent-encoded characters are not allowed in the source");if(!Nbt.test(n)&&!f.test(n))throw Error('Invalid marketplace in deep link: expected a GitHub "owner/repo", an https:// URL, or a git SSH URL like git@host:owner/repo.git');if(/(?:^|[/:])\.\.?(?=[/:]|$)/.test(n)||n.replace(/^https:\/\//,"").includes("//"))throw Error('Invalid marketplace in deep link: ".", ".." and empty path segments are not allowed');if(r!==void 0&&!g.test(r))throw Error('Invalid marketplace in deep link: the git ref after "#" or "@" may only contain letters, digits, ".", "_", "-" and "/"');if(r!==void 0&&GQe(n))throw Error("Invalid marketplace in deep link: an Anthropic marketplace can't be pinned to a git ref")}
function Kio(e){let t=e.startsWith(`${W9}://`)?e:e.startsWith(`${W9}:`)?e.replace(`${W9}:`,`${W9}://`):null;if(!t)throw Error(`Invalid deep link: expected ${W9}:// scheme, got "${e}"`);let n;try{n=new URL(t)}catch{throw Error(`Invalid deep link URL: "${e}"`)}if(n.hostname==="install-plugin"){if(n.hash)throw Error('Invalid deep link: install-plugin has a raw "#"; encode a marketplace ref as %23 (marketplace=owner/repo%23v1)');let o=n.searchParams.get("plugin");if(!o)throw Error("Invalid deep link: install-plugin requires a plugin parameter");Icr(o);let l=n.searchParams.get("marketplace")??E;return ztt(l),{action:"install-plugin",plugin:o,marketplace:l}}if(n.hostname!=="open")throw Error(`Unknown deep link action: "${n.hostname}"`);let r=n.searchParams.get("cwd")??void 0,i=n.searchParams.get("repo")??void 0,a=n.searchParams.get("q");if(r)xcr(r);if(i&&!u.test(i))throw Error(`Invalid repo in deep link: expected "owner/repo", got "${i}"`);let s;if(a&&a.trim().length>0)s=Pcr(a.trim());return{action:"open",query:s,cwd:r,repo:i}}
return {protocol:W9,cwd:xcr,query:Pcr,plugin:Icr,marketplace:ztt,parse:Kio};
}
function create_win32_arm64(ports){
const P=ports.SafeError;
const Nn=ports.isUnc;
const jy=ports.hasParent;
const Fh=ports.isNetwork;
const bf=ports.ancestry;
const oy=ports.filesystem;
const lQr=ports.sanitize;
const A7=ports.marketplace;
const Vbt=ports.githubSlug;
const tZe=ports.officialMarketplace;
var q9="claude-cli";
function h(e,{allowNewlineAndTab:t=!1}={}){for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=31||r>=127&&r<=159){if(t&&(r===10||r===9))continue;return!0}}return!1}
var u=/^[\w.-]+\/[\w.-]+$/;
var p=5000;
var c=4096;
var w=/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/;
var f=/^(?:https:\/\/\w[\w.-]*(?::\d{1,5})?(?:\/[\w.~:/+-]*)?|\w[\w-]{0,63}@\w[\w.-]*:[\w.~:/+-]+)$/;
var g=/^\w[\w./-]{0,127}$/;
var d=256;
var E=A7.repo;
function $cr(e,t=oy){if(Nn(e)||Fh(e))throw Error(`Invalid cwd in deep link: UNC / network paths are not supported, got "${e}"`);if(jy(e))throw new P(`Invalid cwd in deep link: parent-directory segments are not supported, got "${e}"`,"Invalid cwd in deep link: parent-directory segments are not supported");if(!e.startsWith("/")&&!/^[a-zA-Z]:[/\\]/.test(e))throw Error(`Invalid cwd in deep link: must be an absolute path, got "${e}"`);if(h(e))throw Error("Deep link cwd contains disallowed control characters");if(/(?![\u200C\u200D\uFE00-\uFE0F\u{E0100}-\u{E01EF}])[\p{Default_Ignorable_Code_Point}\u2028\u2029\u2800\uFFF9-\uFFFB\u{1D173}-\u{1D17A}]/u.test(e))throw Error("Deep link cwd contains invisible or bidirectional control characters");if(e.length>c)throw Error(`Deep link cwd exceeds ${c} characters (got ${e.length})`);if(bf(t,e,{surfaceNetworkRaw:!0,unreadableAncestry:"unverified"})!==void 0)throw new P(`Invalid cwd in deep link: the path resolves through a network link, got "${e}"`,"Invalid cwd in deep link: the path resolves through a network link")}
function Ucr(e){let t=lQr(e).replace(/\r\n?/g,`
`);if(h(t,{allowNewlineAndTab:!0}))throw Error("Deep link query contains disallowed control characters");if(t.length>p)throw Error(`Deep link query exceeds ${p} characters (got ${t.length})`);return t}
function Bcr(e){if(!w.test(e))throw Error('Invalid plugin in deep link: expected a plugin name of ASCII letters, digits, ".", "_" and "-" (at most 100 characters)')}
function Vtt(e){if(e.length>d)throw new P(`Deep link marketplace exceeds ${d} characters (got ${e.length})`,"Deep link marketplace exceeds the length limit");let t=e.indexOf("#"),n=t===-1?e:e.slice(0,t),r=t===-1?void 0:e.slice(t+1),i=n.indexOf("@");if(r===void 0&&i!==-1&&!n.includes(":"))r=n.slice(i+1),n=n.slice(0,i);if(n.includes("%"))throw Error("Invalid marketplace in deep link: percent-encoded characters are not allowed in the source");if(!Vbt.test(n)&&!f.test(n))throw Error('Invalid marketplace in deep link: expected a GitHub "owner/repo", an https:// URL, or a git SSH URL like git@host:owner/repo.git');if(/(?:^|[/:])\.\.?(?=[/:]|$)/.test(n)||n.replace(/^https:\/\//,"").includes("//"))throw Error('Invalid marketplace in deep link: ".", ".." and empty path segments are not allowed');if(r!==void 0&&!g.test(r))throw Error('Invalid marketplace in deep link: the git ref after "#" or "@" may only contain letters, digits, ".", "_", "-" and "/"');if(r!==void 0&&tZe(n))throw Error("Invalid marketplace in deep link: an Anthropic marketplace can't be pinned to a git ref")}
function rao(e){let t=e.startsWith(`${q9}://`)?e:e.startsWith(`${q9}:`)?e.replace(`${q9}:`,`${q9}://`):null;if(!t)throw Error(`Invalid deep link: expected ${q9}:// scheme, got "${e}"`);let n;try{n=new URL(t)}catch{throw Error(`Invalid deep link URL: "${e}"`)}if(n.hostname==="install-plugin"){if(n.hash)throw Error('Invalid deep link: install-plugin has a raw "#"; encode a marketplace ref as %23 (marketplace=owner/repo%23v1)');let o=n.searchParams.get("plugin");if(!o)throw Error("Invalid deep link: install-plugin requires a plugin parameter");Bcr(o);let l=n.searchParams.get("marketplace")??E;return Vtt(l),{action:"install-plugin",plugin:o,marketplace:l}}if(n.hostname!=="open")throw Error(`Unknown deep link action: "${n.hostname}"`);let r=n.searchParams.get("cwd")??void 0,i=n.searchParams.get("repo")??void 0,a=n.searchParams.get("q");if(r)$cr(r);if(i&&!u.test(i))throw Error(`Invalid repo in deep link: expected "owner/repo", got "${i}"`);let s;if(a&&a.trim().length>0)s=Ucr(a.trim());return{action:"open",query:s,cwd:r,repo:i}}
return {protocol:q9,cwd:$cr,query:Ucr,plugin:Bcr,marketplace:Vtt,parse:rao};
}
function create_win32_x64(ports){
const P=ports.SafeError;
const Ln=ports.isUnc;
const jy=ports.hasParent;
const Hh=ports.isNetwork;
const bf=ports.ancestry;
const oy=ports.filesystem;
const lQr=ports.sanitize;
const A7=ports.marketplace;
const qbt=ports.githubSlug;
const tZe=ports.officialMarketplace;
var V9="claude-cli";
function h(e,{allowNewlineAndTab:t=!1}={}){for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=31||r>=127&&r<=159){if(t&&(r===10||r===9))continue;return!0}}return!1}
var u=/^[\w.-]+\/[\w.-]+$/;
var p=5000;
var c=4096;
var w=/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/;
var f=/^(?:https:\/\/\w[\w.-]*(?::\d{1,5})?(?:\/[\w.~:/+-]*)?|\w[\w-]{0,63}@\w[\w.-]*:[\w.~:/+-]+)$/;
var g=/^\w[\w./-]{0,127}$/;
var d=256;
var E=A7.repo;
function Fcr(e,t=oy){if(Ln(e)||Hh(e))throw Error(`Invalid cwd in deep link: UNC / network paths are not supported, got "${e}"`);if(jy(e))throw new P(`Invalid cwd in deep link: parent-directory segments are not supported, got "${e}"`,"Invalid cwd in deep link: parent-directory segments are not supported");if(!e.startsWith("/")&&!/^[a-zA-Z]:[/\\]/.test(e))throw Error(`Invalid cwd in deep link: must be an absolute path, got "${e}"`);if(h(e))throw Error("Deep link cwd contains disallowed control characters");if(/(?![\u200C\u200D\uFE00-\uFE0F\u{E0100}-\u{E01EF}])[\p{Default_Ignorable_Code_Point}\u2028\u2029\u2800\uFFF9-\uFFFB\u{1D173}-\u{1D17A}]/u.test(e))throw Error("Deep link cwd contains invisible or bidirectional control characters");if(e.length>c)throw Error(`Deep link cwd exceeds ${c} characters (got ${e.length})`);if(bf(t,e,{surfaceNetworkRaw:!0,unreadableAncestry:"unverified"})!==void 0)throw new P(`Invalid cwd in deep link: the path resolves through a network link, got "${e}"`,"Invalid cwd in deep link: the path resolves through a network link")}
function $cr(e){let t=lQr(e).replace(/\r\n?/g,`
`);if(h(t,{allowNewlineAndTab:!0}))throw Error("Deep link query contains disallowed control characters");if(t.length>p)throw Error(`Deep link query exceeds ${p} characters (got ${t.length})`);return t}
function Ucr(e){if(!w.test(e))throw Error('Invalid plugin in deep link: expected a plugin name of ASCII letters, digits, ".", "_" and "-" (at most 100 characters)')}
function qtt(e){if(e.length>d)throw new P(`Deep link marketplace exceeds ${d} characters (got ${e.length})`,"Deep link marketplace exceeds the length limit");let t=e.indexOf("#"),n=t===-1?e:e.slice(0,t),r=t===-1?void 0:e.slice(t+1),i=n.indexOf("@");if(r===void 0&&i!==-1&&!n.includes(":"))r=n.slice(i+1),n=n.slice(0,i);if(n.includes("%"))throw Error("Invalid marketplace in deep link: percent-encoded characters are not allowed in the source");if(!qbt.test(n)&&!f.test(n))throw Error('Invalid marketplace in deep link: expected a GitHub "owner/repo", an https:// URL, or a git SSH URL like git@host:owner/repo.git');if(/(?:^|[/:])\.\.?(?=[/:]|$)/.test(n)||n.replace(/^https:\/\//,"").includes("//"))throw Error('Invalid marketplace in deep link: ".", ".." and empty path segments are not allowed');if(r!==void 0&&!g.test(r))throw Error('Invalid marketplace in deep link: the git ref after "#" or "@" may only contain letters, digits, ".", "_", "-" and "/"');if(r!==void 0&&tZe(n))throw Error("Invalid marketplace in deep link: an Anthropic marketplace can't be pinned to a git ref")}
function rao(e){let t=e.startsWith(`${V9}://`)?e:e.startsWith(`${V9}:`)?e.replace(`${V9}:`,`${V9}://`):null;if(!t)throw Error(`Invalid deep link: expected ${V9}:// scheme, got "${e}"`);let n;try{n=new URL(t)}catch{throw Error(`Invalid deep link URL: "${e}"`)}if(n.hostname==="install-plugin"){if(n.hash)throw Error('Invalid deep link: install-plugin has a raw "#"; encode a marketplace ref as %23 (marketplace=owner/repo%23v1)');let o=n.searchParams.get("plugin");if(!o)throw Error("Invalid deep link: install-plugin requires a plugin parameter");Ucr(o);let l=n.searchParams.get("marketplace")??E;return qtt(l),{action:"install-plugin",plugin:o,marketplace:l}}if(n.hostname!=="open")throw Error(`Unknown deep link action: "${n.hostname}"`);let r=n.searchParams.get("cwd")??void 0,i=n.searchParams.get("repo")??void 0,a=n.searchParams.get("q");if(r)Fcr(r);if(i&&!u.test(i))throw Error(`Invalid repo in deep link: expected "owner/repo", got "${i}"`);let s;if(a&&a.trim().length>0)s=$cr(a.trim());return{action:"open",query:s,cwd:r,repo:i}}
return {protocol:V9,cwd:Fcr,query:$cr,plugin:Ucr,marketplace:qtt,parse:rao};
}
const factories={"darwin-arm64":create_darwin_arm64,"darwin-x64":create_darwin_x64,"linux-arm64":create_linux_arm64,"linux-x64":create_linux_x64,"win32-arm64":create_win32_arm64,"win32-x64":create_win32_x64};
export function createDeepLinkParser287(ports,platform=process.platform,arch=process.arch){const factory=factories[platform+'-'+arch];if(!factory)throw Error('Unsupported platform: '+platform+'/'+arch);return factory(ports);}
