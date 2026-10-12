import type {PreparedPoolHeadless287} from '../environmentCloud287/types.js'
import type {AgentDefinition} from '../../tools/AgentTool/loadAgentsDir.js'
/** Same original goo frame, with values consumed by the two earlier lr arms.
 * No alternate SDK/context or cloud create options object is constructed. */
export interface PreparedEnvironmentHeadless287 extends PreparedPoolHeadless287 {
 remote:string|null;
 headlessCloudPrint:boolean;
 serveOnly:boolean;
 systemPromptCli:string|undefined;
 appendSystemPromptCli:string|undefined;
 mainThreadAgentDefinition:AgentDefinition|undefined;
 forwardHomeSettings:boolean;
 homeSettingsConsent:'forward'|null;
}
