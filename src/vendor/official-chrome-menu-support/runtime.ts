import type {Client} from '@modelcontextprotocol/sdk/client/index.js'
import type {CallToolRequest} from '@modelcontextprotocol/sdk/types.js'
// ZU -> local SDK Client boundary (official v1 wd/As signature). The
// official v2 runtime is a separate host; this adapter does not restore it.
// Preserve SDK timeout/error/cancellation semantics; do not normalize content.
export function ZU(connection: {client: Client}, request: CallToolRequest['params'], options?: Parameters<Client['callTool']>[2]) {
  return connection.client.callTool(request, undefined, options)
}
