import type { ComponentType, Dispatch, ReactNode, SetStateAction } from 'react'

export type WizardContextValue<T extends Record<string, unknown>> = {
  currentStepIndex: number
  totalSteps: number
  wizardData: T
  setWizardData: Dispatch<SetStateAction<T>>
  updateWizardData: (updates: Partial<T>) => void
  goNext: () => void
  goBack: () => void
  goToStep: (index: number) => void
  cancel: () => void
  title?: string
  showStepCounter?: boolean
}

// Steps read their data from useWizard<T>(), not injected component props.
export type WizardStepComponent<T extends Record<string, unknown>> = ComponentType<{}>

export type WizardProviderProps<T extends Record<string, unknown>> = {
  steps: WizardStepComponent<T>[]
  initialData?: T
  onComplete: (data: T) => void | Promise<void>
  onCancel?: () => void
  children?: ReactNode
  title?: string
  showStepCounter?: boolean
}
