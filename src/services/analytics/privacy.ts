type Environment = Record<string, string | undefined>
const enabled = (value: string | undefined): boolean =>
  value !== undefined && ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())

/** Feature delivery is functional traffic, not experiment exposure reporting. */
export function isFeatureConfigurationEnabled(env: Environment): boolean {
  return env.NODE_ENV !== 'test' &&
    !env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC &&
    !enabled(env.CLAUDE_CODE_USE_BEDROCK) &&
    !enabled(env.CLAUDE_CODE_USE_VERTEX) &&
    !enabled(env.CLAUDE_CODE_USE_FOUNDRY)
}

/** An inherited endpoint alone is not consent to start an exporter. */
export function isCustomerTelemetryEnabled(env: Environment): boolean {
  return enabled(env.CLAUDE_CODE_ENABLE_TELEMETRY) &&
    !env.DISABLE_TELEMETRY && !env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
}
