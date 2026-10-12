import { writeToStdout } from 'src/utils/process.js'

const SOURCE_RELEASE_UPDATE_MESSAGE =
  'This source distribution is updated with its own release package. Use that package to install or update it. No network request, installation, or configuration change was made.\n'

/**
 * Official self-update commands are intentionally disabled in this source
 * distribution. Keep this handler side-effect-free: `update`, `upgrade`,
 * `--update`, and `--upgrade` all resolve here.
 */
export async function update(): Promise<void> {
  writeToStdout(SOURCE_RELEASE_UPDATE_MESSAGE)
}
