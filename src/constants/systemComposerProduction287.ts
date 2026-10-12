import {join} from 'node:path'
import {createOfficialSystemComposer287,type SystemComposerPorts287} from './officialSystemComposer287/native.js'
import {communication287} from './communication287.js'
import {officialPromptSections287} from './promptSections287.js'
import {officialDynamicPrompt287} from './dynamicPrompt287.js'
import {focusPrompt287} from './focusPrompt287.js'
import {brookHeronGuidance287} from './effortPrompt287.js'
import {sessionGuidance287} from './sessionGuidance287.js'
import {aUo} from './officialSystemComposerHelpers287/native.js'
import {getMemoryReadPolicy287} from './systemComposerMemory287.js'
import {systemPromptSection,resolveSystemPromptSections,toSystemPromptRecords287} from './systemPromptSections.js'
import {getSessionStartDate} from './common.js'
import {getForkSubagentPolicyState287,getIsNonInteractiveSession} from '../bootstrap/state.js'
import {authEnvironment} from '../utils/authEnvironment.js'
import {getCwd} from '../utils/cwd.js'
import {isEnvTruthy} from '../utils/envUtils.js'
import {getInitialSettings} from '../utils/settings/settings.js'
import {getOutputStyleConfig,type OutputStyleConfig} from './outputStyles.js'
import {getModelBehaviorName287} from '../utils/model/behavior287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {getSkillToolCommands} from '../commands.js'
import {agentPromptState287} from '../services/context/agentPromptState287.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {contextRuntimeKernel} from '../services/context/runtime.js'
import {builtinAgentPolicy287} from '../tools/AgentTool/builtinAgentPolicy287.js'
import {EXPLORE_AGENT} from '../tools/AgentTool/built-in/exploreAgent.js'
import {isCoordinatorMode} from '../coordinator/coordinatorMode.js'
import {isUltrareviewEnabled} from '../commands/review/ultrareviewEnabled.js'
import {getBgTakeover287} from '../utils/officialWorktreeState287.generated.js'
import type {SystemComposerForkSettings287} from './officialSystemComposer287/native.js'

/** Frozen local static renderers remain owned by prompts.ts, not copied here. */
export interface SystemComposerStaticParts287 {
  intro(style:OutputStyleConfig|null):string
  system():string
  actions():string|null
  tools(names:ReadonlySet<string>):string
  tone():string
  lean(style:OutputStyleConfig|null):string
  brief():string|null
  isBriefEnabled():boolean
}

/** Bind the complete original yRt to the already selected production owners. */
export function systemComposerPorts287(staticParts:SystemComposerStaticParts287):SystemComposerPorts287 {
  return {
    sections:officialPromptSections287,
    communication:{modelForPrompt:communication287.modelForPrompt,lean:communication287.leanForPrompt,communication:communication287.communicationForResolvedModel},
    registry:{defineSection:systemPromptSection,resolvePromptSections:resolveSystemPromptSections,toScopedRecords:toSystemPromptRecords287},
    a:authEnvironment,
    Ce:getIsNonInteractiveSession,DRe:isCoordinatorMode,FM:agentPromptState287.taskMode,
    HXo:sessionGuidance287.cloudScope,Jr:'Grep',Le:isEnvTruthy,Neo:officialDynamicPrompt287.searchToolsOptIn,
    So:'Skill',U:getExecutionSession287,Ue:'Bash',Uxe:officialDynamicPrompt287.bare,
    Z_n:builtinAgentPolicy287.registry,_0:isUltrareviewEnabled,c:value=>value,
    co:'Glob',dao:join,eB:sessionGuidance287.skillAllowlist,ew:EXPLORE_AGENT,
    i:()=>{},ko:getForkSubagentPolicyState287,
    rS:()=>getBgTakeover287() as SystemComposerForkSettings287|null|undefined,
    tt:getInitialSettings,yt:'Agent',$$:getOutputStyleConfig,
    Aao:officialDynamicPrompt287.reducedDelegationAlt,
    AM:(context,model)=>communication287.promptPolicy.autonomyContext(context as string|undefined,model),
    Bao:staticParts.tools,Be: model=>getModelBehaviorName287(model as string),
    Cao:officialDynamicPrompt287.heronGuidance,E2o:model=>getMemoryReadPolicy287().composerPorts.E2o(model as string),
    Fao:staticParts.actions,Gao:officialDynamicPrompt287.actDontRederive,
    Iao:staticParts.intro,KSe:context=>officialDynamicPrompt287.deliveringWorkContext(context as string|undefined),
    Kao:officialDynamicPrompt287.corrections,Lao:staticParts.system,
    Mao:(context,model)=>officialDynamicPrompt287.autonomy(context as string|undefined,model),
    Nyt:officialDynamicPrompt287.readMainLoopCanonical,Pao:model=>brookHeronGuidance287(model as string),
    Tyn:officialDynamicPrompt287.reducedDelegationModel,Vao:officialDynamicPrompt287.working,
    Wao:staticParts.lean,Wqo:officialDynamicPrompt287.steerDelegation,
    XUt:(model,options)=>getMemoryReadPolicy287().composerPorts.XUt(model as string,options),
    Zao:staticParts.brief,_Rt:contextRuntimeKernel.agentSystemTokenReminder,
    _ao:context=>officialDynamicPrompt287.taskContinuity(context as string),
    _jo:officialDynamicPrompt287.correctionsModel,aUo,
    d8:context=>officialDynamicPrompt287.fableDefaultModel(context as string),dRt:officialDynamicPrompt287.heronRecord,
    ex:staticParts,fKo:officialDynamicPrompt287.strictJSON,gj:()=>String(sessionGuidance287.bundledSkillsDisabled()),
    hRt:context=>agentPromptState287.preparePromptModel(context as string),k:getFeatureValue_CACHED_MAY_BE_STALE,
    kao:'fable_identity',lRt:officialDynamicPrompt287.reducedDelegationRule,m0:getSkillToolCommands,
    nSe:communication287.sendUserMessageEnabled,nlo:focusPrompt287.guidance,oe:getCwd,ojo:getSessionStartDate,
    qao:officialDynamicPrompt287.deliveringWork,vao:officialDynamicPrompt287.jsonValueRule,
    wao: model=>officialDynamicPrompt287.identity(model as string),xao:officialDynamicPrompt287.willow,
    yao:officialDynamicPrompt287.actionCaution,yjo:officialDynamicPrompt287.deliveringWorkModel,zao:officialDynamicPrompt287.actRule,
    // The original namespace owns model/entrypoint/search gates. Loading its
    // hint does not register or enable EndConversation.
    moduleRequire:()=> (require('../tools/EndConversationTool/deferredHint287.js') as typeof import('../tools/EndConversationTool/deferredHint287.js')).endConversationHint287,
  }
}

export function createSystemComposerProduction287(staticParts:SystemComposerStaticParts287) {
  const {composeOriginalPromptRecords287}=require('../utils/hooks/modelSwitch287/promptComposition.js') as typeof import('../utils/hooks/modelSwitch287/promptComposition.js')
  return (tools:Parameters<ReturnType<typeof createOfficialSystemComposer287>>[0],model:string|undefined,mode?:Parameters<ReturnType<typeof createOfficialSystemComposer287>>[2])=>composeOriginalPromptRecords287(tools,model,mode,systemComposerPorts287(staticParts))
}
