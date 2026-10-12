// Complete original yUn/bVo/cc/SVo/No/Tb closures; source-qualified IO ports are mandatory.

function module0(imports){
const n=imports["n"];
function TZr(e){return n().costLedger.usageForModel(e)};
function Qfe(e){return n().host.requestLatches.inferenceProfileBackingModels().get(e)};
function xno(e,t){n().host.requestLatches.recordInferenceProfileBackingModel(e,t)};
return {TZr,Qfe,xno};
}
function module1(imports){

function oA(){return};
function Zj(e){return e==="helper"||e==="plist"||e==="hklm"||e==="file"};
return {oA,Zj};
}
function module2(imports){

var QZ=["us","eu","apac","jp","au","us-gov","global"];
return {QZ};
}
function module3(imports){
const QZ=imports["QZ"];
var hse=["claude-3-5-haiku","claude-3-5-sonnet","claude-3-7-sonnet","claude-fable-5","claude-fable-5-1","claude-haiku-4-5","claude-mythos-5","claude-mythos-5-1","claude-opus-4-0","claude-opus-4-1","claude-opus-4-5","claude-opus-4-6","claude-opus-4-7","claude-opus-4-8","claude-opus-5","claude-opus-5-5","claude-sonnet-4-0","claude-sonnet-4-5","claude-sonnet-4-6","claude-sonnet-5","claude-sonnet-5-5"];
var MSt="claude-mythos-preview";
function Ct(e){return e.replace(/\[1m\]$/i,"")};
function cI(e,n){return Ct(e).toLowerCase()===Ct(n).toLowerCase()};
function Fn(e){return e.replace(/\[(1|2)m\]/gi,"")};
function wu(e){let n=e.trim().toLowerCase();if(n===""||/\s/.test(n))return null;n=n.replace(/\[[12]m\]$/,"");let s=n.lastIndexOf("/");if(s!==-1)n=n.slice(s+1);let t=/^(?:([a-z-]+)\.)?anthropic\.(claude-.*)$/.exec(n);if(t){let[,a,l=""]=t;if(a!==void 0&&!QZ.includes(a))return null;n=l}let r=u(n);if(!r)return null;let o=n.slice(r.base.length);if(o!==""&&!/^[-@]/.test(o))return null;let i={family:r.family,major:r.major,legacyVersionFirst:r.legacyVersionFirst,base:r.base};if(r.minor!==void 0)i.minor=r.minor;if(!$8r(o))i.trailer=o;else{let a=/(?:-v\d+@|[-@])(\d{8})/.exec(o)?.[1];if(a!==void 0)i.date=a}return i};
function $8r(e){return/^(?:-fast|-latest)?(?:-v\d{1,3}@\d{8}|[-@]\d{8})?(?:-v\d{1,3}(?::\d{1,3})?)?$/.test(e)};
function N9o(e){return/-v\d+(?::\d+)?$/.test(e)};
function qj(e){return e!==null&&e.trailer===void 0};
function u0e(e,n){return e.major-n.major||(e.minor??0)-(n.minor??0)};
function qQe(e,n){return e.family===n.family&&e.legacyVersionFirst===n.legacyVersionFirst&&u0e(e,n)===0};
function u(e){let n=/^claude-([a-z]+)-(\d{1,2})(?!\d)(?:-(\d{1,2})(?!\d))?/.exec(e);if(n){let[t,r="",o="",i]=n;return{family:r,major:Number(o),minor:i===void 0?void 0:Number(i),legacyVersionFirst:!1,base:t}}let s=/^claude-(\d{1,2})(?!\d)(?:-(\d{1,2})(?!\d))?-([a-z]+)/.exec(e);if(s){let[t,r="",o,i=""]=s;return{family:i,major:Number(r),minor:o===void 0?void 0:Number(o),legacyVersionFirst:!0,base:t}}return null};
return {hse,MSt,Ct,cI,Fn,wu,$8r,N9o,qj,u0e,qQe,u};
}
function module4(imports){

class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}};
return {P};
}
function module5(imports){
const cL=imports["cL"];
const He=imports["He"];
const P=imports["P"];
const a=imports["a"];
const N9o=imports["N9o"];
const Ct=imports["Ct"];
var Vtr={"//":"Hand-maintained baked-in model catalog \u2014 the source of truth for per-model provider IDs and metadata. On model launch add one entry to `models` below; `bun run generate:model-catalog` validates this file against the schema and formats it.",schema_version:1,pricing_tiers:{tier_2_10:{input:2,output:10,cache_write_5m:2.5,cache_write_1h:4,cache_read:0.2,web_search:0.01},tier_3_15:{input:3,output:15,cache_write_5m:3.75,cache_write_1h:6,cache_read:0.3,web_search:0.01},tier_5_25:{input:5,output:25,cache_write_5m:6.25,cache_write_1h:10,cache_read:0.5,web_search:0.01},tier_15_75:{input:15,output:75,cache_write_5m:18.75,cache_write_1h:30,cache_read:1.5,web_search:0.01},tier_10_50:{input:10,output:50,cache_write_5m:12.5,cache_write_1h:20,cache_read:1,web_search:0.01},tier_10_50_cache_read_0_25:{input:10,output:50,cache_write_5m:12.5,cache_write_1h:20,cache_read:0.25,web_search:0.01},tier_4_20_cache_read_0_20:{input:4,output:20,cache_write_5m:5,cache_write_1h:8,cache_read:0.2,web_search:0.01},haiku_35:{input:0.8,output:4,cache_write_5m:1,cache_write_1h:1.6,cache_read:0.08,web_search:0.01},haiku_45:{input:1,output:5,cache_write_5m:1.25,cache_write_1h:2,cache_read:0.1,web_search:0.01}},models:[{id:"claude-3-5-haiku",family:"haiku",display_name:"Haiku 3.5",provider_ids:{first_party:"claude-3-5-haiku-20241022",bedrock:"us.anthropic.claude-3-5-haiku-20241022-v1:0",vertex:"claude-3-5-haiku@20241022",foundry:"claude-3-5-haiku",anthropic_aws:"claude-3-5-haiku-20241022",anthropic_google_cloud:null,mantle:null,gateway:"claude-3-5-haiku-20241022"},eager_input_streaming:{vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_3_5_HAIKU",max_output_tokens:{default:8192,upper:8192},pricing:"haiku_35",capabilities:[]},{id:"claude-haiku-4-5",family:"haiku",display_name:"Haiku 4.5",knowledge_cutoff:"February 2025",provider_ids:{first_party:"claude-haiku-4-5-20251001",bedrock:"us.anthropic.claude-haiku-4-5-20251001-v1:0",vertex:"claude-haiku-4-5@20251001",foundry:"claude-haiku-4-5",anthropic_aws:"claude-haiku-4-5-20251001",anthropic_google_cloud:"claude-haiku-4-5-20251001",mantle:"anthropic.claude-haiku-4-5",gateway:"claude-haiku-4-5-20251001"},vertex_region_env_var:"VERTEX_REGION_CLAUDE_HAIKU_4_5",context:{window:200000,supports_1m_suffix:!0},max_output_tokens:{default:32000,upper:64000},pricing:"haiku_45",capabilities:["context_management"],advisor_rank:1},{id:"claude-3-5-sonnet",family:"sonnet",display_name:"Sonnet 3.5",provider_ids:{first_party:"claude-3-5-sonnet-20241022",bedrock:"us.anthropic.claude-3-5-sonnet-20241022-v2:0",vertex:"claude-3-5-sonnet-v2@20241022",foundry:"claude-3-5-sonnet",anthropic_aws:"claude-3-5-sonnet-20241022",anthropic_google_cloud:null,mantle:null,gateway:"claude-3-5-sonnet-20241022"},vertex_region_env_var:"VERTEX_REGION_CLAUDE_3_5_SONNET",max_output_tokens:{default:8192,upper:8192},pricing:"tier_3_15",capabilities:[]},{id:"claude-3-7-sonnet",family:"sonnet",display_name:"Sonnet 3.7",provider_ids:{first_party:"claude-3-7-sonnet-20250219",bedrock:"us.anthropic.claude-3-7-sonnet-20250219-v1:0",vertex:"claude-3-7-sonnet@20250219",foundry:"claude-3-7-sonnet",anthropic_aws:"claude-3-7-sonnet-20250219",anthropic_google_cloud:null,mantle:null,gateway:"claude-3-7-sonnet-20250219"},vertex_region_env_var:"VERTEX_REGION_CLAUDE_3_7_SONNET",max_output_tokens:{default:32000,upper:64000},pricing:"tier_3_15",capabilities:[]},{id:"claude-sonnet-4-0",family:"sonnet",display_name:"Sonnet 4",knowledge_cutoff:"January 2025",provider_ids:{first_party:"claude-sonnet-4-20250514",bedrock:"us.anthropic.claude-sonnet-4-20250514-v1:0",vertex:"claude-sonnet-4@20250514",foundry:"claude-sonnet-4",anthropic_aws:"claude-sonnet-4-20250514",anthropic_google_cloud:null,mantle:null,gateway:"claude-sonnet-4-20250514"},eager_input_streaming:{vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_4_0_SONNET",context:{window:200000,supports_1m_beta:!0,supports_1m_suffix:!0},max_output_tokens:{default:32000,upper:64000},pricing:"tier_3_15",capabilities:["context_management"]},{id:"claude-sonnet-4-5",family:"sonnet",display_name:"Sonnet 4.5",knowledge_cutoff:"January 2025",provider_ids:{first_party:"claude-sonnet-4-5-20250929",bedrock:"us.anthropic.claude-sonnet-4-5-20250929-v1:0",vertex:"claude-sonnet-4-5@20250929",foundry:"claude-sonnet-4-5",anthropic_aws:"claude-sonnet-4-5-20250929",anthropic_google_cloud:"claude-sonnet-4-5-20250929",mantle:null,gateway:"claude-sonnet-4-5-20250929"},eager_input_streaming:{vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_4_5_SONNET",fallback_3p:"claude-sonnet-4-0",context:{window:200000,supports_1m_beta:!0,supports_1m_suffix:!0},max_output_tokens:{default:32000,upper:64000},pricing:"tier_3_15",capabilities:["context_management"]},{id:"claude-sonnet-4-6",family:"sonnet",display_name:"Sonnet 4.6",knowledge_cutoff:"August 2025",provider_ids:{first_party:"claude-sonnet-4-6",bedrock:"us.anthropic.claude-sonnet-4-6",vertex:"claude-sonnet-4-6",foundry:"claude-sonnet-4-6",anthropic_aws:"claude-sonnet-4-6",anthropic_google_cloud:"claude-sonnet-4-6",mantle:null,gateway:"claude-sonnet-4-6"},eager_input_streaming:{bedrock:!0,vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_4_6_SONNET",fallback_3p:"claude-sonnet-4-5",context:{window:200000,supports_1m_beta:!0,supports_1m_suffix:!0},max_output_tokens:{default:32000,upper:128000},pricing:"tier_3_15",capabilities:["effort","max_effort","adaptive_thinking","context_management"],advisor_rank:2},{id:"claude-sonnet-5",family:"sonnet",display_name:"Sonnet 5",knowledge_cutoff:"January 2026",provider_ids:{first_party:"claude-sonnet-5",bedrock:"us.anthropic.claude-sonnet-5",vertex:"claude-sonnet-5",foundry:"claude-sonnet-5",anthropic_aws:"claude-sonnet-5",anthropic_google_cloud:"claude-sonnet-5",mantle:"anthropic.claude-sonnet-5",gateway:"claude-sonnet-5"},eager_input_streaming:{bedrock:!0,vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_5_SONNET",fallback_3p:"claude-sonnet-4-6",context:{window:1e6,native_1m:!0,supports_1m_beta:!0},max_output_tokens:{default:64000,upper:128000},pricing:"tier_2_10",capabilities:["effort","max_effort","xhigh_effort","adaptive_thinking","mid_conv_system","context_management"],default_effort:"high",effort_cost_index:{low:0.47,medium:0.74,high:1,xhigh:2.41,max:5.59},image_limits:{maxWidth:2000,maxHeight:2000},advisor_rank:4},{id:"claude-sonnet-5-5",family:"sonnet",display_name:"Sonnet 5.5",knowledge_cutoff:"June 2026",provider_ids:{first_party:"claude-sonnet-5-5",bedrock:"us.anthropic.claude-sonnet-5-5",vertex:"claude-sonnet-5-5",foundry:"claude-sonnet-5-5",anthropic_aws:"claude-sonnet-5-5",anthropic_google_cloud:"claude-sonnet-5-5",mantle:"anthropic.claude-sonnet-5-5",gateway:"claude-sonnet-5-5"},eager_input_streaming:{bedrock:!0,vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_5_5_SONNET",fallback_3p:"claude-sonnet-5",context:{window:1e6,native_1m:!0,supports_1m_beta:!0},max_output_tokens:{default:128000,upper:128000},pricing:"tier_2_10",capabilities:["effort","max_effort","xhigh_effort","adaptive_thinking","mid_conv_system","mid_conv_tool_change","context_management","rejects_disabled_thinking","per_turn_effort","lean_prompt","refusal_fallback","silent_turn_reminder","org_locked_thinking"],default_effort:"medium",image_limits:{maxWidth:2000,maxHeight:2000},advisor_rank:6},{id:"claude-opus-4-0",family:"opus",display_name:"Opus 4",knowledge_cutoff:"January 2025",provider_ids:{first_party:"claude-opus-4-20250514",bedrock:"us.anthropic.claude-opus-4-20250514-v1:0",vertex:"claude-opus-4@20250514",foundry:"claude-opus-4",anthropic_aws:"claude-opus-4-20250514",anthropic_google_cloud:null,mantle:null,gateway:"claude-opus-4-20250514"},vertex_region_env_var:"VERTEX_REGION_CLAUDE_4_0_OPUS",context:{window:200000,supports_1m_suffix:!0},max_output_tokens:{default:32000,upper:32000},pricing:"tier_15_75",capabilities:["context_management"]},{id:"claude-opus-4-1",family:"opus",display_name:"Opus 4.1",knowledge_cutoff:"January 2025",provider_ids:{first_party:"claude-opus-4-1-20250805",bedrock:"us.anthropic.claude-opus-4-1-20250805-v1:0",vertex:"claude-opus-4-1@20250805",foundry:"claude-opus-4-1",anthropic_aws:"claude-opus-4-1-20250805",anthropic_google_cloud:null,mantle:null,gateway:"claude-opus-4-1-20250805"},vertex_region_env_var:"VERTEX_REGION_CLAUDE_4_1_OPUS",context:{window:200000,supports_1m_suffix:!0},max_output_tokens:{default:32000,upper:32000},pricing:"tier_15_75",capabilities:["context_management"]},{id:"claude-opus-4-5",family:"opus",display_name:"Opus 4.5",knowledge_cutoff:"May 2025",provider_ids:{first_party:"claude-opus-4-5-20251101",bedrock:"us.anthropic.claude-opus-4-5-20251101-v1:0",vertex:"claude-opus-4-5@20251101",foundry:"claude-opus-4-5",anthropic_aws:"claude-opus-4-5-20251101",anthropic_google_cloud:"claude-opus-4-5-20251101",mantle:null,gateway:"claude-opus-4-5-20251101"},eager_input_streaming:{vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_4_5_OPUS",fallback_3p:"claude-opus-4-1",context:{window:200000,supports_1m_suffix:!0},max_output_tokens:{default:32000,upper:64000},pricing:"tier_5_25",capabilities:["context_management"]},{id:"claude-opus-4-6",family:"opus",display_name:"Opus 4.6",knowledge_cutoff:"May 2025",provider_ids:{first_party:"claude-opus-4-6",bedrock:"us.anthropic.claude-opus-4-6-v1",vertex:"claude-opus-4-6",foundry:"claude-opus-4-6",anthropic_aws:"claude-opus-4-6",anthropic_google_cloud:"claude-opus-4-6",mantle:null,gateway:"claude-opus-4-6"},eager_input_streaming:{vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_4_6_OPUS",fallback_3p:"claude-opus-4-5",context:{window:200000,supports_1m_beta:!0,supports_1m_suffix:!0},max_output_tokens:{default:64000,upper:128000},pricing:"tier_5_25",capabilities:["effort","max_effort","adaptive_thinking","context_management"],advisor_rank:3},{id:"claude-opus-4-7",family:"opus",display_name:"Opus 4.7",knowledge_cutoff:"January 2026",provider_ids:{first_party:"claude-opus-4-7",bedrock:"us.anthropic.claude-opus-4-7",vertex:"claude-opus-4-7",foundry:"claude-opus-4-7",anthropic_aws:"claude-opus-4-7",anthropic_google_cloud:"claude-opus-4-7",mantle:"anthropic.claude-opus-4-7",gateway:"claude-opus-4-7"},eager_input_streaming:{bedrock:!0,vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_4_7_OPUS",fallback_3p:"claude-opus-4-6",context:{window:1e6,native_1m:!0,supports_1m_beta:!0,supports_1m_suffix:!0},max_output_tokens:{default:64000,upper:128000},pricing:"tier_5_25",capabilities:["effort","max_effort","xhigh_effort","adaptive_thinking","context_management"],default_effort:"xhigh",image_limits:{maxWidth:2000,maxHeight:2000},advisor_rank:5},{id:"claude-opus-4-8",family:"opus",display_name:"Opus 4.8",knowledge_cutoff:"January 2026",provider_ids:{first_party:"claude-opus-4-8",bedrock:"us.anthropic.claude-opus-4-8",vertex:"claude-opus-4-8",foundry:"claude-opus-4-8",anthropic_aws:"claude-opus-4-8",anthropic_google_cloud:"claude-opus-4-8",mantle:"anthropic.claude-opus-4-8",gateway:"claude-opus-4-8"},eager_input_streaming:{bedrock:!0,vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_4_8_OPUS",fallback_3p:"claude-opus-4-7",context:{window:1e6,native_1m:!0,supports_1m_beta:!0,supports_1m_suffix:!0},max_output_tokens:{default:64000,upper:128000},pricing:"tier_5_25",capabilities:["effort","max_effort","xhigh_effort","adaptive_thinking","mid_conv_system","mid_conv_tool_change","context_management","fast_mode","lean_prompt"],default_effort:"high",effort_cost_index:{low:0.72,medium:0.9,high:1,xhigh:1.65,max:1.88},image_limits:{maxWidth:2000,maxHeight:2000},advisor_rank:5},{id:"claude-opus-5",family:"opus",display_name:"Opus 5",knowledge_cutoff:"May 2026",provider_ids:{first_party:"claude-opus-5",bedrock:"us.anthropic.claude-opus-5",vertex:"claude-opus-5",foundry:"claude-opus-5",anthropic_aws:"claude-opus-5",anthropic_google_cloud:"claude-opus-5",mantle:"anthropic.claude-opus-5",gateway:"claude-opus-5"},eager_input_streaming:{bedrock:!0,vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_5_OPUS",fallback_3p:"claude-opus-4-8",context:{window:1e6,native_1m:!0,supports_1m_beta:!0,supports_1m_suffix:!0},max_output_tokens:{default:64000,upper:128000},pricing:"tier_5_25",capabilities:["effort","max_effort","xhigh_effort","adaptive_thinking","mid_conv_system","mid_conv_tool_change","context_management","thinking_disabled_effort_cap","fast_mode","lean_prompt","refusal_fallback","opus_5_prompt_bundle"],default_effort:"high",effort_cost_index:{low:0.67,medium:0.76,high:1,xhigh:1.6,max:1.7},image_limits:{maxWidth:2000,maxHeight:2000},advisor_rank:7},{id:"claude-opus-5-5",family:"opus",display_name:"Opus 5.5",knowledge_cutoff:"June 2026",provider_ids:{first_party:"claude-opus-5-5",bedrock:"us.anthropic.claude-opus-5-5",vertex:"claude-opus-5-5",foundry:"claude-opus-5-5",anthropic_aws:"claude-opus-5-5",anthropic_google_cloud:"claude-opus-5-5",mantle:"anthropic.claude-opus-5-5",gateway:"claude-opus-5-5"},eager_input_streaming:{bedrock:!0,vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_5_5_OPUS",fallback_3p:"claude-opus-5",context:{window:1e6,native_1m:!0,supports_1m_beta:!0,supports_1m_suffix:!0},max_output_tokens:{default:128000,upper:128000},pricing:"tier_4_20_cache_read_0_20",capabilities:["effort","max_effort","xhigh_effort","adaptive_thinking","rejects_disabled_thinking","mid_conv_system","mid_conv_tool_change","per_turn_effort","per_turn_timing","context_management","fast_mode","lean_prompt","refusal_fallback","opus_5_5_prompt_bundle"],default_effort:"medium",image_limits:{maxWidth:2000,maxHeight:2000},advisor_rank:7},{id:"claude-fable-5",family:"fable",display_name:"Fable 5",knowledge_cutoff:"January 2026",provider_ids:{first_party:"claude-fable-5",bedrock:"us.anthropic.claude-fable-5",vertex:"claude-fable-5",foundry:"claude-fable-5",anthropic_aws:"claude-fable-5",anthropic_google_cloud:"claude-fable-5",mantle:"anthropic.claude-fable-5",gateway:"claude-fable-5"},eager_input_streaming:{bedrock:!0,vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_FABLE_5",fallback_3p:"claude-opus-5-5",context:{window:1e6,native_1m:!0,supports_1m_beta:!0},max_output_tokens:{default:64000,upper:128000},pricing:"tier_10_50",capabilities:["effort","max_effort","xhigh_effort","adaptive_thinking","rejects_disabled_thinking","mid_conv_system","mid_conv_tool_change","context_management","lean_prompt","fable_5_mitigations","refusal_fallback"],default_effort:"high",effort_cost_index:{low:0.6,medium:0.77,high:1,xhigh:1.74,max:1.91},image_limits:{maxWidth:2000,maxHeight:2000},advisor_rank:8},{id:"claude-fable-5-1",family:"fable",display_name:"Fable 5.1",knowledge_cutoff:"June 2026",provider_ids:{first_party:"claude-fable-5-1",bedrock:"us.anthropic.claude-fable-5-1",vertex:"claude-fable-5-1",foundry:"claude-fable-5-1",anthropic_aws:"claude-fable-5-1",anthropic_google_cloud:"claude-fable-5-1",mantle:"anthropic.claude-fable-5-1",gateway:"claude-fable-5-1"},eager_input_streaming:{bedrock:!0,vertex:!0},vertex_region_env_var:"VERTEX_REGION_CLAUDE_FABLE_5_1",fallback_3p:"claude-fable-5",context:{window:1e6,native_1m:!0,supports_1m_beta:!0},max_output_tokens:{default:64000,upper:128000},pricing:"tier_10_50_cache_read_0_25",capabilities:["effort","max_effort","xhigh_effort","adaptive_thinking","rejects_disabled_thinking","mid_conv_system","mid_conv_tool_change","per_turn_effort","per_turn_timing","context_management","lean_prompt","fable_5_mitigations","refusal_fallback","fable_5_1_prompt_bundle"],default_effort:"high",effort_cost_index:{low:0.75,medium:0.86,high:1,xhigh:1.38,max:1.74},image_limits:{maxWidth:2000,maxHeight:2000},advisor_rank:9},{id:"claude-mythos-5",family:"mythos",display_name:"Mythos 5",knowledge_cutoff:"January 2026",provider_ids:{first_party:"claude-mythos-5",bedrock:null,vertex:null,foundry:null,anthropic_aws:null,anthropic_google_cloud:null,mantle:null,gateway:null},context:{window:1e6,native_1m:!0,supports_1m_beta:!0},max_output_tokens:{default:64000,upper:128000},pricing:"tier_10_50",capabilities:[],image_limits:{maxWidth:2000,maxHeight:2000},advisor_rank:8},{id:"claude-mythos-5-1",family:"mythos",display_name:"Mythos 5.1",knowledge_cutoff:"June 2026",provider_ids:{first_party:"claude-mythos-5-1",bedrock:null,vertex:null,foundry:null,anthropic_aws:null,anthropic_google_cloud:null,mantle:null,gateway:null},context:{window:1e6,native_1m:!0,supports_1m_beta:!0},max_output_tokens:{default:64000,upper:128000},pricing:"tier_10_50_cache_read_0_25",capabilities:["effort","max_effort","xhigh_effort","adaptive_thinking","rejects_disabled_thinking","mid_conv_system","mid_conv_tool_change","per_turn_timing","context_management","lean_prompt","fable_5_mitigations","fable_5_1_prompt_bundle"],default_effort:"high",effort_cost_index:{low:0.75,medium:0.86,high:1,xhigh:1.38,max:1.74},image_limits:{maxWidth:2000,maxHeight:2000},advisor_rank:9}],aliases:{opus:{default:"claude-opus-5-5",per_provider:{bedrock:"claude-opus-5-5",vertex:"claude-opus-5-5",foundry:"claude-opus-4-6",mantle:"claude-opus-5-5",anthropic_aws:"claude-opus-5-5",gateway:"claude-opus-4-7"}},sonnet:{default:"claude-sonnet-5-5",per_provider:{bedrock:"claude-sonnet-4-5",vertex:"claude-sonnet-4-5",foundry:"claude-sonnet-4-5",mantle:"claude-sonnet-4-5",anthropic_aws:"claude-sonnet-4-6",gateway:"claude-sonnet-4-6"}},haiku:{default:"claude-haiku-4-5"},fable:{default:"claude-fable-5-1",per_provider:{gateway:"claude-fable-5"}}},defaults:{},best:"fable",latest_per_family:{fable:"claude-fable-5-1",opus:"claude-opus-5-5",sonnet:"claude-sonnet-5-5",haiku:"claude-haiku-4-5"},alias_migration:{}};
function R(e){let t=new Map,n=new Map;for(let r of e.models){t.set(r.id,r);for(let s of Object.values(r.provider_ids)){if(typeof s!=="string")continue;let _=s.toLowerCase(),l=n.get(_);if(l!==void 0&&l!==r.id)throw Error("model catalog: provider id collision across distinct entries");n.set(_,r.id)}}return{catalog:e,entriesById:t,catalogIdByProviderId:n}};
function g(){let e=cL();if(e.bakedCatalog===void 0)e.bakedCatalog=R(Vtr);return e.bakedCatalog};
function vwe(){return g().catalog};
var Gj=vwe;
function gse(e){return g().catalogIdByProviderId.get(e.toLowerCase())};
function xa(e){return g().entriesById.get(e)};
function D8r(e){let t=e.pricing;if(typeof t!=="string")return t;let n=Gj().pricing_tiers;return Object.hasOwn(n,t)?n[t]:void 0};
var U={"claude-3-5-haiku":"haiku35","claude-haiku-4-5":"haiku45","claude-3-5-sonnet":"sonnet35","claude-3-7-sonnet":"sonnet37","claude-sonnet-4-0":"sonnet40","claude-sonnet-4-5":"sonnet45","claude-sonnet-4-6":"sonnet46","claude-sonnet-5":"sonnet5","claude-sonnet-5-5":"sonnet55","claude-opus-4-0":"opus40","claude-opus-4-1":"opus41","claude-opus-4-5":"opus45","claude-opus-4-6":"opus46","claude-opus-4-7":"opus47","claude-opus-4-8":"opus48","claude-opus-5":"opus5","claude-opus-5-5":"opus55","claude-fable-5":"fable5","claude-fable-5-1":"fable51"};
function D(e){let t=e.provider_ids,n={firstParty:t.first_party,bedrock:t.bedrock??null,vertex:t.vertex??null,foundry:t.foundry??null,anthropicAws:t.anthropic_aws??null,anthropicGoogleCloud:t.anthropic_google_cloud??null,mantle:t.mantle??null,gateway:t.gateway??t.first_party};if(e.eager_input_streaming)n.eagerInputStreaming=e.eager_input_streaming;return n};
function M(){let e={};for(let[t,n]of Object.entries(U)){let r=xa(t);if(!r)throw new P(`model catalog missing entry for '${t}' (CATALOG_ID_TO_KEY key '${n}')`,"model catalog missing entry for CATALOG_ID_TO_KEY id");e[n]=D(r)}return e};
var ho=M();
function i(e){for(let t of["bedrock","vertex","foundry","anthropicAws"])if(e[t]===null)throw new P(`named CLAUDE_*_CONFIG export for '${e.firstParty}' has null ${t}`,"named model config export has null 3P provider id");return e};
var VQe=i(ho.fable5);
var M9o={firstParty:"claude-mythos-5",bedrock:"us.anthropic.claude-mythos-5",vertex:"claude-mythos-5",foundry:"claude-mythos-5",anthropicAws:"claude-mythos-5",anthropicGoogleCloud:"claude-mythos-5",mantle:"anthropic.claude-mythos-5",gateway:"claude-mythos-5",eagerInputStreaming:{bedrock:!0,vertex:!0}};
function $x(e){let t=e.toLowerCase();for(let n of Object.values(ho))for(let r of Object.values(n))if(typeof r==="string"&&r.toLowerCase()===t)return n;return null};
function Vn(){return He()==="firstParty"};
function Cwe(){if(He()==="bedrock"&&a.CLAUDE_CODE_USE_MANTLE)return"mantle";return null};
function G(e){return e.startsWith("anthropic.")&&!N9o(Ct(e))};
function cc(e){if(e){let t=Cwe();if(t){if(t==="mantle"&&G(e))return t;let n=He(),r=$x(e);if(r&&r[n]===null&&r[t]!==null)return t}}return He()};
function ECn(){return Vn()};
return {Vtr,R,g,vwe,Gj,gse,xa,D8r,U,D,M,ho,i,VQe,M9o,$x,Vn,Cwe,G,cc,ECn};
}
function module6(imports){

function ra(e,r){return Object.hasOwn(e,r)?e[r]:void 0};
return {ra};
}
function module7(imports){
const va=imports["va"];
const ge=imports["ge"];
const Jk=imports["Jk"];
const Zj=imports["Zj"];
const wb=imports["wb"];
const oA=imports["oA"];
const j8=imports["j8"];
const n8r=imports["n8r"];
const Fn=imports["Fn"];
const t=imports["t"];
const hse=imports["hse"];
const QZ=imports["QZ"];
const gse=imports["gse"];
const y=imports["y"];
const p=imports["p"];
const m=imports["m"];
const cI=imports["cI"];
const cL=imports["cL"];
const wu=imports["wu"];
const qj=imports["qj"];
const vwe=imports["vwe"];
const qQe=imports["qQe"];
const Ct=imports["Ct"];
const xa=imports["xa"];
const MSt=imports["MSt"];
const tt=imports["tt"];
const pse=imports["pse"];
const Qfe=imports["Qfe"];
const Vs=imports["Vs"];
const Xr=imports["Xr"];
const ECn=imports["ECn"];
const f=imports["f"];
const de=imports["de"];
const o=imports["o"];
const u=imports["u"];
const C=imports["C"];
const Kd=imports["Kd"];
const ra=imports["ra"];
const VQe=imports["VQe"];
const M9o=imports["M9o"];
const Gj=imports["Gj"];
const D8r=imports["D8r"];
const P=imports["P"];
const le=imports["le"];
var sx={inputTokens:5,outputTokens:25,promptCacheWriteTokens:6.25,promptCacheWrite1hTokens:10,promptCacheReadTokens:0.5,webSearchRequests:0.01};
var Us={inputTokens:10,outputTokens:50,promptCacheWriteTokens:12.5,promptCacheWrite1hTokens:20,promptCacheReadTokens:1,webSearchRequests:0.01};
var Uyt=sx;
function d_(e,n){let{input:r,output:s,cache_write_5m:g,cache_write_1h:h,cache_read:b,web_search:v}=n;if(g===void 0||b===void 0||v===void 0)throw new P(`model catalog entry '${e}' has incomplete pricing \u2014 baked entries need the full ModelCosts shape`,"model catalog entry has incomplete pricing");return{inputTokens:r,outputTokens:s,promptCacheWriteTokens:g,...h!==void 0&&{promptCacheWrite1hTokens:h},promptCacheReadTokens:b,webSearchRequests:v}};
var ax=new Set(hse);
function Zu(e){return ax.has(e)};
function lx(){let e={};for(let n of Gj().models){let r=D8r(n);if(r===void 0)continue;if(!Zu(n.id))throw new P(`model catalog id '${n.id}' missing from CATALOG_MODEL_IDS \u2014 regenerate with 'bun run generate:model-catalog'`,"model catalog id missing from CATALOG_MODEL_IDS");e[n.id]=d_(n.id,r)}return e};
var $3=Object.assign(Object.create(null),{[fb(VQe.firstParty)]:Us,[fb(M9o.firstParty)]:Us,...lx()});
function ed(e,n){return e!=null&&Object.hasOwn(e,n)?e[n]:void 0};
var px="alder_ford";
var gx=f(()=>de(o(),u({as:o(),ends_at:C().positive().lt(100000000000)}).optional().catch(void 0)));
function c_(e){if(!ECn())return;let n=gx().safeParse(Kd()?.[px]),r=n.success?ra(n.data,e):void 0;return r!==void 0&&Date.now()<r.ends_at*1000&&ed($3,r.as)!==void 0?r.as:void 0};
function nd(e){return Be(Fn(e),{identity:!0})};
function f_(e,n){return n?.speed==="fast"?void 0:c_(nd(e))};
function No(){let e=!1;try{let n=va().policy.orgPricing;if(n!==void 0)return n.value;let r=ge("policySettings"),s=va().policy;if(s.orgPricing===void 0){let g={value:void 0};s.orgPricing=g;let h=Jk(),b=Zj(h)||h==="remote"&&(wb()||oA()!==void 0),v=b?r?.modelPricing:void 0,w=j8(),A=r?.modelPricing!==void 0?v:w?void 0:n8r();if(e=!0,g.value=A&&hx(A,r?.modelOverrides),g.value)y("settings_model_pricing",{rows:g.value.exact.size,multiplier:g.value.multiplier,host:r?.modelPricing===void 0});else if(!b&&r?.modelPricing)p("settings_model_pricing",h==="remote"?"unverified_remote_cache":"untrusted_origin")}return s.orgPricing.value}catch(n){if(t(`modelPricing: ${n instanceof Error?n.message:String(n)}; pricing at list`,{level:"error"}),e)m("settings_model_pricing","compile_threw");return}};
function hx(e,n){let r=new Map,s=new Map;for(let[g,h]of Object.entries(e.overrides??{})){let b={inputTokens:h.input,outputTokens:h.output,promptCacheReadTokens:h.cacheRead,promptCacheWriteTokens:h.cacheWrite,webSearchRequests:Uyt.webSearchRequests},v=Fn(g).toLowerCase();if(r.has(v)){t(`modelPricing: override '${g}' repeats an earlier row's key; the earlier row is used`,{level:"warn"});continue}r.set(v,b);let w=_x(v);if(w===null)continue;if(s.has(w)){t(`modelPricing: override '${g}' spells the same built-in model as an earlier row; it prices only its exact spelling, other spellings use the earlier row`,{level:"warn"});continue}s.set(w,b)}if(r.size===0&&(e.multiplier??1)===1)return;return{multiplier:e.multiplier??1,exact:r,builtin:s,adminOverrides:n}};
function _x(e){if(Zu(e))return e;let n=QZ.find((s)=>s!=="us"&&e.startsWith(`${s}.anthropic.`)),r=gse(n?`us${e.slice(n.length)}`:e)??(e.startsWith("anthropic.")?gse(`us.${e}`):void 0);return r!==void 0&&Zu(r)?r:null};
function Bs(e,n){return e.exact.get(Fn(n).toLowerCase())??(e.builtin.size>0?e.builtin.get(Be(n,{overridesMap:e.adminOverrides??pse()??{},identity:!0})):void 0)};
function qPe(e){let n=Be(e);if($3[n]!==void 0)return!0;let r=le().additionalModelCostsCache;return!!r&&(ra(r,e)!==void 0||ra(r,n)!==void 0)};
function SVo(e,n){let r=No(),s=e.includes("application-inference-profile")?Qfe(Fn(e))??e:e;if(r&&Bs(r,s)!==void 0)return"managed";if(!qPe(s)&&f_(e,n)===void 0)return"unknown";return r&&r.multiplier!==1?"managed":"list"};
function bVo(e,n){let r=No();return(r&&Bs(r,e)!==void 0?void 0:f_(e,n))??Be(e)};
function qE(e){return e.config.models??[]};
function YQ(e,n){let r=kp(n);return qE(e).find((s)=>kp(s.id)===r)};
function kp(e){return Fn(e).trim().toLowerCase()};
var KD=8;
var xd={status:"known"};
var Ky={status:"unknown"};
var $D=256;
function jy(){return{byModel:new Map,offeredRows:void 0,familySpellingTargets:void 0,familySpellingVouchGeneration:void 0}};
function Pd(e){let n=Xr(),r=e.settingsGeneration(),s=n.behavesAsMemo;if(s!==void 0&&s.lookup===e&&s.settingsGeneration===r)return s;let g={lookup:e,settingsGeneration:r,settingsMappingsDeclared:void 0,withoutRows:jy(),byCatalog:new WeakMap};return n.behavesAsMemo=g,g};
function zy(e,n){if(n===null)return e.withoutRows;let r=e.byCatalog.get(n);if(r===void 0)r=jy(),e.byCatalog.set(n,r);return r};
function Md(e){return e.settingsMappingsDeclared??=e.lookup.hasSettingsBehavesAs(),e.settingsMappingsDeclared};
function uWt(e,n){let r=cL().modelKnowledge;if(r===void 0)return xd;let s=Pd(r),g=zy(s,e),h=g.byModel.get(n);if(h!==void 0)return h;let b=GD(e,n,s);if(g.byModel.size>=$D)g.byModel.clear();return g.byModel.set(n,b),b};
function GD(e,n,r){if(r.lookup.isKnown(n))return xd;if(e===null&&!Md(r))return Ky;let s=new Set([kp(n)]),g=Yy(e,n,r,s,0);if(g!==void 0)return{status:"mapped",target:g.target,source:g.source,hops:g.hops};return Vy(e,n,r)?xd:Ky};
function WD(e,n,r){return r.lookup.isKnown(n)||Vy(e,n,r)};
function Vy(e,n,r){return!1};
function Yy(e,n,r,s,g){if(g>=KD)return;for(let h of jD(e,n,r)){let b=kp(h.target);if(b===""||s.has(b))continue;if(WD(e,h.target,r))return{target:h.target,source:h.source,hops:g+1};s.add(b);let v=Yy(e,h.target,r,s,g+1);if(v!==void 0)return{target:v.target,source:h.source,hops:v.hops}}return};
function jD(e,n,r){let s=[],g=zD(n,r),h=e===null?void 0:Gy(g,(b)=>YQ(e,b)?.behaves_as);if(h!==void 0)s.push({target:h,source:"served"});if(Md(r)){let b=Gy(g,(v)=>r.lookup.settingsBehavesAs(v));if(b!==void 0)s.push({target:b,source:"settings"})}return s};
function zD(e,n){let r=n.lookup.identitySpelling(e);return kp(r)===kp(e)?[e]:[e,r]};
function Gy(e,n){for(let r of e){let s=n(r)?.trim()??"";if(s!=="")return s}return};
function Xy(e){let n=cL().modelKnowledge;if(n===void 0)return e;let r=Vs();if(r===null&&!Md(Pd(n)))return e;let s=uWt(r,e);return s.status==="mapped"?s.target:e};
function fb(e){e=e.toLowerCase();let n=cL().canonicalNameMemo,r=n.get(e);if(r!==void 0)return r;let s=OI(e);if(e.length<=256){if(n.size>=256)n.clear();n.set(e,s)}return s};
function OI(e){let n=gse(e);if(n!==void 0)return n;for(let s of QZ)if(s!=="us"&&e.startsWith(`${s}.anthropic.`)){let g=gse(`us${e.slice(s.length)}`);if(g!==void 0)return g;break}let r=wu(e);if(qj(r))return xI(r)??Ab(r.base);if(e.includes("claude-fable-5-1"))return"claude-fable-5-1";if(e.includes("claude-fable-5"))return"claude-fable-5";if(e.includes("claude-mythos-5-1"))return"claude-mythos-5-1";if(e.includes("claude-mythos-5"))return"claude-mythos-5";if(e.includes("claude-opus-5-5"))return"claude-opus-5-5";if(e.includes("claude-opus-5"))return"claude-opus-5";if(e.includes("claude-opus-4-8"))return"claude-opus-4-8";if(e.includes("claude-opus-4-7"))return"claude-opus-4-7";if(e.includes("claude-opus-4-6"))return"claude-opus-4-6";if(e.includes("claude-opus-4-5"))return"claude-opus-4-5";if(e.includes("claude-opus-4-1"))return"claude-opus-4-1";if(/claude-opus-4(?!-\d(?!\d))/.test(e))return"claude-opus-4-0";if(e.includes("claude-sonnet-5-5"))return"claude-sonnet-5-5";if(e.includes("claude-sonnet-5"))return"claude-sonnet-5";if(e.includes("claude-sonnet-4-6"))return"claude-sonnet-4-6";if(e.includes("claude-sonnet-4-5"))return"claude-sonnet-4-5";if(/claude-sonnet-4(?!-\d(?!\d))/.test(e))return"claude-sonnet-4-0";if(e.includes("claude-haiku-4-5"))return"claude-haiku-4-5";if(e.includes("claude-3-7-sonnet"))return"claude-3-7-sonnet";if(e.includes("claude-3-5-sonnet"))return"claude-3-5-sonnet";if(e.includes("claude-3-5-haiku"))return"claude-3-5-haiku";if(e.includes("claude-3-opus"))return"claude-3-opus";if(e.includes("claude-3-sonnet"))return"claude-3-sonnet";if(e.includes("claude-3-haiku"))return"claude-3-haiku";return Ab(e)};
function Ab(e){return e.replace(/-\d{8}$/,"")};
function xI(e){let n=[...vwe().models.map((r)=>r.id),...$b()];for(let r of n){let s=wu(r);if(qj(s)&&qQe(s,e))return r}return};
function $b(){return["claude-3-opus","claude-3-sonnet","claude-3-haiku"]};
var PI=new Set($b());
function Doe(e){let n=Ct(e);return xa(n)!==void 0||PI.has(n)||n===MSt};
function Moe(e,n=Be(e)){return Doe(n)||MI(e,n)};
function MI(e,n){return!1};
function Go(e,n,r){if(e===void 0)return;for(let[s,g]of Object.entries(e)){if(!(r?cI(g,n):g===n))continue;let b=fb(s);if(Moe(b,b))return b}return};
function ua(){try{return tt().modelOverrides}catch{return}};
function Be(e,n){let r=Tb(e,n);if(n?.identity===!0||Doe(r))return r;let s=Xy(e);if(s===e)return r;return Tb(s,n)};
function Tb(e,n){let r=n?.overridesMap!==void 0?Go(n.overridesMap,e,!0):Go(ua(),e,!1);if(r===void 0&&n?.overridesMap===void 0){let s=pse();r=Go(s,e,!0)}if(r!==void 0)return r;if(!n?.deterministic&&e.includes("application-inference-profile")){let s=Qfe(Fn(e));if(s)return fb(s)}return fb(e)};
return {sx,Us,Uyt,d_,ax,Zu,lx,$3,ed,px,gx,c_,nd,f_,No,hx,_x,Bs,qPe,SVo,bVo,qE,YQ,kp,KD,xd,Ky,$D,jy,Pd,zy,Md,uWt,GD,WD,Vy,Yy,jD,zD,Gy,Xy,fb,OI,Ab,xI,$b,PI,Doe,Moe,MI,Go,ua,Be,Tb};
}
function module8(imports){
const TZr=imports["TZr"];
const pf=imports["pf"];
const Qp=imports["Qp"];
const QQ=imports["QQ"];
const bVo=imports["bVo"];
const cc=imports["cc"];
const SVo=imports["SVo"];
function yUn(e,n,r){let s=TZr(r)??{inputTokens:0,outputTokens:0,cacheReadInputTokens:0,cacheCreationInputTokens:0,webSearchRequests:0,costUSD:0,contextWindow:0,maxOutputTokens:0};return s.inputTokens+=n.input_tokens,s.outputTokens+=n.output_tokens,s.thinkingTokens=(s.thinkingTokens??0)+(n.output_tokens_details?.thinking_tokens??0),s.cacheReadInputTokens+=n.cache_read_input_tokens??0,s.cacheCreationInputTokens+=n.cache_creation_input_tokens??0,s.webSearchRequests+=n.server_tool_use?.web_search_requests??0,s.costUSD+=e,s.contextWindow=pf(r,Qp()),s.maxOutputTokens=QQ(r).default,s.canonicalModel=bVo(r,n),s.provider=cc(r),s.costBasis=SVo(r,n),s};
return {yUn};
}
export function createModelUsage287(ports){
const m0=module0({"n":ports["executionContext"]});
const m1=module1({});
const m2=module2({});
const m3=module3({"QZ":m2["QZ"]});
const m4=module4({});
const m5=module5({"cL":ports["canonicalRoot"],"He":ports["baseProvider"],"P":m4["P"],"a":ports["environment"],"N9o":m3["N9o"],"Ct":m3["Ct"]});
const m6=module6({});
const m7=module7({"va":ports["settingsStore"],"ge":ports["settingsSource"],"Jk":ports["policyOrigin"],"Zj":m1["Zj"],"wb":ports["verifiedRemote"],"oA":m1["oA"],"j8":ports["adminLoadBlocked"],"n8r":ports["hostPricing"],"Fn":m3["Fn"],"t":ports["debug"],"hse":m3["hse"],"QZ":m2["QZ"],"gse":m5["gse"],"y":ports["logEvent"],"p":ports["pricingIgnored"],"m":ports["pricingError"],"cI":m3["cI"],"cL":ports["canonicalRoot"],"wu":m3["wu"],"qj":m3["qj"],"vwe":m5["vwe"],"qQe":m3["qQe"],"Ct":m3["Ct"],"xa":m5["xa"],"MSt":m3["MSt"],"tt":ports["initialSettings"],"pse":ports["policyOverrides"],"Qfe":m0["Qfe"],"Vs":ports["servedCatalog"],"Xr":ports["behaviorMemo"],"ECn":m5["ECn"],"f":ports["memoize"],"de":ports["recordSchema"],"o":ports["stringSchema"],"u":ports["objectSchema"],"C":ports["numberSchema"],"Kd":ports["clientData"],"ra":m6["ra"],"VQe":m5["VQe"],"M9o":m5["M9o"],"Gj":m5["Gj"],"D8r":m5["D8r"],"P":m4["P"],"le":ports["globalConfig"]});
const m8=module8({"TZr":m0["TZr"],"pf":ports["contextWindow"],"Qp":ports["sdkBetas"],"QQ":ports["maxOutputTokens"],"bVo":m7["bVo"],"cc":m5["cc"],"SVo":m7["SVo"]});
return {"accumulate":m8.yUn,"canonicalModel":m7.bVo,"provider":m5.cc,"costBasis":m7.SVo,"managedPricing":m7.No,"compilePricing":m7.hx,"modelIdentity":m7.Tb,"modelBehavior":m7.Be,"recordInferenceBackingModel":m0.xno};
}
