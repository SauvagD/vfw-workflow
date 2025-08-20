import ProjectStepLayout from '@/components/project/layout/project-step-layout'
import ProjectStepSection from '@/components/project/layout/project-step-section'
import type { SelectCardProps } from '@/components/ui/select-card'
import SelectCard from '@/components/ui/select-card'
import { useProjectFormFieldsValid } from '@/hooks/use-project-fields-valid'
import { projectFormAtom } from '@/store/project-store'
import { ProjectObjectifEnum } from '@/types/project-types'
import { Stack, Textarea } from '@mantine/core'
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

const ProjectObjectiveStep = () => {
  const isValid = useProjectFormFieldsValid(['description', 'objectif'])
  const [{ description, objectif: selectedObjective }, updateProject] =
    useAtom(projectFormAtom)
  return (
    <ProjectStepLayout
      title="Quel type de projet 3D souhaitez-vous réaliser ?"
      description="Sélectionnez la catégorie qui correspond le mieux à votre besoin"
      isValid={isValid}
    >
      <Stack gap={30}>
        <ProjectStepSection title="Utilisation principale">
          <div className="project-type-grid">
            {Object.values(ProjectObjectifEnum).map((objective) => (
              <div className="project-type-grid-element" style={{ padding: 0 }}>
                <SelectCard
                  key={objective}
                  {...projectObjectiveConfiguration[objective]}
                  checked={objective === selectedObjective}
                  onCheck={() =>
                    updateProject((prevProject) => ({
                      ...prevProject,
                      objectif: objective,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </ProjectStepSection>

        <ProjectStepSection
          title="Décrivez votre projet en détail"
          description="Plus vous serez précis, plus nous pourrons vous proposer une solution adaptée"
          tips="Exemples à mentionner : style artistique souhaité, ambiance, couleurs préférées, contraintes techniques, délais particuliers, budget approximatif..."
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
        </ProjectStepSection>
      </Stack>
    </ProjectStepLayout>
  )
}

export default ProjectObjectiveStep
