import * as compilerRuntime from "react/compiler-runtime";
const _c = (compilerRuntime as unknown as { c(size: number): any[] }).c;
/**
 * Hook for LSP plugin recommendations
 *
 * Detects file edits and recommends LSP plugins when:
 * - File extension matches an LSP plugin
 * - LSP binary is already installed on the system
 * - Plugin is not already installed
 * - User hasn't disabled recommendations
 *
 * Only shows one recommendation per session.
 */

import { extname } from 'path';
import * as React from 'react';
import type { OfficialRltRecommendationRunner287 } from '../utils/officialRlt287.js';
import { useExecutionSession287 } from '../context/executionProject287.js';
import { useNotifications } from '../context/notifications.js';
import { useAppState } from '../state/AppState.js';
import { logForDebugging } from '../utils/debug.js';
import { logError } from '../utils/log.js';
import { getMatchingLspPlugins } from '../utils/plugins/lspRecommendation.js';
import { respondToLspRecommendation287, usePluginRecommendationContext287 } from '../utils/plugins/pluginRecommendation287.js';
import { usePluginRecommendationBase, type PluginRecommendationStatePort } from './usePluginRecommendationBase.js';

export type LspRecommendationState = {
  pluginName: string;
  marketplaceName: string;
  pluginDescription?: string;
  fileExtension: string;
} | null;
type UseLspPluginRecommendationResult = {
  recommendation: LspRecommendationState;
  handleResponse: (response: 'yes' | 'no' | 'timeout' | 'never' | 'disable' | 'cancelled') => void;
};
export function useLspPluginRecommendation(state:PluginRecommendationStatePort<NonNullable<LspRecommendationState>>,run:OfficialRltRecommendationRunner287):UseLspPluginRecommendationResult {
 const trackedFiles=useAppState(_temp),{addNotification}=useNotifications(),{host,storageV5}=usePluginRecommendationContext287();
 const executionSession287=useExecutionSession287();
 const checkedFilesRef=React.useRef(new Set<string>());
 const {recommendation,clearRecommendation,tryResolve}=usePluginRecommendationBase(state,run,'lsp');
 const respond=React.useCallback((rec:NonNullable<LspRecommendationState>&{pluginId:string},response:string)=>{
  executionSession287.sessionFlags.replaceLspRecommendationShownThisSession(true);
  respondToLspRecommendation287(rec,response,addNotification,storageV5);
 },[addNotification,storageV5,executionSession287]);
 React.useEffect(()=>{let retryAfterCancellation:string[]=[];
  tryResolve(async()=>{if(executionSession287.sessionFlags.lspRecommendationShownThisSession())return null;
   const newFiles:string[]=[];for(const file of trackedFiles)if(!checkedFilesRef.current.has(file)){checkedFilesRef.current.add(file);newFiles.push(file)}
   for(const [fileIndex,filePath]of newFiles.entries())try{
    const match=(await getMatchingLspPlugins(filePath,storageV5,host))[0];if(!match)continue;
    logForDebugging(`[useLspPluginRecommendation] Found match: ${match.pluginName} for ${filePath}`);
    // Frozen C: official matches install automatically; other matches still
    // use the same Hpr request. Both accepted paths use the full original nrt.
    if(match.isOfficial){
     executionSession287.sessionFlags.replaceLspRecommendationShownThisSession(true);
     respondToLspRecommendation287(match,'yes',addNotification,storageV5);
     return null;
    }

    retryAfterCancellation=newFiles.slice(fileIndex);
    return {pluginId:match.pluginId,pluginName:match.pluginName,marketplaceName:match.marketplaceName,pluginDescription:match.description,fileExtension:extname(filePath)};
   }catch(error){logError(error)}return null;
  },()=>{for(const file of retryAfterCancellation)checkedFilesRef.current.delete(file)},respond);
 },[trackedFiles,tryResolve,respond,addNotification,host,storageV5,executionSession287]);
 const handleResponse=React.useCallback((response:'yes'|'no'|'timeout'|'never'|'disable'|'cancelled')=>{
  if(recommendation)clearRecommendation(response,recommendation);
 },[recommendation,clearRecommendation]);
 return {recommendation,handleResponse};
}
function _temp2(current) {
  if (current.lspRecommendationDisabled) {
    return current;
  }
  return {
    ...current,
    lspRecommendationDisabled: true
  };
}
function _temp(s) {
  return s.fileHistory.trackedFiles;
}
