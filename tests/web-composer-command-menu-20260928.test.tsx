import { afterEach, expect, test } from 'bun:test'
import React, { createContext, useCallback, useRef, useState } from 'react'
import Reconciler from 'react-reconciler'
import { DefaultEventPriority } from 'react-reconciler/constants'
import { composerCommandMenuPosition, useComposerCommandMenu } from '../src/server/web/useComposerCommandMenu.js'

// An offline React host, not a mock of the component or its hooks. It exercises
// reconciliation, effects, refs, events and async state without a browser install.
type Props = Record<string, unknown>
class TestNode {
  children: TestNode[] = []
  style: Record<string,string> = {}
  rect = {left:300,top:540,width:650,right:950,bottom:680}
  scrollHeight = 420
  scrollTop = 0
  popoverShown = false
  focusOptions?: FocusOptions
  showPopover() { this.popoverShown = true }
  hidePopover() { this.popoverShown = false }
  getBoundingClientRect() { return this.rect }
  closest() { return this.props['data-command-menu-trigger'] ? this : null }
  constructor(public type = 'root', public props: Props = {}, public value = '') {}
  contains(node: TestNode): boolean { return this === node || this.children.some(child => child.contains(node)) }
  all(): TestNode[] { return this.children.flatMap(child => [child, ...child.all()]) }
  text(): string { return this.value + this.children.map(child => child.text()).join('') }
  focus(options?: FocusOptions) { this.focusOptions=options;fixtureDocument.activeElement = this }
  querySelectorAll(selector: string): TestNode[] {
    return this.all().filter(node => !node.props.disabled && (selector.includes('aria-checked')
      ? node.props['aria-checked'] === true : node.props.role === 'menuitemradio'))
  }
  querySelector(selector: string) { return this.querySelectorAll(selector)[0] ?? null }
}
const listeners = new Map<string, Set<(event: unknown) => void>>()
const viewportListeners = new Map<string,Set<() => void>>()
const visualListeners = new Map<string,Set<() => void>>()
const addListener = (map:Map<string,Set<() => void>>,name:string,fn:() => void) => {
  if (!map.has(name)) map.set(name,new Set())
  map.get(name)!.add(fn)
}
const fixtureView = {
  innerWidth:1280,innerHeight:720,
  addEventListener:(name:string,fn:() => void) => addListener(viewportListeners,name,fn),
  removeEventListener:(name:string,fn:() => void) => viewportListeners.get(name)?.delete(fn),
  visualViewport:{offsetLeft:0,offsetTop:0,width:1280,height:720,
    addEventListener:(name:string,fn:() => void) => addListener(visualListeners,name,fn),
    removeEventListener:(name:string,fn:() => void) => visualListeners.get(name)?.delete(fn)},
}
const fixtureDocument = {
  defaultView:fixtureView,
  activeElement: null as TestNode | null,
  addEventListener(name: string, fn: (event: unknown) => void) {
    if (!listeners.has(name)) listeners.set(name, new Set())
    listeners.get(name)!.add(fn)
  },
  removeEventListener(name: string, fn: (event: unknown) => void) { listeners.get(name)?.delete(fn) },
}
const append = (parent: TestNode, child: TestNode) => { parent.children = parent.children.filter(node => node !== child); parent.children.push(child) }
const remove = (parent: TestNode, child: TestNode) => { parent.children = parent.children.filter(node => node !== child) }
const insert = (parent: TestNode, child: TestNode, before: TestNode) => {
  remove(parent, child); parent.children.splice(parent.children.indexOf(before), 0, child)
}
type Host = Reconciler.HostConfig<string, Props, TestNode, TestNode, TestNode, never, never, never, TestNode,
  object, never, ReturnType<typeof setTimeout>, -1, null>
const context = {}
const noop = () => {}
let priority = 0
const renderer = Reconciler({
  supportsMutation: true, supportsPersistence: false, supportsHydration: false,
  isPrimaryRenderer: false, warnsIfNotActing: false,
  createInstance: (type, props) => new TestNode(type, props),
  createTextInstance: text => new TestNode('#text', {}, text),
  getRootHostContext: () => context, getChildHostContext: () => context,
  getPublicInstance: node => node, prepareForCommit: () => null, resetAfterCommit: noop,
  appendInitialChild: append, appendChild: append, appendChildToContainer: append,
  removeChild: remove, removeChildFromContainer: remove, insertBefore: insert, insertInContainerBefore: insert,
  clearContainer: node => { node.children = [] }, finalizeInitialChildren: () => false,
  shouldSetTextContent: () => false, commitUpdate: (node, _type, _old, props) => { node.props = props },
  commitTextUpdate: (node, _old, text) => { node.value = text },
  scheduleTimeout: setTimeout, cancelTimeout: clearTimeout, noTimeout: -1,
  supportsMicrotasks: true, scheduleMicrotask: queueMicrotask,
  getInstanceFromNode: () => null, beforeActiveInstanceBlur: noop, afterActiveInstanceBlur: noop,
  preparePortalMount: noop, prepareScopeUpdate: noop, getInstanceFromScope: () => null,
  detachDeletedInstance: noop, NotPendingTransition: null,
  HostTransitionContext: createContext(null) as unknown as Host['HostTransitionContext'],
  setCurrentUpdatePriority: value => { priority = value }, getCurrentUpdatePriority: () => priority,
  resolveUpdatePriority: () => priority || DefaultEventPriority, resetFormInstance: noop, requestPostPaintCallback: noop,
  shouldAttemptEagerTransition: () => false, trackSchedulerEvent: noop,
  resolveEventType: () => null, resolveEventTimeStamp: () => performance.now(),
  maySuspendCommit: () => false, preloadInstance: () => true, startSuspendingCommit: noop,
  suspendInstance: noop, waitForCommitToBeReady: () => null,
} satisfies Host)

const oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document')
const oldNode = Object.getOwnPropertyDescriptor(globalThis, 'Node')
const oldElement = Object.getOwnPropertyDescriptor(globalThis, 'Element')
const oldObserver = Object.getOwnPropertyDescriptor(globalThis, 'ResizeObserver')
const cleanups: Array<() => void> = []
afterEach(() => {
  cleanups.splice(0).forEach(cleanup => cleanup())
  for (const [name, descriptor] of [['document', oldDocument], ['Node', oldNode], ['Element', oldElement], ['ResizeObserver', oldObserver]] as const) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor)
    else Reflect.deleteProperty(globalThis, name)
  }
  listeners.clear(); viewportListeners.clear(); visualListeners.clear()
  Object.assign(fixtureView.visualViewport,{offsetLeft:0,offsetTop:0,width:1280,height:720})
  fixtureDocument.activeElement = null
})
function flush(run: () => void = noop) {
  renderer.flushSyncFromReconciler(run)
  renderer.flushPassiveEffects()
  renderer.flushSyncWork()
}

function Harness() {
  const [open, setOpen] = useState(false), [draft, setDraft] = useState('已有草稿')
  const anchor = useRef<HTMLDivElement>(null), menu = useRef<HTMLElement>(null), input = useRef<HTMLTextAreaElement>(null)
  const close = useCallback((focus: boolean) => { setOpen(false); if (focus) input.current?.focus({ preventScroll: true }) }, [])
  useComposerCommandMenu(open, menu, anchor, close)
  return <><button data-command-menu-trigger onClick={() => setOpen(true)}>顶部入口</button><div ref={anchor}>
    {open && <section ref={menu} popover="manual" role="region"><input aria-label="搜索" /></section>}
    <textarea ref={input} value={draft} onChange={event => setDraft(event.target.value)} />
    <button data-command-menu-trigger onClick={() => setOpen(true)}>输入框入口</button>
  </div></>
}
function mount() {
  const observations: TestNode[] = []
  let resize = () => {}, disconnected = false
  for (const [name, value] of Object.entries({ document: fixtureDocument, Node: TestNode, Element: TestNode,
    ResizeObserver: class { constructor(callback: () => void) { resize = callback } observe(node: TestNode) { observations.push(node) } disconnect() { disconnected = true } },
  })) Object.defineProperty(globalThis, name, { configurable: true, value })
  const tree = new TestNode(), fail = (error: Error) => { throw error }
  const root = renderer.createContainer(tree, 1, null, false, null, '', fail, fail, fail, noop)
  flush(() => renderer.updateContainer(<Harness />, root, null, null))
  const unmount = () => flush(() => renderer.updateContainer(null, root, null, null))
  cleanups.push(unmount)
  const click = (index = 0) => flush(() => (tree.all().filter(n => n.type === 'button')[index]!.props.onClick as () => void)())
  return { tree, click, menu: () => tree.all().find(n => n.type === 'section'), input: () => tree.all().find(n => n.type === 'textarea')!,
    anchor: () => tree.all().find(n => n.type === 'div')!, resize: () => resize(), observations, disconnected: () => disconnected, unmount }
}
function dispatch(name: string, event: unknown) { flush(() => listeners.get(name)?.forEach(fn => fn(event))) }

for (const [width, height, top, visualTop] of [[1280,720,540,0],[379,740,620,0],[379,320,190,0],[379,280,210,100],[320,180,45,0]]) {
  test(`geometry ${width}×${height}, composer top ${top}, visual offset ${visualTop}: never overlaps input`, () => {
    const anchor = { left: width === 1280 ? 300 : 13, top, width: width === 1280 ? 650 : width - 26 }
    const viewport = { left: 0, top: visualTop, width, height }
    const p = composerCommandMenuPosition(anchor, viewport, 1000)
    expect(p.top).toBeGreaterThanOrEqual(visualTop + 8)
    expect(p.top + p.maxHeight).toBeLessThanOrEqual(top - 6)
    expect(p.left).toBeGreaterThanOrEqual(8)
    expect(p.left + p.width).toBeLessThanOrEqual(width - 8)
    expect(p.maxHeight).toBeLessThanOrEqual(400)
  })
}
test('short contents remain attached to composer; insufficient space never flips over input', () => {
  const p = composerCommandMenuPosition({left:5,top:180,width:900},{left:10,top:20,width:379,height:300},40)
  expect(p.top + 40).toBe(174); expect(p.left).toBe(18); expect(p.width).toBe(363)
  const none = composerCommandMenuPosition({left:0,top:3,width:379},{left:0,top:0,width:379,height:320},500)
  expect(none.maxHeight).toBe(0); expect(none.bottom).toBeLessThan(3)
})
test('both entry paths open the same non-modal surface; composer stays editable', () => {
  for (const index of [0,1]) {
    const view = mount(); view.click(index)
    const panel = view.menu()!
    expect(panel.popoverShown).toBe(true); expect(panel.props.role).toBe('region'); expect(panel.props['aria-modal']).toBeUndefined()
    expect(view.input().props.disabled).toBeUndefined()
    flush(() => (view.input().props.onChange as (event: {target:{value:string}}) => void)({target:{value:'继续编辑'}}))
    expect(view.input().props.value).toBe('继续编辑'); expect(view.menu()).toBe(panel)
    expect(panel.style.bottom).toBe('186px'); expect(panel.style.width).toBe('650px')
    view.unmount(); expect(panel.popoverShown).toBe(false)
  }
})
test('resize, visual keyboard pan/resize and composer resize recalculate constrained position', () => {
  const view = mount(); view.click()
  const panel = view.menu()!
  Object.assign(fixtureView.visualViewport,{offsetLeft:0,offsetTop:60,width:379,height:300})
  view.anchor().rect = {left:13,top:225,width:353,right:366,bottom:350}
  visualListeners.get('resize')?.forEach(fn => fn())
  expect(panel.style.width).toBe('353px'); expect(panel.style.maxHeight).toBe('151px'); expect(panel.style.bottom).toBe('501px')
  view.anchor().rect.top = 205; visualListeners.get('scroll')?.forEach(fn => fn())
  expect(panel.style.maxHeight).toBe('131px')
  view.anchor().rect.top = 195; view.resize(); expect(panel.style.maxHeight).toBe('121px')
  view.anchor().rect.top = 185; viewportListeners.get('resize')?.forEach(fn => fn()); expect(panel.style.maxHeight).toBe('111px')
  expect(view.observations).toContain(view.anchor()); expect(view.observations).toContain(panel)
  view.unmount(); expect(view.disconnected()).toBe(true)
  for (const map of [viewportListeners,visualListeners,listeners]) expect([...map.values()].every(set => !set.size)).toBe(true)
})
test('Escape returns to draft without scrolling; IME Escape does not close', () => {
  const view = mount(); view.click(); let prevented = 0, stopped = 0
  const event = {key:'Escape',isComposing:true,keyCode:229,preventDefault:()=>prevented++,stopPropagation:()=>stopped++}
  dispatch('keydown',event); expect(view.menu()).toBeDefined()
  dispatch('keydown',{...event,isComposing:false,keyCode:27})
  expect(view.menu()).toBeUndefined(); expect(prevented).toBe(1); expect(stopped).toBe(2)
  expect(fixtureDocument.activeElement).toBe(view.input()); expect(view.input().focusOptions).toEqual({preventScroll:true})
  expect(view.input().props.value).toBe('已有草稿')
})
test('composer/trigger/menu pointers keep panel open; outside closes without stealing focus', () => {
  const view = mount(); view.click()
  for (const target of [view.input(),view.menu(),view.tree.all().find(n=>n.type==='button')]) {
    dispatch('pointerdown',{target}); expect(view.menu()).toBeDefined()
  }
  const outside = new TestNode('button'); fixtureDocument.activeElement = outside
  dispatch('pointerdown',{target:outside}); expect(view.menu()).toBeUndefined(); expect(fixtureDocument.activeElement).toBe(outside)
})
test('App routes both entries above composer, preserves slash/chip/send contract and clipboard sites', async () => {
  const app = await Bun.file(new URL('../src/server/web/App.tsx',import.meta.url)).text()
  const menu = app.slice(app.indexOf('{commandOpen && <section'), app.indexOf('{slashCandidates.length>0 &&'))
  expect(menu).toContain('popover="manual"'); expect(menu).not.toContain('modal-backdrop'); expect(menu).not.toContain('aria-modal')
  expect(app.match(/data-command-menu-trigger aria-expanded/g)).toHaveLength(2)
  expect(app).toContain('canControl && !commandOpen && !slashDismissed ? getSlashCandidates')
  expect(app).toContain("if(e.target.value.startsWith('/'))setCommandOpen(false)")
  expect(app).toContain('disabled={!selected || !canControl}')
  const choose = app.slice(app.indexOf('const chooseCommand'),app.indexOf('const addAttachments'))
  expect(choose).toContain('applySlashDraft({...draft,input})'); expect(choose).not.toContain('api.'); expect(choose).not.toContain('send(')
  expect(app).toContain('api.turn(owner, operation.id, content, slashSerialized.intent)')
  expect(app.match(/<CopyButton /g)).toHaveLength(4)
  const css = await Bun.file(new URL('../src/server/web/styles.css',import.meta.url)).text()
  expect(css).toContain('.composer-command-palette::backdrop { display:none; }')
  expect(css).toContain('overscroll-behavior:contain')
})

// Evaluate only App's pure filter predicate, with the real existing availability gate.
// This catches a missing App hookup rather than testing a second copied menu implementation.
for (const advertised of [false, true]) {
  test(`private tag menu entry follows the existing advertised control: ${advertised}`, async () => {
    const { PUBLIC_COMMANDS, publicCommandAvailable } = await import('../src/server/web/publicCommandAdapters.js')
    const capabilities: import('../src/server/web/client.js').Capabilities = {
      commands: [{name:'tag',description:'Tag'}], models: [], sdkCapabilities: [], tools: [],
      outputStyle:'default', availableOutputStyles:['default'],
      localWeb:{version:1,controls:advertised ? ['local_public_tag'] : []},
    }
    const app = await Bun.file(new URL('../src/server/web/App.tsx',import.meta.url)).text()
    const predicate = app.match(/PUBLIC_COMMANDS\.filter\((.*?)\)\.map/)?.[1]
    expect(predicate).toBe("name => name !== 'tag' || publicCommandAvailable(name, capabilities)")
    const filter = new Function('capabilities', 'publicCommandAvailable', `return (${predicate})`)(capabilities, publicCommandAvailable) as (name: typeof PUBLIC_COMMANDS[number]) => boolean
    const visible = PUBLIC_COMMANDS.filter(filter)
    expect(visible.includes('tag')).toBe(advertised)
    expect(publicCommandAvailable('tag',capabilities)).toBe(advertised)
    expect(visible.filter(name=>name!=='tag')).toEqual(PUBLIC_COMMANDS.filter(name=>name!=='tag'))
    // Same command array with a changed capability catalog must invalidate the menu memo.
    expect(app).toContain('], [commands, capabilities.localWeb?.controls])')
    // SDK duplicates cannot reintroduce the filtered private public entry.
    expect(app).toContain('commands.filter(command => !PUBLIC_COMMANDS.some(name => name === command.name))')
  })
}


test('desktop menu exactly matches the full composer width and left edge', () => {
  const p = composerCommandMenuPosition({left:365,top:600,width:740},{left:0,top:0,width:1280,height:720},900)
  expect(p.width).toBe(740); expect(p.left).toBe(365)
  expect(p.bottom).toBe(594); expect(p.maxHeight).toBe(400)
  const narrow = composerCommandMenuPosition({left:13,top:420,width:353},{left:0,top:0,width:379,height:740},900)
  expect(narrow.width).toBe(353); expect(narrow.left + narrow.width).toBeLessThanOrEqual(371)
})
test('compact list omits duplicate names/boilerplate, retains full descriptions and all interaction wiring', async () => {
  const app = await Bun.file(new URL('../src/server/web/App.tsx',import.meta.url)).text()
  const menu = app.slice(app.indexOf('{commandOpen && <section'),app.indexOf('{slashCandidates.length>0 &&'))
  expect(menu).toContain("entry.kind === 'public' ? entry.label : entry.description")
  expect(menu).toContain('title={['); expect(menu).toContain('aria-label={[')
  expect(menu).not.toContain('<small>{entry.description}</small>')
  expect(app).not.toContain('会话操作 · /')
  expect(app).toContain("command.description ?? command.argumentHint ?? '当前执行器指令'")
  expect(menu).toContain('onClick={() => chooseCommand(entry)}')
  const css = await Bun.file(new URL('../src/server/web/styles.css',import.meta.url)).text()
  expect(css).toContain('.composer-command-palette .palette-results button { display:flex;')
  expect(css).toContain('min-height:36px; padding:7px 9px; line-height:20px;')
  expect(css).toContain('.composer-slash-menu { left:-1px; right:-1px; width:auto; max-width:none; }')
})

test('latest desktop geometry uses 680px content and equal-width composer/menu, with the current uniform font policy', async () => {
  const p = composerCommandMenuPosition({left:400,top:580,width:680},{left:0,top:0,width:1280,height:720},900)
  expect(p.width).toBe(680); expect(p.left).toBe(400); expect(p.left+p.width).toBe(1080)
  expect(p.bottom).toBe(574)
  const css = await Bun.file(new URL('../src/server/web/styles.css',import.meta.url)).text()
  expect(css).toContain('--content-width:730px;'); expect(css).toContain('--page-gutter: 25px;')
  expect(css).toContain('--font-body:14px;'); expect(css).toContain('--input-font:16px;')
})

test('uniform workspace font boundary covers user, assistant, thinking, tools, menus and metadata; phone editors stay 16', async () => {
  const css = await Bun.file(new URL('../src/server/web/styles.css',import.meta.url)).text()
  expect(css).toContain('.workspace, .workspace :where(*) { font-size:14px !important; }')
  expect(css).toContain('.workspace :is(input,textarea,select) { font-size:16px !important; }')
  expect(css).toContain('.workspace :is(.record-content,.thinking-body,.plain-text,.raw,.tool-call-input-summary) { line-height:1.6; }')
  expect(css.lastIndexOf('font-size:16px !important')).toBeGreaterThan(css.lastIndexOf('font-size:14px !important'))
})
