import { Box, PinInputField, Stack, Text } from "@chakra-ui/react";
import { on } from "cluster";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters:  number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblinsCount = 1;

function generetadedPagesArray (from: number, to: number) {
  return [...new Array(to -from)] //[2,5]
    .map((_, index) => {
      return from + index + 1; //[ 0, 0, 0]  [2+0+1, 2+1+1, 2+2+1]  [3,4,5] 
    })
      .filter(page => page > 0)
    
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange

}:PaginationProps) {

  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage)

  const previosPage = currentPage > 1
    ? generetadedPagesArray(currentPage -1 -siblinsCount, currentPage -1)
    : [] 


  const nextPages = currentPage < lastPage
    ? generetadedPagesArray(currentPage, Math.min(currentPage + siblinsCount, lastPage))
    : [] 


  return (
    <Stack
      direction={['column', 'row']}
      mt='8'
      justify='space-between'
      align='center'
    >
      
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction='row' spacing='2'>

      {currentPage > (1 + siblinsCount) && (
        <>
           {currentPage > (1 + siblinsCount)  && (
           <Text
            color="gray.300"
            width="6"
            textAlign='center'
           >...
           </Text>
           )}
          <PaginationItem onPageChange={onPageChange} pageNumber={1}  />
        </>
      )}
      
      
      {previosPage.length > 0 && previosPage.map(page => {
        return <PaginationItem onPageChange={onPageChange}  key={page} pageNumber={page}  />
      })}

      <PaginationItem onPageChange={onPageChange}  pageNumber={currentPage} isCurrent />

      {nextPages.length > 0 && nextPages.map(page => {
        return <PaginationItem onPageChange={onPageChange}  key={page} pageNumber={page}  />
      })}

        {(currentPage + siblinsCount < lastPage) && (
          <>
            {(currentPage + 1 +siblinsCount) < lastPage && (
           <Text
            color="gray.300"
            width="6"
            textAlign='center'
           >...
           </Text>
           )}
            <PaginationItem onPageChange={onPageChange} pageNumber={lastPage}  />
          </>
        )}
      
  
      </Stack>
    </Stack>
  )
}