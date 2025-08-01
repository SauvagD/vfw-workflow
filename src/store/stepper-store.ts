import { atom } from 'jotai'

export enum ProjectStepsEnum {
  Type = 'type',
  Objectif = 'objectif',
  References = 'references',
  Tech = 'tech',
  Contact = 'contact',
}

// Ordre des étapes
const projectStepsOrder = [
  ProjectStepsEnum.Type,
  ProjectStepsEnum.Objectif,
  ProjectStepsEnum.References,
  ProjectStepsEnum.Contact,
  ProjectStepsEnum.Tech,
]

// Atom principal contenant l'étape actuelle
export const stepperAtom = atom<ProjectStepsEnum>(ProjectStepsEnum.Type)

// Helpers
function getCurrentStepIndex(step: ProjectStepsEnum) {
  return projectStepsOrder.findIndex((projectStep) => step === projectStep)
}

// Atom pour aller à l'étape suivante
export const goToNextStepAtom = atom(null, (get, set) => {
  const currentStep = get(stepperAtom)
  const currentIndex = getCurrentStepIndex(currentStep)

  if (currentIndex < projectStepsOrder.length - 1) {
    const nextStep = projectStepsOrder[currentIndex + 1]
    set(stepperAtom, nextStep)
  }
})

// Atom pour aller à l'étape précédente
export const goToPreviousStepAtom = atom(null, (get, set) => {
  const currentStep = get(stepperAtom)
  const currentIndex = getCurrentStepIndex(currentStep)

  if (currentIndex > 0) {
    const previousStep = projectStepsOrder[currentIndex - 1]
    set(stepperAtom, previousStep)
  }
})
