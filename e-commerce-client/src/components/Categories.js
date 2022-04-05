import React from 'react'
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import {mobile} from "../responsive"
import { Link } from "react-router-dom";

export default function Categories() {
    return (
        <Container>
            <Left>
                <Zoom>
                    <img src="images/category1.jpg" alt="" />
                </Zoom>
                <Fade left cascade big>
                    <p>shirt style</p>
                </Fade>
                    <Link to="/shopping/suit" style={{color: "black", textDecoration: "none", zIndex: "5"}} >
                <Fade bottom>
                        <button>shop now</button>
                </Fade>
                    </Link>
            </Left>
            <Center>
                <Fade bottom>
                    <img src="images/category2.jpg" alt="" />
                </Fade>
                <Zoom cascade big>
                    <p>loungewear Love</p>
                </Zoom>
                <Link to="/shopping/man" style={{color: "black", textDecoration: "none", zIndex: "5"}} >
                    <Zoom big>
                        <button>shop now</button>
                    </Zoom>
                </Link>
            </Center>
            <Right>
                <Fade right>
                    <img src="images/category4.jpeg" alt="" />
                </Fade>
                <Fade right cascade big>
                <p>light jacket</p>
                </Fade>
                <Link to="/shopping/women" style={{color: "black", textDecoration: "none", zIndex: "5"}} >
                    <Fade bottom>
                        <button>shop now</button>
                    </Fade>
                </Link>
            </Right>
        </Container>
    )
}

const Container = styled.div`
    margin: 14em 0 8em 0;
    height: 80vh;
    display: flex;
    padding: 0 40px;
    overflow: hidden;
    ${mobile({margin: "3em 0 8em 0", flexDirection: "column", padding: "0", overflowX: "hidden", height: "95vh"})}
`
const Left = styled.div`
    flex: 1;
    margin: 0 5px;
    position: relative;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        ${mobile({height: "30vh", marginBottom:"5px"})}
    }
    p{
        position: absolute;
        top: 45%;
        letter-spacing: 2px;
        color: white;
        text-transform: uppercase;
        font-size: 40px;
        font-weight: 600;
        width: 100%;
        display: flex;
        justify-content: center;
        user-select: none;
        ${mobile({top: "20%", fontSize: "30px"})}
    }
    button{
        position: absolute;
        top: 65%;
        left: 40%;
        padding: 15px 10px;
        font-size: 20px;
        border: 1px solid #8a8a8a;
        outline: none;
        color: #4f4f4f;
        text-transform: uppercase;
        background-color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        transition: all 250ms ease-out;
        user-select: none;
        ${mobile({top : "58%", left: "30%", padding: "12px 10px"})}
    }
    button:hover{
        background-color: rgb(204, 218, 219);
        color: black;
    }
`
const Center = styled(Left)`
`
const Right = styled(Left)`
`