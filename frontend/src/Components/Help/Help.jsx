import axios from "axios";
import React, { useState } from "react";

import {
    Flex,
    Box,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Avatar,
    Link,
    useToast,
} from "@chakra-ui/react";

import {
    MdPhone,
    MdEmail,
    MdLocationOn,

    MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsPerson, BsLinkedin, BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Help = () => {
    const toast = useToast();
    const navigate = useNavigate()
  
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [message, setMessage] = useState("");
        const [loading, setLoading] = useState(false);

        const messageMe = async () =>{
            try {
                if(!name || !email || !message){
                    toast({
                        title: `required all fields`,
                        position: "top",
                        status: "warning",
                        duration: 2000,
                        isClosable: true,
                      });
                      return false;
                };
                setLoading(true);
                const {data} = await axios.post("/api/v1/mailMe", { name,email, message },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                setLoading(false);
                toast({
                    title: `${data?.message}`,
                    position: "top",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                navigate("/chat", { replace: true, to: "/chat" })
               console.log(name,email, message);
              } catch (error) {
                toast({
                    title: `${error}`,
                    position: "top",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
            }
        }
    return (
        <Flex justifyContent="center" alignItems="center" className="help" height="100vh">
            <VStack spacing="5px">
                <Box display="flex" justifyContent={"center"} alignItems="center" flexDir="column">
                    <Text fontSize='6xl' color="black" fontFamily='Roboto' mb={""}>Contact</Text>
                    <Text fontSize='3xl' color="black" fontFamily="" mb={"1"}>
                        Please feel free to contact me if you
                    </Text>
                    <Text fontSize='2xl' color="black" fontFamily='Roboto' mb={"2"}>
                        need any further information or help.
                    </Text>
                </Box>
                <Box display="flex" justifyContent={"center"} alignItems="center" bg={"#02054B"} padding="5" >

                    <Box>
                        <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                            <VStack pl={0} spacing={3} alignItems="center">

                                <Avatar
                                    size="xl"
                                    name="ravi gupta"
                                    src="https://res.cloudinary.com/talk-private/image/upload/v1657733312/UserPosts/wopxvcfcssadpobijjjk.jpg"
                                />

                                <Button
                                    size="md"
                                    height="48px"
                                    width="200px"
                                    variant="ghost"
                                    color="#DCE2FF"
                                    _hover={{ border: "2px solid #1C6FEB" }}
                                    leftIcon={<MdPhone color="#1970F1" size="20px" />}
                                >
                                    +91-7067765383
                                </Button>
                                <Button
                                    size="md"
                                    height="48px"
                                    width="250px"
                                    variant="ghost"
                                    color="#DCE2FF"
                                    _hover={{ border: "2px solid #1C6FEB" }}
                                    leftIcon={<MdEmail color="#1970F1" size="20px" />}
                                >
                                    ravibaba2022@gmail.com
                                </Button>
                                <Button
                                    size="md"
                                    height="48px"
                                    width="200px"
                                    variant="ghost"
                                    color="#DCE2FF"
                                    _hover={{ border: "2px solid #1C6FEB" }}
                                    leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                                >
                                    Indore, India
                                </Button>
                            </VStack>
                            <HStack
                                mt={6}
                                spacing={5}
                                px={5}
                                alignItems="flex-start"
                                color={"white"}
                            >
                                <Link href='https://www.linkedin.com/in/ravi-gupta-6b15a9185' isExternal>
                                <IconButton
                                    aria-label="facebook"
                                    variant="ghost"
                                    size="lg"
                                    isRound={true}
                                    _hover={{ bg: "#0D74FF" }}
                                    icon={<BsLinkedin size="28px" />}
                                />
                                </Link>
                                <Link href='https://github.com/ravig20/' isExternal>
                                <IconButton
                                    aria-label="github"
                                    variant="ghost"
                                    size="lg"
                                    isRound={true}
                                    _hover={{ bg: "#0D74FF" }}
                                    icon={<BsGithub size="28px" />}
                                />
                                </Link>
                                <Link href='https://twitter.com/ravi_g20' isExternal>
                                <IconButton
                                    aria-label="discord"
                                    variant="ghost"
                                    size="lg"
                                    isRound={true}
                                    _hover={{ bg: "#0D74FF" }}
                                    icon={<BsTwitter size="28px" />}
                                />
                                </Link>
                            </HStack>
                        </Box>


                    </Box>


                    <Box m={8} color="white">
                        <VStack spacing={5}>
                            <FormControl >
                                <FormLabel>Your Name</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <InputLeftElement
                                        
                                        children={<BsPerson color="gray.800" />}
                                    />
                                    <Input type="text" size="md" required placeholder="your name" 
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl >
                                <FormLabel>Mail</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <InputLeftElement
                                      
                                        children={<MdOutlineEmail color="gray.800" />}
                                    />
                                    <Input type="text" size="md" placeholder="your email " 
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Message</FormLabel>
                                <Textarea
                                    borderColor="gray.300"
                                    
                                    placeholder="message"
                                    value={message}
                                    onChange={(e)=>setMessage(e.target.value)}
                                />
                            </FormControl>
                            <FormControl  float="right">
                                <Button variant="solid"
                                onClick={messageMe}
                                isLoading={loading}
                                loadingText='sending...'
                                colorScheme='facebook' >
                                    Send Message
                                </Button>
                            </FormControl>
                        </VStack>
                    </Box>
                </Box>
            </VStack>
        </Flex>
    );
};

export default Help;


// <VStack spacing="5px">
//       <Avatar
//         size="xl"
//         direction="row"
//         align={"center"}
//         justify="center"
//         name={name}
//         src={pic}
//       />
//       <FormControl>
//         <Box display="flex" alignItems="center">
//           <input
//             id="pic"
//             type="file"
//             accept="image/*"
//             onChange={setAvatarHandler}
//           />
//         </Box>

//         <FormLabel>Name*</FormLabel>
//         <Input
//           placeholder="Enter your name"
//           value={name}
//           isRequired
//           onChange={(e) => setname(e.target.value)}
//         />
//         <FormLabel>Email*</FormLabel>
//         <InputGroup>
//           <Input
//             placeholder="Enter your Email"
//             isRequired
//             value={email}
//             onChange={(e) => setemail(e.target.value)}
//           />
//           <InputRightElement>
//             <Icon as={AiOutlineMail} />
//           </InputRightElement>
//         </InputGroup>

//         <FormLabel>phone*</FormLabel>
//         <InputGroup>
//           <Input
//             placeholder="Enter your phone number"
//             isRequired
//             type="tel"
//             value={phone}
//             onChange={(e) => setphone(e.target.value)}
//           />
//           <InputRightElement>
//             <Icon as={AiTwotonePhone} />
//           </InputRightElement>
//         </InputGroup>
//         <FormLabel>Password*</FormLabel>

//         <InputGroup>
//           <Input
//             placeholder="Enter your Password"
//             value={password}
//             isRequired
//             type={showpass ? "text" : "password"}
//             onChange={(e) => setpassword(e.target.value)}
//           />
//           <InputRightElement>
//             <Button onClick={() => setshowpass(!showpass)} h="1.7rem" size="sm">
//               {showpass ? <ViewIcon /> : <ViewOffIcon />}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//         <FormLabel>Confirm password*</FormLabel>
//         <Input
//           placeholder="Enter your Confirm password"
//           isRequired
//           value={cpassword}
//           onChange={(e) => setcpassword(e.target.value)}
//         />
//       </FormControl>
//       <Button
//         colorScheme="blue"
//         isLoading={buttonLofing}
//         loadingText='singUp'
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//       >
//         Sing Up
//       </Button>
//     </VStack>
//   );