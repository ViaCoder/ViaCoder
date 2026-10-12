import {createHeadlessFocusComplete287,createFocusReadComplete287,createSubmissionComplete287} from '../../utils/officialPublicCommandDiscovery287/completions.js'
import {focusPrompt287} from '../../constants/focusPrompt287.js'
import {getIsNonInteractiveSession} from '../../bootstrap/state.js'
import {getSettingsForSource} from '../../utils/settings/settings.js'
// kSe/_hn already live in the canonical focus prompt owner. Keep the original
// Zmt headless flag-settings gate instead of substituting interactive enabled.
const view=createFocusReadComplete287({Ce:getIsNonInteractiveSession,ge:getSettingsForSource,kSe:focusPrompt287.enabled})
export const call=createHeadlessFocusComplete287({Zmt:view.enabled,_hn:focusPrompt287.override,...createSubmissionComplete287({})}).call
