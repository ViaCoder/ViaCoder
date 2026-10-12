import type {MemoryFileInfo} from '../claudemd.js'
import type {MemoryType} from '../memory/types.js'
export interface InstructionFormatterPorts287 {
 E8():boolean;
 k(name:string,fallback:boolean):boolean;
 jQ(content:string):string;
}
export interface InstructionFormatter287 {
 filterInjectedMemoryFiles(files:MemoryFileInfo[]):MemoryFileInfo[];
 filterInstructions(files:MemoryFileInfo[],filter?:(type:MemoryType)=>boolean):MemoryFileInfo[];
 formatInstructions(files:MemoryFileInfo[]):string;
}
export function createInstructionFormatter287(ports:InstructionFormatterPorts287):InstructionFormatter287;
