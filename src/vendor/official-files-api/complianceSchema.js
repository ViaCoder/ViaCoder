// Official npm 2.1.283: unchanged declarations and compliance_taints property initializer.
import {array as k,unknown as ae} from 'zod/v4';import {JH} from './unicode.js';import {re} from './strings.js';import {M} from './stateHost.js';
function ee(e){let n=re(JH(e,"").toLowerCase(),64).trim();return/^[a-z0-9_-]+$/.test(n)?n:""}
var FKe=16;
export const complianceTaintsSchema=k(ae()).default([]).transform((e,n)=>{let i=M(e.filter((r)=>typeof r==="string").map(ee).filter((r)=>r.length>0)).slice(0,FKe);if(e.length>0&&i.length===0)n.addIssue({code:"custom",message:"compliance_taints had entries but none were well-formed regime names"});return i});
