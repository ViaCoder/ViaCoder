// Official 2.1.283 w; function body unchanged. See provenance.json and NOTICE.
import {iQe,h3t} from './chunk-xqbw5zpz.js';
export function checkAppleTerminalBell({Ke,t}) {
async function w(){try{let n=(await Ke("osascript",["-e",'tell application "Terminal" to name of current settings of front window'])).stdout.trim();if(!n)return!1;let r=await Ke("defaults",["export","com.apple.Terminal","-"]);if(r.code!==0)return!1;let o=h3t(r.stdout);if(!iQe(o))return t("Failed to read Apple Terminal bell setting: defaults export is not a plist dict"),!1;let s=o["Window Settings"],l=iQe(s)?s[n]:void 0;if(!iQe(l))return t("Failed to read Apple Terminal bell setting: no settings dict for the current profile"),!1;return l.Bell===!1}catch(e){return t(`Failed to read Apple Terminal bell setting: ${e instanceof Error?e.message:String(e)}`,{level:"error"}),!1}}
return w();
}
