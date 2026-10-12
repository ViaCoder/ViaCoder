export type PermissionMode =
  | 'ask'
  | 'skip_all_permission_checks'
  | 'follow_a_plan';

export type Logger = {
  silly?: (...args: unknown[]) => void;
  debug?: (...args: unknown[]) => void;
  info?: (...args: unknown[]) => void;
  warn?: (...args: unknown[]) => void;
  error?: (...args: unknown[]) => void;
};

export type ClaudeForChromeContext = Record<string, unknown>;

// Official 2.1.283 schemas, extension transport and tool dispatch. See the
// vendored provenance manifest for the exact module hashes and transformation.
import { chromeModule } from '../src/vendor/official-chrome/platform.js';
const {createClient: Hao, createServer: QIn, clearSelection: igr} = chromeModule;
export const BROWSER_TOOLS = chromeModule.tools;
import { createIdentityBoundPairingClient } from '../src/utils/claudeInChrome/localPairingHost.js';

// Host-only lifecycle hook. The official transport, selection algorithm and
// server bodies remain unchanged. Used by both CLI in-process and stdio paths.
export function createClaudeForChromeMcpServer(context: ClaudeForChromeContext, client = context.localPairing
  ? createIdentityBoundPairingClient(context, Hao) : Hao(context)) {
  // Optional host lifecycle hooks are absent from some recovered JS class
  // declarations; keep this boundary structural rather than widening the client.
  const lifecycle: {
    getSelectedDeviceId?: () => string | undefined;
    startProactivePairing?: () => unknown;
    disconnect?: () => void;
  } = client;
  const server: ReturnType<typeof QIn> & { onclose?: () => void } = QIn(context, client);
  const attach = context.onExtensionClientCreated as undefined | ((selected: () => string | undefined, clear: () => void) => () => void);
  const detach = attach?.(() => lifecycle.getSelectedDeviceId?.(), () => igr(client));
  // The in-process MCP owner closes the Server, not the extension client.
  // Apply the official client's disconnect/cleanup contract for the default
  // bridge too (keepalive, reconnect, pending calls), not only local pairing.
  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    try { detach?.(); } finally { lifecycle.disconnect?.(); }
  };
  const onclose = server.onclose;
  server.onclose = () => { try { onclose?.(); } finally { dispose(); } };
  const close = server.close.bind(server);
  server.close = async () => { try { await close(); } finally { dispose(); } };
  if (context.localPairing) {
    void Promise.resolve(lifecycle.startProactivePairing?.()).catch(() => {
      (context.logger as Logger | undefined)?.warn?.('Local Chrome pairing could not start; tools remain unpaired');
    });
  }
  return server;
}
