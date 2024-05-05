import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { IThread } from "../../types/app";
import { getReplies, threadById } from "../../lib/api/call/thread";
import { formatDistanceToNow } from "date-fns";
import Like from "../../component/Likebutton/Like";
import ThreadPost from "../../pages/Home/component/ThreadPost";
import ThreadCard from "../../component/ThreadCard";
import { TbMessage } from "react-icons/tb";
import { IoCloseCircleOutline } from "react-icons/io5";

interface ModalDetailImageProps {
  threadId: number;
  closeModal: () => void;
}

const ModalDetailImage: React.FC<ModalDetailImageProps> = ({
  threadId,
  closeModal,
}) => {
  const [threadDetail, setThreadDetail] = useState<IThread>({
    userId: 0,
    content: "",
    image: [],
    id: 0,
    createdAt: "",
  });
  const [replies, setReplies] = useState<IThread[]>([]);

  const fetchThreadDetail = async () => {
    try {
      const res = await threadById(threadId);
      const resReplies = await getReplies(threadId);

      setThreadDetail(res.data.data);
      setReplies(resReplies.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Slider Phooto
  const [isSlide, setIsSlide] = useState<number>(0);
  const slide = threadDetail.image?.map((img) => {
    return img.image;
  });
  const slideCount = slide?.length;
  const prevSlide = () => {
    setIsSlide((s) => (s === 0 ? slideCount! - 1 : s - 1));
  };

  const nextSlide = () => {
    setIsSlide((s) => (s === slideCount! - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${isSlide * 106}%`,
  };
  useEffect(() => {
    fetchThreadDetail();
  }, [threadId]);

  return (
    <Flex
      bg="#1d1d1d"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={9999}
    >
      <Flex  overflow="hidden" w={"70vw"} >
        <Flex {...carouselStyle} flex={"none"}>
          {slide &&
            slide?.map((image, index) => (
              <Box key={index} p={0.5}>
          
                <Image
                w={"70vw"}
                h={"100vh"}
                borderRadius={"10px"}
                  src={image}
                />
              </Box>
            ))}
        </Flex>
        <Box>
          <Text
            position={"absolute"}
            cursor={"pointer"}
            top={"50%"}
            left="10px"
            onClick={prevSlide}
          >
            &#10094;
          </Text>
          <Text
            position={"absolute"}
            cursor={"pointer"}
            top={"50%"}
            right="34vw"
            onClick={nextSlide}
          >
            &#10095;
          </Text>
        </Box>
      </Flex>

      <Box color="white" mt="10px" w={"35vw"}>
        <Box
          cursor={"pointer"}
          onClick={closeModal}
          position="absolute"
          left={5}
          top={5}
        >
          <IoCloseCircleOutline size={"20px"} />
        </Box>

        <Box ml={4} >
          <Flex color="white" mt="15px">
            <Avatar
              w="40px"
              h="40px"
              src={
                threadDetail.author?.profile?.avatar
              }
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

                <TbMessage cursor="pointer" size={20} />

                <Text>{replies.length}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Divider borderBottom={"3px solid rgba(60, 60, 60, 1)"} mt={1} />

        <Box mt={5}>
          <ThreadPost callback={fetchThreadDetail} threadId={threadId} />
        </Box>
        <Box
          overflowY={"scroll"}
          maxH={"calc(100vh - 200px)"}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {replies.map((reply) => (
            <ThreadCard thread={reply} key={reply.id} showLike={true} showReplies={false}/>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default ModalDetailImage;
