import React from 'react'
import { Box, Text } from '../../ink.js'
import { FallbackPermissionRequest } from '../../components/permissions/FallbackPermissionRequest.js'
import type { PermissionRequestProps } from '../../components/permissions/PermissionRequest.js'

// The official permission workflow shows the resolved script, not merely its
// name. Keep the existing permission dialog controls and reveal the exact
// script before the user accepts or adds a named-workflow allow rule.
export function WorkflowPermissionRequest(props: PermissionRequestProps): React.ReactNode {
  const input = props.toolUseConfirm.input
  const script = typeof input.script === 'string' ? input.script : ''
  return <Box flexDirection="column">
    <Text bold>Review dynamic workflow before running</Text>
    {script && <Text>{script}</Text>}
    <FallbackPermissionRequest {...props} />
  </Box>
}
