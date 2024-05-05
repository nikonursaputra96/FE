import { Flex, Box, Text, Avatar} from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import EditProfile from "../editProfile/EditProfile";



const SideBarProfile = (): React.JSX.Element => {
  const profile = useAppSelector((state) => state.auth.user);






  return (
    <Box mt={5}>
      <Box
        bg="rgba(38, 38, 38, 1)"
        borderRadius="xl"
        p={5}
        // onClick={handleProfileClick}
        cursor={"pointer"}
      >
        <Box bg="rgba(38, 38, 38, .3)">
          <Text color="white" fontSize="1.2rem" fontWeight="bold">
            My Profile
          </Text>

          <Box
            h="100px"
            bg={`url('${profile?.cover}')`}
            bgPosition="center"
            borderRadius="lg"
            mt={3}
          >
            <Avatar
              w="60px"
              h="60px"
              mt={62}
              ml={25}
              border="3px solid #1d1d1d"
              src={profile?.avatar}
            />
          </Box>

          <Flex justifyContent="flex-end" mt={3}>
              <EditProfile/>
          </Flex>

          <Box>
            <Text fontSize="1.2rem" color="white" fontWeight="bold">
              ✨{profile?.user?.fullname}✨
            </Text>
            <Text fontSize="1rem" mt={1} color="rgba(144, 144, 144, 1)">
              @{profile?.user?.username}
            </Text>
            <Text fontSize="1rem" mt={1} color="white">
              {profile?.bio}
            </Text>
          </Box>

          <Flex gap={1} fontSize="0.8rem" mt={2}>
            <Text color="white" fontWeight="bold">
              {profile?.user?._count.follower}
            </Text>
            <Text color="rgba(144, 144, 144, 1)">Following</Text>
            <Text color="white" fontWeight="bold" ml={3}>
            {profile?.user?._count.following}
            </Text>
            <Text color="rgba(144, 144, 144, 1)">Followers</Text>
          </Flex>

       
        </Box>
      </Box>
    </Box>
  );
};

export default SideBarProfile;
