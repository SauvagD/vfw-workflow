import { Grid, GridCol, SimpleGrid, Stack, TextInput } from '@mantine/core'
import { useAtom } from 'jotai'
import type { ChangeEvent } from 'react'

import ProjectStepLayout from '@/components/project/layout/project-step-layout'
import ProjectStepSection from '@/components/project/layout/project-step-section'
import { useProjectFormFieldsValid } from '@/hooks/use-project-fields-valid'
import { clientFormAtom } from '@/store/project-store'

const ProjectContactStep = () => {
  const isValid = useProjectFormFieldsValid([
    { client: ['firstName', 'lastName', 'email'] },
  ])
  const [client, updateClient] = useAtom(clientFormAtom)

  const getInputProps = (field: keyof typeof client) => {
    return {
      value: client[field] || '',
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        updateClient((prevClient) => ({
          ...prevClient,
          [field]: event.target.value,
        })),
    }
  }

  return (
    <ProjectStepLayout
      title="Quel type de projet 3D souhaitez-vous réaliser ?"
      description="Sélectionnez la catégorie qui correspond le mieux à votre besoin"
      isValid={isValid}
    >
      <Stack gap={30}>
        <ProjectStepSection title="Informations personnelles">
          <SimpleGrid cols={2}>
            <TextInput
              label="Prénom"
              placeholder="Votre prénom"
              {...getInputProps('firstName')}
            />
            <TextInput
              label="Nom"
              placeholder="Votre nom"
              {...getInputProps('lastName')}
            />
            <TextInput
              label="Email"
              placeholder="votre@email.com"
              {...getInputProps('email')}
            />
            <TextInput
              label="Téléphone"
              placeholder="+33 6 12 34 56 78"
              {...getInputProps('tel')}
            />
          </SimpleGrid>
        </ProjectStepSection>

        <ProjectStepSection title="Informations professionnelles">
          <Grid>
            <GridCol span={6}>
              <TextInput
                label="Entreprise"
                placeholder="Nom de votre entreprise"
                {...getInputProps('companyName')}
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                label="Site web"
                placeholder="https://votre-site.com"
                {...getInputProps('website')}
              />
            </GridCol>
            <GridCol span={12}></GridCol>
          </Grid>
        </ProjectStepSection>
      </Stack>
    </ProjectStepLayout>
  )
}

export default ProjectContactStep
