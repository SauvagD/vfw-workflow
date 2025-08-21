import { Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { Box, Building, Camera, Gamepad, PaintRollerIcon, PhoneOutgoing } from 'lucide-react';
import ProjectStepLayout from '../layout/project-step-layout';
import type { RichSelectCardProps } from '@/components/studio-form/ui/rich-select-card';
import RichSelectCard from '@/components/studio-form/ui/rich-select-card';
import { useProjectNavigation } from '@/hooks/use-project-navigation';
import { projectFormAtom } from '@/store/project-store';
import { ProjectTypeEnum } from '@/types/project-types';

const projectTypeConfiguration: Record<
  ProjectTypeEnum,
  Pick<RichSelectCardProps, 'title' | 'description' | 'icon' | 'tags' | 'image'>
> = {
  [ProjectTypeEnum.Modeling]: {
    icon: Box,
    title: 'Modélisation 3D',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',
    description: "Création d'objets, personnages ou environnements 3D",
    tags: ['Objets produits', 'Personnages', 'Véhicules', 'Mobilier'],
  },
  [ProjectTypeEnum.Animating]: {
    icon: Camera,
    title: 'Animation 3D',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',

    description: 'Vidéos animées, publicités ou présentations',
    tags: ['Publicité', 'Explainer video', 'Motion design', 'Courts métrages'],
  },
  [ProjectTypeEnum.GamingAssets]: {
    icon: Gamepad,
    title: 'Assets Gaming',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',

    description: 'Éléments 3D pour jeux vidéo et applications',
    tags: ['Modèles low-poly', 'Textures', 'Environnements', 'Props'],
  },
  [ProjectTypeEnum.Arch]: {
    icon: Building,
    title: 'Visualisation Architecturale',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',

    description: 'Rendus de bâtiments, intérieurs et aménagements',
    tags: ['Rendus extérieurs', 'Intérieurs', 'Plans 3D', 'Aménagements'],
  },
  [ProjectTypeEnum.Design]: {
    icon: PaintRollerIcon,
    title: 'Design Produit',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',

    description: 'Prototypes et présentations de produits',
    tags: ['Prototypage', 'Packaging', 'Catalogue produit', 'Concepts'],
  },
  [ProjectTypeEnum.Photo]: {
    icon: PhoneOutgoing,
    title: 'Rendu Photoréaliste',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',

    description: 'Images haute qualité et rendus réalistes',
    tags: ['Catalogue', 'E-commerce', 'Marketing', 'Présentations'],
  },
}

const ProjectTypeStep = () => {
  const [{ type: selectedType }, updateProjectWithType] =
    useAtom(projectFormAtom)
  const navigation = useProjectNavigation()

  return (
    <ProjectStepLayout
      title={<> Quel <Text span inherit c="var(--mantine-primary-color-filled)">type</Text> de projet 3D souhaitez-vous réaliser ?</>}
      description="Sélectionnez la catégorie qui correspond le mieux à votre besoin"
    >
      <div className="project-type-grid">
        {Object.values(ProjectTypeEnum).map((type) => (
          <div className="project-type-grid-element">
            <RichSelectCard
              key={type}
              {...projectTypeConfiguration[type]}
              checked={type === selectedType}
              onCheck={() => {
                updateProjectWithType((prevProject) => ({
                  ...prevProject,
                  type,
                }))
                navigation.next()
              }}
            />
          </div>
        ))}
      </div>
    </ProjectStepLayout>
  )
}

export default ProjectTypeStep
