import type {Command} from '../../types/command.js'
export interface CommandRegistry287 {
 markdownFiles:Map<string,Promise<import('../markdownConfigLoader.js').MarkdownFile[]>>
 commandsOffHere?(command:Command):boolean
 builtinCommandTable?:Command[];builtinCommandNames?:Set<string>
 invalidateCommands():void
}
export type CommandRequirements287={workspace:boolean;ink:boolean}
export type ThinClientDispatch287='post-text'|'control-request'|'local-then-rpc'|'twin'
export interface CommandCapabilityPorts287 {ro():CommandRegistry287;ft():boolean;h8():boolean;Js():boolean;Mh():boolean;KIo():Command[]}
export interface CommandCapability287 {
 availability(command:Command):boolean;requires(command:Command):CommandRequirements287
 workspaceDispatch(command:Command):boolean;thinClientDispatch(command:Command,hasWorkspace:boolean):'post-text'|'unavailable'|'local'
 headless(commands:Command[]):Command[];supportsHeadless(command:Command):boolean
 builtins():Command[];builtinNames():Set<string>;registerSource():Command[]
}
export function createCommandCapability287(ports:CommandCapabilityPorts287):CommandCapability287
export function createCommandDispatch287(ports:{zvn(policy:string):boolean}):{enabled(command:Command):boolean;policy(command:Command):boolean}
export const originalCommandRequirements287:readonly {name:string;type:Command['type'];requires:NonNullable<Command['requires']>}[]
