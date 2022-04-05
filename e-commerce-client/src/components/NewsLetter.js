import React from 'react'
import styled from "styled-components";
import SendIcon from '@mui/icons-material/Send';
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import { mobile } from "../responsive";

export default function NewsLetter() {
    return (
        <Container>
                <Fade big>
                    <Fade top>
                        <Zoom>
                            <h1>Newsletter</h1>
                        </Zoom>
                    </Fade>
                </Fade>
                <Fade right>
                    <p>Get timely updates from your favourite products</p>
                </Fade>
                <Zoom big>
                    <Email>
                        <input type="email" placeholder='Your emails' />
                        <div className="inputRiht">
                            <SendIcon className='sendIcon' style={{color: "white"}} />
                        </div>
                    </Email>
                </Zoom>
        </Container>
    )
}

const Container = styled.div`
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 18em;
    ${mobile({width: "17rem", marginBottom: "2em", overflowX: "hidden"})}
    h1{
        font-size: 75px;
        margin-bottom: 5px;
        color: #000000;
        ${mobile({fontSize: "50px"})}
    }
    p{
        font-size: 25px;
        font-weight: 400;
        color: #636363;
        ${mobile({fontSize: "20px", textAlign: "center"})}
    }
    ` 
const Email = styled.div`
    display: flex;
    width: 38em;
    height: 45px;
    padding-left: 12px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 50px;
    margin: 10px 0 15px 0;
    overflow: hidden;
    ${mobile({width: "19em", height: "42px"})}
    input{
        width: 100%;
        border: none;
        outline: none;
        font-size: 17px;
        font-weight: 400;
        color: #363636;
        user-select: none;
        caret-color: teal;
        overflow-wrap: break-word;
    }
    div{
        width: 6em;
        border-left: 1px solid #a8a8a8;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: teal;
        transition: all 250ms ease-out;
        cursor: pointer;
    }
    div:hover{
        background-color: #3cb599;
    }
` 