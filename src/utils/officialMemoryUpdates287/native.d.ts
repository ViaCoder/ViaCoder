import type {FileStateCache} from '../fileStateCache.js'
import type {ToolUseContext} from '../../Tool.js'
import type {Message,UserMessage} from '../../types/message.js'
import type {AppState} from '../../state/AppStateStore.js'
export interface PendingMemoryUpdate287 {source:string;summary:string;paths:readonly string[]}
export interface MemoryUpdateAttachment287 extends PendingMemoryUpdate287 {type:'memory_update';inContextPaths:readonly string[]}
export interface MemoryUpdateContext287 {
 session:{host:object};readFileState:FileStateCache;
 getAppState:ToolUseContext['getAppState'];setAppState:ToolUseContext['setAppState'];
 enqueuePendingMemoryUpdate(update:PendingMemoryUpdate287):void;
}
export interface MemoryUpdates287 {
 publish(context:MemoryUpdateContext287,update:PendingMemoryUpdate287):Promise<void>;
 enqueue(setter:(f:(state:AppState)=>AppState)=>void):(update:PendingMemoryUpdate287)=>void;
 drain(context:MemoryUpdateContext287,messages?:Message[]):MemoryUpdateAttachment287[];
 refresh(cache:FileStateCache,path:string,options?:{requireReadBeforeWrite?:boolean}):Promise<'changed'|'unchanged'|null>;
 notices:{of(host:object):{enqueue(message:string):void;drain():string[]}};
 normalize(attachment:MemoryUpdateAttachment287):UserMessage[];
 read(path:string,maxBytes?:number):Promise<{content:string;encoding:BufferEncoding;lineEndings:'LF'|'CRLF'}>;
}
export interface MemoryUpdatePorts287 {
 ae:typeof import('../fsOperations.js').getFsImplementation;
 bo:typeof import('../fsOperations.js').safeResolvePath;
 open:typeof import('node:fs/promises').open;
 m:typeof import('node:fs');t:typeof import('../debug.js').logForDebugging;
 Xe:typeof import('../path.js').expandPath;_:typeof JSON.stringify;
 errorString:typeof import('../errors.js').errorMessage;
 f:typeof import('../lazySchema.js').lazySchema;
 u:typeof import('zod/v4').z.object;o:typeof import('zod/v4').z.string;
 T:typeof import('zod/v4').z.array;H:typeof import('zod/v4').z.boolean;
 B:typeof import('zod/v4').z.enum;x:typeof import('zod/v4').z.literal;Fe:typeof import('zod/v4').z.union;
 qd:typeof import('../../memdir/paths.js').isAutoMemoryEnabled;
 Goe:typeof import('../../memdir/paths.js').getAutoMemEntrypoint;
 Re:typeof import('../messages.js').createUserMessage;
 ya:typeof import('../messages.js').wrapMessagesInSystemReminder;
}
export declare function createMemoryUpdates287(ports:MemoryUpdatePorts287):MemoryUpdates287;
