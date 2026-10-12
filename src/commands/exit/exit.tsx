import { feature } from 'bun:bundle';
import { spawnSync } from 'child_process';
import * as React from 'react';
import {getOrdinaryExit287} from './ordinaryExitRuntime287.js';
import type {ToolUseContext} from '../../Tool.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import { isBgSession } from '../../utils/concurrentSessions.js';
export async function call(onDone: LocalJSXCommandOnDone,context:ToolUseContext): Promise<React.ReactNode> {
  // Inside a `claude --bg` tmux session: detach instead of kill. The REPL
  // keeps running; `claude attach` can reconnect. Covers /exit, /quit,
  // ctrl+c, ctrl+d — all funnel through here via REPL's handleExit.
  if (feature('BG_SESSIONS') && isBgSession()) {
    onDone();
    spawnSync('tmux', ['detach-client'], {
      stdio: 'ignore'
    });
    return null;
  }
  return getOrdinaryExit287().call(onDone,context);
}
