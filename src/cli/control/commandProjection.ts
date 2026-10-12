import type {Command} from '../../types/command.js'
import {getCommandDiscovery287} from '../../utils/commandDiscovery287.js'
export type SdkCommand={name:string;description:string;argumentHint:string;aliases?:string[];builtin?:true}
export type CommandMode='on'|'name-only'|'off'|'user-invocable-only'
export interface CommandProjectionOptions {mode?(command:Command):CommandMode;isPluginOwned?(command:Command):boolean}
export function commandMode(command:Command,options:CommandProjectionOptions={}):CommandMode{return options.mode?.(command)??getCommandDiscovery287().mode(command)}
export function isBuiltinCommand(command:Command,options:CommandProjectionOptions={}):boolean{return !(options.isPluginOwned?.(command))&&getCommandDiscovery287().owner(command)==='builtin'}
export function projectSdkCommand(command:Command,options:CommandProjectionOptions={}):SdkCommand{
 const row=getCommandDiscovery287().projectOne(command)
 if(options.isPluginOwned?.(command)){delete row.builtin}
 return row
}
export function projectSdkCommands(commands:readonly Command[],options:CommandProjectionOptions={}):SdkCommand[]{
 if(!options.mode&&!options.isPluginOwned)return getCommandDiscovery287().project(commands)
 const seen=new Set<string>()
 return commands.filter(command=>{if(seen.has(command.name))return false;seen.add(command.name);return command.userInvocable!==false&&commandMode(command,options)!=='off'}).map(command=>projectSdkCommand(command,options))
}
