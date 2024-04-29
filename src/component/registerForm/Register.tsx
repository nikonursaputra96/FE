import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

const Register = () => {
  const navigate = useNavigate();
  const { handleChangeRegister, handleRegister } = useRegister();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      mt={50}
      bg={"#1d1d1d"}
      w={"500px"}
      mx={"auto"}
    >
      <Box>
        <Text color="rgba(4, 165, 30, 1)" fontSize="62" fontWeight="bold">
          circle
        </Text>
        <Text color="white" fontSize="40" fontWeight="bold">
          Create Account Circle
        </Text>
      </Box>

      <Box>
        <form onSubmit={handleRegister}>
          <FormControl
            isRequired
            color={"white"}
            border="rgba(144, 144, 144, .5)"
          >
            <Input
              type="text"
              onChange={handleChangeRegister}
              name="fullname"
              id="fullname"
              placeholder="FullName"
              my={15}
              h={50}
              sx={{
                "::placeholder": {
                  color: "rgba(144, 144, 144, 1)",
                },
              }}
            />
            <Input
              type="email"
              id="email"
              onChange={handleChangeRegister}
              name="email"
              placeholder="Email"
              my={15}
              h={50}
              sx={{
                "::placeholder": {
                  color: "rgba(144, 144, 144, 1)",
                },
              }}
            />
            <Input
              type="text"
              onChange={handleChangeRegister}
              name="username"
              id="username"
              placeholder="Username"
              my={15}
              h={50}
              sx={{
                "::placeholder": {
                  color: "rgba(144, 144, 144, 1)",
                },
              }}
            />
            <Input
              type="password"
              id="password"
              onChange={handleChangeRegister}
              name="password"
              placeholder="Password"
              h={50}
              my={15}
              sx={{
                "::placeholder": {
                  color: "rgba(144, 144, 144, 1)",
                },
              }}
            />
          </FormControl>

          <Button
            type="submit"
            borderRadius="full"
            bg="rgba(4, 165, 30, 1)"
            color="white"
            fontSize="20px"
            w={"full"}
            h={"45"}
            mt={2}
          >
            CREATE
          </Button>
        </form>
      </Box>

      <Flex align={"center"}>
        <Text color={"white"} textAlign={"right"} my={"15px"}>
          Already have account?
        </Text>
        <Text
          color={"rgba(4, 165, 30, 1)"}
          ml={2}
          fontWeight={"bold"}
          cursor={"pointer"}
          onClick={handleLogin}
        >
          Login
        </Text>
      </Flex>
    </Flex>
  );
};

export default Register;
