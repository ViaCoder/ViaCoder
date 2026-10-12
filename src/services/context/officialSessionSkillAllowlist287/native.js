// Original 2.1.287 getter/setter and exact first-initialize write phase.
import {z} from 'zod/v4'
const T=z.array,o=z.string;
export const initializeSkillsSchema287=T(o()).optional().describe('When provided, only skills whose names match an entry are loaded into the main session system prompt, matching the exact canonical name (e.g. "my-plugin:my-skill") or a ":name" suffix of it. Display names and aliases do not match. Omit to load every discovered skill. Applies to the main session only; subagents use AgentDefinition.skills, which additionally resolves display names and aliases.');
export function createSessionSkillAllowlist287({execution}){
const n=execution;
function eB(){return n().host.extensionsConfig.sessionSkillAllowlist()}
function Yto(e){n().host.extensionsConfig.replaceSessionSkillAllowlist(e)}
function applyInitializeSkills(e){if(e.skills!==void 0)Yto(e.skills);}
return {read:eB,replace:Yto,applyInitializeSkills};
}
