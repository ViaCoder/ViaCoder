// Complete fixed original aJo ProTrial stage; sole fixed import transport.
export function createProTrialStartupStage287(ports){return new Function("ports","const {rnt,i,e,T,x,importScreen287}=ports;return (async(u)=>{if(rnt().status!==\"not_started\")return null;let{ProTrialStartScreen:f}=await importScreen287();return i(\"tengu_pro_trial_start_screen_shown\",{}),e(f,{onDone:()=>u(),storageV5:T,credentials:x})});")(ports)}
// Complete original post-trust import/then/catch consumer; fixed transport only.
export function createHeldHooksStartup287(ports){return new Function("ports","const {T,x,d,Z,importHeldHooks287}=ports;return ()=>(importHeldHooks287().then((u)=>u.loadHooksModulesHeldForTrust(T,x)).catch((u)=>d(Z(u))));")(ports)}
