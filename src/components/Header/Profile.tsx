import { Flex, Text, Box, Avatar } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align='center'>
      { showProfileData && (
        <Box mr='4' textAlign='right'>
          <Text>Ettore Muniz</Text>
          <Text
            color='gray.300'
            fontSize='small'>
            Ettore.barbosa@gmail.com
            </Text>
        </Box>


      )}
      <Avatar
        src='https://github.com/ettoreMB.png'
        size='md'
        name='Ettore Muniz'
      />
    </Flex>
  )
}