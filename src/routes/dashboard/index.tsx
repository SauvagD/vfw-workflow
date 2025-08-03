import { account } from '@/utils/app-write-util'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function useAuthQuery() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const session = await account.get()
      console.log('session', session)
    },
  })
}

function RouteComponent() {
  const query = useAuthQuery()
  return <div>Hello "/dashboard/"!</div>
}
