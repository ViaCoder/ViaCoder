import React from 'react'
import {Box, Text} from '../../ink.js'
import {CtrlOToExpand} from '../CtrlOToExpand.js'

type Props = {
  addMargin?: boolean
  param?: {type: 'redacted_thinking'; data: string}
  verbose?: boolean
}

export function AssistantRedactedThinkingMessage({addMargin = false, param, verbose = false}: Props): React.ReactNode {
  return <Box flexDirection="column" gap={1} marginTop={addMargin ? 1 : 0} width="100%">
    <Text dimColor italic>∴ Thinking (encrypted; text not returned) {!verbose ? <CtrlOToExpand /> : null}</Text>
    {verbose && param?.data ? <Box paddingLeft={2} flexDirection="column">
      <Text dimColor>Encrypted data (not decrypted)</Text>
      <Text dimColor>{param.data}</Text>
    </Box> : null}
  </Box>
}
