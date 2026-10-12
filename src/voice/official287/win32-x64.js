// Complete original 2.1.287 win32-x64 voice closures; host imports only.
export function createCommand287(ports){const {ZMe,i,vl,Te,le,et,hn,CHt,QYe,op,Fk,i_}=ports;
var V=2;
function L(s){let e=s.trim().toLowerCase();if(e==="")return;if(e==="hold"||e==="tap"||e==="off")return e;return"invalid"}
var D=async(s,e)=>{if(!QYe()){if(!vl())return{type:"text",value:"Voice mode requires a Claude.ai account. Please run /login to sign in."};let o=op("allow_voice_mode","Voice mode","is");if(o)return Fk("allow_voice_mode","slash_command"),{type:"text",value:o};return{type:"text",value:"Voice mode is not available."}}let a=et(),v=CHt(a),t=L(s);if(t==="invalid")return{type:"text",value:`Unknown mode: "${s.trim()}". Use hold, tap, or off.`};if(t==="off"||t===void 0&&v){if((await hn("userSettings",{voiceEnabled:!1,voice:{...a.voice,enabled:!1}},void 0,e.storageV5)).error)return{type:"text",value:"Failed to update settings. Check your settings file for syntax errors."};return i("tengu_voice_toggled",{enabled:!1}),{type:"text",value:"Voice mode disabled."}}let{isVoiceStreamAvailable:y}=await ports.importOriginal287("B:/~BUN/root/chunk-7jm6v13c.js"),{checkRecordingAvailability:h}=await ports.importOriginal287("B:/~BUN/root/chunk-r91ed2a1.js"),r=await h(e.session.host,{probeForwarded:!0});if(!r.available)return{type:"text",value:r.reason??"Voice mode is not available in this environment."};if(!y())return{type:"text",value:"Voice mode requires a Claude.ai account. Please run /login to sign in."};let{checkVoiceDependencies:b,requestMicrophonePermission:C}=await ports.importOriginal287("B:/~BUN/root/chunk-r91ed2a1.js"),c=await b(e.session.host);if(!c.available)return{type:"text",value:`No audio recording tool found.${c.installCommand?`
Install audio recording tools? Run: ${c.installCommand}`:`
Install SoX manually for audio recording.`}`};if(!await C(e.session.host)){let o;return o="Settings \u2192 Privacy \u2192 Microphone",{type:"text",value:`Microphone access is denied. To enable it, go to ${o}, then run /voice again.`}}let l=t==="hold"||t==="tap"?t:a.voice?.mode??"hold";if((await hn("userSettings",{voiceEnabled:!0,voice:{...a.voice,enabled:!0,mode:l}},void 0,e.storageV5)).error)return{type:"text",value:"Failed to update settings. Check your settings file for syntax errors."};i("tengu_voice_toggled",{enabled:!0,tap_mode:l==="tap"});let g=i_("voice:pushToTalk","Chat","space"),w=l==="tap"?`Tap ${g} (with input empty) to start, tap again to send.`:`Hold ${g} to record.`,n=ZMe(a.language),m=le(),p=m.voiceLangHintLastLanguage!==n.code,f=p?0:m.voiceLangHintShownCount??0,u=!n.fellBackFrom&&f<V,d="";if(n.fellBackFrom)d=` Note: "${n.fellBackFrom}" is not a supported dictation language; using English. Change it via /config.`;else if(u)d=` Dictation language: ${n.code} (/config to change).`;if(p||u)await Te((o)=>({...o,voiceLangHintShownCount:f+(u?1:0),voiceLangHintLastLanguage:n.code}),e.storageV5);let S=r.note?` ${r.note}`:"";return{type:"text",value:`Voice mode enabled (${l}). ${w}${d}${S}`}};
return {"call":D};}
export function createCapture287(ports){const {V,t,TS,a,O,ml,tt,h,m,v}=ports;
var M=v(m(),".cache","coder-audio","port"),W=v(m(),".cache","coder-audio","token");
class g{audioNapi=null;audioNapiPromise=null;arecordProbe=null;linuxAlsaCardsProbe=null;activeRecorder=null;activeForwardedSocket=null;forwardedStartGeneration=0;nativeRecordingActive=!1}
var l=new V(()=>new g);
var w={started:!0};
var S={started:!1,superseded:!1,hint:null,expected:!1};
function u(e){return e.audioNapiPromise??=(async()=>{let o=Date.now(),r=await ports.importOriginal287("B:/~BUN/root/chunk-bny5na9q.js");return r.isNativeAudioAvailable(),e.audioNapi=r,t(`[voice] audio-capture-napi loaded in ${Date.now()-o}ms`),r})(),e.audioNapiPromise}
var k=16000,x=1,E="2.0",b="3%";
async function f(e){return(await tt(e,["--version"],{timeout:3000,useCwd:!1})).code===0}
async function A(){return null}
async function ce(e){let o=l.of(e);if((await u(o)).isNativeAudioAvailable())return{available:!0,missing:[],installCommand:null};return{available:!1,missing:["Voice mode requires the native audio module (not loaded)"],installCommand:null}}
async function le(e){if(!(await u(l.of(e))).isNativeAudioAvailable())return!0;if((await y(e,(s)=>{},()=>{},{silenceDetection:!1})).started)return C(e),!0;return!1}
async function ue(e,o={}){if(TS()||a.CLAUDE_CODE_REMOTE)return{available:!1,reason:`Voice mode requires microphone access, but no audio device is available in this environment.

To use voice mode, run Claude Code locally instead.`};let r=l.of(e);if((await u(r)).isNativeAudioAvailable())return{available:!0,reason:null};return{available:!1,reason:"Voice recording requires the native audio module, which could not be loaded."}}
async function y(e,o,r,s){t("[voice] startRecording called, platform=win32");let n=l.of(e),d=await u(n),i=d.isNativeAudioAvailable()&&!0,c=s?.silenceDetection!==!1;if(i){if(n.nativeRecordingActive||d.isNativeRecordingActive())d.stopNativeRecording(),n.nativeRecordingActive=!1;if(d.startNativeRecording((p)=>{o(p)},()=>{if(c)n.nativeRecordingActive=!1,r()}))return n.nativeRecordingActive=!0,w}return t("[voice] Windows native recording unavailable, no fallback"),S}
function P(e,o,r,s){let n=s?.silenceDetection!==!1,d=["-q","--buffer","1024","-t","raw","-r",String(k),"-e","signed","-b","16","-c",String(x),"-"];if(n)d.push("silence","1","0.1",b,"1",E,b);let i=h("rec",d,{stdio:["pipe","pipe","pipe"],windowsHide:!0,...ml("helper")});return e.activeRecorder=i,i.stdout?.on("data",(c)=>{o(c)}),i.stderr?.on("data",()=>{}),i.on("close",()=>{e.activeRecorder=null,r()}),i.on("error",(c)=>{t(`[voice] SoX rec spawn failed: ${c instanceof Error?c.message:String(c)}`,{level:"error"}),e.activeRecorder=null,r()}),!0}
function C(e){let o=l.of(e);if(o.nativeRecordingActive&&o.audioNapi){o.audioNapi.stopNativeRecording(),o.nativeRecordingActive=!1;return}if(o.activeRecorder)o.activeRecorder.kill("SIGTERM"),o.activeRecorder=null}
return {"checkRecordingAvailability":ue,"checkVoiceDependencies":ce,"requestMicrophonePermission":le,"startRecording":y,"stopRecording":C};}
export function createNative287(ports){const {DVr,De}=ports;
var a=null,i=!1;
function r(){if(i)return a;i=!0;let t="win32";if(t!=="darwin"&&t!=="linux"&&t!=="win32")return null;try{return a=DVr(),a}catch{}let o=`x64-${t}`,u=(t==="linux"?[o,`${o}-musl`]:[o]).flatMap((n)=>[`./vendor/audio-capture/${n}/audio-capture.node`,`../audio-capture/${n}/audio-capture.node`]);for(let n of u)try{return a=De(n),a}catch{}return null}
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
export function createNativeShim287(ports){const {E,De}=ports;
var DVr=E(function(A,H){H.exports=De("B:/~BUN/root/audio-capture.node")});
return {"DVr":DVr};}
