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
      description="Merci d'avoir pris le temps de remplir ce formulaire. Veuillez saisir votre adresse e-mail ci-dessous et nous vous contacterons dans les 24 heures."
      isValid={isValid}
    >
      <ProjectStepSection>
        <TextInput
          label="Email"
          {...getInputProps('email')}
          placeholder="votre@email.com"
        />
      </ProjectStepSection>
    </ProjectStepLayout>
  )
}

export default ProjectContactStep
