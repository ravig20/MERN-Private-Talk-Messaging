
import { Box, Text, Input, useToast, IconButton, FormControl } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserModal from "../UserModal/UserModal";
import GroupChatUpdate from "./GroupChatUpdate";
import Loader from "../Loader/Loader"
import { ArrowBackIcon, AttachmentIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { BiHappy } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import ShowMessage from "./ShowMessage"
import Picker from 'emoji-picker-react';
import "./chatBox.css"
import io from "socket.io-client";
import { useRef } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { NotifactionContext } from "../chats/Chats";
import { FatchUserChatAction } from "../../Action/userAction";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ChatBox = () => {
  const { notifaction, setnotifaction } = useContext(NotifactionContext);
  const ENDPOINT = "https://private-talk-messaging.herokuapp.com/"
  let socket = useRef();
  let SelectedChatCompar = useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const { SelectedChatData } = useSelector((store) => store.fromData);
  const { meinfo } = useSelector((store) => store.Medata);
  

  const [content, setcontent] = useState("");
  const [socketConnected, setsocketConnected] = useState(false);
  const [showPicker, setshowPicker] = useState(false);
  const [loading, setloading] = useState(false);
  const [Typing, setTyping] = useState(false);
  const [isTyping, setisTyping] = useState(false);
  const [isSpeech, setisSpeech] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const getSenderProfileData = (loginUser, user) => {
    return user[0]?._id === loginUser?._id ? user[1] : user[0];
  }

  const inputHandler = (e) => {

    setcontent(e.target.value);
    setshowPicker(false);

    //  typing status 
    if (!socketConnected) return false;

    if (!Typing) {
      setTyping(true);
      socket?.current?.emit("typing", SelectedChatData._id)
    }
    let lastTyping = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiffrence = timeNow - lastTyping;

      if (timeDiffrence >= timerLength && Typing) {
        socket?.current?.emit("stop typing", SelectedChatData._id)
        setTyping(false);
      }
    }, timerLength)
  };

  const micHandler = async () => {
    if (!browserSupportsSpeechRecognition) {
      toast({
        title: "Error Occured!",
        description: "Browser doesn't support speech recognition",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return false;
    }
    setisSpeech(!isSpeech);
    
     

  };
  
  useEffect(()=>{
    if(!isSpeech){
      SpeechRecognition.stopListening()
      resetTranscript();
    }else{
      SpeechRecognition.startListening(); 
    }
    setcontent(transcript);
  },[isSpeech,transcript,resetTranscript])
  // emoji
  const onEmojiClick = (emojiObject) => {
    setcontent(pre => pre + emojiObject?.emoji);
  };


  const fatchUsersMessage = async () => {
    if (!SelectedChatData) return;

    try {
      setloading(true);
      const { data } = await axios.get(
        `/api/v1/message/${SelectedChatData?._id}`
      );
      await setMessages(data);
      await socket?.current?.emit("join chat", SelectedChatData?._id);
      setloading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    };
  }

  const sendMessageHandler = async () => {

    try {
      if (!content) {
        return false;
      }
      const { data } = await axios.post(
        "/api/v1/message",
        { content: content, chatId: SelectedChatData?._id },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setcontent("");
      await setMessages([...messages, data]);
      await socket.current.emit("new message", data)

      // await fatchUsersMessage();

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to send the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

  };
  const sendMessageByEnter = (e) => {

    if (!content) {
      return false;
    }
    if (e.key === "Enter") {
      sendMessageHandler();

      setcontent("");
    }
  };
  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current?.emit("setup", meinfo.data);
    socket.current?.on("connected", () => setsocketConnected(true));
    socket.current?.on("typing", () => setisTyping(true));
    socket.current?.on("stop typing", () => setisTyping(false));
  }, [meinfo.data]);

// fatch user
  useEffect(() => {
    fatchUsersMessage();
    SelectedChatCompar.current = SelectedChatData;
    // eslint-disable-next-line
  }, [SelectedChatData]);



  // message logic 
  const checkNotifications = async (newMessageReceived) =>{
    if (SelectedChatData ||
      SelectedChatCompar.current?._id === newMessageReceived?.chat?._id) {
     await setMessages([...messages, newMessageReceived]);

    } else {
      if (!notifaction?.includes(newMessageReceived)) {
        await  setnotifaction([...notifaction, newMessageReceived ]);
         dispatch(FatchUserChatAction());
      }

    }
  }

  // message receiving 
  useEffect(() => {
    socket.current?.on("message received", (newMessageReceived) => {

      checkNotifications(newMessageReceived);
    })
  });

  const backHandler = async () => {
    await dispatch({
      type: "clearSelectedChatReducer",
    });
  };

  return (
    <Box
      display={{ base: SelectedChatData ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="skyblue"
      w={{ base: "100%", md: "68%" }}
      borderWidth="1px"
      borderRadius="lg"
    >
      {SelectedChatData ? (
        <>
          <Text
            pb={3}
            px={2}
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent={{ base: "space-between" }}
            fontFamily="cursive"
            fontSize={{ base: "28px", md: "30px" }}
          >

            {
              SelectedChatData?.isGroupChat ?
                (
                  <>

                    <IconButton
                      display={{ base: "flex", md: "none" }}
                      icon={<ArrowBackIcon />}
                      onClick={backHandler}
                    />
                    <Text display={{ base: "none", md: "flex" }} >
                      {SelectedChatData?.chatName.toUpperCase()}
                    </Text>
                    <GroupChatUpdate group={SelectedChatData} />
                  </>) : (<>
                    <UserModal user={getSenderProfileData(meinfo?.data, SelectedChatData?.users)} />
                  </>)
            }
          </Text>
          <Box
            display="flex"
            justifyContent="flex-end"
            p={3}
            bg="rgb(226, 226, 226)"

            flexDir="column"
            w="100%"
            h="100vh"
            borderRadius="lg"
            overflow="hidden"
          >
            {/* render messages */}

            {
              loading ? (<Loader />) : (<>
                {

                  <div className="messageContainer" >
                    {/* FatchMessageData */}
                    <ShowMessage FatchMessageData={messages} />
                  </div>

                }
              </>)
            }


            <Box mb={3} ml={5}>
              {isTyping ? <div > <SyncLoader color={"#806fcf"} size={10} mb={2} /> </div> : <></>}
            </Box>
            {/* Footer */}

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

                <label htmlFor="iconFile">

                <AttachmentIcon cursor="pointer" w={6} h={6} color="#494d4d" width={"8"} ml={1} />
                </label>
                <input 
                type="file"
                id="iconFile"
                style={{display: "none"}}
                />

                {showPicker && <Picker onEmojiClick={onEmojiClick} pickerStyle={{ position: "absolute", bottom: "80px", right: "28px" }} />}
                <FormControl isRequired onKeyDown={sendMessageByEnter} >
                  <Input
                    focusBorderColor="#ededed"
                    borderRadius={"3xl"}
                    placeholder="Send Message"
                    fontFamily={"Segoe UI"}
                    value={content}
                    onChange={inputHandler}
                  />
                </FormControl>
                <Icon as={BiHappy} w={8} h={8} cursor="pointer" color="#494d4d" mr={1} onClick={() => setshowPicker(!showPicker)} />

                <Icon
                  as={BsFillMicFill}
                  w={8}
                  h={8}
                  cursor="pointer"
                  color={listening?"red":"#494d4d"}
                  mr={3}
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
                  onClick={sendMessageHandler}
                />
              </Box>
            </Box>

          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          h="100%"
        >
          <Text fontFamily="cursive" fontSize="4xl" fontWeight="bold">
            Click user to start chat
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
