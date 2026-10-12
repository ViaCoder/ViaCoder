import type {z} from 'zod/v4'
export type ReportEffort287='low'|'medium'|'high'|'xhigh'|'max'
export interface ReportFinding287 {file:string;line?:number;summary:string;short_summary?:string;failure_scenario:string;category?:string;verdict?:'CONFIRMED'|'PLAUSIBLE';outcome?:'fixed'|'skipped'|'no_change_needed'}
export type ReportFindingsInput287 = {level?:ReportEffort287;findings:ReportFinding287[]}
export type ReportFindingsOutput287 = ReportFindingsInput287 & {count:number}
export interface ReportFindingsDefinition287 {
 name:'ReportFindings';searchHint:string;backgrounding:'never';maxResultSizeChars:number;strict:boolean
 readonly inputSchema:z.ZodType<ReportFindingsInput287>;readonly outputSchema:z.ZodType<ReportFindingsOutput287>
 description():Promise<string>;prompt():Promise<string>;isReadOnly():boolean;isConcurrencySafe():boolean
 toAutoClassifierInput(input:ReportFindingsInput287):string;userFacingName():string
 renderToolUseMessage(input:Partial<ReportFindingsInput287>):string
 create():{call(input:ReportFindingsInput287):Promise<{data:ReportFindingsOutput287}>}
 mapToolResultToToolResultBlockParam(output:ReportFindingsOutput287,id:string):{tool_use_id:string;type:'tool_result';content:string}
}
export function createReportFindings287(ports:{f:typeof import('../lazySchema.js').lazySchema;u:typeof z.object;o:typeof z.string;C:typeof z.number;B:typeof z.enum;T:typeof z.array;Ve:typeof z.strictObject;Wt:(definition:ReportFindingsDefinition287)=>ReportFindingsDefinition287;I:typeof import('../stringUtils.js').plural}):ReportFindingsDefinition287
