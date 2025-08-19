import { useLoaderData } from '@tanstack/react-router'

import { Group, Stack } from '@mantine/core'
import classes from './project-list.module.css'

const ProjectListItem = ({ name, client, type, objectif, status }: any) => {
  return (
    <div className={classes.item}>
      <Stack>
        <div className={classes.title}>{name}</div>
        <div className={classes.description}>{client.email}</div>
      </Stack>
      <Group>
        <div>{type}</div>
        <div>{objectif}</div>
        <div>{status}</div>
      </Group>
    </div>
  )
}

const ProjectList = () => {
  const projects = useLoaderData({ from: '/dashboard/' })

  return (
    <div className={classes.root}>
      {projects.map((project) => (
        <ProjectListItem key={project.$id} {...project} />
      ))}
    </div>
  )
}

export default ProjectList
