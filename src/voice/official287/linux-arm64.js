// Complete original 2.1.287 linux-arm64 voice closures; host imports only.
export function createCommand287(ports){const {Q0e,i,wl,Te,le,tt,hn,vFt,J5e,op,FE,r_}=ports;
var V=2;
function L(s){let e=s.trim().toLowerCase();if(e==="")return;if(e==="hold"||e==="tap"||e==="off")return e;return"invalid"}
var D=async(s,e)=>{if(!J5e()){if(!wl())return{type:"text",value:"Voice mode requires a Claude.ai account. Please run /login to sign in."};let o=op("allow_voice_mode","Voice mode","is");if(o)return FE("allow_voice_mode","slash_command"),{type:"text",value:o};return{type:"text",value:"Voice mode is not available."}}let a=tt(),v=vFt(a),t=L(s);if(t==="invalid")return{type:"text",value:`Unknown mode: "${s.trim()}". Use hold, tap, or off.`};if(t==="off"||t===void 0&&v){if((await hn("userSettings",{voiceEnabled:!1,voice:{...a.voice,enabled:!1}},void 0,e.storageV5)).error)return{type:"text",value:"Failed to update settings. Check your settings file for syntax errors."};return i("tengu_voice_toggled",{enabled:!1}),{type:"text",value:"Voice mode disabled."}}let{isVoiceStreamAvailable:y}=await ports.importOriginal287("/$bunfs/root/chunk-7gx8161m.js"),{checkRecordingAvailability:h}=await ports.importOriginal287("/$bunfs/root/chunk-0nzb0pmr.js"),r=await h(e.session.host,{probeForwarded:!0});if(!r.available)return{type:"text",value:r.reason??"Voice mode is not available in this environment."};if(!y())return{type:"text",value:"Voice mode requires a Claude.ai account. Please run /login to sign in."};let{checkVoiceDependencies:b,requestMicrophonePermission:C}=await ports.importOriginal287("/$bunfs/root/chunk-0nzb0pmr.js"),c=await b(e.session.host);if(!c.available)return{type:"text",value:`No audio recording tool found.${c.installCommand?`
Install audio recording tools? Run: ${c.installCommand}`:`
Install SoX manually for audio recording.`}`};if(!await C(e.session.host)){let o;return o="your system's audio settings",{type:"text",value:`Microphone access is denied. To enable it, go to ${o}, then run /voice again.`}}let l=t==="hold"||t==="tap"?t:a.voice?.mode??"hold";if((await hn("userSettings",{voiceEnabled:!0,voice:{...a.voice,enabled:!0,mode:l}},void 0,e.storageV5)).error)return{type:"text",value:"Failed to update settings. Check your settings file for syntax errors."};i("tengu_voice_toggled",{enabled:!0,tap_mode:l==="tap"});let g=r_("voice:pushToTalk","Chat","space"),w=l==="tap"?`Tap ${g} (with input empty) to start, tap again to send.`:`Hold ${g} to record.`,n=Q0e(a.language),m=le(),p=m.voiceLangHintLastLanguage!==n.code,f=p?0:m.voiceLangHintShownCount??0,u=!n.fellBackFrom&&f<V,d="";if(n.fellBackFrom)d=` Note: "${n.fellBackFrom}" is not a supported dictation language; using English. Change it via /config.`;else if(u)d=` Dictation language: ${n.code} (/config to change).`;if(p||u)await Te((o)=>({...o,voiceLangHintShownCount:f+(u?1:0),voiceLangHintLastLanguage:n.code}),e.storageV5);let S=r.note?` ${r.note}`:"";return{type:"text",value:`Voice mode enabled (${l}). ${w}${d}${S}`}};
return {"call":D};}
export function createCapture287(ports){const {q,t,kS,a,I,Fa,Je,m,P,b,R}=ports;
var G=R(b(),".cache","coder-audio","port"),X=R(b(),".cache","coder-audio","token");
class A{audioNapi=null;audioNapiPromise=null;arecordProbe=null;linuxAlsaCardsProbe=null;activeRecorder=null;activeForwardedSocket=null;forwardedStartGeneration=0;nativeRecordingActive=!1}
var u=new q(()=>new A);
var p={started:!0};
var k={started:!1,superseded:!1,hint:null,expected:!1};
function f(e){return e.audioNapiPromise??=(async()=>{let o=Date.now(),r=await ports.importOriginal287("/$bunfs/root/chunk-rfwnawqk.js");return r.isNativeAudioAvailable(),e.audioNapi=r,t(`[voice] audio-capture-napi loaded in ${Date.now()-o}ms`),r})(),e.audioNapiPromise}
var v=16000,w=1,D="2.0",h="3%";
async function c(e){return(await Je(e,["--version"],{timeout:3000,useCwd:!1})).code===0}
function x(e){return e.arecordProbe??=new Promise((o)=>{let r=m("arecord",["-f","S16_LE","-r",String(v),"-c",String(w),"-t","raw","/dev/null"],{stdio:["ignore","ignore","pipe"],windowsHide:!0}),s="";r.stderr?.on("data",(i)=>{s+=i.toString()});let n=setTimeout((i,d)=>{i.kill("SIGTERM"),d({ok:!0,stderr:""})},150,r,o);r.once("close",(i)=>{clearTimeout(n),o({ok:i===0,stderr:s.trim()})}),r.once("error",()=>{clearTimeout(n),o({ok:!1,stderr:"arecord: command not found"})})}),e.arecordProbe}
function g(e){return e.linuxAlsaCardsProbe??=P("/proc/asound/cards","utf8").then((o)=>{let r=o.trim();return r!==""&&!r.includes("no soundcards")},()=>!1),e.linuxAlsaCardsProbe}
async function E(){if(await c("apt-get"))return{cmd:"sudo",args:["apt-get","install","-y","sox"],displayCommand:"sudo apt-get install sox"};if(await c("dnf"))return{cmd:"sudo",args:["dnf","install","-y","sox"],displayCommand:"sudo dnf install sox"};if(await c("pacman"))return{cmd:"sudo",args:["pacman","-S","--noconfirm","sox"],displayCommand:"sudo pacman -S sox"};return null}
async function me(e){let o=u.of(e);if((await f(o)).isNativeAudioAvailable()&&await g(o))return{available:!0,missing:[],installCommand:null};if(await c("arecord"))return{available:!0,missing:[],installCommand:null};let s=[];if(!await c("sox"))s.push("sox (rec command)");let n=s.length>0?await E():null;return{available:s.length===0,missing:s,installCommand:n?.displayCommand??null}}
async function ve(e){if(!(await f(u.of(e))).isNativeAudioAvailable())return!0;if((await F(e,(s)=>{},()=>{},{silenceDetection:!1})).started)return N(e),!0;return!1}
async function we(e,o={}){if(kS()||a.CLAUDE_CODE_REMOTE)return{available:!1,reason:`Voice mode requires microphone access, but no audio device is available in this environment.

To use voice mode, run Claude Code locally instead.`};let r=u.of(e);if((await f(r)).isNativeAudioAvailable()&&await g(r))return{available:!0,reason:null};let n=`Voice mode could not find a working audio recorder in WSL.

`+`WSL2 with WSLg provides audio via PulseAudio \u2014 install SoX with its PulseAudio backend (sudo apt install sox libsox-fmt-pulse) so Claude Code can record through it.

`+"If WSLg is not available (for example WSL1), run Claude Code in native Windows instead.";if(await c("arecord")){let d=await x(r);if(d.ok)return{available:!0,reason:null};t(`[voice] arecord probe failed: ${d.stderr}`)}let i=await c("sox");if(i&&await c("rec"))return{available:!0,reason:null};if(I()==="wsl")return{available:!1,reason:n};if(!i){let d=await E();return{available:!1,reason:d?`Voice mode requires SoX for audio recording. Install it with: ${d.displayCommand}`:`Voice mode requires SoX for audio recording. Install SoX manually:
  macOS: brew install sox
  Ubuntu/Debian: sudo apt-get install sox
  Fedora: sudo dnf install sox`}}return{available:!1,reason:`Voice mode requires a microphone, but SoX could not open an audio capture device.

This usually means the host has no microphone (for example, a remote server). Run Claude Code on a machine with a microphone to use voice input.`}}
async function F(e,o,r,s){t("[voice] startRecording called, platform=linux");let n=u.of(e),i=await f(n),d=i.isNativeAudioAvailable()&&await g(n),l=s?.silenceDetection!==!1;if(d){if(n.nativeRecordingActive||i.isNativeRecordingActive())i.stopNativeRecording(),n.nativeRecordingActive=!1;if(i.startNativeRecording((S)=>{o(S)},()=>{if(l)n.nativeRecordingActive=!1,r()}))return n.nativeRecordingActive=!0,p}if(await c("arecord")&&(await x(n)).ok)return T(n,o,r)?p:k;return C(n,o,r,s)?p:k}
function C(e,o,r,s){let n=s?.silenceDetection!==!1,i=["-q","--buffer","1024","-t","raw","-r",String(v),"-e","signed","-b","16","-c",String(w),"-"];if(n)i.push("silence","1","0.1",h,"1",D,h);let d=m("rec",i,{stdio:["pipe","pipe","pipe"],windowsHide:!0,...Fa("helper")});return e.activeRecorder=d,d.stdout?.on("data",(l)=>{o(l)}),d.stderr?.on("data",()=>{}),d.on("close",()=>{e.activeRecorder=null,r()}),d.on("error",(l)=>{t(`[voice] SoX rec spawn failed: ${l instanceof Error?l.message:String(l)}`,{level:"error"}),e.activeRecorder=null,r()}),!0}
function T(e,o,r){let s=["-f","S16_LE","-r",String(v),"-c",String(w),"-t","raw","-q","-"],n=m("arecord",s,{stdio:["pipe","pipe","pipe"],windowsHide:!0,...Fa("helper")});return e.activeRecorder=n,n.stdout?.on("data",(i)=>{o(i)}),n.stderr?.on("data",()=>{}),n.on("close",()=>{e.activeRecorder=null,r()}),n.on("error",(i)=>{t(`[voice] arecord recorder spawn error: ${i}`,{level:"error"}),e.activeRecorder=null,r()}),!0}
function N(e){let o=u.of(e);if(o.nativeRecordingActive&&o.audioNapi){o.audioNapi.stopNativeRecording(),o.nativeRecordingActive=!1;return}if(o.activeRecorder)o.activeRecorder.kill("SIGTERM"),o.activeRecorder=null}
return {"checkRecordingAvailability":we,"checkVoiceDependencies":me,"requestMicrophonePermission":ve,"startRecording":F,"stopRecording":N};}
export function createNative287(ports){const {Tqr,Ie}=ports;
var a=null,i=!1;
function r(){if(i)return a;i=!0;let t="linux";if(t!=="darwin"&&t!=="linux"&&t!=="win32")return null;try{return a=Tqr(),a}catch{}let o=`arm64-${t}`,u=(t==="linux"?[o,`${o}-musl`]:[o]).flatMap((n)=>[`./vendor/audio-capture/${n}/audio-capture.node`,`../audio-capture/${n}/audio-capture.node`]);for(let n of u)try{return a=Ie(n),a}catch{}return null}
function c(){return r()!==null}
function l(t,o){let e=r();if(!e)return!1;return e.startRecording(t,o)}
function s(){let t=r();if(!t)return;t.stopRecording()}
function d(){let t=r();if(!t)return!1;return t.isRecording()}
function p(t,o){let e=r();if(!e)return!1;return e.startPlayback(t,o)}
function f(t){let o=r();if(!o)return;o.writePlaybackData(t)}
function m(){let t=r();if(!t)return;t.stopPlayback()}
function b(){let t=r();if(!t)return!1;return t.isPlaying()}
function v(){let t=r();if(!t||!t.microphoneAuthorizationStatus)return 0;return t.microphoneAuthorizationStatus()}
return {"isNativeAudioAvailable":c,"isNativePlaying":b,"isNativeRecordingActive":d,"microphoneAuthorizationStatus":v,"startNativePlayback":p,"startNativeRecording":l,"stopNativePlayback":m,"stopNativeRecording":s,"writeNativePlaybackData":f};}
export function createNativeShim287(ports){const {v,Ie}=ports;
var Tqr=v(function(R,T){T.exports=Ie("/$bunfs/root/audio-capture.node")});
return {"Tqr":Tqr};}
