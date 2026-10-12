import React, { useEffect } from 'react'
import { clearInteractionDraft, useInteractionDraft } from './interactionDraftStore.js'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

type PlanResult = { exists: false } | { exists: true; content: string }
type Props = { input: Record<string, unknown>; resolved: boolean; draftKey?: string;
  getPlan: () => Promise<PlanResult>; onAllow: (mode: 'default' | 'acceptEdits') => Promise<void>; onDeny: () => Promise<void> }

export function PlanApprovalCard({ input, resolved, draftKey, getPlan, onAllow, onDeny }: Props) {
  const [plan, setPlan] = useInteractionDraft<string | null>(draftKey,'plan',()=>typeof input.plan === 'string' ? input.plan : null)
  const [missing, setMissing] = useInteractionDraft(draftKey,'missing',()=>false)
  const [busy, setBusy] = useInteractionDraft(draftKey,'busy',()=>false)
  const [error, setError] = useInteractionDraft(draftKey,'error',()=>'')
  useEffect(() => { if (resolved && draftKey) clearInteractionDraft(draftKey) }, [resolved, draftKey])
  const show = async () => {
    setBusy(true); setError('')
    try { const result = await getPlan(); setMissing(!result.exists); setPlan(result.exists ? result.content : null) }
    catch (cause) { setError((cause as Error).message) }
    finally { setBusy(false) }
  }
  const respond = async (mode: 'default' | 'acceptEdits' | 'deny') => {
    if (resolved || busy) return
    setBusy(true); setError('')
    try { await (mode === 'deny' ? onDeny() : onAllow(mode)) }
    catch (cause) { setError((cause as Error).message) }
    finally { setBusy(false) }
  }
  const html = plan === null ? '' : DOMPurify.sanitize(marked.parse(plan, { async: false }) as string, {
    FORBID_TAGS: ['img','iframe','style','form','input','video','audio'], FORBID_ATTR: ['style'],
  })
  return <div className="plan-approval" aria-label="计划确认">
    <p>执行器请求退出计划模式。以下两项均保持当前上下文，并通过原 SDK 权限更新切换到所选模式；不执行终端专用的清空上下文流程。</p>
    {plan === null && !missing && <button className="secondary" disabled={busy} onClick={() => void show()}>查看当前计划</button>}
    {missing && <p>执行器报告没有计划内容。</p>}
    {plan !== null && <div className="plan-preview markdown" dangerouslySetInnerHTML={{ __html: html }} />}
    {resolved ? <span className="badge">已处理或已过期</span> : <div className="plan-actions">
      <button className="primary" disabled={busy} onClick={() => void respond('default')}>接受计划 · 保持上下文（默认权限）</button>
      <button className="secondary" disabled={busy} onClick={() => void respond('acceptEdits')}>接受计划 · 保持上下文（接受编辑）</button>
      <button className="secondary" disabled={busy} onClick={() => void respond('deny')}>拒绝计划</button>
    </div>}
    {error && <p role="alert" className="error-text">{error}</p>}
  </div>
}
