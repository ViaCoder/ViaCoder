import type React from 'react'
export interface PowerupDiscoveryProps287 {onDone():void}
export interface PowerupStartupPorts287 {
 P:{onboardingShown:boolean};e:typeof import('react/jsx-runtime').jsx
 importDiscovery287():Promise<{resolvePowerupDiscoveryArm():unknown}>
 importStep287():Promise<{PowerupDiscoveryStep:React.ComponentType<PowerupDiscoveryProps287>}>
}
export function createPowerupStartupStage287(ports:PowerupStartupPorts287):(done:()=>void)=>Promise<React.ReactNode>
