import { projectFormAtom } from '@/store/project-store'
import { Badge, Card, Group, Stack, Text, Title } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { CheckCircle } from 'lucide-react'

const ProjectNextStep = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <Card withBorder>
      <Group align="start">
        <CheckCircle />
        <Stack gap={0}>
          <Text fw={600}>{title}</Text>
          <Text>{description}</Text>
        </Stack>
      </Group>
    </Card>
  )
}

const ProjectSummaryStep = () => {
  const project = useAtomValue(projectFormAtom)
  console.log('project', project)

  return (
    <Stack justify="center" align="center" c="black">
      <Stack justify="center" align="center">
        {/* <CircleCheck size={50} /> */}
        <Title>Demande reçue avec succès !</Title>
        <Text>
          Votre projet a été transmis à notre studio. Un espace client a été
          créé automatiquement.
        </Text>
      </Stack>
      <Card>
        <Stack>
          <Stack justify="center" align="center">
            <Stack w="100%">
              <Text>Recapitulatif de votre demander</Text>
              <Stack
                align="start"
                justify="start"
                p={12}
                bg={'var(--mantine-primary-color-light)'}
                style={{
                  borderRadius: 6,
                }}
              >
                <Group justify="space-between" w="100%">
                  <Text fw={600}>Type</Text>
                  <Text>{project.type}</Text>
                </Group>
                <Group justify="space-between" w="100%">
                  <Text fw={600}>Objective</Text>
                  <Text>{project.objectif}</Text>
                </Group>
                <Group justify="space-between" w="100%">
                  <Text fw={600}>Votre email</Text>
                  <Text>{project.client.email}</Text>
                </Group>
              </Stack>
            </Stack>

            <Stack>
              <Text>Prochaines étapes</Text>
              <Stack>
                {[
                  {
                    title: 'Compte créé automatiquement',
                    description:
                      'Un espace client a été créé avec votre email pour suivre votre projet',
                  },
                  {
                    title: 'Analyse de votre demande',
                    description: 'Notre équipe étudie votre projet sous 24h',
                  },
                  {
                    title: 'Devis personnalisé',
                    description:
                      'Vous recevrez un devis détaillé dans votre espace client',
                  },
                ].map(({ title, description }) => (
                  <ProjectNextStep title={title} description={description} />
                ))}
              </Stack>
            </Stack>

            {/* <Group w="100%">
              <Button
                variant="filled"
                style={{
                  flex: 1,
                }}
              >
                Accéder à mon espace client
              </Button>
              <Button variant="outline">Retour à l'accueil</Button>
            </Group> */}
          </Stack>
          <Card withBorder w="100%">
            <Stack align="center">
              <Text>Une question ? Besoin d'aide ?</Text>
              <Text>Notre équipe est là pour vous accompagner</Text>
              <Group>
                <Badge variant="white">contact@studio3d.com</Badge>
                <Badge variant="white">+33 1 23 45 67 89</Badge>
              </Group>
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Stack>
  )
}

export default ProjectSummaryStep
