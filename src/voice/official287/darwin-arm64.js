// Complete original 2.1.287 darwin-arm64 voice closures; host imports only.
export function createCommand287(ports){const {sHe,i,vl,Ae,le,tt,hn,LNt,s9e,op,$C,o_}=ports;
var V=2;
function L(s){let e=s.trim().toLowerCase();if(e==="")return;if(e==="hold"||e==="tap"||e==="off")return e;return"invalid"}
var D=async(s,e)=>{if(!s9e()){if(!vl())return{type:"text",value:"Voice mode requires a Claude.ai account. Please run /login to sign in."};let o=op("allow_voice_mode","Voice mode","is");if(o)return $C("allow_voice_mode","slash_command"),{type:"text",value:o};return{type:"text",value:"Voice mode is not available."}}let a=tt(),v=LNt(a),t=L(s);if(t==="invalid")return{type:"text",value:`Unknown mode: "${s.trim()}". Use hold, tap, or off.`};if(t==="off"||t===void 0&&v){if((await hn("userSettings",{voiceEnabled:!1,voice:{...a.voice,enabled:!1}},void 0,e.storageV5)).error)return{type:"text",value:"Failed to update settings. Check your settings file for syntax errors."};return i("tengu_voice_toggled",{enabled:!1}),{type:"text",value:"Voice mode disabled."}}let{isVoiceStreamAvailable:y}=await ports.importOriginal287("/$bunfs/root/chunk-4twtt9pw.js"),{checkRecordingAvailability:h}=await ports.importOriginal287("/$bunfs/root/chunk-zz5gfvgg.js"),r=await h(e.session.host,{probeForwarded:!0});if(!r.available)return{type:"text",value:r.reason??"Voice mode is not available in this environment."};if(!y())return{type:"text",value:"Voice mode requires a Claude.ai account. Please run /login to sign in."};let{checkVoiceDependencies:b,requestMicrophonePermission:C}=await ports.importOriginal287("/$bunfs/root/chunk-zz5gfvgg.js"),c=await b(e.session.host);if(!c.available)return{type:"text",value:`No audio recording tool found.${c.installCommand?`
Install audio recording tools? Run: ${c.installCommand}`:`
Install SoX manually for audio recording.`}`};if(!await C(e.session.host)){let o;return o="System Settings \u2192 Privacy & Security \u2192 Microphone",{type:"text",value:`Microphone access is denied. To enable it, go to ${o}, then run /voice again.`}}let l=t==="hold"||t==="tap"?t:a.voice?.mode??"hold";if((await hn("userSettings",{voiceEnabled:!0,voice:{...a.voice,enabled:!0,mode:l}},void 0,e.storageV5)).error)return{type:"text",value:"Failed to update settings. Check your settings file for syntax errors."};i("tengu_voice_toggled",{enabled:!0,tap_mode:l==="tap"});let g=o_("voice:pushToTalk","Chat","space"),w=l==="tap"?`Tap ${g} (with input empty) to start, tap again to send.`:`Hold ${g} to record.`,n=sHe(a.language),m=le(),p=m.voiceLangHintLastLanguage!==n.code,f=p?0:m.voiceLangHintShownCount??0,u=!n.fellBackFrom&&f<V,d="";if(n.fellBackFrom)d=` Note: "${n.fellBackFrom}" is not a supported dictation language; using English. Change it via /config.`;else if(u)d=` Dictation language: ${n.code} (/config to change).`;if(p||u)await Ae((o)=>({...o,voiceLangHintShownCount:f+(u?1:0),voiceLangHintLastLanguage:n.code}),e.storageV5);let S=r.note?` ${r.note}`:"";return{type:"text",value:`Voice mode enabled (${l}). ${w}${d}${S}`}};
return {"call":D};}
export function createCapture287(ports){const {V,t,Cb,a,O,Ga,Ke,R,m,v}=ports;
var M=v(m(),".cache","coder-audio","port"),W=v(m(),".cache","coder-audio","token");
class g{audioNapi=null;audioNapiPromise=null;arecordProbe=null;linuxAlsaCardsProbe=null;activeRecorder=null;activeForwardedSocket=null;forwardedStartGeneration=0;nativeRecordingActive=!1}
var l=new V(()=>new g);
var w={started:!0};
var h={started:!1,superseded:!1,hint:null,expected:!1};
function f(e){return e.audioNapiPromise??=(async()=>{let o=Date.now(),r=await ports.importOriginal287("/$bunfs/root/chunk-m1csvk08.js");return r.isNativeAudioAvailable(),e.audioNapi=r,t(`[voice] audio-capture-napi loaded in ${Date.now()-o}ms`),r})(),e.audioNapiPromise}
var k=16000,x=1,E="2.0",S="3%";
async function u(e){return(await Ke(e,["--version"],{timeout:3000,useCwd:!1})).code===0}
async function b(){if(await u("brew"))return{cmd:"brew",args:["install","sox"],displayCommand:"brew install sox"};return null}
async function ce(e){let o=l.of(e);if((await f(o)).isNativeAudioAvailable())return{available:!0,missing:[],installCommand:null};let s=[];if(!await u("sox"))s.push("sox (rec command)");let n=s.length>0?await b():null;return{available:s.length===0,missing:s,installCommand:n?.displayCommand??null}}
async function le(e){if(!(await f(l.of(e))).isNativeAudioAvailable())return!0;if((await y(e,(s)=>{},()=>{},{silenceDetection:!1})).started)return C(e),!0;return!1}
async function ue(e,o={}){if(Cb()||a.CLAUDE_CODE_REMOTE)return{available:!1,reason:`Voice mode requires microphone access, but no audio device is available in this environment.

To use voice mode, run Claude Code locally instead.`};let r=l.of(e);if((await f(r)).isNativeAudioAvailable())return{available:!0,reason:null};let n=`Voice mode could not find a working audio recorder in WSL.

`+`WSL2 with WSLg provides audio via PulseAudio \u2014 install SoX with its PulseAudio backend (sudo apt install sox libsox-fmt-pulse) so Claude Code can record through it.

`+"If WSLg is not available (for example WSL1), run Claude Code in native Windows instead.",d=await u("sox");if(d&&await u("rec"))return{available:!0,reason:null};if(O()==="wsl")return{available:!1,reason:n};if(!d){let i=await b();return{available:!1,reason:i?`Voice mode requires SoX for audio recording. Install it with: ${i.displayCommand}`:`Voice mode requires SoX for audio recording. Install SoX manually:
  macOS: brew install sox
  Ubuntu/Debian: sudo apt-get install sox
  Fedora: sudo dnf install sox`}}return{available:!1,reason:`Voice mode requires a microphone, but SoX could not open an audio capture device.

This usually means the host has no microphone (for example, a remote server). Run Claude Code on a machine with a microphone to use voice input.`}}
async function y(e,o,r,s){t("[voice] startRecording called, platform=darwin");let n=l.of(e),d=await f(n),i=d.isNativeAudioAvailable()&&!0,c=s?.silenceDetection!==!1;if(i){if(n.nativeRecordingActive||d.isNativeRecordingActive())d.stopNativeRecording(),n.nativeRecordingActive=!1;if(d.startNativeRecording((p)=>{o(p)},()=>{if(c)n.nativeRecordingActive=!1,r()}))return n.nativeRecordingActive=!0,w}return P(n,o,r,s)?w:h}
function P(e,o,r,s){let n=s?.silenceDetection!==!1,d=["-q","--buffer","1024","-t","raw","-r",String(k),"-e","signed","-b","16","-c",String(x),"-"];if(n)d.push("silence","1","0.1",S,"1",E,S);let i=R("rec",d,{stdio:["pipe","pipe","pipe"],windowsHide:!0,...Ga("helper")});return e.activeRecorder=i,i.stdout?.on("data",(c)=>{o(c)}),i.stderr?.on("data",()=>{}),i.on("close",()=>{e.activeRecorder=null,r()}),i.on("error",(c)=>{t(`[voice] SoX rec spawn failed: ${c instanceof Error?c.message:String(c)}`,{level:"error"}),e.activeRecorder=null,r()}),!0}
function C(e){let o=l.of(e);if(o.nativeRecordingActive&&o.audioNapi){o.audioNapi.stopNativeRecording(),o.nativeRecordingActive=!1;return}if(o.activeRecorder)o.activeRecorder.kill("SIGTERM"),o.activeRecorder=null}
return {"checkRecordingAvailability":ue,"checkVoiceDependencies":ce,"requestMicrophonePermission":le,"startRecording":y,"stopRecording":C};}
export function createNative287(ports){const {Qzr,Ie}=ports;
var a=null,i=!1;
function r(){if(i)return a;i=!0;let t="darwin";if(t!=="darwin"&&t!=="linux"&&t!=="win32")return null;try{return a=Qzr(),a}catch{}let o=`arm64-${t}`,u=(t==="linux"?[o,`${o}-musl`]:[o]).flatMap((n)=>[`./vendor/audio-capture/${n}/audio-capture.node`,`../audio-capture/${n}/audio-capture.node`]);for(let n of u)try{return a=Ie(n),a}catch{}return null}
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
var Qzr=v(function(R,T){T.exports=Ie("/$bunfs/root/audio-capture.node")});
return {"Qzr":Qzr};}
