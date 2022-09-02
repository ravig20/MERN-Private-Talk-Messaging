import { DeleteIcon, EditIcon, Search2Icon } from "@chakra-ui/icons";
import { ImUserPlus } from "react-icons/im";
import { Badge, Icon, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  DrawerHeader,
} from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";
import React, { useEffect, useState } from "react";
import UserBadgeIte from "../Mychat/UserBadgeIte";
import debounce from "lodash/debounce"
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addingUserToGroupAction,
  deleteGroupAction,
  FatchUserChatAction,
  removingUserToGroupAction,
  searchUserAction,
  updateProfileAction,
} from "../../Action/userAction";
import SearchingLoder from "../searchLoding/SearchingLoder";
import SearchUser from "../../SearchUser/SearchUser";
const GroupChatUpdate = ({ group }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { CreatedGroupChatData, error } = useSelector((store) => store.updateGroupdata)
  const { searchUser } = useSelector((store) => store.searchUserData);
  const toast = useToast();
  const dispatch = useDispatch();
  const [OnOpen, setOnOpen] = useState(false);
  const [deleting, setdeleting] = useState(false);
  const [openModal, SetopenModal] = useState(false);
  const [searchData, setsearchData] = useState("");
  const [loading, setLodings] = useState(false);
  const [groupAvatar, setgroupAvatar] = useState("");
  const [groupName, setgroupName] = useState("");
  const setAvatarHandler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setgroupAvatar(Reader.result);
      }
    };
  };

  // functions


  async function addUserTOgroup(user) {

    const addUser = await JSON.parse(JSON.stringify(group));
    if (group.users.includes(user)) {
      toast({
        title: "use already in a group chat ",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    await dispatch(addingUserToGroupAction(user._id, group._id))
    await addUser.users.push(user);
    dispatch({
      type: "SelectedChatReducer",
      payload: addUser
    });
  }

  async function removeHandlerArray(user) {
    const chat = await JSON.parse(JSON.stringify(group));
    if (group.users.includes(user)) {
      if (chat.users.length < 3) {
        toast({
          title: "Group have atLeast 3 users or Otherwise delete tha group ",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return false;
      }
      const index = await group.users.indexOf(user);
      await chat.users.splice(index, 1);
      await dispatch(removingUserToGroupAction(user._id, chat._id));
      await dispatch({
        type: "SelectedChatReducer",
        payload: chat
      });
    }
  }

  const searchDataWords = debounce((text) => {
    setsearchData(text)
  }, 1000);


  const groupDeleteHsndler = async () => {
    
    setdeleting(true);

    await dispatch(deleteGroupAction(group._id));
    await dispatch(FatchUserChatAction());
    await dispatch({
      type: "SelectedChatReducer",
      payload: ""
    });
    setdeleting(false);
  }


  const profileUpdateHandler = async () => {
    if (!groupAvatar && !groupName) {
      toast({
        title: "selected at least one in Avatar or Name ",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    setLodings(true);

    await dispatch(updateProfileAction(groupName, groupAvatar, group._id));
    await dispatch(FatchUserChatAction());
    // await dispatch(                               
    setLodings(false);
    onClose();
  };

  useEffect(() => {
    dispatch(searchUserAction(searchData));

  }, [searchData, dispatch])
  useEffect(() => {
    if (CreatedGroupChatData?.message) {
      toast({
        title: `${CreatedGroupChatData?.message}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch({ type: "clearUpdate" });
    }

    if (error?.message) {
      if (error.message === "Request failed with status code 400") {
        toast({
          title: `somthing went wrong`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: `${error?.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    dispatch({ type: "clearError" });
  }, [CreatedGroupChatData, toast, error, dispatch])

  return (
    <>
      <Avatar
        size={"md"}
        display={{ base: "flex" }}
        name={group?.chatName}
        src={group?.groupPic.url}
        onClick={() => setOnOpen(!OnOpen)}
        cursor="pointer"
      />
      <Drawer isOpen={OnOpen} placement="right" onClose={() => setOnOpen(!OnOpen)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Group profile</DrawerHeader>

          <DrawerBody>
            <VStack spacing="5px" position="sticky">
              <Avatar
                size="xl"
                direction="row"
                align={"center"}
                justify="center"
                name={group?.chatName}
                src={group?.groupPic.url}
              />
              <FormControl display="flex" alignItems="center" flexDir="column">
                {/* <Text
                  fontFamily="Ubuntu"
                  fontSize="xx-large"
                  fontWeight="semibold"
                >

                  
                </Text> */}
                {/*  */}
                <Text
                fontFamily="Ubuntu"
                fontSize="xx-large"
                fontWeight="semibold"
                color={"InfoText"}
              >

                {group?.chatName}
                {group?.isStar ? <Badge bg={"38B2AC"}>
                  <Icon as={MdVerified} w={6} h={6} color="#405DE6" />
                </Badge> : <></>}
              </Text>

{/*  */}
                <Button
                  colorScheme="yellow"
                  loadingText="singUp"
                  width="80%"
                  disabled={group?.isStar}
                  style={{ marginTop: 15 }}
                  rightIcon={<EditIcon />}
                  onClick={onOpen}
                >
                  Edit profile
                </Button>



                <Button
                  colorScheme="yellow"
                  loadingText="singUp"
                  width="80%"
                  style={{ marginTop: 15 }}
                  rightIcon={<Icon as={ImUserPlus} />}
                  onClick={() => SetopenModal(true)}
                >
                  Add users
                </Button>
                <Button
                  colorScheme="red" 
                  disabled={group?.isStar}
                  isLoading={deleting}
                  loadingText='deleting'
                  width="80%"
                  style={{ marginTop: 15 }}
                  rightIcon={<DeleteIcon />}
                  onClick={groupDeleteHsndler}
                >
                  delete group
                </Button>
                <Text
                  mt={1}
                  mb={2}
                  fontFamily="Ubuntu"
                  fontSize="large"
                  fontWeight="semibold"
                >

                  {group?.users.length} Participants in group
                </Text>
                {group?.users.map((user) => (
                  <Box
                    key={user._id}
                    overflowY="scroll"
                    cursor="pointer"
                    bg=" #F0F8FF"
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
                      <Text>{user?.name}</Text>
                      <Text fontSize="xs">
                        <b>Email:</b>
                        {user?.email}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </FormControl>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Edit Profile</ModalHeader>
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
                size="xs"
                boxSize="100px"
                src={groupAvatar}
                alt={"center"}
              />
              <input
                id="pic"
                type="file"
                accept="image/*"
                style={{ width: "60%", marginRight: "20%" }}
                onChange={setAvatarHandler}
              />
            </Box>
            <FormControl
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Input
                type="text"
                value={groupName}
                placeholder="Enter group name..."
                onChange={(e) => setgroupName(e.target.value)}
                width="70%"
                mb={2}
              />
            </FormControl>
            <Text fontSize={"xl"} fontWeight="bold" fontFamily={"Segoe UI"}>  Click on user to remove the group</Text>
            <Box display="flex" w="100%" flexWrap="wrap">

              {group?.users.map((user) => (
                <UserBadgeIte
                  key={user._id}
                  user={user}
                  removeHandler={() => removeHandlerArray(user)}
                />
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="solid"
              mx={1}
              colorScheme="purple"
              isLoading={loading}
              loadingText="Updating .."
              onClick={profileUpdateHandler}
            >
              Update profile
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* second modal */}
      <Modal isOpen={openModal} onClose={() => SetopenModal(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" pb={2}>
              <InputGroup>
                <Input mr={2}
                  fontFamily="Helvetica,Arial,sans-serif"
                  placeholder="add user eg: Grover, vanshika, Anuj"
                  onChange={(e) => searchDataWords(e.target.value)}
                />
                <InputLeftElement children={<Search2Icon color='green.500' fontSize={"lg"} />} />
              </InputGroup>
            </Box>
            <Stack overflowY="scroll" mt={1} >
              {loading ? <SearchingLoder /> : (
                searchUser?.searchUsers?.slice(0, 3).map((user) => (
                  <SearchUser
                    key={user._id}
                    id={user._id}
                    user={user}
                    selecteHandler={() => addUserTOgroup(user)}
                    useingGroup={true}
                    ifAddUsers={true}
                  />

                ))
              )}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => SetopenModal(false)}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatUpdate;
