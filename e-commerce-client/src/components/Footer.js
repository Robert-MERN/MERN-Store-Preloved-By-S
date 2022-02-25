import React from 'react'
import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <Container>
            <Left>
                <Fade left>
                    <h1>PRELOVED-by-S</h1>
                </Fade>
                <Fade top>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus error magnam minima sint rerum quia ut ipsum quaerat fugit commodi, iste doloremque eveniet provident nulla assumenda, aut illo enim recusandae!
                    </p>
                </Fade>
                <div className="logo">
                    <Fade top>
                        <div className="facebook">
                            <FacebookIcon style={{transform: "scale(1.1)", color: "white"}}  />
                        </div>
                    </Fade>
                    <Fade bottom>
                        <div className="instagram">
                            <InstagramIcon style={{transform: "scale(1.1)", color: "white"}} />
                        </div>
                    </Fade>
                    <Fade top>
                        <div className="twitter">
                            <TwitterIcon style={{transform: "scale(1.1)", color: "white"}} />
                        </div>
                    </Fade>
                    <Fade bottom>
                        <div className="pinterest">
                            <PinterestIcon style={{transform: "scale(1.1)", color: "white"}} />
                        </div>
                    </Fade>
                </div>
            </Left>
            <Center>
                    <Fade top cascade>
                        <p className='heading' >Useful Links</p>
                    </Fade>
                <div className="wrapper">
                    <div className="first">
                            <Fade left>
                                <Link to="/">Home</Link>
                            </Fade>
                            <Fade left>
                                <Link to="/shopping/man">Man Fashion</Link>         
                            </Fade>
                            <Fade left>
                                <Link to="/">Accessories</Link>
                            </Fade>
                            <Fade left>
                                <Link to="/">Order Tracking</Link>
                            </Fade>
                            <Fade left>
                                <Link to="/wishlist">Wishist</Link>
                            </Fade>
                    </div>
                    <div className="second">
                        <Fade right>
                            <Link to="/cart">Cart</Link>
                        </Fade>
                        <Fade right>
                            <Link to="/shopping/women">Woman Fashion</Link>                       
                        </Fade>
                        <Fade right>
                            <Link to="/admin">My Account</Link>                           
                        </Fade>
                        <Fade right>
                            <Link to="/wishlist">Wishlist</Link>                           
                        </Fade>
                        <Fade right>
                            <Link to="/">Terms</Link>                            
                        </Fade>
                    </div>
                </div>
            </Center>
            <Right>
                <Fade bottom cascade>
                    <p className='heading' >Contact</p>
                </Fade>
                <div className="icons">
                    <Fade top>
                        <LocationOnIcon style={{marginRight:"10px", transform: "scale(1.2)"}}/>
                    </Fade>
                    <Fade right>
                        <p>North Nazimabad Town, Karachi, Karachi City, Sindh</p>
                    </Fade>
                </div>
                <div className="icons">
                    <Fade left>
                        <PhoneIcon style={{marginRight:"10px", transform: "scale(1.2)"}}/>
                    </Fade>
                    <Fade right>
                        <p>+92 3102223511</p>
                    </Fade>
                </div>
                <div className="icons">
                    <Fade bottom>
                        <MailIcon style={{marginRight:"10px", transform: "scale(1.2)"}}/>
                    </Fade>
                    <Fade right>
                        <p>contact@heavenxabaya.com</p>
                    </Fade>
                </div>
                <div className="icons">
                    <Zoom>
                        <img className='visa' src="images/visaLogo.png" alt="" />
                    </Zoom>
                    <Zoom>
                        <img className='paypal' src="images/paypalLogo.png" alt="" />
                    </Zoom>
                    <Zoom>
                        <img className='master' src="images/masterCardLogo.png" alt="" />
                    </Zoom>
                    <Zoom>
                        <img className='discover' src="images/discoverCardLogo.png" alt="" />
                    </Zoom>
                </div>
            </Right>
        </Container>
    )
}
const Container  = styled.div`
    padding: 0 40px;
    display: flex;
    ${mobile({flexDirection: "column", overflowX: "hidden"})}
    `
const Left  = styled.div`
    flex: 1;
    .logo{
        display: flex;
    }
    h1{
        font-size: 32px;
    }
    p{
        font-size: 18px;
        width: 80%;
        overflow-wrap: break-word;
        ${mobile({fontSize: "16px", lineHeight: "22px", TextAlign: "center", width: "100%"})}
    }
    .facebook, .instagram, .twitter, .pinterest{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px; 
    }
    .facebook{
        background-color: rgb(66, 103, 178);
    }
    .instagram{
        background:linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
    }
    .twitter{
        background-color: rgb(29, 161, 242);
    }
    .pinterest{
        background-color: #e75480;
    }
    .facebook:active, .instagram:active, .twitter:active, .pinterest:active{
        opacity: 0.4;
        transition: all 150ms ease-in;
    }
    .facebook:hover, .instagram:hover, .twitter:hover, .pinterest:hover{
        opacity: 0.8;
        transition: all 250ms ease-in;
    }

`
const Center  = styled.div`
    flex: 1;
    ${mobile({display: "none"})}
    .heading{
            font-size: 21px;
            font-weight: 700;
            margin-bottom: 30px;
    }
    .wrapper{
        display: flex;
    }
    .first,.second{
        flex: 1;
        display: flex;
        flex-direction: column;
        a{
            font-size: 18px;
            text-decoration: none;
            color: black;
            cursor: pointer;
            margin-bottom: 10px;
            transition: all 100ms ease-out;
            width: 8em;
            overflow-wrap: break-word;
        }
        a:hover{
            color: gray;
        }
    }
`
const Right  = styled.div`
    flex: 1;
    ${mobile({background: "#fff8f8"})}
    .heading{
            font-size: 21px;
            font-weight: 700;
    }
    .icons{
        display: flex;
        align-items: center;
        p{
            font-size: 18px;
            line-height: 15px;
            ${mobile({fontSize: "13px"})}
        }
    }
    .visa{
        height: 48px;
        margin-right: 12px;
    }
    .master{
        height: 32px;
        margin-right: 12px;
    }
    .discover{
        height: 55px;
        margin-right: 12px;
    }
    .paypal{
        height: 30px;
        margin-right: 12px;
    }
`
