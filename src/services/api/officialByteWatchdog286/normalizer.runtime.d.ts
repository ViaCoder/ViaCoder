export type RetryStatusMalformedReason286 = 'not_a_retry_status' | 'counters_are_not_numbers' | 'error_is_nullish' | 'error_is_a_string' | 'error_is_not_an_object' | 'formatted_is_not_a_string' | 'rate_limit_type_is_not_a_string' | 'error_is_an_error_instance' | 'error_has_no_keys' | 'error_has_api_error_keys' | 'error_has_snapshot_keys' | 'error_is_another_object' | 'unreadable'
export type RetryStatusNormalization286 = {status:unknown;malformed:RetryStatusMalformedReason286|null}
export type RetryStatusNormalizer286 = {normalize(value:unknown):RetryStatusNormalization286;onMalformed(reason:RetryStatusMalformedReason286):void}
/** Exact extracted native normalizer; accepts unknown because native input validation is part of its behavior. */
export declare function createRetryStatusNormalizer286(ports:{d:(error:Error)=>void}):RetryStatusNormalizer286
