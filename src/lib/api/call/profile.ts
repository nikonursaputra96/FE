import API from ".."

export const getProfile = async (token :string) => {
    return await API.get("profile", {
        headers: {Authorization: `Bearer ${token}`}
    })
}

export const getProfiles = async () => {
    return await API.get("profile" , {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
}