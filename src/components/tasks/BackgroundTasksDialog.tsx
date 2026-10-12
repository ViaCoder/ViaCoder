import React, {Suspense, lazy} from 'react';
import type {ToolUseContext} from '../../Tool.js';
import type {LocalJSXCommandOnDone} from '../../types/command.js';
import type {SharedSessionCommandHost} from '../../server/sharedSessionCommandHost.js';
import {getOriginalTasksPublic287} from '../../commands/tasks/officialJsx287/runtime.js';
import {SharedBackgroundTasksDialog} from './SharedBackgroundTasksDialog.js';

// The same original WEt receiver serves /tasks and direct PromptInput details.
// Lazy acquisition only loads the closure; task state stays in the existing owner.
const OriginalTasksView = lazy(async () => ({
  default: (await getOriginalTasksPublic287()).BackgroundTasksView,
}));

type Props = {
  onDone: LocalJSXCommandOnDone;
  toolUseContext: ToolUseContext;
  initialDetailTaskId?: string;
};

export function BackgroundTasksDialog(props: Props): React.ReactNode {
  const context = props.toolUseContext as ToolUseContext & {
    messageQueue?: unknown;
    isMidTurn?: boolean;
    commandRuntime?: {sharedSession?: SharedSessionCommandHost};
  };
  const host = context.commandRuntime?.sharedSession;
  if (host) {
    return <SharedBackgroundTasksDialog host={host} onDone={props.onDone} initialDetailTaskId={props.initialDetailTaskId}/>;
  }
  return <Suspense fallback={null}>
    <OriginalTasksView
      storageV5={context.storageV5}
      session={context.session}
      messageQueue={context.messageQueue}
      tools={context.options.tools}
      commands={context.options.commands}
      verbose={context.options.verbose}
      onDone={props.onDone}
      initialDetailTaskId={props.initialDetailTaskId}
      promptVisibleBelow={context.isMidTurn === true}
    />
  </Suspense>;
}
