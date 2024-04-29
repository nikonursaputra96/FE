import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../store";
import { getProfile, patchProfile } from "../../lib/api/call/editProfile";
import { SET_LOGIN } from "../../store/slice/auth";
import { IProfile } from "../../types/app";


const EditProfile = () => {
  const profile = useAppSelector((state) => state.auth.user);
  const hostURL = "http://localhost:5000/assets/";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch()


  const [cover, setCover] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [bio, setBio] = useState('')


  const handleChangeCover = (e: any) => {
    setCover(e.target.files[0])
    
  };

 

  const handleAvatar = (e:any) => {
    setAvatar(e.target.files[0])
  }

  const handlePost = async () => {
    try {
      const formData = new FormData()
      if (cover) {
        formData.append("cover", cover)
      }
      if (avatar) {
        formData.append("avatar", avatar)
      }
      if (bio) {
        formData.append("bio", bio)
      }

      const res = await patchProfile(formData)
      const get = await getProfile()

      dispatch(
        SET_LOGIN({
          user : get.data as IProfile,
          token: localStorage.getItem("token") as string
        })
      )
  
     onClose()
      console.log(res.data)
      

    } catch (error) {
      console.log(error)
    }
  }

 
 
  return (
    <>
      <Button
        size={"sm"}
        color="white"
        textAlign="center"
        borderRadius="full"
        border="2px solid white"
        bg="none"
        _hover={{ bg: "rgba(4, 165, 30, 1)" }}
        onClick={onOpen}
      >
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader bg="#1d1d1d" color={"white"}>Edit Profile</ModalHeader >
          <ModalCloseButton />
          <ModalBody bg="#1d1d1d" pb={5} >

          <Flex bg="#1d1d1d" mx={"auto"}>
            <Box w={"full"}>
              <Box
                w="auto"
                h="100px"
                bg={`url('${hostURL + profile?.cover}')`}
                borderRadius="lg"
              >
                <Flex justifyContent={"center"} align={"center"}>
                  <label htmlFor="imageUploadCover" >
                    <BiSolidImageAdd size={35} cursor="pointer" />
                  </label>
                  <Input
                    id="imageUploadCover"
                    type="file"
                    display={"none"}
                    accept="image/*"
                    name="cover"
                    onChange={handleChangeCover}
                  />
                </Flex>
                <Flex>
                  <Avatar
                    w="80px"
                    h="80px"
                    mt={10}
                    ml={25}
                    border="3px solid black"
                    src={hostURL + profile?.avatar}
                  />
                  <Flex position={"absolute"} mt={"60px"} ml={50}>
                    <label htmlFor="imageUploadAvatar">
                      <BiSolidImageAdd size={35} cursor="pointer" />
                    </label>
                    <Input
                      id="imageUploadAvatar"
                      type="file"
                      accept="image/*"
                      display={"none"}
                      name="avatar"
                      onChange={handleAvatar}
                    />
                  </Flex>
                </Flex>
              </Box>

              <Flex
                border={"1px solid grey"}
                color={"white"}
                mt={"80px"}
                borderRadius={"xl"}
                justify={"center"}
                flexDir={"column"}
              >
                <Text
                  fontSize={"15px"}
                  color={"grey"}
                  fontWeight={"bold"}
                  ml={3}
                >
                  Name
                </Text>
                <Input
                  type="text"
                  border={"none"}
                  name="fullname"
                  size={"md"}
                  placeholder={`✨${profile?.user.fullname}✨`}
                  _placeholder={{ color: "white" }}
                />
              </Flex>
              <Flex
                border={"1px solid grey"}
                color={"white"}
                mt={5}
                borderRadius={"xl"}
                justify={"center"}
                flexDir={"column"}
              >
                <Text
                  fontSize={"15px"}
                  color={"grey"}
                  fontWeight={"bold"}
                  ml={3}
                >
                  Username
                </Text>
                <Input
                  type="text"
                  border={"none"}
                  name="name"
                  size={"md"}
                  placeholder={profile?.user.username}
                  _placeholder={{ color: "white" }}
                />
              </Flex>
              <Flex
                border={"1px solid grey"}
                color={"white"}
                mt={5}
                borderRadius={"xl"}
                justify={"center"}
                flexDir={"column"}
              >
                <Text
                  fontSize={"15px"}
                  color={"grey"}
                  fontWeight={"bold"}
                  ml={3} 
              
                >
                  Bio
                </Text>
                <Input
                  type="text"
                  border={"none"}
                  name="name"
                  size={"md"}
                  h={"100px"}
                  _placeholder={{ color: "white" }}
                  onChange={(e) => setBio(e.target.value)}
                  
                />
              </Flex>
                <Divider borderBottom={"1px solid grey"} mt={5}/>

              <Flex justifyContent={"flex-end"} mt={5}>
                <Button
                  borderRadius="full"
                  bg="rgba(4, 165, 30, 1)"
                  color="white"
                  fontSize="14px"
                  w="63px"
                  h="33px"
                  ml="20px"
                  onClick={handlePost}
                  _hover={{ bg: "blue.500" }}
                >
                  Save
                </Button>
              </Flex>
            </Box>
          </Flex>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
