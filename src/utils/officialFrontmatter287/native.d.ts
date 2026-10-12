import type {FrontmatterData} from '../frontmatterParser.js'
export interface FrontmatterOptions287 {quoteLossyValues?:boolean}
export interface FrontmatterResult287 {frontmatter:FrontmatterData;content:string;parseError?:string;rewriteHazard?:string}
export interface FrontmatterPorts287 {t:(message:string,options?:{level:'warn'})=>void;re:(content:string,length:number)=>string;Bun:{YAML:{parse:(input:string)=>unknown}}}
export declare function createFrontmatterRuntime287(ports:FrontmatterPorts287):{parse:(markdown:string,sourcePath?:string,options?:FrontmatterOptions287)=>FrontmatterResult287;splitPaths:(input:string|string[])=>string[];regex:RegExp}
