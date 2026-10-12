// Complete platform-specific 287 protocol registration; original bodies unchanged.
function create_darwin_arm64(ports){
const E=ports.errno;
const so=ports.errorCode;
const F=ports.storagePinned;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const t=ports.debug;
const we=ports.configHome;
const De=ports.keys;
const fc=ports.which;
const Ke=ports.exec;
const iUe=ports.stablePath;
const tt=ports.settings;
const XY=ports.protocol;
const wBe=ports.dataHome;
const n=ports.fs;
const g=ports.os;
const o=ports.path;
var Dlr="com.anthropic.claude-code-url-handler";
var p="Claude Code URL Handler";
var w="claude-code-url-handler.desktop";
var D="Claude Code URL Handler.app";
var c=o.join(g.homedir(),"Applications",D);
var l=o.join(c,"Contents","MacOS","claude");
function d(){return o.join(wBe(),"applications",w)}
var u=`HKEY_CURRENT_USER\\Software\\Classes\\${XY}`;
var h=`${u}\\shell\\open\\command`;
var f=86400000;
function k(e){return`Exec="${e}" --handle-uri %u`}
function C(e){return`"${e}" --handle-uri "%1"`}
async function _(e){let r=o.join(c,"Contents");try{await n.rm(c,{recursive:!0})}catch(s){if(E(s)!=="ENOENT")throw s}await n.mkdir(o.dirname(l),{recursive:!0});let i=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>${Dlr}</string>
  <key>CFBundleName</key>
  <string>${p}</string>
  <key>CFBundleExecutable</key>
  <string>claude</string>
  <key>CFBundleVersion</key>
  <string>1.0</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>LSBackgroundOnly</key>
  <true/>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>Claude Code Deep Link</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>${XY}</string>
      </array>
    </dict>
  </array>
</dict>
</plist>`;await n.writeFile(o.join(r,"Info.plist"),i),await n.symlink(e,l),await Ke("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-R",c],{useCwd:!1}),t(`Registered ${XY}:// protocol handler at ${c}`)}
async function L(e){await n.mkdir(o.dirname(d()),{recursive:!0});let r=`[Desktop Entry]
Name=${p}
Comment=Handle ${XY}:// deep links for Claude Code
${k(e)}
Type=Application
NoDisplay=true
MimeType=x-scheme-handler/${XY};
`;await n.writeFile(d(),r);let i=await fc("xdg-mime");if(i){let{code:a}=await Ke(i,["default",w,`x-scheme-handler/${XY}`],{useCwd:!1});if(a!==0)throw Object.assign(Error(`xdg-mime exited with code ${a}`),{code:"XDG_MIME_FAILED"})}t(`Registered ${XY}:// protocol handler at ${d()}`)}
async function S(e){for(let r of[["add",u,"/ve","/d",`URL:${p}`,"/f"],["add",u,"/v","URL Protocol","/d","","/f"],["add",h,"/ve","/d",C(e),"/f"]]){let{code:i}=await Ke("reg",r,{useCwd:!1});if(i!==0)throw Object.assign(Error(`reg add exited with code ${i}`),{code:"REG_FAILED"})}t(`Registered ${XY}:// protocol handler in Windows registry`)}
async function x(e){let r=e??await P();switch("darwin"){case"darwin":await _(r);break;case"linux":await L(r);break;case"win32":await S(r);break;default:throw Error("Unsupported platform: darwin")}}
async function P(){let e=iUe();try{return await n.realpath(e),e}catch{return process.execPath}}
async function v(e){try{switch("darwin"){case"darwin":return await n.readlink(l)===e;case"linux":return(await n.readFile(d(),"utf8")).includes(k(e));case"win32":{let{stdout:r,code:i}=await Ke("reg",["query",h,"/ve"],{useCwd:!1});return i===0&&r.includes(C(e))}default:return!1}}catch{return!1}}
async function wso(e){if(tt().disableDeepLinkRegistration==="disable")return;if(!["darwin","linux","win32"].includes("darwin"))return;let r=await P();if(await v(r))return;let i=o.join(we(),".deep-link-register-failed");if(F()&&e!==void 0){let a=await e.stat(De.state("deep-link-register-failed"));if(a.ok&&Date.now()-a.value.mtimeMs<f)return}else try{let a=await n.stat(i);if(Date.now()-a.mtimeMs<f)return}catch{}try{if(await x(r),y("deep_link_register"),t("Auto-registered claude-cli:// deep link protocol handler"),F()&&e!==void 0)await e.delete(De.state("deep-link-register-failed"));else await n.rm(i,{force:!0}).catch(()=>{})}catch(a){let s=so(a);if(m("deep_link_register",s??"register_failed"),t(`Failed to auto-register deep link protocol handler: ${a instanceof Error?a.message:String(a)}`,{level:"warn"}),s==="EACCES"||s==="ENOSPC")if(F()&&e!==void 0)await e.write(De.state("deep-link-register-failed"),"",{publishDiscipline:"inPlace"});else await n.writeFile(i,"").catch(()=>{})}}
return {ensure:wso,register:x,current:v,resolve:P};
}
function create_darwin_x64(ports){
const E=ports.errno;
const so=ports.errorCode;
const F=ports.storagePinned;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const t=ports.debug;
const we=ports.configHome;
const Le=ports.keys;
const fc=ports.which;
const qe=ports.exec;
const iUe=ports.stablePath;
const tt=ports.settings;
const XY=ports.protocol;
const wBe=ports.dataHome;
const n=ports.fs;
const g=ports.os;
const o=ports.path;
var Llr="com.anthropic.claude-code-url-handler";
var p="Claude Code URL Handler";
var w="claude-code-url-handler.desktop";
var D="Claude Code URL Handler.app";
var c=o.join(g.homedir(),"Applications",D);
var l=o.join(c,"Contents","MacOS","claude");
function d(){return o.join(wBe(),"applications",w)}
var u=`HKEY_CURRENT_USER\\Software\\Classes\\${XY}`;
var h=`${u}\\shell\\open\\command`;
var f=86400000;
function k(e){return`Exec="${e}" --handle-uri %u`}
function C(e){return`"${e}" --handle-uri "%1"`}
async function _(e){let r=o.join(c,"Contents");try{await n.rm(c,{recursive:!0})}catch(s){if(E(s)!=="ENOENT")throw s}await n.mkdir(o.dirname(l),{recursive:!0});let i=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>${Llr}</string>
  <key>CFBundleName</key>
  <string>${p}</string>
  <key>CFBundleExecutable</key>
  <string>claude</string>
  <key>CFBundleVersion</key>
  <string>1.0</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>LSBackgroundOnly</key>
  <true/>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>Claude Code Deep Link</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>${XY}</string>
      </array>
    </dict>
  </array>
</dict>
</plist>`;await n.writeFile(o.join(r,"Info.plist"),i),await n.symlink(e,l),await qe("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-R",c],{useCwd:!1}),t(`Registered ${XY}:// protocol handler at ${c}`)}
async function L(e){await n.mkdir(o.dirname(d()),{recursive:!0});let r=`[Desktop Entry]
Name=${p}
Comment=Handle ${XY}:// deep links for Claude Code
${k(e)}
Type=Application
NoDisplay=true
MimeType=x-scheme-handler/${XY};
`;await n.writeFile(d(),r);let i=await fc("xdg-mime");if(i){let{code:a}=await qe(i,["default",w,`x-scheme-handler/${XY}`],{useCwd:!1});if(a!==0)throw Object.assign(Error(`xdg-mime exited with code ${a}`),{code:"XDG_MIME_FAILED"})}t(`Registered ${XY}:// protocol handler at ${d()}`)}
async function S(e){for(let r of[["add",u,"/ve","/d",`URL:${p}`,"/f"],["add",u,"/v","URL Protocol","/d","","/f"],["add",h,"/ve","/d",C(e),"/f"]]){let{code:i}=await qe("reg",r,{useCwd:!1});if(i!==0)throw Object.assign(Error(`reg add exited with code ${i}`),{code:"REG_FAILED"})}t(`Registered ${XY}:// protocol handler in Windows registry`)}
async function x(e){let r=e??await P();switch("darwin"){case"darwin":await _(r);break;case"linux":await L(r);break;case"win32":await S(r);break;default:throw Error("Unsupported platform: darwin")}}
async function P(){let e=iUe();try{return await n.realpath(e),e}catch{return process.execPath}}
async function v(e){try{switch("darwin"){case"darwin":return await n.readlink(l)===e;case"linux":return(await n.readFile(d(),"utf8")).includes(k(e));case"win32":{let{stdout:r,code:i}=await qe("reg",["query",h,"/ve"],{useCwd:!1});return i===0&&r.includes(C(e))}default:return!1}}catch{return!1}}
async function wso(e){if(tt().disableDeepLinkRegistration==="disable")return;if(!["darwin","linux","win32"].includes("darwin"))return;let r=await P();if(await v(r))return;let i=o.join(we(),".deep-link-register-failed");if(F()&&e!==void 0){let a=await e.stat(Le.state("deep-link-register-failed"));if(a.ok&&Date.now()-a.value.mtimeMs<f)return}else try{let a=await n.stat(i);if(Date.now()-a.mtimeMs<f)return}catch{}try{if(await x(r),y("deep_link_register"),t("Auto-registered claude-cli:// deep link protocol handler"),F()&&e!==void 0)await e.delete(Le.state("deep-link-register-failed"));else await n.rm(i,{force:!0}).catch(()=>{})}catch(a){let s=so(a);if(m("deep_link_register",s??"register_failed"),t(`Failed to auto-register deep link protocol handler: ${a instanceof Error?a.message:String(a)}`,{level:"warn"}),s==="EACCES"||s==="ENOSPC")if(F()&&e!==void 0)await e.write(Le.state("deep-link-register-failed"),"",{publishDiscipline:"inPlace"});else await n.writeFile(i,"").catch(()=>{})}}
return {ensure:wso,register:x,current:v,resolve:P};
}
function create_linux_arm64(ports){
const k=ports.errno;
const so=ports.errorCode;
const U=ports.storagePinned;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const t=ports.debug;
const we=ports.configHome;
const De=ports.keys;
const uc=ports.which;
const Je=ports.exec;
const ZBe=ports.stablePath;
const tt=ports.settings;
const W8=ports.protocol;
const m1e=ports.dataHome;
const n=ports.fs;
const g=ports.os;
const o=ports.path;
var D="com.anthropic.claude-code-url-handler";
var p="Claude Code URL Handler";
var w="claude-code-url-handler.desktop";
var _="Claude Code URL Handler.app";
var c=o.join(g.homedir(),"Applications",_);
var l=o.join(c,"Contents","MacOS","claude");
function d(){return o.join(m1e(),"applications",w)}
var u=`HKEY_CURRENT_USER\\Software\\Classes\\${W8}`;
var h=`${u}\\shell\\open\\command`;
var f=86400000;
function C(e){return`Exec="${e}" --handle-uri %u`}
function E(e){return`"${e}" --handle-uri "%1"`}
async function F(e){let r=o.join(c,"Contents");try{await n.rm(c,{recursive:!0})}catch(s){if(k(s)!=="ENOENT")throw s}await n.mkdir(o.dirname(l),{recursive:!0});let i=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>${D}</string>
  <key>CFBundleName</key>
  <string>${p}</string>
  <key>CFBundleExecutable</key>
  <string>claude</string>
  <key>CFBundleVersion</key>
  <string>1.0</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>LSBackgroundOnly</key>
  <true/>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>Claude Code Deep Link</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>${W8}</string>
      </array>
    </dict>
  </array>
</dict>
</plist>`;await n.writeFile(o.join(r,"Info.plist"),i),await n.symlink(e,l),await Je("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-R",c],{useCwd:!1}),t(`Registered ${W8}:// protocol handler at ${c}`)}
async function L(e){await n.mkdir(o.dirname(d()),{recursive:!0});let r=`[Desktop Entry]
Name=${p}
Comment=Handle ${W8}:// deep links for Claude Code
${C(e)}
Type=Application
NoDisplay=true
MimeType=x-scheme-handler/${W8};
`;await n.writeFile(d(),r);let i=await uc("xdg-mime");if(i){let{code:a}=await Je(i,["default",w,`x-scheme-handler/${W8}`],{useCwd:!1});if(a!==0)throw Object.assign(Error(`xdg-mime exited with code ${a}`),{code:"XDG_MIME_FAILED"})}t(`Registered ${W8}:// protocol handler at ${d()}`)}
async function S(e){for(let r of[["add",u,"/ve","/d",`URL:${p}`,"/f"],["add",u,"/v","URL Protocol","/d","","/f"],["add",h,"/ve","/d",E(e),"/f"]]){let{code:i}=await Je("reg",r,{useCwd:!1});if(i!==0)throw Object.assign(Error(`reg add exited with code ${i}`),{code:"REG_FAILED"})}t(`Registered ${W8}:// protocol handler in Windows registry`)}
async function x(e){let r=e??await P();switch("linux"){case"darwin":await F(r);break;case"linux":await L(r);break;case"win32":await S(r);break;default:throw Error("Unsupported platform: linux")}}
async function P(){let e=ZBe();try{return await n.realpath(e),e}catch{return process.execPath}}
async function v(e){try{switch("linux"){case"darwin":return await n.readlink(l)===e;case"linux":return(await n.readFile(d(),"utf8")).includes(C(e));case"win32":{let{stdout:r,code:i}=await Je("reg",["query",h,"/ve"],{useCwd:!1});return i===0&&r.includes(E(e))}default:return!1}}catch{return!1}}
async function Koo(e){if(tt().disableDeepLinkRegistration==="disable")return;if(!["darwin","linux","win32"].includes("linux"))return;let r=await P();if(await v(r))return;let i=o.join(we(),".deep-link-register-failed");if(U()&&e!==void 0){let a=await e.stat(De.state("deep-link-register-failed"));if(a.ok&&Date.now()-a.value.mtimeMs<f)return}else try{let a=await n.stat(i);if(Date.now()-a.mtimeMs<f)return}catch{}try{if(await x(r),y("deep_link_register"),t("Auto-registered claude-cli:// deep link protocol handler"),U()&&e!==void 0)await e.delete(De.state("deep-link-register-failed"));else await n.rm(i,{force:!0}).catch(()=>{})}catch(a){let s=so(a);if(m("deep_link_register",s??"register_failed"),t(`Failed to auto-register deep link protocol handler: ${a instanceof Error?a.message:String(a)}`,{level:"warn"}),s==="EACCES"||s==="ENOSPC")if(U()&&e!==void 0)await e.write(De.state("deep-link-register-failed"),"",{publishDiscipline:"inPlace"});else await n.writeFile(i,"").catch(()=>{})}}
return {ensure:Koo,register:x,current:v,resolve:P};
}
function create_linux_x64(ports){
const E=ports.errno;
const so=ports.errorCode;
const F=ports.storagePinned;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const t=ports.debug;
const we=ports.configHome;
const He=ports.keys;
const uc=ports.which;
const Je=ports.exec;
const ZUe=ports.stablePath;
const tt=ports.settings;
const W9=ports.protocol;
const m1e=ports.dataHome;
const n=ports.fs;
const g=ports.os;
const o=ports.path;
var D="com.anthropic.claude-code-url-handler";
var p="Claude Code URL Handler";
var w="claude-code-url-handler.desktop";
var _="Claude Code URL Handler.app";
var c=o.join(g.homedir(),"Applications",_);
var l=o.join(c,"Contents","MacOS","claude");
function d(){return o.join(m1e(),"applications",w)}
var u=`HKEY_CURRENT_USER\\Software\\Classes\\${W9}`;
var h=`${u}\\shell\\open\\command`;
var f=86400000;
function k(e){return`Exec="${e}" --handle-uri %u`}
function C(e){return`"${e}" --handle-uri "%1"`}
async function L(e){let r=o.join(c,"Contents");try{await n.rm(c,{recursive:!0})}catch(s){if(E(s)!=="ENOENT")throw s}await n.mkdir(o.dirname(l),{recursive:!0});let i=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>${D}</string>
  <key>CFBundleName</key>
  <string>${p}</string>
  <key>CFBundleExecutable</key>
  <string>claude</string>
  <key>CFBundleVersion</key>
  <string>1.0</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>LSBackgroundOnly</key>
  <true/>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>Claude Code Deep Link</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>${W9}</string>
      </array>
    </dict>
  </array>
</dict>
</plist>`;await n.writeFile(o.join(r,"Info.plist"),i),await n.symlink(e,l),await Je("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-R",c],{useCwd:!1}),t(`Registered ${W9}:// protocol handler at ${c}`)}
async function S(e){await n.mkdir(o.dirname(d()),{recursive:!0});let r=`[Desktop Entry]
Name=${p}
Comment=Handle ${W9}:// deep links for Claude Code
${k(e)}
Type=Application
NoDisplay=true
MimeType=x-scheme-handler/${W9};
`;await n.writeFile(d(),r);let i=await uc("xdg-mime");if(i){let{code:a}=await Je(i,["default",w,`x-scheme-handler/${W9}`],{useCwd:!1});if(a!==0)throw Object.assign(Error(`xdg-mime exited with code ${a}`),{code:"XDG_MIME_FAILED"})}t(`Registered ${W9}:// protocol handler at ${d()}`)}
async function x(e){for(let r of[["add",u,"/ve","/d",`URL:${p}`,"/f"],["add",u,"/v","URL Protocol","/d","","/f"],["add",h,"/ve","/d",C(e),"/f"]]){let{code:i}=await Je("reg",r,{useCwd:!1});if(i!==0)throw Object.assign(Error(`reg add exited with code ${i}`),{code:"REG_FAILED"})}t(`Registered ${W9}:// protocol handler in Windows registry`)}
async function v(e){let r=e??await P();switch("linux"){case"darwin":await L(r);break;case"linux":await S(r);break;case"win32":await x(r);break;default:throw Error("Unsupported platform: linux")}}
async function P(){let e=ZUe();try{return await n.realpath(e),e}catch{return process.execPath}}
async function A(e){try{switch("linux"){case"darwin":return await n.readlink(l)===e;case"linux":return(await n.readFile(d(),"utf8")).includes(k(e));case"win32":{let{stdout:r,code:i}=await Je("reg",["query",h,"/ve"],{useCwd:!1});return i===0&&r.includes(C(e))}default:return!1}}catch{return!1}}
async function qoo(e){if(tt().disableDeepLinkRegistration==="disable")return;if(!["darwin","linux","win32"].includes("linux"))return;let r=await P();if(await A(r))return;let i=o.join(we(),".deep-link-register-failed");if(F()&&e!==void 0){let a=await e.stat(He.state("deep-link-register-failed"));if(a.ok&&Date.now()-a.value.mtimeMs<f)return}else try{let a=await n.stat(i);if(Date.now()-a.mtimeMs<f)return}catch{}try{if(await v(r),y("deep_link_register"),t("Auto-registered claude-cli:// deep link protocol handler"),F()&&e!==void 0)await e.delete(He.state("deep-link-register-failed"));else await n.rm(i,{force:!0}).catch(()=>{})}catch(a){let s=so(a);if(m("deep_link_register",s??"register_failed"),t(`Failed to auto-register deep link protocol handler: ${a instanceof Error?a.message:String(a)}`,{level:"warn"}),s==="EACCES"||s==="ENOSPC")if(F()&&e!==void 0)await e.write(He.state("deep-link-register-failed"),"",{publishDiscipline:"inPlace"});else await n.writeFile(i,"").catch(()=>{})}}
return {ensure:qoo,register:v,current:A,resolve:P};
}
function create_win32_arm64(ports){
const v=ports.errno;
const so=ports.errorCode;
const U=ports.storagePinned;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const t=ports.debug;
const we=ports.configHome;
const Me=ports.keys;
const pc=ports.which;
const tt=ports.exec;
const ZBe=ports.stablePath;
const et=ports.settings;
const q9=ports.protocol;
const g1e=ports.dataHome;
const n=ports.fs;
const g=ports.os;
const o=ports.path;
var P="com.anthropic.claude-code-url-handler";
var p="Claude Code URL Handler";
var w="claude-code-url-handler.desktop";
var D="Claude Code URL Handler.app";
var c=o.join(g.homedir(),"Applications",D);
var l=o.join(c,"Contents","MacOS","claude");
function d(){return o.join(g1e(),"applications",w)}
var u=`HKEY_CURRENT_USER\\Software\\Classes\\${q9}`;
var h=`${u}\\shell\\open\\command`;
var f=86400000;
function k(e){return`Exec="${e}" --handle-uri %u`}
function C(e){return`"${e}" --handle-uri "%1"`}
async function _(e){let r=o.join(c,"Contents");try{await n.rm(c,{recursive:!0})}catch(s){if(v(s)!=="ENOENT")throw s}await n.mkdir(o.dirname(l),{recursive:!0});let i=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>${P}</string>
  <key>CFBundleName</key>
  <string>${p}</string>
  <key>CFBundleExecutable</key>
  <string>claude</string>
  <key>CFBundleVersion</key>
  <string>1.0</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>LSBackgroundOnly</key>
  <true/>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>Claude Code Deep Link</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>${q9}</string>
      </array>
    </dict>
  </array>
</dict>
</plist>`;await n.writeFile(o.join(r,"Info.plist"),i),await n.symlink(e,l),await tt("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-R",c],{useCwd:!1}),t(`Registered ${q9}:// protocol handler at ${c}`)}
async function F(e){await n.mkdir(o.dirname(d()),{recursive:!0});let r=`[Desktop Entry]
Name=${p}
Comment=Handle ${q9}:// deep links for Claude Code
${k(e)}
Type=Application
NoDisplay=true
MimeType=x-scheme-handler/${q9};
`;await n.writeFile(d(),r);let i=await pc("xdg-mime");if(i){let{code:a}=await tt(i,["default",w,`x-scheme-handler/${q9}`],{useCwd:!1});if(a!==0)throw Object.assign(Error(`xdg-mime exited with code ${a}`),{code:"XDG_MIME_FAILED"})}t(`Registered ${q9}:// protocol handler at ${d()}`)}
async function L(e){for(let r of[["add",u,"/ve","/d",`URL:${p}`,"/f"],["add",u,"/v","URL Protocol","/d","","/f"],["add",h,"/ve","/d",C(e),"/f"]]){let{code:i}=await tt("reg",r,{useCwd:!1});if(i!==0)throw Object.assign(Error(`reg add exited with code ${i}`),{code:"REG_FAILED"})}t(`Registered ${q9}:// protocol handler in Windows registry`)}
async function S(e){let r=e??await E();switch("win32"){case"darwin":await _(r);break;case"linux":await F(r);break;case"win32":await L(r);break;default:throw Error("Unsupported platform: win32")}}
async function E(){let e=ZBe();try{return await n.realpath(e),e}catch{return process.execPath}}
async function x(e){try{switch("win32"){case"darwin":return await n.readlink(l)===e;case"linux":return(await n.readFile(d(),"utf8")).includes(k(e));case"win32":{let{stdout:r,code:i}=await tt("reg",["query",h,"/ve"],{useCwd:!1});return i===0&&r.includes(C(e))}default:return!1}}catch{return!1}}
async function eso(e){if(et().disableDeepLinkRegistration==="disable")return;if(!["darwin","linux","win32"].includes("win32"))return;let r=await E();if(await x(r))return;let i=o.join(we(),".deep-link-register-failed");if(U()&&e!==void 0){let a=await e.stat(Me.state("deep-link-register-failed"));if(a.ok&&Date.now()-a.value.mtimeMs<f)return}else try{let a=await n.stat(i);if(Date.now()-a.mtimeMs<f)return}catch{}try{if(await S(r),y("deep_link_register"),t("Auto-registered claude-cli:// deep link protocol handler"),U()&&e!==void 0)await e.delete(Me.state("deep-link-register-failed"));else await n.rm(i,{force:!0}).catch(()=>{})}catch(a){let s=so(a);if(m("deep_link_register",s??"register_failed"),t(`Failed to auto-register deep link protocol handler: ${a instanceof Error?a.message:String(a)}`,{level:"warn"}),s==="EACCES"||s==="ENOSPC")if(U()&&e!==void 0)await e.write(Me.state("deep-link-register-failed"),"",{publishDiscipline:"inPlace"});else await n.writeFile(i,"").catch(()=>{})}}
return {ensure:eso,register:S,current:x,resolve:E};
}
function create_win32_x64(ports){
const v=ports.errno;
const so=ports.errorCode;
const F=ports.storagePinned;
const y=ports.featureSuccess;
const m=ports.featureFailure;
const t=ports.debug;
const we=ports.configHome;
const Me=ports.keys;
const pc=ports.which;
const tt=ports.exec;
const ZUe=ports.stablePath;
const et=ports.settings;
const V9=ports.protocol;
const g1e=ports.dataHome;
const n=ports.fs;
const g=ports.os;
const o=ports.path;
var P="com.anthropic.claude-code-url-handler";
var p="Claude Code URL Handler";
var w="claude-code-url-handler.desktop";
var D="Claude Code URL Handler.app";
var c=o.join(g.homedir(),"Applications",D);
var l=o.join(c,"Contents","MacOS","claude");
function d(){return o.join(g1e(),"applications",w)}
var u=`HKEY_CURRENT_USER\\Software\\Classes\\${V9}`;
var h=`${u}\\shell\\open\\command`;
var f=86400000;
function k(e){return`Exec="${e}" --handle-uri %u`}
function C(e){return`"${e}" --handle-uri "%1"`}
async function _(e){let r=o.join(c,"Contents");try{await n.rm(c,{recursive:!0})}catch(s){if(v(s)!=="ENOENT")throw s}await n.mkdir(o.dirname(l),{recursive:!0});let i=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>${P}</string>
  <key>CFBundleName</key>
  <string>${p}</string>
  <key>CFBundleExecutable</key>
  <string>claude</string>
  <key>CFBundleVersion</key>
  <string>1.0</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>LSBackgroundOnly</key>
  <true/>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>Claude Code Deep Link</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>${V9}</string>
      </array>
    </dict>
  </array>
</dict>
</plist>`;await n.writeFile(o.join(r,"Info.plist"),i),await n.symlink(e,l),await tt("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-R",c],{useCwd:!1}),t(`Registered ${V9}:// protocol handler at ${c}`)}
async function L(e){await n.mkdir(o.dirname(d()),{recursive:!0});let r=`[Desktop Entry]
Name=${p}
Comment=Handle ${V9}:// deep links for Claude Code
${k(e)}
Type=Application
NoDisplay=true
MimeType=x-scheme-handler/${V9};
`;await n.writeFile(d(),r);let i=await pc("xdg-mime");if(i){let{code:a}=await tt(i,["default",w,`x-scheme-handler/${V9}`],{useCwd:!1});if(a!==0)throw Object.assign(Error(`xdg-mime exited with code ${a}`),{code:"XDG_MIME_FAILED"})}t(`Registered ${V9}:// protocol handler at ${d()}`)}
async function S(e){for(let r of[["add",u,"/ve","/d",`URL:${p}`,"/f"],["add",u,"/v","URL Protocol","/d","","/f"],["add",h,"/ve","/d",C(e),"/f"]]){let{code:i}=await tt("reg",r,{useCwd:!1});if(i!==0)throw Object.assign(Error(`reg add exited with code ${i}`),{code:"REG_FAILED"})}t(`Registered ${V9}:// protocol handler in Windows registry`)}
async function x(e){let r=e??await E();switch("win32"){case"darwin":await _(r);break;case"linux":await L(r);break;case"win32":await S(r);break;default:throw Error("Unsupported platform: win32")}}
async function E(){let e=ZUe();try{return await n.realpath(e),e}catch{return process.execPath}}
async function A(e){try{switch("win32"){case"darwin":return await n.readlink(l)===e;case"linux":return(await n.readFile(d(),"utf8")).includes(k(e));case"win32":{let{stdout:r,code:i}=await tt("reg",["query",h,"/ve"],{useCwd:!1});return i===0&&r.includes(C(e))}default:return!1}}catch{return!1}}
async function eso(e){if(et().disableDeepLinkRegistration==="disable")return;if(!["darwin","linux","win32"].includes("win32"))return;let r=await E();if(await A(r))return;let i=o.join(we(),".deep-link-register-failed");if(F()&&e!==void 0){let a=await e.stat(Me.state("deep-link-register-failed"));if(a.ok&&Date.now()-a.value.mtimeMs<f)return}else try{let a=await n.stat(i);if(Date.now()-a.mtimeMs<f)return}catch{}try{if(await x(r),y("deep_link_register"),t("Auto-registered claude-cli:// deep link protocol handler"),F()&&e!==void 0)await e.delete(Me.state("deep-link-register-failed"));else await n.rm(i,{force:!0}).catch(()=>{})}catch(a){let s=so(a);if(m("deep_link_register",s??"register_failed"),t(`Failed to auto-register deep link protocol handler: ${a instanceof Error?a.message:String(a)}`,{level:"warn"}),s==="EACCES"||s==="ENOSPC")if(F()&&e!==void 0)await e.write(Me.state("deep-link-register-failed"),"",{publishDiscipline:"inPlace"});else await n.writeFile(i,"").catch(()=>{})}}
return {ensure:eso,register:x,current:A,resolve:E};
}
const factories={"darwin-arm64":create_darwin_arm64,"darwin-x64":create_darwin_x64,"linux-arm64":create_linux_arm64,"linux-x64":create_linux_x64,"win32-arm64":create_win32_arm64,"win32-x64":create_win32_x64};
export function createDeepLinkProtocol287(ports,platform=process.platform,arch=process.arch){const factory=factories[platform+'-'+arch];if(!factory)throw Error('Unsupported platform: '+platform+'/'+arch);return factory(ports);}
