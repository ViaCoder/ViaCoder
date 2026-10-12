import * as path from 'node:path'
import * as os from 'node:os'
import * as fs from 'node:fs'
import * as crypto from 'node:crypto'
import {Bt} from '../../utils/officialHostFilesystem287/native.js'
import {isSettingsPrimerEnabled287} from '../../utils/settings/settingsCache.js'
import {logForDebugging} from '../../utils/debug.js'
import {createOfficialConsentRecords287} from './officialConsentRecords287/native.js'

// Complete original records closure, real original standalone filesystem, and
// the existing primer gate. The same optional backend is passed per operation.
export const remoteConsentRecords287=createOfficialConsentRecords287({
 primerEnabled:isSettingsPrimerEnabled287,logging:logForDebugging,
 hostFilesystem:Bt,builtins:{path,os,fs,crypto},
})
