import React, { useRef, useState, useEffect } from "react";

import "./LoginRegisterForm.css";

import logo from "../../assets/logo.png";
import arrow from "../../assets/right-arrow.png";

function LoginRegisterForm() {

    const [isInLogIn, setIsInLogIn] = useState(true);

    return (
        <div className="login-register-container">
            <div className="login-form-header">
                <h1 className="form-title">Wibu <img src={logo} alt="" className="logo" /> Bar</h1>
            </div>
            {isInLogIn ?
                <LoginForm setIsInLogIn={setIsInLogIn} /> :
                <RegisterForm setIsInLogIn={setIsInLogIn} />
            }
        </div>
    )
}

function LoginForm({ setIsInLogIn }) {

    const [isAbleToLogin, setIsAbleToLogin] = useState(false);

    const [username_email, setUsername_Email] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setIsAbleToLogin(username_email.length !== 0 && password.length !== 0);
    }, [username_email, password]);

    function handleInputChange(e) {
        const value = e.target.value;
        if (e.target.name === 'username-email') {
            setUsername_Email(value);
        } else {
            setPassword(value);
            
        }
    }


    const username_mailRef = useRef(null);
    const passwordRef = useRef(null);

    function handleInputClick(ref) {
        ref.current.focus();
    }

    function handleLoginRequest() {
        
    }

    return (
        <div className="main-form">
            <h1
                style={{margin: "0"}}
            >Log In</h1>
            <div
                style={{width: "85%"}}
            >
                <div className="input-container" onClick={() => handleInputClick(username_mailRef)}>
                    <input type="text" placeholder="Username/Email" value={username_email} onChange={handleInputChange} name="username-email" ref={username_mailRef} />                
                </div>
                <div className="input-container" onClick={() => handleInputClick(passwordRef)}>
                    <input type="password" placeholder="Password" value={password} onChange={handleInputChange} name="password" ref={passwordRef} />
                </div>
            </div>
            <div
                style={{display: "flex", flexDirection: "column"}}
            >
                <button disabled={!isAbleToLogin} id="login-button" className={`${isAbleToLogin ? 'allowed' : 'not-allowed'}`} onClick={handleLoginRequest}>Login</button>
                <div>Don't have an account? <span id="register-now" onClick={() => setIsInLogIn(false)}>Register Now</span></div>
            </div>
        </div>
    )
    
}

function RegisterForm({ setIsInLogIn }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleInputChange(e) {
        const value = e.target.value;
        switch (e.target.name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirm-password':
                setConfirmPassword(value);
                break;
        }
    }


    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    function handleInputClick(ref) {
        ref.current.focus();
    }

    function checkToAllow() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        console.log(email);
        
        console.log(emailRegex.test(email));

        return (emailRegex.test(email) 
                && username.length !== 0 
                && password.length !== 0 
                && confirmPassword === password)
    }

    return (
        <div className="main-form">
            <h1
                style={{margin: "0"}}
            >Register</h1>
            <div
                style={{width: "85%"}}
            >
                <div className="input-container" onClick={() => handleInputClick(emailRef)}>
                    <input type="text" placeholder="Email" value={email} onChange={handleInputChange} name="email" ref={emailRef} />                
                </div>
                <div className="input-container" onClick={() => handleInputClick(usernameRef)}>
                    <input type="text" placeholder="Username" value={username} onChange={handleInputChange} name="username" ref={usernameRef} />                
                </div>
                <div className="input-container" onClick={() => handleInputClick(passwordRef)}>
                    <input type="password" placeholder="Password" value={password} onChange={handleInputChange} name="password" ref={passwordRef} />
                </div>
                <div className="input-container" onClick={() => handleInputClick(confirmPasswordRef)}>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleInputChange} name="confirm-password" ref={confirmPasswordRef} />
                </div>
            </div>
            <div
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
            >
                <button id="register-button" className={`${checkToAllow() ? 'allowed' : 'not-allowed'}`}>Register</button>
                <div className="to-login" onClick={() => setIsInLogIn(true)}>Return to Login<img src={arrow} alt="" id="arrow" /></div>
            </div>
        </div>
    )
}

export default LoginRegisterForm;