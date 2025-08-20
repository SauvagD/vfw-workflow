import { Stack, Text } from '@mantine/core'

type ProjectStepSectionProps = {
  title: string
  description?: string
  children: React.ReactNode
  tips?: string
}

const ProjectStepSection = ({
  title,
  description,
  children,
  tips,
}: ProjectStepSectionProps) => {
  return (
    <Stack>
      <Stack gap={0}>
        <Text fz={18} fw={500}>
          {title}
        </Text>
        {description && (
          <Text fz={14} c="var(--custom-text-color)">
            {description}
          </Text>
        )}
      </Stack>
      <Stack gap={4}>
        {children}
        {tips && (
          <Text fz={12} c="var(--custom-text-color)">
            {tips}
          </Text>
        )}
      </Stack>
    </Stack>
  )
}

export default ProjectStepSection
