import React, { useState } from 'react'
import styled from "styled-components";
import HeartIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Grocery from '@mui/icons-material/LocalGroceryStoreOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Zoom from "react-reveal/Zoom"
import {mobile} from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFavorites } from "../redux/wishlistSlice";
import { setProducts } from '../redux/cartSlice';
import { setCartPopup, setWishlistPopup } from '../redux/allPopupMessages';
import Product from '../pages/Product';

export default function SingleProduct({data}) {
    const pf = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ hoverImage, setHoverImage ] = useState(false);
    const dispatch = useDispatch();
    const handleClick = ()=>{
        dispatch(setFavorites({...data, Quantity: 1, date: Date.now()}));
        dispatch(setWishlistPopup("showW"));
        setTimeout(()=>{
            dispatch(setWishlistPopup("noneW"));
        }, 2000);
    }
    const handleCart = ()=>{
        dispatch(setProducts({...data, Quantity: 1, date: Date.now()}));
        dispatch(setCartPopup("showC"));
        setTimeout(()=>{
            dispatch(setCartPopup("noneC"));
        }, 2000);
    }
    return ( 
        <ProductWrapper onMouseOver={()=>setHoverImage(true)} onMouseLeave={()=>setHoverImage(false)}>
            <Zoom>
                <img src={!hoverImage? Product.hoverImg: Product.img} alt="" />
            </Zoom>
            <Option>
                <div className="container">
                    <div className='icons'>
                        <HeartIcon style={{transform: "scale(1.3)", userSelect: "none"}} onClick={handleClick} />
                    </div>
                    <Link to={`/product/${data._id}`} style={{color: "black"}}>
                        <div className='icons'>
                            <SearchIcon style={{transform: "scale(1.3)", userSelect: "none"}} />
                        </div>
                    </Link>
                    <div className='icons'>
                        <Grocery style={{transform: "scale(1.3)", userSelect: "none"}} onClick={handleCart} />
                    </div>
                </div>
                <div className="description">
                    <p className="title">{data.title}</p>
                    <p className="price">Rs. {data.price}</p>
                </div>
            </Option>
        </ProductWrapper>
    )
}

const ProductWrapper = styled.div`
    height: 30em;
    position: relative;
    transition: all 0.4s ease;
    ${mobile({height: "25em"})}
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
    }
    &:hover{
        transform: translateY(-15px);
    }
`
const Option = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    background-color: rgba(158, 158, 158, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 400ms ease;
    flex-direction: column;
    .container{
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        padding: 0 70px;
        min-height: 40px;
        align-items: center;
        margin: 50px 0 40px 0;
    }
    .icons{
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: white;
        transition: all 250ms ease-out;
        user-select: none;
        overflow: hidden;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }
    .icons:hover{
        transform: scale(1.1);
        background-color: rgba(204, 218, 219);
    }
    .icons:active{
        opacity: 0.7;
    }
    &:hover{
        opacity: 1;
    }
    .description{
        width: 100%;
        text-align: center;
        .title{
            font-size: 19px;
            font-weight: bold;
            color: #404040;
            transform: scale(2);
        }
        .price{
            font-size: 20px;
            color: #4a4a4a;
            transform: scale(1.2);
        }
    }
`
