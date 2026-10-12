import type {z} from 'zod/v4'
export interface DirectoryResource287 {uri:string;name:string;mimeType?:string;[key:string]:unknown}
export interface DirectoryPage287 {resources:DirectoryResource287[];nextCursor?:string;[key:string]:unknown}
export interface DirectoryClient287 {request(request:{method:string;params:{uri:string;cursor?:string}},schema:z.ZodType<DirectoryPage287>,options:{timeout:number}):Promise<DirectoryPage287>}
export interface DirectoryConnection287 {name:string;capabilities?:{extensions?:Record<string,unknown>};client:DirectoryClient287}
export interface DirectoryProtocol287 {serverDeclaresDirectoryRead(capabilities:DirectoryConnection287['capabilities']):boolean;readMcpDirectory(connection:DirectoryConnection287,uri:string):Promise<DirectoryResource287[]>}
export interface DirectoryErrorClass287 {new(code:number,message:string,data?:unknown):Error&{code:number}}
export interface DirectoryErrorCodes287 {InvalidParams:number;MethodNotFound:number;UrlElicitationRequired:number}
export interface DirectorySharedPorts287 {Y1t:string;Ja():number;te(name:string,message:string):void;Os<T>(client:T):T}
export interface ModernDirectoryPorts287 extends DirectorySharedPorts287 {EAe:z.ZodType<DirectoryPage287>;Fs:DirectoryErrorCodes287;_l:DirectoryErrorClass287}
export interface LegacyDirectoryPorts287 extends DirectorySharedPorts287 {ZLe:z.ZodType<DirectoryPage287>;$s:DirectoryErrorCodes287;Ps:DirectoryErrorClass287}
export interface McpErrorClassification287 {getMcpErrorCode(error:unknown):number|undefined;isMcpMethodNotFoundError(error:unknown):boolean;isMcpNotADirectoryError(error:unknown):boolean;isMcpResourceNotFoundError(error:unknown):boolean;isMcpUnknownMethodError(error:unknown):boolean;isUrlElicitationRequiredMcpError(error:unknown):boolean}
export function createModernDirectoryRead287(ports:ModernDirectoryPorts287):DirectoryProtocol287
export function createLegacyDirectoryRead287(ports:LegacyDirectoryPorts287):DirectoryProtocol287
export function createModernMcpErrorClassification287(ports:Pick<ModernDirectoryPorts287,'Fs'|'_l'>):McpErrorClassification287
export function createLegacyMcpErrorClassification287(ports:Pick<LegacyDirectoryPorts287,'$s'|'Ps'>):McpErrorClassification287
