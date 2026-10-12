export type CliHighlight = {
  highlight(code: string, options?: {language?: string}): string
  supportsLanguage(language: string): boolean
}
export function nM(): CliHighlight
export function getLanguageName(filePath: string): Promise<string>
