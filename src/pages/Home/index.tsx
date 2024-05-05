import { useEffect, useState } from "react"
import { IThread } from "../../types/app"
import { getThreads } from "../../lib/api/call/thread"
import ThreadCard from "../../component/ThreadCard"
import { Box,  Text } from "@chakra-ui/react"
import ThreadPost from "./component/ThreadPost"




const Home = () => {
    const [threads, setThreads] = useState<IThread[] | []>([])

    async function getThread() {
        try {
            const res = await getThreads()
            setThreads(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getThread()
    },[])
  return (
    <Box >
        <Text color="rgba(255, 255, 255, 1)" fontSize={"1.5rem"} py={5} px={5} fontWeight={"bold"}>
        Home
      </Text>
      <Box >
        <ThreadPost callback={getThread}/>
      </Box >
        {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} showLike={true} showReplies={true}/>
        ))}

    </Box>
  )
}

export default Home