import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AiTwotonePhone, AiOutlineMail } from "react-icons/ai";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, meDataAction } from "../../Action/userAction";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate()

  const {isAuthenticated} = useSelector((store)=>store.Medata);
  const [loader, setloader] = useState(false)
  const { user, error } = useSelector((store) => store.user);
  const [isEmail, setisEmail] = useState("email");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [showpass, setshowpass] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (isEmail === "email" && !email) {
      toast({
        title: `enter your email before submitting`,
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    };
    if (isEmail === "phone" && !phone) {
      toast({
        title: `enter your phone number before submitting`,
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    };
    if (!password) {
      toast({
        title: `enter your password  first then logIn`,
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    };
    setloader(true);
    await dispatch(loginAction(email, phone, password));
    setloader(false);
    await dispatch(meDataAction());
    
  };

  useEffect(() => {
    
    if (isEmail === "phone") {
      toast({
        title: `enter your phone number`,
        position: "top",
         status: "info",
        duration: 2000,
        isClosable: true,
      });
    };
  }, [isEmail, toast])


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
      // setallRight(true);

    };
    if (error?.message) {
      toast({
        title: `${error.message}`,
        position: "top",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch({ type: "clearError" });
    }
  }, [user, error, toast, dispatch])

  
  useEffect(()=>{
    if (isAuthenticated) {
      navigate("/chat", { replace: true, to: "/chat" })
    }else{
      navigate("/", { replace: true, to: "/" })
    }
  },[isAuthenticated,navigate])

  return (
    <div>
      <RadioGroup pb={"2%"} onChange={setisEmail} value={isEmail}>
        <HStack spacing="24px" direction="row">
          <Radio colorScheme="linkedin" size="md" value="email">
            email
          </Radio>
          <Radio colorScheme="linkedin" size="md" value="phone">
            phone
          </Radio>
        </HStack>
      </RadioGroup>
      <FormControl>
        {isEmail === "email" ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}

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
      </FormControl>
      <Button
        colorScheme="blue"
        isLoading={loader}
        loadingText='validating'
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          if (isEmail === "email") {
            setemail("demouser@gmail.com");
          }
          if (isEmail === "phone") {
            setphone("7891238723");
          }
          setpassword("demouser@123");
        }}
      >
        Guest user
      </Button>
      <Flex align="right" justify="right" marginTop="3%">
        <Link to="/forgotpassword">
          <Text fontSize="lg" fontFamily="Roboto">
            {" "}
            forgot password
          </Text>
        </Link>
      </Flex>
    </div>
  );
};

export default Login;
