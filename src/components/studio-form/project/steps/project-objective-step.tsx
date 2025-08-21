import { Text } from "@mantine/core";
import { useAtom } from "jotai";
import { Network, ShoppingCart, TargetIcon, Trophy, Tv } from "lucide-react";

import type { SelectCardProps } from "@/components/studio-form/ui/select-card/select-card";
import ProjectStepLayout from "@/components/studio-form/project/layout/project-step-layout";
import ProjectStepSection from "@/components/studio-form/project/layout/project-step-section";
import SelectCard from "@/components/studio-form/ui/select-card/select-card";
import { useProjectNavigation } from "@/hooks/use-project-navigation";
import { projectFormAtom } from "@/store/project-store";
import { ProjectObjectifEnum } from "@/types/project-types";


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

const ProjectObjectiveStep = () => {
  return <ProjectObjectiveSubStep />
}

export default ProjectObjectiveStep
