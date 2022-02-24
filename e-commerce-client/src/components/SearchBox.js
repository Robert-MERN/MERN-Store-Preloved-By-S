import React, { Children } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { mobile } from "../responsive";

export default function SearchBox({product, onClick}) {
    const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  return(
      <SearchBoxContainer>
          <ChildContainer>
              {product&&
              product.length > 0?
              product.slice(0, 5).map((item)=>(
                <Link to={`/product/${item._id}`} style={{color: "inherit", textDecoration:"none"}}  key={item._id}  >
                    <SearchedProduct onClick={onClick} >
                        <div className="productImg">
                            <img src={item.img} alt="" />
                        </div>
                        <div className="productDet">
                            <T className="tit">{item.title}</T>
                            <D className="des">{item.desc}</D>
                            <P className="pri">Rs. {item.price}</P>
                        </div>
                    </SearchedProduct>
                </Link>
              )): <BadMessage>Sorry! No results were found With these search key words... <SearchOffIcon style={{marginLeft: "40px", transform: "scale(2)"}} /></BadMessage>
              }
          </ChildContainer>
      </SearchBoxContainer>
    ); 
}

const SearchBoxContainer = styled.div`
    z-index: 200;
    min-width: 37rem;
    min-height: 20rem;
    position: absolute;
    box-sizing: border-box;
    top: 4.5em;
    left: 2.8em;
    ${mobile({left: "0", minWidth: "100vw", height: "34rem",})}
    `
const ChildContainer = styled.div`
    width: 100%;
    height: 100%;
    border-top: 1px solid #e0e0e0;
    border-radius: 12px; 
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background: white;
    ${mobile({borderRadius: "0"})}
    &:after{
        content: "";
        position: absolute;
        width: 22px;
        height: 22px;
        background: white;
        left: 25px;
        top: -13px;
        transform: rotate(45deg);
        border-top: 1px solid #c2c2c2;
        border-left: 1px solid #c2c2c2;
    }
`
const SearchedProduct = styled.div`
    border-bottom: 1px solid #e6e6e6;
    max-width: 65rem;
    min-height: 75px;
    display: flex;
    align-items: center;
    padding: 8px 5px;
    cursor: pointer;
    .productImg{
        margin-right: 20px;
        img{
            width: 80px;
            height: 80px;
            object-fit: cover;
        }
    }
    .productDet{
        display: flex;
        flex-direction: column;
        line-height: 0px;
        justify-content: space-evenly;
        overflow-wrap: break-word;
        width: 100%;
        height: 80px;
        padding: 5px 0;
    }
`
const T = styled.p`
     font-size: 20px;
    font-weight: 600;
    margin-bottom: 0px;
    margin-top: 0;
    color: #3985e3;
    line-height: 0;
`
const D = styled.p`
    font-size: 18px;
    margin-bottom: 0;
    color: #9c9c9c;
    overflow-wrap: break-word;
`
const P = styled.p`
    margin-bottom: 0;
    font-size: 21px;
    font-weight: 700;
    color: #184c8c;
`
const BadMessage = styled.p`
    font-size: 18px;
    color: #787878;
    display: flex;
    align-items: center;

`