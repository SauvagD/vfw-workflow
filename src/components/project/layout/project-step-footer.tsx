import { Button, Group } from '@mantine/core'
import { useProjectNavigation } from '../../../hooks/use-project-navigation'

const ProjectStepFooter = ({ isValid }: { isValid: boolean }) => {
  const navigation = useProjectNavigation()
  return (
    <Group justify="space-between" p={12}>
      <Button variant="light" onClick={navigation.prev}>
        Previous
      </Button>
      <Button disabled={!isValid} onClick={navigation.next}>
        Next
      </Button>
    </Group>
  )
}

export default ProjectStepFooter
