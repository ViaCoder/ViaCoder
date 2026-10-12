/** Complete original ZHn; every public watcher API resolves this single owner. */
export interface FileChangedWatcherOwner287 {
 initialize(cwd:string,storageV5?:unknown,credentials?:unknown):void;
 setEnvHookNotifier(callback:((text:string,isError:boolean)=>void)|null):void;
 updateWatchPaths(paths:string[]):void;addWatchPaths(paths:string[]):void;
 onCwdChanged(oldCwd:string,newCwd:string):Promise<void>;dispose():void
}
let owner287:FileChangedWatcherOwner287|undefined
export function getFileChangedWatcher287():FileChangedWatcherOwner287 {
 if(!owner287){
  const source=(require('../../commands/clear/lifecycle287.js') as typeof import('../../commands/clear/lifecycle287.js')).getClearLifecycleBinding287('chunk-mphp7acd.js','ZHn')
  if(typeof source!=='function')throw Error('Original watcher factory is not callable')
  owner287=source() as FileChangedWatcherOwner287
 }
 return owner287
}


export function setEnvHookNotifier(cb:((text:string,isError:boolean)=>void)|null):void {getFileChangedWatcher287().setEnvHookNotifier(cb)}

export function initializeFileChangedWatcher(cwd:string,storageV5?:unknown,credentials?:unknown):void {getFileChangedWatcher287().initialize(cwd,storageV5,credentials)}




export function updateWatchPaths(paths:string[]):void {getFileChangedWatcher287().updateWatchPaths(paths)}

/** Original ZHn.ve append semantics, same existing watcher/path owner. */
export function addWatchPaths287(paths:string[]):void {getFileChangedWatcher287().addWatchPaths(paths)}


export function onCwdChangedForHooks(oldCwd:string,newCwd:string):Promise<void> {return getFileChangedWatcher287().onCwdChanged(oldCwd,newCwd)}


export function resetFileChangedWatcherForTesting():void {owner287?.dispose()}
