import { Box, Flex, Text, Avatar} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {  IUser } from "../../types/app";
import { getUsers } from "../../lib/api/call/user";

import Follow from "../followButton/Follow";


const SideBarSuggested = () => {



  const [user, setUser] = useState<IUser[] | []>([]);



  const getUser = async () => {
    try {
      const res = await getUsers();
 
      setUser(res.data.data)
 
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = (userId: number) => {
    setUser((data) => data.filter((user) => user.id !== userId))
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Flex mt={5}>
      <Box
        w="full"
        bg="rgba(38, 38, 38, 1)"
        borderRadius="xl"
        mx="auto"
        p={5}
        overflowY={"auto"}
        maxH={"30vh"}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Text fontSize="1.1rem" color="white" fontWeight="bold" >
          Suggested for you
        </Text>

        {user.map((data: IUser, id: number) => (
          <Flex
            key={id}
            justifyContent="space-between"
            alignItems="center"
            mt={3}
        
          >
            <Flex alignItems="center">
              <Avatar src={data.profile?.avatar} w={"40px"} h={"40px"}/>
              <Box ml={2}>
                <Text fontSize="0.8rem" color="white" fontWeight="bold">
                  {data.fullname}
                </Text>
                <Text fontSize="0.75rem" color="rgba(144, 144, 144, 1)">
                  @{data.username}
                </Text>
              </Box>
            </Flex>
            <Box>
             <Follow followingId={data.id} onFollow={() => handleFollow(data.id)}/>
            </Box>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

export default SideBarSuggested;
