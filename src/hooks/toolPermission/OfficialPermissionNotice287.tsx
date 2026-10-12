import * as React from 'react'
import * as compilerRuntime287 from 'react/compiler-runtime'
const c=(compilerRuntime287 as unknown as {c(size:number):unknown[]}).c
import {jsx,jsxs} from 'react/jsx-runtime'
import chalk from 'chalk'
import {Ansi,Box,Text} from '../../ink.js'
import {ClockContext} from '../../ink/components/ClockContext.js'
import {ScreenReaderContext} from '../../ink/components/ScreenReaderContext.js'
import {useTerminalSize} from '../useTerminalSize.js'
import {useAppState} from '../../state/AppState.js'
import {wrapAnsi} from '../../ink/wrapAnsi.js'
import {stringWidth} from '../../ink/stringWidth.js'
import {getGraphemeSegmenter} from '../../utils/intl.js'
import {permissionRuleValueToString} from '../../utils/permissions/permissionRuleParser.js'
import {permissionDescriptors287} from './officialPermissionDescriptors287/runtime.js'
import {createPermissionNotice287,createFilePermissionNoticeCaller287} from './officialPermissionNotice287/native.js'
// Pure render closure. All mutable reads/subscriptions use mounted Ink/AppState
// providers and the same source descriptor owner, never a second timer store.
export const permissionNoticePorts287={
 w:c,e:jsx,r:jsxs,s:Box,n:Text,K:React.Fragment,b:Symbol.for('react.memo_cache_sentinel'),
 z:useAppState,ve:useTerminalSize,ke:React.useContext,xb:ClockContext,G0n:ScreenReaderContext,
 g:React.useState,A:React.useRef,Q:React.useMemo,kt:React.useSyncExternalStore,
 Tr:wrapAnsi,ie:stringWidth,_a:getGraphemeSegmenter,On:permissionRuleValueToString,
 Ti:(text:unknown)=>permissionDescriptors287.Ti(text),h_:(text:string)=>permissionDescriptors287.h_(text),fe:chalk,po:Ansi,
}
export const permissionNotice287=createPermissionNotice287(permissionNoticePorts287)
export const OfficialPermissionNotice287=permissionNotice287.Tb
export const renderOriginalFilePermissionNotice287=createFilePermissionNoticeCaller287(jsx,Box,OfficialPermissionNotice287)
