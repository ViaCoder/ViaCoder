import type {PreparedEnvironmentHeadless287} from './types.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
export function createEnvironmentHeadless287(ports:Record<string,unknown>):{
 create(prepared:PreparedEnvironmentHeadless287,options:Record<string,unknown>,host:ExecutionSession287['host']):Promise<void>;
 printArm(prepared:PreparedEnvironmentHeadless287,options:Record<string,unknown>):Promise<void>;
 print(prepared:PreparedEnvironmentHeadless287,options:Record<string,unknown>,request:{prompt:string;outputFormat:'text'|'json';sessionId?:string;maxWaitMs?:number}):Promise<void>;
 headlessCreateArm(prepared:PreparedEnvironmentHeadless287,options:Record<string,unknown>):Promise<void>;
 headlessPrintArm(prepared:PreparedEnvironmentHeadless287,options:Record<string,unknown>):Promise<void>;
 publicNamespaces:Readonly<Record<string,Readonly<Record<string,unknown>>>>;
 sourceModule(file:string):Readonly<Record<string,unknown>>|undefined;
}
