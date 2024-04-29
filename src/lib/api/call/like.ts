import API from ".."



export const likeClickApi = async (threadId:number) => {
    return await API.post("like", {threadId}, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
}

export const likeByIdApi = async (threadId:number) => {
    return await API.get(`likes/${threadId}`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})

}
