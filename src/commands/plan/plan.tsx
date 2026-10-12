import { c as _c } from "react/compiler-runtime";
import * as React from 'react';
import { getIsRemoteMode, getPlanSlugCache, getSessionId, handlePlanModeTransition } from '../../bootstrap/state.js';
import type { LocalJSXCommandContext } from '../../commands.js';
import { Box, Text } from '../../ink.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import { getExternalEditor } from '../../utils/editor.js';
import { toIDEDisplayName } from '../../utils/ide.js';
import { applyPermissionUpdate } from '../../utils/permissions/PermissionUpdate.js';
import { prepareContextForPlanMode } from '../../utils/permissions/permissionSetup.js';
import { getPlan, getPlanFilePath } from '../../utils/plans.js';
import { editFileInEditor } from '../../utils/promptEditor.js';
import { renderToString } from '../../utils/staticRender.js';
import { createUserMessage } from '../../utils/messages.js';
import { MODE_PUSH_TIMEOUT_MS, runRemotePlan, type PlanCommandContextExtension } from './remotePlan.js';
function PlanDisplay(t0) {
  const $ = _c(11);
  const {
    planContent,
    planPath,
    editorName
  } = t0;
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = <Text bold={true}>Current Plan</Text>;
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  let t2;
  if ($[1] !== planPath) {
    t2 = <Text dimColor={true}>{planPath}</Text>;
    $[1] = planPath;
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  let t3;
  if ($[3] !== planContent) {
    t3 = <Box marginTop={1}><Text>{planContent}</Text></Box>;
    $[3] = planContent;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  let t4;
  if ($[5] !== editorName) {
    t4 = editorName && <Box marginTop={1}><Text dimColor={true}>"/plan open"</Text><Text dimColor={true}> to edit this plan in </Text><Text bold={true} dimColor={true}>{editorName}</Text></Box>;
    $[5] = editorName;
    $[6] = t4;
  } else {
    t4 = $[6];
  }
  let t5;
  if ($[7] !== t2 || $[8] !== t3 || $[9] !== t4) {
    t5 = <Box flexDirection="column">{t1}{t2}{t3}{t4}</Box>;
    $[7] = t2;
    $[8] = t3;
    $[9] = t4;
    $[10] = t5;
  } else {
    t5 = $[10];
  }
  return t5;
}
export async function call(onDone: LocalJSXCommandOnDone, context: LocalJSXCommandContext & PlanCommandContextExtension, args: string): Promise<React.ReactNode> {
  const {
    getAppState,
    setAppState
  } = context;
  const appState = getAppState();
  const currentMode = appState.toolPermissionContext.mode;

  const enteredPlan = currentMode !== 'plan';
  const host = context.planRemote?.host;
  // Register before mutation; the store subscription owns the only mode push.
  const modeConfirmation = enteredPlan ? host?.waitForMode?.('plan', {
    timeoutMs: MODE_PUSH_TIMEOUT_MS, signal: context.abortController?.signal,
  }) : undefined;
  // An updater can throw before runRemotePlan awaits this promise.
  void modeConfirmation?.catch(() => {});
  // Local state is optimistic; remote descriptions must wait for the worker ACK.
  if (enteredPlan) {
    handlePlanModeTransition(currentMode, 'plan');
    setAppState(prev => ({
      ...prev,
      toolPermissionContext: applyPermissionUpdate(prepareContextForPlanMode(prev.toolPermissionContext), {
        type: 'setMode',
        mode: 'plan',
        destination: 'session'
      })
    }));
  }
  if (context.planRemote?.kind === 'remote' || getIsRemoteMode()) {
    const result = await runRemotePlan({
      host, enteredPlan, args, modeConfirmation, signal: context.abortController?.signal,
      echo: description => {
        const message = createUserMessage({content: description});
        context.setMessages(previous => [...previous, message]);
        return message.uuid;
      },
    });
    if (result.kind === 'text') onDone(result.text);
    else {
      const render = (hide: boolean) => renderToString(<PlanDisplay
        planContent={result.content} planPath={hide ? undefined : result.path} editorName={undefined} />);
      const hidden = host?.isPathHidden?.() ?? false;
      let output = await render(hidden);
      if (!hidden && host?.isPathHidden?.()) output = await render(true);
      onDone(output);
    }
    return null;
  }
  if (enteredPlan) {
    const description = args.trim();
    if (description && description !== 'open' && description !== 'share') {
      onDone('Enabled plan mode', {
        shouldQuery: true
      });
      return null;
    }
    // Official se/Tle shows an existing session plan on first entry. Peek at
    // the slug cache so a fresh /plan does not generate or read a plan file.
    if (!getPlanSlugCache().get(getSessionId())) {
      onDone('Enabled plan mode');
      return null;
    }
  }

  // Already in plan mode - show the current plan
  const planContent = getPlan();
  const planPath = getPlanFilePath();
  if (!planContent) {
    onDone(enteredPlan ? 'Enabled plan mode' : 'Already in plan mode. No plan written yet.');
    return null;
  }

  // If user typed "/plan open", open in editor
  const argList = args.trim().split(/\s+/);
  if (argList[0] === 'open') {
    const result = await editFileInEditor(planPath);
    if (result.error) {
      onDone(`Failed to open plan in editor: ${result.error}`);
    } else {
      onDone(`Opened plan in editor: ${planPath}`);
    }
    return null;
  }
  const editor = getExternalEditor();
  const editorName = editor ? toIDEDisplayName(editor) : undefined;
  const display = <PlanDisplay planContent={planContent} planPath={planPath} editorName={editorName} />;

  // Render to string and pass to onDone like local commands do
  const output = await renderToString(display);
  onDone(output);
  return null;
}
