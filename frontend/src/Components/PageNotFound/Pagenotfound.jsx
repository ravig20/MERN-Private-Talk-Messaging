import React from 'react'
import {   Text, Button, Stack, Flex , useColorModeValue, Box,} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Pagenotfound = () => {
  const navigate = useNavigate()

  return (
    <Flex
      className='forgotpage'
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >

      <Box
        spacing={4}
        justifyContent={'center'}
        textAlign='center'
        alignItems="center"
      
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>

        <Text
          as="h2"
          fontSize='6xl'
          fontWeight={'bold'}
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text">
            
          404
        </Text>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
          The page you're looking for does not seem to exist
        </Text>


        <Stack spacing={6}>
          {/* this */}\
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            onClick={() => navigate("/", { replace: true, to: "/" })}   
            variant="solid">
              
            Go to Home
          </Button>
        </Stack>
      </Box>
    </Flex>
  )
}

export default Pagenotfound



