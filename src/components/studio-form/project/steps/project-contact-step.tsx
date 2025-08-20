import { TextInput } from '@mantine/core'
import { useAtom } from 'jotai'
import type { ChangeEvent } from 'react'

import ProjectStepLayout from '@/components/studio-form/project/layout/project-step-layout'
import ProjectStepSection from '@/components/studio-form/project/layout/project-step-section'
import { useProjectFormFieldsValid } from '@/hooks/use-project-fields-valid'
import { customerFormAtom } from '@/store/project-store'

const ProjectContactStep = () => {
  const isValid = useProjectFormFieldsValid([
    { customer: ['firstName', 'lastName', 'email'] },
  ])
  const [customer, updateCustomer] = useAtom(customerFormAtom)

  const getInputProps = (field: keyof typeof customer) => {
    return {
      value: customer[field] || '',
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        updateCustomer((prevCustomer) => ({
          ...prevCustomer,
          [field]: event.target.value,
        })),
    }
  }

  return (
    <ProjectStepLayout
      title="Votre email et tout est bon !"
      description="Thanks for taking the time to complete this form. Please enter your email below and we will be in contact within 24 hours."
      isValid={isValid}
    >
      <ProjectStepSection>
        <TextInput
          label="Email"
          {...getInputProps('email')}
          placeholder="votre@email.com"
        />
      </ProjectStepSection>
      {/* <Stack gap={30}>
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
      </Stack> */}
    </ProjectStepLayout>
  )
}

export default ProjectContactStep
