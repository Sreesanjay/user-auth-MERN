import {Outlet, Navigate, useLocation} from 'react-router-dom'
import {useSelector} from "react-redux"
import PropTypes from 'prop-types';

export default function Auth({allowedRole}) {
  const {role} = useSelector((state)=>state.auth)  
  const location = useLocation();
  const isUser = allowedRole===role
  console.log("allow role",allowedRole)
  const LOGIN_URL = allowedRole === 'ADMIN' ? '/admin/login' : '/login';
  
  console.log(LOGIN_URL)
  return (
    <>
    {
        isUser ? 
        <Outlet/>
        : <Navigate to={LOGIN_URL} state={{ from: location }} replace />
    }
    </>
  )
}
Auth.propTypes = {
  allowedRole : PropTypes.string.isRequired 
}
