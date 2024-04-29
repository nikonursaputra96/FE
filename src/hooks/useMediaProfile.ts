import { useState } from "react";
import { useParams } from "react-router-dom";
import { IThread, ThreadItem, UserProfileResponse } from "../types/app";
import API from "../lib/api";
import { getReplies } from "../lib/api/call/thread";


const useMediaProfile = () => {
    const { userId } = useParams();
    const [threadDetail, setThreadDetail] = useState<UserProfileResponse>();
    // const [replies, setReplies] = useState<IThread[]>([]);
    const [thread, setThread] = useState<ThreadItem[]>([]);

    const fetchThreadDetail = async () => {
        try {
          const res = await API.get(`profile-id/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          const resThread = await API.get(`thread/user/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          // const resReplies = await getReplies(Number(userId));
    
          setThread(resThread.data.data);
     
          setThreadDetail(res.data);
          // setReplies(resReplies.data.data);
        } catch (error) {
          console.log(error);
        }
      };
    
  return {
    fetchThreadDetail,
    threadDetail,
    // replies, 
    thread
  }
}

export default useMediaProfile