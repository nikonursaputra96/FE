import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IThread } from "../../types/app";
import { getReplies, threadById } from "../../lib/api/call/thread";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";

import { TbMessage } from "react-icons/tb";
import ThreadPost from "../Home/component/ThreadPost";
import ThreadCard from "../../component/ThreadCard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import Like from "../../component/Likebutton/Like";

const DetailThread = () => {
  const navigate = useNavigate();

  const { threadId } = useParams();

  const [threadDetail, setThreadDetail] = useState<IThread>({
    userId: 0,
    content: "",
    image: [],
    id: 0,
    createdAt: ``,
  });

  const [replies, setReplies] = useState<IThread[]>([]);

  const fetchThreadDetail = async () => {
    try {
      const res = await threadById(Number(threadId));
      const resReplies = await getReplies(Number(threadId));

      setThreadDetail(res.data.data);
      setReplies(resReplies.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchThreadDetail();
  }, [threadId]);

  return (
    <Box mt={"15px"}>
      <Flex
        cursor={"pointer"}
        onClick={() => navigate("/")}
        align={"center"}
        ml={6}
        gap={5}
        mb={5}
        px={5}
      >
        <FaArrowLeftLong size={24} />
        <Text fontSize={"1.2rem"} fontWeight={"bold"}>
          Status
        </Text>
      </Flex>
      <Box px={5}>
        <Flex color="white" mt="15px">
          <Avatar
            w="40px"
            h="40px"
            src={threadDetail.author?.profile?.avatar}
          />
          <Flex flexDirection="column">
            <Flex fontSize="14px" gap={1} ml={3}>
              <Text color="white">{threadDetail.author?.fullname}</Text>
              <Text color="rgba(144, 144, 144, 1)">
                @{threadDetail.author?.username}
              </Text>
              <Text color="rgba(144, 144, 144, 1)">•</Text>
              <Text color="rgba(144, 144, 144, 1)">
                {threadDetail.createdAt
                  ? formatDistanceToNow(new Date(threadDetail.createdAt), {
                      addSuffix: false,
                    })
                  : ""}
              </Text>
            </Flex>
            <Box>
              {threadDetail.image &&
                threadDetail.image.map((image, index) => (
                  <Flex key={index} mt={4} flexWrap={"wrap"}>
                    <Image borderRadius="xl" src={image.image} w={"50%"} flex={1}/>
                  </Flex>
                ))}
            </Box>

            <Text
              textAlign="justify"
              ml={3}
              fontSize="14px"
              mt={2}
              color="white"
              pr="50px"
            >
              {threadDetail.content}
            </Text>
            <Flex gap={2} fontSize="14px" ml={3} mt={3}>
              <Box>
                <Like threadId={Number(threadId)} />
              </Box>

              <TbMessage
                cursor="pointer"
                size={20}
                // onClick={handleRepliesClick}
              />

              <Text>{replies.length}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Box py={5}>
        <ThreadPost callback={fetchThreadDetail} threadId={Number(threadId)} />
      </Box>

      <Box>
        {replies.map((reply) => (
          <ThreadCard thread={reply} key={reply.id} showLike={true} showReplies={true} />
        ))}
      </Box>
    </Box>
  );
};

export default DetailThread;
