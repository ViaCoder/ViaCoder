import React from 'react'
import { Box, Text, useInput } from '../../ink.js'
import type { LocalWorkflowTaskState } from '../../tasks/LocalWorkflowTask/LocalWorkflowTask.js'
import type { DeepImmutable } from '../../types/utils.js'

export function WorkflowDetailDialog({ workflow, onDone, onKill, onSkipAgent, onRetryAgent, onBack }: {
  workflow: DeepImmutable<LocalWorkflowTaskState>
  onDone: () => void
  onKill?: () => void
  onSkipAgent?: (agentId: string) => void
  onRetryAgent?: (agentId: string) => void
  onBack: () => void
}): React.ReactNode {
  const activeAgent = workflow.workflowProgress.findLast(event => event.type === 'workflow_agent' &&
    (event.state === 'start' || event.state === 'progress' || event.state === 'running'))
  useInput((input, key) => {
    if (key.escape) onBack()
    else if (input === 'x' && onKill) onKill()
    else if (input === 's' && onSkipAgent && activeAgent?.type === 'workflow_agent' && activeAgent.agentId) onSkipAgent(activeAgent.agentId)
    else if (input === 'r' && onRetryAgent && activeAgent?.type === 'workflow_agent' && activeAgent.agentId) onRetryAgent(activeAgent.agentId)
    else if (key.return && workflow.status !== 'running') onDone()
  })
  return <Box flexDirection="column">
    <Text bold>{workflow.title ?? workflow.workflowName}</Text>
    <Text>{workflow.summary ?? workflow.description}</Text>
    <Text>Status: {workflow.status} · agents: {workflow.agentCount} · run: {workflow.workflowRunId}</Text>
    {workflow.workflowProgress.slice(-20).map((event, index) => <Text key={index}>
      {event.type === 'workflow_log' ? event.message : event.type === 'workflow_phase' ? `Phase: ${event.title}` : `${event.label}: ${event.state}${event.error ? ` — ${event.error}` : ''}`}
    </Text>)}
    {workflow.error && <Text color="error">{workflow.error}</Text>}
    {workflow.status === 'completed' && <Text>{JSON.stringify(workflow.result)}</Text>}
    <Text dimColor>Esc back · x stop · s skip agent · r retry agent</Text>
  </Box>
}
