import { Box, Container, Flex } from '@mantine/core'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex justify="center" align="center" w="100vw" h="100vh">
      <Container strategy="grid" size={1000} w="80%" h="80%">
        {/*       <Box bg="var(--mantine-color-indigo-light)" h={50}>
        Main content
      </Box>
 */}
        <Box data-breakout mt="xs" w="100%" h="100%">
          <Box data-container c="white"  w="100%" h="100%">
            {children}
          </Box>
        </Box>
      </Container>
    </Flex>
  )
}

export default AppLayout
