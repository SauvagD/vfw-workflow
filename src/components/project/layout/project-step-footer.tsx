import { useInitProjectMutation } from '@/api/use-init-project-mutation'
import { projectFormAtom } from '@/store/project-store'
import { ProjectStepsEnum } from '@/store/stepper-store'
import type { ProjectEntity } from '@/types/project-types'
import { ProjectPlatformEnum, ProjectStatusEnum } from '@/types/project-types'
import { Button, Group } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { useProjectNavigation } from '../../../hooks/use-project-navigation'

const ProjectStepFooter = ({ isValid }: { isValid: boolean }) => {
  const project = useAtomValue(projectFormAtom)
  const navigation = useProjectNavigation()
  const initProject = useInitProjectMutation()

  const isLastStep = navigation.step === ProjectStepsEnum.Contact
  const label = navigation.step === ProjectStepsEnum.Contact ? 'Submit' : 'Next'

  const onNext = () => {
    if (isLastStep) {
      const finalProject = {
        type: project.type,
        description: project.description,
        objectif: project.objectif,
        platform: project.platform ?? ProjectPlatformEnum.Web,
        status: ProjectStatusEnum.Draft,
        fileReferences: project.fileReferences,
        urlReferences: project.urlReferences,
      } as ProjectEntity
      initProject.mutate({
        customer: {
          lastName: project.customer.lastName,
          firstName: project.customer.firstName,
          email: project.customer.email,
        },
        project: finalProject,
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
