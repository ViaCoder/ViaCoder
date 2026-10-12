import * as React from 'react';
import {createRetryStatusNormalizer286, type RetryStatusMalformedReason286} from '../services/api/officialByteWatchdog286/normalizer.runtime.js';
import {logError} from '../utils/log.js';
import type {RetryStatus286} from '../services/api/retryStatus.js';
import {hasGatewayInjection} from '../services/remoteManagedSettings/clientRuntime.js';
import {isFirstPartyAnthropicBaseUrl} from '../utils/model/providers.js';

type TerminalRetryStatus286 = RetryStatus286 | {kind:'auto_mode_unavailable';[key:string]:unknown};
const nativeStatus = createRetryStatusNormalizer286({d:logError});

/** Query-local owner for the native 2.1.286 retry status. */
export function useRetryTerminalOwner286({onMalformedRetryStatus = nativeStatus.onMalformed}: {onMalformedRetryStatus?: (reason: RetryStatusMalformedReason286) => void} = {}) {
  const [status, setStatus] = React.useState<TerminalRetryStatus286>(null);
  const malformedSeen = React.useRef(new Set<string>());
  const activeSignal = React.useRef<AbortSignal | null>(null);
  const removeAbortListener = React.useRef<(() => void) | null>(null);
  const end = React.useCallback((signal: AbortSignal) => {
    if (activeSignal.current !== signal) return;
    removeAbortListener.current?.();
    removeAbortListener.current = null;
    activeSignal.current = null;
    setStatus(null);
  }, []);
  const begin = React.useCallback((signal: AbortSignal) => {
    if (activeSignal.current) end(activeSignal.current);
    setStatus(null);
    if (signal.aborted) {
      activeSignal.current = null;
      removeAbortListener.current = null;
      return;
    }
    activeSignal.current = signal;
    const clearOnAbort = () => end(signal);
    signal.addEventListener('abort', clearOnAbort, {once: true});
    removeAbortListener.current = () => signal.removeEventListener('abort', clearOnAbort);
  }, [end]);
  const onRetryStatus = React.useCallback((signal: AbortSignal, value: unknown) => {
    if (activeSignal.current !== signal || signal.aborted) return;
    const {status: normalized, malformed} = nativeStatus.normalize(value);
    if (malformed !== null && !malformedSeen.current.has(malformed)) {
      malformedSeen.current.add(malformed);
      try {onMalformedRetryStatus(malformed);} catch {}
    }
    setStatus(normalized as TerminalRetryStatus286);
  }, [onMalformedRetryStatus]);

  React.useEffect(() => () => {
    removeAbortListener.current?.();
    removeAbortListener.current = null;
    activeSignal.current = null;
  }, []);

  return {status, begin, onRetryStatus, end};
}

/** Exact retrying-status exhaustion predicate used by 2.1.286's main Fn spinner. */
export function isOfficialOverloadExhaustion286(
  status: TerminalRetryStatus286,
): status is Extract<RetryStatus286, {kind: 'retrying'}> {
  return status?.kind === 'retrying' &&
    (status.error.status === 529 || status.error.formatted.toLowerCase().includes('overload')) &&
    status.attempt >= Math.min(3, status.maxRetries);
}

/** Provider-specific suffix selected by the original main spinner's x$n(). */
export function getOfficialOverloadHint286(status: TerminalRetryStatus286): string | null {
  if (!isOfficialOverloadExhaustion286(status)) return null;
  const statusURL = 'https://status.claude.com';
  if (process.env.CLAUDE_CODE_USE_GATEWAY || hasGatewayInjection()) {
    return 'If it persists, check your Cloud gateway service status.';
  }
  if (process.env.CLAUDE_CODE_USE_BEDROCK) {
    return 'If it persists, check your Amazon Bedrock service status.';
  }
  if (process.env.CLAUDE_CODE_USE_FOUNDRY) {
    return 'If it persists, check your Microsoft Foundry service status.';
  }
  if (process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS) {
    return `If it persists, check ${statusURL}.`;
  }
  if (process.env.CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD) {
    return `If it persists, check ${statusURL} and Google Cloud's status page.`;
  }
  if (process.env.CLAUDE_CODE_USE_MANTLE) {
    return 'If it persists, check your Amazon Bedrock (Mantle) service status.';
  }
  if (process.env.CLAUDE_CODE_USE_VERTEX) return 'If it persists, check your Google Vertex AI service status.';
  if (process.env._CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL || isFirstPartyAnthropicBaseUrl()) {
    return `If it persists, check ${statusURL}.`;
  }
  const baseURL = process.env.ANTHROPIC_BASE_URL ?? '';
  let host = baseURL;
  try {
    host = URL.parse(baseURL)?.host || baseURL;
  } catch {}
  return `If it persists, check your inference gateway (${host}).`;
}
