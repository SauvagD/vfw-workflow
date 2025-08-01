import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Client } from 'appwrite'
import { Provider as JotaiProvider } from 'jotai'
import AppLayout from './components/layout/app-layout'

import '@mantine/dropzone/styles.css'
import './global.css'

const appwrite = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('688a5a97001a57f42352')

const queryClient = new QueryClient()

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={{
        primaryColor: 'indigo',
      }}
    >
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <AppLayout>{children}</AppLayout>
        </QueryClientProvider>
      </JotaiProvider>
    </MantineProvider>
  )
}

export { appwrite, queryClient }
