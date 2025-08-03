import { account } from '@/utils/app-write-util'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/callback-client')({
  component: RouteComponent,
  beforeLoad: async (context) => {
    const { search } = context.location
    console.log('search', search)
    if (!search.userId || !search.secret) {
      throw redirect({
        to: '/',
      })
    }
    const session = await account.createSession(search.userId, search.secret)
    redirect({
      to: '/dashboard',
      search: {
        sessionId: session.$id,
      },
    })
  },
})

function RouteComponent() {
  return <div style={{ backgroundColor: 'red' }}>Hello "/callback-client"!</div>
}
