import API from "..";

export const patchProfile = async (formData: FormData) => {
  try {
    const res = await API.patch("profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};


export const getProfile = async () => {
  try {
    const res = await API.get("profile", {
      headers : {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })

    return res.data
  } catch (error) {
    console.log(error)
  }
}