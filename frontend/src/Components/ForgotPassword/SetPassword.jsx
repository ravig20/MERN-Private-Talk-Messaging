import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {  Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ForgetPassword } from '../../Action/userAction';


const SetForgotPassword = ({email}) => {
    const  {forgotPasswordData} = useSelector((store) => store.forgotpasswordData);
    const  {otpSendEmail} = useSelector((store) => store.fromData);
    const toast = useToast();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [showpass, setshowpass] = useState(false);
    const [buttonLofing, usebuttonLoding] = useState(false);
    const [otp, setOtp] = useState("")
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const submitHandler = async () => {
        console.log(otpSendEmail,password,cpassword,otp);
        if (!otp || !password || !cpassword) {
            toast({
              title: ` required all fields`,
              position: "top",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return false;
          };
          if (otp.length !== 6) {
            toast({
              title: `plese enter 6 digit otp `,
              position: "bottom-left",
              duration: 3000,
              status: "error",
              isClosable: true,
            });
            return false;
          };
          if ( password !== cpassword) {
            toast({
              title: `password  or confirmed password is not matched`,
              position: "bottom-left",
              duration: 3000,
              status: "error",
              isClosable: true,
            });
            return false;
          };

       usebuttonLoding(true);
       await dispatch(ForgetPassword(otpSendEmail,password,cpassword,otp));
        usebuttonLoding(false);
    }

    useEffect(()=>{
        if(forgotPasswordData.message === "password was updated successfully"){
            navigate("/chat", { replace: true, to: "/chat" })
            dispatch({
                type:"clearErrorFromForgetPasswordUserReducer"
              });
              dispatch({
                type:"clearStateFromForgetPasswordUserReducer"
              });

        }

    },[forgotPasswordData.message,navigate,dispatch])

    return (
        <Flex
            className='forgotpage'
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            flexDir="column"
        >
            
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
            >
                <Text fontSize="4xl" fontFamily="cursive" justifyContent="center" textAlign="center" color="black">
                    Enter your Otp
                </Text>
                <Text fontSize="xl" fontFamily="cursive" justifyContent="center" textAlign="center" color="black">
                    {`Otp send to ${otpSendEmail} account`}
                </Text>

                <FormControl display={"flex"} flexDir="column">
                    <FormLabel>Otp*</FormLabel>
                    <Input
                        placeholder="Enter your otp "
                        isRequired
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <FormLabel>Reset password*</FormLabel>
                    <InputGroup display={"flex"} >

                        <Input
                            placeholder="Enter your Password"
                            value={password}
                            isRequired
                            type={showpass ? "text" : "password"}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <InputRightElement>
                            <Button onClick={() => setshowpass(!showpass)} h="1.7rem" size="sm">
                                {showpass ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormLabel>Confirm password*</FormLabel>
                    <Input
                        placeholder="Enter your Confirm password"
                        isRequired
                        value={cpassword}
                        onChange={(e) => setcpassword(e.target.value)}
                    />
                </FormControl>
                <Button
                    colorScheme="blue"
                    isLoading={buttonLofing}
                    loadingText='singUp'
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                >
                    forgot Password
                </Button>
                <Text mt={6} mb={3} fontSize="larger" fontFamily="Ubuntu" justifyContent="center" textAlign="center" color="black"> {`Didn't receive an OTP`}</Text>
          <Link to="/help">
            <Text mt={1} mb={5} fontSize="larger" fontFamily="Roboto" justifyContent="center" textAlign="center" color="black"> Click here? </Text>
          </Link>
            </Stack>
        </Flex>

    )

}

export default SetForgotPassword
