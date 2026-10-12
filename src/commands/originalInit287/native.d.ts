export interface OriginalInitPorts287 {
 a: Pick<typeof import('../../utils/authEnvironment.js').authEnvironment, 'CLAUDE_CODE_NEW_INIT'>;
 k: (name: string, fallback: boolean) => boolean;
}
export interface OriginalInitCommand287 {
 type: 'prompt'; name: 'init'; readonly description: string;
 contentLength: number; progressMessage: string; source: 'builtin';
 getPromptForCommand(): Promise<Array<{type: 'text'; text: string}>>;
}
export function createOriginalInit287(ports: OriginalInitPorts287): OriginalInitCommand287;
