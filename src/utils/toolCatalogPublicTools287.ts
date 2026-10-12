import {z} from 'zod/v4'
import {buildTool,type ToolDef} from '../Tool.js'
import {lazySchema} from './lazySchema.js'
import {plural} from './stringUtils.js'
import {createReportFindings287,type ReportFindingsInput287,type ReportFindingsOutput287} from './officialToolCatalog287/reportFindings.js'

const findings=createReportFindings287({f:lazySchema,u:z.object,o:z.string,C:z.number,B:z.enum,T:z.array,Ve:z.strictObject,Wt:definition=>definition,I:plural})
// One registered Tool object; the pure original definition owns schemas,
// prompt, validation and result semantics. The bridge only lowers create/call
// to the repository's existing Tool ABI, like GetTask's existing bridge.
export const ReportFindingsTool287=buildTool({
 ...findings,
 call:input=>findings.create().call(input),
} satisfies ToolDef<z.ZodType<ReportFindingsInput287>,ReportFindingsOutput287> & {create:typeof findings.create;backgrounding:typeof findings.backgrounding})
