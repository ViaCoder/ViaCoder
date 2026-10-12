/** Local, no-install discovery and stdio config for the upstream Windows-MCP project. */
import { statSync } from 'node:fs'
import { delimiter, win32 } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import type { McpStdioServerConfig } from '../../services/mcp/types.js'

export const WINDOWS_COMPUTER_USE_SERVER_NAME = 'windows-computer-use'

export type WindowsComputerUseArchitecture = 'x64' | 'arm64'

export interface WindowsComputerUseTarget {
  platform: NodeJS.Platform
  arch: string
}

export type WindowsComputerUseSelection =
  | {
      kind: 'unsupported-host'
      platform: NodeJS.Platform
      arch: string
      stdioConfig: null
      runtimeVerified: false
    }
  | {
      kind: 'unsupported-architecture'
      platform: 'win32'
      arch: string
      stdioConfig: null
      runtimeVerified: false
    }
  | {
      kind: 'backend-not-found'
      platform: 'win32'
      arch: WindowsComputerUseArchitecture
      searched: string[]
      stdioConfig: null
      runtimeVerified: false
    }
  | {
      kind: 'bridge-unavailable'
      platform: 'win32'
      arch: WindowsComputerUseArchitecture
      executable: string
      missing: 'python' | 'bridge'
      stdioConfig: null
      runtimeVerified: false
    }
  | {
      kind: 'stdio-config-ready'
      platform: 'win32'
      arch: WindowsComputerUseArchitecture
      executable: string
      upstream: 'CursorTouch/Windows-MCP'
      version: null
      stdioConfig: McpStdioServerConfig
      runtimeVerified: false
    }

export interface WindowsComputerUseDiscoveryOptions {
  target?: WindowsComputerUseTarget
  /** Optional explicit absolute path to the installed upstream windows-mcp.exe. */
  executable?: string
  /** Test seams; no candidate is ever launched during discovery. */
  pathForTest?: string
  isFileForTest?: (path: string) => boolean
}

function isWindowsAbsolute(path: string): boolean {
  return win32.isAbsolute(path)
}

function isRegularFile(path: string): boolean {
  try {
    return statSync(path).isFile()
  } catch {
    return false
  }
}

/**
 * Find only the documented, pre-installed console executable. PATH-only
 * discovery avoids user-home probing, shell execution, `uvx` network downloads,
 * and accidentally selecting an unrelated Python interpreter.
 */
export function selectDefaultWindowsComputerUseBackend(
  options: WindowsComputerUseDiscoveryOptions = {},
): WindowsComputerUseSelection {
  const target = options.target ?? { platform: process.platform, arch: process.arch }
  if (target.platform !== 'win32') {
    return {
      kind: 'unsupported-host', platform: target.platform, arch: target.arch,
      stdioConfig: null, runtimeVerified: false,
    }
  }
  if (target.arch !== 'x64' && target.arch !== 'arm64') {
    return {
      kind: 'unsupported-architecture', platform: 'win32', arch: target.arch,
      stdioConfig: null, runtimeVerified: false,
    }
  }

  const isFile = options.isFileForTest ?? isRegularFile
  const searched: string[] = []
  const candidates = options.executable !== undefined
    ? [options.executable]
    : (options.pathForTest ?? process.env.PATH ?? '')
      .split(options.pathForTest === undefined ? delimiter : ';')
      .filter(Boolean)
      .filter(isWindowsAbsolute)
      .map(directory => win32.join(directory, 'windows-mcp.exe'))

  for (const candidate of candidates) {
    if (!isWindowsAbsolute(candidate) || !candidate.toLowerCase().endsWith('windows-mcp.exe')) continue
    searched.push(candidate)
    if (!isFile(candidate)) continue
    // A venv keeps python.exe alongside its Scripts console entry point;
    // a base CPython installation keeps it one directory above Scripts.
    // Borrow only that installed environment, never an unrelated PATH Python.
    const python = [win32.join(win32.dirname(candidate), 'python.exe'),
      win32.join(win32.dirname(candidate), '..', 'python.exe')].find(isFile)
    const bridge = fileURLToPath(new URL('./upstream_bridge.py', import.meta.url))
    if (!python || !isFile(bridge)) return {
      kind: 'bridge-unavailable', platform: 'win32', arch: target.arch,
      executable: candidate, missing: python ? 'bridge' : 'python',
      stdioConfig: null, runtimeVerified: false,
    }
    return {
      kind: 'stdio-config-ready', platform: 'win32', arch: target.arch,
      executable: candidate,
      upstream: 'CursorTouch/Windows-MCP',
      // Deliberately unknown: discovery never executes the tool to query version.
      version: null,
      // Always launch the same-process extension: a plain upstream CLI lacks
      // CClaudeCUHost and must not be advertised as the unified executor.
      stdioConfig: {
        type: 'stdio', command: python,
        args: [bridge, 'serve', '--transport', 'stdio'],
        // v0.8.7 __main__.py::lifespan checks exactly this upstream opt-out.
        // Don't reintroduce automatic analytics through a desktop subprocess.
        env: { ANONYMIZED_TELEMETRY: 'false', FASTMCP_TELEMETRY_MODE: 'off',
          FASTMCP_CHECK_FOR_UPDATES: 'off', CCLAUDE_CU_HOST_TOKEN: randomUUID() },
      },
      // An existing executable/config says nothing about Windows desktop readiness.
      runtimeVerified: false,
    }
  }
  return {
    kind: 'backend-not-found', platform: 'win32', arch: target.arch,
    searched, stdioConfig: null, runtimeVerified: false,
  }
}

/** Native-host-only diagnostic; target injection cannot spoof Windows availability. */
export function doctorWindowsComputerUse(
  options: WindowsComputerUseDiscoveryOptions = {},
): WindowsComputerUseSelection {
  return selectDefaultWindowsComputerUseBackend({
    ...options,
    target: { platform: process.platform, arch: process.arch },
  })
}

export function formatWindowsComputerUseDoctor(result: WindowsComputerUseSelection): string {
  switch (result.kind) {
    case 'unsupported-host':
      return `Windows computer use: host unsupported for runtime verification (${result.platform}/${result.arch}); no MCP config emitted.`
    case 'unsupported-architecture':
      return `Windows computer use: unsupported architecture (${result.arch}); no MCP config emitted.`
    case 'backend-not-found':
      return `Windows computer use: installed windows-mcp.exe not found on PATH (${result.arch}); no auto-install or network lookup performed.`
    case 'bridge-unavailable':
      return `Windows computer use: installed backend ${result.executable} lacks the ${result.missing === 'python' ? 'same-environment python.exe' : 'CClaude executor bridge'}; no unified MCP config emitted.`
    case 'stdio-config-ready':
      return [
        `Windows computer use: found ${result.upstream} executable ${result.executable}`,
        `stdio MCP config: ${JSON.stringify({ ...result.stdioConfig, env: { ...result.stdioConfig.env,
          ...(result.stdioConfig.env?.CCLAUDE_CU_HOST_TOKEN ? { CCLAUDE_CU_HOST_TOKEN: '[redacted]' } : {}) } })}`,
        'Installed version is not queried; no upstream doctor protocol is documented here.',
        'MCP config construction is not a connection, capability, or desktop-action test.',
      ].join('\n')
  }
}
