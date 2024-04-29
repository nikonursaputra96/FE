import {  Box, Flex, Text } from "@chakra-ui/react";



type IFollowProps = {
  handleMenuClick: (menu: string) => void;
  menuActive: string;
};
const Follows = ({ handleMenuClick, menuActive }: IFollowProps) => {
 
  return (
    <Box py={5}>
      <Box>
        <Text px={6} fontSize={20} fontWeight={"bold"}>
          Follows
        </Text>
        <Flex mt={5}>
          <Box
            textAlign={"center"}
            cursor={"pointer"}
            onClick={() => handleMenuClick("Followers")}
            borderBottom={
              menuActive === "Followers" ? "4px solid green" : "none"
            }
            w={300}
          >
            <Text>Following</Text>
          </Box>
          <Box
            textAlign={"center"}
            cursor={"pointer"}
            onClick={() => handleMenuClick("Following")}
            borderBottom={
              menuActive === "Following" ? "4px solid green" : "none"
            }
            w={300}
          >
            <Text>Followers</Text>
          </Box>
        </Flex>
       
      </Box>
    </Box>
  );
};

export default Follows;
