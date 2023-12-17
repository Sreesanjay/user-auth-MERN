import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { reset ,login} from "../../features/auth/userAuthSlice";
import LoadSpinner from "../../assets/LoadSpinner";

import "./Login.css";

export default function Login(props) {
     const [credentials, setCredentials] = useState({
          email: "",
          password: "",
          role : ""
     });
     const [formErrors, setFormErrors] = useState({});
     const [isSubmit, setisSubmit] = useState(false);
     const {
          user,
          role,
          isLoading,
          isError,
          isSuccess,
          error,
     } = useSelector((state) => state.auth);
     const dispatch = useDispatch();
     const navigate = useNavigate();

     function handleSubmit(e) {
          e.preventDefault();
          setFormErrors(validate());
          setisSubmit(true);
     }

     function handleChange(e) {
          const { name, value } = e.target;
          setCredentials({ ...credentials, [name]: value });
     }

     useEffect(() => {
          const submitForm = async () => {
               if (Object.keys(formErrors).length === 0 && isSubmit === true) {
                    dispatch(login({...credentials, role:props.role}));
               }
          };
          submitForm();
     }, [formErrors, isSubmit, dispatch, credentials,props.role]);

     useEffect(() => {
          if (isError) {
               if (error?.status === 500) {
                    toast.error(error?.message);
               } else {
                    setFormErrors({ serverError: error?.message });
               }
          }
          if (isSuccess || role === props.role) {
            if(role === 'ADMIN') {
                navigate("/admin/dashboard");
            }else if(role === 'PUBLIC') {
                navigate('/')
            } 
          }
          dispatch(reset());
     }, [user, isError, role,isSuccess,error?.status, error?.message,dispatch, navigate,props?.role]);

     function validate() {
          const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          const { email, password } = credentials;
          let errors = {};
          if (!email) errors.email = "Email is required";
          else if (!email.match(regex))
               errors.email = "Enter a valid email address";
          if (!password) errors.password = "Password is required";
          return errors;
     }

     return (
          <section className="login">
             {isLoading ? (
                    <LoadSpinner isLoading={isLoading} />
               ) : (
               <div className="login-container">
                    <div className="left-section">
                         <h4>Login</h4>
                         {formErrors.serverError && (
                              <span className="error-msg global-error">
                                   {formErrors.serverError}
                              </span>
                         )}
                         <form onSubmit={handleSubmit}>
                              <div className="form-group">
                                   <label htmlFor="">Emai</label>
                                   <input
                                        type="text"
                                        placeholder="Enter your email address"
                                        name="email"
                                        onChange={handleChange}
                                        value={credentials.email}
                                   />
                              </div>
                              <div className="form-group">
                                   <label htmlFor="">Password</label>
                                   <input
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        onChange={handleChange}
                                        value={credentials.password}
                                   />
                              </div>
                              <div className="form-group">
                                   <button
                                        type="submit"
                                        className="submit-form"
                                   >
                                        Login
                                   </button>
                              </div>
                              <div className="form-group">
                                   <label htmlFor="">
                                        <Link
                                             to="/signup"
                                             style={{ textDecoration: "none" }}
                                        >
                                             Signup
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

Login.propTypes = {
     role: PropTypes.string.isRequired,
};
