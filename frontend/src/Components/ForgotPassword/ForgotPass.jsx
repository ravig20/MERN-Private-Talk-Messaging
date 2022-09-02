import React, { useEffect, useState } from 'react'

import {
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  Flex,
  useToast,
} from '@chakra-ui/react';
import "./forgot.css"

import SetForgotPassword from './SetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { sendMailForForgotPassword } from '../../Action/userAction';

const ForgotPass = () => {

  const  {forgotPasswordData,error} = useSelector((store) => store.forgotpasswordData);
  
  const toast = useToast();

  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);

  const [email, setEmail] = useState("")

  const sendEmailHandler = async () => {

    if (!email) {
      toast({
        title: `Email is required`,
        position: "top",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    };
    setloading(true);
    dispatch({
      type:"otpReducer",
      payload:email
    })
    await dispatch(sendMailForForgotPassword(email));
    setloading(false);
  }



  useEffect(() => {

    if (forgotPasswordData?.message) {

      toast({
        title: `${forgotPasswordData.message}`,
        position: "top",
        duration: 3000,
        status: "success",
        isClosable: true,
      });
      dispatch({
        type:"clearErrorFromForgetPasswordUserReducer"
      });
     
    }

    if (error?.message) {
      toast({
        title: `${error?.message}`,
        position: "top",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch({
        type:"clearStateFromForgetPasswordUserReducer"
      });

    }

  }, [forgotPasswordData?.message,error?.message, toast, dispatch])

  return (
    <>
      {
        forgotPasswordData?.success ?(<SetForgotPassword email={email} />) : (<Flex
          className='forgotpage'
          minH={'100vh'}
          align={'center'}
          justify={'center'}
        >

          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={('white')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Forgot your password?
            </Heading>
            <Text
              fontSize={{ base: 'sm', sm: 'md' }}
              color='gray.800'>
              You&apos;ll get an email with Reset Password OTP..
            </Text>
            <FormControl id="email">
              {/* // this  */}
              <Input
                placeholder="email@example.com"
                _placeholder={{ color: 'gray.500' }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6}>
              {/* this */}
              <Button
                colorScheme='teal'
                _hover={{
                  bg: 'teal.500',
                }}
                onClick={sendEmailHandler}
                isLoading={loading}
                loadingText='sending...'
              >
                Forget Password Reset
              </Button>
            </Stack>
          </Stack>
        </Flex>)  
      }
    </>
  )
}

export default ForgotPass






