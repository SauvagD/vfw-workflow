import { Badge, Checkbox, Flex, Group, Image, Stack, Text } from '@mantine/core'
import type { LucideIcon } from 'lucide-react'

export type RichSelectCardProps = {
  title: string 
  description: string
  image: string
  icon: LucideIcon
  tags: Array<string>
  checked: boolean
  onCheck: () => void
}

const RichSelectCard = ({
  title,
  description,
  image,
  icon: Icon,
  tags,
  checked,
  onCheck,
}: RichSelectCardProps) => {
  return (
    <Checkbox.Card
      radius="md"
      withBorder
      p={0}
      w="100%"
      h="100%"
      checked={checked}
      onClick={onCheck}
      style={{
        overflow: 'hidden',
      }}
      className='select-card'
    >
      <Stack gap={0} h="100%">
        <Flex pos="relative" h={100} w="100%" top={0} left={0}>
          <Flex
            pos="absolute"
            top={10}
            right={10}
            justify="center"
            style={{
              borderRadius: 12,
            }}
            align="center"
            w={40}
            h={40}
            bg="var(--mantine-color-indigo-1)"
          >
            <Icon size={20} color="var(--mantine-primary-color-filled)" />
          </Flex>
          <Image src={image} alt="" h={100} fit="cover" w="100%" />
        </Flex>
        <Stack p={12} gap={0}>
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
      </Stack>
    </Checkbox.Card>
  )
}

export default RichSelectCard
