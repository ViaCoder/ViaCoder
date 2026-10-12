import * as React from 'react'
import * as compiler from 'react/compiler-runtime'
import {jsx,jsxs} from 'react/jsx-runtime'
import * as path from 'node:path'
import {homedir} from 'node:os'
import mapValues from 'lodash-es/mapValues.js'
import {Box,Text} from '../../../ink.js'
import {ScreenReaderContext} from '../../../ink/components/ScreenReaderContext.js'
import {stringWidth} from '../../../ink/stringWidth.js'
import {useAppState,useSetAppState} from '../../../state/AppState.js'
import {useTheme} from '../../../components/design-system/ThemeProvider.js'
import {Select} from '../../../components/CustomSelect/index.js'
import {PermissionDialog} from '../../../components/permissions/PermissionDialog.js'
import {FileWriteToolDiff} from '../../../components/permissions/FileWritePermissionRequest/FileWriteToolDiff.js'
import {getShortcutDisplay} from '../../../keybindings/shortcutFormat.js'
import {useKeybindings} from '../../../keybindings/useKeybinding.js'
import {getPlatform} from '../../../utils/platform.js'
import {getCwd} from '../../../utils/cwd.js'
import {expandPath} from '../../../utils/path.js'
import {SandboxManager} from '../../../utils/sandbox/sandbox-adapter.js'
import {getOriginalCwd} from '../../../bootstrap/state.js'
import {getReadPermissions287,getReadPermissionPorts287} from '../../../utils/permissions/read.js'
import {filesystemPathRuntime287} from '../../../utils/filesystemPathRuntime287.js'
import {permissionRuleValueToString} from '../../../utils/permissions/permissionRuleParser.js'
import {permissionUpdateSchema} from '../../../utils/permissions/PermissionUpdateSchema.js'
import {authEnvironment} from '../../../utils/authEnvironment.js'
import {logError} from '../../../utils/log.js'
import {logEvent} from '../../../services/analytics/index.js'
import {sanitizeToolNameForAnalytics} from '../../../services/analytics/metadata.js'
import {isSupportedVSCodeTerminal} from '../../../utils/ide.js'
import {permissionNotice287} from '../OfficialPermissionNotice287.js'
import {createOfficialFilePermissionMenu287} from './native.js'
import {getPublicPermissionLeaves287} from '../officialPublicPermissionLeaves287/runtime.js'
import type {FilePermissionMenu287,FilePermissionMenuProps287} from './native.js'
const c=(compiler as unknown as {c(size:number):unknown[]}).c
const screenReader=()=>React.useContext(ScreenReaderContext)
// The six public file tools use their actual identities/render methods.
// An unknown identity never synthesizes a permission or tool result.
function renderPublicFileTool287(name:string,input:Record<string,unknown>,options:{theme:import('../../../utils/theme.js').ThemeName;verbose:boolean}){
 const tools=[
  (require('../../../tools/FileReadTool/FileReadTool.js') as typeof import('../../../tools/FileReadTool/FileReadTool.js')).FileReadTool,
  (require('../../../tools/FileEditTool/FileEditTool.js') as typeof import('../../../tools/FileEditTool/FileEditTool.js')).FileEditTool,
  (require('../../../tools/FileWriteTool/FileWriteTool.js') as typeof import('../../../tools/FileWriteTool/FileWriteTool.js')).FileWriteTool,
  (require('../../../tools/NotebookEditTool/NotebookEditTool.js') as typeof import('../../../tools/NotebookEditTool/NotebookEditTool.js')).NotebookEditTool,
  (require('../../../tools/GrepTool/GrepTool.js') as typeof import('../../../tools/GrepTool/GrepTool.js')).GrepTool,
  (require('../../../tools/GlobTool/GlobTool.js') as typeof import('../../../tools/GlobTool/GlobTool.js')).GlobTool,
 ];
 const tool=tools.find(tool=>tool.name===name);if(!tool)throw Error('File permission renderer lacks actual tool '+name);
 return tool.renderToolUseMessage(input,options);
}
export const filePermissionMenuPorts287:Record<string,unknown>={
 'chunk-f2cpzzp9.js:z':useAppState,'chunk-f2cpzzp9.js:Jn':useTheme,'chunk-f2cpzzp9.js:Q':React.useMemo,
 'chunk-f2cpzzp9.js:e':jsx,'chunk-f2cpzzp9.js:r':jsxs,'chunk-f2cpzzp9.js:s':Box,'chunk-f2cpzzp9.js:n':Text,
 'chunk-f2cpzzp9.js:ce':React.useCallback,'chunk-f2cpzzp9.js:K':React.Fragment,
 'chunk-f2cpzzp9.js:She':(props:Parameters<ReturnType<typeof getPublicPermissionLeaves287>['She']>[0])=>jsx(getPublicPermissionLeaves287().She,props),'chunk-f2cpzzp9.js:bhe':FileWriteToolDiff,
 'chunk-f2cpzzp9.js:vhe':(props:Parameters<ReturnType<typeof getPublicPermissionLeaves287>['vhe']>[0])=>jsx(getPublicPermissionLeaves287().vhe,props),
 'chunk-f2cpzzp9.js:Qr':mapValues,'chunk-f2cpzzp9.js:hnt':renderPublicFileTool287,'chunk-f2cpzzp9.js:d':logError,
 'chunk-f2cpzzp9.js:qs':permissionNotice287.qs,'chunk-f2cpzzp9.js:Nn':sanitizeToolNameForAnalytics,
 'chunk-mbfze585.js:a':authEnvironment,
 'chunk-885e0tm0.js:w':c,'chunk-885e0tm0.js:En':useSetAppState,'chunk-885e0tm0.js:Ze':screenReader,
 'chunk-885e0tm0.js:g':React.useState,'chunk-885e0tm0.js:i':logEvent,'chunk-885e0tm0.js:e':jsx,'chunk-885e0tm0.js:r':jsxs,
 'chunk-885e0tm0.js:n':Text,'chunk-885e0tm0.js:ie':stringWidth,'chunk-885e0tm0.js:On':permissionRuleValueToString,
 'chunk-885e0tm0.js:aM':permissionUpdateSchema,'chunk-885e0tm0.js:j':(props:{chord:string;action:string})=>jsx(menu().j,props),
 'chunk-f2cpzzp9.js:o_':getShortcutDisplay,
 'chunk-6xrs6gmd.js:Y_':(value:string,context:import('../../../Tool.js').ToolPermissionContext,spellings?:readonly string[])=>getReadPermissions287().pathInAllowedWorkingPath(value,context,spellings),
 'chunk-6xrs6gmd.js:rW':(value:string)=>getReadPermissions287().directoryForPath(value),'chunk-6xrs6gmd.js:No':filesystemPathRuntime287.readPathCandidates,
 'chunk-6xrs6gmd.js:O':getPlatform,'chunk-6xrs6gmd.js:vf':path.posix,
 'chunk-f2cpzzp9.js:Xe':expandPath,'chunk-f2cpzzp9.js:Ee':getOriginalCwd,
 'chunk-f2cpzzp9.js:M6e':path.sep,'chunk-f2cpzzp9.js:Vno':path.join,'chunk-f2cpzzp9.js:$no':homedir,
 'chunk-f2cpzzp9.js:Qt':useKeybindings,'chunk-f2cpzzp9.js:Cro':path.relative,'chunk-s354e3rr.js:oe':getCwd,
 'chunk-f2cpzzp9.js:Qi':PermissionDialog,'chunk-f2cpzzp9.js:Tb':permissionNotice287.Tb,
 'chunk-f2cpzzp9.js:dHt':isSupportedVSCodeTerminal,
 'chunk-5vadtxaa.js:je':SandboxManager,'chunk-5vadtxaa.js:gk':()=>getReadPermissions287().sandboxFilesystemMode(),
 'chunk-5vadtxaa.js:bu':(...args:unknown[])=>(getReadPermissionPorts287().bu as (...args:unknown[])=>unknown)(...args),
 'chunk-5vadtxaa.js:Ee':getOriginalCwd,
 'chunk-f2cpzzp9.js:$e':Select,
 'chunk-vbsw5qhh.js:w':c,'chunk-vbsw5qhh.js:O2':getPlatform,'chunk-vbsw5qhh.js:e':jsx,'chunk-vbsw5qhh.js:r':jsxs,'chunk-vbsw5qhh.js:Hc':Text,
 'chunk-kcwzjss2.js:w':c,'chunk-kcwzjss2.js:Ze':screenReader,'chunk-kcwzjss2.js:e':jsx,'chunk-kcwzjss2.js:s':Box,
 'chunk-134t0awf.js:r':jsxs,'chunk-134t0awf.js:rc':React.Fragment,'chunk-134t0awf.js:sf':React.isValidElement,'chunk-134t0awf.js:n':Text,
 'chunk-134t0awf.js:w':c,'chunk-134t0awf.js:by':React.Children,'chunk-134t0awf.js:K':React.Fragment,'chunk-134t0awf.js:e':jsx,
}
let instance:FilePermissionMenu287|undefined
function menu(){return instance??=createOfficialFilePermissionMenu287(filePermissionMenuPorts287)}
export const filePermissionMenu287=new Proxy({} as FilePermissionMenu287,{get(_target,key){return Reflect.get(menu(),key)}})
export function OfficialFilePermissionMenu287(props:FilePermissionMenuProps287){return filePermissionMenu287.r4e(props)}
export function SourceFilePermissionRequest287(props:import('../../../components/permissions/PermissionRequest.js').PermissionRequestProps){
 const {descriptor287,answer287}=props.toolUseConfirm;
 if(!descriptor287||!answer287)throw Error('Canonical file permission menu lacks source request/answer');
 return jsx(OfficialFilePermissionMenu287,{payload:descriptor287,answer:answer287});
}
