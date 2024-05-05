import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

import ThreadCard from "../../../component/ThreadCard";
import useThread from "../../../hooks/useThread";
import { useAppSelector } from "../../../store";

const ProfileCards = (): React.JSX.Element => {
  const profile = useAppSelector((state) => state.auth.user)
  const { threads, getThread } = useThread();

  useEffect(() => {
    getThread();
  }, []);

  const filteredThreads = threads?.filter(
    (thread) => thread.userId === profile?.user.id
  );

  return (
    <Box mt={1}>
      {filteredThreads?.map((thread: any, id: number) => (
        <ThreadCard key={id} thread={thread} showLike={true} showReplies={true}/>
      ))}
    </Box>
  );
};

export default ProfileCards;
