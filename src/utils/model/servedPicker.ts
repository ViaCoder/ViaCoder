import stripAnsi from 'strip-ansi'
import {getServedCatalog, type ServedModelRow} from './servedCatalog.js'
import {isModelAllowed} from './modelAllowlist.js'
import type {ModelOption} from './modelOptions.js'

// Official Qhe/uce/jVn, plus row-schema name/description/notice/badge fields.
// A served primary list is authoritative; do not append old bootstrap rows.
const clean = (value: string | null | undefined) => stripAnsi(value ?? '').replace(/[\x00-\x1f\x7f-\x9f]/g, ' ').trim()
export function servedRowLabel(row: ServedModelRow): string {
  return clean(row.name) || clean(row.short_name) || (row.confidential ? 'Custom model' : clean(row.id))
}
export function getServedPickerOptions(defaultOption: ModelOption): ModelOption[] | undefined {
  const catalog = getServedCatalog()
  if (catalog === null) return undefined
  const seen = new Set<string>(), options: ModelOption[] = []
  // Overflow remains reachable after primary rows, never via fabricated aliases.
  const rows = [...catalog.config.models ?? []].sort((a, b) => Number(a.section === 'overflow') - Number(b.section === 'overflow'))
  for (const row of rows) {
    const id = row.id.trim(), key = id.toLowerCase()
    if (!id || seen.has(key) || /(?:^|-)mythos(?:-|$)/i.test(key) || row.section === 'deprecated' || !isModelAllowed(id)) continue
    seen.add(key)
    const details = [row.description, row.badge?.message, row.notice?.title, row.notice?.text,
      row.selection_notice?.title, row.selection_notice?.text, row.tooltip?.content].map(clean).filter(Boolean)
    options.push({value: id, label: servedRowLabel(row), description: [...new Set(details)].join(' · '), disabled: row.disabled === true})
  }
  return [defaultOption, ...options]
}
