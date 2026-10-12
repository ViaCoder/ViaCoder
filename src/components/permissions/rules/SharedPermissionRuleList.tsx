import React, {useEffect, useRef, useState} from 'react'
import {Box, Text} from '../../../ink.js'
import {Select} from '../../CustomSelect/select.js'
import {Tab, Tabs, useTabHeaderFocus} from '../../design-system/Tabs.js'
import {PermissionRuleInput} from './PermissionRuleInput.js'
import type {PermissionRuleRow, PermissionRulesState} from '../../../cli/control/permissionRules.js'
import type {SharedSessionCommandHost, SharedRuleUpdate} from '../../../server/sharedSessionCommandHost.js'
import type {PermissionUpdateDestination} from '../../../types/permissions.js'
import {permissionRuleValueFromString} from '../../../utils/permissions/permissionRuleParser.js'
import type {PermissionRuleValue} from '../../../utils/permissions/PermissionRule.js'

type Behavior = 'allow' | 'ask' | 'deny'
type View = {kind: 'list'} | {kind: 'input'; behavior: Behavior} |
  {kind: 'destination'; behavior: Behavior; rule: PermissionRuleValue} | {kind: 'details'; row: PermissionRuleRow}

function RulesTab({state, behavior, onAdd, onRow, onExit}: {
  state: PermissionRulesState; behavior: Behavior; onAdd(): void; onRow(row: PermissionRuleRow): void; onExit(): void
}) {
  const {headerFocused, focusHeader} = useTabHeaderFocus()
  const rows = state.rules.filter(row => row.behavior === behavior)
  return <Box flexDirection="column">
    <Text>{behavior === 'deny' ? 'Claude Code will always reject requests to use denied tools.' :
      behavior === 'allow' ? 'Allowed tools in the connected session.' : 'Tools requiring approval in the connected session.'}</Text>
    <Select isDisabled={headerFocused} onUpFromFirstItem={focusHeader} onCancel={onExit}
      options={[...(state.managedOnly ? [] : [{value: 'add', label: 'Add a new rule'}]),
        ...rows.map((row, index) => ({value: String(index), label: row.rule,
          description: `${row.source} · ${row.editability}${row.notInEffect ? ' · not in effect' : ''}`})),
        {value: 'back', label: 'Close'}]}
      onChange={(value: string) => value === 'add' ? onAdd() : value === 'back' ? onExit() : onRow(rows[Number(value)]!)} />
  </Box>
}

/** Owner wire state only. The ordinary PermissionRuleList remains untouched. */
export function SharedPermissionRuleList({host, onExit}: {host: SharedSessionCommandHost; onExit(): void}) {
  const [state, setState] = useState<PermissionRulesState>()
  const [view, setView] = useState<View>({kind: 'list'})
  const [tab, setTab] = useState('allow')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const alive = useRef(false), version = useRef(0), pending = useRef<AbortController | null>(null)
  useEffect(() => {
    alive.current = true
    let unsubscribe: (() => void) | undefined
    const controller = new AbortController(); pending.current = controller
    const observed = version.current
    try {
      unsubscribe = host.subscribePermissionRules(next => {version.current++; if (alive.current) setState(next)})
      void host.listPermissionRules(controller.signal).then(next => {
        if (alive.current && !controller.signal.aborted && observed === version.current) setState(next)
      }).catch(cause => {if (alive.current && !controller.signal.aborted) setError(String(cause))})
    } catch (cause) {setError(String(cause))}
    return () => {alive.current = false; controller.abort(); pending.current?.abort(); unsubscribe?.()}
  }, [host])
  const close = () => {alive.current = false; pending.current?.abort(); onExit()}
  async function update(change: SharedRuleUpdate) {
    if (busy) return
    setBusy(true); setError('')
    const controller = new AbortController(); pending.current = controller
    const observed = version.current
    try {
      const next = await host.updatePermissionRules(change, controller.signal)
      if (alive.current && !controller.signal.aborted) {
        if (observed === version.current) setState(next)
        setView({kind: 'list'})
      }
    } catch (cause) {
      if (alive.current && !controller.signal.aborted) setError(`${String(cause)}. Reopen to refresh before retrying.`)
    } finally {if (alive.current) setBusy(false)}
  }
  const back = () => {setError(''); setView({kind: 'list'})}
  const destinations: PermissionUpdateDestination[] = ['session', 'userSettings', 'projectSettings', 'localSettings']
  return <Box flexDirection="column">
    <Text bold>Connected session permissions</Text>
    {state && <Text dimColor>Owner workspace: {state.originalCwd}</Text>}
    {error && <Text color="error">{error}</Text>}
    {state?.errors?.map((item, index) => <Text key={index} color="error">{item.message}</Text>)}
    {busy ? <><Text>Waiting for owner confirmation…</Text><Select options={[{value: 'close', label: 'Close (does not undo a sent update)'}]} onChange={close} onCancel={close}/></> :
      !state ? <><Text>{error ? 'Owner rules unavailable; no local fallback.' : 'Loading owner rules…'}</Text><Select options={[{value: 'close', label: 'Close'}]} onChange={close} onCancel={close}/></> :
      view.kind === 'input' ? <PermissionRuleInput ruleBehavior={view.behavior} onCancel={back}
        onSubmit={(rule: PermissionRuleValue, behavior: Behavior) => setView({kind: 'destination', rule, behavior})}/> :
      view.kind === 'destination' ? <><Text>Save rule on owner</Text><Select onCancel={back}
        options={[...destinations.map(value => ({value, label: value === 'session' ? 'This session only' : value})), {value: 'cancel', label: 'Cancel'}]}
        onChange={(value: string) => {
          const destination = destinations.find(item => item === value)
          if (destination) void update({type: 'addRules', behavior: view.behavior, rules: [view.rule], destination})
          else back()
        }}/></> :
      view.kind === 'details' ? <><Text>{view.row.rule} · {view.row.source}</Text>
        <Select onCancel={back} options={[...(view.row.editability === 'readonly' || view.row.notInEffect || state.managedOnly ? [] : [{value: 'delete', label: 'Delete this rule on owner'}]), {value: 'cancel', label: 'Cancel'}]}
          onChange={(value: string) => {
            if (value !== 'delete') return back()
            const destination = [...destinations, 'cliArg' as const].find(item => item === view.row.source)
            if (destination) void update({type: 'removeRules', behavior: view.row.behavior,
              rules: [permissionRuleValueFromString(view.row.rule)], destination})
          }}/></> :
      <Tabs title="Permissions:" selectedTab={tab} onTabChange={setTab} navFromContent>
        {(['allow', 'ask', 'deny'] as const).map(behavior => <Tab key={behavior} id={behavior} title={behavior[0]!.toUpperCase() + behavior.slice(1)}>
          <RulesTab state={state} behavior={behavior} onExit={close} onAdd={() => setView({kind: 'input', behavior})} onRow={row => setView({kind: 'details', row})}/>
        </Tab>)}
      </Tabs>}
  </Box>
}
