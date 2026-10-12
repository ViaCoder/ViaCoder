// Reduce an official native-client response without exposing page/error text.
// The native transport returns the extension's raw {result|error} envelope.
export function summarizeNativeReadonlyResult(response) {
  const object = value => value !== null && typeof value === 'object' && !Array.isArray(value)
  if (!object(response)) return {isError: true, responseValid: false, contentBlocks: 0, tabCount: null}
  const hasError = Object.hasOwn(response, 'error')
  const result = response.result
  const inner = object(result) ? result : null
  const error = object(response.error) ? response.error : null
  const content = inner?.content ?? error?.content
  const validContent = Array.isArray(content) && content.length > 0 &&
    content.every(item => object(item) && typeof item.type === 'string')
  const flag = value => value === undefined || typeof value === 'boolean'
  const responseValid = (hasError || inner !== null) && validContent &&
    flag(response.isError) && flag(response.is_error) &&
    flag(inner?.isError) && flag(inner?.is_error)
  const isError = !responseValid || hasError || response.isError === true || response.is_error === true ||
    inner?.isError === true || inner?.is_error === true
  let tabCount = null
  for (const item of validContent ? content : []) {
    if (item.type !== 'text' || typeof item.text !== 'string') continue
    try {
      const parsed = JSON.parse(item.text)
      if (Array.isArray(parsed)) tabCount = parsed.length
      else if (Array.isArray(parsed?.availableTabs)) tabCount = parsed.availableTabs.length
    } catch { /* Keep text/private data out of the report. */ }
  }
  return {isError, responseValid, contentBlocks: Array.isArray(content) ? content.length : 0, tabCount}
}
