import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { meDataAction, userRegisterRequest } from "../../Action/userAction";
const Singupotpchecker = () => {
  const toast = useToast();
  const navigate = useNavigate()
  const [allRight, setallRight] = useState(false)
  const [buttonLofing , usebuttonLoding] = useState(false);
  const { fomeData } = useSelector((store) => store.fromData);
  const { error, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [otp, setotp] = useState("");


  const creatAccount = async () => {
    
    if (!otp) {
      toast({
        title: `please enter your otp`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
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


    usebuttonLoding(true);
    await dispatch(userRegisterRequest(
      fomeData?.pic,
      fomeData?.name,
      fomeData?.phone,
      fomeData?.email,
      fomeData?.password,
      otp
    ));
    usebuttonLoding(false);
    await dispatch(meDataAction());
  }
  

  
  useEffect(() => {
    if (user?.message) {
      toast({
        title: `${user.message}`,
        position: "top",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch({ type: "clearMessage" });
      setallRight(true);
      
    }
    if (error?.message) {
      toast({
        title: `${error.message}`,
        position: "top",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch({ type: "clearErrors" });
    }
  }, [user,error,toast,dispatch])
  if(allRight){
    navigate("/chat", { replace: true, to: "/chat" })

  };
  
  return (
    <div className="loginpage">
      <Container maxW="xl" centerContent>
        <Box d="flex" justifyContent="center" p={3} bg={"white"} w="100%" m="40px 0px 15px 0px" borderRadius="lg" borderWidth="1px">
          <Text fontSize="4xl" fontFamily="Roboto" justifyContent="center" textAlign="center" color="black"> Welcome To Private Talk</Text>
        </Box>
        <Box d="flex" p={4} bg={"white"} w="100%" borderRadius="lg" borderWidth="1px">
          <Text fontSize="4xl" fontFamily="Ubuntu" justifyContent="center" textAlign="center" color="black"> Verification Code</Text>
          <Text mt={5} fontSize="xl" color="brown" fontFamily="Cantarell" justifyContent="center" textAlign="center"  > {`please enter your verification code send to ${fomeData?.email}`} </Text>
          <FormControl mt={6} mb={4}>
            <FormLabel mt={3} mb={2}>OTP*</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter your OTP"
                isRequired
                value={otp}
                onChange={(e) => setotp(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <Text mt={6} mb={3} fontSize="larger" fontFamily="Ubuntu" justifyContent="center" textAlign="center" color="black"> {`Didn't receive an OTP`}</Text>
          <Link to="/help">
            <Text mt={1} mb={5} fontSize="larger" fontFamily="Roboto" justifyContent="center" textAlign="center" color="black"> Click here? </Text>
          </Link>
          <Button
            colorScheme="blue"
            isLoading={buttonLofing}
            loadingText='verification...'
            width="100%"
            style={{
              marginTop: "3%",
              marginBottom: "3%"
            }}
            onClick={creatAccount}
          >
            Submit
          </Button>
        </Box>

      </Container>

    </div>
  );
};

export default Singupotpchecker;
