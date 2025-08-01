import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppProviders } from '../app-provider'

export const Route = createRootRoute({
  component: () => (
    <>
      <AppProviders>
        <Outlet />
      </AppProviders>
      <TanStackRouterDevtools />
    </>
  ),
})
