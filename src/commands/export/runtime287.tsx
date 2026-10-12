import * as React from 'react'
import * as compilerRuntime287 from 'react/compiler-runtime'
const cache=(compilerRuntime287 as unknown as {c(size:number):unknown[]}).c
import {jsx,jsxs} from 'react/jsx-runtime'
import {mkdir,writeFile} from 'node:fs/promises'
import {dirname,extname} from 'node:path'
import stripAnsi from 'strip-ansi'
import Box from '../../ink/components/Box.js'
import Text from '../../components/design-system/ThemedText.js'
import {getOriginalCwd} from '../../bootstrap/state.js'
import {getExecutionSession287,runWithExecutionSession287} from '../../services/context/execution287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {expandPath} from '../../utils/path.js'
import type {streamRenderedMessages} from '../../utils/exportRenderer.js'
import {useTerminalSize} from '../../hooks/useTerminalSize.js'
import {useExecutionProject287} from '../../context/executionProject287.js'
import {setClipboard} from '../../ink/termio/osc.js'
import {useKeybinding} from '../../keybindings/useKeybinding.js'
import {Select} from '../../components/CustomSelect/select.js'
import {Byline} from '../../components/design-system/Byline.js'
import {Dialog} from '../../components/design-system/Dialog.js'
import {KeyboardShortcutHint} from '../../components/design-system/KeyboardShortcutHint.js'
import {ConfigurableShortcutHint} from '../../components/ConfigurableShortcutHint.js'
import TextInput from '../../components/TextInput.js'
import {logEvent} from '../../services/analytics/index.js'
import {createExportCommand287} from './officialExport287/native.js'

let runtime:ReturnType<typeof createExportCommand287>|undefined
export function getExportCommandRuntime287(){return runtime??=createExportCommand287({
 ae:extname,b$:()=>getExecutionSession287().surfaceCapabilities.caps(),Ee:getOriginalCwd,Xe:expandPath,
 re:mkdir,se:dirname,ie:writeFile,w:cache,g:React.useState,ve:useTerminalSize,fw:useExecutionProject287,
 b:Symbol.for('react.memo_cache_sentinel'),xw:setClipboard,y:(name:string)=>logEvent(name,{}),m:(name:string,reason:string)=>logEvent(name,{write_failed:reason==='write_failed'}),
 r:jsxs,e:jsx,be:Byline,j:({chord,...props}:React.ComponentProps<typeof KeyboardShortcutHint>&{chord:string})=><KeyboardShortcutHint {...props} shortcut={chord}/>,et:ConfigurableShortcutHint,We:useKeybinding,
 $e:Select,s:Box,n:Text,sr:TextInput,he:({inputGuide,...props}:Omit<React.ComponentProps<typeof Dialog>,'inputGuide'>&{inputGuide:React.ReactNode})=><Dialog {...props} inputGuide={()=>inputGuide}/>,en:stripAnsi,
 // The complete gE stream uses this original session; its scoped C display
 // preserves full transcript/details without replacing the Gy/Ree owners.
 gE:async(session:ExecutionSession287,messages:Parameters<typeof streamRenderedMessages>[0],tools:Parameters<typeof streamRenderedMessages>[1],sink:Parameters<typeof streamRenderedMessages>[2],options:Parameters<typeof streamRenderedMessages>[3])=>runWithExecutionSession287(session,async()=>{const {streamRenderedMessages}=await import('../../utils/exportRenderer.js');return streamRenderedMessages(messages,tools,sink,{...options,session})}),
})}
