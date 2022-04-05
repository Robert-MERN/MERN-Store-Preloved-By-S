import React, { useState } from 'react'
import { mobile } from "../responsive";
import styled from"styled-components";
import { useDispatch } from 'react-redux';
import { addTotal, substractTotal, setProducts } from '../redux/cartSlice';
import Favourite from '@mui/icons-material/FavoriteBorder';
import { unSetFavorites } from '../redux/wishlistSlice';
import { setReverse } from '../redux/cartSlice';
import { setCartPopup } from "../redux/allPopupMessages";

export default function ProductBag({ data, wishlist }) {
    const [ quantityCopy, setQuantityCopy ] = useState(data.Quantity);
    const dispatch = useDispatch();
    const add = ()=> {
        let productQuantity = data.Quantity;  
        const addedQuantity = productQuantity += 1;
        setQuantityCopy(quantityCopy + 1);
        dispatch(addTotal({...data, Quantity: addedQuantity, QuantityCopy: quantityCopy}));
        dispatch(setProducts({...data, Quantity: addedQuantity, operate: "", QuantityCopy: quantityCopy}));
    }
    const substract = ()=> {
        let productQuantity = data.Quantity;  
        setQuantityCopy(quantityCopy > 1? quantityCopy - 1 : quantityCopy - 0);
        const substractedQuantity = productQuantity > 1 ? productQuantity -= 1 : productQuantity -= 0;
        dispatch(substractTotal({...data, Quantity: substractedQuantity, QuantityCopy: quantityCopy}));
        dispatch(setProducts({...data, Quantity: substractedQuantity, operate: "", QuantityCopy: quantityCopy}));
    }
    const handleCart = ()=>{
        dispatch(setProducts(data));
        dispatch(setCartPopup("showC"));
        setTimeout(()=>{
            dispatch(setCartPopup("noneC"));
        }, 2000);
    }
    const [ removeFvr, setRemoveFvr ] = useState("");
    const removeFavorite = ()=>{
        dispatch(unSetFavorites(data));
    }
    const removeCart = ()=>{
        dispatch(setReverse(data));
    }
    return (
        <Items>
            <div className="wrapper">  
                <img src={data.img} alt="" />
                <div className="productDetail">
                    <div className="productContainer">
                        <p className='label'>name:</p>
                        <p className="value">{data.title}</p>
                    </div>
                    <div className="idContainer">
                        <p className='label'>id:</p>
                        <p className="value">{data._id}</p>
                    </div>
                    <div className="circleContainer">
                        <ColorCircle color={data.color[0]} />
                    </div>
                    <div className="sizeContainer">
                        <p className="label">
                            size:
                        </p>
                        <p className="value">{data.choseSize? data.ChoseSize : data.size[0]}</p>
                    </div>
                </div>
            </div>
            {!wishlist?
                (<div className="quantityAndPrice">
                    <div className="quantity">
                        <p className='add' onClick={add}>+</p>
                        <p>{data.Quantity}</p>
                        <p className='substract' onClick={substract}>-</p>
                    </div>
                    <p className='price'>${data.sellingPrice.toLocaleString("en-US")}</p>
                    <button title="Remove item from your cart" onClick={()=> setRemoveFvr("cart")} >Remove</button>
                </div>):
                <div className="quantityAndPrice">
                    <Favourite style={{color: "gray", cursor: "pointer"}} className='fvrtIcon' onClick={()=> setRemoveFvr("wishlist")}/>
                    <Button onClick={handleCart} >Add to Cart</Button>
                </div>
            }
            <FavoriteRemovedOption optionShow={removeFvr} >
                <div className='option' >
                    <p className='message'>{`Do you want to remove this item from your ${removeFvr=== "wishlist"? "Wishlist": "Cart"}?`}</p>
                    <div className='permission' >
                        <p className='yes' onClick={()=> {setRemoveFvr(""); removeFvr ===  "wishlist"? removeFavorite(): removeCart()}} >Yes</p>
                        <p className='no' onClick={()=> setRemoveFvr("")} >No</p>
                    </div>
                </div >
            </FavoriteRemovedOption> 
        </Items> 
    )
}

const Items = styled.div`
    min-height: 18rem;
    border-bottom: 1px solid #ccc;
    border-radius: 2px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
    overflow: hidden;
    position: relative;
    .wrapper{
        display: flex;
        ${mobile({alignItems: "flex-start", paddingTop: "15px"})}
        img{
            width: 14rem;
            height: 14rem;
            object-fit: cover;
            margin-right: 60px;
        ${mobile({width: "10rem", height: "10rem", marginRight: "18px"})}
        }
    }
    .productDetail{
        display: flex;
        flex-direction: column;
}
.productContainer, .idContainer, .sizeContainer, .circleContainer{
    display: flex;
    align-items: center;
    ${mobile({height: "35px", alignItems: "flex-end", width: '100%'})}
    }
    .circleContainer{
        ${mobile({alignItems: "flex-start"})}
    }
    .label{
        margin-right: 10px;
        font-size: 21px;
        font-weight: 600;
        color: #2b2b2b;
        ${mobile({fontSize: "18px", display: "flex", alignItems: "center", height: "15px" })}
        
    }
    .value{
        font-size: 15px;
        text-transform: uppercase;
        color: #424242;
        font-weight: 500;
        overflow-wrap: break-word;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        ${mobile({fontSize: "14px", width: "90px"})}
    }
    .quantityAndPrice{
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 8rem;
        margin-right: 6em;
        ${mobile({width: "100%", margin: "0", lineHeight: "15px", paddingTop: "10px"})}
        .price{
            font-size: 45px;
            font-weight: 300;
            color: #454545;
            ${mobile({fontSize: "40px"})}
        }
        .fvrtIcon{
            transform: scale(2);
            transition: all 250ms ease-in;
            &:hover{
                opacity: 0.5;
            }
            &:active{
                transform: scale(2.3);
                transition: none;
            }
        }
        button{
            outline: none;
            border: none; 
            cursor: pointer;
            font-size: 14px;
            background: black;
            color: white;
            padding: 6px 10px;
            transition: all 250ms;
        }
        button:hover {
            opacity: 0.7;
        }
        button:active {
            opacity: 0.5;
            transition: none;
        }
    }
    .quantity{
        display: flex;
        align-items: center;
        p{
            margin: 0 10px;
            font-size: 20px;
            transform: scale(1.8);
            user-select: none;
            transition: all 250ms ease-in;
            ${mobile({margin: "0 15px"})}
        }
        .add{
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
        }
        .substract{
            transform: scaleX(2.6);
            font-weight: 800;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
        }
        .add:active, .substract:active{
            opacity: 0.3;
            transition: none;
        }
    }
    `
    const ColorCircle = styled.div`
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${(props)=> props.color};
        ${mobile({width: "18px", height: "18px" })}
    ` 
    const Button = styled.button`
        border: 1px solid transparent;
        font-size: 18px;
        color: white;
        margin-top: 3rem;
        padding: 8px 12px;
        background-color: black;
        cursor: pointer;
        transition: all 250ms ease-in;
        &:hover{
            opacity: 0.8; 
        }
        &:active{
            opacity: 0.5;
            transition: none;
        }
    `
    const FavoriteRemovedOption = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    display: ${props=> props.optionShow? "flex": "none"};
    justify-content: center;
    align-items: center;
    .option{
        width: 25rem;
        min-height: 8rem;
        background-color: white;
        border-radius: 12px;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .message{
        font-size: 18px;
        color: #525252;
        font-weight: 500;
    }
    .permission{
        display: flex;
        justify-content: space-between;
    }
    .yes, .no{
        border: 1px solid #dbdbdb;
        transition: all 250ms ease-out;
        padding: 5px 12px;
        cursor: pointer;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        &:hover{
            background-color: #d9d9d9;
        }
        &:active{
            background-color: #adadad;
            transition: none;
        }
    }
`