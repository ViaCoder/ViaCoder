import { textCommand } from '../noninteractive/types.js'
// Public CLI entry exists in both modes (wjt/Fse). Text behavior needs the window host.
export default textCommand('autocompact', 'Configure the auto-compact window size', () => import('./autocompact.js'), {argumentHint:'[auto|<tokens>]',thinClientDispatch:'post-text'})
