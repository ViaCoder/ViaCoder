import type {QueryParams} from '../../query.js'
export interface HotEnginePacket287 {type:'user';message:{role:'user';content:unknown};parent_tool_use_id:null}
export interface HotEngine287 extends AsyncGenerator<Record<string,unknown>,void,unknown> {
 streamInput(input:AsyncIterable<HotEnginePacket287>):Promise<void>
 seedReadState(path:string,timestamp:number,content?:string):Promise<void>
 setModel(model:string):Promise<void>;setMaxThinkingTokens(tokens:number|null):Promise<void>
 interrupt(reason:string,options?:{scope:string}):Promise<{still_queued:string[]}>
 close():void;turnCount():number
}
export interface HotEngineOptions287 {
 run(input:QueryParams):ReturnType<typeof import('../../query.js').query>
 queryParams(input:HotEnginePacket287):Promise<QueryParams>
 settings?:unknown;commands?:unknown;models?:unknown;unavailableModels?:unknown;agents?:unknown;account?:unknown;
 onTurnThrow?:(input:{error:unknown})=>void;onCommandLifecycle?:(uuid:string,state:string)=>void;
 sdkResultVerdict?:boolean;fastModeState?:unknown;fastModeDisabledReason?:unknown;
 outputStyle?:unknown;mcpServers?:()=>unknown;hostOwnsPermissionMode?:boolean;hostOwnsModel?:boolean
}
export function createHotEngineFactory287(ports:Record<string,unknown>):(input:HotEngineOptions287)=>HotEngine287
