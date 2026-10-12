// Exact whole declarations; only missing helpers. All existing actors are borrowed.
import * as builtin0 from "path";
import * as builtin1 from "fs/promises";
import * as builtin2 from "crypto";
import * as builtin3 from "fs";
const builtinModules={"path":builtin0,"fs/promises":builtin1,"crypto":builtin2,"fs":builtin3};
const factoryBodies={
  "chunk-tf63hv0k.js": "with(imports){\nclass rs{chunks=[];static encoder=new TextEncoder;push(e){if(e.length>0)this.chunks.push(rs.encoder.encode(e))}toBuffer(){return Buffer.concat(this.chunks)}};\nfunction wtt(e,s,r,u){let n=new rs,f=(h)=>{if(h.length>0)n.push(_(h).slice(1,-1))};n.push('{\"content\":\"'),f(\"{\");let T=!0,b=(h)=>{if(!T)f(\",\");T=!1,f(_(h)+\":\")};for(let[h,M]of Object.entries(e)){if(M===void 0)continue;if(s.has(h)&&Array.isArray(M)){b(h),f(\"[\");for(let R=0;R<M.length;R++){if(R>0)f(\",\");f(_(M[R]))}f(\"]\")}else if(r.has(h)&&M!==null&&typeof M===\"object\"){b(h),f(\"{\");let R=Object.entries(M);for(let k=0;k<R.length;k++){let[E,I]=R[k]??[\"\",void 0];if(k>0)f(\",\");if(f(_(E)+\":[\"),Array.isArray(I))for(let D=0;D<I.length;D++){if(D>0)f(\",\");f(_(I[D]))}f(\"]\")}f(\"}\")}else b(h),f(_(M))}f(\"}\"),n.push('\"');let A=u?.extraOuterFields;if(A)for(let[h,M]of Object.entries(A))n.push(`,${_(h)}:${_(M)}`);return n.push(\"}\"),n.toBuffer()};\nvar _r=[\"msg_bdrk_\",\"msg_vrtx_\",\"bolt-inf-\",\"toolu_bdrk_\",\"toolu_vrtx_\",\"srvtoolu_bdrk_\",\"srvtoolu_vrtx_\",\"req_bdrk_\",\"req_vrtx_\"];\nfunction fme(e){return _r.some((s)=>e.includes(s))};\nfunction Ett(e){return e.some((s)=>{try{return fme(_(s))}catch{return!0}})};\nvar ws=\"api-request\";\nvar br=`\"type\":\"${ws}`;\nfunction wHe(e){let s=[];for(let r of e.split(`\n`)){let u=hr(r);if(u!==void 0)s.push(u)}return s.join(`\n`)};\nfunction hr(e){let s=0;while(e.charCodeAt(s)===0||e.charCodeAt(s)===65279)s++;let r=s>0?e.slice(s):e;if(r.trim()===\"\")return e;let u;try{u=zo(r)}catch{u=void 0}let n=N(u)?u.type:void 0;if(typeof n===\"string\"&&n.startsWith(ws))return;if(typeof n!==\"string\"||e.includes(br))return _({type:\"line-withheld\",bytes:Buffer.byteLength(e)});return e};\nvar Ps={day:86400000,week:604800000};\nvar jt=1048576;\nasync function Pr({transcriptPath:e,scope:s=\"session\",maxRawTranscriptBytes:r,excludeThirdPartyTranscripts:u=!1},n){let[f,T]=await Promise.all([wlr(e,r,n),Rr(e,s,u,n)]),b=f,A=!1;if(u&&b!==null)if(fme(b))b=null,A=!0,t(\"rawTranscriptJsonl withheld from session history: contains_3p_transcript_markers\");else b=wHe(b);return{rawTranscriptJsonl:b,recentSessionTranscripts:T.transcripts,thirdPartyExclusions:{rawTranscript:A,recentSessions:T.droppedThirdParty}}};\nasync function As({messages:e,backgroundTasks:s={},transcripts:r={},diskSubagentTranscripts:u,scope:n=\"session\",maxRawTranscriptBytes:f,excludeThirdPartyTranscripts:T=!1},b){let A=au(),h=Ft(),[M,R,k,E]=await Promise.all([u,Pr({transcriptPath:A,scope:h?\"session\":n,maxRawTranscriptBytes:f,excludeThirdPartyTranscripts:T},b),h?!1:Kx(),h?\"\":Mbt()]),I=Qr(t6r(s,r),Lee),D={...M,...I},L=new Set(Object.keys(I)),X=0;if(T){for(let[J,me]of Object.entries(D))if(Ett(me))delete D[J],X++,t(`subagent transcript ${J} withheld: contains_3p_transcript_markers`)}let ie=C5(e);return{transcriptPath:A,rawTranscriptJsonl:R.rawTranscriptJsonl,recentSessionTranscripts:R.recentSessionTranscripts,subagentTranscripts:D,teammateIds:L,isGit:k,commitSha:E||null,remoteWorkspace:h,remoteSessionId:h?pr()?.sessionId??null:null,workingDirectory:Ee(),platform:a.platform,terminal:a.terminal,version:{ISSUES_EXPLAINER:\"report the issue at https://github.com/anthropics/claude-code/issues\",PACKAGE_URL:\"@anthropic-ai/claude-code\",README_URL:\"https://code.claude.com/docs/en/overview\",VERSION:\"2.1.287\",FEEDBACK_CHANNEL:\"https://github.com/anthropics/claude-code/issues\",BUILD_TIME:\"2026-10-01T16:02:06Z\",GIT_SHA:\"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937\",HOOKS_WORKER_URL:\"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js\",DD_SOURCEMAP_GROUP:\"darwin\"}.VERSION,latestAssistantMessageId:ie?.requestId??null,latestAssistantAPIMessageId:ie?.message.id??null,thirdPartyExclusions:{...R.thirdPartyExclusions,subagents:X}}};\nasync function wlr(e,s,r){if(s===void 0)return null;if(r!==void 0){let u=Ms(e);if(u!==void 0)return Ar(r,u,s)}try{let{content:u,bytesRead:n,bytesTotal:f}=await lC(e,s),T=u;if(n<f){let b=u.indexOf(`\n`);T=b>=0?u.slice(b+1):\"\"}return T.trim().length>0?T:null}catch{return null}};\nasync function Ar(e,s,r){let u=await e.readRecords(s,{order:\"backward\",maxBytes:r});if(!u.ok)return null;let n=u.value.items,f=n.reduce((A,h)=>A+h.data.byteLength,0),T=n.length;if(u.value.nextSeq!==void 0||f>r){T=0;let A=0;for(let h of n){if(A+=h.data.byteLength,A>=r)break;T+=1}}let b=Buffer.concat(n.slice(0,T).reverse().map((A)=>A.data)).toString(\"utf8\");return b.trim().length>0?b:null};\nfunction Ms(e){if(!e.endsWith(\".jsonl\"))return;let s=os(e),r=ns(s),u=ns(e).slice(0,-6);if(os(s)!==Bd()||!Xn(r)||!Xn(u))return;let n=De.transcript(r,u);return n.namespace===\"transcript\"&&Mm(n)===void 0?n:void 0};\nasync function Rr(e,s,r,u){if(s===\"session\")return{transcripts:void 0,droppedThirdParty:0};if(u!==void 0){let k=Ms(e);if(k!==void 0)return Mr(u,k,s,r)}let n=os(e),f=ns(e),T=Date.now()-Ps[s],b;try{b=await Sr(n)}catch{return{transcripts:void 0,droppedThirdParty:0}}let A=[];await Promise.all(b.filter((k)=>k.endsWith(\".jsonl\")&&k!==f).map(async(k)=>{let E=Tr(n,k);try{let I=await kr(E);if(I.isFile()&&I.mtimeMs>=T)A.push({path:E,sessionId:k.slice(0,-6),mtimeMs:I.mtimeMs,size:I.size})}catch{}})),A.sort((k,E)=>E.mtimeMs-k.mtimeMs);let h={},M=0,R=0;for(let k of A){if(k.size===0||M+k.size>jt)continue;try{let{content:E,bytesRead:I,bytesTotal:D}=await lC(k.path,jt);if(!E||I<D)continue;if(r&&fme(E)){R++,t(`recent session ${k.sessionId} withheld: contains_3p_transcript_markers`);continue}h[k.sessionId]=r?wHe(E):E,M+=k.size}catch{}}return{transcripts:Object.keys(h).length>0?h:void 0,droppedThirdParty:R}};\nasync function Mr(e,s,r,u){let n=Date.now()-Ps[r],f=[],T=0,b=await ui((R)=>e.listEntries({namespace:\"transcript\",projectKey:s.projectKey},{skipScopeStats:!0,...R!==void 0&&{cursor:R}}),(R)=>{T++;for(let k of R){if(k.kind!==\"key\"||k.key.namespace!==\"transcript\")continue;if(k.key.agentId!==void 0||k.key.journal===!0)continue;if(k.key.projectKey!==s.projectKey)continue;if(k.key.sessionId===s.sessionId)continue;if(!Xn(k.key.sessionId)||Mm(k.key)!==void 0)continue;if((k.mtimeMs??0)>=n)f.push({key:k.key,sessionId:k.key.sessionId,mtimeMs:k.mtimeMs??0,size:k.size??0})}});if(b.status===\"error\"&&T===0)return{transcripts:void 0,droppedThirdParty:0};if(b.status===\"capped\")t(`recent sessions: listing cut short after ${Yp} pages; keeping what was listed`);f.sort((R,k)=>k.mtimeMs-R.mtimeMs);let A={},h=0,M=0;for(let R of f){if(R.size===0||h+R.size>jt)continue;let k=await e.read([{key:R.key,tail:jt}]);if(!k.ok)continue;let E=k.value.items[0];if(!E.found||E.value.byteLength===0||E.value.byteLength<E.totalBytes)continue;let I=Buffer.from(E.value).toString(\"utf8\");if(u&&fme(I)){M++,t(`recent session ${R.sessionId} withheld: contains_3p_transcript_markers`);continue}A[R.sessionId]=u?wHe(I):I,h+=R.size}return{transcripts:Object.keys(A).length>0?A:void 0,droppedThirdParty:M}};\nvar Es=\"https://github.com/anthropics/claude-code/issues\";\nvar Dr={bedrock:\"Amazon Bedrock\",vertex:\"Vertex AI\",foundry:\"Microsoft Foundry\",anthropicAws:\"Claude Platform on AWS\",anthropicGoogleCloud:\"Claude Platform on Google Cloud\",mantle:\"Amazon Bedrock (Mantle)\",gateway:\"an API gateway\"};\nfunction Tie(e=\"/feedback\"){let s=Bne(e);if(s!==null)return{kind:\"disabled\",reason:s};let r=He();if(r!==\"firstParty\")return{kind:\"bundle\",cause:\"provider\",label:Dr[r]};if(dIe().error)return{kind:\"bundle\",cause:\"no_creds\",label:\"no Anthropic credentials\"};return{kind:\"post\"}};\nvar as=new Set([\"transcript\"]);\nvar ls=new Set([\"subagentTranscripts\"]);\nvar vtt=4194304;\nvar Ur=2097152;\nvar mme=8388608;\nvar Or=2097152;\nvar Lr=[\"model\",\"system\",\"tools\",\"tool_choice\",\"betas\",\"max_tokens\",\"thinking\",\"temperature\",\"context_management\",\"output_config\"];\nfunction Elr(e){let s={};for(let r of Lr)if(e[r]!==void 0)Object.assign(s,{[r]:e[r]});return s};\nfunction exn(e){return wtt(e,as,ls).length};\nasync function txn({messages:e,description:s,surface:r,storageV5:u}){let n=Tie();if(n.kind===\"disabled\")return{feedback_id:null,unavailable_reason:n.reason};let f=await ixn({messages:e,description:s,surface:r,storageV5:u});if(!f.success)return{feedback_id:null,failure_reason:\"bundle_write_failed\"};return{feedback_id:f.bundleId,bundle_path:f.zipPath}};\nfunction q4t(){let e=Tie();switch(e.kind){case\"post\":case\"share\":return null;case\"disabled\":return e.reason;case\"bundle\":if(e.cause===\"no_creds\")return`/feedback requires Anthropic credentials (OAuth or API key). Report issues at ${Es}`;return`/feedback is not available when using ${e.label}. Report issues at ${Es}`}};\nfunction Br(){return Zse().map((e)=>{let s={...e};if(s&&typeof s.error===\"string\")s.error=ks(s.error);return s})};\nfunction Nr(e,s,r){if(!e)return[];let u=e.split(`\n`),n=[],f=[],T=new Set,b=-1;for(let R of u){if(!R)continue;let k;try{k=Y(R)}catch{continue}if(typeof k!==\"object\"||k===null)continue;if(k.type===\"system\"&&k.subtype===\"compact_boundary\"){b=n.length;continue}if(k.type!==\"user\"&&k.type!==\"assistant\")continue;if(typeof k.uuid!==\"string\"||typeof k.timestamp!==\"string\"||k.isSidechain===!0||!k.message)continue;if(r.has(k.uuid)||T.has(k.uuid))continue;T.add(k.uuid),n.push(k.type===\"user\"?{type:\"user\",uuid:k.uuid,timestamp:k.timestamp,message:k.message,...k.isMeta===!0&&{isMeta:!0},...k.toolUseResult!==void 0&&{toolUseResult:k.toolUseResult},...k.isCompactSummary===!0&&{isCompactSummary:!0}}:{type:\"assistant\",uuid:k.uuid,timestamp:k.timestamp,message:k.message,requestId:k.requestId}),f.push(Buffer.byteLength(R))}if(b<=0)return[];let{start:A,oversized:h}=nxn(f,s,b),M=n.slice(A,b);return h.size===0?M:M.filter((R,k)=>!h.has(A+k))};\nfunction nxn(e,s,r=e.length){let u=0,n=r,f=new Set;while(n>0){let T=e[n-1];if(T===void 0)break;if(T>s){f.add(n-1),n--;continue}if(u+T>s)break;u+=T,n--}return{start:n,keptBytes:u,oversized:f}};\nfunction jr(e,s){let r;for(let b of e){if(b.type===\"user\"&&b.isCompactSummary===!0)continue;if(r===void 0||b.timestamp<r)r=b.timestamp}let u=[],n=[];for(let b of s)if(r===void 0||b.timestamp<r)u.push(b);else n.push(b);if(n.length===0)return[...u,...e];let f=e.findLastIndex((b)=>b.type===\"user\"&&b.isCompactSummary===!0),T=f===-1?e.length:f;return[...u,...e.slice(0,T),...n,...e.slice(T)]};\nasync function Kr(){let e=_Y();if(!e)return null;try{await Nfe();let{content:s,bytesRead:r,bytesTotal:u}=await lC(e,Ur),n=s;if(r<u)n=n.slice(n.indexOf(`\n`)+1),n=`[debug log truncated to last ${r} of ${u} bytes]\n${n}`;return ks(n)}catch{return null}};\nasync function Ds({messages:e,description:s,surface:r,scope:u=\"session\",backgroundTasks:n={},transcripts:f={},surveyFeedbackSource:T,excludeThirdPartyTranscripts:b,storageV5:A}){let[h,M]=await Promise.all([As({messages:e,backgroundTasks:n,transcripts:f,diskSubagentTranscripts:cOr(A),scope:u,maxRawTranscriptBytes:vtt,excludeThirdPartyTranscripts:b}),Kr()]),R=hdt(e)===-1?[]:Nr(h.rawTranscriptJsonl,Or,new Set(e.map((me)=>me.uuid))),k=Lee(e),E=e.length-k.length,I=wv(k),D=R.length===0?I:jr(I,R),L=N3t(),X=Lme(),ie={latestAssistantMessageId:h.latestAssistantMessageId,latestAssistantAPIMessageId:h.latestAssistantAPIMessageId,lastInterruptedAssistantAPIMessageId:MEe(),message_count:e.length,datetime:new Date().toISOString(),description:s,surface:r,scope:h.remoteWorkspace?\"session\":u,platform:h.platform,gitRepo:h.isGit,commitSha:h.commitSha,...h.remoteWorkspace&&{remoteWorkspace:!0},...h.remoteSessionId&&{remoteSessionId:h.remoteSessionId},terminal:h.terminal,version:h.version,...!1,transcript:D,errors:Br(),lastApiRequest:L?Elr(L):null,...Object.keys(h.subagentTranscripts).length>0&&{subagentTranscripts:h.subagentTranscripts},...h.rawTranscriptJsonl&&{rawTranscriptJsonl:h.rawTranscriptJsonl},...h.recentSessionTranscripts&&{recentSessionTranscripts:h.recentSessionTranscripts},...M&&{debugLog:M},...T&&{survey_appearance_id:T.appearanceId,survey_response:T.response,survey_type:T.surveyType}},J=h.thirdPartyExclusions.recentSessions+h.thirdPartyExclusions.subagents+(h.thirdPartyExclusions.rawTranscript?1:0);if(R.length>0){if(exn(ie)>mme)return p(\"feedback_precompact\",\"over_payload_cap\"),{payload:{...ie,transcript:I},thirdPartyDroppedCount:J,laptopMemoryDroppedCount:E};y(\"feedback_precompact\")}else if(hdt(e)!==-1&&!h.thirdPartyExclusions.rawTranscript)p(\"feedback_precompact\",\"empty_recovery\");return{payload:ie,thirdPartyDroppedCount:J,laptopMemoryDroppedCount:E}};\nfunction is(e){if(e instanceof Error){let s=Error(ks(e.message));if(e.stack)s.stack=ks(e.stack);d(s)}else{let s=ks(String(e));d(Error(s))}};\nfunction qr(e,s){if(!e||s===null)return;let r=e.split(`\n`);for(let u=r.length-1;u>=0;u--){let n=r[u];if(!n)continue;let f;try{f=Y(n)}catch{continue}if(typeof f!==\"object\"||f===null||f.type!==\"assistant\"||f.message.id!==s)continue;return typeof f.sessionId===\"string\"&&dEe(f.sessionId)?f.sessionId:void 0}return};\nasync function nvt(e,s,r,u){if(At())return{success:!1};if(!on(\"allow_product_feedback\"))return{success:!1,failureReason:\"policy_blocked\"};let n=0;try{let f=wtt(e,as,ls,r===void 0?void 0:{extraOuterFields:{session_id:r}});if(n=f.length,n>mme)return{success:!1,payloadTooLarge:!0,failureReason:\"payload_too_large_precheck\"};let T=await E_(()=>Gt.post(\"/api/claude_cli_feedback\",f,{headers:{\"Content-Type\":\"application/json\"},timeout:30000,signal:s,credentials:u}),{credentials:u});if(!T.ok)switch(T.reason){case\"essential-traffic-only\":return{success:!1};case\"data-residency\":return{success:!1,failureReason:\"data_residency\"};case\"no-auth\":return{success:!1,failureReason:\"auth_error\"}}if(T.status===200){if(T.data?.feedback_id)return{success:!0,feedbackId:T.data.feedback_id};return is(Error(\"Failed to submit feedback: request did not return feedback_id\")),{success:!1,failureReason:\"missing_feedback_id\"}}let b=\"Failed to submit feedback:\"+T.status;if(T.status===401||T.status===403||T.status===429)t(b);else is(Error(b));return{success:!1,failureReason:\"http_error\",statusCode:T.status}}catch(f){if(Na(f))return{success:!1};if(f instanceof RangeError)return{success:!1,payloadTooLarge:!0,failureReason:\"payload_too_large_range_error\"};if(gd(f)){if(f.response?.status===413)return{success:!1,payloadTooLarge:!0,failureReason:\"payload_too_large_413\",statusCode:413};if(f.code===\"ECONNABORTED\"&&n>mme/8)return{success:!1,payloadTooLarge:!0,failureReason:\"payload_too_large_timeout\"};if(f.response?.status===403){let T=f.response.data;if(T?.error?.type===\"permission_error\"&&T?.error?.message?.includes(\"Custom data retention settings\"))return t(\"Cannot submit feedback because custom data retention settings are enabled\"),{success:!1,isZdrOrg:!0,failureReason:\"zdr_org\",statusCode:403}}}if(Pu(f))t(ks(l(f)));else is(f);if(gd(f)&&f.response)return{success:!1,failureReason:\"http_error\",statusCode:f.response.status};return{success:!1,failureReason:gd(f)&&f.code===\"ECONNABORTED\"?\"timeout\":\"network_error\"}}};\nasync function J6e({messages:e,description:s,surface:r,scope:u=\"session\",backgroundTasks:n,transcripts:f,signal:T,surveyFeedbackSource:b,storageV5:A,credentials:h}){let{payload:M,thirdPartyDroppedCount:R,laptopMemoryDroppedCount:k}=await Ds({messages:e,description:s,surface:r,scope:u,backgroundTasks:n,transcripts:f,surveyFeedbackSource:b,excludeThirdPartyTranscripts:!0,storageV5:A}),E=M.latestAssistantMessageId,I=qr(M.rawTranscriptJsonl,M.latestAssistantAPIMessageId),D=await nvt(M,T,I,h),L=D,X=0;if(!L.success&&L.payloadTooLarge){let{transcript:ie,subagentTranscripts:J,lastApiRequest:me,recentSessionTranscripts:_e,rawTranscriptJsonl:Fe,debugLog:oe,...ke}=M;if(X=1,L=await nvt({...ke,transcript:[],...Fe&&{rawTranscriptJsonl:Fe},...oe&&{debugLog:oe}},T,I,h),!L.success&&L.payloadTooLarge)X=2,L=await nvt({...ke,transcript:[]},T,I,h)}if(L.success){i(\"tengu_bug_report_submitted\",{surface:c(r),remote_workspace:S(M.remoteWorkspace?\"true\":\"false\"),retried_after_too_large:!D.success&&D.payloadTooLarge===!0,strip_level:Er(X),third_party_transcripts_dropped:Er(R),laptop_memory_rows_dropped:Er(k),feedback_id:ye(L.feedbackId),last_assistant_message_id:ye(E),last_assistant_api_message_id:ye(M.latestAssistantAPIMessageId),last_interrupted_assistant_api_message_id:ye(M.lastInterruptedAssistantAPIMessageId),...b&&{survey_appearance_id:ye(b.appearanceId),survey_response:c(b.response),survey_type:c(b.surveyType)}}),O_t(\"tengu_bug_report_description\",{feedback_id:ye(L.feedbackId),descriptionLength:s.length});let ie=!D.success&&D.payloadTooLarge===!0;if(ie)p(\"feedback_submit\",\"payload_stripped\");else y(\"feedback_submit\");return{success:!0,feedbackId:L.feedbackId,retriedAfterTooLarge:ie}}if(L.failureReason)m(\"feedback_submit\",L.failureReason),i(\"tengu_bug_report_failed\",{surface:c(r),remote_workspace:S(M.remoteWorkspace?\"true\":\"false\"),reason:c(L.failureReason),status_code:kW(L.statusCode)??S(\"\"),first_attempt_too_large:!D.success&&D.payloadTooLarge===!0});return{success:!1,isZdrOrg:L.isZdrOrg,failureReason:L.failureReason,statusCode:L.statusCode}};\nvar vs={success:!1,error:\"Cancelled\"};\nasync function vlr(e,s=\"feedback.json\",r){if(r?.aborted)return vs;let f=`cc-${new Date().toISOString().replace(/[-:]/g,\"\").replace(\"T\",\"-\").slice(0,15)}-${Cr(3).toString(\"hex\")}`,T=Cs(we(),\"feedback-bundles\"),b=Cs(T,`${f}.zip`);try{await vr(T,{recursive:!0,mode:448});let{Zip:A,ZipDeflate:h}=await loadExplicitDependency287(\"/$bunfs/root/chunk-h4hpfzhs.js\"),M=Ir(b,{mode:384});if(await new Promise((R,k)=>{M.on(\"error\",k);let E=new A((D,L,X)=>{if(D)return M.destroy(),k(D);if(M.write(L),X)M.end(()=>R())}),I=new h(s);E.add(I),I.push(e,!0),E.end()}),r?.aborted)return await c$(()=>Fr(b)).catch(()=>{}),vs;return y(\"feedback_bundle\"),{success:!0,bundleId:f,zipPath:b}}catch(A){return await xr(b,{force:!0}).catch(()=>{}),d(A),m(\"feedback_bundle\",\"write_failed\"),{success:!1,error:l(A)}}};\nvar xs=new Set([\"type\",\"description\",\"title\"]);\nfunction Fs(e){return typeof e===\"string\"||e!==null&&typeof e===\"object\"?\"[REDACTED]\":e};\nvar zr=/(?<![0-9a-f])[0-9a-f]{64}(?![0-9a-f])/g;\nfunction qt(e,s){return s.includes(\"api-request\")?e.replace(zr,\"[REDACTED]\"):e};\nfunction Wt(e,s=\"data\"){if(typeof e===\"string\")return qt(ks(e),e);if(Array.isArray(e))return e.map((n)=>Wt(n));if(e===null||typeof e!==\"object\")return e;let r=\"type\"in e&&e.type===\"object\",u=Object.create(null);for(let[n,f]of Object.entries(e)){let T=f!==null&&typeof f===\"object\"&&!Array.isArray(f),b=!1,A=\"data\";if(s===\"credentialProperty\")if(T&&(n===\"items\"||n===\"properties\"&&r))A=n===\"items\"?\"credentialProperty\":\"credentialPropertyNames\";else if(xs.has(n)&&Array.isArray(f)){u[ks(n)]=f.map((h)=>typeof h===\"string\"?ks(h):Fs(h));continue}else b=!xs.has(n)||T;else if(s===\"credentialPropertyNames\")b=!T,A=\"credentialProperty\";else if(s===\"propertyNames\"&&T)A=Bqt({[n]:\"\"})[n]===\"[REDACTED]\"?\"credentialProperty\":\"data\";else if(n===\"properties\"&&T&&r)A=\"propertyNames\";else b=Bqt({[n]:\"\"})[n]===\"[REDACTED]\";if(b)u[ks(n)]=Fs(f);else if(typeof f===\"string\")u[ks(n)]=qt(vQr(n,f),f);else u[ks(n)]=Wt(f,A)}return u};\nfunction K4t(e){return Wt(e)};\nfunction $r(e){return e.split(`\n`).map((s)=>{if(!s)return s;let r=gt(s,!1);if(r===null)return qt(ks(s),s);try{return _(Wt(r))}catch{return qt(ks(s),s)}}).join(`\n`)};\nfunction sxn(e){return $r(wHe(e))};\nasync function ixn({messages:e,description:s,surface:r,scope:u=\"session\",backgroundTasks:n,transcripts:f,signal:T,surveyFeedbackSource:b,storageV5:A}){let h;try{let{payload:M}=await Ds({messages:e,description:s,surface:r,scope:u,backgroundTasks:n,transcripts:f,surveyFeedbackSource:b,excludeThirdPartyTranscripts:!1,storageV5:A}),{rawTranscriptJsonl:R,recentSessionTranscripts:k,transcript:E,subagentTranscripts:I,...D}=M,L={...qK(D),transcript:K4t(E),...I!==void 0&&{subagentTranscripts:Qr(I,K4t)},...R!==void 0&&{rawTranscriptJsonl:sxn(R)},...k!==void 0&&{recentSessionTranscripts:Qr(k,sxn)}};h=wtt(L,as,ls)}catch(M){return d(M),m(\"feedback_bundle\",\"write_failed\"),{success:!1,error:l(M)}}return vlr(h,void 0,T)};\nreturn {rs,wtt,_r,fme,Ett,ws,br,wHe,hr,Ps,jt,Pr,As,wlr,Ar,Ms,Rr,Mr,Es,Dr,Tie,as,ls,vtt,Ur,mme,Or,Lr,Elr,exn,txn,q4t,Br,Nr,nxn,jr,Kr,Ds,is,qr,nvt,J6e,vs,vlr,xs,Fs,zr,qt,Wt,K4t,$r,sxn,ixn};}",
  "chunk-2ynta9xc.js": "with(imports){\nvar Mbt=async()=>tTn();\nreturn {Mbt};}",
  "chunk-13899ncf.js": "with(imports){\nfunction t6r(t,e){let n={};for(let r of Object.values(t)){let o=e[r.id]?.messages;if(r.type===\"in_process_teammate\"&&r.identity?.agentId&&o&&o.length>0)n[r.identity.agentId]=o}return n};\nreturn {t6r};}",
  "chunk-mphp7acd.js": "with(imports){\nasync function qGn(e,n){let r=await Promise.all(e.filter(FEe).map(async(s)=>{try{let g=await Ene(yo(s),n);if(g&&g.messages.length>0)return{agentId:s,transcript:g.messages};return null}catch{return null}}));return Object.fromEntries(r.filter((s)=>s!==null).map((s)=>[s.agentId,s.transcript]))};\nasync function cOr(e){return qGn(await ZUe(F()&&e!==void 0?e:void 0),e)};\nreturn {qGn,cOr};}",
  "chunk-bn3p37gv.js": "with(imports){\nfunction N3t(){return n().requestJournal.lastAPIRequest()};\nreturn {N3t};}",
  "chunk-vyeek978.js": "with(imports){\nfunction Lme(){return null};\nreturn {Lme};}",
  "chunk-h4hpfzhs.js": "with(imports){\nvar z=Uint8Array;\nvar q=Uint16Array;\nvar vr=Int32Array;\nvar cr=new z([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]);\nvar pr=new z([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]);\nvar zr=new z([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);\nvar Dr=function(n,r){var t=new q(31);for(var e=0;e<31;++e)t[e]=r+=1<<n[e-1];var a=new vr(t[30]);for(var e=1;e<30;++e)for(var i=t[e];i<t[e+1];++i)a[i]=i-t[e]<<5|e;return{b:t,r:a}};\nvar Tr=Dr(cr,2);\nvar {b:Wr,r:hr}=Tr;\nWr[28]=258,hr[258]=28;;\nvar Ur=Dr(pr,0);\nvar {b:rn,r:Ar}=Ur;\nvar ur=new q(32768);\nfor(v=0;v<32768;++v)W=(v&43690)>>1|(v&21845)<<1,W=(W&52428)>>2|(W&13107)<<2,W=(W&61680)>>4|(W&3855)<<4,ur[v]=((W&65280)>>8|(W&255)<<8)>>1;;\nvar W;\nvar rr=function(n,r,t){var e=n.length,a=0,i=new q(r);for(;a<e;++a)if(n[a])++i[n[a]-1];var o=new q(r);for(a=1;a<r;++a)o[a]=o[a-1]+i[a-1]<<1;var f;if(t){f=new q(1<<r);var l=15-r;for(a=0;a<e;++a)if(n[a]){var h=a<<4|n[a],s=r-n[a],u=o[n[a]-1]++<<s;for(var p=u|(1<<s)-1;u<=p;++u)f[ur[u]>>l]=h}}else{f=new q(e);for(a=0;a<e;++a)if(n[a])f[a]=ur[o[n[a]-1]++]>>15-n[a]}return f};\nvar J=new z(288);\nfor(v=0;v<144;++v)J[v]=8;;\nfor(v=144;v<256;++v)J[v]=9;;\nfor(v=256;v<280;++v)J[v]=7;;\nfor(v=280;v<288;++v)J[v]=8;;\nvar nr=new z(32);\nfor(v=0;v<32;++v)nr[v]=5;;\nvar v;\nvar Rr=rr(J,9,0);\nvar Yr=rr(nr,5,0);\nvar Ir=function(n){return(n+7)/8|0};\nvar Zr=function(n,r,t){if(r==null||r<0)r=0;if(t==null||t>n.length)t=n.length;return new z(n.subarray(r,t))};\nvar Jr=[\"unexpected EOF\",\"invalid block type\",\"invalid length/literal\",\"invalid distance\",\"stream finished\",\"no stream handler\",,\"no callback\",\"invalid UTF-8 data\",\"extra field too long\",\"date not in range 1980-2099\",\"filename too long\",\"stream finishing\",\"invalid zip data\"];\nvar G=function(n,r,t){var e=Error(r||Jr[n]);if(e.code=n,Error.captureStackTrace)Error.captureStackTrace(e,G);if(!t)throw e;return e};\nvar R=function(n,r,t){t<<=r&7;var e=r/8|0;n[e]|=t,n[e+1]|=t>>8};\nvar b=function(n,r,t){t<<=r&7;var e=r/8|0;n[e]|=t,n[e+1]|=t>>8,n[e+2]|=t>>16};\nvar fr=function(n,r){var t=[];for(var e=0;e<n.length;++e)if(n[e])t.push({s:e,f:n[e]});var a=t.length,i=t.slice();if(!a)return{t:Er,l:0};if(a==1){var o=new z(t[0].s+1);return o[t[0].s]=1,{t:o,l:1}}t.sort(function(I,Z){return I.f-Z.f}),t.push({s:-1,f:25001});var f=t[0],l=t[1],h=0,s=1,u=2;t[0]={s:-1,f:f.f+l.f,l:f,r:l};while(s!=a-1)f=t[t[h].f<t[u].f?h++:u++],l=t[h!=s&&t[h].f<t[u].f?h++:u++],t[s++]={s:-1,f:f.f+l.f,l:f,r:l};var p=i[0].s;for(var e=1;e<a;++e)if(i[e].s>p)p=i[e].s;var m=new q(p+1),w=lr(t[s-1],m,0);if(w>r){var e=0,y=0,x=w-r,S=1<<x;i.sort(function(Z,M){return m[M.s]-m[Z.s]||Z.f-M.f});for(;e<a;++e){var F=i[e].s;if(m[F]>r)y+=S-(1<<w-m[F]),m[F]=r;else break}y>>=x;while(y>0){var T=i[e].s;if(m[T]<r)y-=1<<r-m[T]++-1;else++e}for(;e>=0&&y;--e){var C=i[e].s;if(m[C]==r)--m[C],++y}w=r}return{t:new z(m),l:w}};\nvar lr=function(n,r,t){return n.s==-1?Math.max(lr(n.l,r,t+1),lr(n.r,r,t+1)):r[n.s]=t};\nvar Mr=function(n){var r=n.length;while(r&&!n[--r]);var t=new q(++r),e=0,a=n[0],i=1,o=function(l){t[e++]=l};for(var f=1;f<=r;++f)if(n[f]==a&&f!=r)++i;else{if(!a&&i>2){for(;i>138;i-=138)o(32754);if(i>2)o(i>10?i-11<<5|28690:i-3<<5|12305),i=0}else if(i>3){o(a),--i;for(;i>6;i-=6)o(8304);if(i>2)o(i-3<<5|8208),i=0}while(i--)o(a);i=1,a=n[f]}return{c:t.subarray(0,e),n:r}};\nvar _=function(n,r){var t=0;for(var e=0;e<r.length;++e)t+=n[e]*r[e];return t};\nvar Br=function(n,r,t){var e=t.length,a=Ir(r+2);n[a]=e&255,n[a+1]=e>>8,n[a+2]=n[a]^255,n[a+3]=n[a+1]^255;for(var i=0;i<e;++i)n[a+i+4]=t[i];return(a+4+e)*8};\nvar Sr=function(n,r,t,e,a,i,o,f,l,h,s){R(r,s++,t),++a[256];var u=fr(a,15),{t:p,l:m}=u,w=fr(i,15),{t:y,l:x}=w,S=Mr(p),{c:F,n:T}=S,C=Mr(y),{c:I,n:Z}=C,M=new q(19);for(var g=0;g<F.length;++g)++M[F[g]&31];for(var g=0;g<I.length;++g)++M[I[g]&31];var c=fr(M,7),{t:B,l:K}=c,E=19;for(;E>4&&!B[zr[E-1]];--E);var Q=h+5<<3,O=_(a,J)+_(i,nr)+o,P=_(a,p)+_(i,y)+o+14+3*E+_(M,B)+2*M[16]+3*M[17]+7*M[18];if(l>=0&&Q<=O&&Q<=P)return Br(r,s,n.subarray(l,l+h));var k,D,N,Y;if(R(r,s,1+(P<O)),s+=2,P<O){k=rr(p,m,0),D=p,N=rr(y,x,0),Y=y;var ir=rr(B,K,0);R(r,s,T-257),R(r,s+5,Z-1),R(r,s+10,E-4),s+=14;for(var g=0;g<E;++g)R(r,s+3*g,B[zr[g]]);s+=3*E;var H=[F,I];for(var j=0;j<2;++j){var V=H[j];for(var g=0;g<V.length;++g){var L=V[g]&31;if(R(r,s,ir[L]),s+=B[L],L>15)R(r,s,V[g]>>5&127),s+=V[g]>>12}}}else k=Rr,D=J,N=Yr,Y=nr;for(var g=0;g<f;++g){var U=e[g];if(U>255){var L=U>>18&31;if(b(r,s,k[L+257]),s+=D[L+257],L>7)R(r,s,U>>23&31),s+=cr[L];var X=U&31;if(b(r,s,N[X]),s+=Y[X],X>3)b(r,s,U>>5&8191),s+=pr[X]}else b(r,s,k[U]),s+=D[U]}return b(r,s,k[256]),s+D[256]};\nvar Kr=new vr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]);\nvar Er=new z(0);\nvar Qr=function(n,r,t,e,a,i){var o=i.z||n.length,f=new z(e+o+5*(1+Math.ceil(o/7000))+a),l=f.subarray(e,f.length-a),h=i.l,s=(i.r||0)&7;if(r){if(s)l[0]=i.r>>3;var u=Kr[r-1],p=u>>13,m=u&8191,w=(1<<t)-1,y=i.p||new q(32768),x=i.h||new q(w+1),S=Math.ceil(t/3),F=2*S,T=function(sr){return(n[sr]^n[sr+1]<<S^n[sr+2]<<F)&w},C=new vr(25000),I=new q(288),Z=new q(32),M=0,g=0,c=i.i||0,B=0,K=i.w||0,E=0;for(;c+2<o;++c){var Q=T(c),O=c&32767,P=x[Q];if(y[O]=P,x[Q]=O,K<=c){var k=o-c;if((M>7000||B>24576)&&(k>423||!h)){s=Sr(n,l,0,C,I,Z,g,B,E,c-E,s),B=M=g=0,E=c;for(var D=0;D<286;++D)I[D]=0;for(var D=0;D<30;++D)Z[D]=0}var N=2,Y=0,ir=m,H=O-P&32767;if(k>2&&Q==T(c-H)){var j=Math.min(p,k)-1,V=Math.min(32767,c),L=Math.min(258,k);while(H<=V&&--ir&&O!=P){if(n[c+N]==n[c+N-H]){var U=0;for(;U<L&&n[c+U]==n[c+U-H];++U);if(U>N){if(N=U,Y=H,U>j)break;var X=Math.min(H,U-2),yr=0;for(var D=0;D<X;++D){var ar=c-H+D&32767,Nr=y[ar],wr=ar-Nr&32767;if(wr>yr)yr=wr,P=ar}}}O=P,P=y[O],H+=O-P&32767}}if(Y){C[B++]=268435456|hr[N]<<18|Ar[Y];var mr=hr[N]&31,xr=Ar[Y]&31;g+=cr[mr]+pr[xr],++I[257+mr],++Z[xr],K=c+N,++M}else C[B++]=n[c],++I[n[c]]}}for(c=Math.max(c,K);c<o;++c)C[B++]=n[c],++I[n[c]];if(s=Sr(n,l,h,C,I,Z,g,B,E,c-E,s),!h)i.r=s&7|l[s/8|0]<<3,s-=7,i.h=x,i.p=y,i.i=c,i.w=K}else{for(var c=i.w||0;c<o+h;c+=65535){var or=c+65535;if(or>=o)l[s/8|0]=h,or=o;s=Br(l,s+1,n.subarray(c,or))}i.i=o}return Zr(f,0,e+Ir(s)+a)};\nvar Vr=function(){var n=new Int32Array(256);for(var r=0;r<256;++r){var t=r,e=9;while(--e)t=(t&1&&-306674912)^t>>>1;n[r]=t}return n}();\nvar qr=function(){var n=-1;return{p:function(r){var t=n;for(var e=0;e<r.length;++e)t=Vr[t&255^r[e]]^t>>>8;n=t},d:function(){return~n}}};\nvar Gr=function(n,r,t,e,a){if(!a){if(a={l:1},r.dictionary){var i=r.dictionary.subarray(-32768),o=new z(i.length+n.length);o.set(i),o.set(n,i.length),n=o,a.w=i.length}}return Qr(n,r.level==null?6:r.level,r.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+r.mem,t,e,a)};\nvar gr=function(n,r){var t={};for(var e in n)t[e]=n[e];for(var e in r)t[e]=r[e];return t};\nvar A=function(n,r,t){for(;t;++r)n[r]=t,t>>>=8};\nvar Xr=function(){function n(r,t){if(typeof r==\"function\")t=r,r={};if(this.ondata=t,this.o=r||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new z(98304),this.o.dictionary){var e=this.o.dictionary.subarray(-32768);this.b.set(e,32768-e.length),this.s.i=32768-e.length}}return n.prototype.p=function(r,t){this.ondata(Gr(r,this.o,0,0,this.s),t)},n.prototype.push=function(r,t){if(!this.ondata)G(5);if(this.s.l)G(4);var e=r.length+this.s.z;if(e>this.b.length){if(e>2*this.b.length-32768){var a=new z(e&-32768);a.set(this.b.subarray(0,this.s.z)),this.b=a}var i=this.b.length-this.s.z;this.b.set(r.subarray(0,i),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(r.subarray(i),32768),this.s.z=r.length-i+32768,this.s.i=32766,this.s.w=32768}else this.b.set(r,this.s.z),this.s.z+=r.length;if(this.s.l=t&1,this.s.z>this.s.w+8191||t)this.p(this.b,t||!1),this.s.w=this.s.i,this.s.i-=2},n.prototype.flush=function(){if(!this.ondata)G(5);if(this.s.l)G(4);this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2},n}();\nvar Fr=typeof TextEncoder<\"u\"&&new TextEncoder;\nfunction tr(n,r){if(r){var t=new z(n.length);for(var e=0;e<n.length;++e)t[e]=n.charCodeAt(e);return t}if(Fr)return Fr.encode(n);var a=n.length,i=new z(n.length+(n.length>>1)),o=0,f=function(s){i[o++]=s};for(var e=0;e<a;++e){if(o+5>i.length){var l=new z(o+8+(a-e<<1));l.set(i),i=l}var h=n.charCodeAt(e);if(h<128||r)f(h);else if(h<2048)f(192|h>>6),f(128|h&63);else if(h>55295&&h<57344)h=65536+(h&1047552)|n.charCodeAt(++e)&1023,f(240|h>>18),f(128|h>>12&63),f(128|h>>6&63),f(128|h&63);else f(224|h>>12),f(128|h>>6&63),f(128|h&63)}return Zr(i,0,o)};\nvar br=function(n){return n==1?3:n<6?2:n==9?1:0};\nvar d=function(n){var r=0;if(n)for(var t in n){var e=n[t].length;if(e>65535)G(9);r+=e+4}return r};\nvar er=function(n,r,t,e,a,i,o,f){var l=e.length,h=t.extra,s=f&&f.length,u=d(h);if(A(n,r,o!=null?33639248:67324752),r+=4,o!=null)n[r++]=20,n[r++]=t.os;n[r]=20,r+=2,n[r++]=t.flag<<1|(i<0&&8),n[r++]=a&&8,n[r++]=t.compression&255,n[r++]=t.compression>>8;var p=new Date(t.mtime==null?Date.now():t.mtime),m=p.getFullYear()-1980;if(m<0||m>119)G(10);if(A(n,r,m<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>1),r+=4,i!=-1)A(n,r,t.crc),A(n,r+4,i<0?-i-2:i),A(n,r+8,t.size);if(A(n,r+12,l),A(n,r+14,u),r+=16,o!=null)A(n,r,s),A(n,r+6,t.attrs),A(n,r+10,o),r+=14;if(n.set(e,r),r+=l,u)for(var w in h){var y=h[w],x=y.length;A(n,r,+w),A(n,r+2,x),n.set(y,r+4),r+=4+x}if(s)n.set(f,r),r+=s;return r};\nvar Pr=function(n,r,t,e,a){A(n,r,101010256),A(n,r+8,t),A(n,r+10,t),A(n,r+12,e),A(n,r+16,a)};\nvar Cr=function(){function n(r){this.filename=r,this.c=qr(),this.size=0,this.compression=0}return n.prototype.process=function(r,t){this.ondata(null,r,t)},n.prototype.push=function(r,t){if(!this.ondata)G(5);if(this.c.p(r),this.size+=r.length,t)this.crc=this.c.d();this.process(r,t||!1)},n}();\nvar nn=function(){function n(r,t){var e=this;if(!t)t={};Cr.call(this,r),this.d=new Xr(t,function(a,i){e.ondata(null,a,i)}),this.compression=8,this.flag=br(t.level)}return n.prototype.process=function(r,t){try{this.d.push(r,t)}catch(e){this.ondata(e,null,t)}},n.prototype.push=function(r,t){Cr.prototype.push.call(this,r,t)},n}();\nvar tn=function(){function n(r){this.ondata=r,this.u=[],this.d=1}return n.prototype.add=function(r){var t=this;if(!this.ondata)G(5);if(this.d&2)this.ondata(G(4+(this.d&1)*8,0,1),null,!1);else{var e=tr(r.filename),a=e.length,i=r.comment,o=i&&tr(i),f=a!=r.filename.length||o&&i.length!=o.length,l=a+d(r.extra)+30;if(a>65535)this.ondata(G(11,0,1),null,!1);var h=new z(l);er(h,0,r,e,f,-1);var s=[h],u=function(){for(var x=0,S=s;x<S.length;x++){var F=S[x];t.ondata(null,F,!1)}s=[]},p=this.d;this.d=0;var m=this.u.length,w=gr(r,{f:e,u:f,o,t:function(){if(r.terminate)r.terminate()},r:function(){if(u(),p){var x=t.u[m+1];if(x)x.r();else t.d=1}p=1}}),y=0;r.ondata=function(x,S,F){if(x)t.ondata(x,S,F),t.terminate();else if(y+=S.length,s.push(S),F){var T=new z(16);if(A(T,0,134695760),A(T,4,r.crc),A(T,8,y),A(T,12,r.size),s.push(T),w.c=y,w.b=l+y+16,w.crc=r.crc,w.size=r.size,p)w.r();p=1}else if(p)u()},this.u.push(w)}},n.prototype.end=function(){var r=this;if(this.d&2){this.ondata(G(4+(this.d&1)*8,0,1),null,!0);return}if(this.d)this.e();else this.u.push({r:function(){if(!(r.d&1))return;r.u.splice(-1,1),r.e()},t:function(){}});this.d=3},n.prototype.e=function(){var r=0,t=0,e=0;for(var a=0,i=this.u;a<i.length;a++){var o=i[a];e+=46+o.f.length+d(o.extra)+(o.o?o.o.length:0)}var f=new z(e+22);for(var l=0,h=this.u;l<h.length;l++){var o=h[l];er(f,r,o,o.f,o.u,-o.c-2,t,o.o),r+=46+o.f.length+d(o.extra)+(o.o?o.o.length:0),t+=o.b}Pr(f,r,this.u.length,e,t),this.ondata(null,f,!0),this.d=2},n.prototype.terminate=function(){for(var r=0,t=this.u;r<t.length;r++){var e=t[r];e.t()}this.d=2},n}();\nreturn {z,q,vr,cr,pr,zr,Dr,Tr,Wr,hr,Ur,rn,Ar,ur,W,rr,J,nr,v,Rr,Yr,Ir,Zr,Jr,G,R,b,fr,lr,Mr,_,Br,Sr,Kr,Er,Qr,Vr,qr,Gr,gr,A,Xr,Fr,tr,br,d,er,Pr,Cr,nn,tn};}",
  "chunk-gf9kpcg4.js": "with(imports){\nasync function y({draftId:f,description:a,type:e,title:r,area:t,attachTranscript:d,surface:c,messages:u,storageV5:n,credentials:l}){if(!OB())return{feedback_id:null,failure_reason:\"drafts_disabled\"};let{queued:m}=await qee(void 0,n),o=m.find((b)=>b.draft_id===f);if(!o)return{feedback_id:null,failure_reason:\"draft_not_found\"};let i=e!==void 0&&sXt.includes(e)?e:void 0,p={...o,...i!==void 0&&{type:i},...r!=null&&r!==\"\"&&{title:r},...t!=null&&t!==\"\"&&{area:t},...a&&{details:a}},s=await JGe({draft:p,includeTranscript:d==null?!0:d===!0,currentSessionMessages:u,surface:c??\"sdk\",storageV5:n,credentials:l});return s.success?{feedback_id:s.feedbackId}:{feedback_id:null,failure_reason:s.error}};\nreturn {y};}",
  "chunk-spmb4s4c.js": "with(imports){\nvar H=65536;\nfunction K(e){return Buffer.byteLength(ia(ia(e)).slice(1,-1))};\nfunction O(e){let r=ia(e).slice(1,-1);return Buffer.byteLength(ia(r).slice(1,-1))};\nfunction x(e){let r=exn(e);if(r<=mme)return{payload:e,trim:null};using k=ng`fitFeedbackPayloadToBudget(${r})`;let u=r-(mme-H),s=e.transcript.map((T)=>K(T)+1),b=s.reduce((T,F)=>T+F,0),h=e.rawTranscriptJsonl===void 0?0:O(e.rawTranscriptJsonl),w=u<=b?b-u:Math.max(0,b-Math.max(0,u-h)),{start:p,keptBytes:l,oversized:f}=nxn(s,w),g=e.transcript.slice(p),C=f.size===0?g:g.filter((T,F)=>!f.has(p+F)),D=u-(b-l),d=e.rawTranscriptJsonl,n=d===void 0?\"absent\":\"untouched\";if(D>0&&d!==void 0){let T=h-D;if(T<=0)d=void 0,n=\"omitted\";else{let F=d.split(`\n`),j=F.map((E)=>O(E+`\n`)),{start:A,oversized:z}=nxn(j,T),P=F.slice(A),L=(z.size===0?P:P.filter((E,J)=>!z.has(A+J))).join(`\n`);if(L===\"\")d=void 0,n=\"omitted\";else d=L,n=\"reduced\"}}let v={keptMessageCount:C.length,totalMessageCount:e.transcript.length,oversizedMessageCount:f.size,rawTail:n,rawTailKeptBytes:d===void 0?0:Buffer.byteLength(d)},_=W(v);if(_===null)return{payload:e,trim:null};let{rawTranscriptJsonl:R,...B}=e,M={...B,message_count:C.length,description:`${e.description}\n${_}`,transcript:C,...d!==void 0&&{rawTranscriptJsonl:d}},o=exn(M);if(o>mme)t(`fitFeedbackPayloadToBudget: still ${o} bytes after trim (budget ${mme})`,{level:\"error\"});return{payload:M,trim:v}};\nfunction W(e){let r=[];if(e.keptMessageCount<e.totalMessageCount)r.push(`kept ${e.keptMessageCount} of ${e.totalMessageCount} transcript messages (newest kept first)`);if(e.rawTail===\"reduced\")r.push(`kept ${Math.max(1,Math.round(e.rawTailKeptBytes/1024))} KiB of the raw session log (newest kept first)`);else if(e.rawTail===\"omitted\")r.push(\"omitted the raw session log\");if(r.length===0)return null;return`transcript_truncated: ${r.join(\"; \")} (trimmed client-side to fit the upload size limit)`};\nfunction V(e,r=\"panel\"){let k=Bze(e.request_ids),u=XOn(e.area),s=$uo(e.failure_mode),b=Uuo(e.task_category),h=JOn(e.effort),w=Buo(e.thinking_type),p=Vee(e.thinking_budget),l=Vee(e.message_count),f=Vee(e.assistant_turn_count),g=Vee(e.subagent_count);return[`[${e.type}] ${STt(e.title)}`,\"\",KOn(e.details),\"\",\"---\",r===\"card_send_as_is\"?\"Drafted by Claude via the SendFeedback tool; approved by the user from the above-prompt card without full review.\":\"Drafted by Claude via the SendFeedback tool; reviewed and approved by the user before sending.\",`trigger: ${e.trigger}`,...u!==void 0?[`area: ${u}`]:[],...s!==void 0?[`failure_mode: ${s}`]:[],...b!==void 0?[`task_category: ${b}`]:[],`draft_id: ${e.draft_id}`,`drafted_at: ${e.created_at}`,`source_session_id: ${e.source_session_id}`,`model: ${YOn(e.model)}`,`cli_version: ${ige(e.cli_version,VOn)}`,`os: ${ige(e.os,qOn)}`,...h!==void 0?[`effort: ${h}`]:[],...w!==void 0?[`thinking: ${w}${p!==void 0?` (budget ${p})`:\"\"}`]:[],...f!==void 0?[`turns: ${f} assistant${l!==void 0?` / ${l} messages`:\"\"}${g!==void 0&&g>0?`, ${g} ${I(g,\"subagent\")}`:\"\"}`]:[],...k.length>0?[`request_ids: ${k.join(\", \")}`]:[]].join(`\n`)};\nfunction Y(e){let r=[];using k=ng`parseDraftTranscriptMessages(${e.length})`;for(let u of e.split(`\n`)){if(!u)continue;let s;try{s=zo(u)}catch{continue}if(typeof s!==\"object\"||s===null)continue;if(s.type!==\"user\"&&s.type!==\"assistant\")continue;if(typeof s.uuid!==\"string\"||typeof s.timestamp!==\"string\"||s.isSidechain===!0||!s.message)continue;r.push(s.type===\"user\"?{type:\"user\",uuid:s.uuid,timestamp:s.timestamp,message:s.message,...s.isMeta===!0&&{isMeta:!0},...s.toolUseResult!==void 0&&{toolUseResult:s.toolUseResult},...s.isCompactSummary===!0&&{isCompactSummary:!0}}:{type:\"assistant\",uuid:s.uuid,timestamp:s.timestamp,message:s.message,requestId:s.requestId})}return r};\nvar N=\"Feedback payload too large. Try again without the transcript, or shorten the details.\";\nasync function JGe({draft:e,includeTranscript:r,currentSessionMessages:k,surface:u=\"cli\",via:s=\"panel\",signal:b,storageV5:h,credentials:w}){let p=e.source_session_id===q(),l=[],f;if(r&&e.transcript_ref){let _=await Zfr(e);if(p){if(l=wv(Lee(k)),_!==null)try{let{content:R,bytesRead:B,bytesTotal:M}=await lC(_,vtt),o=R;if(B<M)o=o.slice(o.indexOf(`\n`)+1);if(fme(o))t(\"rawTranscriptJsonl withheld from feedback draft submit: contains_3p_transcript_markers\");else f=wHe(o)}catch{}}else if(_!==null)try{let{content:R,bytesRead:B,bytesTotal:M}=await lC(_,vtt),o=R;if(B<M)o=o.slice(o.indexOf(`\n`)+1);if(!QOn(o,e))t(\"draft transcript withheld from feedback submit: identity_not_corroborated\");else{if(l=Y(o),Ett(l))l=[],t(\"draft transcript withheld from feedback submit: contains_3p_transcript_markers\");if(fme(o))t(\"rawTranscriptJsonl withheld from feedback draft submit: contains_3p_transcript_markers\");else f=wHe(o)}}catch{}}let g=Bze(e.request_ids).at(-1)??null,C={latestAssistantMessageId:g,latestAssistantAPIMessageId:null,lastInterruptedAssistantAPIMessageId:null,message_count:l.length,datetime:new Date().toISOString(),description:V(e,s),surface:u,platform:a.platform,gitRepo:!1,commitSha:null,version:e.cli_version,transcript:l,...f&&{rawTranscriptJsonl:f}},{payload:D,trim:d}=x(C),n=await nvt(D,b,void 0,w);if(n.success){try{await iXt(e.draft_id,h)}catch(_){t(`feedbackDrafts: post-submit draft delete failed: ${_ instanceof Error?_.name:\"unknown\"}`,{level:\"error\"}),i(\"tengu_feedback_draft_delete_failed\",{phase:S(\"post_submit\")})}if(p)aXt();if(s!==\"card_send_as_is\")Trt(e.draft_id);return i(\"tengu_feedback_draft_submitted\",{type:c(e.type),trigger:c(e.trigger),failure_mode:me(e.failure_mode),task_category:me(e.task_category),transcript_included:D.transcript.length>0||D.rawTranscriptJsonl?S(\"true\"):S(\"false\"),transcript_trimmed:d!==null?S(\"true\"):S(\"false\"),transcript_requested:r?S(\"true\"):S(\"false\"),transcript_available:e.transcriptAvailable?S(\"true\"):S(\"false\"),from_this_session:p?S(\"true\"):S(\"false\"),feedback_id:ye(n.feedbackId),last_request_id:ye(g)}),y(\"feedback_draft_submit\"),{success:!0,feedbackId:n.feedbackId}}if(m(\"feedback_draft_submit\",n.failureReason??\"network_error\",{from_this_session:p?S(\"true\"):S(\"false\")}),n.isZdrOrg)return{success:!1,error:\"Feedback collection is not available for organizations with custom data retention policies.\"};if(n.failureReason===\"auth_error\")return{success:!1,error:\"Couldn't send feedback: not signed in. Run /login, then retry.\"};if(n.payloadTooLarge)return{success:!1,error:N,payloadTooLarge:!0};if(n.failureReason===\"policy_blocked\")return{success:!1,error:Bne()??\"Feedback is disabled by your organization's policy.\"};return{success:!1,error:`Couldn't send feedback${n.statusCode?` (server returned ${n.statusCode})`:n.failureReason===\"timeout\"?\" (request timed out)\":\" (couldn't reach the service)\"}. The draft is still queued. Try again later.`}};\nreturn {H,K,O,x,W,V,Y,N,JGe};}",
  "chunk-djhbc0y7.js": "with(imports){\nfunction $uo(e){return e!==void 0&&bTt.includes(e)?e:void 0};\nfunction Uuo(e){return e!==void 0&&wTt.includes(e)?e:void 0};\nfunction Buo(e){return e!==void 0&&zt.includes(e)?e:void 0};\nfunction Trt(e){ta.feedbackNotice.setState((r)=>r.notice?.draftId===e?{...r,notice:null}:r)};\nreturn {$uo,Uuo,Buo,Trt};}",
  "chunk-xapeakym.js": "with(imports){\nfunction KA(e,r){if(r.status===\"needs-confirm\")return[];let n=Re({content:`<${dp}>/ultrareview${e?\" \"+zt(e):\"\"}</${dp}>`,isMeta:!0});if(r.status===\"launched\")return[n,Re({content:`<${id}>${zt(r.message)}</${id}>`,isMeta:!0})];let s=r.status===\"blocked\"&&r.actionUrl?`${r.message}\nMore: ${r.actionUrl}`:r.message;return[n,Re({content:`<${Xp}>Ultrareview did not launch: ${zt(s)}</${Xp}>`,isMeta:!0})]};\nreturn {KA};}"
};
const mappings={
  "chunk-tf63hv0k.js": {
    "Bne": {
      "source": {
        "file": "chunk-09m4fzsj.js",
        "name": "Bne"
      }
    },
    "He": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "He"
      }
    },
    "dIe": {
      "source": {
        "file": "chunk-nankzm0s.js",
        "name": "dIe"
      }
    },
    "qK": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "qK"
      }
    },
    "Qr": {
      "source": {
        "file": "chunk-bn3p37gv.js",
        "name": "Qr"
      }
    },
    "d": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "d"
      }
    },
    "m": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "m"
      }
    },
    "l": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "l"
      }
    },
    "cOr": {
      "module": {
        "file": "chunk-mphp7acd.js",
        "name": "cOr"
      }
    },
    "hdt": {
      "source": {
        "file": "chunk-mphp7acd.js",
        "name": "hdt"
      }
    },
    "Lee": {
      "source": {
        "file": "chunk-8axxcmrh.js",
        "name": "Lee"
      }
    },
    "wv": {
      "source": {
        "file": "chunk-mphp7acd.js",
        "name": "wv"
      }
    },
    "N3t": {
      "module": {
        "file": "chunk-bn3p37gv.js",
        "name": "N3t"
      }
    },
    "Lme": {
      "module": {
        "file": "chunk-vyeek978.js",
        "name": "Lme"
      }
    },
    "MEe": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "MEe"
      }
    },
    "p": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "p"
      }
    },
    "y": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "y"
      }
    },
    "au": {
      "source": {
        "file": "chunk-13899ncf.js",
        "name": "au"
      }
    },
    "Ft": {
      "source": {
        "file": "chunk-2ynta9xc.js",
        "name": "Ft"
      }
    },
    "Kx": {
      "source": {
        "file": "chunk-2ynta9xc.js",
        "name": "Kx",
        "owner": "getIsGit",
        "original": {
          "start": 54237,
          "end": 54340,
          "source": "function Kx(){let e=nn.of(rn()),n=q(),r=e.get(n);if(r!==void 0)return r;let o=Oo();return e.set(n,o),o}",
          "sha256": "a4347287f55b776d4bb2e830fffea21876d83a6212d6b0ab2873ce9f2fe477e3",
          "moduleSha256": "f3e239a22bc356ef2664a104850f816b164d4874821637ec72f203620c439e1d"
        }
      }
    },
    "Mbt": {
      "module": {
        "file": "chunk-2ynta9xc.js",
        "name": "Mbt"
      }
    },
    "t6r": {
      "module": {
        "file": "chunk-13899ncf.js",
        "name": "t6r"
      }
    },
    "t": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "t"
      }
    },
    "C5": {
      "source": {
        "file": "chunk-mphp7acd.js",
        "name": "C5"
      }
    },
    "pr": {
      "source": {
        "file": "chunk-2ynta9xc.js",
        "name": "pr"
      }
    },
    "Ee": {
      "source": {
        "file": "chunk-bn3p37gv.js",
        "name": "Ee"
      }
    },
    "a": {
      "source": {
        "file": "chunk-mbfze585.js",
        "name": "a"
      }
    },
    "lC": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "lC"
      }
    },
    "os": {
      "builtin": {
        "file": "path",
        "name": "dirname"
      }
    },
    "ns": {
      "builtin": {
        "file": "path",
        "name": "basename"
      }
    },
    "Bd": {
      "source": {
        "file": "chunk-13899ncf.js",
        "name": "Bd"
      }
    },
    "Xn": {
      "source": {
        "file": "chunk-2z86j2rq.js",
        "name": "Xn"
      }
    },
    "De": {
      "source": {
        "file": "chunk-2z86j2rq.js",
        "name": "De"
      }
    },
    "Mm": {
      "source": {
        "file": "chunk-2ynta9xc.js",
        "name": "Mm"
      }
    },
    "Sr": {
      "builtin": {
        "file": "fs/promises",
        "name": "readdir"
      }
    },
    "Tr": {
      "builtin": {
        "file": "path",
        "name": "join"
      }
    },
    "kr": {
      "builtin": {
        "file": "fs/promises",
        "name": "stat"
      }
    },
    "ui": {
      "source": {
        "file": "chunk-rjzag4e0.js",
        "name": "ui"
      }
    },
    "Yp": {
      "source": {
        "file": "chunk-rjzag4e0.js",
        "name": "Yp"
      }
    },
    "zo": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "zo"
      }
    },
    "N": {
      "source": {
        "file": "chunk-hrhfcbdv.js",
        "name": "N"
      }
    },
    "_": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "_"
      }
    },
    "_Y": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "_Y"
      }
    },
    "Nfe": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "Nfe"
      }
    },
    "ks": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "ks"
      }
    },
    "Y": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "Y"
      }
    },
    "Zse": {
      "source": {
        "file": "chunk-amhtwhch.js",
        "name": "Zse"
      }
    },
    "Bqt": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "Bqt"
      }
    },
    "vQr": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "vQr"
      }
    },
    "gt": {
      "source": {
        "file": "chunk-1cedw4af.js",
        "name": "gt"
      }
    },
    "Cr": {
      "builtin": {
        "file": "crypto",
        "name": "randomBytes"
      }
    },
    "Cs": {
      "builtin": {
        "file": "path",
        "name": "join"
      }
    },
    "we": {
      "source": {
        "file": "chunk-brnn4zwp.js",
        "name": "we"
      }
    },
    "vr": {
      "builtin": {
        "file": "fs/promises",
        "name": "mkdir"
      }
    },
    "Ir": {
      "builtin": {
        "file": "fs",
        "name": "createWriteStream"
      }
    },
    "c$": {
      "source": {
        "file": "chunk-31g8tfvj.js",
        "name": "c$"
      }
    },
    "Fr": {
      "builtin": {
        "file": "fs/promises",
        "name": "unlink"
      }
    },
    "xr": {
      "builtin": {
        "file": "fs/promises",
        "name": "rm"
      }
    },
    "i": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "i"
      }
    },
    "c": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "c"
      }
    },
    "S": {
      "source": {
        "file": "chunk-n4qghq20.js",
        "name": "S"
      }
    },
    "Er": {
      "source": {
        "file": "chunk-n4qghq20.js",
        "name": "Er"
      }
    },
    "ye": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "ye"
      }
    },
    "O_t": {
      "source": {
        "file": "chunk-nankzm0s.js",
        "name": "O_t"
      }
    },
    "kW": {
      "source": {
        "file": "chunk-n4qghq20.js",
        "name": "kW"
      }
    },
    "dEe": {
      "source": {
        "file": "chunk-t6xmn86v.js",
        "name": "dEe"
      }
    },
    "At": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "At"
      }
    },
    "on": {
      "source": {
        "file": "chunk-tf63hv0k.js",
        "name": "on"
      }
    },
    "E_": {
      "source": {
        "file": "chunk-nankzm0s.js",
        "name": "E_"
      }
    },
    "Gt": {
      "source": {
        "file": "chunk-nankzm0s.js",
        "name": "Gt"
      }
    },
    "Na": {
      "source": {
        "file": "chunk-e6m248dn.js",
        "name": "Na"
      }
    },
    "gd": {
      "source": {
        "file": "chunk-e6m248dn.js",
        "name": "gd"
      }
    },
    "Pu": {
      "source": {
        "file": "chunk-c9me9cp7.js",
        "name": "Pu"
      }
    },
    "loadExplicitDependency287": {
      "dynamic": true
    }
  },
  "chunk-2ynta9xc.js": {
    "tTn": {
      "source": {
        "file": "chunk-2ynta9xc.js",
        "name": "tTn"
      }
    }
  },
  "chunk-13899ncf.js": {},
  "chunk-mphp7acd.js": {
    "ZUe": {
      "source": {
        "file": "chunk-13899ncf.js",
        "name": "ZUe"
      }
    },
    "F": {
      "source": {
        "file": "chunk-mphp7acd.js",
        "name": "F"
      }
    },
    "FEe": {
      "source": {
        "file": "chunk-mphp7acd.js",
        "name": "FEe"
      }
    },
    "Ene": {
      "source": {
        "file": "chunk-mphp7acd.js",
        "name": "Ene"
      }
    },
    "yo": {
      "source": {
        "file": "chunk-mphp7acd.js",
        "name": "yo"
      }
    }
  },
  "chunk-bn3p37gv.js": {
    "n": {
      "source": {
        "file": "chunk-bn3p37gv.js",
        "name": "n"
      }
    }
  },
  "chunk-vyeek978.js": {},
  "chunk-h4hpfzhs.js": {},
  "chunk-gf9kpcg4.js": {
    "OB": {
      "source": {
        "file": "chunk-099w45zp.js",
        "name": "OB"
      }
    },
    "qee": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "qee"
      }
    },
    "sXt": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "sXt"
      }
    },
    "JGe": {
      "module": {
        "file": "chunk-spmb4s4c.js",
        "name": "JGe"
      }
    }
  },
  "chunk-spmb4s4c.js": {
    "q": {
      "source": {
        "file": "chunk-bn3p37gv.js",
        "name": "q"
      }
    },
    "Zfr": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "Zfr"
      }
    },
    "wv": {
      "source": {
        "file": "chunk-mphp7acd.js",
        "name": "wv"
      }
    },
    "Lee": {
      "source": {
        "file": "chunk-8axxcmrh.js",
        "name": "Lee"
      }
    },
    "lC": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "lC"
      }
    },
    "vtt": {
      "module": {
        "file": "chunk-tf63hv0k.js",
        "name": "vtt"
      }
    },
    "fme": {
      "module": {
        "file": "chunk-tf63hv0k.js",
        "name": "fme"
      }
    },
    "t": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "t"
      }
    },
    "wHe": {
      "module": {
        "file": "chunk-tf63hv0k.js",
        "name": "wHe"
      }
    },
    "QOn": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "QOn"
      }
    },
    "Ett": {
      "module": {
        "file": "chunk-tf63hv0k.js",
        "name": "Ett"
      }
    },
    "Bze": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "Bze"
      }
    },
    "a": {
      "source": {
        "file": "chunk-mbfze585.js",
        "name": "a"
      }
    },
    "nvt": {
      "module": {
        "file": "chunk-tf63hv0k.js",
        "name": "nvt"
      }
    },
    "iXt": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "iXt"
      }
    },
    "i": {
      "source": {
        "file": "chunk-6hnyhakg.js",
        "name": "i"
      }
    },
    "S": {
      "source": {
        "file": "chunk-n4qghq20.js",
        "name": "S"
      }
    },
    "aXt": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "aXt"
      }
    },
    "Trt": {
      "module": {
        "file": "chunk-djhbc0y7.js",
        "name": "Trt"
      }
    },
    "c": {
      "source": {
        "file": "chunk-n4qghq20.js",
        "name": "c"
      }
    },
    "me": {
      "source": {
        "file": "chunk-n4qghq20.js",
        "name": "me"
      }
    },
    "ye": {
      "source": {
        "file": "chunk-t20x5mnd.js",
        "name": "ye"
      }
    },
    "y": {
      "source": {
        "file": "chunk-9d2ykxmy.js",
        "name": "y"
      }
    },
    "m": {
      "source": {
        "file": "chunk-9d2ykxmy.js",
        "name": "m"
      }
    },
    "Bne": {
      "source": {
        "file": "chunk-09m4fzsj.js",
        "name": "Bne"
      }
    },
    "ng": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "ng"
      }
    },
    "zo": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "zo"
      }
    },
    "XOn": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "XOn"
      }
    },
    "$uo": {
      "module": {
        "file": "chunk-djhbc0y7.js",
        "name": "$uo"
      }
    },
    "Uuo": {
      "module": {
        "file": "chunk-djhbc0y7.js",
        "name": "Uuo"
      }
    },
    "JOn": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "JOn"
      }
    },
    "Buo": {
      "module": {
        "file": "chunk-djhbc0y7.js",
        "name": "Buo"
      }
    },
    "Vee": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "Vee"
      }
    },
    "STt": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "STt"
      }
    },
    "KOn": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "KOn"
      }
    },
    "YOn": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "YOn"
      }
    },
    "ige": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "ige"
      }
    },
    "VOn": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "VOn"
      }
    },
    "qOn": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "qOn"
      }
    },
    "I": {
      "source": {
        "file": "chunk-eske5nfz.js",
        "name": "I"
      }
    },
    "exn": {
      "module": {
        "file": "chunk-tf63hv0k.js",
        "name": "exn"
      }
    },
    "mme": {
      "module": {
        "file": "chunk-tf63hv0k.js",
        "name": "mme"
      }
    },
    "nxn": {
      "module": {
        "file": "chunk-tf63hv0k.js",
        "name": "nxn"
      }
    },
    "ia": {
      "source": {
        "file": "chunk-q80zaav8.js",
        "name": "ia"
      }
    }
  },
  "chunk-djhbc0y7.js": {
    "bTt": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "bTt"
      }
    },
    "wTt": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "wTt"
      }
    },
    "zt": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "zt"
      }
    },
    "ta": {
      "source": {
        "file": "chunk-djhbc0y7.js",
        "name": "ta"
      }
    }
  },
  "chunk-xapeakym.js": {
    "Re": {
      "source": {
        "file": "chunk-mphp7acd.js",
        "name": "Re"
      }
    },
    "dp": {
      "source": {
        "file": "chunk-amhtwhch.js",
        "name": "dp"
      }
    },
    "zt": {
      "source": {
        "file": "chunk-sx3wq5qp.js",
        "name": "zt"
      }
    },
    "id": {
      "source": {
        "file": "chunk-xapeakym.js",
        "name": "id"
      }
    },
    "Xp": {
      "source": {
        "file": "chunk-xapeakym.js",
        "name": "Xp"
      }
    }
  }
};
export function createPrintExplicitHelpers287(readSource){
 const instances=new Map();
 function module(file){
  if(instances.has(file))return instances.get(file);
  const bindings=mappings[file];
  const values=new Proxy({}, {has:(_target,name)=>typeof name==='string'&&Object.hasOwn(bindings,name),get:(_target,name)=>{
   if(typeof name!=='string'||!Object.hasOwn(bindings,name))return undefined;
   const b=bindings[name];
   if(b.dynamic)return async(specifier)=>{if(specifier!=='/$bunfs/root/chunk-h4hpfzhs.js')throw Error('Unexpected feedback compression dependency '+specifier);const zip=module('chunk-h4hpfzhs.js');return {Zip:zip.tn,ZipDeflate:zip.nn};};
   if(b.source)return readSource(b.source.file,b.source.name);
   if(b.builtin)return b.builtin.name==='*'?builtinModules[b.builtin.file]:builtinModules[b.builtin.file][b.builtin.name];
   return module(b.module.file)[b.module.name];
  }});
  const result=new Function('imports',factoryBodies[file])(values);instances.set(file,result);return result;
 }
 return {source:(file,name)=>{const value=module(file);if(!Object.hasOwn(value,name))throw Error('Recovered helper not selected '+file+':'+name);return value[name];}};
}
