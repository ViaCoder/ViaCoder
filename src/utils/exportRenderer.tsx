import React from 'react';
import stripAnsi from 'strip-ansi';
import { Messages } from '../components/Messages.js';
import { AppStoreContext, type AppState, type AppStateStore } from '../state/AppState.js';
import type { Tools } from '../Tool.js';
import type { Message } from '../types/message.js';
import { getExecutionSession287, runWithExecutionSession287 } from '../services/context/execution287.js';
import type { ExecutionSession287 } from '../services/context/officialExecutionOwners287/native.js';
import { getOriginalModsLifecycle287 } from './hooks/modelSwitch287/lifecycleRuntime.js';
import { runWithExportMessagesRenderer287 } from './hooks/modelSwitch287/exportDisplayScope287.js';

type NativeExportStore287 = Omit<AppStateStore, 'getState'> & { getSnapshot(): AppState };
type ExportDisplayProps287 = React.ComponentProps<typeof Messages>;

/** C display overlay only: the original Gy owns state and Ree owns projection.
 * The facade shares that store's methods; it does not create a second store,
 * snapshot cache, subscription set, or AppStateProvider. */
function ExportMessagesDisplay287(props: Record<string, unknown>): React.ReactNode {
  const context = getOriginalModsLifecycle287().clearSourceModule287('chunk-t1n6x7q0.js').OI as React.Context<NativeExportStore287 | null>;
  const original = React.useContext(context);
  if (!original) throw new ReferenceError('Export Messages requires the original Gy AppState provider');
  const store = React.useMemo<AppStateStore>(() => ({
    getState: original.getSnapshot,
    setState: original.setState,
    subscribe: original.subscribe,
  }), [original]);
  const display = props as unknown as ExportDisplayProps287;
  return <AppStoreContext.Provider value={store}>
    <Messages {...display} verbose={original.getSnapshot().verbose}
      toolJSX={null} toolUseConfirmQueue={[]} isMessageSelectorVisible={false}
      hideLogo={true} showAllInTranscript={true} disableRenderCap={true} hidePastThinking={false} />
  </AppStoreContext.Provider>;
}

export interface StreamRenderedMessagesOptions287 {
  columns?: number;
  verbose?: boolean;
  chunkSize?: number;
  onProgress?: (rendered: number) => void;
  welcomeHeader?: boolean;
  storageV5?: unknown;
  session?: ExecutionSession287;
}

/** Original full 287 gE: filter, recorded model, LPn tools, Gy/Ree/static
 * binding, first welcome header, chunk sizing/progress and bDe capture.
 * Only the scoped inner display retains C full-history/tool-detail behavior. */
export async function streamRenderedMessages(messages: Message[], tools: Tools, sink: (ansiChunk: string) => void | Promise<void>, options: StreamRenderedMessagesOptions287 = {}): Promise<void> {
  const { session = getExecutionSession287(), ...renderOptions } = options;
  const render = getOriginalModsLifecycle287().clearSourceModule287('chunk-1ypw9bby.js').gE as (
    session: ExecutionSession287, messages: Message[], tools: Tools,
    onChunk: typeof sink, options: Omit<StreamRenderedMessagesOptions287, 'session'>,
  ) => Promise<void>;
  return runWithExecutionSession287(session, () => runWithExportMessagesRenderer287(
    ExportMessagesDisplay287, () => render(session, messages, tools, sink, renderOptions),
  ));
}

/**
 * Renders messages to a plain text string suitable for export.
 * Uses the same React rendering logic as the interactive UI.
 */
export async function renderMessagesToPlainText(messages: Message[], tools: Tools = [], columns?: number): Promise<string> {
  const parts: string[] = [];
  await streamRenderedMessages(messages, tools, chunk => void parts.push(stripAnsi(chunk)), {
    columns
  });
  return parts.join('');
}
