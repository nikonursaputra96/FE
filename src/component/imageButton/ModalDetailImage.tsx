import {
  Box,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import AvatarD from "../assets/img/avatar-d.png";
import React, { useEffect } from "react";
import API from "../../lib/api";
import { IThread } from "../../types/app";
import Like from "../Likebutton/Like";
import ThreadCard from "../ThreadCard";
// import FormThread from "../features/thread/components/FormThreadI";
// import ThreadsCard from "../features/thread/components/ThreadsCard";
// import LikeButton from "./ButtonLike";
// import { useQuery } from "@tanstack/react-query";
// import { API } from "../lib/api";
// import useReply from "../features/reply/hooks";
// import { IThread } from "../interface/Threads";

const ModalDetailImage = (props: any): React.JSX.Element => {
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [replies, setReplies] = React.useState<IThread[]>([]);

  const getReplies = async () => {
    try {
      const response = await API.get("/threads/replies/" + props.id);
      setReplies(response.data.data);
    } catch (error: unknown) {
      throw error;
    }
  };

  useEffect(() => {
    getReplies();
  }, []);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        {/* {props.image && ( */}
          <Box overflow={"hidden"} p={"20px"} flex={2.8} alignSelf={"center"}>
            {props?.image?.map((image: any, i: number) => (
              <Image
                key={i}
                objectFit={"cover"}
                overflow={"hidden"}
                src={"http://localhost:5000/api/v1/uploads/" + image.image}
                alt="image"
              />
            ))}
          </Box>
        {/* )} */}

        <Box
          border={"1px solid rgba(63, 63, 63, 1)"}
          flex={1.2}
          h={"100vh"}
          overflow={"scroll"}
          className="beranda"
          me={"20px"}
        >
          <Box p={"20px"} pb={"0"} display={"flex"} gap={"5"}>
            <Box w={"40px"} cursor={"pointer"} onClick={props.onClose}>
              <Image
                rounded={"full"}
                w={"40px"}
                h={"40px"}
                objectFit={"cover"}
                src={"http://localhost:5000/api/v1/uploads/" + props.avatar}
                alt="image"
              />
            </Box>
            <Box display={"flex"} flexDir={"column"} gap={1}>
              <Box display={"flex"} gap={"3"}>
                <Box>
                  <Text
                    // onClick={() => navigate(`/detail-profile/${props.user.id}`)}
                    fontSize={"14px"}
                    fontWeight={"bold"}
                    cursor={"pointer"}
                    color={"white"}
                  >
                    {props.fullname}
                  </Text>
                  <Text fontSize={"12px"} color={"gray"}>
                    @{props.username}
                  </Text>
                </Box>
                <BsDot fontSize={"20px"} color="gray" />
                <Text fontSize={"14px"} color={"gray"}>
                 
                </Text>
              </Box>
              <Text
                cursor={"pointer"}
                //   onClick={() => navigate(`/detail-post/${props.id}`)}
                color={"white"}
                fontSize={"14px"}
              >
                {props.content}
              </Text>
              <Box>
                {/* <Like threadId={props.id} countLike={props.likes} /> */}
                <Button
                  _hover={{ backgroundColor: "transparent" }}
                  backgroundColor={"transparent"}
                  justifyContent={"left"}
                  padding={"0"}
                  color={"white"}
                  gap={"1"}
                  fontSize={"14px"}
                  w={"auto"}
                  h={"auto"}
                >
                  <BiCommentDetail
                    color="white"
                    style={{ fontSize: "20px", padding: "0" }}
                    //   onClick={() => navigate(`/detail-post/${props.id}`)}
                  />
                  {props.replies}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box border={"1px solid rgba(63, 63, 63, 1)"} p={"20px"} pt={"15px"}>
            {/* <ThreadCard callback={getReplies} /> */}
          </Box>
          {/* {replies?.map((theard: any, i: number): React.JSX.Element => {
            return (
              <ThreadCard
                key={i}
                id={theard.id}
                createdAt={theard.createdAt}
                content={theard.content}
                image={theard.image}
                likes={theard.likes}
                replies={theard.replies}
                isLiked={theard.isLiked}
                user={theard.user}
              />
            );
          })} */}
        </Box>
      </Box>
    </Box>
  );
};

export default ModalDetailImage;
