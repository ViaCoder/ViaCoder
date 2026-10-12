import {deepLinkParser287} from './parserRuntime287.js'
import type {DeepLinkAction287} from '../officialDeepLinkParser287/native.js'
export const DEEP_LINK_PROTOCOL=deepLinkParser287.protocol
export type DeepLinkAction=DeepLinkAction287
export const parseDeepLink=deepLinkParser287.parse
export const validateDeepLinkCwd287=deepLinkParser287.cwd
export const validateDeepLinkQuery287=deepLinkParser287.query
/** Existing local URL producer; accepted open fields remain backward compatible. */
export function buildDeepLink(action:{query?:string;cwd?:string;repo?:string}|Extract<DeepLinkAction,{action:'install-plugin'}>):string {
 const install='action' in action&&action.action==='install-plugin'
 const url=new URL(`${DEEP_LINK_PROTOCOL}://${install?'install-plugin':'open'}`)
 if(install){url.searchParams.set('plugin',action.plugin);url.searchParams.set('marketplace',action.marketplace)}
 else {const open=action as {query?:string;cwd?:string;repo?:string};if(open.query)url.searchParams.set('q',open.query);if(open.cwd)url.searchParams.set('cwd',open.cwd);if(open.repo)url.searchParams.set('repo',open.repo)}
 return url.toString()
}
