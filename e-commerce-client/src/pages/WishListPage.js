import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import Items from '../components/ProductBag';
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { selectProducts, selectTotal } from '../redux/cartSlice';
import StripeCheckOut from "react-stripe-checkout";
import { Request } from '../request';
import { useHistory, Link } from 'react-router-dom';
import { selectFavorites } from '../redux/wishlistSlice';

export default function ShoppingCartPage() {
    let product, cartTotal;
    product = (useSelector(selectProducts));
    cartTotal = (useSelector(selectTotal));
    const history = useHistory();
    const publishableKey = process.env.REACT_APP_STRIPE_KEY;
    const [ token, setToken ] = useState(null);
    const onToken = (T)=>{
        setToken(T);
    }
    const userRequest = Request(true);
    useEffect(()=>{
        const makeRequest = async()=>{
            try {
                const res = await userRequest.post("checkout/payment",{ tokenId: token.id, amount: cartTotal });
                history.push("/success", {order: res.data});
            } catch(err){
                console.error(err);
            }
        };
        token && makeRequest();
    },[token, cartTotal, userRequest, history])
    const pf = process.env.REACT_APP_PUBLIC_FOLDER;
    const favoritesProduct = useSelector(selectFavorites);
    return (
   
            <div>
                <Navbar />
                <Announcement/>
                <CartHeader>
                    your  Wishlist
                </CartHeader>
                <CartNavbar>
                    <Link to="shopping/all" style={{color: "inherit", textDecoration: "none"}} >
                        <button className="continueShopping">continue shopping</button>
                    </Link>
                    <div className="centre">
                    <Link to="/cart" style={{color: "inherit", textDecoration: "none"}} >
                        <p>Shopping Bag ({product ? product.length: 0}) </p>
                    </Link>
                    <Link to="/wishlist" style={{color: "inherit", textDecoration: "none"}} >
                        <p>Your Wishlist ({favoritesProduct.length})</p>
                    </Link>
                    </div>
                    <div style={{opacity: "0", zIndex: "-5"}}>
                        <StripeCheckOut
                            label='Pay Now'
                            name='HEAVENX ABAYA.'
                            billingAddress
                            shippingAddress
                            image={`${pf}category1.jpg`}
                            description={`Your total is $ ${cartTotal.toLocaleString("en-US")}`}
                            amount={cartTotal * 100}
                            panelLabel='Pay Now'
                            token={onToken}
                            stripeKey={publishableKey}
                        >
                            <button className="checkout">checkout now</button>        
                        </StripeCheckOut>
                    </div>
                </CartNavbar>
                <ProductOrderContainer>
                    <Product >
                        {
                        favoritesProduct.map((item)=>(
                            <Items key={item._id} data={item}  wishlist="true"/>
                            ))
                        }
                    </Product>
                    <Order style={{opacity: "0", zIndex: "-5"}} >
                        <h1>ORDER SUMMARY</h1>
                        <div className="subTotal">
                            <p className="name">Subtotal</p>
                            <p className="price">$ {cartTotal.toLocaleString("en-US")}</p>
                        </div>
                        <div className="estimatedShipping">
                        <p className="name">Estimated Shipping</p>
                            <p className="price">$ 5.90</p>
                        </div>
                        <div className="shippingDiscount">
                            <p className="name">Shipping Discount</p>
                            <p className="price">$ -6.90</p>
                        </div>
                        <div className="TOTAL">
                            <p className="totalLabel">Total</p>
                            <p className="totalPrice">$ {cartTotal.toLocaleString("en-US")}</p>
                        </div>
                            <StripeCheckOut
                                label='Pay Now'
                                name='HEAVENX ABAYA.'
                                billingAddress
                                shippingAddress
                                image={`${pf}category1.jpg`}
                                description={`Your total is $ ${cartTotal.toLocaleString("en-US")}`}
                                amount={cartTotal * 100}
                                panelLabel='Pay Now'
                                token={onToken}
                                stripeKey={publishableKey}
                            >
                                <div className="button">
                                        <button>Checkout Now</button>
                                </div>
                            </StripeCheckOut>
                    </Order>
                </ProductOrderContainer>
                <NewsLetter />
                <Footer />
            </div>
    )
}
const CartHeader = styled.h1`
    text-transform: uppercase;
    font-weight: 400;
    font-size: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #363636;
    `
const CartNavbar = styled.div`
    padding: 0 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({padding: "0 15px", marginBottom: "20px"})}
    .centre{
        display: flex;
        justify-content: space-between;
        width: 17em;
        ${mobile({display: "none"})}
        p{
            text-decoration: underline;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            font-size: 16px;
            color: #424242;
            font-weight: bold;
        }
    }
    button{
        padding: 8px;
        font-size: 17px;
        font-weight: 600;
        cursor: pointer;
        border: 2px solid black;
        transition: all 250ms ease-in;
        -webkit-tap-highlight-color: transparent;
    }
    .checkout{
        background: black;
        color: white;
    }
    .checkout:hover{
        background: #2b2b2b;
    }
    .continueShopping:hover{
        background: #dbdbdb;
    }
    .checkout:active, .continueShopping:active{
        opacity: 0.4;
        transition: 100ms ease-in;
    }
`
const ProductOrderContainer = styled.div`
    display: flex;
    padding: 10px 40px 0 40px;
    ${mobile({flexDirection: "column", padding:"10px 20px 10px 20px"})}
`
const Product = styled.div`
    flex: calc(1 - 0.25);
`
const Order = styled.div`
    flex: 0.25;
    height: 30rem;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow: hidden;
    padding: 30px;
    ${mobile({marginTop: "2em", height: "20rem", flex:"auto", lineHeight: "10px"})}
    div, h1{
        width: 100%;
        display: flex;
        justify-content: space-between;
    };
    h1{
        font-weight: 300;
        font-size: 35px;
        ${mobile({fontSize: "30px"})}
    }
    .button{
        margin-top: 20px;
        display: flex;
        justify-content: center;
        width: 100%;
    }
    button{
        font-size: 20px;
        padding: 10px 0px;
        width: 100%;
        background-color: black;
        color: white;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all 250ms ease-out;
    }
    button:hover{
        background-color: #1f1f1f;
    }
    button:active{
        opacity: 0.7;
        transition: none;
    }
    .name{
        font-size: 20px;
        font-weight: 500;
    }
    .price{
        font-size: 20px;
        font-weight: 400;
    }
    .totalLabel{
        font-size: 30px;
        font-weight: 500;
    }
    .totalPrice{
        font-size: 24px;
        font-weight: 500;
        display: flex;
        align-items: center;
    }
`