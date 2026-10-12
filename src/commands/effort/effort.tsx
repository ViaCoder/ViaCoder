import { c as _c } from "react/compiler-runtime";
import * as React from 'react';
import type {SharedSessionCommandHost} from '../../server/sharedSessionCommandHost.js';
import { useMainLoopModel } from '../../hooks/useMainLoopModel.js';
import { announceScreenReaderEffortResult } from '../../ink/screen-reader-announcements.js';
import { type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS, logEvent } from '../../services/analytics/index.js';
import { useAppState, useSetAppState } from '../../state/AppState.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import { type EffortValue, getDisplayedEffortLevel, getEffortEnvOverride, getEffortValueDescription, resolveAppliedEffort } from '../../utils/effort.js';
import { executeEffortChange } from '../../utils/model/effortCommand.js';
import { getMainLoopModel, parseUserSpecifiedModel } from '../../utils/model/model.js';
import { getSettingsEffortTable, resolveSettingsEffort } from '../../utils/model/effortSettings.js';
const COMMON_HELP_ARGS = ['help', '-h', '--help'];
type EffortCommandResult = {
  message: string;
  effortUpdate?: {
    value: EffortValue | undefined;
  };
};
export function showCurrentEffort(appStateEffort: EffortValue | undefined, model: string): EffortCommandResult {
  const selected = appStateEffort === undefined ? resolveSettingsEffort(getSettingsEffortTable(), model) : appStateEffort;
  const env = getEffortEnvOverride();
  if (env === null || env === undefined && selected == null) {
    return {message: `Effort level: auto (currently ${getDisplayedEffortLevel(model, appStateEffort)})`};
  }
  const effective = resolveAppliedEffort(model, appStateEffort);
  return {message: effective === undefined ? 'Effort not supported' : `Current effort level: ${effective} (${getEffortValueDescription(effective)})`};
}
export function executeEffort(args: string, model = getMainLoopModel(), persist = true): EffortCommandResult {
  const result = executeEffortChange(args, model, persist);
  if (result.effortUpdate) logEvent('tengu_effort_command', {effort: (result.effortUpdate.value ?? 'auto') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS});
  return result;
}
function ShowCurrentEffort(t0) {
  const {
    onDone
  } = t0;
  const effortValue = useAppState(_temp);
  const model = useMainLoopModel();
  const {
    message
  } = showCurrentEffort(effortValue, model);
  onDone(message);
  return null;
}
function _temp(s) {
  return s.effortValue;
}
function ApplyEffortAndClose(t0) {
  const $ = _c(6);
  const {
    result,
    onDone
  } = t0;
  const setAppState = useSetAppState();
  const {
    effortUpdate,
    message
  } = result;
  let t1;
  let t2;
  if ($[0] !== effortUpdate || $[1] !== message || $[2] !== onDone || $[3] !== setAppState) {
    t1 = () => {
      if (effortUpdate) {
        setAppState(prev => ({
          ...prev,
          effortValue: effortUpdate.value
        }));
      }
      announceScreenReaderEffortResult(message, effortUpdate !== undefined);
      onDone(message);
    };
    t2 = [setAppState, effortUpdate, message, onDone];
    $[0] = effortUpdate;
    $[1] = message;
    $[2] = onDone;
    $[3] = setAppState;
    $[4] = t1;
    $[5] = t2;
  } else {
    t1 = $[4];
    t2 = $[5];
  }
  React.useEffect(t1, t2);
  return null;
}
export async function call(onDone: LocalJSXCommandOnDone, _context: unknown, args?: string): Promise<React.ReactNode> {
  args = args?.trim() || '';
  if (COMMON_HELP_ARGS.includes(args)) {
    onDone('Usage: /effort [low|medium|high|xhigh|max|auto]\n\nEffort levels:\n- low: Quick, straightforward implementation\n- medium: Balanced approach with standard testing\n- high: Comprehensive implementation with extensive testing\n- xhigh: Deeper reasoning than high, just below maximum\n- max: Maximum capability with deepest reasoning (Opus 5.5 and supported Opus models)\n- auto: Use the default effort level for your model');
    return;
  }
  const sharedContext=_context as {commandRuntime?:{sharedSession?:SharedSessionCommandHost};abortController?:AbortController};
  const shared=sharedContext.commandRuntime?.sharedSession;
  if(shared){
    try{
      const result=await shared.effort(!args||args==='current'||args==='status'?undefined:args,sharedContext.abortController?.signal);
      onDone(result.message);
    }catch(error){onDone(`Effort change failed: ${error instanceof Error?error.message:String(error)}`);}
    return;
  }
  if (!args || args === 'current' || args === 'status') {
    return <ShowCurrentEffort onDone={onDone} />;
  }
  const context = _context as {getAppState?: () => {mainLoopModelForSession?: string | null; mainLoopModel?: string | null}; options?: {isNonInteractiveSession?: boolean}};
  const state = context.getAppState?.();
  const model = state?.mainLoopModelForSession ?? state?.mainLoopModel;
  const result = executeEffort(args, model ? parseUserSpecifiedModel(model) : getMainLoopModel(), !context.options?.isNonInteractiveSession);
  return <ApplyEffortAndClose result={result} onDone={onDone} />;
}
