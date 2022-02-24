import React,{ useState, useEffect, useRef } from 'react'
import Navbar from "../components/Navbar";
import Announcement from '../components/Announcement';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import styled from "styled-components";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Fade from "react-reveal/Fade"
import Zoom from "react-reveal/Zoom"
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';
import { Request } from "../request";
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/cartSlice';
import { setCartPopup } from '../redux/allPopupMessages';

export default function Product() {
    const [ quantity, setQuantity ] = useState(1);
    const add = ()=> {
        setQuantity(quantity + 1);
    }
    const minus = ()=> [
        setQuantity(quantity > 1 ? quantity - 1 : quantity - 0)
    ]
    const [ size, setSize ] = useState(""); 
    const handleSizeChange = (e) => {
        setSize(e.target.value);
        };
    const pf = process.env.REACT_APP_PUBLIC_FOLDER;
    const productId = useLocation().pathname.split("/")[2];

    const [ product, setProduct ] = useState([]); // default product state
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const req = Request();
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const res = await req.get(`product/find/one/${productId}`);
                setProduct(res.data);
                setIsLoading(false);
            } catch(err){
                setError(err);
                setIsLoading(false);
            }
        };
        req && fetchData();
    },[productId])
    const [ selectedColor, setSelectedColor ] = useState("");
    // storing cart in redux
    const dispatch = useDispatch();
    const storingCart = ()=>{
        const data = {...product, Quantity: quantity, choseColor: selectedColor, choseSize: size, date: Date.now(), operate: "run"}
        dispatch(setProducts(data));
        dispatch(setCartPopup("showC"));
        setTimeout(()=>{
            dispatch(setCartPopup("noneC"));
        }, 2000);
    }
    return (
        <div>
           <Announcement/>
           <Navbar singlePage={true} />
           <ProductContainer>
                <Left>
                    <Fade bottom>
                        <Zoom>
                            <img src={product.img? product.img : `${pf}category1.jpg`} alt="" />
                        </Zoom>
                    </Fade>
                </Left>
                <Right>
                    <Fade top cascade>
                        <p className='heading' >{product.title && product.title}</p>
                    </Fade>
                    <Fade right>
                        <p className='description'>
                            {product && product.desc}
                        </p>
                    </Fade>
                    <Fade bottom>
                        <p className='price'>$ {product.price && (product.price).toLocaleString("en-US")}</p>
                    </Fade>
                    <div className="colorAndSize">
                        <div className="color">
                            <Fade bottom cascade>
                                <p>Color</p>
                            </Fade>
                            <div className="colorBox">
                                <Fade top>
                                    <>
                                        {product.color &&(
                                        product.color.map((colour)=>
                                            <Color key={colour} id={colour} onClick={(e)=> setSelectedColor(e.target.id)} productColor={colour}/>
                                            ))
                                        }
                                    </>
                                </Fade>
                            </div>
                            <Fade top>
                            </Fade>
                        </div>
                        <div className="size">
                            <Fade top cascade>
                                <p>Size:</p>
                            </Fade>
                            <Zoom>
                                <Box sx={{ width: 120 }} className="sizeBox" style={{marginLeft: "15px"}} >
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={size}
                                                label="size"
                                                onChange={handleSizeChange}
                                                className="selectBox"
                                            >                                               
                                                {product.size&& product.size.map((s)=>(
                                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                                ))
                                                }
                                            </Select>
                                        </FormControl>
                                </Box>
                            </Zoom>
                        </div>
                    </div>
                    <div className="counterAndCart">
                        <div className="counter">
                            <Fade left>
                                <p className='minus' onClick={minus} >-</p>
                            </Fade>
                            <Zoom>
                                <p className='square'>{quantity}</p>
                            </Zoom>
                            <Fade right>
                                <p className='add' onClick={add} >+</p>
                            </Fade>
                        </div>
                        <Fade bottom>
                            <Zoom big>
                                <button onClick={storingCart}>
                                    Add to Cart
                                </button>
                            </Zoom>
                        </Fade>
                    </div>
                </Right>
           </ProductContainer>
            <NewsLetter/>
            <Footer/>
        </div>
    )
}

const ProductContainer = styled.div`
    height: calc(100vh - 95px);
    display: flex;
    padding: 50px;
    ${mobile({flexDirection: "column", padding: "0", margin: "1rem 0 24rem 0"})}
    `
const Left = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    justify-content: center;
    ${mobile({overflow: "visible"})}
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        ${mobile({height: "50vh"})}
    }
    `
const Right = styled.div`
    flex: 1;
    padding: 0 90px;
    ${mobile({padding: "0 20px"})}
    .heading{
        font-size: 50px;
        font-weight: 300;
        color: #303030;
        ${mobile({margin: "0"})}
    }
    .description {
        width: 40vw;
        overflow-wrap: break-word;
        font-size: 18px;
        ${mobile({width: '100%'})}
    }
    .price{
        font-size: 55px;
        font-weight: 300;
        font-family: italic;
        user-select: none;
        color: #474747;
        ${mobile({width: "100%"})}
    }
    .colorAndSize{
        display: flex;
        align-items: center;
        ${mobile({justifyContent: "space-between", width: "100%", alignItems: "flex-start"})}
    }
    .color{
        display: flex;
        align-items: center;
        ${mobile({alignItems: "center"})}
        width: 14rem;
        p{
            font-size: 22px;
            margin-right: 5px;
            color: #474747;
            ${mobile({marginRight: "0px", fontSize: "20px"})}
            width: 5rem;
        }
        .colorBox{
            display: flex;
            width: 100%;
            flex-wrap: wrap;
        }
    }
    .size{
        display: flex;
        align-items: center;
        margin-left: 55px;
        .sizeBox{
            ${mobile({width: "80px"})}
        }
        p{
            font-size: 22px;
            color: #474747;
            ${mobile({display: "none"})}
        }
    }
    .counterAndCart, .counter{
        display: flex;
        align-items: center;
        margin-right: 50px;
        p{
            margin-right: 20px;
        }
    }
    .counterAndCart{
        ${mobile({width: "100%", display: "flex", justifyContent: "space-Between"})}
    }
    .square{
        border: 2px solid teal;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        font-size: 18px;
        user-select: none;
        transition: all 250ms ease-in;
    }
    .square:hover{
        background-color: rgb(204, 218, 219); 
    }
    .add, .minus{
        font-size: 28px;
        cursor: pointer;
        transition: all 250ms ease-in;
        background: white;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    }
    .add:hover, .minus:hover{
        color: gray;
        transition: all 250ms ease-in; 
    }
    button {
        font-size: 19px;
        color: #303030;
        padding: 10px;
        outline: none;
        cursor: pointer;
        border: 1px solid teal;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }
    button:hover{
        background-color: rgb(204, 218, 219);
        transition: all 250ms ease-in;
    }
    button:active{
        opacity: 0.5;
        transition: none;
    }
`
const Color = styled.div`
    width: 40px;
    height: 40px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &:after{
        content: "";
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        position: absolute;
        transition: all 150ms ease;
        ${mobile({width: "25px", height: "25px"})}
        background-color: ${props=> props.productColor};
        /* background-color: black; */
    }
    &:active{
        &:after{
            transform: scale(1.2);
        }
    }
`