import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlinePersonSearch } from "react-icons/md";
import { RiHome7Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { SET_LOGOUT } from "../../store/slice/auth";

const MENU = [
  {
    title: "Home",
    link: "/",
    icon: RiHome7Fill,
  },
  {
    title: "Search",
    link: "/search",
    icon: MdOutlinePersonSearch,
  },

  {
    title: "Follow",
    link: "/follow",
    icon: AiOutlineHeart,
  },
  {
    title: "Profile",
    link: "/profile",
    icon: IoPersonCircleOutline,
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutButton = () => {
    dispatch(SET_LOGOUT());
    navigate("/login");
  };

  return (
    <Box>
      <Box display={"flex"}
      height={"100vh"}
      flexDir={"column"}
      justifyContent={"space-between"}
      >
        <Box
          bg="#1d1d1d"
          px={6}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Flex fontWeight="bold">
            <Text color="rgba(4, 165, 30, 1)" fontSize="68px" mb={5}>
              circle
            </Text>
          </Flex>

          <Flex color="white" flexDirection="column" fontSize="1rem" gap={7}>
            {MENU.map((menu) => (
              <Flex key={menu.title} align="center" gap={4}>
                <menu.icon size={30} />
                <Link key={menu.title} to={menu.link}>
                  {menu.title}
                </Link>
              </Flex>
            ))}
          </Flex>

          <Button
            bg="rgba(4, 165, 30, 1)"
            borderRadius="full"
            width="100%"
            height="52px"
            mt="30px"
            _hover={{ bg: "blue.500" }}
          >
            <Text fontWeight="bold" color="white" fontSize="1rem">
              Create Post
            </Text>
          </Button>
        </Box>

        <Flex
          ml={6}
          mb={8}
          align="center"
          color="white"
          fontSize="1rem"
          cursor="pointer"
          onClick={logoutButton}>
          <BiLogOut size={30} />
          <Text>Logout</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Sidebar;
