/** Original Dt retains its rejecting deadline (not a cancellation or retry). */
export function withHostCloseDeadline287<T>(work:PromiseLike<T>,ms:number,message:string):Promise<T>
/** Original Zx serializes and survives a rejected predecessor without masking it. */
export function serializeHostOperation287<A extends unknown[],R>(operation:(...args:A)=>R|PromiseLike<R>):(...args:A)=>Promise<Awaited<R>>
export function isLocalHostRemoteTransport287():false
export function isRemoteHostTransport287():true
/** Full original Df over actual print lexical cells. This factory adds no owner. */
export interface PrintDfPorts287 {
 On:{settle():PromiseLike<unknown>|undefined};so:Set<Promise<unknown>>;
 Op:boolean;ya:boolean;Po:boolean;lr:boolean;_r:boolean;
 Fr:Promise<unknown>;kTo():Promise<unknown>;slr():Promise<unknown>;pun():Promise<unknown>;
 vb():void;hb():void;yb():void;_b():void;kb():void;Ob():void;xb():void;Db():void;
 wb():void;Pb():void;Rb():void;Tb():void;bb():void;Ti?:()=>void;ws():void;Mp():void;
 Fn?:{dispose():unknown};Wp:object;ZNr(requester:object):void;
 pce:{get():unknown;set(value:unknown):void};Sf:object;
 EIr():void;Xw():void;Gw():void;zw():void;Yw():void;sn:{dispose():void};
 v():import('../../state/AppState.js').AppState;R:import('../../Task.js').SetAppState;
 Qt:(import('../../services/mcp/types.js').MCPServerConnection|import('../../services/mcp/types.js').ConnectedMCPServerV2)[];
 Lt:{clients:(import('../../services/mcp/types.js').MCPServerConnection|import('../../services/mcp/types.js').ConnectedMCPServerV2)[]};
 yn():{cleanupConnectedMcpClients(clients:(import('../../services/mcp/types.js').MCPServerConnection|import('../../services/mcp/types.js').ConnectedMCPServerV2)[]):Promise<unknown>};
 Mb():void;r:import('../structuredIO.js').StructuredIO;Q:object;tI(io:PrintDfPorts287['r'],queue:object):Promise<unknown>;
 dt:{dispose():void};De():void;Cb():void;si:{dispose():void};eb():void;
 Ai():boolean;qz:typeof import('../remoteIO.js').RemoteIO;
 dh(context:{shuttingDown:boolean;remoteTransport:boolean}):boolean;uh(registry:unknown):void;Gm(getState:PrintDfPorts287['v'],setState:PrintDfPorts287['R']):unknown;
 oo:{close():void};Ws:{disarm(reason:'session_ending'):void};ht:{done():void};
}
export function createPrintFullDf287(ports:PrintDfPorts287):()=>Promise<void>
/** Original Yh listener cell/method, attached to the sole existing public queue. */
export function createSdkEventEnqueueListener287():{
 enqueueListener:(()=>void)|null;
 setEnqueueListener(listener:(()=>void)|null):void;
 notifyEnqueued():void;
}
