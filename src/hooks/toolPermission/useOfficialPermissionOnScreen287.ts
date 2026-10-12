import * as React from 'react'
import {createOnScreenPermissionHost287} from './officialPermissionLifecycle287/onScreen.js'
import {createOnScreenPermissionEffect287} from './officialPermissionLifecycle287/onScreenEffect.js'
import {officialRltUiEvents287,useOfficialRltUiVisibility287,readOfficialRltVisibilityReason287} from '../../state/officialRltUiEvents287.js'
import {getOfficialRltTop287,type OfficialRltDialogStore287} from '../../utils/officialRlt287.js'
/** Original Vve producer h9()??null → layout effect uMr(cc),dvo.
 * Inputs are the existing REPL draft/focus and same Hpr/ta selectors. */
export function useOfficialPermissionOnScreen287(store:OfficialRltDialogStore287,input:{value:string;active:boolean}){
 const state=React.useSyncExternalStore(store.subscribe,store.getState),visible=useOfficialRltUiVisibility287()
 const top=getOfficialRltTop287(state),panel=state.open.some(r=>r.userInvoked===true)&&top?.hideWhile?.includes('panel')===true,draft=top?.hideWhile?.includes('draft')===true&&input.value.trim()!==''
 const current=React.useRef({input,visible,panel,draft});current.current={input,visible,panel,draft}
 const source=React.useMemo(()=>createOnScreenPermissionHost287({
  ta:officialRltUiEvents287,Np:()=>store,WL:getOfficialRltTop287,kt:React.useSyncExternalStore,
  _f:()=>{const c=current.current;return readOfficialRltVisibilityReason287(c.visible.progress,c.input.active,c.panel,c.draft)},
  jRe:()=>current.current.visible.unmounted,
 }),[store])
 const kind=source.h9()??null
 React.useLayoutEffect(createOnScreenPermissionEffect287(source.uMr,source.dvo,kind),[source,kind])
}
