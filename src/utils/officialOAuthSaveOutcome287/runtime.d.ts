export interface OAuthSaveOutcomeProcess287 {
  env: Record<string, string | undefined>;
}

export interface OAuthSaveOutcomeTokens287 {
  accessToken: string;
}

export type useStorageWriteResult = {
  success: boolean;
  transient?: unknown;
};

export interface OAuthSaveOutcomeEnvironment287 {
  CLAUDE_CODE_OAUTH_TOKEN?: string;
}

export interface OAuthSaveOutcomePorts287 {
  process: OAuthSaveOutcomeProcess287;
  clearTokenCache: () => unknown;
  fdToken: () => unknown;
  replaceFdToken: (token: string | null) => unknown;
  replaceBgSnapshot: (value: false) => unknown;
  environment: OAuthSaveOutcomeEnvironment287;
  platform: () => string;
}

export class OAuthLoginStorageError287 extends Error {
  telemetryMessage: string;
  errorClass: unknown;
  constructor(message: string, telemetryMessage?: string, errorClass?: unknown);
}

export function createOAuthSaveOutcome287(ports: OAuthSaveOutcomePorts287): {
  apply(tokens: OAuthSaveOutcomeTokens287, result: useStorageWriteResult): void;
};
