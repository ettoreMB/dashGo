import { Box ,Button,Flex, Heading, Icon, useBreakpointValue, Spinner, Text, Table, Thead, Checkbox, Th, Tbody, Td, Tr, Link } from "@chakra-ui/react";
import { RiAddLine,RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header/index";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/SideBar";
import NextLink from 'next/link';
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { QueryClient } from "react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";


export default function UsersList() {
  const [page, setPage] = useState(1)
  const  { data, isLoading, isFetching, error } = useUsers(page)

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response=await api.get(`users/${userId}`)

      return response.data
    },
    {
      staleTime: 1000 * 60 * 10 //10 minutes
    })
  } 

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box>
      <Header />

      <Flex w='100%'  my='6' maxWidth={1480} mx='auto' px='6'>
        <Sidebar />

        <Box flex='1' borderEndRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' align='center' justifyContent='space-between'>
            <Heading size='lg' fontWeight='normal'>
              Usuários
              {!isLoading && isFetching && <Spinner size='sm' color="gray.500" ml="4"/> }
            </Heading>

            <NextLink href='/users/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine}
                fontSize='20'/>}
              >Criar Novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>Falha ao carregar Dados</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha' >
            <Thead>
              <Tr>
                <Th px={['4','4','6']} color='gray.300' width='8'>
                  <Checkbox  colorScheme='pink'/>
                </Th>
                <Th>
                  Usuário
                  
                </Th>
                 { isWideVersion && <Th> Data de Cadastro</Th>}
                <Th width='8'></Th>
              </Tr>
            </Thead>

            <Tbody>
             { data.users.map(user => {
               return (
                <Tr key={user.id}>
                  <Td px={['4','4','6']}>
                    <Checkbox  colorScheme='pink'/>
                  </Td>
                  <Td>
                    <Box>
                      <Link>
                        <Text fontWeight='bold' onMouseEnter={() => handlePrefetchUser(user.id)}>{user.name}</Text>
                      </Link>
                      <Text fontSize='sm' color='gray.300'>{user.email}</Text>
                    </Box>
                  </Td>
                  { isWideVersion && <Td>{user.createdAt}</Td>}
                  <Td>
                  <Button
                    as='a'
                    size='sm'
                    fontSize='sm'
                    colorScheme='purple'
                    leftIcon={<Icon as={RiPencilLine}
                    fontSize='20'/>}
                  >{ isWideVersion ? 'Editar' : ''}
                  </Button>
                  </Td>
                </Tr>
               )
             })}
            </Tbody>

          </Table>
            

          <Pagination
            totalCountOfRegisters={data.totalCount}
            currentPage={page}
            onPageChange={setPage}
          />
          </>    
          )}
        </Box>
      </Flex>
      
    </Box>
  );
}