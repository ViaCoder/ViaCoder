import {extname as le} from 'node:path';
import {logError as d} from '../../utils/log.js';
import {logForDebugging as t} from '../../utils/debug.js';
import {logEvent} from '../../services/analytics/index.js';
import {zNr,CDo,apn,ATe,P5e} from './tables.js';
function p(feature_name,error_code){logEvent('tengu_feature_sad',{feature_name,error_code});}
function r(n){return n}
function y(n){return r(n)}
function Sn(n){return r(n)}
var re=/^[a-z0-9][a-z0-9_+#.-]{0,63}$/;
var ie=16;
function se(e){return e.default??e}
class Y{hljs=null;loaded=new Set;failed=new Set;runtimeDepsEnsured=new WeakSet;pluginLanguages=new Map;pluginAliases=new Set;generation=0;core(e){if(this.hljs)return this.hljs;let n=e.loadCore();for(let[r,i]of Object.entries(zNr))if(!n.getLanguage(r))n.registerLanguage(r,i);for(let[r,i]of this.pluginLanguages)if(!n.getLanguage(r))this.registerResolvedPluginLanguage(n,r,i,{emitSadTelemetry:!0});return this.hljs=n,n}ensureLanguage(e,n){let r=this.core(n),i=e.toLowerCase(),o=n.resolveId(i);if(o!==null){if(this.failed.has(o))return null;if(!this.loaded.has(o)){let l=n.loaders[o];if(typeof l!=="function")return null;try{r.registerLanguage(o,se(l()))}catch(a){return this.failed.add(o),d(a),null}this.loaded.add(o);for(let a of n.subLanguageDeps[o]??[])this.ensureLanguage(a,n)}return o}let s=r.getLanguage(i);if(!s)return null;if(!this.runtimeDepsEnsured.has(s)){this.runtimeDepsEnsured.add(s);for(let l of oe(s))if(l!==i)this.ensureLanguage(l,n)}return i}get pluginGrammarGeneration(){return this.generation}clearPluginLanguages(){if(this.generation++,this.hljs)for(let e of this.pluginLanguages.keys())this.hljs.unregisterLanguage(e);this.pluginLanguages.clear(),this.pluginAliases.clear()}isReservedLanguageId(e){return Object.prototype.hasOwnProperty.call(ATe,e)||Object.prototype.hasOwnProperty.call(P5e,e)||Object.prototype.hasOwnProperty.call(zNr,e)||CDo.has(e)||this.pluginLanguages.has(e)||this.pluginAliases.has(e)}isPluginLanguageId(e){return this.pluginLanguages.has(e)||this.pluginAliases.has(e)}addPluginLanguage(e,n,r){if(this.isReservedLanguageId(e))return!1;let i=r.map((s)=>s.toLowerCase()).filter((s)=>re.test(s)&&s!==e&&!this.isReservedLanguageId(s)).slice(0,ie),o=(s)=>{let l=n(s);return l.name=e,l.aliases=i,l.disableAutodetect=!0,l};this.pluginLanguages.set(e,o);for(let s of i)this.pluginAliases.add(s);if(this.hljs&&!this.hljs.getLanguage(e))return this.registerResolvedPluginLanguage(this.hljs,e,o,{emitSadTelemetry:!1});return!0}registerResolvedPluginLanguage(e,n,r,{emitSadTelemetry:i}){try{let o=r(e);return e.registerLanguage(n,()=>o),e.highlight("",{language:n,ignoreIllegals:!0}),!0}catch(o){if(this.pluginLanguages.delete(n),e.getLanguage(n))e.unregisterLanguage(n);if(i)p("plugin_hljs_languages","resolve_failed");return t(`plugin hljs grammar '${n}' failed to resolve at registration: ${o instanceof Error?o.message:String(o)}`,{level:"error"}),!1}}}
function oe(e){let n=new Set,r=new Set;function i(o){if(o===null||typeof o!=="object"||r.has(o))return;r.add(o);let s=o;for(let l of[s.subLanguage??[]].flat())if(typeof l==="string")n.add(l);for(let l of s.contains??[])i(l);i(s.starts);for(let l of s.variants??[])i(l)}return i(e),n}
var Fve=new Y;
function bCr(e){let n=e.toLowerCase();return Object.prototype.hasOwnProperty.call(ATe,n)?n:Object.prototype.hasOwnProperty.call(P5e,n)?P5e[n]??null:null}
async function JVe(e){let n=le(e).slice(1);if(!n)return y("unknown");let r=n.toLowerCase(),i=bCr(r);if(i!==null)return Z(ATe[i]);if(Fve.isPluginLanguageId(r))return y("plugin");return Z(Object.prototype.hasOwnProperty.call(apn,r)?apn[r]:void 0)}
function Z(e){return e===void 0?y("unknown"):Sn(e)}
export {Fve,bCr,JVe};
