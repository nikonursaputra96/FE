import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { createThread } from "../../../lib/api/call/thread";
import { useAppSelector } from "../../../store";

interface IThreadPostProps {
  threadId?: number;
  callback?: () => Promise<void>;
}
const ThreadPost: React.FC<IThreadPostProps> = ({ threadId, callback }) => {
    const profile = useAppSelector((state) => state.auth.user)
    const hostURL = "http://localhost:5000/assets/"

  const [threadPost, setThreadPost] = useState<{
    content: string;
    image: FileList | null;
    threadId?: number;
  }>({ content: "", image: null });

  const handlePostThread = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();

      if (threadId) {
        threadPost.threadId = threadId;
        }
        console.log(threadPost, threadId, callback);
        const res = await createThread(threadPost);
        console.log(res);

        if (callback) {
          await callback();
        }

        setThreadPost({ content: "", image: null })
        
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <FormControl display={"flex"} color="white" px={5}>
        <Avatar mr={8} w="40px" h="40px" src={hostURL + profile?.avatar}/>
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
          onChange={(e) => setThreadPost({ ...threadPost, image: e.target.files})}
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
  );
};

export default ThreadPost;
