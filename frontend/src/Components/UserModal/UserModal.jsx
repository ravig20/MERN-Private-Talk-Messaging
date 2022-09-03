
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { RiUserStarLine } from "react-icons/ri";
import { GiHelp } from "react-icons/gi";
import { IoPersonRemove } from "react-icons/io5";
import { CgPassword } from "react-icons/cg";
import { creatStar, FatchUserChatAction, logoutAction, meDataAction, RemoveUserAction, updateUserPassword, updateUserProfileAction } from "../../Action/userAction";

const UserModal = ({ user, children, myAccount = false }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { updateUserData, error } = useSelector((store) => store.updateUserData);
  const { SelectedChatData } = useSelector((store) => store.fromData);
  // modal 
  const [modal, setModal] = useState(false)
  const [forgotPassModal, setforgotPassModal] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [star, setStar] = useState(false)
  const [loading, setloading] = useState(false);

  // edit profile state
  const [name, setname] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [Phone, setPhone] = useState("")
  const [caption, setcaption] = useState("")

  // update password states
  const [oldpassword, setoldpassword] = useState("")
  const [Newpassword, setNewoldpassword] = useState("")
  const [Confirmpassword, setConfirmpassword] = useState("")

  // set celebrity
  const [emailId, setemailId] = useState("");

  // set avatar
  const setAvatarHandler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setUserAvatar(Reader.result);
      }
    };
  };

  // profile updateProfileHandler

  const updateProfileHandler = async () => {
    if (!name && !userAvatar && !Phone && !caption) {
      toast({
        title: `required atLeast one filed to update`,
        position: "top",
        duration: 3000,
        isClosable: true,
        status: "warning"
      });
      return false;
    }
    setloading(true);
    setModal(false);
    await dispatch(updateUserProfileAction(name, userAvatar, Phone, caption));
    await dispatch(meDataAction());
    setloading(false);
    setname("");
    setUserAvatar("");
    setPhone("");
    setcaption("");

  }

  // creat star
  const createAstar = async () => {
    dispatch(creatStar(emailId,true));
    setStar(false);
  };

  // update password
  const UpdatePasswordHandler = async () => {

    if (Newpassword !== Confirmpassword) {
      toast({
        title: `Newpassword and Confirmpassword not match`,
        position: "top",
        duration: 3000,
        isClosable: true,
        status: "warning"
      });
      return false;
    };
    if (!Newpassword || !Confirmpassword || !oldpassword) {
      toast({
        title: `required atLeast one filed to update`,
        position: "top",
        duration: 3000,
        isClosable: true,
        status: "warning"
      });
      return false;
    };
    setloading(true);
    await dispatch(updateUserPassword(oldpassword, Newpassword, Confirmpassword));
    setforgotPassModal(false);
    setloading(false);
    setoldpassword("");
    setNewoldpassword("");
    setConfirmpassword("");
  };

  // remove User Handler

  const removeUserHandler = async () => { 

   await dispatch(RemoveUserAction(SelectedChatData._id));
   await dispatch(FatchUserChatAction());
   onClose();
   await dispatch({
     type: "SelectedChatReducer",
     payload: ""
   });
    
  };

  // logout 
  const logoutHandlear = () =>{

    toast({
      title: `logout susscessfully`,
      position: "bottom",
      duration: 3000,
      isClosable: true,
      status: "success"
    });
    dispatch(logoutAction())
  
  };

  const backHandler = async () => {
    await dispatch({
      type: "clearSelectedChatReducer",
    });
  };

  useEffect(() => {

    if (updateUserData?.message) {

      toast({
        title: `${updateUserData.message}`,
        position: "top",
        duration: 3000,
        status: "success",
        isClosable: true,
      });
      dispatch({ type: "clearErrorFromUpdateUserProfileReducer" });
    dispatch({ type: "clearStateFromUpdateUserProfileReducer" });
    }

    if (error?.message) {
      toast({
        title: `${error.message}`,
        position: "top",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch({ type: "clearStateFromUpdateUserProfileReducer" });
    dispatch({ type: "clearErrorFromUpdateUserProfileReducer" });
    }
    
  }, [updateUserData?.message, error?.message, toast, dispatch])

  return (
    <>

      {children ? (
        <div onClick={onOpen}> {children}</div>
      ) : (<Box display="flex" justifyContent="space-between" w={"100%"}>
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<ArrowBackIcon />}
          onClick={backHandler}
        />
        <Text
          display={{ base: "none", md: "flex" }}
        > {user?.name}</Text>
        <Avatar size={"md"} name={user.name} src={user.pic.url} onClick={onOpen} cursor="pointer" />

      </Box>
      )}


      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>User profile</DrawerHeader>

          <DrawerBody>
            <VStack spacing="5px" position="sticky">
              <Avatar
                size="2xl"
                direction="row"
                align={"center"}
                justify="center"
                name={user?.name}
                src={user?.pic.url}
              />
              <Text
                fontFamily="Ubuntu"
                fontSize="xx-large"
                fontWeight="semibold"
                color={"InfoText"}
              >

                {user?.name}
                {user?.isStar ? <Badge bg={"38B2AC"}>
                  <Icon as={MdVerified} w={4} h={4} color="#405DE6" />
                </Badge> : <></>}
              </Text>
              <Text
                fontFamily="Ubuntu"
                fontSize="large"
                fontWeight="bold"
              >

                {user?.email}
              </Text>

              <Text
                fontFamily="Ubuntu"
                fontSize="large"
                fontWeight="semibold"
              >

                {myAccount ? <><b>Phone:</b> {user?.phone}</> : <></>}

              </Text>

              {user?.caption ?
                <box Box display={"flex"} justifyContent="center" align="center" >
                  <Text
                    fontFamily="Segoe UI"
                    fontSize="large"
                    fontWeight="semibold"
                  >

                    {` ${user?.caption} `}
                  </Text> </box> : <Text
                    fontFamily="Segoe UI"
                    fontSize="large"
                    fontWeight="semibold"
                  >No caption at</Text>}

              {myAccount ? (<Box display={"flex"} justifyContent="center" align="center" flexDir={"column"} ml={5}>

                <Button
                  isDisabled={user?.isowner}
                  colorScheme="yellow"
                  loadingText="singUp"
                  width="100%"
                  style={{ marginTop: 15 }}
                  rightIcon={<EditIcon />}
                  onClick={() => setModal(!modal)}
                >
                  Edit profile
                </Button>

                <Button
                  isDisabled={user?.isowner}
                  colorScheme="purple"
                  width="100%"
                  style={{ marginTop: 15 }}
                  rightIcon={<Icon as={CgPassword} w={5} h={5} />}
                  onClick={() => setforgotPassModal(!forgotPassModal)}
                >
                  update password
                </Button>
                
                <Link to="/help">
                
                <Button
                  // isDisabled={user?.isowner}
                  colorScheme="facebook"
                  width="100%"
                  style={{ marginTop: 15 }}
                  rightIcon={<Icon as={GiHelp} w={5} h={5} />}
                >
                  Help
                </Button>

                </Link>

                <Button
                  // isDisabled={user?.isowner}
                  colorScheme="red"
                  // loadingText="singUp"
                  width="100%"
                  style={{ marginTop: 15 }}
                  rightIcon={<Icon as={FiLogOut} w={5} h={5} />}
                  onClick={logoutHandlear}
              >
                Logout
              </Button>

              {user?.email === "ravibaba2022@gmail.com" ? <Button
                colorScheme="red"
                loadingText='deleting'
                width="100%"
                style={{ marginTop: 15 }}
                rightIcon={<RiUserStarLine />}
                onClick={() => setStar(!star)}
              >
                Create Star
              </Button> : <></>}

            </Box>) : (<>
              <Button

                colorScheme="red"

                width="100%"
                style={{ marginTop: 15 }}
                rightIcon={<Icon as={IoPersonRemove} w={5} h={5} />}
                onClick={removeUserHandler}
              >
                Remove Friend
              </Button>

            </>)
            }
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>

    {/*  edit profile */ }
  <Modal isOpen={modal} onClose={() => setModal(!modal)}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Edit profile </ModalHeader>
      <ModalCloseButton />
      <ModalBody
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" flexDir="column" alignItems="center">
          <Text fontSize="3xl" fontFamily="cursive" pb={4}>
            Edit profile
          </Text>
          <Avatar
            borderRadius="full"
            size="xs"
            boxSize="100px"
            src={userAvatar}
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
          ml={12}
          display="flex"
          justifyContent="center"
          flexDir={"column"}
        > <FormLabel> name*</FormLabel>
          <Input
            type="text"
            value={name}
            placeholder="Enter name..."
            onChange={(e) => setname(e.target.value)}
            width="70%"
            mb={2}
          />

        </FormControl>
        <FormControl
          ml={12}
          display="flex"
          justifyContent="center"
          flexDir={"column"}
        > <FormLabel> Phone*</FormLabel>
          <Input
            type="text"
            value={Phone}
            placeholder="Enter phone..."
            onChange={(e) => setPhone(e.target.value)}
            width="70%"
            mb={2}
          />

        </FormControl>
        <FormControl
          ml={12}
          display="flex"
          justifyContent="center"
          flexDir={"column"}
        > <FormLabel> caption*</FormLabel>
          <Input
            type="text"
            value={caption}
            placeholder="Enter caption..."
            onChange={(e) => setcaption(e.target.value)}
            width="70%"
            mb={2}
          />

        </FormControl>

      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3}
          isLoading={loading}
          loadingText='updating'
          onClick={updateProfileHandler}
        >
          update Profile
        </Button>
        <Button colorScheme='red' onClick={() => setModal(!modal)}>Close</Button >
      </ModalFooter>
    </ModalContent>
  </Modal>

  {/*update password */ }

  <Modal isOpen={forgotPassModal} onClose={() => setforgotPassModal(!forgotPassModal)}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>update password </ModalHeader>
      <ModalCloseButton />
      <ModalBody
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="3xl" fontFamily="cursive" pb={4}>
          Create a new password
        </Text>

        <FormControl
          ml={12}
          display="flex"
          justifyContent="center"
          flexDir={"column"}
        > <FormLabel> Old password*</FormLabel>
          <Input
            type="text"
            value={oldpassword}
            placeholder="Enter your old password..."
            onChange={(e) => setoldpassword(e.target.value)}
            width="70%"
            mb={2}
          />

        </FormControl>
        <FormControl
          ml={12}
          display="flex"
          justifyContent="center"
          flexDir={"column"}
        > <FormLabel> New password*</FormLabel>
          <Input
            type="text"
            value={Newpassword}
            placeholder="Enter New password..."
            onChange={(e) => setNewoldpassword(e.target.value)}
            width="70%"
            mb={2}
          />

        </FormControl>
        <FormControl
          ml={12}
          display="flex"
          justifyContent="center"
          flexDir={"column"}
        > <FormLabel> Confirm  password*</FormLabel>
          <Input
            type="text"
            value={Confirmpassword}
            placeholder="Enter Confirm new password..."
            onChange={(e) => setConfirmpassword(e.target.value)}
            width="70%"
            mb={2}
          />

        </FormControl>

      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3}
          isLoading={loading}
          loadingText='updating'
          onClick={UpdatePasswordHandler}
        >
          update password
        </Button>
        <Button colorScheme='red' onClick={() => setforgotPassModal(!forgotPassModal)}>Close</Button >
      </ModalFooter>
    </ModalContent>
  </Modal>

  {/* set STAR */ }

  <Modal isOpen={star} onClose={() => setStar(!star)}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>update password </ModalHeader>
      <ModalCloseButton />
      <ModalBody
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="3xl" fontFamily="cursive" pb={4}>
          Create Celebrity
        </Text>

        <FormControl
          ml={12}
          display="flex"
          justifyContent="center"
          flexDir={"column"}
        > <FormLabel> Enter email*</FormLabel>
          <Input
            type="email"
            value={emailId}
            placeholder="Enter email id..."
            onChange={(e) => setemailId(e.target.value)}
            width="70%"
            mb={2}
          />

        </FormControl>

      </ModalBody>

      <ModalFooter>
        <Button
          colorScheme='blue' mr={3}
          onClick={createAstar}
          isLoading={loading}
          loadingText='creating'
        >
          Create STAR!
        </Button>
        <Button colorScheme='red' onClick={() => setStar(!star)}>Close</Button >
      </ModalFooter>
    </ModalContent>
  </Modal>
  </>
);
};

export default UserModal;
