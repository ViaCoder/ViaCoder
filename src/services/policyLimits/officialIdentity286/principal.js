// Generated from complete official npm 2.1.286 declarations. Do not edit by hand.
export const OFFICIAL_POLICY_PRINCIPAL_286_PORTS = [
  {
    "local": "a",
    "imported": "a",
    "module": "/$bunfs/root/chunk-07mxqtdh.js"
  },
  {
    "local": "BS",
    "imported": "BS",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "c9",
    "imported": "c9",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "cc",
    "imported": "cc",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "ct",
    "imported": "ct",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "de",
    "imported": "createHash",
    "module": "crypto"
  },
  {
    "local": "E2",
    "imported": "E2",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "GG",
    "imported": "GG",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "Hg",
    "imported": "Hg",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "j",
    "imported": "j",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "kb",
    "imported": "kb",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "kn",
    "imported": "resolve",
    "module": "path"
  },
  {
    "local": "l",
    "imported": "l",
    "module": "/$bunfs/root/chunk-h730kz80.js"
  },
  {
    "local": "L6o",
    "imported": "L6o",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "Me",
    "imported": "Me",
    "module": "/$bunfs/root/chunk-ktw7xkh2.js"
  },
  {
    "local": "MSe",
    "imported": "MSe",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "mWr",
    "imported": "mWr",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "N",
    "imported": "N",
    "module": "/$bunfs/root/chunk-abjdv98v.js"
  },
  {
    "local": "pn",
    "imported": "pn",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "q",
    "imported": "q",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "qT",
    "imported": "qT",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "SM",
    "imported": "SM",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "t",
    "imported": "t",
    "module": "/$bunfs/root/chunk-yx145v00.js"
  },
  {
    "local": "t7n",
    "imported": "t7n",
    "module": "/$bunfs/root/chunk-efdc0n9h.js"
  },
  {
    "local": "V2t",
    "imported": "V2t",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "wb",
    "imported": "wb",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Wc",
    "imported": "Wc",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Wgn",
    "imported": "Wgn",
    "module": "/$bunfs/root/chunk-3q41nfz8.js"
  },
  {
    "local": "xm",
    "imported": "xm",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Xt",
    "imported": "Xt",
    "module": "/$bunfs/root/chunk-v6yfpapk.js"
  },
  {
    "local": "XUe",
    "imported": "XUe",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  },
  {
    "local": "Yzr",
    "imported": "Yzr",
    "module": "/$bunfs/root/chunk-ttgve2cs.js"
  }
]

export function createOfficialPolicyPrincipal286(ports) {
  const { a, BS, c9, cc, ct, de, E2, GG, Hg, j, kb, kn, l, L6o, Me, MSe, mWr, N, pn, q, qT, SM, t, t7n, V2t, wb, Wc, Wgn, xm, Xt, XUe, Yzr } = ports
  function Kne(e){return de("sha256").update(e.descriptor).digest("hex")}
  function Yne(e){return de("sha256").update(e).digest("hex").slice(0,32)}
  var me={seen:[],incomplete:!1,ruledOut:[]};
  class be{notice=null;changed=Me();replaceNotice(e){if(this.notice===e)return;if(this.notice&&e&&this.notice.text===e.text&&this.notice.url===e.url)return;this.notice=e,this.changed.emit(this.notice)}}
  var tn=new q(()=>new be);
  function w(){return tn.of(j().host)}
  function Se(e){w().replaceNotice(e)}
  var C8e=16;
  var B4n="policy-limits.json",vn=5000,xe=256,Te={kind:"absent"},j4n=30000;
  class r1o{sessionCache=null;lastFetchOutcome=null;settledWithoutVerdictFor=null;failOpenVerdict=!1;sessionFromServerFetch=!1;lastServedCoreSkills=null;verdictEnvBearerDigest=null;diskAdoptionSuppressed=!1;diskAdoptionEpoch=0;storageV5=void 0;lastStampVerdict="none";lastStampMatchedIdentity=null;hipaaEvidence=me;hipaaSeenUnreadable=!1;diskBodyChecksum=null;diskConfirmedAtMs=null;diskRefusedAtMs=null;hipaaEvidenceLoaded=!1;hintedTaints=[];hintedDeniedKeys=[];hintedEnforcedKeys=[];sessionAttributed=!1;attributedBearerDigest=null;sessionVerdictDisowned=!1;principalRung="none";evidenceRereadForBearer=void 0;wifRecordedOrg=void 0;wifAccountDiverged=!1;wifSourceLocation=void 0;wifRecordProfile=void 0;oauthPrincipalMemo=null;storedLoginAccountAtWire=null;storedLoginNotedTokenDigest=null;tunnelSocket=void 0;cacheRevision=0;verdictChanged=Me();heldStartSignal=Me();replaceSessionCache(e,n=!1,i=!1){if(this.failOpenVerdict=e!==null&&(n||this.failOpenVerdict&&(i||e===this.sessionCache)),this.sessionCache=e,e?.core_skills!==void 0)this.lastServedCoreSkills=this.sessionFromServerFetch?e.core_skills:this.narrowedServedList(e.core_skills);if(!i)this.verdictEnvBearerDigest=null;if(e===null)this.sessionAttributed=!1,this.attributedBearerDigest=null,this.sessionVerdictDisowned=!1,this.evidenceRereadForBearer=void 0;this.cacheRevision++;let r=t7n(this.effectiveTaints());if(Se(e?.monitoring_notice??null),r)E2();this.emitVerdictChanged()}effectiveTaints(e=this.sessionCache?.compliance_taints??[]){return this.hintedTaints.length===0?e:N([...this.hintedTaints,...e]).slice(0,C8e)}dropHintedTaints(){if(this.hintedTaints.length===0&&this.hintedDeniedKeys.length===0&&this.hintedEnforcedKeys.length===0)return;if(this.hintedTaints=[],this.hintedDeniedKeys=[],this.hintedEnforcedKeys=[],this.cacheRevision++,t7n(this.effectiveTaints()))E2();this.emitVerdictChanged()}hintFromRefusedBody(e){if(this.sessionCache!==null&&this.sessionAttributed)return;let n=e.compliance_taints.filter((h)=>uBr.some(([g])=>g===h)),i=N([...this.hintedTaints,...n]),r=Object.entries(e.restrictions).filter(([h,g])=>g?.allowed===!1&&!Z(h)).map(([h])=>h),s=N([...this.hintedDeniedKeys,...r]).slice(0,xe),c=Object.entries(e.restrictions).filter(([h,g])=>g?.allowed===!0&&Z(h)).map(([h])=>h),d=N([...this.hintedEnforcedKeys,...c]).slice(0,xe),m=!1;if(e.core_skills!==void 0){let h=this.narrowedServedList(e.core_skills);if(this.lastServedCoreSkills===null||h.join(`
  `)!==this.lastServedCoreSkills.join(`
  `))this.lastServedCoreSkills=h,m=!0}if(!m&&i.length===this.hintedTaints.length&&s.length===this.hintedDeniedKeys.length&&d.length===this.hintedEnforcedKeys.length)return;if(this.hintedTaints=i,this.hintedDeniedKeys=s,this.hintedEnforcedKeys=d,this.cacheRevision++,t7n(this.effectiveTaints()))E2();this.emitVerdictChanged()}narrowedServedList(e){let n=new Set(this.lastServedCoreSkills??Wgn);return e.filter((i)=>n.has(i))}emitVerdictChanged(){try{this.heldStartSignal.emit()}catch(e){t(`Policy limits: a held-start listener threw: ${l(e)}`,{level:"error"})}if(c9())return;try{this.verdictChanged.emit()}catch(e){t(`Policy limits: a verdict-change listener threw: ${l(e)}`,{level:"error"})}}}
  var j8o=new q(()=>new r1o);
  function p(){return j8o.of(j().host)}
  function jD(){let e=p();if(e.tunnelSocket===void 0){let n=a.ANTHROPIC_UNIX_SOCKET;e.tunnelSocket=n&&L6o({ANTHROPIC_UNIX_SOCKET:n,CLAUDE_CODE_OAUTH_TOKEN:a.CLAUDE_CODE_OAUTH_TOKEN,ANTHROPIC_API_KEY:a.ANTHROPIC_API_KEY,ANTHROPIC_AUTH_TOKEN:a.ANTHROPIC_AUTH_TOKEN})?n:null}return e.tunnelSocket??void 0}
  function xq(){let e=p();if(e.principalRung="none",jD()!==void 0)return e.principalRung="tunnel",null;let n=null,i="none";try{({key:n,source:i}=BS())}catch{}if(!n&&Wc()){if(e.principalRung="wif",e.wifAccountDiverged)return null;let r=kb(),s=a.ANTHROPIC_PROFILE,c;try{if(c=(r==="env-quad"?a.ANTHROPIC_ORGANIZATION_ID?.trim():XUe()?.organizationUuid?.trim())||"",c&&e.wifSourceLocation===void 0){if(r==="profile-implicit"){let g=SM();e.wifRecordProfile=g===null?void 0:MSe(g)}else if(r==="profile-explicit")e.wifRecordProfile=s;e.wifSourceLocation=Q(r)}}catch(g){return t(`Policy limits: WIF profile unreadable (${l(g)}); its policy verdicts are session-only until restart`),e.wifAccountDiverged=!0,null}if(e.wifRecordedOrg===void 0)e.wifRecordedOrg=c.toLowerCase()||null;else if(e.wifRecordedOrg!==(c.toLowerCase()||null))return t("Policy limits: the WIF source now records a different organization than the one this process derived its principal from; its policy verdicts are session-only until restart"),e.wifAccountDiverged=!0,null;if(!c)return null;let d=r==="env-quad"?null:SM(),m=r==="env-quad"?Q("env-quad"):s?ee(d,s):void 0;if(r==="profile-implicit"&&s!==void 0&&s!==e.wifRecordProfile||r==="profile-explicit"&&(s===void 0||s!==e.wifRecordProfile)||m!==void 0&&m!==e.wifSourceLocation||m===void 0&&r!=="env-quad"&&e.wifSourceLocation!==void 0&&(d===null?e.wifSourceLocation!=="":!e.wifSourceLocation.startsWith(ee(d,""))))return t("Policy limits: the environment now selects a different WIF source than the one this process derived its principal from; its policy verdicts are session-only until restart"),e.wifAccountDiverged=!0,null;let h=Xt(c);if(h)return X(h);return{kind:"wif",descriptor:`wif:${Yne([e.wifSourceLocation,c.toLowerCase()].join("\x00"))}`}}if(ct()){let r=pn()?.accessToken;if(r)return e.principalRung="oauth",Rn(r)}if(i==="apiKeyHelper")return e.principalRung="helper",null;if(n)return e.principalRung="key",{kind:"key",descriptor:`key:${Yne(n)}`};return null}
  function rBr(){let e=p();if(e.wifAccountDiverged||wb()||!Wc())return;let n;try{n=e.wifSourceLocation!==void 0&&Q(kb())!==e.wifSourceLocation}catch(r){t(`Policy limits: WIF profile selection unreadable (${l(r)}); its policy verdicts are session-only until restart`),e.wifAccountDiverged=!0;return}if(n){e.wifAccountDiverged=!0,t("Policy limits: the active WIF source moved since this process derived its principal; its policy verdicts are session-only until restart");return}let i;try{if(kb()==="env-quad")i=a.ANTHROPIC_ORGANIZATION_ID?.trim().toLowerCase()||null;else V2t(),i=XUe()?.organizationUuid?.trim().toLowerCase()??null}catch(r){t(`Policy limits: WIF account record unreadable (${l(r)}); its policy verdicts are session-only until restart`),e.wifAccountDiverged=!0;return}if(e.wifRecordedOrg===void 0)e.wifRecordedOrg=i;else if(e.wifRecordedOrg!==i)e.wifAccountDiverged=!0,t("Policy limits: the WIF profile now records a different organization than the one this process derived its principal from; its policy verdicts are session-only until restart")}
  async function Z4n(e,n){let i=pn()?.accessToken;if(!i)return;let r=p(),s=await Hg(n);if(s!=="store"){if(s!=="none")r.storedLoginNotedTokenDigest=Yne(i);return}let c=await mWr(e),d=pn()?.accessToken;if(!d)return;r.storedLoginNotedTokenDigest=Yne(d),r.storedLoginAccountAtWire={tokenDigest:Yne(d),organizationUuid:d===i?c:null}}
  function Rn(e){let n=p(),i=xm(),r=Xt(a.CLAUDE_CODE_ORGANIZATION_UUID),s=Yne(e),c=n.storedLoginAccountAtWire,d=c!==null&&c.tokenDigest===s?c.organizationUuid:void 0,m=[s,r??"",i?.organizationUuid??"",d===void 0?"":`fresh:${d??"-"}`,a.CLAUDE_CODE_OAUTH_TOKEN?"env":""].join("|"),h=n.oauthPrincipalMemo;if(h?.key===m&&(h.expiresAtMs===null||Date.now()<h.expiresAtMs))return h.principal;let g={kind:"token",descriptor:`token:${s}`},y=!1,_=qT();switch(_){case"store":{let b=Xt(i?.organizationUuid)??null;if(d!==void 0&&d!==b)g={kind:"token",descriptor:`token:${s}`,unclassified:!0};else if(b)g=X(b);else g={kind:"token",descriptor:`token:${s}`,storedLoginOrgless:!0};break}case"env":case"fd":if(_==="fd"&&GG()&&!cc())g=null,y=!0;else if(r)g={...X(r),bearerDigest:s};break;case"none":g={kind:"token",descriptor:`token:${s}`,unclassified:!0};break}return n.oauthPrincipalMemo={key:m,principal:g,daemonSnapshotWorker:y,expiresAtMs:_==="none"||g===null?Date.now()+j4n:null},g}
  function X(e){return{kind:"org",descriptor:`org:${e.toLowerCase()}`}}
  var cBr={allow_product_feedback:{deniedUnder:["hipaa","zdr"],serverPopulated:!0,onCacheMiss:"deny",label:"Feedback",verb:"is",requirementId:"HIPAA-R1"},allow_web_fetch:{deniedUnder:["hipaa"],serverPopulated:!0,onCacheMiss:"allow",label:"Web fetch",verb:"is",requirementId:"HIPAA-R3"},allow_memory_sync:{deniedUnder:["hipaa","zdr"],onCacheMiss:"allow",label:"Memory sync",verb:"is",requirementId:"HIPAA-R5",hardBlockUnder:["hipaa"]},allow_design_sync:{deniedUnder:["hipaa"],onCacheMiss:"allow",label:"Design sync",verb:"is",requirementId:"HIPAA-R9"},allow_projects_tool:{deniedUnder:["hipaa"],onCacheMiss:"hold",label:"Projects",verb:"are",requirementId:"HIPAA-R17",hardBlockUnder:["hipaa"]},allow_claude_browser_extension:{deniedUnder:["hipaa"],serverPopulated:!0,onCacheMiss:"allow",label:"Claude in Chrome",verb:"is",requirementId:"HIPAA-R34"},allow_remote_sessions:{deniedUnder:["hipaa"],serverPopulated:!0,onCacheMiss:"deny",label:"Cloud sessions",verb:"are",requirementId:"HIPAA-R6"},allow_remote_control:{deniedUnder:["hipaa"],serverPopulated:!0,onCacheMiss:"deny",label:"Remote Control",verb:"is",requirementId:"HIPAA-R6"},allow_cobalt_plinth:{deniedUnder:["hipaa","zdr"],serverPopulated:!0,onCacheMiss:"deny",label:"Artifacts",verb:"are",requirementId:"HIPAA-R16"},allow_team_onboarding:{deniedUnder:["hipaa"],onCacheMiss:"hold",label:"Team onboarding",verb:"is",requirementId:"HIPAA-R13",hardBlockUnder:["hipaa"]},allow_error_reporting:{deniedUnder:["hipaa","zdr"],onCacheMiss:"deny",label:"Error reporting",verb:"is",requirementId:"HIPAA-R19"},allow_auto_mode_sibling_docs:{deniedUnder:["hipaa"],onCacheMiss:"deny",label:"Repository lookups",verb:"are",requirementId:"HIPAA-R36"},allow_repo_visibility_probe:{deniedUnder:["hipaa"],onCacheMiss:"hold",label:"Repository visibility checks",verb:"are",requirementId:"HIPAA-R36"},allow_send_file:{deniedUnder:["hipaa","zdr"],onCacheMiss:"deny",label:"File upload",verb:"is",requirementId:"HIPAA-R37"},allow_heap_dump:{deniedUnder:["hipaa","zdr"],onCacheMiss:"deny",label:"Heap dumps",verb:"are",requirementId:"HIPAA-R38"},allow_local_checkpoint_commit:{deniedUnder:["hipaa","zdr"],onCacheMiss:"deny",label:"Usage-limit checkpoints",verb:"are",requirementId:"HIPAA-R39"},...{},allow_plugin_skill_search:{deniedUnder:["hipaa"],onCacheMiss:"deny",label:"Plugin and skill search",verb:"is",requirementId:"HIPAA-R26"},allow_plugin_directory_search:{deniedUnder:["hipaa"],onCacheMiss:"deny",onFailOpenVerdict:"deny",label:"The plugin directory",verb:"is",requirementId:"HIPAA-R35"},allow_connector_suggest:{deniedUnder:["hipaa"],onCacheMiss:"deny",onFailOpenVerdict:"deny",label:"Connector suggestions",verb:"are",requirementId:"HIPAA-R43"},...{allow_mcp_task_worker_wake:{deniedUnder:["hipaa"],onCacheMiss:"deny",label:"Restarting a worker for a background task",verb:"is",requirementId:"HIPAA-R57"}},...{},allow_account_skills_sync:{deniedUnder:["hipaa"],serverPopulated:!0,onCacheMiss:"deny",label:"Account skills sync",verb:"is",requirementId:"HIPAA-R29"},allow_account_plugins_sync:{deniedUnder:["hipaa"],serverPopulated:!0,onCacheMiss:"deny",label:"Account plugins sync",verb:"is",requirementId:"HIPAA-R30"},allow_bundled_skills:{deniedUnder:["hipaa"],onCacheMiss:"allow",label:"Bundled skills",verb:"are",requirementId:"HIPAA-R56"},allow_mycelium:{deniedUnder:["hipaa","zdr"],onCacheMiss:"deny",label:"Peer messaging",verb:"is",requirementId:"HIPAA-R25",hardBlockUnder:["hipaa"]},...{},allow_usage_transcript_scan:{deniedUnder:["hipaa"],transcriptScan:!0,onCacheMiss:"deny",label:"Usage patterns",verb:"are",requirementId:"HIPAA-R31"},allow_skill_doctor_transcript_scan:{deniedUnder:["hipaa"],transcriptScan:!0,onCacheMiss:"deny",label:"Skill token counts",verb:"are",requirementId:"HIPAA-R32"},allow_insights:{deniedUnder:["hipaa"],transcriptScan:!0,onCacheMiss:"deny",label:"Insights",verb:"are",requirementId:"HIPAA-R40"},allow_stats_transcript_scan:{deniedUnder:["hipaa"],transcriptScan:!0,onCacheMiss:"deny",label:"Usage stats",verb:"are",requirementId:"HIPAA-R42"},...{},allow_model_catalog:{deniedUnder:["hipaa"],onCacheMiss:"allow",label:"The model catalog",verb:"is",requirementId:"HIPAA-R33"},allow_container_result_files:{deniedUnder:["hipaa","zdr"],onCacheMiss:"deny",label:"Saving large tool results in the tool container",verb:"is",requirementId:"HIPAA-R53"},allow_promo_offers:{deniedUnder:["hipaa"],onCacheMiss:"deny",label:"Promotional offers",verb:"are",requirementId:"HIPAA-R54"},allow_previous_conversation_pointer:{deniedUnder:["hipaa"],onCacheMiss:"deny",label:"Linking a new conversation to the one it replaces",verb:"is",requirementId:"HIPAA-R58"},allow_api_auth_warm:{deniedUnder:["hipaa"],onCacheMiss:"deny",label:"Warming the API credential cache",verb:"is",requirementId:"HIPAA-R59"},allow_cache_keepalive:{deniedUnder:["hipaa"],onCacheMiss:"deny",label:"Renewing the prompt cache lifetime",verb:"is",requirementId:"HIPAA-R65"}};
  function dBr(e){return Object.hasOwn(cBr,e)}
  function k8e(e){return dBr(e)?cBr[e]:void 0}
  function E(){return Object.keys(cBr).filter(dBr)}
  var uBr=E().flatMap((e)=>(k8e(e)?.deniedUnder??[]).map((n)=>[n,e])),G8o=E().flatMap((e)=>(k8e(e)?.hardBlockUnder??[]).map((n)=>[n,e])),z8o=new Set(E().filter((e)=>k8e(e)?.onCacheMiss!=="allow")),pBr=new Set(E().filter((e)=>k8e(e)?.onCacheMiss==="hold")),i1o=new Set(E().filter((e)=>k8e(e)?.onFailOpenVerdict==="deny")),xn=new Set(["allow_product_feedback"]),Fe=new Set(["allow_web_fetch","allow_design_sync"]);
  function Z(e){return e.startsWith("enforce_")||e.startsWith("require_")}
  function Q(e){if(e==="env-quad")return a.ANTHROPIC_FEDERATION_RULE_ID?.trim()??"";let n=SM();return n===null||e===null?"":ee(n,Yzr(n))}
  function ee(e,n){return e===null?"":`${kn(e)}\x00${n}`}
  return { xq, Kne, Yne, rBr, Z4n, jD, p }
}
