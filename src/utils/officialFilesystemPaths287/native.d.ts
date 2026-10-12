import type * as fs from 'node:fs'
import type * as path from 'node:path'
import type * as os from 'node:os'
export interface FilesystemResolve287 {resolvedPath:string;isSymlink:boolean;isCanonical:boolean}
export interface FilesystemPathFs287 {cwd():string;lstatSync(path:string):fs.Stats;readlinkSync(path:string):string;realpathSync(path:string):string;openDirNoFollowSync(path:string):void}
export interface FilesystemAncestryOptions287 {unreadableAncestry?:'unverified';surfaceNetworkRaw?:boolean;launchAncestry?:string|null;onOutcome?:(value:{kind:string;path:string})=>void}
export interface FilesystemPathPorts287 {filesystem?:()=>FilesystemPathFs287;fs:Pick<typeof fs,'readFileSync'|'statSync'>;path:typeof path;os:Pick<typeof os,'homedir'>}
export type PermissionPathAncestry287={requested:string;spellings:string[];leafIsSymlink:boolean}&({unresolved:false;landing:string}|{unresolved:true;stoppedAt:string})
export interface FilesystemPathRuntime287 {automountRoot(path:string):string|null;uncAnchorCrossing(path:string,anchor:string):boolean;networkAnchorCrossing(path:string,anchor:string):boolean;permissionAncestry(path:string):PermissionPathAncestry287;isUncPath(path:string):boolean;isNetRootPath(path:string):boolean;isNetworkBrowsePath(path:string):boolean;isKernelNamespacePath(path:string):boolean;isLocalWslPath(path:string):boolean;isNtDevicePath(path:string):boolean;hasAmbiguousDotSegment(path:string):boolean;screen(path:string):{paths:string[];vetted:boolean};isAutomountPath(path:string):boolean;readPathCandidates(path:string):string[];ancestry(fs:FilesystemPathFs287,path:string,options?:FilesystemAncestryOptions287):string|symbol|undefined;resolve(fs:FilesystemPathFs287,path:string):FilesystemResolve287;realpath(fs:FilesystemPathFs287,path:string):string;isNetworkReference(path:string):boolean;isNetworkVolumePath(path:string):boolean}
export declare function createFilesystemPathRuntime287(platform:string,ports:FilesystemPathPorts287):FilesystemPathRuntime287
