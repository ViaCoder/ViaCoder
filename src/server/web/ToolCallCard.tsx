import type {ReactNode} from 'react'
import type {WebAPI} from './client.js'
import {formatValue, type RecordView} from './records.js'
import {RecordStatus} from './RecordStatus.js'
import {RecordedOutput} from './RecordedOutput.js'
import {hasPersistedOutputMarker,recordedOutputReferenceForBlock} from './recordedOutputReference.js'
import {approvalLabel,type ToolCallGroup} from './toolCallGrouping.js'

export function ToolCallCard({group,api,expanded,onToggle,onInspect,renderApproval}:{
  group:ToolCallGroup;api:WebAPI;expanded:boolean;onToggle():void;onInspect():void;
  renderApproval(record:RecordView):ReactNode
}) {
  return <article className="record tool-call-record" data-tool-call={group.key} data-status={group.status}>
    <details className="tool-call-details" open={expanded}>
      <summary className="tool-call-summary" onClick={event=>{event.preventDefault();onToggle()}}>
        <strong>{group.name}</strong>{group.sourceLabel&&<small className="tool-call-source">{group.sourceLabel}</small>}<RecordStatus status={group.status}/>
        <span className="tool-call-disclosure">{expanded?'收起':'展开'}</span><span className="tool-call-input-summary">{group.summary}</span>
      </summary>
      {expanded && <div className="tool-call-values">
        {group.calls.map(({block},i)=><section key={`input:${i}`}><strong>完整输入</strong><pre className="raw">{formatValue(block)}</pre></section>)}
        {group.results.map(({record,block},i)=>{const reference=recordedOutputReferenceForBlock(record,block)
          return <section key={`output:${record.id}:${i}`}><strong>完整输出</strong><pre className="raw">{formatValue(block)}</pre>{reference?<RecordedOutput api={api} reference={reference}/>:hasPersistedOutputMarker(block)?<p className="recorded-output-missing" role="alert">外置输出引用未随此记录保存；未重新执行工具。</p>:null}</section>})}
        {!group.results.length&&<p>{group.status==='等待审批'?'等待审批，尚无工具结果。':group.status==='执行中'||group.status.includes('等待工具结果')?'正在等待工具返回结果。':'结果未记录；未重新执行工具。'}</p>}
        {group.approvals.map(record=><section key={record.id}><strong>原始审批请求 · {approvalLabel(record,group.decisions)}</strong><pre className="raw">{formatValue(record.event)}</pre></section>)}
        <button className="tool-call-inspect" type="button" onClick={onInspect}>查看调用原始事件</button>
      </div>}
    </details>
    {group.approvals.filter(record=>!group.results.length&&approvalLabel(record,group.decisions)==='等待审批').map(record=><div className="tool-call-approval" key={record.id}>{renderApproval(record)}</div>)}
  </article>
}
