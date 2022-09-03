import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SearchingLoder from "../searchLoding/SearchingLoder";
import debounce from "lodash/debounce"
import { creatGroupAccountAction, FatchUserChatAction, searchUserAction } from "../../Action/userAction";
import { useToast } from '@chakra-ui/react'
import SearchUser from "../../SearchUser/SearchUser";
import UserBadgeIte from "./UserBadgeIte";
const Mychat = () => {
  const dispatch = useDispatch();
  const toast = useToast()
  const { meinfo } = useSelector((store) => store.Medata);
  const { fatchUserData } = useSelector((store) => store.FatchUserData);
  const { searchUser } = useSelector((store) => store.searchUserData);
  const { CreatedGroupChatData, error } = useSelector((store) => store.GroupChatData);
  const { SelectedChatData } = useSelector((store) => store.fromData);


  // states 
  const [loading, setloding] = useState(false);
  const [searchLoding, setSearchLoding] = useState(false);

  const [groupName, setgroupName] = useState("");
  const [userGroupArray, setuserGroupArray] = useState([]);
  const [searchData, setsearchData] = useState("");   // filter by this property
  const [groupAvatar, setGroupAvatar] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();


  // function 
  const setAvatarHandler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setGroupAvatar(Reader.result);
      }
    };
  };

  const searchDataWords = debounce((text) => {
    setsearchData(text)
  }, 1000);


  function removeHandlerArray(user) {
    setuserGroupArray(userGroupArray.filter(userid => userid?._id !== user?._id));
  }


  function creatingArray(user) {
    if (userGroupArray.includes(user)) {
      toast({
        title: "user already selected",
        status: 'warning',
        duration: 3000,
        position: "top",
        isClosable: true,
      })
      return;
    }
    if (userGroupArray.includes(user)) return;
    setuserGroupArray([...userGroupArray, user])

  };


  const creatGroupSubmitHandler = async () => {
    if (!groupAvatar) {
      toast({
        title: "Select group profile",
        status: 'warning',
        duration: 3000,
        position: "top",
        isClosable: true,
      })
      return false;
    }
    if (!groupName) {
      toast({
        title: "create group name",
        position: "top",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return false;
    }
    setloding(true);
    toast({
      title: "please wait its will take a few seconds...",
      position: "top",
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
    let userArray = [];
    for (let x of userGroupArray) {

      await userArray.push(x._id)
    }

    await dispatch(creatGroupAccountAction(groupAvatar, groupName, userArray));
    await dispatch(FatchUserChatAction());
    setloding(false);
    setuserGroupArray([]);
    setgroupName("");
    setGroupAvatar("")
    onClose();
  }


  // effects
  useEffect(() => {
    setSearchLoding(true);
    dispatch(searchUserAction(searchData));
    setSearchLoding(false);
  }, [searchData, dispatch])




  useEffect(() => {

    if (error) {
      toast({
        title: `${error?.message}`,
        position: "top",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch({
        type: "clearError"
      });
    };
    if (CreatedGroupChatData?.message) {
      toast({
        title: `${CreatedGroupChatData?.message}`,
        position: "top",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    };
    dispatch({
      type: "creatingGroupData"
    });
  }, [toast, error, CreatedGroupChatData?.message, dispatch]);
  const reduceChatHandler = (message) => {

    let msg = message.split(" ");
    if (msg.length > 4) {

      msg = msg.splice(0, 4);

    }
    msg = msg.join(" ");
    return (
      <div>
        <b>latest:</b> {msg}
      </div>
    );
  }
  const showUsers = (chat) => {
    return (
      <Box
        onClick={() => {
          dispatch({
            type: "SelectedChatReducer",
            payload: chat
          });
        }}
        cursor="pointer"
        _hover={{
          background: "#56705c",
          color: "white",
        }}
        color={SelectedChatData === chat ? "white" : "black"}    // This
        bg={SelectedChatData === chat ? "#38B2AC" : "#E8E8E8"}  // This
        px={3}
        py={2}
        borderRadius="lg"
        key={chat?._id}
      >
        <Box display="flex" alignItems="center" px={1}>
          {chat?.isGroupChat ? (
            <Avatar
              size="sm"
              name={chat?.chatName}
              src={chat?.groupPic?.url}
            />
          ) : meinfo?.data?._id === chat?.users[0]?._id ? (
            <Avatar
              size="sm"
              name={chat?.users[1]?.name}
              src={chat?.users[1]?.pic?.url}
            />
          ) : (
            <Avatar
              size="sm"
              name={chat?.users[0]?.name}
              src={chat?.users[0]?.pic?.url}
            />
          )}
          <Box display="flex" flexDir="column">
            <Text fontFamily="Segoe UI" paddingLeft="10px">
              {/* isowner */}
              {chat?.isGroupChat
                ? chat?.chatName
                : meinfo?.data?._id === chat?.users[0]?._id
                  ? chat?.users[1]?.name
                  : chat?.users[0]?.name
              }

              {
                chat?.isGroupChat
                  ? (<></>)
                  : 
                  (meinfo?.data?._id === chat?.users[0]?._id
                    ? (chat?.users[1]?.isStar ? (<Badge bg={"38B2AC"}>
                      <Icon as={MdVerified} w={3} h={3} color="#405DE6" />
                    </Badge>) : (<></>))
                    : 
                    (chat?.users[0]?.isStar ?
                     (<Badge bg={"38B2AC"}>
                      <Icon as={MdVerified} w={3} h={3} color="#405DE6" />
                    </Badge>)
                     : (<></>)))
              }



              { chat?.isStar?<Badge bg={"38B2AC"}>
             <Icon as={MdVerified} w={3} h={3}  color="#405DE6"/>
              </Badge>:<></>}
            </Text>
            <Text fontFamily="Segoe UI" fontSize={"xs"} paddingLeft="10px">
              {chat?.latestMessage ? reduceChatHandler(chat?.latestMessage?.content) : <> </>}
            </Text>
          </Box>

        </Box>
      </Box>
    )
  }



  return (
    <Box
      display={{ base: SelectedChatData ? "none" : "flex", md: "flex" }}   // This
      flexDir="column"
      padding={3}
      bg="skyblue"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
          onClick={() => onOpen()}
        >
          New Group chat
        </Button>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        padding={3}
        bg="#f8f8f8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box display="flex" pb={2} >
          <InputGroup>
            <Input mr={2}
              bg="Background"
              placeholder="search by name or email "
              onChange={(e) => searchDataWords(e.target.value)}
            />
            <InputLeftElement children={<Search2Icon color='green.500' fontSize={"lg"} />} />
          </InputGroup>
        </Box>
        {fatchUserData ? (
          <Stack overflowY="scroll">

            {fatchUserData?.result?.map((chat) => (
              
              showUsers(chat)
            ))}
          </Stack>
        ) : (
          <SearchingLoder />
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group Chat</ModalHeader>
          <ModalCloseButton />

          <ModalBody
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" flexDir="column" alignItems="center">
              <Avatar
                borderRadius="full"
                boxSize="100px"
                src={groupAvatar}
                alt={"center"}
              />
              <input
                id="pic"
                type="file"
                accept="image/*"
                onChange={setAvatarHandler}
                style={{ width: "70%", marginRight: "20%" }}
              // onChange={setAvatarHandler}
              />
            </Box>
            <FormControl
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              fontFamily="Oxygen"
              mb={1}
            >


              <Box width={"80%"}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<Icon as={HiUserGroup} />}
                  />
                  <Input
                    type="text"
                    placeholder="Group name.."

                    value={groupName}
                    onChange={(e) => setgroupName(e.target.value)}
                    mb={2} />
                </InputGroup>
              </Box>


              <Box width={"80%"}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<Search2Icon color='green' />}
                  />
                  <Input
                    type="text"
                    placeholder="Search users to add  eg: Grover, vanshika, Anuj "

                    onChange={(e) => searchDataWords(e.target.value)}
                  />
                </InputGroup>
              </Box>
            </FormControl>
            <Box
              display="flex"
              w="100%"
              flexWrap="wrap"
            >
              {
                userGroupArray?.map((user) => (
                  <UserBadgeIte
                    key={user?._id}
                    user={user}
                    removeHandler={() => removeHandlerArray(user)}
                  />
                ))
              }
            </Box>

            <Stack overflowY="scroll" mt={1} >
              {searchLoding ? <SearchingLoder /> : (
                searchUser?.searchUsers?.slice(0, 3)?.map((user) => (
                  <SearchUser
                    user={user}
                    useingGroup={true}
                    key={user?._id}
                    selecteHandler={() => creatingArray(user)}
                  />
                ))
              )};
            </Stack>
          </ModalBody>

          <ModalFooter display="flex" justifyContent={"space-evenly"}>
            <Button
              colorScheme="purple"
              mr={3}
              isLoading={loading}
              loadingText='Submitting'
              onClick={creatGroupSubmitHandler}>
              Create Group
            </Button>
            <Button colorScheme="red" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Mychat;
