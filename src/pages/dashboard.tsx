import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic'
import { Header } from "../components/Header/index";
import { Sidebar } from "../components/SideBar";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
    grid: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray[600]
      },
      axisTicks: {
        color: theme.colors.gray[600]
      },
      categories: [
        '2021-05-12T00:00:00.000Z',
        '2021-05-13T00:00:00.000Z',
        '2021-05-14T00:00:00.000Z',
        '2021-05-15T00:00:00.000Z',
        '2021-05-16T00:00:00.000Z',
        '2021-05-17T00:00:00.000Z',
      ],
    },
 
    fill:{
      opacity: 0.3,
      type: 'gradient',
      gradient:{
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
  
};

const series = [
  { name: 'series1', data:[31,21,43,53,54,56]}
];

export default function DashBoard() {
  return (
    <>
    <Header />
      <Flex direction='column' h='100vh'>

        <Flex w='100%' my='6' maxWidth={1400} mx='auto' px='6'>
        <Sidebar />

        <SimpleGrid flex='1' gap='4' minChildWidth='320px' align='flex-start'>
          <Box
            p={['6', '8']}
            bg='gray.800'
            borderRadius={0}
            pb='4'
          >
            <Text fontSize='lg' mb='4'>
              Inscritos da Semana
            </Text>
            <Chart options={options} series={series} type='area' height={160}></Chart>
          </Box>

          <Box
            p={['6', '8']}
            bg='gray.800'
            borderRadius={0}
            pb='4'
          >
            <Text fontSize='lg' mb='4'>
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type='area' height={160}></Chart>
          </Box>

        </SimpleGrid>

        </Flex>
        
      </Flex>
    </>
  )
}