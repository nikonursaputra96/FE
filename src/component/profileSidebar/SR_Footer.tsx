import { Box, Flex, Text, Image} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const SideBarFooter = () :React.JSX.Element => {
    return (
        <Box
        bg="rgba(38, 38, 38, 1)"
        borderRadius="xl"
        mx="auto"
        p={5}
        mt={5}
      >
        <Flex color="rgba(178, 178, 178, 1)" gap={2} alignItems="center">
          <Text fontSize="0.8rem" color="white">
            Developed By
          </Text>
          <Text fontSize="0.8rem" fontWeight="bold" color="white">
            Niko Nur Saputra
          </Text>
          <Text fontSize="0.8rem">•</Text>
          <FaGithub size={12} />
          <FaLinkedin size={12} />
          <FaFacebook size={12} />
          <FaInstagram size={12} />
        </Flex>

        <Flex color="rgba(178, 178, 178, 1)" gap={0.5} alignItems="center" mt={1}>
          <Text fontSize="0.7rem">Powered by</Text>
          <Image src="/src/assets/img/logodumbways.png" w="15px" h="10px" mx={1}/>
          <Text fontSize="0.7rem">Dumbways Indonesia</Text>
          <Text fontSize="0.7rem">•</Text>
          <Text fontSize="0.7rem">#1 Coding Bootcamp</Text>
        </Flex>
      </Box>
    )
}

export default SideBarFooter