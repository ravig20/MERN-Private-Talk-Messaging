import React, {  useEffect, useState } from "react";
// import PacmanLoader from "react-spinners/PacmanLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { AiTwotonePhone, AiOutlineMail } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import "./singup.css";
import { fromAction, sendEmail } from "../../Action/userAction";
// import { useEffect } from "react";


const Singup = () => {
  const toast = useToast();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {  data , error} = useSelector((store) => store.emailOtp);

  const [buttonLofing , usebuttonLoding] = useState(false);
  const [allRight, setallRight] = useState(false)
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [showpass, setshowpass] = useState(false);
  const [pic, setpic] = useState("");

  

  const setAvatarHandler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setpic(Reader.result);
      }
    };
  };
    useEffect(  () => {
      
      if(data?.message){
       
        toast({
          title: `${data.message}`,
          position: "top",
          duration: 6000,
          isClosable: true,
        });
        setallRight(true);
        dispatch({type:"clearOtpdata"});
      
      }
    
      if (error?.message) {
        toast({
          title: `${error.message}`,
          position: "top",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        dispatch({ type: "clearOtpError"}); 
      }
    }, [data,error,toast,setallRight,allRight,dispatch])
  

  const submitHandler = async () => {
    
    if (!name || !email || !password || !cpassword || !phone  ) {
      toast({
        title: ` All fields are required`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
      return false;
    };
    if (!pic ) {
      toast({
        title: ` avatar is required`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (phone.length !== 10) {
      toast({
        title: ` please enter 10 digit phone number`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (password !== cpassword) {
      toast({
        title: ` password dose not match`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (password.length <= 5){
      toast({
        title: `password must be at least 6 characters`,
        position: "bottom-left",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    usebuttonLoding(true)
    await dispatch(sendEmail(email, phone));
    usebuttonLoding(false)

    await dispatch(fromAction( pic, name, email, phone, password));
    
  };
  if(allRight){
    navigate("/verify", { replace: true, to: "/verify" })

  };
  return  (
    <VStack spacing="5px">
      <Avatar
        size="xl"
        direction="row"
        align={"center"}
        justify="center"
        name={name}
        src={pic}
      />
      <FormControl>
        <Box display="flex" alignItems="center">
          <input
            id="pic"
            type="file"
            accept="image/*"
            onChange={setAvatarHandler}
          />
        </Box>

        <FormLabel>Name*</FormLabel>
        <Input
          placeholder="Enter your name"
          value={name}
          isRequired
          onChange={(e) => setname(e.target.value)}
        />
        <FormLabel>Email*</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your Email"
            isRequired
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <InputRightElement>
            <Icon as={AiOutlineMail} />
          </InputRightElement>
        </InputGroup>

        <FormLabel>phone*</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your phone number"
            isRequired
            type="tel"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <InputRightElement>
            <Icon as={AiTwotonePhone} />
          </InputRightElement>
        </InputGroup>
        <FormLabel>Password*</FormLabel>

        <InputGroup>
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
        Sing Up
      </Button>
    </VStack>
  );
};

export default Singup;
