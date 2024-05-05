import {
  Avatar,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdOutlinePersonSearch } from "react-icons/md";
import API from "../../lib/api";
import { IUser } from "../../types/app";
import Follow from "../../component/followButton/Follow";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearchName = async () => {
    try {
      setSearching(true);
      const res = await API.get(`users/search?searchName=${searchInput}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSearchResult(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      handleSearchName();
    }
  }, [searchInput]);

  return (
    <Box py={5}>
      <Box px={3}>
        <InputGroup>
          <InputLeftElement
            ml={2}
            children={<MdOutlinePersonSearch color="grey" size={20} />}
          />

          <Input
            type="text"
            w={"full"}
            value={searchInput}
            borderRadius={"full"}
            bgColor={"rgba(60, 60, 60, 1)"}
            border={"none"}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </InputGroup>
        <Box >
          {searchInput.length > 0 ? (
            searching ? (
              <Flex
              justify="center"
              align="center"
              py={3}
              borderBottom={"2px solid rgba(38, 38, 38, 1)"}
            >
              <Spinner size="sm" color={"rgba(4, 165, 30, 1)"} />
            </Flex>
             
            ) : searchResult.length > 0 ? (
              searchResult.map((data: IUser, id) => (
                <Flex
                  key={id}
                  justifyContent="space-between"
                  alignItems="center"
                  py={3}
                  borderBottom={"2px solid rgba(38, 38, 38, 1)"}
                >
                  <Flex alignItems="center">
                    <Avatar
                      src={data.profile?.avatar}
                      w={"40px"}
                      h={"40px"}
                    />
                    <Box ml={2}>
                      <Text
                        fontSize="0.8rem"
                        color="white"
                        fontWeight="bold"
                      >
                        {data.fullname}
                      </Text>
                      <Text fontSize="0.75rem" color="rgba(144, 144, 144, 1)">
                        @{data.username}
                      </Text>
                    </Box>
                  </Flex>
                  <Box>
                    <Follow followingId={data.id} onFollow={() => Number(data.id)} />
                  </Box>
                </Flex>
              ))
            ) : (
              <Box
                justifyContent={"center"}
                alignItems={"center"}
                mt={150}
                textAlign={"center"}
              >
                
                <Text fontWeight={"bold"}>
                  No result for "{searchInput}", 
                </Text>
                  <Text fontSize={"small"} color={"grey"}>try searching for something
                  else or check the spelling of what you type.</Text>
              </Box>
            )
          ) : (
            <Box
            justifyContent={"center"}
            alignItems={"center"}
            mt={150}
            textAlign={"center"}
          >
      
            <Text fontWeight={"bold"}>
              Write and search something, 
            </Text>
              <Text fontSize={"small"} color={"grey"}>try searching for something
              else or check the spelling of what you type.</Text>
          </Box>
          )}
        </Box>

        <Flex></Flex>
      </Box>
    </Box>
  );
};

export default Search;
