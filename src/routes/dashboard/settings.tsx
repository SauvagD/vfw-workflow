import {
  DATABASE_ID,
  EXAMPLE_STUDIO_ID,
  STUDIO_COLLECTION_ID,
  databases,
} from '@/utils/app-write-util'
import { Button, Group, Stack, Text, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings')({
  component: RouteComponent,
})

/*

  Il faut que je submit comment ?
  Je pense que le plus simple est de mettre un bouton save en haut à droite
  je pense mettre un header avec un titre et une description

  Il faudrait que je fasse en sorte de récupérer dans le formulaire les valeurs de base du studio

*/

function RouteComponent() {
  const studio = useLoaderData({ from: '/dashboard' })
  const form = useForm({
    initialValues: {
      name: studio.name,
      email: studio.email,
      description: studio.description,
    },
  })

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Stack gap={0}>
          <Text fz={18} fw={600}>
            Settings
          </Text>
          <Text fw={300}>Here you can customize the funnel experience</Text>
        </Stack>
        <Button
          disabled={!form.isDirty}
          onClick={async () => {
            await databases.updateDocument(
              DATABASE_ID,
              STUDIO_COLLECTION_ID,
              EXAMPLE_STUDIO_ID,
              {
                ...form.values
              },
            )
          }}
        >
          Save
        </Button>
      </Group>
      <TextInput
        label="Name"
        placeholder="Your studio name"
        {...form.getInputProps('name')}
      />
      <TextInput
        label="Email"
        placeholder="Your studio email"
        {...form.getInputProps('email')}
      />
      <Textarea
        label="Description"
        placeholder="Your studio description"
        {...form.getInputProps('description')}
      />
    </Stack>
  )
}
