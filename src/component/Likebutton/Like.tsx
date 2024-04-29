import { ButtonGroup, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
// import { useAppSelector } from "../../store"
import API from "../../lib/api"

interface ILikeButtonProps {
    threadId: number
}

const Like:React.FC<ILikeButtonProps> = ({threadId}) => {
    // const {user} = useAppSelector((state) => state.auth)
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState()
 

    const getLike = async () => {
        try {
            const res = await API.get(`like/${threadId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
           
            setLiked(res.data.data.like === null ? false : true)
        
        } catch(error) {
            console.log(error)
        }
    }

    const getAllLike = async () => {
        try {
            const res = await API.get(`likes/${threadId}`, {
                headers : {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setLikeCount(res.data.data.user.length)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = async () => {
        try {
            const res = await API.post(`like`, 
            {
                threadId: threadId
            },{
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(res)
            await getLike()
            await getAllLike()
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLike()
        getAllLike()
    },[])

  return (
    <ButtonGroup onClick={() => handleLike()} mr={2}>
         {liked ? (
                <AiFillHeart color="red" cursor="pointer" size={22} />
              ) :  (
                <AiOutlineHeart cursor="pointer" size={22} />
              )}
        <Text>{likeCount}</Text>

    </ButtonGroup>
  )
}

export default Like