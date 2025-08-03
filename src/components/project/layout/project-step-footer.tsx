import { useInitProjectMutation } from '@/api/use-init-project-mutation'
import { projectFormAtom } from '@/store/project-store'
import { ProjectStepsEnum } from '@/store/stepper-store'
import { Button, Group } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { useProjectNavigation } from '../../../hooks/use-project-navigation'

const ProjectStepFooter = ({ isValid }: { isValid: boolean }) => {
  const project = useAtomValue(projectFormAtom)
  const navigation = useProjectNavigation()
  const initProject = useInitProjectMutation()

  const isLastStep = navigation.step === ProjectStepsEnum.Contact
  const label = navigation.step === ProjectStepsEnum.Contact ? 'Submit' : 'Next'

  console.log({
    type: project.type,
    description: project.description,
    objectif: project.objectif,
    platform: project.platform,
  })

  const onNext = () => {
    if (isLastStep) {
      initProject.mutate({
        customer: {
          lastName: project.client.lastName,
          firstName: project.client.firstName,
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
      return
    }
    navigation.next()
  }

  return (
    <Group justify="space-between" p={12}>
      <Button variant="light" onClick={navigation.prev}>
        Previous
      </Button>
      <Button disabled={!isValid} onClick={onNext}>
        {label}
      </Button>
    </Group>
  )
}

export default ProjectStepFooter
