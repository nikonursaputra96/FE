import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import ThreadCard from "../../../component/ThreadCard";
import { useNavigate, useParams } from "react-router-dom";
import Like from "../../../component/Likebutton/Like";
import { TbMessage } from "react-icons/tb";
import { formatDistanceToNow } from "date-fns";
import useMediaProfile from "../../../hooks/useMediaProfile";

interface IThreadProps {

    showLike: boolean;
  }

const ProfileCardsPerson: React.FC<IThreadProps> = ({showLike = true}): React.JSX.Element => {
  const { userId } = useParams();
  const { fetchThreadDetail, thread, threadDetail } =
    useMediaProfile();

    

  useEffect(() => {
    fetchThreadDetail();
  }, [userId]);

  const navigate = useNavigate()

  return (
    <Box mt={1}>
      <Box mt={"15px"}>
        <Box px={5}>
          {thread.map((thread, index) => (
            <Flex key={index}>
              <Avatar
                w="40px"
                h="40px"
                src={
                  "http://localhost:5000/assets/" + threadDetail?.data.avatar
                }
              />
              <Flex flexDirection="column" key={index}>
                <Flex fontSize="14px" gap={1} ml={3}>
                  <Text color="white">{threadDetail?.data.user.fullname}</Text>
                  <Text color="rgba(144, 144, 144, 1)">
                    @{threadDetail?.data.user.username}
                  </Text>
                  <Text color="rgba(144, 144, 144, 1)">•</Text>
                  <Text color="rgba(144, 144, 144, 1)">
                    {thread.createdAt
                      ? formatDistanceToNow(new Date(thread.createdAt), {
                          addSuffix: false,
                        })
                      : ""}
                  </Text>
                </Flex>
                <Flex flexWrap={"wrap"}>
                  {thread.image.map((image, index) => (
                    <Image
                      w={"50%"}
                      flex={1}
                      py={1}
                      px={1}
                      key={index}
                      borderRadius="xl"
                      src={"http://localhost:5000/assets/" + image.image}
                    />
                  ))}
                </Flex>
                <Text
                  textAlign="justify"
                  ml={3}
                  fontSize="14px"
                  mt={2}
                  color="white"
                  pr="50px"
                >
                  {thread.content}
                </Text>
                <Flex gap={2} fontSize="14px" ml={3} mt={3}>
                  {showLike && (
                    <Box>
                      <Like threadId={thread.id as number} />
                    </Box>
                  )}
                  {showLike && (
                    <Flex
                      gap={2}
                      onClick={() => {
                        navigate(`/detail/${thread.id}`);
                      }}
                    >
                      <TbMessage cursor="pointer" size={22} />
                      <Text>{thread._count.replies}</Text>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Box>

        {/* <Box>
          {replies.map((reply) => (
            <ThreadCard thread={reply} key={reply.id} showLike={false} />
          ))}
        </Box> */}
      </Box>
    </Box>
  );
};

export default ProfileCardsPerson;
