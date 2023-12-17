import { useSelector , useDispatch} from "react-redux"
import { logout } from "../../features/auth/userAuthSlice";
import {search } from "../../features/manager/serchSlice";
import "./Header.css"
import { useState } from "react";
export default function Header() {
  const [key,setKey] = useState('')  
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <div className="header">
      <div className="logo">
        <h1>Admin Panel</h1>
      </div>
      <nav>
        <ul>
            <li>
                <div className="search-form">
                     <input type="search" placeholder="search users" className="search-input" onChange={(e)=>setKey(e.target.value)}/>
                     <button className="serach-btn" onClick={()=>dispatch(search(key))} ><img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png" alt="img" /></button>
                </div>
            </li>
            <li>
                {
                user && 
                <button className='logout-btn' onClick={()=>dispatch(logout())}>Logout</button>
                }
            </li>
        </ul>
      </nav>
    </div>
  )
}
