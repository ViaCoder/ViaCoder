import {createToolPrompt287} from './officialToolPrompt287/native.js'
import {isReplModeEnabled} from '../tools/REPLTool/constants.js'
import {hasEmbeddedSearchTools} from '../utils/embeddedTools.js'

export const officialToolPrompt287 = createToolPrompt287({
  isReplMode: isReplModeEnabled,
  hasEmbeddedSearch: hasEmbeddedSearchTools,
})
