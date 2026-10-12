import type {z} from 'zod';
export type OAuthProfileClear287Result={removed:boolean;refreshToken?:string;clientId?:string};
export function createOAuthProfileClear287(ports:{
configDir():string|null;defaultProfile(directory:string):string;environment:{ANTHROPIC_PROFILE?:string};
readFile(path:string,encoding:'utf-8'):Promise<string>;unlink(path:string):Promise<void>;join(...parts:string[]):string;dirname(path:string):string;
parse(value:string):unknown;schemaLazy<T>(build:()=>T):()=>T;looseObject:typeof z.looseObject;string:typeof z.string;
lockDirectory<T>(directory:string,operation:()=>Promise<T>,mode:'fail-closed'):Promise<T>;
reset():void;debug(message:string,options?:{level:'error'}):void;
}):{clear(options?:{revoke?(credential:{refreshToken:string;clientId:string}):Promise<void>}):Promise<OAuthProfileClear287Result>};
