import type {ToolPermissionContext} from '../../Tool.js'
import type {ConfinementErrorCode287} from '../../utils/confinement287/confinementError287.js'
import {addDirectoryHelp287,validateAddDirectory287} from './runtime287.js'
export type AlreadyAccessibleDirectory287={
 resultType:'alreadyInWorkingDirectory';directoryPath:string;absolutePath:string;workingDir:string;isExactMatch:boolean;isOriginalCwd:boolean
}
export type AddDirectoryResult=
 |{resultType:'success';absolutePath:string}
 |{resultType:'emptyPath'}
 |{resultType:'invalidPath';directoryPath:string;containsNullByte:boolean}
 |{resultType:'networkPath'|'pathNotFound'|'notADirectory';directoryPath:string;absolutePath:string}
 |AlreadyAccessibleDirectory287
 |{resultType:'confinementBlocked';directoryPath:string;code:ConfinementErrorCode287}
export function validateDirectoryForWorkspace(path:string,context:ToolPermissionContext):Promise<AddDirectoryResult>{return validateAddDirectory287(path,context)}
export function addDirHelpMessage(result:AddDirectoryResult):string{return addDirectoryHelp287(result)}
