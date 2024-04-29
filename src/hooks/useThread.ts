import { useState } from "react";
import { IThread } from "../types/app";
import { getThreads } from "../lib/api/call/thread";

const useThread = () => {

    const [threads, setThreads] = useState<IThread[] | []>([]);

   const getThread = async () => {
      try {
        const res = await getThreads();
        setThreads(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  return {
    threads,
    getThread
  }
}




export default useThread
