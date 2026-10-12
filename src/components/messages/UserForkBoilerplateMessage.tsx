import type { TextBlockParam } from '@anthropic-ai/sdk/resources/index.mjs'
import type React from 'react'
import { FORK_BOILERPLATE_TAG, FORK_DIRECTIVE_PREFIX } from '../../constants/xml.js'
import { Box, Text } from '../../ink.js'

const boilerplate = new RegExp(`<${FORK_BOILERPLATE_TAG}>[\\s\\S]*?</${FORK_BOILERPLATE_TAG}>\\n*`)

/** Official 2.1.283 fork presentation: hide the worker boilerplate, show only its directive. */
export function UserForkBoilerplateMessage({ addMargin, param }: {
  addMargin: boolean
  param: TextBlockParam
}): React.ReactNode {
  const withoutBoilerplate = param.text.replace(boilerplate, '')
  const directive = withoutBoilerplate.startsWith(FORK_DIRECTIVE_PREFIX)
    ? withoutBoilerplate.slice(FORK_DIRECTIVE_PREFIX.length)
    : withoutBoilerplate
  return <Box marginTop={addMargin ? 1 : 0} backgroundColor="userMessageBackground" paddingRight={1}>
    <Text aria-label="fork:" dimColor>{'\u2442'}</Text>
    <Box paddingLeft={1}><Text>{directive}</Text></Box>
  </Box>
}
