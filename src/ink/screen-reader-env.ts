// Official 2.1.283 chunk-ze990dc9 D.int({min:0}) ->
// chunk-276sqz99 t -> chunk-2tefsj0f Oc/N.
// Kept separate from AX state so the source parser can be tested without
// loading the unrelated process-wide remote feature host.
export function screenReaderIntegerEnv(name: string, fallback: number): number {
  const raw = process.env[name]
  if (raw === undefined) return fallback
  const value = raw.trim()
  const exponent = /^[+-]?(\d+(\.\d*)?|\.\d+)[eE][+-]?\d+$/
  const grouped = /^[+-]?\d{1,3}([_,\u00a0\u202f ])\d{3}(?:\1\d{3})*$/
  const parsed = value.length <= 32 && exponent.test(value)
    ? Number(value)
    : value.length <= 32 && grouped.test(value)
      ? parseInt(value.replace(/[_,\u00a0\u202f ]/g, ''), 10)
      : parseInt(value, 10)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}
