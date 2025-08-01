import { Badge, Checkbox, Flex, Group, Stack, Text } from '@mantine/core'
import type { LucideIcon } from 'lucide-react'

export type RichSelectCardProps = {
  title: string
  description: string
  icon: LucideIcon
  tags: Array<string>
  checked: boolean
  onCheck: () => void
}

const RichSelectCard = ({
  title,
  description,
  icon: Icon,
  tags,
  checked,
  onCheck,
}: RichSelectCardProps) => {
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
      <Stack>
        <Flex
          justify="center"
          style={{
            borderRadius: 12,
          }}
          align="center"
          w={60}
          h={60}
          bg="var(--mantine-color-indigo-light)"
        >
          <Icon size={30} color="var(--mantine-primary-color-filled)" />
        </Flex>
        <div>
          <Text fw={600} fz={18}>
            {title}
          </Text>
          <Text fw={400} fz={14} c="var(--custom-text-color)">
            {description}
          </Text>
        </div>
        <Stack gap={8}>
          <Text fz={12} fw={500}>
            Examples :
          </Text>
          <Group gap={8}>
            {tags.map((tag) => (
              <Badge
                variant="light"
                color="dark"
                radius={6}
                style={{
                  textTransform: 'capitalize',
                }}
              >
                {tag}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Stack>
    </Checkbox.Card>
  )
}

export default RichSelectCard
