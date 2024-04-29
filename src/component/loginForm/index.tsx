import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { handleChange, handleLogin} = useLogin();
  const navigate = useNavigate()

  return (
    // <Box>
    //     <form>
    //         <FormLabel>Email or Username</FormLabel>
    //         <Input type="text" />
    //         <FormLabel>Password</FormLabel>
    //         <Input type="password" />
    //         <Button type="submit"></Button>
    //     </form>
    // </Box>

    <Flex
      flexDir={"column"}
      justify={"center"}
      mt={50}
      w={"500px"}
      mx={"auto"}
      bg={"#1d1d1d"}
    >
      <Box>
        <Text color="rgba(4, 165, 30, 1)" fontSize="62" fontWeight="bold">
          circle
        </Text>
        <Text color="white" fontSize="40" fontWeight="bold">
          Login to Circle
        </Text>
      </Box>

      <Box>
        <form onSubmit={handleLogin}>
          <FormControl
            isRequired
            color={"white"}
            border="rgba(144, 144, 144, .5)"
          >
            <Input
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Email/Username"
              my={15}
              h={50}
              sx={{
                "::placeholder": {
                  color: "rgba(144, 144, 144, 1)",
                },
              }}
            />
            <Input
              onChange={handleChange}
              type="password"
              name="password"
              id="password-input"
              placeholder="Password"
              h={50}
              sx={{
                "::placeholder": {
                  color: "rgba(144, 144, 144, 1)",
                },
              }}
            />
          </FormControl>

          <Text color={"white"} textAlign={"right"} my={"8px"}>
            Forgot password?
          </Text>

          <Button
            borderRadius="full"
            type="submit"
            bg="rgba(4, 165, 30, 1)"
            color="white"
            fontSize="20px"
            w={"full"}
            h={"45"}
            // onClick={handlePost}
          >
            Login
          </Button>
        </form>
      </Box>

      <Flex align={"center"}>
        <Text color={"white"} textAlign={"right"} my={"8px"}>
          Don't have an account yet?
        </Text>
        <Text
          color={"rgba(4, 165, 30, 1)"}
          ml={2}
          fontWeight={"bold"}
          cursor={"pointer"}
          onClick={() => navigate('/register')}
        >
          Create account
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginForm;
