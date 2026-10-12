import type {Client} from '@modelcontextprotocol/sdk/client/index.js'
export interface ConnectedBrowser {deviceId: string; name: string; osPlatform?: string}
export function Rwn(connection: {client: Client}): Promise<ConnectedBrowser[]>
export function gGt(connection: {client: Client}, name: string, args: Record<string, unknown>): Promise<string | undefined>
