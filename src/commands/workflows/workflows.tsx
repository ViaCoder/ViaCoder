import React, { useEffect, useState } from 'react'
import { Box, Text, useInput } from '../../ink.js'
import { useAppState } from '../../state/AppState.js'
import type { LocalJSXCommandCall } from '../../types/command.js'
import { listPersistedWorkflowRuns, type PersistedWorkflowRun } from '../../tasks/LocalWorkflowTask/journal.js'

export const call: LocalJSXCommandCall = async onDone => <WorkflowBrowser onDone={() => onDone()} />

function WorkflowBrowser({ onDone }: { onDone: () => void }): React.ReactNode {
  const tasks = useAppState(state => Object.values(state.tasks).filter(task => task.type === 'local_workflow'))
  const [persisted, setPersisted] = useState<PersistedWorkflowRun[]>([])
  useEffect(() => {
    let live = true
    void listPersistedWorkflowRuns().then(runs => { if (live) setPersisted(runs) })
    return () => { live = false }
  }, [])
  const liveIds = new Set(tasks.map(task => task.workflowRunId))
  useInput((_input, key) => { if (key.escape || key.return) onDone() })
  return <Box flexDirection="column">
    <Text bold>Workflows</Text>
    {tasks.map(task => <Text key={task.id}>{task.workflowRunId} · {task.workflowName} · {task.status}{task.error ? ` · ${task.error}` : ''}</Text>)}
    {persisted.filter(run => !liveIds.has(run.runId)).map(run =>
      <Text key={run.runId}>{run.runId} · {run.workflowName} · {run.status}{run.error ? ` · ${run.error}` : run.result !== undefined ? ` · ${JSON.stringify(run.result).slice(0, 160)}` : ''}</Text>)}
    {!tasks.length && !persisted.length ? <Text>No workflows in this session.</Text> : null}
    <Text dimColor>Esc/Enter to close</Text>
  </Box>
}
