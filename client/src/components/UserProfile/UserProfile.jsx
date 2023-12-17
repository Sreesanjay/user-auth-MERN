import { useSelector,useDispatch } from "react-redux";
import "./UserProfile.css";
import { useEffect, useState } from "react";
import {updateProfile} from "../../features/auth/userAuthSlice"

export default function UserProfile() {
     const { user } = useSelector((state) => state.auth);
     const [isChange, setIsChange] = useState(false)
     const [file, setFile] = useState() 
     const dispatch = useDispatch()

     useEffect(()=>{
        setIsChange(false)
     },[user.profile.filename])
     useEffect(()=>{
        const sendFile = async()=>{
            try{
                dispatch(updateProfile({file:file,id:user._id}))
            }
            catch(error){
                console.log(error);
            }
            
        }
        if(file){
            sendFile()
        }
     },[file,dispatch,user._id])
     return (
          <section className="user-profile">
               <div className="profile-container">
                    <div className="profile-img-container">
                         {user.profile?.filename ? (
                              <img
                                   src={`http://localhost:5000/profiles/${user.profile.filename}`}
                                   alt="got"
                                   className="profile"
                              />
                         ) : (
                              <>
                                   <div>
                                        <img
                                             src="https://www.shareicon.net/download/2016/05/24/770139_man_512x512.png"
                                             alt="not"
                                             className="profile"
                                        />
                                   </div>
                              </>
                         )}
                    </div>

                    <button className="addProfile" onClick={()=>setIsChange(!isChange)}>
                         {user.profile?.filename ? "Change" : "Add"}
                    </button>
                    {isChange && 
                    <input type = "file" className="input-file" onChange={(e)=>setFile(e.target.files[0])}/>
                    }
                    <h1 className="profile-info">{user.name}</h1>
                    <h4 className="profile-info">{user.email}</h4>
                    <h4 className="profile-info">{user.mobile}</h4>
               </div>
          </section>
     );
}
