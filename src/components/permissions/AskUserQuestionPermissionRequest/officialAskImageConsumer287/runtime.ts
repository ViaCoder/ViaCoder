import {createAskImageConsumer287,type AskImages287} from './native.js'
/** Current request state and existing source paste/image ports only. No counter,
 * second image table, independent readiness store, or replacement question state. */
export function bindAskImageConsumer287(owner:{wouldTakeAnswer:()=>boolean;pastedContentsByQuestion:AskImages287;setPastedContentsByQuestion:import('react').Dispatch<import('react').SetStateAction<AskImages287>>;setAppState:unknown}){
 const existing=(import.meta.require('../../../../hooks/toolPermission/officialPublicAskMenu287/runtime.js') as typeof import('../../../../hooks/toolPermission/officialPublicAskMenu287/runtime.js')).publicAskMenuPorts287()
 const ports=existing as Pick<Parameters<typeof createAskImageConsumer287>[0],'PC'|'nU'|'Sme'|'bme'>
 return createAskImageConsumer287({...ports,X:owner.wouldTakeAnswer,Wt:owner.pastedContentsByQuestion,Yt:owner.setPastedContentsByQuestion,qt:owner.setAppState})
}
