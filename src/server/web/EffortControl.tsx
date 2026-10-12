import type {SharedEffortState} from '../sharedEffortState.js'

const labels:Record<string,string>={low:'低',medium:'中',high:'高',xhigh:'极高 · xhigh',max:'最高 · max'}
const label=(value:string|number|null)=>value===null?'未启用':labels[value]??String(value)

/** Choices and applied value come from the shared owner, never browser model guesses. */
export function EffortControl({state,disabled,onChange}:{state:SharedEffortState;disabled?:boolean;onChange:(value:string)=>void}) {
  if(!state.available?.length)return null
  const selected=state.selection==='default'?'auto':String(state.selection)
  const known=selected==='auto'||state.available.includes(selected as typeof state.available[number])
  return <section className="settings-effort">
    <label className="ask-text-label"><span>思考强度</span>
      <select aria-label="思考强度" value={selected} disabled={disabled} onChange={event=>onChange(event.currentTarget.value)}>
        {!known&&<option value={selected} disabled>{selected==='inherit'?'沿用已有设置':`当前选择：${label(state.selection)}`}</option>}
        <option value="auto">自动</option>
        {state.available.map(value=><option key={value} value={value}>{label(value)}</option>)}
      </select>
    </label>
    <small>当前实际：{label(state.applied)} · 仅此会话</small>
  </section>
}
