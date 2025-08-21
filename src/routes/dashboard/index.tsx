import { createFileRoute } from '@tanstack/react-router'
import ProjectList from '@/components/studio-dashboard/project-list/project-list'
import {
  DATABASE_ID,
  PROJECT_COLLECTION_ID,
  databases,
} from '@/utils/app-write-util'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
  loader: async () => {
    const projects = await databases.listDocuments(
      DATABASE_ID,
      PROJECT_COLLECTION_ID,
    )
    return projects.documents
  },
})

function RouteComponent() {
  return <ProjectList />
}
