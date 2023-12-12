import { Link } from "react-router-dom"
import "./Login.css"

export default function Login() {
    return (
        <section className="login">
            <div className="login-container">
                <div className="left-section">
                    <h4>Login</h4>
                    <div className="form-group">
                        <label htmlFor="">Emai</label>
                        <input type="text" placeholder="Enter your email address"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder="Enter your password"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-form">Login</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor=""><Link to='/signup' style={{textDecoration: 'none'}}>Signup</Link></label>
                    </div>
                </div>
                <div className="right-section">
                </div>
            </div>
        </section>
    )
}
