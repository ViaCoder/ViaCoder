// Verbatim official 2.1.287 bare attachment predicate and complete flag closure.
export function createBareAttachmentFilter287(process){
function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)}
function i(e){let n=process.argv.indexOf("--");return(n===-1?process.argv:process.argv.slice(0,n)).includes(e)}
function xr(){return Le(process.env.CLAUDE_CODE_SIMPLE)||i("--bare")}
function hsn(e){if(!xr())return!1;let{type:n}=e.attachment;return n!=="queued_command"&&n!=="poll_events"}
return hsn;
}
