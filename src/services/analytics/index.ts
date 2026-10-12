/** Local builds do not collect or transmit automatic product analytics.
 * Keep these leaf calls so upstream business logic can be ported without a
 * telemetry dependency. There is deliberately no queue, sink, timer or I/O.
 * Explicit customer OTEL is handled separately in utils/telemetry.
 */
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = never
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED = never
type LogEventMetadata = { [key: string]: boolean | number | undefined }

export function logEvent(_name: string, _metadata: LogEventMetadata): void {}
export async function logEventAsync(_name: string, _metadata: LogEventMetadata): Promise<void> {}
