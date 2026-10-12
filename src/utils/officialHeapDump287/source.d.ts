import type {HeapDumpResult,MemoryDiagnostics} from '../heapDumpService.js'
import type {ToolUseContext} from '../../Tool.js'
export interface HeapDumpFunctions287 {
 capture(trigger:'manual'|'auto-1.5GB',dumpNumber?:number):Promise<MemoryDiagnostics>;
 perform(trigger?:'manual'|'auto-1.5GB',dumpNumber?:number):Promise<HeapDumpResult>;
 call(args:string,context:Pick<ToolUseContext,'session'>):Promise<{type:'text';value:string}>;
 format(diagnostics:MemoryDiagnostics):string;
}
export function createHeapDump287(platform:string,ports:Record<string,unknown>,builtins:Record<string,unknown>):HeapDumpFunctions287;
