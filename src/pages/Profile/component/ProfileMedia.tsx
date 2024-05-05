import React, { useEffect, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import useThread from "../../../hooks/useThread";
import { useAppSelector } from "../../../store";
import ModalDetailImage from "../../../component/modalDetailImage/ModalDetailImage";

const ProfileMedia = (): React.JSX.Element => {
  const { threads, getThread } = useThread();
  const profile = useAppSelector((state) => state.auth.user);
  const filteredThreads = threads?.filter((thread) => thread.userId === profile?.user.id);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedThread, setSelectedThread] = useState<number | null>(null);

  const handleImageClick = (threadId: number) => {
    setSelectedThread(threadId);
    setShowModal(true);
  };

  useEffect(() => {
    getThread();
  }, []);

  return (
    <Box mt={1}>
      {filteredThreads?.map((thread: any, id: number) => (
        <Flex key={id} mt={2}  flexWrap={"wrap"}>
          {thread.image &&
            thread.image.map((image: any, index:number) => (
              <Image
              key={index}
                src={image.image}
                onClick={() => handleImageClick(thread.id)}
                width={"50%"}
                borderRadius={"xl"}
                flex={1}
                px={1}
                py={1}
                cursor={"pointer"}
              />
            ))}
        </Flex>
      ))}

      {showModal && <ModalDetailImage threadId={selectedThread!} closeModal={() => setShowModal(false)} />}
    </Box>
  );
};

export default ProfileMedia;
