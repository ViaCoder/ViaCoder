import { expect, test } from 'bun:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import type { Question } from '../src/tools/AskUserQuestionTool/AskUserQuestionTool.js'
import { AskUserCard } from '../src/server/web/AskUserCard.js'
import { buildAskUserSubmission } from '../src/server/web/askUserSubmission.js'

const questions: Question[] = [
  { question: 'Which approach?', header: 'Approach', multiSelect: false,
    options: [{ label: 'Direct', description: 'Direct path', preview: '## Direct\nA preview.' },
      { label: 'Staged', description: 'Staged path' }] },
  { question: 'Which checks?', header: 'Checks', multiSelect: true,
    options: [{ label: 'Types', description: 'Type checks' }, { label: 'Tests', description: 'Test suite' }] },
]
const input = { questions }

test('AskUser native Web controls render multi-question radio/checkbox/free text entry affordance without auto-answer', () => {
  const html = renderToStaticMarkup(React.createElement(AskUserCard, {
    input, resolved: false, onSubmit: async () => {}, onCancel: async () => {},
  }))
  expect(html).toContain('Which approach?')
  expect(html).toContain('Which checks?')
  expect(html).toContain('type="radio"')
  expect(html).toContain('type="checkbox"')
  expect(html).toContain('其他')
  expect(html).toContain('提交答案')
  expect(html).toContain('取消问答')
  expect(html).not.toContain('disabled=""')
  const done = renderToStaticMarkup(React.createElement(AskUserCard, {
    input, resolved: true, onSubmit: async () => {}, onCancel: async () => {},
  }))
  expect(done).toContain('已处理或已过期')
  expect(done).not.toContain('>提交答案</button>')
})

test('AskUser submission preserves original questions and formats single, multi, Other, partial and preview notes', () => {
  expect(buildAskUserSubmission(input, questions,
    { 'Which approach?': ['Direct'], 'Which checks?': ['Types', 'Tests'] }, {},
    { 'Which approach?': '  fixture note  ' })).toEqual({ questions,
      answers: { 'Which approach?': 'Direct', 'Which checks?': 'Types, Tests' },
      annotations: { 'Which approach?': { preview: '## Direct\nA preview.', notes: 'fixture note' } } })
  expect(buildAskUserSubmission(input, questions,
    { 'Which approach?': ['__other__'] }, { 'Which approach?': '  A custom answer  ' }, {})).toEqual({
    questions, answers: { 'Which approach?': 'A custom answer' },
  })
  expect(buildAskUserSubmission(input, questions, {}, {}, {})).toEqual({ questions, answers: {} })
})
