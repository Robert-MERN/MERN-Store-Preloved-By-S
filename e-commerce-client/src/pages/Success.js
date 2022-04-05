import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Request } from '../request';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { removeCart } from "../redux/cartSlice";
import { useDispatch } from 'react-redux';

export default function Success() {
    const Order = useLocation().state;
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState("");
    const request = Request(true);
    const dispatch = useDispatch();
    const order = {
        userId: Order.id,
        product: Order.product,
        amount: Order.order.amount,
        address: Order.order.billing_details.address,
        status: Order.order.status 
    }
    useEffect(()=>{
        const placeOrder = async()=>{
            setIsLoading(true);
            try{
                await request.post("order/place", order)
                dispatch(removeCart());
                setIsLoading(false);
            } catch(err){
                setError(err);
                setIsLoading(false);
            }
        };
        placeOrder();
    },[])
    return (
        <SuccessButtonWrapper>
            <p className='thank' >THANK YOU FOR SHOPPING WITH "preloved-by-Safeer"...🥳</p>
            <p className="message">Your Order Is Being Proceeded... 😊</p>
            <p className="message">Click  on "Success-button" to get redirected to homepage back.... Enjoy 😊</p>
            <Link to="/" >
                <SuccesButton>Succes</SuccesButton>
            </Link>
        </SuccessButtonWrapper>
    );
}
const SuccessButtonWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10rem;
    .thank{
        font-size: 28px;
        font-weight: 800;
        margin-bottom: 3rem;
        color: #ed8699;
        border-bottom: 1px solid #ccc;
    }
    .message{
        font-size: 18px;
        margin-bottom: 60px;
        color: #9c9c9c;
    }
`
const SuccesButton = styled.button`
    /* margin: auto; */
    font-size: 20px;
    color: white;
    padding: 20px 50px;
    background-color: #3cd699;
    outline: none;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 250ms ease;
    &:hover{
        opacity: 0.8;
    }

`