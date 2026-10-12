export declare class BashGhRateState287 { backoffUntil: number }
export interface BashGhRateProducer287 { readonly State: new () => BashGhRateState287; hint(command: string, output: string, state: BashGhRateState287): string | undefined }
export declare function createBashGhRate287(): BashGhRateProducer287
export declare const bashGhRate287:BashGhRateProducer287
