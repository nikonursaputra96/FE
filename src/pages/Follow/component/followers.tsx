import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

import Follow from '../../../component/followButton/Follow';

import { useAppSelector } from '../../../store';

const Followers = () => {
    const hostURL = "http://localhost:5000/assets/";
    const profile = useAppSelector((state) => state.auth.user);



  return (
      <Flex px={5}>
          <Box w="full" borderRadius="xl" mx="auto">
            {profile?.user.follower.map((data: any, id: number) => (
              <Flex
                key={id}
                justifyContent="space-between"
                alignItems="center"
                py={3}
                borderBottom={"2px solid rgba(38, 38, 38, 1)"}
              >
                <Flex alignItems="center">
                  <Avatar
                    src={hostURL + data.following?.profile?.avatar || ''}
                    w={"40px"}
                    h={"40px"}
                  />
                  <Box ml={2}>
                    <Text fontSize="0.8rem" color="white" fontWeight="bold">
                      {data.following?.fullname || ''}
                    </Text>
                    <Text fontSize="0.75rem" color="rgba(144, 144, 144, 1)">
                      @{data.following?.username || ''}
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <Follow followingId={data.followingId}/>
                </Box>
              </Flex>
            ))}
          </Box>
        </Flex> 
  )
}

export default Followers