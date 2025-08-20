import { Card, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import ProjectStepFooter from './project-step-footer'

const ProjectStepLayout = ({
  children,
  title,
  description,
  isValid,
}: {
  children: React.ReactNode
  title: string
  description: string
  isValid: boolean
}) => {
  return (
    <Card shadow="xl" h="100%">
      <Stack gap={40} h="100%" justify="center" align="center">
        <Stack justify="center" align="center" gap={4}>
          <Title fz={30}>{title}</Title>
          <Text c="var(--custom-text-color)">{description}</Text>
        </Stack>
        <Stack
          w="100%"
          style={{
            flex: 1,
            maxWidth: '90%',
          }}
        >
          {children}
        </Stack>
      </Stack>
      <ProjectStepFooter isValid={isValid} />
    </Card>
  )
}

export default ProjectStepLayout
