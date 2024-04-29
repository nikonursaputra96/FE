import API from ".."



export const follow = async (followingId:number) => {
    return await API.post("follow", {followingId}, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
}

export const follower = async (followerId:number) => {
    return await API.get(`likes/${followerId}`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})

}