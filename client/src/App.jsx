import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import Auth from './pages/Auth';
import Dashboard from './pages/Admin/Dashboard';

import "./App.css"
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignUpPage/>}></Route>
          <Route path='/admin' element={<Auth allowedRoles={"ADMIN"}/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>}/>
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  )
}
