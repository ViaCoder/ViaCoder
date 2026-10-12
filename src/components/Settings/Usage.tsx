import React from 'react'
import {useTerminalSize} from '../../hooks/useTerminalSize.js'
import {UsageRenderer287,type UsageUiContext287} from '../../services/api/usageUi287.js'
/** Full pinned public PlanLimits renderer, including initial eJt seed, model
 * scopes, local behavior/loop rows and extra-usage; no independent usage cache. */
export function Usage(context:UsageUiContext287={}):React.ReactNode {
 const {columns}=useTerminalSize()
 return <UsageRenderer287 {...context} maxWidth={Math.max(columns-8,0)}/>
}
