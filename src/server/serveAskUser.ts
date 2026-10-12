import { ServeConflict } from './serveSession.js'

/** Validate the SDK AskUserQuestion tool input, not a Web-specific copy of
 * its question contract. The tool's schema is loaded only for this tool. */
export async function validateAskUserAnswer(original: Record<string, unknown>,
  proposed: Record<string, unknown> | undefined): Promise<void> {
  if (!proposed || !Object.hasOwn(proposed, 'answers')) throw new ServeConflict('AskUserQuestion requires an explicit answer submission')
  const { AskUserQuestionTool } = await import('../tools/AskUserQuestionTool/AskUserQuestionTool.js')
  const source = AskUserQuestionTool.inputSchema.safeParse(original)
  const answer = AskUserQuestionTool.inputSchema.safeParse(proposed)
  if (!source.success || !answer.success) throw new ServeConflict('Invalid AskUserQuestion input')
  if (JSON.stringify(source.data.questions) !== JSON.stringify(answer.data.questions) ||
    JSON.stringify(source.data.metadata ?? null) !== JSON.stringify(answer.data.metadata ?? null)) {
    throw new ServeConflict('AskUserQuestion answers cannot change the questions')
  }
  const known = new Set(source.data.questions.map(question => question.question))
  if (Object.keys(answer.data.answers ?? {}).some(key => !known.has(key)) ||
    Object.keys(answer.data.annotations ?? {}).some(key => !known.has(key))) {
    throw new ServeConflict('AskUserQuestion answer refers to an unknown question')
  }
}
