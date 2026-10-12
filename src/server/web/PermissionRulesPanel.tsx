import React, { useState } from 'react'
import type { PermissionRulesState } from '../../cli/control/permissionRules.js'

const behaviorLabel = { allow: '允许', ask: '询问', deny: '拒绝' } as const
const sourceLabel: Record<string, string> = {
  userSettings: '用户设置', projectSettings: '项目设置', localSettings: '本地设置',
  policySettings: '管理策略', flagSettings: '启动设置', cliArg: '命令行',
  command: '命令', session: '本次会话', toolsNarrowing: '工具限制',
  mcpServerPolicy: 'MCP 策略', hostCredential: '宿主凭据',
}

/** The worker's existing list_permission_rules state, not a local settings mirror. */
type RuleUpdate = {type:'addRules'|'removeRules'; behavior:'allow'|'ask'|'deny';
  destination:'userSettings'|'projectSettings'|'localSettings'|'session'|'cliArg';
  rules?:Array<{toolName:string;ruleContent?:string}>; ruleText?:string}
export function PermissionRulesPanel({ state, onClose, onRefresh, onUpdate, editable, busy }: {
  state: PermissionRulesState; onClose(): void; onRefresh(): void; onUpdate(update:RuleUpdate):void;
  editable: boolean; busy: boolean
}) {
  const [behavior, setBehavior] = useState<RuleUpdate['behavior']>('allow')
  const [destination, setDestination] = useState<RuleUpdate['destination']>('session')
  const [toolName, setToolName] = useState(''), [ruleContent, setRuleContent] = useState('')
  return <section className="permission-rules-panel" aria-label="权限规则">
    <header><strong>当前执行器的权限规则</strong><div><button className="secondary" disabled={busy} onClick={onRefresh}>刷新</button><button className="secondary" onClick={onClose}>关闭</button></div></header>
    {state.managedOnly && <p>管理策略限制了用户规则的生效范围；下列标记为未生效的规则仅供查看。</p>}
    {state.rules.length ? <ul>{state.rules.map((rule, index) => <li key={`${rule.source}-${rule.behavior}-${rule.rule}-${index}`}>
      <span className={`permission-behavior permission-${rule.behavior}`}>{behaviorLabel[rule.behavior]}</span>
      <code>{rule.rule}</code><small>{sourceLabel[rule.source] ?? rule.source} · {rule.editability === 'readonly' ? '只读' : rule.editability === 'session' ? '会话规则' : '持久规则'}{rule.notInEffect ? ' · 未生效' : ''}</small>
      {editable && !busy && !state.managedOnly && rule.editability !== 'readonly' &&
        ['userSettings','projectSettings','localSettings','session','cliArg'].includes(rule.source) &&
        <button className="secondary" aria-label={`删除规则 ${rule.rule}`} onClick={() => onUpdate({type:'removeRules',behavior:rule.behavior,
          destination:rule.source as RuleUpdate['destination'],ruleText:rule.rule})}>删除</button>}
      {rule.description && <p>{rule.description.prefix}<strong>{rule.description.emphasis}</strong>{rule.description.suffix}</p>}
    </li>)}</ul> : <p>当前执行器没有列出规则。</p>}
    {editable && !state.managedOnly && <form className="permission-rule-editor" onSubmit={event => {
      event.preventDefault(); if (!toolName.trim() || busy) return
      onUpdate({type:'addRules',behavior,destination,rules:[{toolName:toolName.trim(),...(ruleContent ? {ruleContent} : {})}]})
    }}><strong>添加规则</strong><label>处理方式<select aria-label="规则处理方式" value={behavior} onChange={event => setBehavior(event.target.value as RuleUpdate['behavior'])}><option value="allow">允许</option><option value="ask">询问</option><option value="deny">拒绝</option></select></label>
      <label>保存位置<select aria-label="规则保存位置" value={destination} onChange={event => setDestination(event.target.value as RuleUpdate['destination'])}><option value="session">本次会话</option><option value="userSettings">用户设置</option><option value="projectSettings">项目设置</option><option value="localSettings">本地设置</option></select></label>
      <label>工具名称<input aria-label="规则工具名称" value={toolName} onChange={event => setToolName(event.target.value)} required /></label>
      <label>匹配内容（可留空）<input aria-label="规则匹配内容" value={ruleContent} onChange={event => setRuleContent(event.target.value)} /></label><button className="secondary" disabled={busy || !toolName.trim()}>添加</button></form>}
    {!editable && <p>当前执行器未公布本地规则编辑能力；规则仅供查看。</p>}
    {state.workspaceDirectories.length > 0 && <details><summary>工作目录 · {state.workspaceDirectories.length}</summary><ul>{state.workspaceDirectories.map((item, index) => <li key={`${item.path}-${index}`}><code>{item.path}</code><small>{item.source}</small></li>)}</ul></details>}
    {state.errors?.length ? <details><summary>设置读取错误 · {state.errors.length}</summary><ul>{state.errors.map((error, index) => <li key={index}><code>{error.path}</code><small>{error.message}</small></li>)}</ul></details> : null}
  </section>
}
