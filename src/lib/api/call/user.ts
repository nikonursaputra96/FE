import API from ".."

interface ILoginBody {
    username: string
    password:string
}
interface IRegisterBody {
    username: string
    fullname: string
    email: string
    password:string
}

export const loginApi = async (body: ILoginBody) => {
    return await API.post("login", body)
}

export const registerApi = async (body:IRegisterBody) => {
    return await API.post("register", body)
}

export const getUsers = async () => {
    return await API.get("users" , {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
}
export const getAllUser = async () => {
    return await API.get("user" , {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
}