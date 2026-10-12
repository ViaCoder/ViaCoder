import {
  createOfficialWindowsShell287,
  type WindowsShellHost287,
} from './officialWindowsShell287/native.js'
import {
  createCachedWindowsGitBashPath287,
  createWindowsGitBashDiscovery287,
  type WindowsGitBashCache287,
  type WindowsGitBashDiscoveryPorts287,
} from './officialWindowsShell287/gitBashDiscovery.js'

/**
 * Bind the recovered public shell-description closure to the real host readers.
 * This reports the upstream context string; it never starts or probes a shell.
 */
export function createWindowsShell287(host: WindowsShellHost287) {
  return createOfficialWindowsShell287(host)
}

/** Names expected by the recovered context kernel's original Ta/Yb import slots. */
export function createWindowsShell287Ports(host: WindowsShellHost287) {
  const shell = createWindowsShell287(host)
  return {Ta: shell.Ta, Yb: shell.Yb, shellDescription: shell.shellDescription}
}

/** Bind the upstream nullable discovery closure to the same cache used by the runtime caller. */
export function createWindowsShell287WithDiscovery(
  host: Omit<WindowsShellHost287, 'getGitBashPath'>,
  cache: WindowsGitBashCache287,
  ports: WindowsGitBashDiscoveryPorts287,
) {
  const discover = createWindowsGitBashDiscovery287(ports)
  const getGitBashPath = createCachedWindowsGitBashPath287(cache, discover)
  return createWindowsShell287({...host, getGitBashPath})
}
