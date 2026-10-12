import type {Command} from '../../types/command.js'
import type {SdkCommand} from './commandProjection.js'
export interface ReloadSkillsProjectionPorts287 {
 l2(skills:Command[],mcp:Command[]):Command[];
 mcn(command:Command):SdkCommand;
 Is(name:string,active:Command[]):Command|undefined;
 cLt(command:Command):boolean;
}
export function createReloadSkillsProjection287(ports:ReloadSkillsProjectionPorts287):(skills:Command[],mcp:Command[],active:Command[])=>{skills:SdkCommand[]};
