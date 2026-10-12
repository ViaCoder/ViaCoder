export interface BashReadFileState287 { readonly timestamp: number }
export interface BashReadFileCache287 { entries(): Iterable<readonly [string, BashReadFileState287]> }
export interface BashProducerPorts287 { statMtimeMs(path: string): Promise<number> }
export interface BashProducers287 { modifiedReadFiles(command: string, readFileState: BashReadFileCache287, now: number): Promise<string[]>; isFinalResponseSubagent(agentContext: { readonly agentType?: string; readonly isAsync?: boolean } | undefined): boolean }
export declare function createBashProducers287(ports: BashProducerPorts287): BashProducers287
