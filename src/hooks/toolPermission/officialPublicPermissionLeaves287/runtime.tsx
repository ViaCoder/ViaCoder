import * as React from 'react'
import * as compiler from 'react/compiler-runtime'
import {jsx,jsxs} from 'react/jsx-runtime'
import {relative} from 'node:path'
import {Box,Text,NoSelect} from '../../../ink.js'
import {useTerminalSize} from '../../useTerminalSize.js'
import {useAppState} from '../../../state/AppState.js'
import {getFsImplementation} from '../../../utils/fsOperations.js'
import {filesystemPathRuntime287} from '../../../utils/filesystemPathRuntime287.js'
import {CHUNK_SIZE,openForScan,readCapped,scanForContext} from '../../../utils/readEditContext.js'
import {CONTEXT_LINES,getPatchForDisplay,adjustHunkLineNumbers} from '../../../utils/diff.js'
import {findActualString,preserveQuoteStyle} from '../../../tools/FileEditTool/utils.js'
import {firstLineOf} from '../../../utils/stringUtils.js'
import {parseCellId} from '../../../utils/notebook.js'
import {safeParseJSON} from '../../../utils/json.js'
import {intersperse} from '../../../utils/array.js'
import {isFsInaccessible} from '../../../utils/errors.js'
import {logForDebugging} from '../../../utils/debug.js'
import {logError} from '../../../utils/log.js'
import {StructuredDiff} from '../../../components/StructuredDiff.js'
import {StructuredDiffList} from '../../../components/StructuredDiffList.js'
import {HighlightedCode} from '../../../components/HighlightedCode.js'
import {permissionDescriptors287} from '../officialPermissionDescriptors287/runtime.js'
import {createPublicPermissionLeaves287} from './native.js'
import type {PublicPermissionLeaves287} from './native.js'
// Full She/_6e/vhe/khe. UI suspension is request-local; filesystem reads use
// the existing bounded reader and never read a withheld/network source.
export function publicPermissionLeafPorts287():Record<string,unknown>{return {
 w:(compiler as unknown as {c(size:number):unknown[]}).c,b:Symbol.for('react.memo_cache_sentinel'),
 g:React.useState,br:React.Suspense,ur:React.use,e:jsx,r:jsxs,n:Text,s:Box,Sd:NoSelect,
 ve:useTerminalSize,fw:useAppState,ae:getFsImplementation,
 Cs:(value:string)=>filesystemPathRuntime287.isUncPath(value)&&!filesystemPathRuntime287.isLocalWslPath(value),
 Lh:(value:string)=>filesystemPathRuntime287.isNetworkBrowsePath(value)||filesystemPathRuntime287.isNetRootPath(value)||filesystemPathRuntime287.isNtDevicePath(value)||filesystemPathRuntime287.isKernelNamespacePath(value),
 C9e:CHUNK_SIZE,lFt:openForScan,Vun:readCapped,gFr:scanForContext,vpt:CONTEXT_LINES,
 X6:getPatchForDisplay,Gun:adjustHunkLineNumbers,qke:findActualString,v9e:preserveQuoteStyle,Mr:firstLineOf,
 S5:safeParseJSON,iFe:parseCellId,N6e:relative,Hfe:intersperse,XD:104857600,
 NW:StructuredDiffList,Zz:StructuredDiff,gS:HighlightedCode,as:isFsInaccessible,t:logForDebugging,d:logError,
 ...permissionDescriptors287.display,
 ba:(props:Parameters<import('../officialFilePermissionMenu287/native.js').FilePermissionMenu287['ba']>[0])=>{
  const menu=require('../officialFilePermissionMenu287/runtime.js') as typeof import('../officialFilePermissionMenu287/runtime.js');return jsx(menu.filePermissionMenu287.ba,props)
 },
}}
let leaves:PublicPermissionLeaves287|undefined
export function getPublicPermissionLeaves287(){return leaves??=createPublicPermissionLeaves287(publicPermissionLeafPorts287())}
