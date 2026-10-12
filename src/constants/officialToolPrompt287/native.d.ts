export function createToolPrompt287(ports: {
  isReplMode(): boolean
  hasEmbeddedSearch(): boolean
}): {tools(enabledTools: ReadonlySet<string>): string}
