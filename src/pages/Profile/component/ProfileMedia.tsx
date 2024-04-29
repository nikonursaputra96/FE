import { Flex, Image,  } from "@chakra-ui/react";

import useThread from "../../../hooks/useThread";
import { useEffect } from "react";
import { useAppSelector } from "../../../store";

const ProfileMedia = (): React.JSX.Element => {
    const { threads, getThread } = useThread();
    const profile = useAppSelector((state) => state.auth.user)

    
    const filteredThreads = threads?.filter(
      (thread) => thread.userId === profile?.user.id
    );
  
    

    useEffect(() => {
      getThread();
    }, []);

  return (
    <Flex mt={1} flexWrap={"wrap"}>
      {filteredThreads?.map((thread: any, id: number) => (
        <Flex key={id}  mt={2} >
          {thread.image && thread.image.map ((image: any) => (
              <Image
              width={"50%"}
              borderRadius={"xl"}
                        flex={1}
                        px={1}
                        py={1}
                key={thread.id} src={"http://localhost:5000/assets/"+ image.image} 
              />
          )) }
        </Flex>
      ))}
    </Flex>
  );
};

export default ProfileMedia;
