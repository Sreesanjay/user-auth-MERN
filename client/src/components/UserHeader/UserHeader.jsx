import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/userAuthSlice";

import "./UserHeader.css";
export default function UserHeader() {
     const { user } = useSelector((state) => state.auth);
     const dispatch = useDispatch();
     return (
          <div className="header">
               <div className="logo">
                    <h1>Auth App</h1>
               </div>
               <nav>
                    <ul>
                         <li>
                              <Link to="/profile-management">
                              <>
                                   {
                                             user?.profile?.filename ?
                                             <img src={`http://localhost:5000/profiles/${user.profile.filename}`} className="profile-img" />
                                             :
                                             <img
                                                  src="https://www.shareicon.net/download/2016/05/24/770139_man_512x512.png"
                                                  className="profile-img"
                                                  alt=""
                                             />
                                            }
                                    </>
                              </Link>
                         </li>
                         <li>
                              {user && (
                                   <button
                                        className="logout-btn"
                                        onClick={() => dispatch(logout())}
                                   >
                                        Logout
                                   </button>
                              )}
                         </li>
                    </ul>
               </nav>
          </div>
     );
}
