import type * as React from 'react'
import type {LocalJSXCommandContext,LocalJSXCommandOnDone} from '../../types/command.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {useMainLoopModel} from '../../hooks/useMainLoopModel.js'
import type {useSetAppState} from '../../state/AppState.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {stripSignatureBlocks} from '../../utils/messages.js'

export type LoginDone287=(success:boolean,model:ReturnType<typeof useMainLoopModel>,setAppState:ReturnType<typeof useSetAppState>)=>void|Promise<void>
export interface LoginProps287 {onDone:LoginDone287;startingMessage?:string}
export type LoginContext287=LocalJSXCommandContext & {session:ExecutionSession287;dialogStore?:{dismissKind(kind:string):void}}
export interface PostLoginOptions287 {
 setAppState:ReturnType<typeof useSetAppState>;
 previousAccount:{accountUuid:string;organizationUuid?:string}|null|undefined;
 previousGatewayAuth:unknown;awaitEnrollment?:boolean;onConsentNeeded?:()=>void;
}
export interface PostLoginResult287 {bridgeDisconnected:boolean;accountSwitched:boolean;relaunching:boolean;gatewayLoginError?:string}
interface LoginNamespace287 extends Readonly<Record<string,unknown>> {
 Nie:React.ComponentType<LoginProps287>;
 uos(onDone:LocalJSXCommandOnDone,context:LoginContext287):Promise<React.ReactNode>;
 Rme(context:LoginContext287,success:boolean,options:PostLoginOptions287):Promise<PostLoginResult287>;
}
function requireLoginExports287(source:Readonly<Record<string,unknown>>):asserts source is LoginNamespace287 {
 for(const name of ['Nie','uos','Rme'])if(typeof source[name]!=='function')throw Error('Original public /login export is not connected: '+name)
}
// The canonical namespace owns the full raw closure and all its dependent
// state. No second UI factory, credential reader, promise cell or session.
export function getLoginOuterSource287():LoginNamespace287 {
 const source=getOriginalModsLifecycle287().clearSourceModule287('chunk-qf9j8m5y.js')
 requireLoginExports287(source)
 return source
}
export function adoptLoginContextC287(context:LocalJSXCommandContext):LoginContext287 {
 const current=context as LocalJSXCommandContext & {session?:ExecutionSession287;dialogStore?:LoginContext287['dialogStore']}
 // REPL already supplies promptOwnerSession and the actual dialog store. The
 // fallback is the existing scoped session used by other public commands,
 // never a new identity or credential owner.
 const session=current.session??getExecutionSession287()
 return Object.assign(Object.create(context),{session,onChangeAPIKey(){
  context.onChangeAPIKey()
  // Existing C: use the same key-bound block filter at the same change hook;
  // never clear, compact or replace the conversation/history owner.
  context.setMessages(stripSignatureBlocks)
 }})
}
