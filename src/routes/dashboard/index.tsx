import ProjectList from '@/components/studio-dashboard/project-list/project-list'
import {
  DATABASE_ID,
  PROJECT_COLLECTION_ID,
  databases,
} from '@/utils/app-write-util'
import { createFileRoute } from '@tanstack/react-router'

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

// function useAuthQuery() {
//   return useQuery({
//     queryKey: ['auth'],
//     queryFn: async () => {
//       const session = await account.get()
//       console.log('session', session)
//     },
//   })
// }

function RouteComponent() {
  return <ProjectList />
}
