// Complete original fixed 2.1.287 u; no body edits.
export function createLogoutCommand287({Pt,n,cs,z_e,ite,e}){
async function u(r,o){let t=Pt();if(!t)z_e({action:"logout",success:!0,authMethod:"oauth"});if(await ite({clearOnboarding:!0,storageV5:o.storageV5,credentials:o.credentials}),t)return r("This background session shares credentials with other sessions; /logout here has no effect. Run /logout from your main terminal to sign out.",{display:"system"}),null;let a=e(n,{children:"Successfully logged out from your Anthropic account."});return setTimeout(()=>{cs(0,"logout")},200),a}
return {call:u};
}
