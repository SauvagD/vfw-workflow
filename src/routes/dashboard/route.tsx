import AppLayout from '@/components/studio-dashboard/layout/app-layout';
import { DATABASE_ID, EXAMPLE_STUDIO_ID, STUDIO_COLLECTION_ID, databases } from '@/utils/app-write-util';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: async () => databases.getDocument(DATABASE_ID, STUDIO_COLLECTION_ID, EXAMPLE_STUDIO_ID),
})

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
