// WorkflowMultiselectDialog and setupGitHubActions support these two files.
export type Workflow = 'claude' | 'claude-review'

export type Warning = {
  title: string
  message: string
  instructions: string[]
}

// Required fields are initialized by INITIAL_STATE. Error details and the
// workflow decision are added later; choosing exit returns without storing it.
export type State = {
  step:
    | 'check-gh'
    | 'warnings'
    | 'choose-repo'
    | 'install-app'
    | 'check-existing-workflow'
    | 'select-workflows'
    | 'check-existing-secret'
    | 'api-key'
    | 'oauth-flow'
    | 'creating'
    | 'success'
    | 'error'
  selectedRepoName: string
  currentRepo: string
  useCurrentRepo: boolean
  apiKeyOrOAuthToken: string
  useExistingKey: boolean
  currentWorkflowInstallStep: number
  warnings: Warning[]
  secretExists: boolean
  secretName: string
  useExistingSecret: boolean
  workflowExists: boolean
  selectedWorkflows: Workflow[]
  selectedApiKeyOption: 'existing' | 'new' | 'oauth'
  authType: 'api_key' | 'oauth_token'
  workflowAction?: 'update' | 'skip'
  error?: string
  errorReason?: string
  errorInstructions?: string[]
}
