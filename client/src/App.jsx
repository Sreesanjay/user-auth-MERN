import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import Auth from './pages/Auth';
import Dashboard from './pages/Admin/Dashboard';

import "./App.css"
import AdminLogin from './pages/Admin/AdminLogin';
import EditUserPage from './pages/Admin/EditUserPage';
import NewUserPage from './pages/Admin/NewUserPage';
import ProfilePage from './pages/User/ProfilePage';
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path = '/admin/login' element = {<AdminLogin/>}></Route>
          <Route path="/signup" element={<SignUpPage/>}></Route>
          <Route path='/profile-management' element={<Auth allowedRole={"PUBLIC"}/>}>
            <Route path="/profile-management" element = {<ProfilePage/>}/>
          </Route>
          <Route path='/admin' element={<Auth allowedRole={"ADMIN"}/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>}/>
            <Route path='/admin/edit-user/:id' element={<EditUserPage/>}/>
            <Route path='/admin/new-user' element={<NewUserPage/>}/>
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  )
}
