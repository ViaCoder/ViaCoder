// Exact allowlists from official 2.1.283 chunk-4k8bcnmf/18sktzq8.
import { win32 } from 'node:path'
const ZB: string[] = ["CLAUDE_CODE_USE_BEDROCK","CLAUDE_CODE_USE_VERTEX","CLAUDE_CODE_USE_FOUNDRY","CLAUDE_CODE_USE_ANTHROPIC_AWS","CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD","CLAUDE_CODE_USE_MANTLE","CLAUDE_CODE_USE_GATEWAY","ANTHROPIC_FOUNDRY_RESOURCE","ANTHROPIC_VERTEX_PROJECT_ID","ANTHROPIC_AWS_WORKSPACE_ID","ANTHROPIC_GOOGLE_CLOUD_PROJECT","ANTHROPIC_GOOGLE_CLOUD_LOCATION","ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID","CLOUD_ML_REGION"]
const e8e: string[] = ["ANTHROPIC_MODEL","ANTHROPIC_DEFAULT_MODEL","ANTHROPIC_DEFAULT_FABLE_MODEL","ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_FABLE_MODEL_NAME","ANTHROPIC_DEFAULT_FABLE_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_HAIKU_MODEL","ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME","ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_OPUS_MODEL","ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_OPUS_MODEL_NAME","ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_DEFAULT_SONNET_MODEL","ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION","ANTHROPIC_DEFAULT_SONNET_MODEL_NAME","ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES","ANTHROPIC_SMALL_FAST_MODEL","ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION","CLAUDE_CODE_SUBAGENT_MODEL","CLAUDE_CODE_3P_PROBE_WROTE_SONNET_DEFAULT","CLAUDE_CODE_3P_PROBE_WROTE_OPUS_DEFAULT"]
const kmn: string[] = ["ANTHROPIC_CUSTOM_MODEL_OPTION","ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION","ANTHROPIC_CUSTOM_MODEL_OPTION_NAME","ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES"]
const Wve = new Set(["--exec","--model","-m","--permission-mode","--inherit-permission-mode","--proactivity","--agent","--agents","--routine","--effort","--add-dir","--mcp-config","--settings","--setting-sources","--managed-settings","--client-data-url","--system-prompt","--system-prompt-file","--append-system-prompt","--append-system-prompt-file","--system-prompt-snapshot","--append-subagent-system-prompt","--append-subagent-system-prompt-file","--fallback-model","--advisor","--channels","--watch-artifact","--watch-artifact-no-autoreact","--permission-prompt-tool","--permission-prompts","--allowed-tools","--allowedTools","--disallowed-tools","--disallowedTools","--tools","--session-id","--debug-file","-n","--name","--autocompact","--betas","--file","--max-budget-usd","--max-thinking-tokens","--max-turns","--task-budget","--plan-mode-instructions","--plugin-dir","--plugin-dir-no-mcp","--plugin-url","--rewind-files","--thinking","--thinking-display","--remote-control-session-name-prefix","--json-schema"])
const kst = new Set([...Wve,"--resume-session-at","--resume-drops-turn","--project-config-root"])
const Tst = new Set(["--allowed-tools","--allowedTools","--disallowed-tools","--disallowedTools","--tools","--mcp-config","--betas","--add-dir","--file","--channels"])
const h = new Set(["--plugin-dir","--plugin-dir-no-mcp","--plugin-url"])
const zPt = new Set(["--dangerously-skip-permissions","--allow-dangerously-skip-permissions","--strict-mcp-config","--dangerously-allow-browser-network-access","--restricted","--disable-slash-commands","--verbose","--reply-on-resume","--ide","--chrome","--no-chrome","--bare","--brief","--remote-control","--rc","--local"])
const ICr = new Set(["CLAUDE_CODE_SUBAGENT_MODEL_FORCE","CLAUDE_CODE_HOST_GATEWAY_LINEAGE"])
const HCr = [...e8e,...kmn,"CLAUDE_CODE_SUBAGENT_MODEL_FORCE"]
const aMe = new Set(["CLAUDE_CONFIG_DIR","CLAUDE_INTERNAL_FC_OVERRIDES",...HCr,"CLAUDE_CODE_CLIENT_DATA_URL",...ZB,"AWS_REGION","AWS_DEFAULT_REGION","ANTHROPIC_BEDROCK_REGION_PREFIX","AWS_PROFILE","AWS_CONFIG_FILE","AWS_SHARED_CREDENTIALS_FILE","GOOGLE_APPLICATION_CREDENTIALS","GOOGLE_CLOUD_PROJECT","GCLOUD_PROJECT","CLAUDE_SECURESTORAGE_CONFIG_DIR","CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST","CLAUDE_CODE_HOST_GATEWAY_LINEAGE"])
const g = new Set(["--system-prompt","--append-system-prompt","--append-subagent-system-prompt","--plan-mode-instructions","--name","-n"])
const d = new Set(["-r","--resume"])
const q$n = new Set(["-c","-p","-h","-v"])
// lC's persisted-path sanitation. This performs string work only (never opens paths).
export function sanitizePersistedPath(value: string): string {
  const nt = (v: string) => /^[\\/]\?\?[\\/]/.test(v) || v.includes('??') && /^[\\/]\?\?[\\/]/.test(win32.normalize(v))
  const fromExtended = (v: string) => v.startsWith('\\\\?\\UNC\\') ? '\\\\' + v.slice(8) : v.startsWith('\\\\?\\') && v.length >= 7 && v[5] === ':' ? v.slice(4) : v
  const unc = (v: string) => /^[\\/]{2}/.test(v) || nt(v)
  const wsl = (v: string) => { const m = /^[\\/]{2}wsl(?:\$|\.localhost)[\\/]([^\\/]*)/i.exec(v); return m !== null && !/^\.{0,2}[. ]*$/.test(m[1] ?? '') }
  const v = fromExtended(value)
  // Extended drive paths are local; network/device paths are reduced to local-root syntax.
  const traversal = (s: string) => /(^|[\\/])\.{1,2}[. ]*([\\/]|$)/.test(s) || s.includes('/')
  const unsafe = /^\\\\\?\\volume\{/i.test(value) ? traversal(value) : nt(value) || v !== value && traversal(v) || unc(v) && !wsl(v)
  if (!unsafe) return value
  let result = v.replace(/^([\\/])[\\/]+/, '$1')
  for (let i = 0; i < 4 && nt(result); i++) {
    result = win32.normalize(result).replace(/^([\\/])[\\/]+/, '$1')
    let index = 1
    while (result[index] === '?' && result[index + 1] === '?' && (index + 2 === result.length || /[\\/]/.test(result[index + 2]!))) {
      index += 3
      while (result[index] === '\\' || result[index] === '/') index++
    }
    result = result.slice(0, 1) + result.slice(index)
  }
  return nt(result) ? result.slice(0, 1) : result
}
export function sanitizeProviderEnv(input: Record<string, string>): Record<string, string> | undefined {
  const allowed = Object.entries(input).filter(([key, value]) => aMe.has(key) && (!ICr.has(key) || ['1', 'true', 'yes', 'on'].includes(value.toLowerCase().trim())))
  if (!allowed.length && Object.keys(input).length) return
  return Object.fromEntries(allowed.filter(([key, value]) => !/^$|[=\x00-\x1f\x7f-\x9f]/.test(key) && !value.includes('\0')).map(([key, value]) => [key, sanitizePersistedPath(value)]))
}
export function sanitizeRespawnFlags(input: string[]): string[] {
  const kept: string[] = []
  for (let i = 0; i < input.length; i++) {
    const token = input[i]!
    if (!token.startsWith('-')) continue
    const eq = token.indexOf('='), key = eq < 0 ? token : token.slice(0, eq)
    if (eq >= 0 && !Wve.has(key) && zPt.has(key)) { kept.push(key); continue }
    const takesNext = eq < 0 && Wve.has(key)
    const allowed = eq < 0 ? zPt.has(key) || takesNext && input[i + 1] !== undefined : Wve.has(key)
    const group = [token]
    if (takesNext && input[i + 1] !== undefined) group.push(input[++i]!)
    if (!allowed || takesNext && Tst.has(key)) while (input[i + 1] !== undefined && !input[i + 1]!.startsWith('-')) group.push(input[++i]!)
    if (allowed) kept.push(...group)
  }
  const groups: { key: string; tokens: string[] }[] = []
  for (let i = 0; i < kept.length; i++) {
    const token = kept[i]!, eq = token.indexOf('='), key = eq < 0 ? token : token.slice(0, eq), tokens = [token]
    if (eq < 0 && Wve.has(key) && kept[i + 1] !== undefined) {
      tokens.push(kept[++i]!)
      if (Tst.has(key)) while (kept[i + 1] !== undefined && !kept[i + 1]!.startsWith('-')) tokens.push(kept[++i]!)
    }
    groups.push({ key, tokens })
  }
  const last = new Map<string, number>()
  groups.forEach((group, i) => { if (Wve.has(group.key) && !Tst.has(group.key) && !h.has(group.key)) last.set(group.key, i) })
  // Ime has already removed short bundles/optional resume flags, so A4's reachable
  // input here consists exclusively of allowlisted exact tokens and --key=value.
  return groups.filter((group, i) => (last.get(group.key) ?? i) === i).flatMap(({ key, tokens }) => {
    if (g.has(key)) return tokens
    return tokens.map((value, i) => {
      if (i > 0) return sanitizePersistedPath(value)
      const eq = value.indexOf('=')
      return eq < 0 ? value : value.slice(0, eq + 1) + sanitizePersistedPath(value.slice(eq + 1))
    })
  })
}
