import React, { useEffect, useState } from "react";
import { Flex, Image } from "@chakra-ui/react";
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
    <Flex mt={1} flexWrap={"wrap"}>
      {filteredThreads?.map((thread: any, id: number) => (
        <Flex key={id} mt={2}>
          {thread.image &&
            thread.image.map((image: any) => (
              <Image
                key={thread.id}
                src={"http://localhost:5000/assets/" + image.image}
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
    </Flex>
  );
};

export default ProfileMedia;
