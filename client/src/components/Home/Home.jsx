import "./Home.css"
import { useDispatch } from "react-redux"
import {logout} from "../../features/auth/userAuthSlice"
export default function Home() {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Home</h1>
      <button onClick={()=>dispatch(logout())}>
        logout
      </button>
    </div>
  )
}
