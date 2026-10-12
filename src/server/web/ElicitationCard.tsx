import React, { useEffect, useId } from 'react'
import { clearInteractionDraft, useInteractionDraft } from './interactionDraftStore.js'
import { object } from './records.js'

type Props = { request: Record<string, unknown>; resolved: boolean; draftKey?: string;
  onAnswer: (action: 'accept' | 'decline' | 'cancel', content?: Record<string, unknown>) => Promise<void> }
type Field = { name: string; schema: Record<string, unknown>; required: boolean }

function fieldsOf(request: Record<string, unknown>): Field[] | null {
  const schema = object(request.requested_schema)
  const properties = object(schema?.properties)
  if (schema?.type !== 'object' || !properties) return null
  const required = new Set(Array.isArray(schema.required) ? schema.required.filter((value): value is string => typeof value === 'string') : [])
  return Object.entries(properties).map(([name, value]) => ({ name, schema: object(value) ?? {}, required: required.has(name) }))
}
function enumChoices(schema: Record<string, unknown>): Array<{ value: string; label: string }> | null {
  if (Array.isArray(schema.oneOf)) return schema.oneOf.map(object).filter((item): item is Record<string, unknown> => Boolean(item))
    .filter(item => typeof item.const === 'string').map(item => ({ value: String(item.const), label: typeof item.title === 'string' ? item.title : String(item.const) }))
  if (Array.isArray(schema.enum)) return schema.enum.filter((value): value is string => typeof value === 'string')
    .map((value, index) => ({ value, label: Array.isArray(schema.enumNames) && typeof schema.enumNames[index] === 'string' ? schema.enumNames[index] : value }))
  return null
}

/** DOM host of the existing MCP elicitation protocol. It does not infer
 * capability from vendor identity or auto-open a third-party URL. */
export function ElicitationCard({ request, resolved, draftKey, onAnswer }: Props) {
  const idBase = useId()
  const [values, setValues] = useInteractionDraft<Record<string, unknown>>(draftKey,'values',()=>({}))
  const [busy, setBusy] = useInteractionDraft(draftKey,'busy',()=>false)
  const [error, setError] = useInteractionDraft(draftKey,'error',()=>'')
  useEffect(() => { if (resolved && draftKey) clearInteractionDraft(draftKey) }, [resolved, draftKey])
  const mode = request.mode === 'url' ? 'url' : 'form'
  const fields = fieldsOf(request)
  const update = (name: string, value: unknown) => setValues(previous => ({ ...previous, [name]: value }))
  const respond = async (action: 'accept' | 'decline' | 'cancel') => {
    if (resolved || busy) return
    let content: Record<string, unknown> | undefined
    if (action === 'accept' && mode === 'form') {
      content = {}
      for (const field of fields ?? []) {
        const value = values[field.name]
        if (field.required && (value === undefined || value === '')) { setError(`请填写：${field.name}`); return }
        if (value !== undefined && value !== '') content[field.name] = value
      }
      if (!fields) {
        const raw = typeof values.__json === 'string' ? values.__json.trim() : ''
        try { const parsed: unknown = JSON.parse(raw || '{}'); const data = object(parsed)
          if (!data) throw Error('需要 JSON 对象'); content = data }
        catch (cause) { setError(`请输入 JSON 对象：${(cause as Error).message}`); return }
      }
    }
    setBusy(true); setError('')
    try { await onAnswer(action, content) }
    catch (cause) { setError((cause as Error).message) }
    finally { setBusy(false) }
  }
  const url = typeof request.url === 'string' ? request.url : ''
  const openUrl = () => {
    try { const parsed = new URL(url)
      if (!['http:','https:'].includes(parsed.protocol)) throw Error('链接协议需为 HTTP(S)')
      window.open(parsed.href, '_blank', 'noopener,noreferrer')
    } catch (cause) { setError((cause as Error).message) }
  }
  return <div className="elicitation-card" aria-label="MCP 输入请求">
    <p><strong>{String(request.mcp_server_name ?? 'MCP 服务')}</strong>：{String(request.message ?? '')}</p>
    {mode === 'url' ? <div className="elicitation-url"><code>{url || '服务未提供链接'}</code>
      {url && <button className="secondary" disabled={resolved || busy} onClick={openUrl}>在新标签打开</button>}
      <small>链接仅在点击时打开；不会附带共享服务令牌。</small></div> :
      fields ? <div className="elicitation-fields">{fields.map(field => {
        const choices = enumChoices(field.schema)
        const multi = field.schema.type === 'array' ? enumChoices(object(field.schema.items) ?? {}) : null
        const label = typeof field.schema.title === 'string' ? field.schema.title : field.name
        const fieldId = `${idBase}-${field.name}`
        return <div className="elicitation-field" key={field.name}>{multi ? <span>{label}{field.required ? ' *' : ''}</span> : <label htmlFor={fieldId}>{label}{field.required ? ' *' : ''}</label>}
          {multi ? <span className="elicitation-multi">{multi.map(option => <label key={option.value}>
            <input type="checkbox" disabled={resolved || busy} checked={Array.isArray(values[field.name]) && (values[field.name] as unknown[]).includes(option.value)}
              onChange={() => { const current = Array.isArray(values[field.name]) ? values[field.name] as string[] : []
                update(field.name, current.includes(option.value) ? current.filter(value => value !== option.value) : [...current, option.value]) }} />{option.label}
          </label>)}</span> : choices ? <select id={fieldId} disabled={resolved || busy} value={String(values[field.name] ?? '')}
            onChange={event => update(field.name, event.target.value)}><option value="">请选择</option>
            {choices.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select> :
            field.schema.type === 'boolean' ? <select id={fieldId} disabled={resolved || busy}
              value={values[field.name] === undefined ? '' : String(values[field.name])}
              onChange={event => update(field.name, event.target.value === '' ? undefined : event.target.value === 'true')}>
              <option value="">请选择</option><option value="true">是</option><option value="false">否</option></select> :
            ['number','integer'].includes(String(field.schema.type)) ? <input id={fieldId} type="number" disabled={resolved || busy}
              step={field.schema.type === 'integer' ? 1 : 'any'} value={values[field.name] === undefined ? '' : String(values[field.name])}
              onChange={event => update(field.name, event.target.value === '' ? undefined : Number(event.target.value))} /> :
            <textarea id={fieldId} disabled={resolved || busy} rows={2} value={String(values[field.name] ?? '')}
              onChange={event => update(field.name, event.target.value)} />}
          {typeof field.schema.description === 'string' && <small>{field.schema.description}</small>}
        </div>
      })}</div> : <label className="elicitation-field">JSON 内容<textarea rows={5} disabled={resolved || busy}
        value={String(values.__json ?? '')} onChange={event => update('__json', event.target.value)} /></label>}
    {resolved ? <span className="badge">已答复或已过期</span> : <div className="elicitation-actions">
      <button className="primary" disabled={busy} onClick={() => void respond('accept')}>{mode === 'url' ? '继续' : '提交'}</button>
      <button className="secondary" disabled={busy} onClick={() => void respond('decline')}>拒绝</button>
      <button className="secondary" disabled={busy} onClick={() => void respond('cancel')}>取消</button>
    </div>}
    {error && <p role="alert" className="error-text">{error}</p>}
  </div>
}
