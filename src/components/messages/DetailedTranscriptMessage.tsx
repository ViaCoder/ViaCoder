import React, {useEffect,useMemo,useState} from 'react'
import {recordedOutputPaths,readRecordedOutput} from '../../utils/transcriptOutput.js'
import {Box,Text} from '../../ink.js'
import {formatTranscriptValue} from './transcriptDetail.js'

type DetailRecord={type:string;uuid:string;transcriptRecord?:DetailRecord}
function RecordedOutputs({paths}:{paths:string[]}) {
  const [outputs,setOutputs]=useState<{path:string;content?:string;error?:string}[]>(()=>paths.map(path=>({path})))
  useEffect(()=>{
    let disposed=false
    setOutputs(paths.map(path=>({path})))
    for(const path of paths)void readRecordedOutput(path).then(content=>{
      if(!disposed)setOutputs(items=>items.map(item=>item.path===path?{path,content}:item))
    },error=>{
      if(!disposed)setOutputs(items=>items.map(item=>item.path===path?{path,error:String(error)}:item))
    })
    return()=>{disposed=true}
  },[paths])
  return <>{outputs.map(output=><Box key={output.path} flexDirection="column">
    <Text bold>Recorded output · {output.path}</Text>
    <Text wrap="wrap">{output.content!==undefined?formatTranscriptValue(output.content):output.error?`Unavailable: ${output.error} (not re-executed)`:'Loading recorded output…'}</Text>
  </Box>)}</>
}

/** Display recorded values independently of tool summary renderers. External
 * output is read only while its virtual row is mounted, never re-executed. */
export function DetailedTranscriptMessage({message}:{message:DetailRecord}) {
  const source=message.transcriptRecord??message
  const {type,uuid,...record}=source
  const paths=useMemo(()=>recordedOutputPaths(source),[source])
  return <Box flexDirection="column" marginTop={1}>
    <Text bold>{type} · {uuid}</Text>
    <Text wrap="wrap">{formatTranscriptValue(record)}</Text>
    {paths.length>0 && <RecordedOutputs paths={paths}/>}
  </Box>
}
