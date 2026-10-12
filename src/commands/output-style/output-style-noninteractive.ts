import {publicCommandSourcePort287} from '../../utils/commandCompletionProducers287.js'
import {getExecutionSession287,runWithExecutionSession287} from '../../services/context/execution287.js'
import type {LocalCommandCall} from '../../types/command.js'
import {createOutputStyleLocal287,type OutputStyleLocalPorts287} from './officialLocal287/native.js'
const imports=[{"name":"u1","module":"chunk-mphp7acd.js","export":"u1"},{"name":"oe","module":"chunk-s354e3rr.js","export":"oe"},{"name":"qJ","module":"chunk-scey49m3.js","export":"qJ"},{"name":"OHt","module":"chunk-mphp7acd.js","export":"OHt"},{"name":"yin","module":"chunk-mphp7acd.js","export":"yin"},{"name":"Hz","module":"chunk-amhtwhch.js","export":"Hz"},{"name":"dR","module":"chunk-amhtwhch.js","export":"dR"},{"name":"Kt","module":"chunk-hrhfcbdv.js","export":"Kt"},{"name":"tr","module":"chunk-s3exmmq6.js","export":"tr"},{"name":"_in","module":"chunk-mphp7acd.js","export":"_in"},{"name":"hn","module":"chunk-f1vb7bx7.js","export":"hn"},{"name":"Bo","module":"chunk-x5mcrns6.js","export":"Bo"},{"name":"yR","module":"chunk-bn3p37gv.js","export":"yR"},{"name":"i","module":"chunk-6hnyhakg.js","export":"i"},{"name":"SJt","module":"chunk-fs7r25h7.js","export":"SJt"},{"name":"S","module":"chunk-n4qghq20.js","export":"S"},{"name":"er","module":"chunk-f1vb7bx7.js","export":"er"},{"name":"SP","module":"chunk-mphp7acd.js","export":"SP"}] as const
/** Complete original k. Every imported reader/writer/cache/error/telemetry binding
 * is read from the installed canonical graph; no style enumeration is rewritten.
 * Original mTe is restored in the stateless factory because its canonical alias
 * is not selected. er/SP still use the same installed settings/catalog owners.
 * safe-mode/restricted entry rejection remains in the existing startup owner. */
export const call:LocalCommandCall=(args,context)=>{
 const session=context.session??getExecutionSession287()
 return runWithExecutionSession287(session,()=>{
  const ports=Object.fromEntries(imports.map(p=>{
   const value=publicCommandSourcePort287(p.module,p.export)
   if(value===undefined)throw Error('Missing original output-style import '+p.module+':'+p.export)
   return [p.name,value]
  })) as OutputStyleLocalPorts287
  return createOutputStyleLocal287(ports).call(args,context)
 })
}
