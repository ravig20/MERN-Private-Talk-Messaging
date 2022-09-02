import { Box } from '@chakra-ui/react'
import React, { createContext } from 'react'
import { useState } from 'react'
import ChatBox from '../Chatbox/ChatBox'
import Headers from "../Header/Header"
import Mychat from '../Mychat/Mychat'

 export const NotifactionContext = createContext();

const Chats = () => {
  const [notifaction, setnotifaction] = useState([]);

 
  return (
    <NotifactionContext.Provider value={{notifaction, setnotifaction}} >
    <div style={{width: '100%'}}> 
        <Headers/>
        <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        h="90.5vh"
        p="10px"
        >
          <Mychat/>
          <ChatBox/>
        </Box>
    </div>
    </NotifactionContext.Provider>

  )
}

export default Chats