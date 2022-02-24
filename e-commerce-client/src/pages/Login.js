import React, { useState } from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom";
import Passport from '../components/Passport';
import Input from "../components/Input";
import { mobile } from "../responsive";
import axios from "axios";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { userReceived, userLoading, selectIsLoading, userError } from "../redux/userSlice";
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; 

export default function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [ wrongCredentialsError, setWrongCredentialsError ] = useState(false);
    const [ userData, setUserData ] = useState({
        username: "",
        password: "",
    });
    const inputData = [
        {
            id: 1,
            type: "text",
            placeholder: "username",
            name: "username",
            errorMessage: "Please type your correct username!",
            label: "Username*",
            pattern: "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$",
        },
        {
            id: 2,
            type: "password",
            placeholder: "password",
            name: "password",
            errorMessage: "Please type your correct password!",
            // pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{8,20}$",
            label: "Password*"   
        },
    ];
    const handleSubmit =(e) =>{
        e.preventDefault();
        login();
    }
    const onChange =(e)=> {
        setUserData({...userData, [e.target.name]: e.target.value});
    } 
    const login = async()=>{
        const data = {
            username: userData.username,
            password: userData.password
        }
        try {
            setWrongCredentialsError(false);
            dispatch(userLoading());
            const res = await axios.post("https://preloved-by-s.herokuapp.com/api/auth/login", data);
            if(res){
                dispatch(userReceived(res.data));
                history.push("/")
            } 
        } catch(err){
            dispatch(userError());
            setWrongCredentialsError(true);
        }
    }
    const loading = useSelector(selectIsLoading);
    console.log(loading)
    return (
        <LoginBg className='loginBackground'>
            <LoginBox>
               <Passport/>
                <form className="loginContainer" onSubmit={handleSubmit} >
                    <p className="signIn">SIGN IN</p>
                    {
                        inputData.map((item)=>(
                            <Input key={item.id} data={item} onChange={onChange}/>
                            ))
                        }
                    { wrongCredentialsError &&
                        <p className='wrongCredentials'>Your email or password is incorrect!</p>
                    }
                    <button type='submit' >{loading === "idle"? "Login" : <CircularProgress sx={{color: "white"}} size="25px" />}</button>
                    <div className="formBottom">
                        <p className='forgotPassword'>Don't you remember the Password?</p>
                        <p className='newCustomer' >New Cutomer? <Link style={{color: "#0063bf", marginLeft: "5px"}} to="/register">Sign up</Link></p>
                    </div>
                </form>
            </LoginBox>
        </LoginBg>
    )
}
const LoginBg = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`
const LoginBox = styled.div`
    width: 100%;
    min-height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding-top: 6rem;
    ${mobile({paddingTop: "1rem", width: "99vw"})}
    .loginContainer{
        width: 30rem;
        min-height: 28rem;
        padding: 15px 30px;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        border-radius: 12px;
        background: #fff;
        ${mobile({width: "18em", padding: "0px 15px"})}
        .signIn{
            font-size: 30px;
            font-weight: 400;
            color: #5c5c5c;
            user-select: none;
        }
        .username:focus{
            border: 1px solid teal;
        }
        .wrongCredentials{
            font-size: 16px;
            color: red;
            animation: errorPopup 0.6s ease-in-out;
        }
        button{
            font-size: 16px;
            padding: 14px 55px;
            background-color: teal;
            border: none;
            color: #fff;
            cursor: pointer;
            text-transform: uppercase;
            transition: all 250ms ease;
        }
        button:active{
            opacity: 0.9;
        }
        .formBottom{
            line-height: 6px;
            padding-top: 8px;
        }
        .forgotPassword, .newCustomer{
            font-size: 16px;
            color: #363636;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            transition: all 250ms ease;
        }
        .forgotPassword{
            cursor: pointer;
        }
        .forgotPassword:hover{
            color: gray;
        }
        @keyframes errorPopup {
            10%{
                transform: translateX(-12px);
            }
            20%{
                transform: translateX(12px);
            }
            40%{
                transform: translateX(-8px)
            } 
            60%{
                transform: translateX(8px)
            }
            80%{
                transform: translateX(-6px)
            }
        }
    }
    `