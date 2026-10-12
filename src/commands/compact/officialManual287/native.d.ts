import type {LocalCommandCall} from '../../../types/command.js'
export type ManualCompactPorts287=Record<"Ajn"|"Bi"|"D5"|"DIr"|"G6n"|"H6"|"HIr"|"I"|"JD"|"P"|"Pce"|"T4e"|"TI"|"UN"|"Xxr"|"YU"|"Ye"|"Yxr"|"ZT"|"ai"|"cFe"|"d"|"fe"|"hye"|"kHt"|"l"|"o_"|"ole"|"qk"|"rht"|"t"|"ug"|"wPt"|"yRe",unknown>
export interface ManualCompactOptions287 {customInstructions:string;mainThreadAgentDefinition?:import('../../../tools/AgentTool/loadAgentsDir.js').AgentDefinition;trigger?:'manual'|'plugin';origin?:string}
export function createManualCompact287(ports:ManualCompactPorts287):{ce:LocalCommandCall;b(context:import('../../../Tool.js').ToolUseContext,options:ManualCompactOptions287):ReturnType<LocalCommandCall>}
