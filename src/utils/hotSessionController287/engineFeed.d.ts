import type {HotEngineFeed287} from './runtime.js'
export function createHotEngineFeed287(lock:()=>HotEngineFeed287['readLock']):HotEngineFeed287
export function createHotPendingQueryReader287(feed:HotEngineFeed287):()=>import('../../query.js').QueryParams
