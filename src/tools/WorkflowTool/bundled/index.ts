import { readFileSync } from 'node:fs'
import { registerBundledWorkflow } from '../scripts.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../../services/analytics/growthbook.js'

// Script bytes extracted without modification from fixed official 2.1.283
// linux-x64 raw/chunk-50vkmq9z.js function a -> qQr(...) template. The
// source module SHA-256 is 579e678e312ae4093ac2be7f176806a811f89d3bff2fa5b7b76ec407dc7b915a;
// extracted script SHA-256 is 9e4a49882edec8516ee4932092e9197c34a2e182af1b5e9132427cfdf9b233e7.
export async function initBundledWorkflows(): Promise<void> {
  // tools.ts calls this during import. Resolve after that import graph settles,
  // rather than constructing the canonical lifecycle inside its own ports.
  const {getWorkflowRegistry287} = await import('../officialLoader287/runtime.js')
  // Registration follows the current canonical host, including a new host.
  if (getWorkflowRegistry287().bundledWorkflows.some(workflow => workflow.name === 'deep-research')) return
  const script = readFileSync(new URL('./deep-research.js', import.meta.url), 'utf8')
  registerBundledWorkflow(script, {
    disableModelInvocation: () => !getFeatureValue_CACHED_MAY_BE_STALE('tengu_sorrel_avocet', false),
  })
}
