import ClientList from '@/components/studio-dashboard/client-list/client-list'
import { CLIENT_COLLECTION_ID, DATABASE_ID, databases } from '@/utils/app-write-util'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/clients')({
  component: RouteComponent,
    loader: async () => {
      const clients = await databases.listDocuments(
        DATABASE_ID,
        CLIENT_COLLECTION_ID,
      )
      return clients.documents
    },
})

function RouteComponent() {
  return <ClientList />
}
