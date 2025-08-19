import { Button, CopyButton, Group } from '@mantine/core'
import { Link, useLoaderData } from '@tanstack/react-router'
import { Check, Copy, FileText, Settings, Users } from 'lucide-react'
import type React from 'react'
import classes from './app-layout.module.css'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const studio = useLoaderData({ from: '/dashboard' });

  return (
    <div className={classes.root}>
      <div className={classes.navbar}>
        <div className={classes.navbarInner}>
          <Group>
            <Button
              component={Link}
              href="/dashboard"
              c="dark"
              fz={20}
              variant="transparent"
              leftSection={<FileText />}
            >
              Projects
            </Button>
            <Button
              component={Link}
              href="/dashboard/clients"
              c="dark"
              fz={20}
              variant="transparent"
              leftSection={<Users />}
            >
              Clients
            </Button>
            <Button
              component={Link}
              href="/dashboard/settings"
              c="dark"
              fz={20}
              variant="transparent"
              leftSection={<Settings />}
            >
              Settings
            </Button>
          </Group>
          <CopyButton value={`${window.location.origin}/form/${studio.reference}`} timeout={2000}>
            {({ copied, copy }) => (
              <Button
                color="dark"
                label={copied ? 'Copied' : 'Copy'}
                variant="subtle"
                withArrow
                position="right"
                onClick={copy}
                leftSection={copied ? <Check size={16} /> : <Copy size={16} />}
                style={{
                  border: "1px solid lightgray"
                }}
              >
                Copy form url
              </Button>
            )}
          </CopyButton>
        </div>
      </div>
      <div className={classes.body}>{children}</div>
    </div>
  )
}

export default AppLayout
