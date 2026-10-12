import fs from 'node:fs'
import os from 'node:os'
import childProcess from 'node:child_process'
import { createRequire } from 'node:module'
import { createMdmRawRead287 } from '../officialMdmRawRead287/native.js'

// Select the matching platform closure; its original startup latch is the only owner.
export const mdmRawReader287 = createMdmRawRead287(
  `${process.platform}-${process.arch}`,
  { process, fs, os, childProcess, require: createRequire(import.meta.url) },
)
