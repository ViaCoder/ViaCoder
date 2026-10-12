/** Full original public settings field, pinned by provenance.json. */
export function createWorktreeBgIsolationSchema287(B){return B(["worktree","none"]).optional().catch(void 0).describe("Isolation mode for background sessions in this repo. 'worktree' (default) blocks Edit/Write in the main checkout until EnterWorktree is called. 'none' lets background jobs edit the working copy directly.")}
