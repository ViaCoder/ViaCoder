import React, { useEffect, useState } from 'react'
import { Box, Text } from '../ink.js'
import type { LinuxComputerUseProbe } from '../utils/linuxComputerUse/index.js'
import { formatLinuxComputerUseDoctor } from '../utils/linuxComputerUse/integration.js'

type Props = {
  /** Offline UI-test seam; production uses the actual host platform. */
  platformForTest?: NodeJS.Platform
  /** Offline UI-test seam; production lazily runs only the read-only doctor. */
  probeForTest?: () => Promise<LinuxComputerUseProbe>
}

/** Only mounted by the explicit Doctor screen; no startup or settings side effect. */
export function LinuxComputerUseDoctorSection({ platformForTest, probeForTest }: Props = {}) {
  const platform = platformForTest ?? process.platform
  const [lines, setLines] = useState<string[]>(['Checking installed binary and desktop readiness…'])

  useEffect(() => {
    if (platform !== 'linux') return
    let active = true
    const run = probeForTest ?? (async () => {
      const { doctorLinuxComputerUse } = await import('../utils/linuxComputerUse/integration.js')
      return doctorLinuxComputerUse()
    })
    void run().then(probe => {
      if (active) setLines(formatLinuxComputerUseDoctor(probe).split('\n'))
    }).catch(error => {
      if (active) setLines([`Doctor check failed: ${error instanceof Error ? error.message : String(error)}`])
    })
    return () => { active = false }
  }, [platform, probeForTest])

  if (platform !== 'linux') return null
  return <Box flexDirection="column" marginTop={1}>
    <Text bold={true}>Linux computer use</Text>
    {lines.map((line, index) => <Text key={index}>└ {line}</Text>)}
  </Box>
}
