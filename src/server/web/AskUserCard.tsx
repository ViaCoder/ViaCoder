import React, { useEffect } from 'react'
import { clearInteractionDraft, useInteractionDraft } from './interactionDraftStore.js'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import type { Question } from '../../tools/AskUserQuestionTool/AskUserQuestionTool.js'
import { object } from './records.js'
import { buildAskUserSubmission } from './askUserSubmission.js'

type Props = { input: Record<string, unknown>; resolved: boolean; draftKey?: string;
  onSubmit: (updatedInput: Record<string, unknown>) => Promise<void>;
  onCancel: () => Promise<void> }

function questionsFromInput(input: Record<string, unknown>): Question[] | null {
  if (!Array.isArray(input.questions) || input.questions.length < 1 || input.questions.length > 4) return null
  const questions: Question[] = []
  for (const value of input.questions) {
    const question = object(value)
    if (!question || typeof question.question !== 'string' || typeof question.header !== 'string' ||
      (question.multiSelect !== undefined && typeof question.multiSelect !== 'boolean') ||
      !Array.isArray(question.options) || question.options.length < 2 || question.options.length > 4 ||
      !question.options.every(option => { const item = object(option)
        return item && typeof item.label === 'string' && typeof item.description === 'string' &&
          (item.preview === undefined || typeof item.preview === 'string') })) return null
    questions.push(question as Question)
  }
  return questions
}
function Preview({ text }: { text: string }) {
  const html = DOMPurify.sanitize(marked.parse(text, { async: false }) as string, {
    FORBID_TAGS: ['img','iframe','style','form','input','video','audio'], FORBID_ATTR: ['style'],
  })
  return <div className="ask-preview markdown" dangerouslySetInnerHTML={{ __html: html }} />
}

/** Native radio/checkbox/textarea controls work on keyboard and touch. The
 * client renders an SDK request; the service validates the original schema. */
export function AskUserCard({ input, resolved, draftKey, onSubmit, onCancel }: Props) {
  const [choices, setChoices] = useInteractionDraft<Record<string, string[]>>(draftKey,'choices',()=>({}))
  const [other, setOther] = useInteractionDraft<Record<string, string>>(draftKey,'other',()=>({}))
  const [notes, setNotes] = useInteractionDraft<Record<string, string>>(draftKey,'notes',()=>({}))
  const [busy, setBusy] = useInteractionDraft(draftKey,'busy',()=>false)
  const [error, setError] = useInteractionDraft(draftKey,'error',()=>'')
  useEffect(() => { if (resolved && draftKey) clearInteractionDraft(draftKey) }, [resolved, draftKey])
  const questions = questionsFromInput(input)
  const submit = async () => {
    if (!questions || resolved || busy) return
    const updatedInput = buildAskUserSubmission(input, questions, choices, other, notes)
    setBusy(true); setError('')
    try { await onSubmit(updatedInput) } catch (cause) { setError((cause as Error).message) }
    finally { setBusy(false) }
  }
  const cancel = async () => {
    if (resolved || busy) return
    setBusy(true); setError('')
    try { await onCancel() } catch (cause) { setError((cause as Error).message) }
    finally { setBusy(false) }
  }
  if (!questions) return <div className="ask-card"><p>问题格式未通过显示检查。可查看完整事件或取消，本页不会自动提交答案。</p>
    {resolved ? <span className="badge">已处理</span> : <button className="secondary" disabled={busy} onClick={() => void cancel()}>取消问答</button>}
    {error && <p role="alert" className="error-text">{error}</p>}</div>
  return <div className="ask-card" aria-label="需要回答的问题">
    {questions.map((question, index) => {
      const selected = choices[question.question] ?? []
      return <fieldset className="ask-question" key={question.question} disabled={resolved || busy}>
        <legend><span className="ask-header">{question.header}</span> {index + 1}/{questions.length} · {question.question}</legend>
        <p className="ask-hint">{question.multiSelect ? '可多选；方向键与空格可操作选项。' : '单选；也可填写其他答案。'}</p>
        <div className="ask-options">{question.options.map(option => <label className="ask-option" key={option.label}>
          <input type={question.multiSelect ? 'checkbox' : 'radio'} name={`ask-${index}`} checked={selected.includes(option.label)}
            onChange={() => setChoices(previous => {
              const current = previous[question.question] ?? []
              return { ...previous, [question.question]: question.multiSelect
                ? current.includes(option.label) ? current.filter(label => label !== option.label) : [...current, option.label]
                : [option.label] }
            })} />
          <span><strong>{option.label}</strong><small>{option.description}</small></span>
        </label>)}
          <label className="ask-option"><input type={question.multiSelect ? 'checkbox' : 'radio'} name={`ask-${index}`}
            checked={selected.includes('__other__')} onChange={() => setChoices(previous => {
              const current = previous[question.question] ?? []
              return { ...previous, [question.question]: question.multiSelect
                ? current.includes('__other__') ? current.filter(label => label !== '__other__') : [...current, '__other__']
                : ['__other__'] }
            })} /><span><strong>其他</strong><small>输入自己的答案</small></span></label>
        </div>
        {selected.includes('__other__') && <label className="ask-text-label">其他答案<textarea rows={2} value={other[question.question] ?? ''}
          onChange={event => setOther(previous => ({ ...previous, [question.question]: event.target.value }))} /></label>}
        {!question.multiSelect && question.options.find(option => option.label === selected[0])?.preview &&
          <Preview text={question.options.find(option => option.label === selected[0])!.preview!} />}
        {question.options.some(option => option.preview) && <label className="ask-text-label">补充备注（可选）<textarea rows={2}
          value={notes[question.question] ?? ''} onChange={event => setNotes(previous => ({ ...previous, [question.question]: event.target.value }))} /></label>}
      </fieldset>
    })}
    {resolved ? <span className="badge">已处理或已过期</span> : <div className="ask-actions">
      <button className="primary" disabled={busy} onClick={() => void submit()}>提交答案</button>
      <button className="secondary" disabled={busy} onClick={() => void cancel()}>取消问答</button>
      <small>可留空未回答的问题；仅点击提交才发送。取消不会替你选择答案。</small>
    </div>}
    {error && <p role="alert" className="error-text">{error}</p>}
  </div>
}
