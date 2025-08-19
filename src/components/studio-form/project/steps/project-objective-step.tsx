import ProjectStepLayout from '@/components/studio-form/project/layout/project-step-layout'
import ProjectStepSection from '@/components/studio-form/project/layout/project-step-section'
import {
  ComponentSwitch,
  ComponentSwitchCase,
} from '@/components/studio-form/ui/component-switch'
import type { SelectCardProps } from '@/components/studio-form/ui/select-card/select-card'
import SelectCard from '@/components/studio-form/ui/select-card/select-card'
import { useProjectFormFieldsValid } from '@/hooks/use-project-fields-valid'
import { useProjectNavigation } from '@/hooks/use-project-navigation'
import { ProjectObjectifEnum, projectFormAtom } from '@/store/project-store'
import { ProjectObjectiveSubStepEnum } from '@/store/stepper-store'
import { Text, Textarea } from '@mantine/core'
import { useAtom } from 'jotai'
import { Network, ShoppingCart, TargetIcon, Trophy, Tv } from 'lucide-react'

const projectObjectiveConfiguration: Record<
  ProjectObjectifEnum,
  Pick<SelectCardProps, 'title' | 'description' | 'icon'>
> = {
  [ProjectObjectifEnum.Comm]: {
    icon: TargetIcon,
    title: 'Marketing & Communication',
    description: 'Promotion, publicité, réseaux sociaux',
  },
  [ProjectObjectifEnum.Diapo]: {
    icon: Tv,
    title: 'Présentation Client',
    description: 'Présentation commerciale, pitch deck',
  },
  [ProjectObjectifEnum.ECommerce]: {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Boutique en ligne, catalogue produit',
  },
  [ProjectObjectifEnum.Internal]: {
    icon: ShoppingCart,
    title: 'Usage Interne',
    description: 'Formation, documentation, prototype',
  },
  [ProjectObjectifEnum.Web]: {
    icon: Network,
    title: 'Site Web',
    description: 'Intégration web, portfolio en ligne',
  },
  [ProjectObjectifEnum.Forum]: {
    icon: Trophy,
    title: 'Salon & Exposition',
    description: 'Stand, présentation physique',
  },
}

/*

  Il faut que je code une logique me permettant d'avoir des sous steps
  Pour cela, je pense qu'il faut juste que je change la façon dont je navigue dans les étapes
  Il faut que je fasse un object, qui indique si une étape spécifique possède des sous-étapes.
  Je pense qu'il s'agit juste de rendre le composant step, et en fonction de la sous étape choisi, on affiche l'un des composant substep

*/

const ProjectObjectiveSubStep = () => {
  const [{ objectif: selectedObjective }, updateProject] =
    useAtom(projectFormAtom)
  const navigation = useProjectNavigation()

  return (
    <ProjectStepLayout
      title={
        <>
          {' '}
          Quel est{' '} 
          <Text span inherit c="var(--mantine-primary-color-filled)">
            l'objectif
          </Text>{' '}
          de votre projet ?
        </>
      }
    >
      <ProjectStepSection>
        <div className="project-type-grid">
          {Object.values(ProjectObjectifEnum).map((objective) => (
            <div className="project-type-grid-element" style={{ padding: 0 }}>
              <SelectCard
                key={objective}
                {...projectObjectiveConfiguration[objective]}
                checked={objective === selectedObjective}
                onCheck={() => {
                  updateProject((prevProject) => ({
                    ...prevProject,
                    objectif: objective,
                  }))
                  navigation.next()
                }}
              />
            </div>
          ))}
        </div>
      </ProjectStepSection>
    </ProjectStepLayout>
  )
}

const ProjectDescriptionSubStep = () => {
  const isValid = useProjectFormFieldsValid(['description'])
  const [{ description }, updateProject] = useAtom(projectFormAtom)

  // Placeholder for future implementation
  return (
    <ProjectStepLayout
      title="En quelque mots ?"
      description="Décrivez votre projet en détail, vos objectifs, votre vision, etc."
      isValid={isValid}
    >
      <Textarea
        value={description || ''}
        onChange={(e) =>
          updateProject((prevProject) => ({
            ...prevProject,
            description: e.target.value,
          }))
        }
        placeholder="Décrivez votre projet, votre vision, vos contraintes spécifiques, votre public cible, etc. N'hésitez pas à être détaillé !"
        fz={14}
        styles={{
          input: {
            height: 100,
          },
        }}
      />
    </ProjectStepLayout>
  )
}

const ProjectObjectiveStep = () => {
  const { subStep } = useProjectNavigation()

  return <ProjectObjectiveSubStep />
  return (
    <ComponentSwitch value={subStep || ''}>
      <ComponentSwitchCase
        value={ProjectObjectiveSubStepEnum.Objective}
      ></ComponentSwitchCase>
      <ComponentSwitchCase value={ProjectObjectiveSubStepEnum.Description}>
        <ProjectDescriptionSubStep />
      </ComponentSwitchCase>
    </ComponentSwitch>
  )
}

export default ProjectObjectiveStep
