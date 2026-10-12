import type {TokensList} from 'marked'
import type {MemoryType} from '../memory/types.js'
export type PersonalMemoryParserPorts287={l0n:(path:string)=>string;t:(message:string)=>void;y0n:(text:string)=>{content:string;paths?:string[]};Rq:new(options:{gfm:boolean})=>{lex(text:string):TokensList};v0n:(tokens:TokensList,base:string)=>string[];jQ:(text:string)=>string;Ihn:(text:string)=>{content:string}}
export declare function parsePersonalMemory287(raw:string,path:string,type:MemoryType,includeBase:string|undefined,ports:PersonalMemoryParserPorts287):{info:{path:string;type:MemoryType;content:string;globs?:string[];contentDiffersFromDisk:boolean;rawContent?:string}|null;includePaths:string[]}
export declare function extractMemoryIncludes287(tokens:TokensList,base:string,ports:{PR:(path:string)=>boolean;Xe:(path:string,base:string)=>string;kw:(path:string)=>string}):string[]
export declare const memoryTextExtensions287:Set<string>
export declare function stripMemoryComments287(tokens:TokensList):{content:string;stripped:boolean}
export declare function parseMemoryPathsFrontmatter287(raw:string,ports:{Hs:typeof import('../frontmatterParser.js').parseFrontmatter;dht:typeof import('../frontmatterParser.js').splitPathInFrontmatter}):{content:string;paths?:string[]}
