import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import { useEffect, useState } from "react";
import LoadSpinner from "../../assets/LoadSpinner";
export default function SignUp() {
     const initialState = { name: "", email: "", mobile: "", password: "" };
     const [formState, setFormState] = useState(initialState);
     const [formErrors, setFormErrors] = useState({});
     const [isSubmit, setIsSubmit] = useState(false);
     const [isLoading, setisLoading] = useState(false);

     const navigate = useNavigate();

     function handleSubmit(e) {
          e.preventDefault();
          setFormErrors(validate());
          setIsSubmit(true);
     }

     useEffect(() => {
      const submitForm = async()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
             setisLoading(true);
            try {
              let res = await axios.post("http://localhost:5000/register-user",formState);
              if(res.data.success) {
                navigate('/login');
              }else{
                throw new Error(res.data.message)
              }
            }
            catch(err) {
              console.log(err.message);
            }
        }
      }
      submitForm()
     }, [formErrors, formState, isSubmit, navigate]);

     function validate() {
          const { name, email, mobile, password } = formState;
          const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

          let errors = {};
          if (!name) errors.name = "name is required";
          if (!email) errors.email = "email is required";
          else if (!email.match(regex)) errors.email = "not a valid email";
          if (!mobile) errors.mobile = "mobile number is required";
          else if (
               mobile.length < 10 ||
               mobile.length > 10 ||
               isNaN(mobile) ||
               mobile === "0000000000"
          )
               errors.mobile = "not a valid mobile number";
          if (!password) errors.password = "password is required";
          else if (password.length < 4)
               errors.password = " too short (minimum 4 characters)";
          else if (password.length > 10)
               errors.password = " too long (maximum 10 characters)";
          return errors;
     }

     function handleChange(e) {
          const { name, value } = e.target;
          setFormState({ ...formState, [name]: value });
     }
     return (
          <section className="sign-up">
               {isLoading ? (
                    <LoadSpinner isLoading={isLoading} />
               ) : (
                    <div className="sign-up-container">
                         <div className="left-section">
                              <h4>Sign Up</h4>
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
                                             value={formState.name}
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
                                             value={formState.email}
                                             onChange={handleChange}
                                        />
                                        <span className="error-msg">
                                             {formErrors.email}
                                        </span>
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="">mobile Number</label>
                                        <input
                                             type="text"
                                             name="mobile"
                                             placeholder="Enter your mobile number"
                                             value={formState.mobile}
                                             onChange={handleChange}
                                        />
                                        <span className="error-msg">
                                             {formErrors.mobile}
                                        </span>
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="">Password</label>
                                        <input
                                             type="password"
                                             name="password"
                                             placeholder="Enter your password"
                                             value={formState.password}
                                             onChange={handleChange}
                                        />
                                        <span className="error-msg">
                                             {formErrors.password}
                                        </span>
                                   </div>
                                   <div className="form-group">
                                        <button
                                             type="submit"
                                             className="submit-form"
                                        >
                                             Sign Up
                                        </button>
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="" className="login-ref">
                                             <Link
                                                  to="/login"
                                                  style={{
                                                       textDecoration: "none",
                                                  }}
                                             >
                                                  Login
                                             </Link>
                                        </label>
                                   </div>
                              </form>
                         </div>
                         <div className="right-section"></div>
                    </div>
               )}
          </section>
     );
}
