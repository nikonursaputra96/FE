import { Box, Flex, Image,   } from "@chakra-ui/react";


import { useEffect, useState } from "react";
import useMediaProfile from "../../../hooks/useMediaProfile";
import ModalDetailImage from "../../../component/modalDetailImage/ModalDetailImage";

const ProfileMediaPerson = (): React.JSX.Element => {
    const {fetchThreadDetail, thread } = useMediaProfile();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedThread, setSelectedThread] = useState<number | null>(null);
  


    const handleImageClick = (threadId: number) => {
      setSelectedThread(threadId);
      setShowModal(true);
    };
    

    useEffect(() => {
      fetchThreadDetail();
    }, []);

  return (
    <Box>
      {thread?.map((thread: any, id: number) => (
        <Flex key={id} flexWrap={"wrap"}>
          {thread.image && thread.image.map ((image: any, index:number) => (
              <Image
              onClick={() => handleImageClick(thread.id)}
              width={"50%"}
              cursor={"pointer"}
              borderRadius="xl"
                        flex={1}
                        px={1}
                        py={1}
                key={index} src={image.image} 
              />
          )) }
        </Flex>
      ))}
     {showModal && <ModalDetailImage threadId={selectedThread!} closeModal={() => setShowModal(false)} />}
    </Box>
  );
};

export default ProfileMediaPerson;
