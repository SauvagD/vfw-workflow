import { atom } from 'jotai'

export enum ProjectStepsEnum {
  Type = 'type',
  Objectif = 'objectif',
  References = 'references',
  Tech = 'tech',
  Contact = 'contact',
  Summary = 'summary',
}

export enum ProjectObjectiveSubStepEnum {
  Objective = 'objective',
  Description = 'description',
}

export enum ProjectReferencesSubStepEnum {
  Files = 'files',
  Links = 'links',
}

// Ordre des étapes
const projectStepsOrder = [
  ProjectStepsEnum.Type,
  ProjectStepsEnum.Objectif,
  ProjectStepsEnum.References,
  ProjectStepsEnum.Contact,
  ProjectStepsEnum.Summary,
]

export const instantResponseSteps = [
  ProjectStepsEnum.Type,
  ProjectStepsEnum.Objectif,
]

const projectSkippableSteps = [
  ProjectStepsEnum.References,
  ProjectStepsEnum.Tech,
]

const subStepPerStep: any = {}

// Atom principal contenant l'étape actuelle
export const stepperAtom = atom<{
  step: ProjectStepsEnum
  subStep: ProjectObjectiveSubStepEnum | null
}>({
  step: ProjectStepsEnum.Type,
  subStep: null,
})

function getCurrentStepIndex(step: ProjectStepsEnum) {
  return projectStepsOrder.findIndex((projectStep) => step === projectStep)
}

export const goToNextStepAtom = atom(null, (get, set) => {
  const currentStep = get(stepperAtom)
  const currentIndex = getCurrentStepIndex(currentStep.step)

  if (currentIndex === -1) return

  const nextStep = projectStepsOrder[currentIndex + 1]
  if (currentStep.subStep === null) {
    if (!nextStep) return // Si c'est la dernière étape, on ne fait rien
    const subSteps = subStepPerStep[nextStep]
    if (!subSteps) {
      set(stepperAtom, {
        step: nextStep,
        subStep: null,
      })
      return
    }
    set(stepperAtom, {
      step: nextStep,
      subStep: subSteps[0],
    })
  }

  const currentSubSteps = subStepPerStep[currentStep.step]
  const isCurrentSubStepLast =
    currentSubSteps?.length - 1 === currentSubSteps.indexOf(currentStep.subStep)
  if (isCurrentSubStepLast === false) {
    set(stepperAtom, {
      step: currentStep.step,
      subStep:
        currentSubSteps[currentSubSteps.indexOf(currentStep.subStep) + 1],
    })
    return
  }

  const nextSubSteps = subStepPerStep[nextStep]

  if (!nextSubSteps) {
    set(stepperAtom, {
      step: nextStep,
      subStep: null,
    })
    return
  }

  set(stepperAtom, {
    step: nextStep,
    subStep: nextSubSteps[0], // On passe à la première sous-étape de l'étape suivante
  })
})

export const isSkippableStepAtom = atom((get) => {
  const currentStep = get(stepperAtom)
  return (
    currentStep.step !== ProjectStepsEnum.Contact &&
    projectSkippableSteps.includes(currentStep.step)
  )
})

export const skipStepAtom = atom(null, (get, set) => {
  const currentStep = get(stepperAtom)
  const currentIndex = getCurrentStepIndex(currentStep.step)
  if (currentIndex === -1) return
  const nextStep = projectStepsOrder[currentIndex + 1]
  if (!nextStep) return // Si c'est la dernière étape, on ne fait rien
  set(stepperAtom, {
    step: nextStep,
    subStep: null, // On ne garde pas de sous-étape
  })
})

// Atom pour aller à l'étape précédente
export const goToPreviousStepAtom = atom(null, (get, set) => {
  const currentStep = get(stepperAtom)
  const currentIndex = getCurrentStepIndex(currentStep.step)

  if (currentIndex > 0) {
    const previousStep = projectStepsOrder[currentIndex - 1]
    const subSteps = subStepPerStep[previousStep]
    if (!subSteps) {
      set(stepperAtom, {
        step: previousStep,
        subStep: null,
      })
      return
    }
    if (currentStep.subStep === null) {
      // Si on n'est pas dans une sous-étape, on passe à la dernière sous-étape de l'étape précédente
      set(stepperAtom, {
        step: previousStep,
        subStep: subSteps[subSteps.length - 1],
      })
      return
    }
    const currentSubStepIndex = subSteps.indexOf(currentStep.subStep)
    if (currentSubStepIndex === -1) return
    if (currentSubStepIndex > 0) {
      // Si on n'est pas à la première sous-étape, on passe à la précédente
      set(stepperAtom, {
        step: previousStep,
        subStep: subSteps[currentSubStepIndex - 1],
      })
    } else {
      // Si on est à la première sous-étape, on revient à l'étape précédente sans sous-étape
      set(stepperAtom, {
        step: previousStep,
        subStep: null,
      })
    }
    // set(stepperAtom, { step: previousStep, subStep: null })
  }
})

export const progressAtom = atom((get) => {
  const currentStep = get(stepperAtom)
  return projectStepsOrder.indexOf(currentStep.step) / projectStepsOrder.length
})
