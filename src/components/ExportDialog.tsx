import * as React from 'react'
import {getExportCommandRuntime287} from '../commands/export/runtime287.js'
import {ExecutionSessionProvider287} from '../context/executionProject287.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import type {ExportDialogProps287} from '../commands/export/officialExport287/native.js'

/** Whole pinned S owns menu, file input, cancellation and asynchronous writer. */
export function ExportDialog(props:ExportDialogProps287):React.ReactNode{
 const Dialog=getExportCommandRuntime287().Dialog
 return <ExecutionSessionProvider287 session={getExecutionSession287()}><Dialog {...props}/></ExecutionSessionProvider287>
}
