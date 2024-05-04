import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import Follow from '../../../component/followButton/Follow';
import { useAppSelector } from '../../../store';

const Following = () => {

    const hostURL = "http://localhost:5000/assets/";


    const profile = useAppSelector((state) => state.auth.user)
  

  return (
    <Flex px={5}>
    <Box w="full" borderRadius="xl" mx="auto">
      {profile?.user.following.map((data:any, id: number) => (
        <Flex
          key={id}
          justifyContent="space-between"
          alignItems="center"
          py={3}
          borderBottom={"2px solid rgba(38, 38, 38, 1)"}
        >
          <Flex alignItems="center">
            <Avatar
              src={hostURL + data.follower?.profile?.avatar || ''}
              w={"40px"}
              h={"40px"}
            />
            <Box ml={2}>
              <Text fontSize="0.8rem" color="white" fontWeight="bold">
                {data.follower?.fullname || ''}
              </Text>
              <Text fontSize="0.75rem" color="rgba(144, 144, 144, 1)">
                @{data.follower?.username || ''}
              </Text>
            </Box>
          </Flex>
          <Box>
            <Follow followingId={data.followerId}  onFollow={data.id}/>
          </Box>
        </Flex>
      ))}
    </Box>
  </Flex> 
)
  
}

export default Following