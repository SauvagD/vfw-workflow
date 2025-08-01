import { useAtom } from 'jotai'
import {
  goToNextStepAtom,
  goToPreviousStepAtom,
  stepperAtom,
} from '../store/stepper-store'

export function useProjectNavigation() {
  const [step] = useAtom(stepperAtom)
  const [, goNext] = useAtom(goToNextStepAtom)
  const [, goPrev] = useAtom(goToPreviousStepAtom)
  return {
    next: goNext,
    prev: goPrev,
    step,
  }
}
