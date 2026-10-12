import { expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { RecordCard } from '../src/server/web/App.js'
import { WebAPI } from '../src/server/web/client.js'
import type { RecordView } from '../src/server/web/records.js'
const body = 'COMPLETE_SUMMARY_START\n' + 'unchanged summary\n'.repeat(300) + 'COMPLETE_SUMMARY_END'
const record: RecordView = {id:'summary',kind:'system',title:'上下文摘要',text:body,notice:true,compactSummary:true,at:1,event:{seq:1,at:1,type:'sdk',message:{type:'user',isSynthetic:true,message:{content:body}}}}
function card(full:boolean) {return <RecordCard record={record} decision="等待审批" full={full} api={new WebAPI('','http://127.0.0.1:9')} presentations={new Map()} resolved actionKey="summary" actionState={{busy:false,error:''}} setActionState={()=>{}} expanded={new Set()} toggleExpanded={()=>{}} onInspect={()=>{}} onApprove={async()=>{}} onGetPlan={async()=>({exists:false})} onElicit={async()=>{}} />}
test('ordinary summary has a named disclosure, while full detail shows all original text without another click',()=>{
 const normal=renderToStaticMarkup(card(false)), full=renderToStaticMarkup(card(true))
 expect(normal).toContain('查看完整压缩摘要');expect(normal).not.toContain('COMPLETE_SUMMARY_END');expect(normal).toContain('record-system')
 expect(full).toContain('COMPLETE_SUMMARY_END');expect(full).not.toContain('查看完整压缩摘要');expect(full).toContain('原始事件')
})
