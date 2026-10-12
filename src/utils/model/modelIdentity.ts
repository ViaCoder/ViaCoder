// Directly adapted from official 2.1.283 chunk-fqtthcxr.js:Af/d/uBr/WL/Z9e
// and chunk-1vt3h958.js:ix/sx. Pure identity parsing, no model enablement.
export const MODEL_REGIONS = ['us', 'eu', 'apac', 'jp', 'au', 'us-gov', 'global']
// Official Dn: context-window annotations are not part of a bootstrap slot.
export function stripModelContextSuffix(model: string): string { return model.replace(/\[(1|2)m\]/gi, '') }
export type ParsedModelIdentity = {
  family: string; major: number; minor?: number; legacyVersionFirst: boolean;
  base: string; trailer?: string; date?: string
}
function parseBase(value: string): ParsedModelIdentity | null {
  const modern = /^claude-([a-z]+)-(\d{1,2})(?!\d)(?:-(\d{1,2})(?!\d))?/.exec(value)
  if (modern) {
    const [base, family = '', major = '', minor] = modern
    return {family, major: Number(major), minor: minor === undefined ? undefined : Number(minor), legacyVersionFirst: false, base}
  }
  const legacy = /^claude-(\d{1,2})(?!\d)(?:-(\d{1,2})(?!\d))?-([a-z]+)/.exec(value)
  if (legacy) {
    const [base, major = '', minor, family = ''] = legacy
    return {family, major: Number(major), minor: minor === undefined ? undefined : Number(minor), legacyVersionFirst: true, base}
  }
  return null
}
export function parseModelIdentity(value: string): ParsedModelIdentity | null {
  let name = value.trim().toLowerCase()
  if (name === '' || /\s/.test(name)) return null
  name = name.replace(/\[[12]m\]$/, '')
  const slash = name.lastIndexOf('/')
  if (slash !== -1) name = name.slice(slash + 1)
  const provider = /^(?:([a-z-]+)\.)?anthropic\.(claude-.*)$/.exec(name)
  if (provider) {
    const [, region, model = ''] = provider
    if (region !== undefined && !MODEL_REGIONS.includes(region)) return null
    name = model
  }
  const parsed = parseBase(name)
  if (!parsed) return null
  const suffix = name.slice(parsed.base.length)
  if (suffix !== '' && !/^[-@]/.test(suffix)) return null
  if (!/^(?:-fast|-latest)?(?:-v\d{1,3}@\d{8}|[-@]\d{8})?(?:-v\d{1,3}(?::\d{1,3})?)?$/.test(suffix)) parsed.trailer = suffix
  else {
    const date = /(?:-v\d+@|[-@])(\d{8})/.exec(suffix)?.[1]
    if (date !== undefined) parsed.date = date
  }
  return parsed
}
export function isStandardModelIdentity(value: ParsedModelIdentity | null): value is ParsedModelIdentity {
  return value !== null && value.trailer === undefined
}
export function sameModelIdentity(a: ParsedModelIdentity, b: ParsedModelIdentity): boolean {
  return a.family === b.family && a.legacyVersionFirst === b.legacyVersionFirst && a.major === b.major && (a.minor ?? 0) === (b.minor ?? 0)
}
