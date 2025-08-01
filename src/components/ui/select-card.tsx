import { Checkbox, Flex, Group, Stack, Text } from '@mantine/core'
import type { LucideIcon } from 'lucide-react'

export type SelectCardProps = {
  title: string
  description: string
  icon: LucideIcon
  checked: boolean
  onCheck: () => void
}

const SelectCard = ({
  title,
  description,
  icon: Icon,
  checked,
  onCheck,
}: SelectCardProps) => {
  return (
    <Checkbox.Card
      radius="md"
      withBorder
      w="100%"
      h="100%"
      p={12}
      checked={checked}
      onClick={onCheck}
    >
      <Group align="flex-start" wrap="nowrap" h="100%">
        <Flex
          justify="center"
          style={{
            borderRadius: 12,
          }}
          align="center"
          w={40}
          h={40}
          bg="var(--mantine-color-indigo-light)"
        >
          <Icon size={20} color="var(--mantine-primary-color-filled)" />
        </Flex>
        <Stack gap={0}>
          <Text fw={600} fz={14}>
            {title}
          </Text>
          <Text fw={400} fz={12} c="var(--custom-text-color)">
            {description}
          </Text>
        </Stack>
      </Group>
    </Checkbox.Card>
  )
}

export default SelectCard
