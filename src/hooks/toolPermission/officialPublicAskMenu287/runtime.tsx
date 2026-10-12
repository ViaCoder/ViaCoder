import * as React from 'react'
import * as compiler from 'react/compiler-runtime'
import {jsx,jsxs} from 'react/jsx-runtime'
import figures from 'figures'
import {Ansi,Box,Text,Link,useTerminalFocus} from '../../../ink.js'
import {useTerminalSize} from '../../useTerminalSize.js'
import {useSettings} from '../../useSettings.js'
import {useMainLoopModel} from '../../useMainLoopModel.js'
import {useAppState,useSetAppState} from '../../../state/AppState.js'
import {useTheme} from '../../../components/design-system/ThemeProvider.js'
import {useScreenReader,ScreenReaderContext} from '../../../ink/components/ScreenReaderContext.js'
import {useInterval} from '../../../ink/hooks/use-interval.js'
import {useRegisterOverlay} from '../../../context/overlayContext.js'
import {useUsageInputTimeout287,usageInputGuards287} from '../../../ink/usageInputBindings287.js'
import {getExecutionSession287,executionSessionRegistryConstructor287} from '../../../services/context/execution287.js'
import {getExternalEditor} from '../../../utils/editor.js'
import {toIDEDisplayName} from '../../../utils/ide.js'
import {editPromptInEditor} from '../../../utils/promptEditor.js'
import {getPlanFilePath} from '../../../utils/plans.js'
import {getCliHighlightPromise} from '../../../utils/cliHighlight.js'
import {applyMarkdown} from '../../../utils/markdown.js'
import {stringWidth} from '../../../ink/stringWidth.js'
import {getPlatform} from '../../../utils/platform.js'
import {getGraphemeSegmenter} from '../../../utils/intl.js'
import {count} from '../../../utils/array.js'
import {maybeResizeAndDownsampleImageBlock} from '../../../utils/imageResizer.js'
import {cacheImagePath,storeImage,updateStoredImagePaths287} from '../../../utils/imageStore.js'
import type {PastedContent} from '../../../utils/config.js'
import {Select,SelectMulti} from '../../../components/CustomSelect/index.js'
import TextInput from '../../../components/TextInput.js'
import {FilePathLink} from '../../../components/FilePathLink.js'
import {getSettingsForSource} from '../../../utils/settings/settings.js'
import {getNativeAPIProvider287} from '../../../utils/model/providerSelectionBindings287.js'
import {getCatalogEntry} from '../../../utils/model/catalog.js'
import {getCanonicalName} from '../../../utils/model/model.js'
import {isClaudeAISubscriber} from '../../../utils/auth.js'
import {checkStatsigFeatureGate_CACHED_MAY_BE_STALE} from '../../../services/analytics/growthbook.js'
import {authEnvironment} from '../../../utils/authEnvironment.js'
import {logError} from '../../../utils/log.js'
import {logEvent} from '../../../services/analytics/index.js'
import {modsRegistryOwner287} from '../../../utils/plugins/modsRegistryOwner287.js'
import {permissionDescriptors287} from '../officialPermissionDescriptors287/runtime.js'
import {permissionNotice287} from '../OfficialPermissionNotice287.js'
import {filePermissionMenu287} from '../officialFilePermissionMenu287/runtime.js'
import * as native from './native.js'
import proof from './provenance.json' with {type:'json'}
import type {Store} from '../../../state/store.js'
import type {PermissionRequestProps} from '../../../components/permissions/PermissionRequest.js'
const unavailable=(name:string)=>(..._args:unknown[]):never=>{throw Error('Source Ask capability not connected: '+name)}
const constants=native.createPublicAskImageConstants287({}),limits=native.createPublicAskImageLimits287({...constants,He:getNativeAPIProvider287,Js:isClaudeAISubscriber,k:checkStatsigFeatureGate_CACHED_MAY_BE_STALE,Be:getCanonicalName,xa:getCatalogEntry}),scan=native.createPublicAskPasteScan287({});
// Original mbn/B7e slot is keyed on the existing execution session, not a UI
// counter; its carriers are released by original xge's effect cleanup.
const paste=native.createPublicAskPaste287({...scan,Tt:executionSessionRegistryConstructor287,U:getExecutionSession287});
const imageStore=native.createPublicAskImageStore287({X:cacheImagePath,J:storeImage}),background=native.createPublicAskBackground287({a:authEnvironment});
const preferences=native.createPublicAskPreferences287({ge:getSettingsForSource}),presence=native.createPublicAskPresenceConstants287({}),strings=native.createPublicAskStrings287({});
const wrapped=native.createPublicAskWrap287({_a:getGraphemeSegmenter}),tabs=native.createPublicAskTabs287({...wrapped,ie:stringWidth,_a:getGraphemeSegmenter}),truncated=native.createPublicAskTruncate287({...tabs,ie:stringWidth}),identity=native.createPublicAskIdentity287({}),label=native.createPublicAskPluginLabel287({...tabs,...strings,...wrapped,...identity,ie:stringWidth,re:permissionDescriptors287.display.re}),notice=native.createPublicAskNotice287({...label,Ks:permissionDescriptors287.display.Ks,Ti:permissionDescriptors287.Ti}),statusConstants=native.createPublicAskStatusConstants287({O:getPlatform}),answerConstants=native.createPublicAskAnswerConstants287({});
const base:Record<string,unknown>={w:(compiler as unknown as {c(size:number):unknown[]}).c,b:Symbol.for('react.memo_cache_sentinel'),e:jsx,r:jsxs,s:Box,n:Text,g:React.useState,A:React.useRef,R:React.useEffect,ao:React.useEffectEvent,J:figures,po:Ansi,ve:useTerminalSize,ie:stringWidth,Ze:useScreenReader};
const divider=native.createPublicAskDivider287({...base,Jj:'\u2500',...native.createPublicAskAccessible287({ke:React.useContext,G0n:ScreenReaderContext})}),title=native.createPublicAskTitle287({...base,moe:label.moe}),bullet=native.createPublicAskBullet287(base),badge=native.createPublicAskBadge287(base),icons=native.createPublicAskStatusIcons287({...base,...statusConstants}),status=native.createPublicAskStatus287({...base,...icons}),confirm=native.createPublicAskConfirm287({...base,nc:useTerminalFocus,kr:useUsageInputTimeout287,b0n:usageInputGuards287.b0n,$e:Select,Ci:filePermissionMenu287.Ci});
// Native notices are the existing Mods owner. Absent rows remain genuine
// absence; no fabricated empty store is supplied.
function noticeStore(){const value=modsRegistryOwner287.registry().notices;if(!value||typeof value!=='object'||!('getState'in value)||!('subscribe'in value))throw Error('Canonical Mods notices contract missing');return value as Store<Map<string,{plugin:string;text:string}>>}
function useNotice<T>(store:Store<Map<string,{plugin:string;text:string}>>,selector:(state:Map<string,{plugin:string;text:string}>)=>T){return selector(React.useSyncExternalStore(store.subscribe,store.getState,store.getState))}
export function publicAskMenuPorts287():Record<string,unknown>{const ports=Object.fromEntries(proof.groups.menu.ports.map(p=>[p.local,unavailable(p.local)]));return {...ports,...base,...divider,...title,...bullet,...badge,...status,...confirm,...strings,...paste,...presence,...wrapped,...truncated,...notice,...answerConstants,
 Jn:useTheme,z:useAppState,En:useSetAppState,ld:useMainLoopModel,ql:limits.ql,bMr:limits.bMr,al:useSettings,
 UY:permissionDescriptors287.UY,rXe:permissionDescriptors287.rXe,uto:permissionDescriptors287.uto,mto:permissionDescriptors287.mto,vit:permissionDescriptors287.vit,an:permissionDescriptors287.an,Ks:permissionDescriptors287.display.Ks,nt:permissionDescriptors287.display.nt,
 fAt:applyMarkdown,UT:getExternalEditor,bS:toIDEDisplayName,B$:editPromptInEditor,$w:getPlanFilePath,ua:useRegisterOverlay,oi:useInterval,
 Qt:(...args:Parameters<typeof import('../../../keybindings/useKeybinding.js')['useKeybindings']>)=>require('../../../keybindings/useKeybinding.js').useKeybindings(...args),We:(...args:Parameters<typeof import('../../../keybindings/useKeybinding.js')['useKeybinding']>)=>require('../../../keybindings/useKeybinding.js').useKeybinding(...args),
 BL:()=>React.use(getCliHighlightPromise()),K:React.Fragment,eV:React.Fragment,sr:TextInput,It:Link,kb:FilePathLink,be:(props:Record<string,unknown>)=>jsx(filePermissionMenu287.be,props),j:(props:Parameters<typeof filePermissionMenu287.j>[0])=>jsx(filePermissionMenu287.j,props),$e:Select,I$:SelectMulti,Ci:filePermissionMenu287.Ci,qs:permissionNotice287.qs,Tb:permissionNotice287.Tb,
 // Explicit C bridge: original nU targets AppState, while this repository's
 // established image path owner is imageStore. Both source Sme/bme and all
 // existing readers write/read that one table, not a fabricated AppState Map.
 nU:(_setter:unknown,key:string)=>{if(key!=='storedImagePaths')throw Error('Unexpected Ask cache field '+key);return updateStoredImagePaths287},
 ...imageStore,q_:(options:{data:string;mediaType:'image/png'|'image/jpeg'|'image/gif'|'image/webp'})=>maybeResizeAndDownsampleImageBlock({type:'image',source:{type:'base64',data:options.data,media_type:options.mediaType}}),
 Pt:background.Pt,a:authEnvironment,cie:()=>getExecutionSession287().userPresence.flushIfDirty(),Hg:()=>getExecutionSession287().userPresence.lastInteractionTime(),OEe:()=>getExecutionSession287().userPresence.terminalFocus(),
 f4e:{noticesStore:noticeStore},xe:useNotice,G:count,c:(value:unknown)=>value,i:logEvent,d:logError,m:()=>{},p:()=>{},y:()=>{},
 }}
let owner:native.PublicAskMenu287|undefined
export function getPublicAskMenu287(){return owner??=native.createPublicAskMenu287(publicAskMenuPorts287())}
export function SourceAskPermissionRequest287(props:PermissionRequestProps){const {descriptor287,answer287,wouldTakeAnswer287}=props.toolUseConfirm;if(!descriptor287?.questions||!answer287||!wouldTakeAnswer287)throw Error('Original Ask menu lacks canonical request/answer');const settings=useSettings(),state=permissionDescriptors287.oge(),highlight=settings.syntaxHighlightingDisabled?null:React.use(getCliHighlightPromise());return jsx(getPublicAskMenu287().xge,{payload:descriptor287,asked:descriptor287.questions,answer:answer287,wouldTakeAnswer:wouldTakeAnswer287,highlight,afkTimeoutMs:getPublicAskMenu287().sXe(preferences.jQe()),state})}
