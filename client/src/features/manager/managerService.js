import axios from "axios";

const API_URL = "http://localhost:5000/admin";

const getUsers = async(key)=>{
    const response = await axios.get(API_URL+`/user-management?searchKey=${key}`,{ withCredentials: true })
    return response.data;
}
// const searchUsers = async(key)=>{
//     const response = await axios.get(API_URL+`/user-management?searchKey=${key}`)
//     return response.data;
// }

const deleteUser = async(userId)=>{
    const response = await axios.delete(API_URL+`/user-management/${userId}`,{ withCredentials: true });
    return response.data;
}


const manageServices = {
    getUsers,
    deleteUser,
    // searchUsers
}

export default manageServices