export type OfficialProvider287 = 'gateway' | 'bedrock' | 'foundry' | 'anthropicAws' | 'anthropicGoogleCloud' | 'mantle' | 'vertex' | 'firstParty'
export interface OfficialProviderSelectionPorts287 {
  environment(): { CLAUDE_CODE_USE_BEDROCK?: boolean; CLAUDE_CODE_USE_FOUNDRY?: boolean; CLAUDE_CODE_USE_ANTHROPIC_AWS?: boolean; CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD?: boolean; CLAUDE_CODE_USE_MANTLE?: boolean; CLAUDE_CODE_USE_VERTEX?: boolean }
  gatewayAuth(): unknown
  gatewayServerProcess(): unknown
  gatewayRequiredByHostPolicy(): unknown
}
export declare function createOfficialProviderSelection287(ports: OfficialProviderSelectionPorts287): { provider(): OfficialProvider287 }
