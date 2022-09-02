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

import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsPerson, BsLinkedin, BsTwitter, BsInstagram } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Help = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const messageMe = async () => {
        try {
            if (!name || !email || !message) {
                toast({
                    title: `required all fields`,
                    position: "top",
                    status: "warning",
                    duration: 2000,
                    isClosable: true,
                });
                return false;
            }
            setLoading(true);
            const { data } = await axios.post(
                "/api/v1/mailMe",
                { name, email, message },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setLoading(false);
            toast({
                title: `${data?.message}`,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/chat", { replace: true, to: "/chat" });
            
        } catch (error) {
            setLoading(false);
            toast({
                title: `${error?.response.data.message}`,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            className="help"
            minH={"100vh"}
            width="100%"
            align={"center"}
            justify={"center"}
        >
            <Box

                spacing={4}
                justifyContent={"center"}
                textAlign="center"
                alignItems="center"
                rounded={"xl"}
                p={6}
                my={12}
            >
                <Text
                    as="h2"
                    fontSize="6xl"
                    fontWeight={"bold"}
                    bgGradient=" radial-gradient(circle, #232724, #103b36, #004d5d, #005d91, #0062bc, #3b5dc7, #6255cd, #8647ce, #a836b4, #bc279a, #c71f7f, #ca2567);"
                    backgroundClip="text"
                >
                    Contact
                </Text>

                <Text color={"black.500"} mb={2} fontSize="xl" fontFamily={"cursive"} fontWeight="bold">
                    Please feel free to contact me if you need 
                    any further information or
                    help.
                </Text>

                <Box>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                        <VStack pl={0} spacing={3} alignItems="center">
                            <Avatar
                                size="2xl"
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
                            <HStack
                                mt={6}
                                spacing={5}
                                px={5}
                                display="flex"
                                alignItems="center"
                                color={"white"}
                            >
                                <Link
                                    href="https://www.linkedin.com/in/ravi-gupta-6b15a9185"
                                    isExternal
                                >
                                    <IconButton
                                        aria-label="facebook"
                                        bg={"#1C6FEB"}
                                        colorScheme={"white"}
                                        variant="ghost"
                                        size="lg"
                                        isRound={true}
                                        _hover={{ border: "2px solid #1C6FEB" }}
                                        icon={<BsLinkedin size="28px" />}
                                    />
                                </Link>
                                <Link href="https://github.com/ravig20/" isExternal>
                                    <IconButton
                                        colorScheme={"black"}
                                        bg={"black"}
                                        aria-label="github"
                                        variant="ghost"
                                        size="lg"
                                        isRound={true}
                                        _hover={{ border: "2px solid #1C6FEB" }}
                                        icon={<BsGithub size="28px" />}
                                    />
                                </Link>
                                <Link href="https://twitter.com/ravi_g20" isExternal>
                                    <IconButton
                                        bg={"#1C6FEB"}
                                        colorScheme={"white"}
                                        aria-label="discord"
                                        variant="ghost"
                                        size="lg"
                                        isRound={true}
                                        _hover={{ border: "2px solid #1C6FEB" }}
                                        icon={<BsTwitter size="28px" />}
                                    />
                                </Link>
                                <Link href="https://www.instagram.com/_._ravi_._g_" isExternal>
                                    <IconButton
                                        bg={"red"}
                                        colorScheme={"white"}
                                        aria-label="discord"
                                        variant="ghost"
                                        size="lg"
                                        isRound={true}
                                        _hover={{ border: "2px solid #1C6FEB" }}
                                        icon={<BsInstagram size="28px" />}
                                    />
                                </Link>
                            </HStack>
                        </VStack>

                    </Box>
                </Box>

                <Box m={8} color="white">
                    <VStack spacing={5}>
                        <Text color={"black"} mb={2} fontSize="2xl" fontFamily={"cursive"} fontWeight="bold">
                            Fill out the Contact from for any help
                        </Text>
                        <FormControl>
                            <FormLabel colorScheme={"black.500"}>Your Name</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                                <InputLeftElement children={<BsPerson color="gray.800" />} />
                                <Input
                                    
                                    type="text"
                                    size="md"
                                    borderColor="gray.300"
                                    required
                                    placeholder="Enter your name ..."
                                    _placeholder={{ color: 'white' }}
                                    value={name}
                                    isInvalid
                                errorBorderColor='#0073fb'

                                    onChange={(e) => setName(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Mail</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                                <InputLeftElement
                                    children={<MdOutlineEmail color="gray.800" />}
                                />
                                <Input
                                    
                                    type="text"
                                    borderColor="gray.300"
                                    size="md"
                                    isInvalid
                                    errorBorderColor='#0073fb'
                                    _placeholder={{ color: 'white' }}
                                    placeholder=" Enter your email ..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl >
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                
                                borderColor="gray.300"
                                placeholder="enter your message over here ..."
                                isInvalid
                                errorBorderColor='#0073fb'
                                _placeholder={{ color: 'white' }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </FormControl>
                        <FormControl float="right">
                            <Button
                                variant="solid"
                                onClick={messageMe}
                                isLoading={loading}
                                loadingText="sending ..."
                                colorScheme="green"
                            >
                                Send Message
                            </Button>
                        </FormControl>
                    </VStack>
                </Box>

            </Box>
        </Flex>
    );
};

export default Help;
