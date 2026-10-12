import {installSessionTrustOwner287,type SessionTrustOwner287} from '../../bootstrap/state.js'
import {installInstructionContentAccessors287} from '../../bootstrap/state.js'
import {createInstructionContentAccessors287} from './officialInstructionContent287/native.js'
import {createHookRegistryAccessors287} from '../../utils/hooks/officialHooksConfiguration287/registry.js'
import {installHookRegistryAccessors287} from '../../bootstrap/state.js'
import {createModelSelectionAccessors287} from './officialModelSelectionAccessors287/native.js'
import {AsyncLocalStorage} from 'node:async_hooks'
import {createExecutionOwners287,type ExecutionSession287,type LegacyExecutionContext287} from './officialExecutionOwners287/native.js'
import {createLaunchOptionsAccessors287} from './officialLaunchOptionsAccessors287/native.js'
import {createExecutionLifecycle287} from './officialExecutionLifecycle287/native.js'
import {installUserPresenceOwner287,installSettingsSourceOwner287,type SettingsSourceOwner287,getSessionId,getParentSessionId,getOriginalCwd,getProjectRoot,getCwdState,installExecutionIdentityOwner287,installLaunchOptionsAccessors287,installModelSelectionAccessors287,installCostLedgerOwner287,installPromptAssemblyOwner287,registerExecutionStateResetForTests287,type SessionSwitchReason} from '../../bootstrap/state.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {asSessionId} from '../../types/ids.js'
import {initializeWorkspaceConfinement287,getWorkspaceConfinement287,requireWorkspaceConfinement287,preflightWorkspaceCwd287,preflightWorkspacePath287,closeWorkspaceConfinement287,type WorkspaceConfinementInitialization287} from './workspaceConfinement287.js'

// Execution scope is separate from analytics attribution. The source n/c
// distinction is retained: a legacy context without .session uses the root.
const scope=new AsyncLocalStorage<LegacyExecutionContext287|{session:ExecutionSession287}>()
const owners=createExecutionOwners287({
 executionContext:getExecutionSession287,
 legacyContext:()=>{const context=scope.getStore();return context&&'stickyBetas'in context&&!context.session?context:undefined},
})
export const executionSessionRegistryConstructor287=owners.sessionRegistryConstructor
function createRoot(){return owners.createSession({host:owners.createHost(),id:getSessionId(),parentId:getParentSessionId(),project:{originalCwd:getOriginalCwd(),projectRoot:getProjectRoot(),cwd:getCwdState()}})}
let root=createRoot()
// One source factory owns signals for the public bootstrap callers and the
// direct bridge. Re-identification operates on the canonical root, never a
// withProject view (whose source update explicitly rejects an identity write).
export const executionLifecycle287=createExecutionLifecycle287({executionContext:getExecutionSession287})
function installIdentity(){installExecutionIdentityOwner287({
 id:()=>getExecutionSession287().id,
 parentId:()=>getExecutionSession287().parentId,
 projectDir:()=>getExecutionSession287().identity.projectDir(),
 project:()=>executionLifecycle287.requireProject(getExecutionSession287()),
 updateProject:patch=>executionLifecycle287.updateProject(patch),
 planSlugs:()=>getExecutionSession287().sessionScratch.planSlugCache(),
 journal:()=>getExecutionSession287().requestJournal,
 switch:(id,reason,dir,project)=>runWithExecutionSession287(getExecutionSession287().root,()=>executionLifecycle287.switchSession(id,reason,dir,project)),
 clear:options=>runWithExecutionSession287(getExecutionSession287().root,()=>executionLifecycle287.clearSession(options)),
 subscribe:listener=>executionLifecycle287.subscribeSessionSwitch((id,reason,restored)=>listener(asSessionId(id),reason as SessionSwitchReason,restored)),
})}
const launchOptionsAccessors287=createLaunchOptionsAccessors287({executionContext:getExecutionSession287})
function installLaunchOptions(){installLaunchOptionsAccessors287(launchOptionsAccessors287,()=>getExecutionSession287().host.launchOptions,root.host.launchOptions)}
const modelSelectionAccessors287=createModelSelectionAccessors287({executionContext:getExecutionSession287})
function installModelSelection(){installModelSelectionAccessors287(modelSelectionAccessors287,root.modelSelection)}
function installSettingsSource(){installSettingsSourceOwner287(()=>getExecutionSession287().host.settingsSource as SettingsSourceOwner287,root.host.settingsSource as SettingsSourceOwner287)}
const hookRegistryRuntime287=createHookRegistryAccessors287({execution:getExecutionSession287,legacy:getLegacyExecutionContext287,root:{get host(){return root.host}}})
function installUserPresence(){installUserPresenceOwner287(()=>getExecutionSession287().userPresence)}
function installSessionTrust(){installSessionTrustOwner287(()=>getExecutionSession287().sessionFlags as unknown as SessionTrustOwner287,root.sessionFlags as unknown as SessionTrustOwner287)}
const instructionContentAccessors287=createInstructionContentAccessors287({execution:getExecutionSession287,legacy:getLegacyExecutionContext287})
function installInstructionContent(){installInstructionContentAccessors287(instructionContentAccessors287)}
function installHookRegistry(){installHookRegistryAccessors287(hookRegistryRuntime287,root.hookRegistry)}
installUserPresence()
installSessionTrust()
installInstructionContent()
installHookRegistry()
installSettingsSource()
installIdentity()
installLaunchOptions()
installModelSelection()
installCostLedgerOwner287(getExecutionSession287,root)
installPromptAssemblyOwner287(()=>getExecutionSession287().promptAssembly)
registerExecutionStateResetForTests287(()=>{closeWorkspaceConfinement287(root);root=createRoot();installUserPresence();installSessionTrust();installInstructionContent();installHookRegistry();installSettingsSource();installIdentity();installLaunchOptions();installModelSelection();installCostLedgerOwner287(getExecutionSession287,root)})
export function getRootExecutionSession287():ExecutionSession287 {return root}
export function getExecutionSession287():ExecutionSession287 {return scope.getStore()?.session??root}
export function setExecutionUserPromptWaitingFor287(session:ExecutionSession287,waitingFor:string|undefined):void {owners.setUserPromptWaitingFor(session,waitingFor)}
export function executionSessionHasUserPrompt287(session:ExecutionSession287):boolean {return owners.who(session)}
export function getExecutionUserPromptWaitingFor287(session:ExecutionSession287):string|undefined {return owners.wSr(session)}
export function subscribeExecutionUserPrompt287(session:ExecutionSession287,listener:()=>void):()=>void {return owners.subscribeUserPrompt(session,listener)}
export function runWithExecutionSession287<T>(session:ExecutionSession287,callback:()=>T):T {return scope.run({session},callback)}
export function runWithLegacyExecutionContext287<T>(context:LegacyExecutionContext287,callback:()=>T):T {return scope.run(context,callback)}
// Local C13.1: one policy attached to the existing native root, no import-time
// initialization. Trusted setup caller is separate from original switch/clear.
export function initializeExecutionWorkspaceConfinement287(input:WorkspaceConfinementInitialization287){return initializeWorkspaceConfinement287(getExecutionSession287(),input)}
export function getExecutionWorkspaceConfinement287(){return getWorkspaceConfinement287(getExecutionSession287())}
export function requireExecutionWorkspaceConfinement287(){return requireWorkspaceConfinement287(getExecutionSession287())}
export function preflightExecutionWorkspaceCwd287(directory:string){return preflightWorkspaceCwd287(getExecutionSession287(),directory)}
export function preflightExecutionWorkspacePath287(path:string,access:'read'|'write'){return preflightWorkspacePath287(getExecutionSession287(),path,access)}
export function closeExecutionWorkspaceConfinement287(){return closeWorkspaceConfinement287(getExecutionSession287())}
export const unlatchExecutionStickyBetas287=owners.unlatchStickyBetas

/** Original c(): legacy scope only, never a second execution owner. */
export function getLegacyExecutionContext287():LegacyExecutionContext287|undefined {const context=scope.getStore();return context&&'stickyBetas'in context&&!context.session?context:undefined}

// BEGIN CANONICAL_RECOMMENDATION_GATES_287
// Full original Wn/b$/pr/mc/PF/Pt/cS/Ft/am; native.d.ts only exposes
// getters on the already-selected ve/_e instances. No shadow gate flags.
// PF is the original live typed-environment getter, NOT a launch-options slot.
export const executionRecommendationGates287 = new Function('n', 'a',
  "function Wn(){return n().surfaceCapabilities.caps().workspace===\"remote\"}\nfunction b$(){return n().surfaceCapabilities.caps()}\nfunction pr(){return b$().remote}\nfunction mc(){return n().surfaceCapabilities.replBridgeActive()}\nfunction PF(){let e=a.CLAUDE_CODE_SESSION_KIND;if(e===\"bg\"||e===\"daemon\"||e===\"daemon-worker\")return e;return}\nfunction Pt(){return PF()===\"bg\"}\nfunction cS(){return n().host.extensionsConfig.teammateAgentId()}\nfunction Ft(){return Wn()||pr()!==null}\nfunction am(){return mc()||Pt()||cS()!==void 0};return {Ft,am};"
)(getExecutionSession287, authEnvironment) as { Ft():boolean; am():boolean };
// END CANONICAL_RECOMMENDATION_GATES_287

// Full original Hg accessor, same selected ln/be instance, no constructor root.
export const getExecutionLastInteractionTime287=new Function('n',
 'function Hg(){return n().userPresence.lastInteractionTime()};return Hg;'
)(getExecutionSession287) as ()=>number;
