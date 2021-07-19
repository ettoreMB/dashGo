import { AppProps} from 'next/app'
import { ChakraProvider} from '@chakra-ui/react'
import { theme } from '../styles/theme';
import { makeServer } from '../services/mirage'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { QueryClientProvider } from 'react-query';
import { AuthProvider } from '../contexts/AuthContext';
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../services/queryClient';


if (process.env.NODE_ENV === 'development') {
  makeServer();
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider  theme={theme}>
      <SidebarDrawerProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SidebarDrawerProvider>
    </ChakraProvider>

    <ReactQueryDevtools />
  </QueryClientProvider>
  )
}

export default MyApp
   