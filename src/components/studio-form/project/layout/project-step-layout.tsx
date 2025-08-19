import { progressAtom } from '@/store/stepper-store'
import {
  Group,
  Paper,
  RingProgress,
  Stack,
  Text,
  Title,
  Transition,
} from '@mantine/core'
import { useMounted } from '@mantine/hooks'
import { useAtomValue } from 'jotai'
import React from 'react'
import ProjectStepFooter from './project-step-footer'

const ProjectStepLayout = ({
  children,
  title,
  description,
  isValid,
}: {
  children: React.ReactNode
  title: string | React.ReactNode
  description?: string
  isValid?: boolean
}) => {
  const progress = useAtomValue(progressAtom)

  const isMounted = useMounted()

  return (
    <Transition
      mounted={isMounted}
      transition="fade-left"
      duration={500}
    >
      {(transitionStyle) => {
        return (
          <Paper
            h={120}
            inset={0}
            bg="unset"
            style={{ ...transitionStyle, zIndex: 1 }}
          >
            <Stack>
              <Stack h="100%">
                <Group align="center" justify="space-between">
                  <Stack justify="start" align="start" gap={4}>
                    <Title fz={24}>{title}</Title>
                    <Text c="var(--custom-text-color)">{description}</Text>
                  </Stack>
                  <RingProgress
                    sections={[{ value: progress * 100, color: 'blue' }]}
                    transitionDuration={250}
                    size={60}
                  />
                </Group>
                <Stack
                  style={{
                    flex: 1,
                  }}
                >
                  {children}
                </Stack>
              </Stack>
              <ProjectStepFooter isValid={isValid} />
            </Stack>
          </Paper>
        )
      }}
    </Transition>
  )
}

export default ProjectStepLayout
