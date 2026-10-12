import React from 'react'
import { Box, Text } from '../../ink.js'
import { getSearchReadSummaryText } from '../../utils/collapseReadSearch.js'
import type { RenderableMessage } from '../../types/message.js'

// Rendering adapter for ESr's public collapsed_read_search counters. The
// underlying message array and Ctrl+O archive remain untouched.
export function FocusSummary({message}:{message:RenderableMessage}):React.ReactNode {
  const group=message as RenderableMessage & Record<string,any>
  const parts=[getSearchReadSummaryText(group.searchCount,group.readCount,false,
    group.replCount??0,{memorySearchCount:group.memorySearchCount??0, memoryReadCount:group.memoryReadCount??0, memoryWriteCount:group.memoryWriteCount??0,teamMemorySearchCount:group.teamMemorySearchCount,teamMemoryReadCount:group.teamMemoryReadCount,teamMemoryWriteCount:group.teamMemoryWriteCount},group.listCount)].filter(Boolean)
  for(const [key,label] of [['bashCount','command'],['agentCount','agent'],['editFileCount','file edit'],
    ['mcpCallCount','MCP call'],['otherToolCount','tool call'],['frameCount','frame']] as const){
    const count=group[key]??0
    if(count)parts.push(`${count} ${label}${count===1?'':'s'}`)
  }
  if(group.linesAdded || group.linesRemoved)parts.push(`+${group.linesAdded??0}/−${group.linesRemoved??0} lines`)
  return <Box marginTop={1}><Text dimColor>{parts.join(' · ')||'Working'}{group.isLiveBriefTurn?'…':''} · Ctrl+O for full details</Text></Box>
}
