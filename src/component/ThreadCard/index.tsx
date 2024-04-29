import { Avatar, Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { IThread } from "../../types/app";

import { TbMessage } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import { getReplies } from "../../lib/api/call/thread";
import Like from "../Likebutton/Like";

interface IThreadProps {
  thread: IThread;
  showLike: boolean;
}

const ThreadCard: React.FC<IThreadProps> = ({ thread, showLike = true }) => {
  const [replies, setReplies] = useState<IThread[]>([]);
 

  const fetchThreadDetail = async () => {
    try {
      const resReplies = await getReplies(Number(thread.id));
      setReplies(resReplies.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchThreadDetail();
  }, []);

  const navigate = useNavigate();


  return (
    <Box>
      <Flex color="white" mt="15px" px={5}>
        <Avatar
        cursor={"pointer"}
          w="40px"
          h="40px"
          src={"http://localhost:5000/assets/" + thread.author?.profile?.avatar}
          onClick={() => {
            navigate(`/profile-id/${thread.userId}`);
          }}
        />
        <Flex flexDirection="column">
          <Box
            onClick={() => {
              navigate(`/detail/${thread.id}`);
            }}
            cursor={"pointer"}
          >
            <Flex fontSize="14px" gap={1} ml={3}>
              <Text color="white">{thread.author?.fullname}</Text>
              <Text color="rgba(144, 144, 144, 1)">
                @{thread.author?.username}
              </Text>
              <Text color="rgba(144, 144, 144, 1)">•</Text>
              <Text color="rgba(144, 144, 144, 1)">
                {formatDistanceToNow(new Date(thread.createdAt), {
                  addSuffix: false,
                })}
              </Text>
            </Flex>

            <Flex justifyContent={"center"}  flexWrap={"wrap"}>
            {thread.image &&
              thread.image.map((image, index) => (
                
                  <Image key={index}
                        width={"50%"}
                        flex={1}
                        px={1}
                        py={1}
                    src={"http://localhost:5000/assets/" + image.image}
                    borderRadius={"xl"}
                  />
                
              ))}
            </Flex>

            <Text
              textAlign="justify"
              ml={3}
              fontSize="14px"
              mt={2}
              color="white"
            >
              {thread.content}
            </Text>
          </Box>
          <Flex gap={2} fontSize="14px" ml={3} mt={3}>
            {showLike && (
              <Box>
                <Like threadId={thread.id as number} />
              </Box>
            )}
            {showLike && (
              <Flex gap={2}    onClick={() => {
                navigate(`/detail/${thread.id}`);
              }}>
                <TbMessage cursor="pointer" size={22} />
                <Text>{replies.length}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Divider borderBottom={"3px solid rgba(60, 60, 60, 1)"} mt={5} />
    </Box>
  );
};

export default ThreadCard;
