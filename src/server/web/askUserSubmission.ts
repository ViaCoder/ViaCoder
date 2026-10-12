import type { Question } from '../../tools/AskUserQuestionTool/AskUserQuestionTool.js'

/** Format native Web control state exactly as the existing
 * AskUserQuestionPermissionRequest submits updatedInput. The SDK/tool schema
 * remains authoritative and is checked on the service before sending. */
export function buildAskUserSubmission(input: Record<string, unknown>, questions: Question[],
  choices: Record<string, string[]>, other: Record<string, string>, notes: Record<string, string>): Record<string, unknown> {
  const answers: Record<string, string> = {}, annotations: Record<string, { preview?: string; notes?: string }> = {}
  for (const question of questions) {
    const selected = choices[question.question] ?? []
    const free = other[question.question]?.trim() ?? ''
    const chosen = selected.filter(label => label !== '__other__')
    const answer = question.multiSelect ? [...chosen, ...(selected.includes('__other__') && free ? [free] : [])].join(', ') :
      selected[0] === '__other__' ? free : selected[0] ?? ''
    if (answer) answers[question.question] = answer
    const preview = !question.multiSelect ? question.options.find(option => option.label === selected[0])?.preview : undefined
    const note = notes[question.question]?.trim()
    if (preview || note) annotations[question.question] = { ...(preview ? { preview } : {}), ...(note ? { notes: note } : {}) }
  }
  return { ...input, answers, ...(Object.keys(annotations).length ? { annotations } : {}) }
}
