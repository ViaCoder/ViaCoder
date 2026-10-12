import {createOfficialFocusPrompt287} from './officialFocusPrompt287/native.js'
import {getFlagSettingsInline,setFlagSettingsInline,getIsNonInteractiveSession,getSystemPromptSectionCache} from '../bootstrap/state.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {getGlobalConfig} from '../utils/config.js'
import {getInitialSettings,getSettingsForSource} from '../utils/settings/settings.js'
import {settingsChangeDetector} from '../utils/settings/changeDetector.js'

export const focusPrompt287=createOfficialFocusPrompt287({
 lean:model=>{
  const {communication287}=require('./prompts.js') as typeof import('./prompts.js')
  return communication287.leanForPrompt(model)
 },
 nonInteractive:getIsNonInteractiveSession,
 execution:getExecutionSession287,
 sections:getSystemPromptSectionCache,
 noteInvalidation:reason=>getExecutionSession287().promptAssembly.noteInvalidation(reason),
 flagSettings:getFlagSettingsInline,setFlagSettings:setFlagSettingsInline,
 settingsForSource:source=>getSettingsForSource(source),settings:getInitialSettings,
 globalConfig:()=>getGlobalConfig(),
 settingsChangeDetector:{notifyChange:source=>settingsChangeDetector.notifyChange(source)},
})
