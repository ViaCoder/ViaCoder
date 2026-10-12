
/**
 * Initialize all bundled skills.
 * Called at startup to register skills that ship with the CLI.
 *
 * The complete original initializer and the public command reader use the
 * same canonical registry. Existing local skill leaves remain in that owner.
 */
export function initBundledSkills(): void {
  // Full original x5t owns the shared ro initialization latch and registry.
  // Its same commandRegistry port retains the existing bundled-skill C leaves;
  // no second flag or duplicate partial startup registration is introduced.
  const {getOriginalModsLifecycle287}=require("../../utils/hooks/modelSwitch287/lifecycleRuntime.js") as typeof import("../../utils/hooks/modelSwitch287/lifecycleRuntime.js")
  const initialize=getOriginalModsLifecycle287().clearSourceModule287("chunk-2fn6341y.js").x5t as ()=>void
  initialize()
}
