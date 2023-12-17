import { useEffect, useState } from "react";
import LoadSpinner from "../../assets/LoadSpinner";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
import { useParams ,useNavigate} from "react-router-dom";

import axios from "axios";

export default function EditUser() {
     const [user, setUser] = useState({});
     const [isLoading,setisLoading] = useState(false)
     const [isSubmit, setisSubmit] = useState(false)
     const [formErrors, setFormErrors] = useState({});
     const navigate = useNavigate()
     const { id } = useParams();

     useEffect(() => {
         const fetchUser= async()=> {
          try{
            setisLoading(true)
            const response = await axios.get(`http://localhost:5000/admin/user-management/${id}`,{ withCredentials: true })
            setisLoading(false)
            delete response.data.user._id
            setUser(response.data.user)
          }catch(error){
            setisLoading(false)
            toast.error(error.message)
          }
        }
        fetchUser()
     }, [id]);

     useEffect(()=>{
      const submitForm = async()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          setisLoading(true);
          try{
            const res = await axios.put(
              `http://localhost:5000/admin/user-management/${id}`,
              user,{ withCredentials: true }
            );
            console.log(res)
            if(res.data.success){
            setisLoading(false);
            toast.success("user updated successfully")
            navigate('/admin/dashboard')
            }
          }catch(error){
            setisLoading(false);
            console.log(error)
          }

        }
      }
      submitForm()
     },[isSubmit,formErrors,id,navigate,user]);

     function handleSubmit(e) {
          e.preventDefault();
          setFormErrors(validate())
          setisSubmit(true)
     }

     function validate() {
      const { name, mobile} = user;

      let errors = {};
      if (!name) errors.name = "name is required";
      if (!mobile) errors.mobile = "mobile number is required";
      else if (
           mobile.length < 10 ||
           mobile.length > 10 ||
           isNaN(mobile) ||
           mobile === "0000000000"
      )
           errors.mobile = "not a valid mobile number";
      return errors;
     }

     function handleChange(e) {
          const { name, value } = e.target;
          setUser({ ...user, [name]: value });
     }
     return (
          <section className="sign-up">
               {isLoading ? (
                    <LoadSpinner isLoading={isLoading} />
               ) : (
                    <div className="sign-up-container">
                         <div className="left-section">
                              <h4>Edit User</h4>
                              <div className="form-group">
                              </div>
                              <form
                                   className="sign-up-form"
                                   onSubmit={handleSubmit}
                              >
                                   <div className="form-group">
                                        <label htmlFor="">Name</label>
                                        <input
                                             type="text"
                                             name="name"
                                             placeholder="Enter your name"
                                             value={user?.name}
                                             onChange={handleChange}
                                        />
                                        <span className="error-msg">
                                             {formErrors.name}
                                        </span>
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="">Email</label>
                                        <input
                                             type="text"
                                             name="email"
                                             placeholder="Enter your Email"
                                             value={user?.email}
                                             readOnly
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="">mobile Number</label>
                                        <input
                                             type="text"
                                             name="mobile"
                                             placeholder="Enter your mobile number"
                                             value={user?.mobile}
                                             onChange={handleChange}
                                        />
                                        <span className="error-msg">
                                             {formErrors.mobile}
                                        </span>
                                   </div>

                                   <div className="form-group">
                                        <button
                                             type="submit"
                                             className="submit-form"
                                        >
                                             Update
                                        </button>
                                   </div>
                              </form>
                         </div>
                         <div className="right-section"></div>
                    </div>
               )}
          </section>
     );
}
