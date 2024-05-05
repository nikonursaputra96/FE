import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { useAppSelector } from "../../store";
import { createThread } from "../../lib/api/call/thread";

interface IThreadPostProps {
  isOpen: boolean;
  onClose: () => void;
  threadId?: number;
  callback?: () => Promise<void>;
}

const ThreadPostModal: React.FC<IThreadPostProps> = ({
  isOpen,
  onClose,
  threadId,
  callback,
}) => {
  const profile = useAppSelector((state) => state.auth.user);


  const [threadPost, setThreadPost] = useState<{
    content: string;
    image: FileList | null;
    threadId?: number;
  }>({ content: "", image: null });

  const handlePostThread = async () => {
    try {
      if (threadId) {
        threadPost.threadId = threadId;
      }

      const res = await createThread(threadPost);
      console.log(res);

      if (callback) {
        await callback();
      }

      setThreadPost({ content: "", image: null });
      onClose(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Create New Thread</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormControl display={"flex"} px={5}>
                <Avatar
                  mr={8}
                  w="40px"
                  h="40px"
                  src={profile?.avatar}
                />
                <Input
                  placeholder="What's Happening ?!"
                  type="text"
                  border="none"
                  fontSize="1rem"
                  value={threadPost.content}
                  w="full"
                  resize="none"
                  sx={{
                    "::placeholder": {
                      color: "rgba(144, 144, 144, 1)",
                    },
                  }}
                  minH="45px"
                  name="content"
                  onChange={(e) =>
                    setThreadPost({ ...threadPost, content: e.target.value })
                  }
                />

                <label htmlFor="imageUpload">
                  <LuImagePlus
                    size={24}
                    color="rgba(4, 165, 30, 1)"
                    style={{ marginTop: "5px" }}
                    cursor="pointer"
                  />
                  {threadPost.image?.length}
                </label>
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  display="none"
                  name="image"
                  multiple
                  max={4}
                  onChange={(e) =>
                    setThreadPost({ ...threadPost, image: e.target.files })
                  }
                />

                <Button
                  borderRadius="full"
                  bg="rgba(4, 165, 30, 1)"
                  color="white"
                  fontSize="0.75rem"
                  w="auto"
                  h="33px"
                  ml="20px"
                  onClick={handlePostThread}
                  _hover={{ bg: "blue.500" }}
                >
                  Post
                </Button>
              </FormControl>

              <Divider borderBottom={"3px solid rgba(60, 60, 60, 1)"} mt={4} />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ThreadPostModal;
