import type {McpStateCarrier287,McpQueuedUpdate287,McpQueuedInput287,readMcpStateCarrier287} from './readers.js'
export interface McpQueuedRefs287 {
 to:{current:Map<string,number>};Ro:{current:Set<string>};Ct:{current:Map<string,()=>void>}
}
export interface McpQueuedPorts287 extends McpQueuedRefs287 {
 ce:typeof import('react').useCallback;Ie:McpStateCarrier287;
 Mo:{current:McpQueuedUpdate287[]};zo:{current:(()=>void)|null};
 gr:ReturnType<typeof readMcpStateCarrier287>['gr'];Ike:ReturnType<typeof readMcpStateCarrier287>['Ike'];
 tZe:ReturnType<typeof readMcpStateCarrier287>['tZe'];
 Ut:Pick<import('../../../ink/officialInputClock287/native.js').NativeInkClock287,'setTimeout'>
}
export function useMcpQueuedUpdates287(ports:McpQueuedPorts287):{
 flush():void;enqueue(update:McpQueuedInput287):void;
 current(name:string):ReturnType<McpStateCarrier287['get']>['clients'][number]|undefined
}
