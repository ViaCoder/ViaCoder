import {useCallback,useEffect,useId,useRef,useState} from 'react'
import {useAnchoredPopover} from './useAnchoredPopover.js'
export type ModelPickerProps={currentModel?:string;currentModelChoice?:string;models:Array<{value?:string;displayName?:string;disabled?:boolean}>;disabled?:boolean;pendingModel?:string;onChange:(value:string)=>Promise<void>}

/** Worker-confirmed options/value only. No account/model discovery or defaults here. */
export function ModelPicker({currentModel,currentModelChoice,models,disabled,pendingModel,onChange}:ModelPickerProps) {
  const [open,setOpen]=useState(false),[pending,setPending]=useState<string|null>(null),[error,setError]=useState('')
  const root=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null),menu=useRef<HTMLDivElement>(null)
  const alive=useRef(true),locked=useRef(false),id=useId()
  const close=useCallback(()=>setOpen(false),[])
  const choices=[...new Map(models.filter(m=>typeof m.value==='string'&&m.value).map(m=>[m.value!,m])).values()]
  const selectedValue=choices.some(m=>m.value===currentModelChoice)?currentModelChoice:currentModel
  const unavailable=Boolean(disabled||pending||!choices.length)
  useAnchoredPopover(open,menu,trigger,close)
  useEffect(()=>{alive.current=true;return()=>{alive.current=false}},[])
  const focusOption=(button?:HTMLButtonElement|null)=>{
    button?.focus({preventScroll:true})
    if(!button||!menu.current)return
    const item=button.getBoundingClientRect(),box=menu.current.getBoundingClientRect()
    if(item.top<box.top)menu.current.scrollTop-=box.top-item.top
    else if(item.bottom>box.bottom)menu.current.scrollTop+=item.bottom-box.bottom
  }
  useEffect(()=>{
    if(!open)return
    const outside=(event:PointerEvent)=>{if(event.target instanceof Node&&!root.current?.contains(event.target))close()}
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();trigger.current?.focus({preventScroll:true})}}
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape,true)
    focusOption(menu.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]:not(:disabled)')??menu.current?.querySelector<HTMLButtonElement>('[role="menuitemradio"]:not(:disabled)'))
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape,true)}
  },[open,close])
  const select=async(value:string)=>{
    if(!alive.current||locked.current||unavailable||!choices.some(m=>m.value===value&&!m.disabled))return
    if(value===selectedValue){close();trigger.current?.focus({preventScroll:true});return}
    locked.current=true;setPending(value);setError('')
    try{await onChange(value);if(alive.current){const returnFocus=menu.current?.contains(document.activeElement);close();if(returnFocus)trigger.current?.focus({preventScroll:true})}}
    catch(cause){if(alive.current)setError(cause instanceof Error?cause.message:String(cause))}
    finally{if(alive.current){locked.current=false;setPending(null)}}
  }
  const label=choices.find(m=>m.value===selectedValue)?.displayName||currentModel|| (pendingModel?`读取中：${pendingModel}`:'等待执行器确认')
  return <div className="model-picker permission-mode-picker" ref={root} aria-busy={Boolean(pending)}>
    <button type="button" ref={trigger} className="secondary permission-mode-picker-trigger model-picker-trigger" aria-label={`模型：${label}`} aria-haspopup="menu" aria-expanded={open} aria-controls={id} disabled={unavailable} title={label} onClick={()=>setOpen(value=>!value)}>
      <span className="model-picker-caption">模型：</span><span className="model-picker-value">{label}</span><span aria-hidden="true">▾</span>
    </button>
    {open&&<div ref={menu} id={id} popover="manual" role="menu" aria-label="模型" className="permission-mode-picker-menu model-picker-menu"
      onBlur={event=>{if(event.relatedTarget instanceof Node&&!root.current?.contains(event.relatedTarget))close()}}
      onKeyDown={event=>{
        if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return
        event.preventDefault()
        const buttons=Array.from(menu.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]:not(:disabled)')??[])
        const index=buttons.findIndex(button=>button===document.activeElement)
        const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length
        focusOption(buttons[next])
      }}>
      {currentModel&&!choices.some(m=>m.value===selectedValue)&&<p className="model-picker-unlisted">当前：{currentModel} · 不在执行器可选列表中</p>}
      {choices.map(model=><button key={model.value} type="button" role="menuitemradio" aria-checked={model.value===selectedValue} className="permission-mode-picker-option" disabled={unavailable||model.disabled===true} onClick={()=>void select(model.value!)}>
        <strong>{model.displayName||model.value}{model.value===selectedValue?' ✓':''}</strong><small>{model.value}{model.disabled ? ' · 当前不可用' : ''}</small>
      </button>)}
    </div>}
    {pending&&<small className="permission-mode-picker-status" role="status">正在请求切换，等待执行器确认。</small>}
    {error&&<small className="permission-mode-picker-error" role="alert">{error}</small>}
  </div>
}
