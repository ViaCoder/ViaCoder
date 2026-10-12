export function createPromptSections287(ports: {
  Gj(): {latest_per_family: Record<string, string>}
  xa(model: string): {display_name?: string} | undefined
  k<T>(key: string, fallback: T): T
}): {
  doingTasks(): string
  tone(): string
  environment(excludeDynamicSections?: boolean): string
  pronouns: string
  contextManagement: string
}
