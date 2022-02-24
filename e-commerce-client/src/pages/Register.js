import React, { useState } from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom";
import Passport from '../components/Passport';
import Input from "../components/Input";
import { mobile } from "../responsive";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../index.css";

export default function Login() {
    const history = useHistory();
    const [ userData, setUserData ] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDate: "",
    });
    const inputData = [
        {
            id: 1,
            type: "text",
            placeholder: "Username",
            name: "username",
            errorMessage: "Username should be 4-20 characters and shouldn't include any special character!",
            pattern: "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$",
            label: "Username*"
        },
        {
            id: 2,
            type: "text",
            placeholder: "First Name",
            name: "firstName",
            errorMessage: "Your first name is required!",
            pattern: "^(?=.*[a-zA-Z]).{3,20}$",
            label: "Fisrt Name*"
        },
        {
            id: 3,
            type: "text",
            placeholder: "Last Name",
            name: "lastName",
            errorMessage: "Your last name is required!",
            pattern: "^(?=.*[a-zA-Z]).{3,20}$",
            label: "Last Name*"
        },
        {
            id: 4,
            type: "email",
            placeholder: "Email",
            name: "email",
            errorMessage: "It should be valid email address!",
            label: "Email address*"
        },
        {
            id: 5,
            type: "date",
            placeholder: "Birthday",
            name: "birthDate",
            errorMessage: "What is your birth year!",
            label: "Your BirthDate*"
        },
        {
            id: 6,
            type: "tel",
            placeholder: "0333-1111111",
            name: "phoneNumber",
            errorMessage: "What is your phone number!",
            label: "Phone Number*"
        },
        {
            id: 7,
            type: "password",
            placeholder: "Password",
            name: "password",
            errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{8,20}$",
            label: "Password*"   
        },
        {
            id: 8,
            type: "password",
            placeholder: "Confirm Password",
            name: "confirmPassword",
            errorMessage: "passwords don't match!",
            pattern: userData.password,
            label: "Confirm Password*"
        },
    ];
    const handleSubmit =(e) =>{
        e.preventDefault();
        register();
    }
    const onChange =(e)=> {
        setUserData({...userData, [e.target.name]: e.target.value});
    }
    const register = async()=>{
        const data = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            birthDate: userData.birthDate
        }
        try {
            const res = await axios.post("https://preloved-by-s.herokuapp.com/api/auth/register", data);
            if(res){
                history.push("/login")
            } 
        } catch(err){
            console.log(err);
        }
        }
    return (
        <LoginBg className='checkBackground' >
            <LoginBox>
               <Passport width="true" />
                <form className="loginContainer" onSubmit={handleSubmit} >
                    <p className="signIn">CREATE ACCOUNT</p>
                    {
                        inputData.map((item)=>(
                            <Input key={item.id} data={item} onChange={onChange}/>
                        ))
                    }
                    <button type='submit' >REGISTER</button>
                    <p className="backToLogin">Returning Customer?<Link style={{color: "#0063bf", marginLeft: "5px"}} to="/login">Login</Link></p>
                </form>
            </LoginBox>
        </LoginBg>
    )
}
const LoginBg = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    position: relative;
    overflow: scroll;
    justify-content: center;
`
const LoginBox = styled.div`
    width: 100%;
    min-height: 100%;
    z-index: 2;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ${mobile({padding: "1rem 0", width: "99vw"})}
    .loginContainer{
        width: 34rem;
        min-height: 28rem;
        padding: 15px 30px 15px 30px;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        border-radius: 12px;
        background: #fff;
        overflow-y: hidden;
        ${mobile({width: "19rem", padding: "0px 15px"})}
        .signIn{
            font-size: 30px;
            font-weight: 400;
            color: #5c5c5c;
            user-select: none;
        }
        .username:focus{
            border: 1px solid teal;
            }
        button{
            font-size: 16px;
            padding: 14px 45px;
            background-color: teal;
            border: none;
            color: #fff;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        button:active{
            opacity: 0.9;
        }
        .formBottom{
            line-height: 6px;
            padding-top: 8px;
        }
        .backToLogin{
            font-size: 16px;
            color: #363636;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            transition: all 250ms ease;
            cursor: pointer;
        }
        .backToLogin:hover{
            color: gray;
        }
    }
    `
