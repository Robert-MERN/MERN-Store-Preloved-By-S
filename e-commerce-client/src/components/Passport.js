import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FaGoogle } from "react-icons/fa";
import { VscGithubInverted } from "react-icons/vsc";
import styled from 'styled-components';
import { mobile } from "../responsive";

export default function Passport({width}) {
    const google = ()=>{
        window.open("http://localhost:9900/api/auth/google", "_self")
    }
    const facebook = ()=>{
        window.open("http://localhost:9900/api/auth/facebook", "_self")
    }
    const github = ()=>{
        window.open("http://localhost:9900/api/auth/github", "_self")
    }
    return (
        <>
            <FacebookPassport size={width}  onClick={facebook}>
                <div className="facebook">
                    <FacebookIcon style={{transform: "scale(1.1)", color: "white"}}  />
                </div>
                <p>Sign in with Facebook</p>
            </FacebookPassport>
            <GooglePassport size={width} onClick={google}>
                <div className="google">
                    <FaGoogle style={{color: "white", transform: "scale(1.2)"}} /> 
                </div>
                <p>Sign in with Google</p>
            </GooglePassport>
            <GithubPassport size={width} onClick={github}>
                <div className="github">
                    <VscGithubInverted style={{transform: "scale(1.1)", color: "white"}} />
                </div>
                <p>Sign in with Twitter</p>
            </GithubPassport>
        </>
    )
}

const FacebookPassport = styled.div`
    width: ${props=> props.size? "37rem": "33rem"};
    margin-bottom: 15px;
    height: 42px;
    background-color: rgb(66, 103, 178);
    border-radius: 5px;
    overflow: hidden;
    align-items: center;
    display: flex;
    cursor: pointer;
    transition: all 250ms ease;
    ${mobile({width: "20rem"})}
    p{
        color: white;
        user-select: none;
        font-size: 16px;
    }
    .facebook, .github, .google{
        width: 40px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
    }
    .facebook{
        background-color: rgb(78, 118, 197);
    }
    .google{
        background-color: #da7264;
    }
    .github{
        background-color: #333030;
    }
    .facebook:active, .github:active, .google:active{
        opacity: 0.4;
        transition: all 150ms ease-in;
    }
    .facebook:hover, .github:hover, .google:hover{
        opacity: 0.8;
        transition: all 250ms ease-in;
    }
    &:hover{
        opacity: 0.8;
    }
`
const GooglePassport = styled(FacebookPassport)`
    background-color: #d45848;
    
`
const GithubPassport = styled(FacebookPassport)`
    margin-bottom: 50px;
    background-color: #211F1F;
`