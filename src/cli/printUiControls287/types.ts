import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {PrintPublicSubscriptions287,SourceUiPanes287} from '../printOwnership287/publicHostNative.js'

/** Wire validation belongs to the sixteen original canonical schemas. */
export type PrintUiSourceRead287=(file:string,name:string)=>unknown
export interface PrintUiSources287 {
 readonly source:Readonly<Record<string,unknown>>
 readonly renderHooksModule:{hasRenderHooks:unknown}
 verifyBorrowed():{file:string;name:string;value:unknown}[]
}
export interface PrintUiPublicSubscriptions287 extends PrintPublicSubscriptions287 {
 /** The original Pf, in the same closure as Pb, ta, ya and Uu. */
 publishPanes(panes:SourceUiPanes287):void
}
export interface PrintUiLexicalPorts287 {
 Pf:PrintUiPublicSubscriptions287['publishPanes']
 panesRevision:PrintPublicSubscriptions287['panesRevision']
 mo:Map<string,AbortController>
 executionSession:ExecutionSession287
 We(message:SDKControlRequest,error:string):void
 Ze(message:SDKControlRequest,response?:Record<string,unknown>):void
}
export type PrintUiDetached287=(work:()=>Promise<void>)=>void
export interface PrintUiDispatcher287 {
 readonly mo:PrintUiLexicalPorts287['mo']
 dispatch(frame:SDKControlRequest,detached:PrintUiDetached287):Promise<boolean>
}
