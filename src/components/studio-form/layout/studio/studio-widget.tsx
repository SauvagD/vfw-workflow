import { ActionIcon, Image, Overlay, Stack, Text } from '@mantine/core'

import { AxeIcon } from 'lucide-react'
import { useState } from 'react'
import classes from './studio-widget.module.css'

/*

  J'ai besoin de faire en sorte que le widget grandisse en hover.
  Donc ca veut dire que les propriétés de base sont : 
  - Opacity: 0
  - height: 0
  - width: 0

*/

const StudioWidget = ({
  name,
  description,
  profilePicture,
}: {
  name: string
  description: string
  profilePicture: string
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      {hovered && (
        <Overlay
          color="#000"
          backgroundOpacity={0.5}
          w="100vw"
          h="100vh"
          pos="fixed"
          top={0}
          left={0}
          zIndex={0}
          blur={15}
        />
      )}
      <div className={classes.root} onMouseLeave={() => setHovered(false)}>
        <Stack className={classes.floating}>
          <div className={classes.header} data-hovered={hovered}>
            <Image
              src={profilePicture}
              className={classes.logo}
              onMouseEnter={() => setHovered(true)}
              data-hovered={hovered}
            />
            <div className={classes.title} data-hovered={hovered}>
              <Text fz={20} fw={500}>
                {name}
              </Text>
            </div>
          </div>
          <Stack className={classes.links} data-hovered={hovered}>
            <ActionIcon
              variant="light"
              color="dark"
              size="lg"
              radius={6}
              style={{
                border: '1px solid #9094a3',
              }}
            >
              <AxeIcon />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="indigo"
              size="lg"
              radius={6}
              style={{
                border: '1px solid #9094a3',
              }}
            >
              <AxeIcon />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="red"
              size="lg"
              radius={6}
              style={{
                border: '1px solid #9094a3',
              }}
            >
              <AxeIcon />
            </ActionIcon>
          </Stack>
        </Stack>

        <div className={classes.content} data-hovered={hovered}>
          <Text fw={300} lineClamp={5}>
            {description}
          </Text>
        </div>
      </div>
    </>
  )
}

export default StudioWidget
