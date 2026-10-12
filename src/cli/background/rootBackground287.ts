import {createRootBackgroundBootstrap287} from './rootBootstrap287.js'
import {bindRootBackgroundWorkspace287,readRootBackgroundModule287} from './host287.js'
import type {StorageV5EnvPin} from '../../utils/secureStorage/storageV5.js'

function canonical(){return (import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()}
function source(file:string):Record<string,any>{return (readRootBackgroundModule287('/$bunfs/root/'+file)??canonical().clearSourceModule287(file)) as Record<string,any>}
/** Original fast-path dispatch after main's identity/settings initialization,
 * before Commander. The existing print action is untouched. */
async function dispatchSelectedRootBackground287(args:string[],initialize:()=>Promise<unknown>):Promise<boolean>{
 if(!args.some(arg=>['--bg','--background','--bg-pty-host','--bg-spare','--daemon-worker','daemon','logs','attach','stop','kill','respawn','rm'].includes(arg)))return false
 const daemon=source('chunk-z91ttcdt.js').VGo(args) as string[]|null
 const internal=args[0]==='--bg-pty-host'||args[0]==='--bg-spare'||args[0]==='--daemon-worker'
 const verbs=source('chunk-wsmbyaxb.js').backgroundSessionVerbIndex(args,{behindRootOptions:process.env.CLAUDE_CODE_SESSION_KIND!=='bg'}) as number
 if(!internal&&daemon===null&&verbs===-1&&!args.includes('--bg')&&!args.includes('--background'))return false
 // The original root fast-path precedes early input capture. Our source entry
 // has already started it; release that reader before the attach owns stdin.
 const {isCapturingEarlyInput,stopCapturingEarlyInput}=await import('../../utils/earlyInput.js')
 if(isCapturingEarlyInput()){stopCapturingEarlyInput();process.stdin.setRawMode(false)}
 const rootArgs=args.slice(0,args.indexOf('--')<0?args.length:args.indexOf('--'))
 const operands=source('chunk-z75es3hd.js').q(rootArgs) as Set<number>
 const restricted=rootArgs.some((arg,i)=>!operands.has(i)&&['--safe-mode','--restricted'].includes(arg))
 const {isEnvTruthy}=await import('../../utils/envUtils.js')
 if(restricted||isEnvTruthy(process.env.CLAUDE_CODE_SAFE_MODE)||isEnvTruthy(process.env.CLAUDE_CODE_RESTRICTED)){process.stderr.write('ViaCoder background entry does not support safe-mode/restricted.\n');process.exitCode=1;return true}
 await initialize();bindRootBackgroundWorkspace287()
 const {officialInitStorageContext287}=await import('../../entrypoints/officialInitContext287/index.js'),pin:StorageV5EnvPin|undefined=officialInitStorageContext287.prepare()
 if(daemon!==null){await source('chunk-8zd8e2dt.js').ensureFastPathSettingsLoaded(pin);(await import('../../utils/errorLogSink.js')).initializeErrorLogSink();await source('chunk-q0nhadhn.js').daemonMain(daemon,pin);return true}
 if(internal){
  if(args[0]==='--bg-spare'){await source('chunk-8zd8e2dt.js').ensureFastPathSettingsLoaded(undefined);await source('chunk-h77p76s6.js').runBgSpare(args.slice(1))}
  else if(args[0]==='--bg-pty-host'){await source('chunk-8zd8e2dt.js').ensureFastPathSettingsLoaded(pin);await source('chunk-aa430wh3.js').runPtyHost(args.slice(1))}
  else {const error=await source('chunk-8zd8e2dt.js').loadFastPathPolicy(pin);if(error)process.stderr.write(error+'\n');(await import('../../utils/proxy.js')).configureGlobalAgents();await source('chunk-pwt5hmbj.js').runDaemonWorker(args[1],pin)}
  return true
 }
 const {profileCheckpoint}=await import('../../utils/startupProfiler.js'),{isStorageV5PinnedOn}=await import('../../utils/secureStorage/storageV5.js')
 await createRootBackgroundBootstrap287({h:profileCheckpoint,F:isStorageV5PinnedOn,S:source('chunk-n4qghq20.js').S,sourceModule:source,importSource:async file=>source(file)}).dispatch(args,pin)
 return true
}

export async function dispatchRootBackground287(args:string[],initialize:()=>Promise<unknown>):Promise<boolean>{
 try{return await dispatchSelectedRootBackground287(args,initialize)}
 catch(error){process.stderr.write(`Background entry failed: ${error instanceof Error?error.message:String(error)}\n`);process.exitCode=1;return true}
}
