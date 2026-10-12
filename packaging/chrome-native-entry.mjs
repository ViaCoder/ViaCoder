// Dedicated Chrome native-messaging entry. This is the same production host
// function selected by src/entrypoints/cli.tsx --chrome-native-host.
import { runChromeNativeHost } from '../src/utils/claudeInChrome/chromeNativeHost.js'

await runChromeNativeHost()
