// Generated from complete official npm 2.1.286 declarations. Do not edit by hand.
// @ts-nocheck
export interface OfficialPolicyCredentialSources286Ports {
  readonly a: unknown
  readonly ae: unknown
  readonly d: unknown
  readonly d0: unknown
  readonly F: unknown
  readonly ft: unknown
  readonly FYr: unknown
  readonly G: unknown
  readonly GG: unknown
  readonly j: unknown
  readonly kr: unknown
  readonly Me: unknown
  readonly ng: unknown
  readonly Oe: unknown
  readonly q: unknown
  readonly Ro: unknown
  readonly vs: unknown
  readonly Xt: unknown
  readonly za: unknown
  readonly zn: unknown
}

export const OFFICIAL_POLICY_CREDENTIAL_SOURCES_286_PORTS = [
  {
    "local": "a",
    "imported": "a",
    "module": "/$bunfs/root/chunk-07mxqtdh.js"
  },
  {
    "local": "ae",
    "imported": "ae",
    "module": "/$bunfs/root/chunk-yx145v00.js"
  },
  {
    "local": "d",
    "imported": "d",
    "module": "/$bunfs/root/chunk-j72sz16r.js"
  },
  {
    "local": "d0",
    "imported": "d0",
    "module": "/$bunfs/root/chunk-f09yefd8.js"
  },
  {
    "local": "F",
    "imported": "F",
    "module": "/$bunfs/root/chunk-r65ydf8e.js"
  },
  {
    "local": "ft",
    "imported": "ft",
    "module": "/$bunfs/root/chunk-h2b16ggw.js"
  },
  {
    "local": "FYr",
    "imported": "FYr",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "G",
    "imported": "G",
    "module": "/$bunfs/root/chunk-h730kz80.js"
  },
  {
    "local": "GG",
    "imported": "GG",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "j",
    "imported": "j",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "kr",
    "imported": "kr",
    "module": "/$bunfs/root/chunk-gxp5am6q.js"
  },
  {
    "local": "Me",
    "imported": "Me",
    "module": "/$bunfs/root/chunk-ktw7xkh2.js"
  },
  {
    "local": "ng",
    "imported": "ng",
    "module": "/$bunfs/root/chunk-9arbnkf9.js"
  },
  {
    "local": "Oe",
    "imported": "Oe",
    "module": "/$bunfs/root/chunk-86t591ay.js"
  },
  {
    "local": "q",
    "imported": "q",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "Ro",
    "imported": "Ro",
    "module": "/$bunfs/root/chunk-h2b16ggw.js"
  },
  {
    "local": "vs",
    "imported": "vs",
    "module": "/$bunfs/root/chunk-ar1aj28g.js"
  },
  {
    "local": "Xt",
    "imported": "Xt",
    "module": "/$bunfs/root/chunk-v6yfpapk.js"
  },
  {
    "local": "za",
    "imported": "za",
    "module": "/$bunfs/root/chunk-07mxqtdh.js"
  },
  {
    "local": "zn",
    "imported": "zn",
    "module": "/$bunfs/root/chunk-x5pmvzy7.js"
  }
] as const

export function createOfficialPolicyCredentialSources286(ports: OfficialPolicyCredentialSources286Ports) {
  const missing = ["a", "ae", "d", "d0", "F", "ft", "FYr", "G", "GG", "j", "kr", "Me", "ng", "Oe", "q", "Ro", "vs", "Xt", "za", "zn"].filter(name => !Object.prototype.hasOwnProperty.call(ports, name))
  if (missing.length) throw new TypeError(`Missing official policy credential-source ports: ${missing.join(', ')}`)
  const { a, ae, d, d0, F, ft, FYr, G, GG, j, kr, Me, ng, Oe, q, Ro, vs, Xt, za, zn } = ports as any
  class xc{cache={config:null,mtime:0};lastReadFileStats=null;installed=Me();cacheHits=0;cacheMisses=0;readingAllowed=!1;enableError=null;enableSettled=!1;enablePromise=null;reloadThroughStorageOwed=!1;reloadThroughStoragePromise=null;writeQueues=ng();pendingWriteCounts=new Map;pendingExternalRefresh=null;freshnessWatcherStarted=!1;freshnessBackend=void 0;freshnessSubscription=void 0;fileWatchFallback=!0;unhandedWritesInMemory=!1;loadedVersion=void 0;landedWriteCount=0;freshnessResubscribed=!1;insideParseErrorTelemetry=!1;parseErrorLoggedFor=new Set;lastGetConfigOutcome="parsed";trustAccepted=!1;localSettingsGitTracked=void 0;projectPathForConfig=null;generatedUserID=null;generatedMachineID=null;generatedSummonSidKey=null;remoteControlMachineIdOnce=null;gracefulExitStampedProjects=new Set;bootPhaseOpen=!0;bootAnchorMs;bootPhaseSignalForTesting=void 0;clientDataCacheKeyGetter=null;clientDataWindowSeed=null;clientDataReadGate=null;clientDataStrictReadGate=null;clientDataStaleMatchGetter=null;clientDataOverride=null;useRealPipelineUnderTest=!1;testGlobalConfig;testProjectConfig;now;constructor({now:e,testGlobalConfig:n,testProjectConfig:r}){this.now=e,this.bootAnchorMs=e(),this.testGlobalConfig=n,this.testProjectConfig=r}readCache(){if(this.cache.config)this.cacheHits++;else this.cacheMisses++;return this.cache.config}installDiskRead(e,n){this.cache={config:e,mtime:n?.mtimeMs??this.now()},this.lastReadFileStats=n?{mtime:n.mtimeMs,size:n.size}:null,this.installed.emit()}applyOptimistic(e){this.cache={config:e,mtime:this.now()}}writeThrough(e){this.cache={config:e,mtime:this.now()},this.lastReadFileStats=null,this.landedWriteCount++,this.installed.emit()}get writeGeneration(){return this.landedWriteCount}advanceFreshnessCursor(){this.cache={config:this.cache.config,mtime:this.now()},this.lastReadFileStats=null,this.landedWriteCount++}clearCache(){this.cache={config:null,mtime:0}}setLastReadFileStats(e){this.lastReadFileStats=e}takeCacheStats(){let e={hits:this.cacheHits,misses:this.cacheMisses};return this.cacheHits=0,this.cacheMisses=0,e}allowReading(){this.readingAllowed=!0}enable(e){if(this.enableSettled){if(this.enableError!==null)return Promise.reject(this.enableError);return Promise.resolve()}if(!this.enablePromise)this.enablePromise=e();return this.enablePromise}recordEnableError(e){this.enableError=e}markEnableSettled(){this.enableSettled=!0}oweReloadThroughStorage(){this.reloadThroughStorageOwed=!0}reloadThroughStorageOnce(e){if(this.reloadThroughStorageOwed)this.reloadThroughStorageOwed=!1,this.reloadThroughStoragePromise=e();return this.reloadThroughStoragePromise??Promise.resolve()}resetEnableGate(){this.readingAllowed=!1,this.enableError=null,this.enableSettled=!1,this.enablePromise=null,this.reloadThroughStorageOwed=!1,this.reloadThroughStoragePromise=null,this.fileWatchFallback=!0,this.unhandedWritesInMemory=!1}beginPendingWrite(e){this.pendingWriteCounts.set(e,this.pendingWriteCount(e)+1)}endPendingWrite(e){let n=(this.pendingWriteCounts.get(e)??1)-1;if(n>0)this.pendingWriteCounts.set(e,n);else this.pendingWriteCounts.delete(e);return n}pendingWriteCount(e){return this.pendingWriteCounts.get(e)??0}deferExternalRefresh(e){this.pendingExternalRefresh=e}takePendingExternalRefresh(){let e=this.pendingExternalRefresh;return this.pendingExternalRefresh=null,e}setFreshnessWatcherStarted(e){this.freshnessWatcherStarted=e}setFreshnessBackend(e){this.freshnessBackend=e,this.freshnessResubscribed=!1}setFreshnessSubscription(e){this.freshnessSubscription=e}setFileWatchFallback(e){this.fileWatchFallback=e}setUnhandedWritesInMemory(e){this.unhandedWritesInMemory=e}setLoadedVersion(e){this.loadedVersion=e}claimFreshnessResubscribe(){if(this.freshnessResubscribed)return!1;return this.freshnessResubscribed=!0,!0}setLastGetConfigOutcome(e){this.lastGetConfigOutcome=e}claimParseErrorLog(e){if(this.parseErrorLoggedFor.has(e))return!1;return this.parseErrorLoggedFor.add(e),!0}setInsideParseErrorTelemetry(e){this.insideParseErrorTelemetry=e}clearParseErrorDedup(){this.parseErrorLoggedFor.clear()}closeBootPhase(){this.bootPhaseOpen=!1}bootPhaseStillOpen(e){if(!this.bootPhaseOpen)return!1;if(this.now()-this.bootAnchorMs>=e)return this.bootPhaseOpen=!1,!1;return!0}setTrustAccepted(e){this.trustAccepted=e}setLocalSettingsGitTracked(e){this.localSettingsGitTracked=e}setProjectPathForConfig(e){this.projectPathForConfig=e}setGeneratedUserID(e){this.generatedUserID=e}setGeneratedMachineID(e){this.generatedMachineID=e}clearGeneratedMachineID(){this.generatedMachineID=null}clearGeneratedSummonSidKey(){this.generatedSummonSidKey=null}setGeneratedSummonSidKey(e){this.generatedSummonSidKey=e}remoteControlMachineIdOnceFrom(e){return this.remoteControlMachineIdOnce??=e(),this.remoteControlMachineIdOnce}clearRemoteControlMachineIdOnce(){this.remoteControlMachineIdOnce=null}setClientDataCacheKeyGetter(e){this.clientDataCacheKeyGetter=e}setClientDataWindowSeed(e){this.clientDataWindowSeed=e}setClientDataReadGate(e){this.clientDataReadGate=e}setClientDataStrictReadGate(e){this.clientDataStrictReadGate=e}setClientDataStaleMatchGetter(e){this.clientDataStaleMatchGetter=e}setClientDataOverride(e){this.clientDataOverride=e}setUseRealPipelineUnderTest(e){this.useRealPipelineUnderTest=e}overwriteTestGlobalConfig(e){Object.assign(this.testGlobalConfig,e)}overwriteTestProjectConfig(e){Object.assign(this.testProjectConfig,e)}deleteTestProjectConfigFields(e){for(let n of e)delete this.testProjectConfig[n]}}
  var Cre={allowedTools:[],mcpContextUris:[],mcpServers:{},enabledMcpjsonServers:[],disabledMcpjsonServers:[],hasTrustDialogAccepted:!1,hasClaudeMdExternalIncludesApproved:!1,hasClaudeMdExternalIncludesWarningShown:!1};
  function Ye(){return{numStartups:0,installMethod:void 0,autoUpdates:void 0,theme:"dark",preferredNotifChannel:"auto",verbose:!1,editorMode:"normal",autoCompactEnabled:!0,autoScrollEnabled:!0,showTurnDuration:!0,externalEditorContext:!1,showMessageTimestamps:!1,hasSeenTasksHint:!1,hasUsedStash:!1,hasUsedBackgroundTask:!1,queuedCommandUpHintCount:0,diffTool:"auto",customApiKeyResponses:{approved:[],rejected:[]},env:{},tipsHistory:{},memoryUsageCount:0,promptQueueUseCount:0,btwUseCount:0,todoFeatureEnabled:!0,showExpandedTodos:!1,briefTranscript:!1,messageIdleNotifThresholdMs:60000,autoConnectIde:!1,autoInstallIdeExtension:!0,fileCheckpointingEnabled:!0,terminalProgressBarEnabled:!0,cachedDynamicConfigs:{},cachedGrowthBookFeatures:{},respectGitignore:!0,copyFullResponse:!1}}
  var DR=Ye(),JYo=new q(()=>new xc({now:Date.now,testGlobalConfig:{...DR,autoUpdates:!1},testProjectConfig:{...Cre}}));
  function oe(){return vs(JYo)}
  function dn(){return!1}
  async function Cb(e){try{return await nXo(e)}catch{return}}
  async function nXo(e){let n=await BYn(e);if(typeof n!=="object"||n===null||!("oauthAccount"in n))return;let r=n.oauthAccount;if(r===null||typeof r!=="object")return;return{accountUuid:"accountUuid"in r&&typeof r.accountUuid==="string"?r.accountUuid:void 0,organizationUuid:"organizationUuid"in r&&typeof r.organizationUuid==="string"?r.organizationUuid:void 0}}
  async function BYn(e){if(dn())return oe().testGlobalConfig;let n;if(F()&&e!==void 0){let s=await e.readText([Oe.globalConfig()]);if(!s.ok)throw Error("global config not readable through storage");let g=s.value.items[0];if(!g?.found)return;n=g.value}else try{n=await ae().readFile(za(),{encoding:"utf-8"})}catch(s){if(G(s))return;throw s}let r=ft(Ro(n),!1);if(r===null)throw Error("global config not parseable");return r}
  function cc(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
  function r9(){if(!kr())return!1;return!0}
  function lk(e=["user:inference"]){return Fk()??[...e]}
  function Fk(){let e=a.CLAUDE_CODE_OAUTH_SCOPES?.split(/\s+/).filter(Boolean);return e?.length?e:void 0}
  var jH=["user:inference","user:ccr_inference","user:file_upload"];
  function zH(){if(a.CLAUDE_CODE_OAUTH_TOKEN)return{accessToken:a.CLAUDE_CODE_OAUTH_TOKEN,refreshToken:null,expiresAt:null,scopes:lk(),subscriptionType:a.CLAUDE_CODE_SUBSCRIPTION_TYPE||null,rateLimitTier:a.CLAUDE_CODE_RATE_LIMIT_TIER||null};let e=d0(),n=(r)=>({accessToken:r,refreshToken:null,expiresAt:null,scopes:FYr()??lk(jH),subscriptionType:a.CLAUDE_CODE_SUBSCRIPTION_TYPE||null,rateLimitTier:a.CLAUDE_CODE_RATE_LIMIT_TIER||null});if(e&&(!GG()||cc()))return n(e);if(cc())return null;try{let g=zn().read({fromStoreCopy:!0})?.claudeAiOauth;if(g?.accessToken)return g}catch(r){d(r)}if(e)return n(e);return null}
  class Lk{value=void 0;promise=null;lastCredentialsMtimeMs=0;lastCredentialsVersion=void 0;lastKeychainAccessToken=null;lastUnusableTokenRecheckAt=0;lastOwnSavedAccessToken=null;credentialsChangedOnDisk=Me();pending401Handlers=new Map;pendingRefreshChecks={bare:null,store:null,backend:null};pendingOptedInRefreshChecks={bare:null,store:null,backend:null};clear(){this.value=void 0,this.promise=null}resetChangeCheck(){this.lastCredentialsMtimeMs=0,this.lastCredentialsVersion=void 0,this.lastKeychainAccessToken=null,this.lastUnusableTokenRecheckAt=0,this.lastOwnSavedAccessToken=null}}
  var Jde=new q(()=>new Lk);
  function pn(){if(r9())return null;let e=Jde.of(j().host);if(e.value!==void 0)return e.value;let n=zH();return e.value=n,n}
  async function Hg(e){let n=Uk();if(typeof n==="string")return n;let r=(await zn().readAsync(e))?.claudeAiOauth?.accessToken;return Bk(n,r)}
  function Uk(){let e=pn();if(!e?.accessToken)return"none";if(a.CLAUDE_CODE_OAUTH_TOKEN)return"env";let n=d0();if(n&&(!GG()||cc()))return"fd";return{bearer:e.accessToken,fdToken:n}}
  function Bk({bearer:e,fdToken:n},r){if(r&&r===e)return"store";if(n&&e===n)return"fd";return"none"}
  async function mWr(e){let n=await Cb(e);return Xt(n?.organizationUuid)??null}
  return { Hg, mWr }
}
