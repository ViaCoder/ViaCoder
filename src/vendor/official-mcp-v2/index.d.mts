export type McpV2RequestOptions = {
  signal?: AbortSignal;
  timeout?: number;
  cacheMode?: 'bypass' | 'refresh';
  [key: string]: unknown;
};

export interface McpV2Transport {
  start(): Promise<void>;
  send(message: unknown, options?: unknown): Promise<void>;
  close(): Promise<void>;
  onmessage?: (message: unknown) => void;
  onclose?: () => void;
  onerror?: (error: Error) => void;
  sessionId?: string;
  setProtocolVersion?(version: string): void;
}

export interface McpV2Client {
  readonly transport?: McpV2Transport;
  onclose?: () => void;
  onerror?: (error: Error) => void;
  setRequestHandler(method: string, handler: (request: { method: string; params: Record<string, unknown> }, context: { mcpReq: { id: string | number; signal: AbortSignal } }) => Promise<unknown>): void;
  setNotificationHandler(method: string, handler: (notification: unknown) => void | Promise<void>): void;
  removeNotificationHandler(method: string): void;
  connect(transport: McpV2Transport, options?: { prior?: unknown; signal?: AbortSignal; timeout?: number }): Promise<void>;
  close(): Promise<void>;
  getProtocolEra(): 'modern' | 'legacy' | undefined;
  getNegotiatedProtocolVersion(): string | undefined;
  getServerCapabilities(): Record<string, unknown> | undefined;
  getServerVersion(): { name: string; version: string } | undefined;
  getInstructions(): string | undefined;
  listTools(params?: { cursor?: string }, options?: McpV2RequestOptions): Promise<{ tools: Array<Record<string, unknown>>; [key: string]: unknown }>;
  listResources(params?: { cursor?: string }, options?: McpV2RequestOptions): Promise<{ resources: Array<Record<string, unknown>>; [key: string]: unknown }>;
  listPrompts(params?: { cursor?: string }, options?: McpV2RequestOptions): Promise<{ prompts: Array<Record<string, unknown>>; [key: string]: unknown }>;
  getPrompt(params: { name: string; arguments?: Record<string, string> }, options?: McpV2RequestOptions): Promise<{ messages: Array<{ content: Record<string, unknown>; [key: string]: unknown }>; [key: string]: unknown }>;
  listResourceTemplates(params?: { cursor?: string }, options?: McpV2RequestOptions): Promise<{ resourceTemplates: Array<Record<string, unknown>>; [key: string]: unknown }>;
  readResource(params: { uri: string }, options?: McpV2RequestOptions): Promise<{ contents: Array<Record<string, unknown>>; [key: string]: unknown }>;
  callTool(params: { name: string; arguments?: Record<string, unknown> }, options?: McpV2RequestOptions): Promise<{ content?: Array<Record<string, unknown>>; [key: string]: unknown }>;
  request(params: { method: string; params?: Record<string, unknown> }, options?: McpV2RequestOptions): Promise<Record<string, unknown>>;
  /** Non-spec extension methods require an explicit result schema in gfr.request. */
  request<T>(params: { method: string; params?: Record<string, unknown> }, resultSchema: { parse(value: unknown): T }, options?: McpV2RequestOptions): Promise<T>;
}

export const MCP_TREE_ID: 'v2';
export const OfficialMcpV2Client: new (info: { name: string; version: string; [key: string]: unknown }, options?: Record<string, unknown>) => McpV2Client;
export const OfficialMcpV2HttpTransport: new (url: URL, options?: Record<string, unknown>) => McpV2Transport;
export const OfficialMcpV2SseTransport: new (url: URL, options?: Record<string, unknown>) => McpV2Transport;
export const McpV2SdkError: new (...args: unknown[]) => Error;
export const McpV2ErrorCode: Record<string, string | number>;
export function createMcpV2Client(info?: { name: string; version: string; [key: string]: unknown }, options?: Record<string, unknown>): McpV2Client;
export function readResourceRaw(client: McpV2Client, uri: string, options?: McpV2RequestOptions): ReturnType<McpV2Client['readResource']>;
export function invokeToolRaw(client: McpV2Client, request: { name: string; arguments?: Record<string, unknown> }, options?: McpV2RequestOptions): ReturnType<McpV2Client['callTool']>;
export function listToolsRaw(client: McpV2Client, options?: McpV2RequestOptions): Promise<Record<string, unknown>>;
export function createMcpGenerationSelector(options?: {
  getEnv?: () => string | undefined;
  getGate?: (name: string, defaultValue: boolean) => { value?: boolean; source?: string } | undefined;
  warn?: (message: string) => void;
  report?: (result: { generation: 'v1' | 'v2'; source: string }) => void;
}): { resolve(): 'v1' | 'v2'; reset(): void };
export function selectMcpClientModule(generation: 'v1' | 'v2', modules?: { v1?: { MCP_TREE_ID: string }; v2?: { MCP_TREE_ID: string } }): { MCP_TREE_ID: string };
