import React from 'react'
import styled from 'styled-components'
import LogoutIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { positions } from '@mui/system';

export default function SignoutOption({userPermission, parentOption, loginShowOption}) {
    return (
        <UserOptionContainer loginShowOption={loginShowOption} >
            <OptionWrapper>
                <Link to="/" className='link' >
                    <div>
                        <p>Home</p>
                        <HomeIcon/>
                    </div>
                </Link>
                <Link className='link'  to="/admin">
                    <div>
                        <p>Admin</p>
                        <PersonIcon/>
                    </div>
                </Link>
                <Link className='link'  to="/cart">
                    <div>
                        <p>Your Bag</p>
                        <ShoppingBag/>
                    </div>
                </Link>
                <Link className='link' to="/wishlist" >
                    <div>
                        <p>Your Wishlist</p>
                        <FavoriteIcon/>
                    </div>
                </Link>
                <div onClick={()=> {userPermission(); parentOption()}} >
                    <p>Log out</p>
                    <LogoutIcon/>
                </div>
            </OptionWrapper>
        </UserOptionContainer>
    )
}

const UserOptionContainer = styled.div`
    position: absolute;
    width: 17rem;
    min-height: 15rem;
    top: 55px;
    right: 44px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 2;  
    border-top: 1px solid #c2c2c2;
    display: ${props=> props.loginShowOption? "block": "none"};
    ${mobile({
        width: "100vw",
        top: "90px",
        right: "0",
        borderRadius: "0",
        height: "100vh",
        position: "fixed",
        transition: "all 250ms ease-in",
        overflow: "hidden",
        
    })}
    @keyframes slide {
        from{
            left: "-100vw";
        } to{
            left: "0";
        }
    }
`
const OptionWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px 25px 10px 10px;
    border-radius: 10px;
    position: relative;
    ${mobile({borderRadius: "0"})}
    &:after{
        content: '';
        position: absolute;
        width: 14px;
        height: 14px;
        background: white;
        top: -8px;
        transform: rotate(45deg);
        right: 16px;
        border-top: 1px solid #c2c2c2;
        border-left: 1px solid #c2c2c2;
        ${mobile({display: "none"})}
    }
    .link{
        color: inherit;
        text-decoration: none;
    }
    div{
        display: flex;
        border: 1px solid #000;
        align-items: center;
        justify-content: space-between;
        height: 35px;
        padding: 0 5px;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 250ms ease;
        position: relative;
        margin-bottom: 12px;
        -webkit-tap-highlight-color: transparent;
        background-color: white;
        &::after{
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            background-color: #a6a6a6;
            bottom: -5px;
            transform: scaleX(0);
            transition: all 250ms ease;
        }
    }
    div:hover{
        &:after{
            transform: scaleX(1);
        }
    }
    div:hover{
        color: #787878;
        p{
            color: #787878;
        }
    }
    div:active{
        opacity: 0.3;
        -webkit-tap-highlight-color: black;
    }
    p{
        margin-left: 0;
        font-size: 18px;
        color: #333333;
        font-weight: 500;
        animation: secondAnime 0.2s ease-in-out;
        ${mobile({
            fontSize: "19px",
    })} 
    }
    @keyframes secondAnime {
        from {
            opacity: (0);
        } to{
            opacity: (1);

        }
    }
`
