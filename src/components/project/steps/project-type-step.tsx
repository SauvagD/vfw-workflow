import type { RichSelectCardProps } from '@/components/ui/rich-select-card'
import RichSelectCard from '@/components/ui/rich-select-card'
import { ProjectTypeEnum } from '@/types/project-types'
import { useAtom } from 'jotai'
import {
  Box,
  Building,
  Camera,
  Gamepad,
  PaintRollerIcon,
  PhoneOutgoing,
} from 'lucide-react'
import { useProjectFormFieldsValid } from '../../../hooks/use-project-fields-valid'
import { projectFormAtom } from '../../../store/project-store'
import ProjectStepLayout from '../layout/project-step-layout'

const projectTypeConfiguration: Record<
  ProjectTypeEnum,
  Pick<RichSelectCardProps, 'title' | 'description' | 'icon' | 'tags'>
> = {
  [ProjectTypeEnum.Modeling]: {
    icon: Box,
    title: 'Modélisation 3D',
    description: "Création d'objets, personnages ou environnements 3D",
    tags: ['Objets produits', 'Personnages', 'Véhicules', 'Mobilier'],
  },
  [ProjectTypeEnum.Animating]: {
    icon: Camera,
    title: 'Animation 3D',
    description: 'Vidéos animées, publicités ou présentations',
    tags: ['Publicité', 'Explainer video', 'Motion design', 'Courts métrages'],
  },
  [ProjectTypeEnum.GamingAssets]: {
    icon: Gamepad,
    title: 'Assets Gaming',
    description: 'Éléments 3D pour jeux vidéo et applications',
    tags: ['Modèles low-poly', 'Textures', 'Environnements', 'Props'],
  },
  [ProjectTypeEnum.Arch]: {
    icon: Building,
    title: 'Visualisation Architecturale',
    description: 'Rendus de bâtiments, intérieurs et aménagements',
    tags: ['Rendus extérieurs', 'Intérieurs', 'Plans 3D', 'Aménagements'],
  },
  [ProjectTypeEnum.Design]: {
    icon: PaintRollerIcon,
    title: 'Design Produit',
    description: 'Prototypes et présentations de produits',
    tags: ['Prototypage', 'Packaging', 'Catalogue produit', 'Concepts'],
  },
  [ProjectTypeEnum.Photo]: {
    icon: PhoneOutgoing,
    title: 'Rendu Photoréaliste',
    description: 'Images haute qualité et rendus réalistes',
    tags: ['Catalogue', 'E-commerce', 'Marketing', 'Présentations'],
  },
}

const ProjectTypeStep = () => {
  const isValid = useProjectFormFieldsValid(['type'])
  const [{ type: selectedType }, updateProjectWithType] =
    useAtom(projectFormAtom)

  return (
    <ProjectStepLayout
      title="Quel type de projet 3D souhaitez-vous réaliser ?"
      description="Sélectionnez la catégorie qui correspond le mieux à votre besoin"
      isValid={isValid}
    >
      <div className="project-type-grid">
        {Object.values(ProjectTypeEnum).map((type) => (
          <div className="project-type-grid-element">
            <RichSelectCard
              key={type}
              {...projectTypeConfiguration[type]}
              checked={type === selectedType}
              onCheck={() =>
                updateProjectWithType((prevProject) => ({
                  ...prevProject,
                  type,
                }))
              }
            />
          </div>
        ))}
      </div>
    </ProjectStepLayout>
  )
}

export default ProjectTypeStep
