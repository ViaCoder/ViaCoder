// The complete 287 ee/ce/pe prompt; keep the original optional sections.
import { DIR_EXISTS_GUIDANCE, ENTRYPOINT_NAME, MAX_ENTRYPOINT_LINES } from '../../memdir/memdir.js'
import { createDreamPrompt287 } from './officialDreamTaskPrompt287/native.js'

export function buildConsolidationPrompt(
  memoryRoot: string, transcriptDir: string, extra: string,
  team = false, account = false, shared = false,
): string {
  // Resolve the existing Memory constants at call time: Memory imports the
  // Dream entry too, so constructing this factory at module load is cyclic.
  return createDreamPrompt287({
    OPe: DIR_EXISTS_GUIDANCE,
    Wd: ENTRYPOINT_NAME,
    NH: MAX_ENTRYPOINT_LINES,
    p_: 'memory_list',
    Nf: 'memory_read',
    kc: 'memory_write',
  })(memoryRoot, transcriptDir, extra, team, account, shared)
}
