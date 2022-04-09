import React from 'react'
import './login.css';

export default function Login() {
    return (
        <div className="loginBody">
            <div className="loginContainer">
                <div className="loginLeft">
                    <h1 className="s-title">Munnasocial</h1>
                    <p className="s-desc">Connect with friends and the world
                        around you on Munnasocial
                    </p>
                </div>
                <div className="loginRight">
                    <div className="loginRightContainer">
                        <div className="email-sec">
                            <input type="text" placeholder="Email" className="email" />
                        </div>
                        <div className="password-sec">
                            <input type="text" placeholder="Password" className="password" />
                        </div>
                        <button className="login-btn">Log In</button>
                        <p className="f-p">Forgot Password?</p>
                        <button className="create-new">Create a New Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
