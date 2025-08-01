import ProjectContactStep from '@/components/project/steps/project-contact-step'
import ProjectObjectiveStep from '@/components/project/steps/project-objective-step'
import ProjectReferencesStep from '@/components/project/steps/project-references-step'
import { createFileRoute } from '@tanstack/react-router'
import ProjectTypeStep from '../components/project/steps/project-type-step'
import {
  ComponentSwitch,
  ComponentSwitchCase,
} from '../components/ui/component-switch'
import { useProjectNavigation } from '../hooks/use-project-navigation'
import { ProjectStepsEnum } from '../store/stepper-store'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { step } = useProjectNavigation()
  return (
    <ComponentSwitch value={step}>
      <ComponentSwitchCase value={ProjectStepsEnum.Type}>
        <ProjectTypeStep />
      </ComponentSwitchCase>
      <ComponentSwitchCase value={ProjectStepsEnum.Objectif}>
        <ProjectObjectiveStep />
      </ComponentSwitchCase>
      <ComponentSwitchCase value={ProjectStepsEnum.References}>
        <ProjectReferencesStep />
      </ComponentSwitchCase>
      <ComponentSwitchCase value={ProjectStepsEnum.Contact}>
        <ProjectContactStep />
      </ComponentSwitchCase>
    </ComponentSwitch>
  )
}
