import { Flex, Image,   } from "@chakra-ui/react";


import { useEffect } from "react";
import useMediaProfile from "../../../hooks/useMediaProfile";

const ProfileMediaPerson = (): React.JSX.Element => {
    const {fetchThreadDetail, thread } = useMediaProfile();


 
    

    useEffect(() => {
      fetchThreadDetail();
    }, []);

  return (
    <Flex flexWrap={"wrap"}>
      {thread?.map((thread: any, id: number) => (
        <Flex key={id} >
          {thread.image && thread.image.map ((image: any) => (
              <Image
              width={"50%"}
              borderRadius="xl"
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

export default ProfileMediaPerson;
