import { expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { toRecord, resolvedInteractions, formatValue } from '../src/server/web/records.js'
import { newOperationId, selectContiguousEvents } from '../src/server/web/client.js'
import { shouldSubmitOnEnter } from '../src/server/web/upstream/sendShortcut.js'
import type { ServeEvent } from '../src/server/serveSession.js'

const event = (seq: number, type: string, fields: Record<string, unknown> = {}): ServeEvent => ({seq,at:0,type,...fields})
test('Web records preserve long Unicode tool output and every raw event field', () => {
  const text = '中文🧭'.repeat(30_000) + 'END-OF-OUTPUT'
  const input = event(1,'sdk',{message:{type:'user',message:{role:'user',content:[{type:'tool_result',tool_use_id:'tool-1',content:text}]}},fixtureExtra:'still present'})
  const record = toRecord(input)
  expect(record.blocks?.[0]?.content).toBe(text)
  expect(record.event).toBe(input)
  expect(formatValue(record.event)).toContain('END-OF-OUTPUT')
  expect(formatValue(record.event)).toContain('still present')
  expect(toRecord(event(2,'turn_queued',{content:text,source:'terminal'})).text).toBe(text)
  expect(toRecord(event(3,'future_unknown_event',{payload:text})).event.payload).toBe(text)
})
test('missing old user payload is labeled, not reconstructed or dropped', () => {
  expect(toRecord(event(1,'turn_queued')).text).toContain('未保存输入正文')
  const input = event(2,'sdk',{message:{type:'assistant',message:{content:[{type:'text',text:'hello'},{type:'thinking',thinking:'retained'},{type:'tool_use',name:'Read',input:{path:'fixture.txt'}}]}}})
  const record = toRecord(input)
  expect(record.text).toBe('hello')
  expect(record.blocks).toHaveLength(3)
})
test('approval completion applies only to previously emitted requests', () => {
  expect([...resolvedInteractions([event(1,'permission_request',{requestId:'first'}),event(2,'turn_completed'),event(3,'permission_request',{requestId:'second'})])]).toEqual(['first'])
  expect([...resolvedInteractions([event(1,'permission_request',{requestId:'first'}),event(2,'permission_resolved',{requestId:'first'})])]).toEqual(['first'])
})
test('LAN HTTP operation IDs do not require secure-context randomUUID', () => {
  const ids = Array.from({length:100},()=>newOperationId())
  expect(new Set(ids).size).toBe(100)
  expect(ids.every(id=>/^[0-9a-f]{32}$/.test(id))).toBe(true)
  expect(readFileSync(new URL('../src/server/web/client.ts',import.meta.url),'utf8')).not.toContain('crypto.randomUUID()')
})
test('upstream send shortcuts preserve mobile newline and modifier-submit semantics', () => {
  const key = {key:'Enter',shiftKey:false,ctrlKey:false,metaKey:false}
  expect(shouldSubmitOnEnter(key,'enter')).toBe(true)
  expect(shouldSubmitOnEnter({...key,shiftKey:true},'enter')).toBe(false)
  expect(shouldSubmitOnEnter(key,'modifierEnter')).toBe(false)
  expect(shouldSubmitOnEnter({...key,metaKey:true},'modifierEnter')).toBe(true)
})
test('upstream responsive hook body is unmodified after the provenance header', () => {
  const file = readFileSync(new URL('../src/server/web/upstream/useWorkspaceAdaptiveLayout.ts',import.meta.url),'utf8')
  const source = file.slice(file.indexOf('\n')+1)
  expect(createHash('sha256').update(source).digest('hex')).toBe('61eef198f9c048e552cb83cbdec4bb4612cd03c4c48a114b25079abade708c76')
})

test('history batches validate completely before advancing the displayed cursor', () => {
  const first = event(1,'session_started')
  expect(selectContiguousEvents(0,[first,event(2,'sdk_ready')]).cursor).toBe(2)
  expect(selectContiguousEvents(1,[first,event(2,'sdk_ready')]).events.map(e=>e.seq)).toEqual([2])
  expect(()=>selectContiguousEvents(0,[first,event(3,'sdk')])).toThrow('不连续')
  expect(selectContiguousEvents(0,[first,event(2,'sdk')]).events).toHaveLength(2)
  expect(()=>selectContiguousEvents(0,[{...first,at:NaN}])).toThrow('无效')
})
