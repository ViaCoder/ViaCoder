export type BrowserOpenResult287 = {ok:true}|{ok:false;reason:'invalid_url'|'no_display'|'opener_missing'|'timeout'|'spawn_error'|'nonzero_exit'|'unknown';detail?:string};
export interface BrowserOpener287 {
 open(url:string):Promise<boolean>;
 openDetailed(url:string):Promise<BrowserOpenResult287>;
}
export function createBrowserOpener287(platform:string,ports:Record<string,unknown>):BrowserOpener287;
