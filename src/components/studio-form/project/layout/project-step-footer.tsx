import { useInitProjectMutation } from '@/api/use-init-project-mutation'
import { projectFormAtom } from '@/store/project-store'
import {
  ProjectStepsEnum,
  instantResponseSteps,
  isSkippableStepAtom,
  stepperAtom,
} from '@/store/stepper-store'
import { Button, Group } from '@mantine/core'
import { useAtomValue, useSetAtom } from 'jotai'
import { ArrowLeft } from 'lucide-react'
import { useProjectNavigation } from '../../../../hooks/use-project-navigation'

const ProjectStepFooter = ({ isValid }: { isValid?: boolean }) => {
  const project = useAtomValue(projectFormAtom)
  const navigation = useProjectNavigation()
  const initProject = useInitProjectMutation()
  const isSkippable = useAtomValue(isSkippableStepAtom)
  const noNextButton = instantResponseSteps.includes(navigation.step)

  const isLastStep = navigation.step === ProjectStepsEnum.Contact
  const isFirstStep = navigation.step === ProjectStepsEnum.Type
  const label = navigation.step === ProjectStepsEnum.Contact ? 'Submit' : 'Next'

  const setStep = useSetAtom(stepperAtom)

  const onNext = () => {
    if (isLastStep) {
      initProject.mutate({
        customer: {
          email: project.client.email,
        },
        project: {
          type: project.type,
          description: project.description,
          objectif: project.objectif,
          platform: project.platform ?? 'web',
          status: 'draft',
        },
      })
    }
    setStep({step: ProjectStepsEnum.Summary, subStep: null})
    return;
  }

  if (isFirstStep) {
    return;
  }

  return (
    <Group justify="space-between" pt={100}>
      <Button
        variant="transparent"
        bg="transparent"
        c="black"
        onClick={navigation.prev}
        leftSection={<ArrowLeft size={16} color="black" />}
        fz={18}
        size="lg"
      >
        Précédent
      </Button>

      <Group>
        {isSkippable && isValid === false && (
          <Button variant="light" onClick={navigation.skip} fz={18} size="lg">
            Faire ça plus tard
          </Button>
        )}
        {noNextButton === false && (
          <Button disabled={!isValid} onClick={onNext} fz={18} size="lg">
            {label}
          </Button>
        )}
      </Group>
    </Group>
  )
}

export default ProjectStepFooter
