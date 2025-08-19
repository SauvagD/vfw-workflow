import { useAtom, useAtomValue } from 'jotai'
import {
  goToNextStepAtom,
  goToPreviousStepAtom,
  skipStepAtom,
  stepperAtom,
} from '../store/stepper-store'

export function useProjectNavigation() {
  const step = useAtomValue(stepperAtom)
  console.log('step', step)
  const [, goNext] = useAtom(goToNextStepAtom)
  const [, goPrev] = useAtom(goToPreviousStepAtom)
  const [, skip] = useAtom(skipStepAtom)
  return {
    next: goNext,
    prev: goPrev,
    step: step.step,
    subStep: step.subStep,
    skip,
  }
}
