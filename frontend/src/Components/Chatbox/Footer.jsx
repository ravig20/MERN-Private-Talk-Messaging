import { Box, Input } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { BiHappy } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import React, { useState } from "react";
import InputEmoji from 'react-input-emoji'
const Footer = () => {

  const [input, setInput] = useState("");
//   const [mic, setmic] = useState(false);
const [ text, setText ] = useState('')
  
function handleOnEnter (text) {
 
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const micHandler =async () => {
   
    
};

  return (
    <Box display={"flex"} width="100%" height={10}>
      <Box
        width={"100%"}
        mr={1}
        ml={1}
        borderRadius={"3xl"}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        bg="#ededed"
      >
        <Icon as={BiHappy} w={8} h={8} color="#494d4d" ml={1} />
    
        <AttachmentIcon w={6} h={6} color="#494d4d" width={"8"} ml={1} />

        <Input
          focusBorderColor="#ededed"
          borderRadius={"3xl"}
          placeholder="Send Message"
          fontFamily={"Segoe UI"}
          value={input}
          onChange={inputHandler}
        />

        {/* <Icon as={AiFillCamera} w={8} h={8} color="#494d4d" /> */}
        <Icon
          as={BsFillMicFill}
          w={8}
          h={8}
          color={"#494d4d"}
          mr={2}
          bg="linkedin"
          borderRadius={"3xl"}
          pt={1}
          onClick={micHandler}
        />
      </Box>
      <Box
        borderRadius={"100%"}
        bg="#128C7E"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Icon
          as={IoSend}
          w={10}
          h={8}
          color="white"
          ml={0.5}
          borderRadius={"3xl"}
          pt={1}
        />
      </Box>
    </Box>
  );
};
}

export default Footer;
