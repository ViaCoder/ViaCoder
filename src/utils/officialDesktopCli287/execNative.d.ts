import type {DesktopExecOptions287,DesktopExecResult287} from '../desktopExecPort287.js'
export function createDesktopExec287(ports:{execute(file:string,args:string[],options?:DesktopExecOptions287):Promise<DesktopExecResult287>;cwd():string}):{exec(file:string,args:string[],options?:DesktopExecOptions287):Promise<DesktopExecResult287>}
