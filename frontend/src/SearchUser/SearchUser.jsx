import {
  Avatar,
  Badge,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { creatingChatAction, FatchUserChatAction } from "../Action/userAction";
import { MdVerified } from "react-icons/md";
const SearchUser = ({ user, id, useingGroup = false , selecteHandler, ifAddUsers = false }) => {
  const dispatch = useDispatch();
  const { searchUser, error } = useSelector((store) => store.creatingChatFatching);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loader, setloader] = useState(false);
  const boxHandler = async () => {
    setloader(true);
    await dispatch(creatingChatAction(id));
    await dispatch(FatchUserChatAction());
    setloader(false);
    if (searchUser?.message === "chat find successfully chat already exists in database") {
      toast({
        title: ` chat already exists in database`,
        position: "top",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    };
    if (searchUser?.message === "creating new chat successfully") {
      toast({
        title: ` chat created successfully`,
        position: "top",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    };

    onClose();
  };

  const CancelHandler = () => {
    toast({
      title: "Chat not created",
      description: "We are not allowed to create a new chat.",
      position: "top",
      status: "error",
      duration: 1500,
      isClosable: true,
    });
    onClose();
  };

  useEffect(() => {
    if (error) {
      toast({
        title: `${error?.message}`,
        position: "top",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

    };
  }, [toast, error]);

  return (
    <Box
      onClick={useingGroup ? selecteHandler : onOpen}
      cursor="pointer"
      bg=" #F0F8FF"
      _hover={{
        background: "skyblue",
        color: "white",
      }}
      width="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={3}
      mb={2}
      borderRadius="6%"
    >
      <Avatar
        mr={21}
        cursor="pointer"
        name={user?.name}
        src={user?.pic.url}
        size="sm"
      />

      <Box>
        <Text>{user?.name}
        
        { user?.isStar?<Badge bg={"38B2AC"}>
             <Icon as={MdVerified} w={3} h={3}  color="#405DE6"/>
              </Badge>:<></>} 
        </Text>
        <Text fontSize="xs">
          <b>Email:</b>
          {user?.email}
        </Text>
        {useingGroup ? null : <Text fontSize="xs">
          <b>Phone:</b>
          {user?.phone}
        </Text>}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"40px"}
            display="flex"
            justifyContent="center"
            textAlign="center"
            fontFamily="Roboto"
          >
            Do you want to create chat with
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            <Text fontFamily="cursive" fontSize="3xl">
              {user?.name}
            </Text>
          </ModalBody>
          <ModalBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb="10"
            mt="10"
          >
            <Button
              isLoading={loader}
              loadingText="Submitting"
              leftIcon={<Icon as={AiOutlineUserAdd} w={6} h={6} />}
              colorScheme="purple"
              mr={3}
              onClick={boxHandler}
            >
              create chat
            </Button>
            <Button
              leftIcon={<Icon as={AiOutlineUserDelete} w={6} h={6} />}
              colorScheme="red"
              mr={3}
              onClick={CancelHandler}
            >

              currently not
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SearchUser;
