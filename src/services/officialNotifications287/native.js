// Fixed official287 notification body; existing owners supplied by the caller.
export function createNotifications287({Xd,S,c,bn,a,i,y,m,MZ,Vo,i1,ZO,w}){
var h=/^[A-Za-z0-9][A-Za-z0-9._+-]{0,63}$/;
function wCt(e){if(e==null)return;if(h.test(e))return bn(e);return S("nonconforming")};
async function kD(e,n,{storageV5:r,credentials:o}={}){let s=Vo("preferredNotifChannel","auto").value;await ZO(i1(),e,{storageV5:r,credentials:o});let l=await E(s,e,n);if(l==="error")m("notification_show","send_failed");else y("notification_show");i("tengu_notification_method_used",{configured_channel:c(MZ.includes(s)?s:"invalid"),notification_type:c(e.notificationType),method_used:c(l),term:wCt(a.terminal),attacher_term:wCt(Xd()?.terminal)})};
var p="Claude Code";
async function E(e,n,r){if(e==="auto"){let s=await I();return _(s,n,r),s}let o;switch(e){case"iterm2":case"iterm2_with_bell":case"kitty":case"ghostty":case"terminal_bell":o=e;break;case"notifications_disabled":o="disabled";break;default:o="none"}try{return _(o,n,r),o}catch{return"error"}};
async function I(){switch(Xd()?.terminal??a.terminal){case"Apple_Terminal":return await w()?"terminal_bell":"no_method_available";case"iTerm.app":return"iterm2";case"kitty":return"kitty";case"ghostty":return"ghostty";default:return"no_method_available"}};
function _(e,n,r){switch(e){case"iterm2":r.notifyITerm2(n);return;case"iterm2_with_bell":r.notifyITerm2(n),r.notifyBell();return;case"kitty":r.notifyKitty({...n,title:n.title||p,id:O()});return;case"ghostty":r.notifyGhostty({...n,title:n.title||p});return;case"terminal_bell":r.notifyBell();return;case"disabled":case"none":case"no_method_available":return}};
function O(){return Math.floor(Math.random()*1e4)};
return {send:kD,channel:E,automatic:I,display:_,terminalCategory:wCt};
}
