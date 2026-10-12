import type {FilesystemPathFs287,FilesystemAncestryOptions287} from '../officialFilesystemPaths287/native.js'
export type DeepLinkAction287={action:'open';query?:string;cwd?:string;repo?:string}|{action:'install-plugin';plugin:string;marketplace:string}
export interface DeepLinkParserPorts287 {
 SafeError:new(message:string,publicMessage?:string)=>Error
 isUnc(path:string):boolean;hasParent(path:string):boolean;isNetwork(path:string):boolean
 ancestry(fs:FilesystemPathFs287,path:string,options:FilesystemAncestryOptions287):string|symbol|undefined
 filesystem:FilesystemPathFs287;sanitize(text:string):string;marketplace:{repo:string}
 githubSlug:Pick<RegExp,'test'>;officialMarketplace(source:string):boolean
}
export interface DeepLinkParser287 {protocol:string;cwd(path:string,fs?:FilesystemPathFs287):void;query(text:string):string;plugin(name:string):void;marketplace(source:string):void;parse(uri:string):DeepLinkAction287}
export function createDeepLinkParser287(ports:DeepLinkParserPorts287,platform?:string,arch?:string):DeepLinkParser287
