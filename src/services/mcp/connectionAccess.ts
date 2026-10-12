import type { ConnectedMCPServer, ConnectedMCPServerV2, ConnectedMcpServer } from './types.js'

export function isConnectedMcpV2(connection: ConnectedMcpServer): connection is ConnectedMCPServerV2 {
  return 'v2Client' in connection
}

export type ConnectedMcpClientAccess =
  | { generation: 'v1'; connection: ConnectedMCPServer; client: ConnectedMCPServer['client'] }
  | { generation: 'v2'; connection: ConnectedMCPServerV2; client: ConnectedMCPServerV2['v2Client'] }

/** No V2→V1 cast: callers must dispatch on generation before SDK calls. */
export function getConnectedMcpClient(connection: ConnectedMcpServer): ConnectedMcpClientAccess {
  return isConnectedMcpV2(connection)
    ? { generation: 'v2', connection, client: connection.v2Client }
    : { generation: 'v1', connection, client: connection.client }
}
