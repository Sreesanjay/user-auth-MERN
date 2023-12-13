import axios from "axios";

const API_URL = "http://localhost:5000";

const login = async (credentials) =>{
    const role = credentials.role
    const path = role === 'ADMIN' ? '/admin/login' : '/login'
    delete credentials.role;
    const response =await axios.post(API_URL+path,credentials);
    if(response.data){
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    }
    response.data.role = role
    return response.data;
}
const authService = {
    login,
}
export default authService