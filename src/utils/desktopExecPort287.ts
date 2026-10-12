import {createDesktopExec287} from './officialDesktopCli287/execNative.js'
export type DesktopExecOptions287={timeout?:number;preserveOutputOnError?:boolean;useCwd?:boolean;cwd?:string;abortSignal?:AbortSignal;env?:NodeJS.ProcessEnv;extendEnv?:boolean;stdin?:'ignore'|'inherit'|'pipe';input?:string;stdout?:'pipe'|'inherit'|'ignore';stderr?:'pipe'|'inherit'|'ignore';maxBuffer?:number;stripFinalNewline?:boolean;allowRepoGitHooks?:boolean;allowGitTerminalPrompt?:boolean;useToolMemoryCgroup?:boolean;toolCgroupClass?:string;waitForExitAfterKill?:boolean}
export type DesktopExecResult287={stdout:string;stderr:string;code:number;error?:string;exitCode?:number;timedOut?:boolean;maxBufferExceeded?:boolean}
// Only Ke is supplied here. Complete Je/vendor/process/cleanup/env state belongs
// to the existing canonical lifecycle namespace; never initialize a second graph.
export const desktopExec287=createDesktopExec287({
 cwd:()=>(require('./cwd.js') as typeof import('./cwd.js')).getCwd(),
 execute:(file,args,options)=>{
  const source=(require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js'))
   .getOriginalModsLifecycle287().clearSourceModule287('chunk-fmv8bhm3.js')
  const Je=source.Je as (file:string,args:string[],options?:DesktopExecOptions287)=>Promise<DesktopExecResult287>
  return Je(file,args,options)
 },
})
