// Exact original IJ.engineFeed expression; per-actor original queue/lock.
export function createHotEngineFeed287(YZ){return {input:null,pendingQueryParams:[],readLock:YZ()}}
export function createHotPendingQueryReader287(feed){return function(){return ()=>{let h=this.engineFeed.pendingQueryParams.shift();if(h===void 0)throw Error("engine: queryParams called before send \u2014 turn wiring bug");return h}}.call({engineFeed:feed})}
