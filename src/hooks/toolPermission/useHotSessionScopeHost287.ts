import * as React from 'react'
import type {HotReplScope287} from '../../utils/hotSessionController287/native.js'
import type {ReplRequesterScreenHost287} from './officialReplRequester287/native.js'
/** RW itself owns binding, subscriptions and disposal. React only mounts it. */
export function useHotSessionScopeHost287(scope:HotReplScope287,host:ReplRequesterScreenHost287):void {
 scope.bindHost(host)
 React.useEffect(()=>{
  scope.connect()
  return()=>scope.dispose()
 },[scope])
}
