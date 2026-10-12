// Generated complete official command expressions; host dependencies are injected.
export function createCommands({Qan,Qe,le,Ce,jlt,Kzt,can,Blt}) {
const XVo={type:"local-jsx",name:"focus",description:"Toggle focus view: just your prompt, summary, and response",immediate:!0,requires:{ink:!0},terminalOriented:!0,load:()=>Promise.resolve({async call(e,n){if(Qan(null),n.presentation!=="fullscreen"){if(Qe().viewMode==="focus")return e(`Focus view is set by "viewMode": "focus" in settings.json \u2014 remove it there and restart Claude Code to turn it off. ${"Focus view needs the fullscreen renderer. Run /tui fullscreen to switch (this restarts and resumes your session), or set CLAUDE_CODE_NO_FLICKER=1 and restart."}`,{display:"system"}),null;if(n.getAppState().briefTranscript||le().briefTranscript){if(n.onQueryEvent?.({type:"apply_flag_settings",settings:{briefTranscript:!1}}),le().briefTranscript)await Ce((w)=>({...w,briefTranscript:!1}),n.storageV5);jlt();let b=Kzt(!1);return e(`Focus view disabled.${b??""} Focus view needs the fullscreen renderer. Run /tui fullscreen to switch (this restarts and resumes your session), or set CLAUDE_CODE_NO_FLICKER=1 and restart.`,{display:"system"}),null}return e("Focus view needs the fullscreen renderer. Run /tui fullscreen to switch (this restarts and resumes your session), or set CLAUDE_CODE_NO_FLICKER=1 and restart.",{display:"system"}),null}let s=!n.getAppState().briefTranscript;if(n.onQueryEvent?.({type:"apply_flag_settings",settings:{briefTranscript:s}}),le().briefTranscript!==s)await Ce((b)=>({...b,briefTranscript:s}),n.storageV5);jlt();let g=Qe().viewMode,h=Kzt(g?g==="focus":s);return e(`${s?"Focus view enabled":"Focus view disabled"}${h??""}`,{display:"system"}),null}})};
async function r(n, o) { if (can(o))
    return { type: "text", value: "/focus isn't available here yet" }; let t = n.trim().toLowerCase(), e; if (t === "on")
    e = !0;
else if (t === "off")
    e = !1;
else if (t === "")
    e = !Blt();
else
    return { type: "text", value: `Unknown argument "${t}". Use: /focus [on|off]` }; Qan(e ? "focus" : "default"), o.onQueryEvent?.({ type: "apply_flag_settings", settings: { briefTranscript: e } }); let s = Blt(); if (s !== e)
    return { type: "text", value: `Focus view is set by a managed "viewMode" setting \u2014 it stays ${s ? "on" : "off"}` }; return { type: "text", value: e ? "Focus view enabled" : "Focus view disabled" }; }
return {interactive:XVo.load, text:r};
}
