// Public V2 entry point. gfr is the actual 2.1.283 SDK Client, not the npm V1
// Client. See provenance.json for the byte-for-byte source dependency closure.
import {
  gfr as OfficialMcpV2Client,
  K8t as OfficialMcpV2SseTransport,
  Y8t as OfficialMcpV2HttpTransport,
  ws as McpV2SdkError,
  cs as McpV2ErrorCode,
} from './raw/chunk-e89zd7a9.js';

export { OfficialMcpV2Client, OfficialMcpV2SseTransport, OfficialMcpV2HttpTransport, McpV2SdkError, McpV2ErrorCode };
export const MCP_TREE_ID = 'v2';

/** Make a new, per-session V2 client. The caller owns the transport and close. */
export function createMcpV2Client(info = { name: 'claude-code', version: '2.1.287' }, options = {}) {
  return new OfficialMcpV2Client(info, options);
}

// Source-equivalent public raw calls from w61ke47p: Ep, wp and Tp.
// These intentionally bypass the SDK's response cache for resource reads and
// tool listings, as the 2.1.283 service layer does.
export function readResourceRaw(client, uri, options = {}) {
  return client.readResource({ uri }, { ...options, cacheMode: 'bypass' });
}

export function invokeToolRaw(client, request, options) {
  return client.callTool(request, options);
}

export function listToolsRaw(client, options = {}) {
  return client.request({ method: 'tools/list' }, { ...options, cacheMode: 'bypass' });
}

/**
 * Source-equivalent arm selection from ux (chunk-nm1jfrzb): env override,
 * then tengu_brindle_causeway=false => v1, otherwise v2. The returned
 * resolver latches once, as the official process-level selector does.
 * Dependencies are passed in to avoid touching app globals or feature gates.
 */
export function createMcpGenerationSelector({
  getEnv = () => process.env.MCP_SDK_GENERATION,
  getGate = () => undefined,
  warn = () => {},
  report = () => {},
} = {}) {
  let latched;
  function resolve() {
    if (latched !== undefined) return latched;
    const env = getEnv();
    const override = env === 'v1' || env === 'v2' ? env : undefined;
    if (env !== undefined && override === undefined)
      warn(`MCP_SDK_GENERATION=${env} is invalid; expected 'v1' or 'v2' — ignoring`);
    const gate = override === undefined ? getGate('tengu_brindle_causeway', true) : undefined;
    const generation = override ?? (gate?.value === false ? 'v1' : 'v2');
    const source = gate === undefined ? 'env' : gate.source === 'disabled' || gate.source === 'fallback' ? 'default' : 'growthbook';
    latched = generation;
    report({ generation, source });
    return generation;
  }
  return { resolve, reset: () => { latched = undefined; } };
}

/** Selector's actual accessor tripwire; V1 must be supplied by its owner. */
export function selectMcpClientModule(generation, { v1, v2 = { MCP_TREE_ID, OfficialMcpV2Client, createMcpV2Client } } = {}) {
  const module = generation === 'v2' ? v2 : v1;
  if (module?.MCP_TREE_ID !== generation)
    throw new Error(`MCP runtime accessor tripwire: resolved generation is ${generation} but the loaded client module does not carry MCP_TREE_ID ${generation}`);
  return module;
}
