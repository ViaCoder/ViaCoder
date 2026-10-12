import type {Command} from '../../types/command.js'
export type SkillsDialogResponse287 = {
 skills:Array<{name:string;display_name:string;description:string;source:string;tokens:number;
 state:'on'|'name-only'|'user-invocable-only'|'off';locked_by?:'policy'|'flag'|'reserved-name'|'author'|'plugin';
 advertised:boolean;handles:{unqualified_name?:string;aliases?:string[];bare_name_reserved?:boolean}}>
}
export function createSkillsDialog287(ports:Record<string,unknown>):{build(input:{commands:readonly Command[];bytesPerToken:number}):SkillsDialogResponse287}

export function createSkillsDialogCommands287(ports:{v():{mcp:{commands:Command[]}};Ro:Command[];KEt(commands:Command[],mcp:Command[],extra:Command[]):Command[];dde():Command[]}):()=>Command[]
