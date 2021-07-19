import { Box ,Button,Divider,Flex, Heading, VStack,  SimpleGrid, HStack  } from "@chakra-ui/react";
import { Header } from "../../components/Header/index";
import { Sidebar } from "../../components/SideBar";
import {Input} from '../../components/Form/Input';

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver} from  '@hookform/resolvers/yup';

import Link from 'next/link';
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password:string;
  password_confirmation: string;
}


  const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigátorio'),
  email: yup.string().required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória').min(6, 'Minimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
});


export default function CreateUser() {
  const router = useRouter() 


  const createUser = useMutation(async(user: CreateUserFormData) => {
    const response = await api.post('/users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })
    console.log(response)
    return response.data
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })



  const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: yupResolver(createUserFormSchema)
  }) 



  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) =>{
    await createUser.mutateAsync(values);
    console.log(values)

  }

  return (
    <Box>
      <Header />

      <Flex w='100%'  my='6' maxWidth={1480} mx='auto' px='6'>
        <Sidebar />

        <Box flex='1' borderEndRadius={8} bg='gray.800' p={['6','8']} as='form' onSubmit={handleSubmit(handleCreateUser)}  >
          <Heading size='lg' fontWeight='normal'>
            Novo Usuário
          </Heading >

          <Divider my='6' borderColor='gray.700'/>

          <VStack spacing='8'>  
            <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%'>
              <Input name='name' label="Nome Completo" error={errors.name} {...register('name')} />
              <Input name='email' label='E-mail' type='email' error={errors.email}{...register('email')}/>
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%'>
              <Input name='password' label="Senha" type='password' error={errors.password} {...register('password')}/>
              <Input name='password_confirmation' label='Repetir Senha' type='password' error={errors.password_confirmation} />
            </SimpleGrid>
          </VStack>

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href='/users' passHref>
                <Button as='a'colorScheme='whiteAlpha'>Cancelar</Button>
              </Link>
              <Button type='submit'colorScheme='pink' isLoading={isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
      
        </Box>
      </Flex>
      
    </Box>
  );
}