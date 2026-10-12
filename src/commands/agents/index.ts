import { textCommand } from '../noninteractive/types.js'

// Official npm 2.1.283 chunk-wyjbafrm.js:hVo/yVo/tBe removed the wizard
// in both interactive and non-interactive sessions. Keep the notice callable.
export default textCommand(
  'agents',
  '(removed) Ask Claude to create/manage subagents, or edit .claude/agents/',
  () => import('./agents-noninteractive.js'),
  { isHidden: true, thinClientDispatch: 'post-text' },
)
