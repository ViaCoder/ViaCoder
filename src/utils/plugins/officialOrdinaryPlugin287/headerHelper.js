import {z} from "zod/v4";
const o=()=>z.string();
function Bo(){return o().max(iZe,{message:"headersHelper must not be longer than the install consent UI can display"}).refine((e)=>!Ci.test(e),{message:"headersHelper must be printable ASCII (letters, digits, punctuation, single spaces) with no runs of 4 or more spaces"})};
const iZe=500;
const Ci=/[^\x20-\x7E]| {4,}/;
export const originalHeaderHelperSchema287=Bo;
