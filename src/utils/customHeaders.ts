// Shared with the message client. Bootstrap also forwards caller-configured
// routing headers, then applies its own OAuth/API-key protocol headers.
export function getCustomHeaders(): Record<string, string> {
  const headers: Record<string, string> = {}
  for (const line of (process.env.ANTHROPIC_CUSTOM_HEADERS ?? '').split(/\n|\r\n/)) {
    if (!line.trim()) continue
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const name = line.slice(0, colon).trim()
    if (name) headers[name] = line.slice(colon + 1).trim()
  }
  return headers
}
