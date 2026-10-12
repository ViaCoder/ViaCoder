// Resolve the same original 287 dependency namespace used by clear and
// AppState. This adapter owns neither settings nor a second remote latch.
const gate = (name: 'bm' | 'C6' | 'RB'): boolean => {
  const {getClearLifecycleBinding287} = require('../../commands/clear/lifecycle287.js') as typeof import('../../commands/clear/lifecycle287.js')
  return (getClearLifecycleBinding287('chunk-mphp7acd.js', name) as () => boolean)()
}

export const isOfficialAutoCompactEnabled = (): boolean => gate('bm')
export const isReactiveCompactEnabled = (): boolean => gate('C6')
export const isPrecomputeCompactEnabled = (): boolean => gate('RB')
