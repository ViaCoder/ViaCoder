// Complete pinned official model naming, knowledge cutoff and model prompt text functions.
export function createModelPromptMetadata287({Be,He,xa}){
var UI=new Set(["claude-opus-4-6","claude-opus-4-7","claude-opus-4-8","claude-opus-5","claude-opus-5-5","claude-sonnet-4-0","claude-sonnet-4-5","claude-sonnet-4-6"]);
var BI=new Map([["claude-3-7-sonnet","Claude 3.7 Sonnet"],["claude-3-5-sonnet","Claude 3.5 Sonnet"],["claude-3-5-haiku","Claude 3.5 Haiku"]]);
function Wp(e){if(He()==="foundry")return;let n=Be(e,{identity:!0}),r=BI.get(n);if(r!==void 0)return r;let s=xa(n);if(!s)return;return e.toLowerCase().includes("[1m]")&&UI.has(n)?`${s.display_name} (1M context)`:s.display_name};
function h_n(e){return xa(Be(e))?.knowledge_cutoff??null};
function V3e(e){return{modelId:e,marketingName:Wp(e)??null,knowledgeCutoff:h_n(e)}};
function __n(e){return e.marketingName?`You are powered by the model named ${e.marketingName}. The exact model ID is ${e.modelId}.`:`You are powered by the model ${e.modelId}.`};
function v_n(e){return e.knowledgeCutoff?`Assistant knowledge cutoff is ${e.knowledgeCutoff}.`:null};
function Y3e(e){return[__n(e),v_n(e)].filter((n)=>n!==null).join(" ")};
return {marketingName:Wp,knowledgeCutoff:h_n,identity:V3e,text:Y3e};
}
