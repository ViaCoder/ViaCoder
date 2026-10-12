import * as React from 'react'
import * as compilerRuntime287 from 'react/compiler-runtime'
import {jsx} from 'react/jsx-runtime'
import {executionLifecycle287} from '../services/context/execution287.js'
import {createExecutionProjectContext287} from './officialExecutionProject287/native.js'

// Original contexts own subscriptions only. Their reads refer to the existing
// canonical session/project; there is no second project state or writer.
const context=createExecutionProjectContext287({
 w:(compilerRuntime287 as unknown as {c(size:number):unknown[]}).c,
 g:React.useState,e:jsx,jt:React.createContext,ke:React.useContext,
 A:React.useRef,kt:React.useSyncExternalStore,Es:executionLifecycle287.requireProject,
})
export const ExecutionSessionProvider287=context.SessionProvider
export const HostProjectProvider287=context.HostProjectProvider
export const useExecutionHost287=context.useHost
export const useExecutionProject287=context.useProject
export const useOptionalExecutionSession287=context.useOptionalSession
export const useExecutionSession287=context.useSession
