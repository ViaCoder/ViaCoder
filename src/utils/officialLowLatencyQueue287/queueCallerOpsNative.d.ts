import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {PastedContent} from '../config.js'
export interface QueueCallerMethods287 {
 getMainThreadQueueLength():number;getDrainableMainThreadQueueLength():number;
 consume(commands:readonly QueuedCommand[],options:{reason:string}):void;
 popEditableAt(index:number,input:string,cursor:number,pasted?:Record<number,PastedContent>):{text:string;cursorOffset:number;images:PastedContent[];mode:'bash'|'prompt';ideSelection?:QueuedCommand['ideSelection']}|undefined;
}
export function createQueueCallerMethods287(ports:object):QueueCallerMethods287
