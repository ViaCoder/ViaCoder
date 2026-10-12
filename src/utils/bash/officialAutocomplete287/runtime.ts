import { createBashAutocomplete287, type BashAutocompleteParser287 } from './native.js'

// Lazy leaf reads avoid canonical lifecycle construction during module import.
// cb is already selected in m315 and returns the actual original Se/$e owner.
// The security/raw parser deliberately continues to use local getParserModule;
// sharing the TsNode ABI does not assert that those backend bodies are equal.
function lifecycle287() {
  return (import.meta.require('../../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
}

export function getBashAutocompleteParser287(): BashAutocompleteParser287 {
  const source = lifecycle287().clearSourceModule287('chunk-8hqf6tcv.js') as {
    cb(): BashAutocompleteParser287
  }
  return source.cb()
}

export const bashAutocomplete287 = createBashAutocomplete287({
  cb: getBashAutocompleteParser287,
  fO: () => {
    const source = lifecycle287().clearSourceModule287('chunk-mbfze585.js') as { fO(): boolean }
    return source.fO()
  },
  ku: () => {
    const source = lifecycle287().clearSourceModule287('chunk-mbfze585.js') as { ku(): boolean }
    return source.ku()
  },
})
