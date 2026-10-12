export type AutoPromptRules = {
  allow: readonly string[]; softDeny: readonly string[]; hardDeny: readonly string[];
  environment: readonly string[]; settingsDenyRules: readonly string[];
}
export function createOfficialAutoPrompt(gate: (name: string, fallback: boolean) => boolean):
  (template: string, rules: AutoPromptRules) => string
