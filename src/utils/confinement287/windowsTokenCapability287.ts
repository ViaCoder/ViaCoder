import { ConfinementPolicyError287 } from './confinementError287.js'
import type { WindowsTokenCapability287, WindowsTokenFacts287 } from './processPrivilege287.js'
import type { Library } from 'bun:ffi'

// Win32 ABI: BOOL/DWORD/enum are 32 bits; HANDLE is 64 bits on both supported
// architectures. Use u64 for HANDLE (including pseudo-handles), never JS i32.
// Source contracts: Microsoft OpenProcessToken, OpenThreadToken,
// GetTokenInformation, DuplicateTokenEx, CheckTokenMembership, TOKEN_GROUPS,
// SID_AND_ATTRIBUTES, TOKEN_ELEVATION and TOKEN_ELEVATION_TYPE documentation.
const kernelDefinitions = {
  GetCurrentProcess: { args: [], returns: 'u64' },
  GetCurrentThread: { args: [], returns: 'u64' },
  GetCurrentProcessId: { args: [], returns: 'u32' },
  GetLastError: { args: [], returns: 'u32' },
  CloseHandle: { args: ['u64'], returns: 'i32' },
} as const
const tokenDefinitions = {
  OpenProcessToken: { args: ['u64', 'u32', 'ptr'], returns: 'i32' },
  OpenThreadToken: { args: ['u64', 'u32', 'i32', 'ptr'], returns: 'i32' },
  GetTokenInformation: { args: ['u64', 'u32', 'ptr', 'u32', 'ptr'], returns: 'i32' },
  DuplicateTokenEx: { args: ['u64', 'u32', 'ptr', 'u32', 'u32', 'ptr'], returns: 'i32' },
  CreateWellKnownSid: { args: ['u32', 'ptr', 'ptr', 'ptr'], returns: 'i32' },
  CheckTokenMembership: { args: ['u64', 'ptr', 'ptr'], returns: 'i32' },
} as const

const TOKEN_QUERY = 0x0008
const TOKEN_DUPLICATE = 0x0002
const ERROR_NO_TOKEN = 1008
const ERROR_INSUFFICIENT_BUFFER = 122
const TokenGroups = 2
const TokenType = 8
const TokenElevationType = 18
const TokenElevation = 20
const TokenPrimary = 1
const TokenImpersonation = 2
const SecurityIdentification = 1
const WinBuiltinAdministratorsSid = 26
const SE_GROUP_ENABLED = 0x00000004
const SE_GROUP_USE_FOR_DENY_ONLY = 0x00000010
const MAX_GROUP_BYTES = 1024 * 1024

function unavailable(): never {
  // No native exceptions, paths, SID/account identifiers or auth in logs.
  throw new ConfinementPolicyError287('PRIVILEGE_CHECK_UNAVAILABLE')
}

function view(bytes: Uint8Array): DataView {
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
}

function ownedHandle(slot: Uint8Array): bigint {
  const handle = view(slot).getBigUint64(0, true)
  // Real token handles only; never CloseHandle a NULL/INVALID/pseudo handle.
  if (handle === 0n || handle >= 0x8000000000000000n) unavailable()
  return handle
}

/**
 * Synchronous trusted bootstrap, not a serialized/settings-supplied capability.
 * Importing this module on POSIX/Node has no native side effects. DLLs are opened
 * only inside query, with no cached token facts and no persistent native handles.
 * This is an identity snapshot, NOT an OS worker sandbox or a same-process
 * security boundary against hostile native code changing tokens concurrently.
 */
export function createWindowsTokenCapability287(): WindowsTokenCapability287 {
  if (process.platform !== 'win32' || !['x64', 'arm64'].includes(process.arch)) unavailable()
  let ffi: typeof import('bun:ffi')
  try {
    // Follow the existing synchronous Bun FFI loader in upstreamproxy.ts and
    // officialOAuthPlatform/runtime.js, but NEVER use their spawn fallback.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ffi = require('bun:ffi') as typeof import('bun:ffi')
  } catch { unavailable() }

  return Object.freeze({
    kind: 'windows-current-process-token-v1' as const,
    queryCurrentProcessToken(): WindowsTokenFacts287 {
      let kernel: Library<typeof kernelDefinitions> | undefined
      let tokens: Library<typeof tokenDefinitions> | undefined
      const processSlot = new Uint8Array(8)
      const duplicateSlot = new Uint8Array(8)
      const threadSlot = new Uint8Array(8)
      let facts: WindowsTokenFacts287 | undefined
      let failed = false

      // Attempt every cleanup even if another CloseHandle/library close fails.
      function closeSlot(slot: Uint8Array): void {
        const raw = view(slot).getBigUint64(0, true)
        if (raw === 0n) return
        slot.fill(0)
        if (raw >= 0x8000000000000000n || !kernel) { failed = true; return }
        try { if (kernel.symbols.CloseHandle(raw) === 0) failed = true }
        catch { failed = true }
      }

      try {
        // Both are Windows system KnownDLLs; no env/CWD-derived DLL path.
        kernel = ffi.dlopen('kernel32.dll', kernelDefinitions)
        tokens = ffi.dlopen('advapi32.dll', tokenDefinitions)
        const k = kernel.symbols
        const t = tokens.symbols
        const processId = k.GetCurrentProcessId()
        if (!Number.isSafeInteger(processId) || processId <= 0 || processId !== process.pid) unavailable()

        function rejectThreadImpersonation(): void {
          try {
            // OpenAsSelf=TRUE avoids an impersonated thread access check hiding
            // the token. ANY thread token (even limited/anonymous) is rejected.
            const opened = t.OpenThreadToken(k.GetCurrentThread(), TOKEN_QUERY, 1, ffi.ptr(threadSlot))
            if (opened !== 0) unavailable()
            // Capture immediately: only ERROR_NO_TOKEN proves no impersonation.
            const error = k.GetLastError()
            if (error !== ERROR_NO_TOKEN || view(threadSlot).getBigUint64(0, true) !== 0n) unavailable()
          } finally { closeSlot(threadSlot) }
          if (failed) unavailable()
        }

        rejectThreadImpersonation()
        if (t.OpenProcessToken(k.GetCurrentProcess(), TOKEN_QUERY | TOKEN_DUPLICATE, ffi.ptr(processSlot)) === 0) unavailable()
        const processToken = ownedHandle(processSlot)

        function dword(token: bigint, informationClass: number): number {
          const result = new Uint8Array(4).fill(0xff)
          const length = new Uint8Array(4)
          if (t.GetTokenInformation(token, informationClass, ffi.ptr(result), 4, ffi.ptr(length)) === 0 ||
              view(length).getUint32(0, true) !== 4) unavailable()
          return view(result).getUint32(0, true)
        }

        if (dword(processToken, TokenType) !== TokenPrimary) unavailable()
        const elevation = dword(processToken, TokenElevation)
        const elevationType = dword(processToken, TokenElevationType)
        if ((elevation !== 0 && elevation !== 1) || ![1, 2, 3].includes(elevationType)) unavailable()

        // SID allocation is JS-owned, not AllocateAndInitializeSid/LocalAlloc;
        // no native SID allocation can leak on a failing call.
        const adminSid = new Uint8Array(68) // SECURITY_MAX_SID_SIZE
        const sidSize = new Uint8Array(4)
        view(sidSize).setUint32(0, adminSid.length, true)
        if (t.CreateWellKnownSid(WinBuiltinAdministratorsSid, null, ffi.ptr(adminSid), ffi.ptr(sidSize)) === 0 ||
            view(sidSize).getUint32(0, true) !== 16 || adminSid[0] !== 1 || adminSid[1] !== 2) unavailable()

        // CheckTokenMembership requires an IMPERSONATION token when non-NULL.
        // Explicit duplication prevents an implicit thread/effective token query.
        if (t.DuplicateTokenEx(processToken, TOKEN_QUERY, null, SecurityIdentification,
          TokenImpersonation, ffi.ptr(duplicateSlot)) === 0) unavailable()
        const duplicateToken = ownedHandle(duplicateSlot)
        if (dword(duplicateToken, TokenType) !== TokenImpersonation) unavailable()
        const member = new Uint8Array(4).fill(0xff)
        if (t.CheckTokenMembership(duplicateToken, ffi.ptr(adminSid), ffi.ptr(member)) === 0) unavailable()
        const membership = view(member).getUint32(0, true)
        if (membership !== 0 && membership !== 1) unavailable()

        // Restricted tokens can make CheckTokenMembership return FALSE despite
        // an enabled normal SID. Independently inspect the original TokenGroups.
        const required = new Uint8Array(4)
        if (t.GetTokenInformation(processToken, TokenGroups, null, 0, ffi.ptr(required)) !== 0) unavailable()
        if (k.GetLastError() !== ERROR_INSUFFICIENT_BUFFER) unavailable()
        const capacity = view(required).getUint32(0, true)
        if (capacity < 8 || capacity > MAX_GROUP_BYTES) unavailable()
        const groups = new Uint8Array(capacity)
        const returned = new Uint8Array(4)
        const base = BigInt(ffi.ptr(groups))
        if (t.GetTokenInformation(processToken, TokenGroups, ffi.ptr(groups), capacity, ffi.ptr(returned)) === 0) unavailable()
        const length = view(returned).getUint32(0, true)
        if (length < 8 || length > capacity) unavailable()
        const data = view(groups)
        const count = data.getUint32(0, true)
        // 64-bit TOKEN_GROUPS: DWORD + 4 padding; 16-byte SID_AND_ATTRIBUTES.
        if (count > Math.floor((length - 8) / 16)) unavailable()
        const sidStart = 8 + count * 16
        let adminEnabled = membership === 1
        for (let index = 0; index < count; index++) {
          const row = 8 + index * 16
          const relative = data.getBigUint64(row, true) - base
          // Read ONLY within the returned JS-owned buffer, never dereference an
          // arbitrary native SID pointer with toBuffer/read/CString.
          if (relative < BigInt(sidStart) || relative > BigInt(length - 8)) unavailable()
          const offset = Number(relative)
          const sidLength = 8 + 4 * groups[offset + 1]!
          if (groups[offset] !== 1 || groups[offset + 1]! > 15 || offset + sidLength > length) unavailable()
          if (sidLength !== 16 || !adminSid.subarray(0, 16).every((byte, i) => byte === groups[offset + i])) continue
          const attributes = data.getUint32(row + 8, true)
          if ((attributes & SE_GROUP_ENABLED) !== 0) {
            if ((attributes & SE_GROUP_USE_FOR_DENY_ONLY) !== 0) unavailable()
            adminEnabled = true
          }
        }

        rejectThreadImpersonation()
        facts = Object.freeze({
          processId,
          elevated: elevation === 1,
          elevationType: elevationType === 1 ? 'default' : elevationType === 2 ? 'full' : 'limited',
          administratorsSidEnabled: adminEnabled,
        })
      } catch { failed = true }
      finally {
        closeSlot(threadSlot)
        closeSlot(duplicateSlot)
        closeSlot(processSlot)
        for (const library of [tokens, kernel]) {
          try { library?.close() } catch { failed = true }
        }
      }
      if (failed || !facts) unavailable()
      return facts
    },
  })
}
