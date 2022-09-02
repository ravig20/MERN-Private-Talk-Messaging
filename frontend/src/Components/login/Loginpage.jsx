import React from "react";
import "./login.css"
import { Box, Container, Text,Tabs, TabList, TabPanels, Tab, TabPanel  } from '@chakra-ui/react'
import Login from "../LoginCompnent/Login";
import Singup from "../SingUp/Singup";

const Loginpage = () => {
  return (
    <div className="loginpage">
    <Container maxW="xl" centerContent>
    <Box d="flex" justifyContent="center"  p={3} bg={"white"}  w="100%" m="40px 0px 15px 0px" borderRadius="lg" borderWidth="1px">
      <Text fontSize="4xl" fontFamily="Roboto" justifyContent="center" textAlign="center"  color="black"> Welcome To Private Talk</Text>
    </Box>
    <Box d="flex"  p={4} bg={"white"}  w="100%"  borderRadius="lg" borderWidth="1px">
    <Tabs variant='soft-rounded' colorScheme='whatsapp'>
  <TabList>
    <Tab width="50%"> login</Tab>
    <Tab width="50%"> Sing up</Tab>
  </TabList>
  <TabPanels >
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Singup/>
    </TabPanel>
  </TabPanels>
</Tabs> 
    </Box>

    </Container>

    </div>
  );
};

export default Loginpage;
