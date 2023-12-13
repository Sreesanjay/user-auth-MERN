import {Outlet, Navigate, useLocation} from 'react-router-dom'
import {useSelector} from "react-redux"
import PropTypes from 'prop-types';

export default function Auth({allowedRole}) {
  const {role} = useSelector((state)=>state.auth)  
  const location = useLocation();
  const isUser = allowedRole===role
  const LOGIN_URL = allowedRole === 'ADMIN' ? '/login' : '/admin/login';
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
  allowedRole : PropTypes.arrayOf(PropTypes.string).isRequired 
}
