import { Avatar, Box,   Flex, Text } from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store";
import EditProfile from "../../../component/editProfile/EditProfile";


type ProfileHeader = {
  
  handleMenuClick: (menu: string) => void;
  menuActive: string;
};

const ProfileHeader = ({handleMenuClick, menuActive}:ProfileHeader): React.JSX.Element => {
  const profile = useAppSelector((state) => state.auth.user)
  const hostURL = "http://localhost:5000/assets/"
  const navigate = useNavigate()
  

  return (
    <Box
      w={"full"}
      bg="#1d1d1d"
      mt={8}
    >
      <Box px={5} mt={5}>
        <Flex>
          <FaArrowLeftLong size={24} color="white" cursor={"pointer"} onClick={() => navigate("/")}/>
          <Text color="white" fontSize="20px" fontWeight="bold" ml={3}>
            ✨{profile?.user.fullname}✨
          </Text>
        </Flex>

        <Box
          w="auto"
          h="100px"
          bg={`url('${hostURL + profile?.cover}')`}
          bgPosition="center"
          borderRadius="lg"
          mt={3}
        >
          <Avatar w="80px" h="80px" mt={62} ml={25} border="3px solid black" src={hostURL + profile?.avatar} />
        </Box>

        <Flex justifyContent="flex-end" mt={3}>
          <EditProfile/>
        </Flex>

        <Box>
          <Text fontSize="24px" mt={1} color="white" fontWeight="bold">
            ✨{profile?.user.fullname}✨
          </Text>
          <Text fontSize="14px" mt={1} color="rgba(144, 144, 144, 1)">
            @{profile?.user.username}
          </Text>
          <Text fontSize="16px" mt={1} color="white">
            {profile?.bio}
          </Text>
        </Box>

        <Flex gap={1} fontSize="16px" mt={2}>
          <Text color="white" fontWeight="bold">
            {profile?.user._count.following}
          </Text>
          <Text color="rgba(144, 144, 144, 1)">Following</Text>
          <Text color="white" fontWeight="bold" ml={3}>
          {profile?.user._count.follower}
          </Text>
          <Text color="rgba(144, 144, 144, 1)">Followers</Text>
        </Flex>
      </Box>
      <Flex
        color={"white"}
        justifyContent={"space-evenly"}
        mt={7}
        borderBottom={"2px solid grey"}
      >
        <Box
          textAlign={"center"}
          cursor={"pointer"}
          onClick={() => handleMenuClick("AllPost")}
          borderBottom={menuActive === "AllPost" ? "4px solid green" : "none"}
          w={300}
        >
          <Text>All post</Text>
        </Box>
        <Box
          textAlign={"center"}
          cursor={"pointer"}
          onClick={() => handleMenuClick("Media")}
          borderBottom={menuActive === "Media" ? "4px solid green" : "none"}
          w={300}
        >
          <Text>Media</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileHeader;
