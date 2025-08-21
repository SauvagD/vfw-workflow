import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Query } from 'appwrite'
import AppLayout from '@/components/studio-form/layout/app-layout'
import ProjectContactStep from '@/components/studio-form/project/steps/project-contact-step'
import ProjectObjectiveStep from '@/components/studio-form/project/steps/project-objective-step'
import ProjectReferencesStep from '@/components/studio-form/project/steps/project-references-step'
import ProjectSummaryStep from '@/components/studio-form/project/steps/project-summary-step'
import ProjectTypeStep from '@/components/studio-form/project/steps/project-type-step'
import {
  ComponentSwitch,
  ComponentSwitchCase,
} from '@/components/studio-form/ui/component-switch'
import { useProjectNavigation } from '@/hooks/use-project-navigation'
import { ProjectStepsEnum } from '@/store/stepper-store'
import { databases } from '@/utils/app-write-util'

/*

  Il faut que le form soit disponible pour les studios via une url spécifique déterminée par l'attribut référence.
  Cette attribut référence sera un slug unique générer à la création du studio.
  Quand on créer le projet, il faut liéer le projet au studio

*/

export const Route = createFileRoute('/form/$studio')({
  loader: async ({ params }) => {
    if (!params.studio) {
      throw new Error('Studio slug is required')
    }
    const studios = await databases.listDocuments(
      '688a5d58002c2c08a1a6',
      '68a05367003c458f2377',
      [Query.equal('reference', params.studio)],
    )

    if (studios.total === 0) {
      throw new Error('Studio not found')
    }
    return studios.documents[0]
  },
  component: App,
})


function App() {
  const { step } = useProjectNavigation()
  const data = useLoaderData({ from: '/form/$studio' });

  return (
    <AppLayout studio={data}>
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
        <ComponentSwitchCase value={ProjectStepsEnum.Summary}>
          <ProjectSummaryStep />
        </ComponentSwitchCase>
      </ComponentSwitch>
    </AppLayout>
  )
}
