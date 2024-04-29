import { Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import API from "../../lib/api"
import { useAppDispatch, useAppSelector } from "../../store"
import { SET_LOGIN } from "../../store/slice/auth"
import { IProfile } from "../../types/app"
import { getProfile } from "../../lib/api/call/editProfile";


interface IFollowProps {
    followingId: number
    // onFollow: (followingId: number) => void
}

const Follow:React.FC<IFollowProps> = ({followingId}) => {
    const profile = useAppSelector((state) => state.auth.user);
    const [follow, setFollow] = useState(false)
    const dispatch = useAppDispatch()




    
      const getFollower = async () => {
          try {
              const res = await API.get(`follower/${followingId}`,{
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
              })
              
              if(profile?.user.id && res.data.data.followerId !== profile?.user.id) {
                  setFollow(false);
              } else if (profile?.user.id && res.data.data.followerId === profile?.user.id) {
                  setFollow(true);
              }
              
              
              return res.data
          } catch(error) {
              console.log(error)
          }
      };



  

    const handleFollow = async () => {
        try {
            const res = await API.post("follow" , {
                followingId: followingId
            }, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await getFollower()
            const get = await getProfile()
           
            dispatch(
              SET_LOGIN({
                user : get.data as IProfile,
                token: localStorage.getItem("token") as string
              })
            )
            
         
            setFollow(!follow)
            
            console.log('ini adalah data res', res.data)
            console.log('ini adalah data',  data.data)
       
            // onFollow(data.data.followingId)
        } catch (error) {
            console.log(error)
        }
    }
 
    useEffect(() => {
      getFollower()
    },[])
    // .......................................................................//
  //   useEffect(() => {
  //     const getFollower = async () => {
  //         try {
  //             const res = await API.get(`follower/${followingId}`,{
  //                 headers: {
  //                     Authorization: `Bearer ${localStorage.getItem("token")}`
  //                 }
  //             })
              
  //             if(profile?.user.id && res.data.data.followerId !== profile?.user.id) {
  //                 setFollow(false);
  //             } else if (profile?.user.id && res.data.data.followerId === profile?.user.id) {
  //                 setFollow(true);
  //             }
              
  //         } catch(error) {
  //             console.log(error)
  //         }
  //     };

  //     getFollower();
  // }, [followingId, profile?.user.id]);
  

  //   const handleFollow = async () => {
  //       try {
  //           const res = await API.post("follow" , {
  //               followingId: followingId
  //           }, {
  //               headers: {
  //                   Authorization:`Bearer ${localStorage.getItem("token")}`
  //               }
  //           })

  //           console.log(res)

         
  //           setFollow(!follow)
            
            
 
  //       } catch (error) {
  //           console.log(error)
  //       }
  //   }
 
  
  return (
    <div onClick={() => handleFollow()}>
    {follow ? (
      <Button
        color="white"
        size="sm"
        textAlign="center"
        borderRadius="full"
        border="2px solid white"
        bg="none"
        name="follow"
        opacity={0.4}
        _hover={{ bg: "red.500" }}
      >
        Following

      </Button>
    ) : (
      <Button
        color="white"
        textAlign="center"
        borderRadius="full"
        border="2px solid white"
        bg="none"
        size="sm"
        _hover={{ bg: "rgba(4, 165, 30, 1)" }}
        
      >
        Follow
      </Button>
    )}
  </div>
  )
}

export default Follow