import type {ThinkingBlock, ThinkingBlockParam} from '@anthropic-ai/sdk/resources/index.mjs'
import React from 'react'
import {Box, Text} from '../../ink.js'
import {CtrlOToExpand} from '../CtrlOToExpand.js'
import {Markdown} from '../Markdown.js'

type Props = {
  param: ThinkingBlock | ThinkingBlockParam | {type: 'thinking'; thinking: string; signature?: string}
  addMargin?: boolean
  isTranscriptMode: boolean
  verbose: boolean
  hideInTranscript?: boolean
}

export function AssistantThinkingMessage({
  param, addMargin = false, isTranscriptMode, verbose, hideInTranscript = false,
}: Props): React.ReactNode {
  const {thinking} = param
  const signature = 'signature' in param ? param.signature : undefined
  if (!thinking && !signature) return null
  if (hideInTranscript && !verbose) return null
  if (!isTranscriptMode && !verbose) {
    return <Box marginTop={addMargin ? 1 : 0}>
      <Text dimColor italic>∴ Thinking <CtrlOToExpand /></Text>
    </Box>
  }
  return <Box flexDirection="column" gap={1} marginTop={addMargin ? 1 : 0} width="100%">
    <Text dimColor italic>{thinking ? '∴ Thinking' : '∴ Thinking (text not returned)'}</Text>
    {thinking ? <Box paddingLeft={2}><Markdown dimColor>{thinking}</Markdown></Box> : null}
    {signature ? <Box paddingLeft={2} flexDirection="column">
      <Text dimColor>Signature (not thinking text)</Text>
      <Text dimColor>{signature}</Text>
    </Box> : null}
  </Box>
}
