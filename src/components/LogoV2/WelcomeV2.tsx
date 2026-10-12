import {c as cache} from 'react/compiler-runtime'
import {jsx, jsxs} from 'react/jsx-runtime'
import {Box, Text, useTheme} from '../../ink.js'
import {useTerminalSize} from '../../hooks/useTerminalSize.js'
import {useScreenReader} from '../../ink/components/ScreenReaderContext.js'
import {env} from '../../utils/env.js'
import {renderWelcome287} from './officialWelcome287/native.js'

const cacheSentinel = Symbol.for('react.memo_cache_sentinel')

export function WelcomeV2() {
  const theme = useTheme()
  const screenReader = useScreenReader()
  const terminalSize = useTerminalSize()

  return renderWelcome287({
    w: cache,
    Jn: () => theme,
    Ze: () => screenReader,
    ve: () => terminalSize,
    r: jsxs,
    e: jsx,
    s: Box,
    n: Text,
    a: env,
    b: cacheSentinel,
    MACRO,
  })
}
