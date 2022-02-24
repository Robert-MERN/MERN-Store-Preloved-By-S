import React, { useState } from 'react'
import styled from "styled-components";
import LeftArrow from '@mui/icons-material/ArrowBackIosNew';
import RightArrow from '@mui/icons-material/ArrowForwardIos';
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import {mobile} from "../responsive";

export default function Carousel() {
    const [ slider, setSlider ] = useState(0);
    const handleClick = (direction)=> {
        if(direction === "left"){
            setSlider(slider > 0 ? slider - 1 : 2);
        } else {
            setSlider(slider < 2 ? slider + 1 : 0 ); 
        }
    }
    return (
        <>
            <ParentContainer>
                <Container direction={slider} >
                    <ChildContainer>
                            <WrapperOne>
                                <Fade bottom>
                                    <img src="images/slicker.jpg" alt="" />
                                </Fade>
                            </WrapperOne>
                        <WrapperTwo>
                            <div>
                                <Zoom cascade big>
                                    <Fade top>
                                        <h1>Winter Sale</h1>
                                    </Fade>
                                </Zoom>
                                <Fade right>
                                    <p>Don't Compromise on Style Get Flat 30% off for new Arrivals</p>
                                </Fade>
                                <Fade bottom big>
                                    <button>Show Now</button>
                                </Fade>
                            </div>
                        </WrapperTwo>
                    </ChildContainer>
                </Container>
                <Container direction={slider}>
                    <ChildContainer>
                        <WrapperOne>
                            <img src="images/slicker.jpg" alt="" />
                        </WrapperOne>
                        <WrapperTwo>
                            <div>
                                <h1>Winter Sale</h1>
                                <p>Don't Compromise on Style Get Flat 30% off for new Arrivals</p>
                                <button>Show Now</button>
                            </div>
                        </WrapperTwo>
                    </ChildContainer>
                </Container>
                <Container direction={slider} >
                    <ChildContainer>
                        <WrapperOne>
                            <img src="images/slicker.jpg" alt="" />
                        </WrapperOne>
                        <WrapperTwo>
                            <div>
                                <h1>Winter Sale</h1>
                                <p>Don't Compromise on Style Get Flat 30% off for new Arrivals</p>
                                <button>Show Now</button>
                            </div>
                        </WrapperTwo>
                    </ChildContainer>
                </Container>
            </ParentContainer>
            <Arrow position="left" onClick={()=> handleClick("left")} >
                    <Fade big>
                        <LeftArrow/>
                    </Fade>
                </Arrow>
            <Arrow position="right" onClick={()=> handleClick("right")} >
                <Fade big>
                    <RightArrow />
                </Fade>
            </Arrow>
        </>
    )
}

const ParentContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    ${mobile({display: "none"})}
`
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.direction * -100}vw);
`
const ChildContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`
const Arrow = styled.div`
    padding: 20px;
    background-color: white;
    top: 50vh;
    display: flex;
    border-radius: 50%;
    right: ${props=> props.position === "right" && "25px"};
    left: ${props=> props.position === "left" && "25px"};
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 15px;
    ${mobile({display: "none"})}
    &:hover{
        background-color: #ccdadb;
        transition: all 300ms ease;
    }
    &:active{
        opacity: 0.7;
        transition: all 150ms ease;
    }
`
const WrapperOne = styled.div`
    flex: 1;
    margin-right: 80px;
    img{
        overflow: hidden;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-repeat: no-repeat;
        user-select: none;
    }
`
const WrapperTwo = styled.div`
    flex: 1;
    overflow-x: hidden;
    padding-top: 12em;
    overflow-y: hidden;
    div{
        padding-left: 2em;
    }
    h1{
        font-size: 75px;
        font-weight: 700;
        color: #262626;
        text-transform: uppercase;
        user-select: none;
    }
    p{
        width: 40rem;
        font-size: 28px;
        overflow-wrap: break-word;
        font-weight: 400;
        color: #424242;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        user-select: none;
    }
    button{
        padding: 15px 10px;
        font-size: 20px;
        border: 1px solid #8a8a8a;
        outline: none;
        color: #4f4f4f;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 250ms;
        user-select: none;
    }
    button:hover{
        background-color: #ccdadb;
        color: black;
    }
`