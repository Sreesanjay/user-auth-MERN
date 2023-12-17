import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadSpinner from "../../assets/LoadSpinner";
import { getUsers ,deleteUser,reset} from "../../features/manager/userManagementSlice";

import "./UserList.css"
export default function UserList() {
  const dispatch = useDispatch()
  const {userList,isLoading,error,isDelete} = useSelector((state)=>state.manager)
  const {key} = useSelector(state=>state.search)
  useEffect(()=>{
    console.log(key)
        dispatch(getUsers(key))
  },[dispatch,key])

  useEffect(()=>{
    if(error){
        toast.error(error)
    }
    if(isDelete){
        toast.success("User deleted successfully")
    }
    dispatch(reset())
  },[error,isDelete,dispatch])

  const users = userList?.map((user)=>(
    
  <tr key={user._id}>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.mobile}</td>
    <td className="btn-container">
        <Link to={`/admin/edit-user/${user._id}`}>
            <button className="edit-button">Edit</button>
        </Link>
        <button className="delete-button" onClick={()=>dispatch(deleteUser(user._id))}>Delete</button>
    </td>
</tr>
  ))
  return (
    <div className="user-list">
      { 
      isLoading ? 
      (
        <div className="loadspinner">
        <LoadSpinner isLoading={isLoading} />
        </div>
      )
      :(
      <div>
        <div className="new-user">
            <Link to='/admin/new-user'><button>New User</button></Link>
        </div>
      <table className="user-list-table">
        <thead>
            <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Mobile</th>
            <th>Edit/Delete</th>
            </tr>
        </thead>
        <tbody>
        {users}
        </tbody>
      </table>
      </div>
      )
     }
    </div>
  )
}
