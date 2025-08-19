import { useLoaderData } from '@tanstack/react-router'

import { Group, Stack } from '@mantine/core'
import classes from './client-list.module.css'


const ClientListItem = ({ email }: any) => {
  return (
    <div className={classes.item}>
      <Stack>
        <div className={classes.title}>{email}</div>
        <div className={classes.description}>shit</div>
      </Stack>
      <Group>
        <div>shit</div>
        <div>shit</div>
        <div>shit</div>
      </Group>
    </div>
  )
}

const ClientList = () => {
  const clients = useLoaderData({ from: '/dashboard/clients' })

  return (
    <div className={classes.root}>
      {clients.map((project) => (
        <ClientListItem key={project.$id} {...project} />
      ))}
    </div>
  )
}

export default ClientList
