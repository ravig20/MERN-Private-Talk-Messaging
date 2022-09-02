import { AiOutlineUserAdd, AiOutlineLogout } from "react-icons/ai";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { BellIcon, ChevronDownIcon, ChevronUpIcon, Search2Icon } from "@chakra-ui/icons";
import UserModal from "../UserModal/UserModal";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, searchUserAction } from "../../Action/userAction";
import { useState } from "react";
import debounce from "lodash/debounce"
import SearchingLoder from "../searchLoding/SearchingLoder";
import SearchUser from "../../SearchUser/SearchUser";
import { NotifactionContext } from "../chats/Chats";


const Header = () => {
  const { notifaction } = useContext(NotifactionContext);

  const toast = useToast();
  const { searchUser } = useSelector((store) => store.searchUserData);
  // const { SelectedChatData } = useSelector((store) => store.fromData);

  const { meinfo } = useSelector((store) => store.Medata);
  const [searchData, setsearchData] = useState("");
  const [isOpenDraw, setisOpenDraw] = useState(false);
  const [loading, setloding] = useState(false);

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutMe = async () => {
    await dispatch(logoutAction());
    toast({
      title: `logout susscessfully`,
      position: "bottom",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // debounce function
  const searchDataWords = debounce((text) => {
    setloding(true);
    setsearchData(text)
  }, 1000);

  useEffect(() => {
    dispatch(searchUserAction(searchData));
    setloding(false);

  }, [searchData, dispatch])


  const showUsers = (chat) => {

    return (
      <Box
        cursor="pointer"
        _hover={{
          background: "#494d4d",
          color: "white",
        }}

        px={3}
        py={2}
        borderRadius="lg"
        key={chat?._id}
      >

        <Text color={"black"} fontFamily="Segoe UI" paddingLeft="10px">
          {

            chat?.chat.isGroupChat
              ? `${chat?.chatName} send a message `
              : ` ${chat.sender.name} send a message `

          }
        </Text>
      </Box>

    )
  }



  return (
    <div>
      <Box
        bg={"skyblue"}
        color="white"
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        width="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip
          hasArrow
          label="Search user to add into a chat"
          bg="skyblue"
          color="black"
        >
          <Button colorScheme="teal" onClick={() => setisOpenDraw(!isOpenDraw)} variant="ghost">
            <AiOutlineUserAdd width={10} size="22px" />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Add User
            </Text>
          </Button>
        </Tooltip>
        <Text
          display={{ md: "flex" }}
          px="4"
          fontSize={"2xl"}
          fontFamily={"Segoe UI"}
        >
          Private-Talk
        </Text>
        <div>
          <Menu isLazy>
            <MenuButton

              as={Button}
              bg="skyblue"
              color="skyblue"
              fontWeight="small"
              variant="ghost"
              aria-label="Courses"
              p={1}
              fontSize="2xl"
              _hover={{ bg: useColorModeValue("skyblue") }}
            >

              <BellIcon color="red" />
              {
                notifaction?.length > 0 ? <Badge ml='1' bg={"skyblue"} position={"relative"} right="2" bottom={"2"}>
                {notifaction?.length} </Badge> :<></>
              }
             

            </MenuButton>
            <MenuList color={"black"}>


              {notifaction?.length > 0 ? (
                notifaction?.map((chat, index) => (
                  <MenuItem key={index}>
                    {

                      showUsers(chat)
                    }
                  </MenuItem>
                )))
                :
                <MenuItem>No notification available</MenuItem>

              }

            </MenuList>
          </Menu>
          <Menu isOpen={isOpen}>
            <MenuButton
              variant="ghost"
              mx={1}
              py={[1, 2, 2]}
              px={4}
              borderRadius={5}
              _hover={{ bg: useColorModeValue("skyblue") }}
              aria-label="Courses"
              fontWeight="normal"
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
            >
              <Avatar size={"sm"} cursor="pointer" name={meinfo?.data?.name} src={meinfo?.data?.pic?.url} />
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </MenuButton>
            <MenuList
              color={"black"}
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
            >
              <UserModal user={meinfo?.data} myAccount={true}>
                <MenuItem>My profile</MenuItem>
              </UserModal>
              <MenuDivider />
              <MenuItem
                onClick={logoutMe}
                icon={<AiOutlineLogout size={"15px"} />}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer isOpen={isOpenDraw} placement="left" onClose={() => setisOpenDraw(!isOpenDraw)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Search to add user
          </DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <InputGroup>
                <Input mr={2}
                  placeholder="search by Name or Email"
                  onChange={(e) => searchDataWords(e.target.value)}
                />
                <InputLeftElement children={<Search2Icon color='green.500' fontSize={"lg"} />} />
              </InputGroup>
            </Box>
            {loading ? <SearchingLoder /> : (

              searchUser?.searchUsers.length === 0 ? <Text fontFamily={"Segoe UI"} > oops! no user exists</Text> : searchUser?.searchUsers.map((user) => (
                <SearchUser
                  key={user._id}
                  id={user._id}
                  user={user}
                />

              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Header;
