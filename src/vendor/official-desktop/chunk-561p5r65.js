// @bun @bytecode
// Claude Code is a Beta product per Anthropic's Commercial Terms of Service.
// By using Claude Code, you agree that all code acceptance or rejection decisions you make,
// and the associated conversations in context, constitute Feedback under Anthropic's Commercial Terms,
// and may be used to improve Anthropic's products, including training models.
// You are responsible for reviewing any code suggestions before use.

// (c) Anthropic PBC. All rights reserved. Use is subject to the Legal Agreements outlined here: https://code.claude.com/docs/en/legal-and-compliance.

// Version: 2.1.283
var xAt={pxPerToken:28,maxTargetPx:1568,maxTargetTokens:1568};function l(e,r){return Math.floor((e-1)/r)+1}function A(e,r,t){return l(e,t)*l(r,t)}function Ttt(e,r,t){let{pxPerToken:s,maxTargetPx:n,maxTargetTokens:i}=t;if(e<=n&&r<=n&&A(e,r,s)<=i)return[e,r];if(r>e){let[o,u]=Ttt(r,e,t);return[u,o]}let m=e/r,p=e,a=1;for(;;){if(a+1===p)return[a,Math.max(Math.round(a/m),1)];let o=Math.floor((a+p)/2),u=Math.max(Math.round(o/m),1);if(o<=n&&A(o,u,s)<=i)a=o;else p=o}}var Rtt=0.1,lGe=1,M0n=lGe;function ugr(e){if(e===void 0)return;if(typeof e!=="number"||!Number.isFinite(e)||e<Rtt||e>lGe)return{error:`scale must be a number in [${Rtt}, ${lGe}] \u2014 e.g. 0.5 for a half-size image`};return e}var L0n=`Scale factor in [${Rtt}, ${lGe}] for the returned image; 1 (default) uses the full image token budget, 0.5 returns an image at half the width and height (~quarter of the tokens). Coordinates are ALWAYS in the full-resolution coordinate frame (reported with every scaled screenshot), never in the scaled image's own pixels.`;function N0n(e,r,t){return`${e}-scale view; coordinate frame: ${r}x${t}.`}function pgr(e,r){let[t,s]=e,n=Number.isFinite(r)&&r>=Rtt&&r<=lGe?r:M0n;return[Math.max(1,Math.round(t*n)),Math.max(1,Math.round(s*n))]}export{xAt,Ttt,Rtt,lGe,M0n,ugr,L0n,N0n,pgr};
