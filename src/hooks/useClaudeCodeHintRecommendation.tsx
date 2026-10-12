/**
 * Surfaces plugin-install prompts driven by `<claude-code-hint />` tags
 * that CLIs/SDKs emit to stderr. See docs/claude-code-hints.md.
 *
 * Show-once semantics: each plugin is prompted for at most once ever,
 * recorded in config after a non-cancelled response. The complete original
 * UX drains the same session feed, applies Lbe/Fbe and releases listeners.
 */

import * as React from 'react';
import type {OfficialRltRecommendationRunner287} from '../utils/officialRlt287.js';
import type {PluginHintRecommendation} from '../utils/plugins/hintRecommendation.js';
import type {PluginRecommendationStatePort} from './usePluginRecommendationBase.js';
import {useOriginalPluginHintRecommendation287} from '../utils/plugins/pluginHintIngress287.js';
export type PluginHintPayload287 = Omit<PluginHintRecommendation, 'pluginId'>;
type UseClaudeCodeHintRecommendationResult = {
  recommendation: PluginHintPayload287 | null;
  handleResponse: (response: 'yes' | 'no' | 'disable') => void;
};
export function useClaudeCodeHintRecommendation(state:PluginRecommendationStatePort<PluginHintPayload287>,run:OfficialRltRecommendationRunner287):UseClaudeCodeHintRecommendationResult {
 useOriginalPluginHintRecommendation287(state,run);
 const recommendation=state.recommendation;
 const handleResponse=React.useCallback((response:'yes'|'no'|'disable')=>{if(recommendation)state.closeRecommendation(response,recommendation)},[recommendation,state.closeRecommendation]);
 return {recommendation,handleResponse};
}
