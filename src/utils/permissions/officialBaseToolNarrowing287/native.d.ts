export interface Tool287 {name:string;isEnabled:()=>boolean;familyParentToolName?:string}
export interface ParsedBaseTools287 {kept:string[];excluded:Set<string>;bare:boolean;detached:string[];scoped:string[]}
export interface NarrowingInput287 {baseToolsCli:string[];baseToolsIsPreset:boolean;parsedBaseTools:ParsedBaseTools287;getAllBaseTools:()=>readonly Tool287[]}
export interface NarrowingResult287 {toolsToDisallow:string[];warnings:string[]}
export interface BaseToolNarrowingPorts287 {feature(name:string,fallback:boolean):boolean;debugTelemetry(...args:unknown[]):void;platform():string;executionContext():{host:{launchOptions:{replaceToolsOmittedByLaunchList(value:Set<string>):void}}};}
export interface BaseToolNarrowing287 {parseList(tools:string[]):string[];parseBase(tools:string[]):ParsedBaseTools287;preset(value:string):string|null;normalize(tool:string):string;resolveBase(tools:string[],getAllBaseTools:()=>readonly Tool287[]):string[];replaceOmitted(tools:string[]):void;sourceDisplay(source:string):string;narrow(input:NarrowingInput287):NarrowingResult287}
export function createBaseToolNarrowing287(ports:BaseToolNarrowingPorts287):BaseToolNarrowing287
