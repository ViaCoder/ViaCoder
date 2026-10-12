import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {AgentDeliveryProof287} from './agentDeliveryNative287.js'
export interface QueueAdmission287 {admitted:boolean;reason?:string}
export function createHandbackQueueNative287(ports:{commands:QueuedCommand[];notify():void;log(operation:'enqueue',content?:string):void;noteQueued(uuid:unknown):void;recordProof(proof:AgentDeliveryProof287):unknown}):{enqueueReportingAdmission(command:QueuedCommand,options?:{receipt?:string;ahead?:boolean}):QueueAdmission287}
