import axios from "axios";
const API_URL = "http://localhost:5000";
const login = async (credentials) =>{
    const role = credentials.role
    const path = role === 'ADMIN' ? '/admin/login' : '/login'
    delete credentials.role;
    const response =await axios.post(API_URL+path,credentials);
    if(response.data){
        console.log(response.data)
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        localStorage.setItem('role', JSON.stringify(role));
    }
    response.data.role = role
    return response.data;
}

const updateProfile = async (form) =>{
    const formData = new FormData();
    formData.append('profile',form.file)
    const res = await axios.post(`http://localhost:5000/update-profile/${form.id}`,formData,{ withCredentials: true },{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        
    });
    console.log(res)
    return res.data;
}
const authService = {
    login,updateProfile
}
export default authService