import React from 'react';
import '../login/login.css';

export default function Register() {
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
                    <div className="loginRightContainer-1">
                        <div className="email-sec">
                            <input type="text" placeholder="Username" className="email" />
                        </div>
                        <div className="email-sec">
                            <input type="text" placeholder="Email" className="email" />
                        </div>
                        <div className="password-sec">
                            <input type="text" placeholder="Password" className="password" />
                        </div>
                        <div className="password-sec">
                            <input type="text" placeholder="Password Again" className="password" />
                        </div>
                        <button className="login-btn">Sign Up</button>
                        <button className="create-new">Log In to Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
