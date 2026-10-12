import {execFile, spawn} from 'node:child_process'
import {execa} from 'execa'
import {execFileNoThrow} from './execFileNoThrow.js'

/** OS producer boundaries only. Production retains the original primitives;
 * isolated hosts may supply fixed producers without replacing the startup
 * controllers, their caches, eligibility or the outbound guard. */
export const startupProcessPorts287 = {
  rgExecFile: execFile,
  rgSpawn: spawn,
  rgProbe: execFileNoThrow,
  ideProcesses: execa,
  processIdentity: execFile,
}
