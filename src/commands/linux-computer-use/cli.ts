import type { Command } from '@commander-js/extra-typings'
import {
  doctorLinuxComputerUse, formatLinuxComputerUseDoctor, registerInstalledLinuxComputerUse,
} from '../../utils/linuxComputerUse/integration.js'

/** Called by the root Commander setup, not during normal startup. */
export function registerLinuxComputerUseCliCommand(program: Command): void {
  const command = program.command('linux-computer-use')
    .description('Diagnose or explicitly register an installed Linux computer-use MCP binary')
  command.command('doctor')
    .description('Read installed binary and desktop readiness without changing settings')
    .option('--binary <absolute-path>', 'Installed binary path')
    .action(async options => {
      process.stdout.write(formatLinuxComputerUseDoctor(await doctorLinuxComputerUse({ binary: options.binary })) + '\n')
    })
  command.command('register')
    .description('Add the installed binary to local MCP config for the next session')
    .option('--binary <absolute-path>', 'Installed binary path')
    .action(async options => {
      const result = await registerInstalledLinuxComputerUse({ binary: options.binary })
      if (result.kind === 'probe-unavailable') throw new Error(formatLinuxComputerUseDoctor(result.probe))
      if (result.kind === 'name-conflict') throw new Error('MCP name linux-computer-use is configured differently; no changes made')
      process.stdout.write(result.kind === 'registered'
        ? 'Registered local MCP server linux-computer-use. Start a new session to connect it.\n'
        : 'Linux computer use is already configured.\n')
    })
}

/** Explicit top-level CLI path shared by the product launcher and source entry. */
export async function runLinuxComputerUseCli(argv: string[] = process.argv): Promise<void> {
  const { Command } = await import('@commander-js/extra-typings')
  const program = new Command()
  registerLinuxComputerUseCliCommand(program)
  await program.parseAsync(argv)
}

// Source-tree operator entry uses the same command implementation as bin/cc.
if (import.meta.main) {
  await runLinuxComputerUseCli()
}
