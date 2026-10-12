// Complete original aJo Recall import/then consumer; only fixed module transportation.
export function createRecallStartupConsumer287(ports){return new Function("ports","const {o,importRecall287}=ports;return ()=>(importRecall287().then((u)=>u.maybePrewarmRecallIndex(o)));")(ports)}
