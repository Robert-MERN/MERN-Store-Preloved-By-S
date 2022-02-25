import React,{ useState, useEffect } from 'react'
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import Badge from '@mui/material/Badge';
import { mobile } from "../responsive";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/userSlice'; 
import SignoutOption from './SignoutOption';
import { selectQuantity } from '../redux/cartSlice';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBox from './SearchBox';
import { Request } from '../request';
import { userLogout } from '../redux/userSlice';
import { removeCart } from '../redux/cartSlice';
import { removeFavorites } from '../redux/wishlistSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const screen =  window.screen.width;
    const [ loginShowOption, setLoginShowOption ] = useState(false);
    const cartQuantity = useSelector(selectQuantity);
    const request = Request(false);
    const [ product, setProduct ] = useState(null);
    const [ searchedPro, setSearchedPro ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showSearchBox, setShowSearchBox ] = useState(false);
    const [ keyValue, setKeyValue ] = useState("");
    const [ logoutOption, setLogoutOption ] = useState(false);
    const history = useHistory();
    console.log("parent", loginShowOption);
    console.log("child", logoutOption);
    useEffect(()=>{
        const fetchProduct = async ()=>{
            setIsLoading(true);
            try {
                const res = await request.get("product/find/all");
                setProduct(res.data); 
                setIsLoading(false);
            } catch(err){
                setError(err);
                setIsLoading(false)
            }
        };
        fetchProduct();
    },[]);
    const searchEvent = (e)=>{
        setKeyValue(e.target.value);
        setSearchedPro(product.filter((i)=> i.title.toLowerCase().includes(e.target.value.toLowerCase())));
        if(e.target.value === ""){
            setShowSearchBox(false);
        } else {
            setShowSearchBox(true);
        }
    }
    const removeValue = ()=>{
        setShowSearchBox(false)
        setKeyValue("");
    }
    const handleLogout = ()=>{
        dispatch(userLogout());
        dispatch(removeCart());
        dispatch(removeFavorites());
        setLogoutOption(false)
        history.push("/login")
    }
    const parentOption = ()=>{
        setLoginShowOption(false);
    }
    const userPermission = ()=>{
        setLogoutOption(true);
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <div className="wrapper">
                        <Language>
                            EN
                        </Language>
                        <div className="search">
                            <input type="text" className='searchFilter' placeholder='Search' value={keyValue} onChange={searchEvent} />
                            <div title="search">
                                <SearchIcon style={{color: "#7d7d7d", cursor: "pointer" }} />
                            </div>
                        </div>
                    </div>
                </Left>
                <Center>
                    <div className="wrapper">
                        <h1>{screen <= 375? "PRELOVED-S." : "PRELOVED-BY-S"}</h1>
                    </div>
                </Center>
                <Right>
                    <div className="wrapper">
                        {user ?
                            <>
                                <MenuIcon className='menuIcon' onClick={()=>setLoginShowOption(!loginShowOption)} />
                                <SignoutOption loginShowOption={loginShowOption} parentOption={parentOption} userPermission={userPermission} />
                            </>
                            :
                            <>
                                <Link to="/register" style={{textDecoration: "none", color: "black"}} >
                                    <p>REGISTER</p>
                                </Link>
                                <Link to="/login" style={{textDecoration: "none", color: "black"}}>
                                    <p>SIGN IN</p>
                                </Link>
                            </>
                        }
                        <Link to="/cart" style={{color: "black"}}>
                            <div className="trolley">
                                <Badge badgeContent={cartQuantity} color="primary" style={{cursor:"pointer", WebkitTapHighlightColor: "transparent"}} >
                                    <LocalGroceryStoreOutlinedIcon className='groceryIcon'/>
                                </Badge>
                            </div>
                        </Link>
                    </div>
                </Right>
            </Wrapper>
            {showSearchBox&&
                <SearchBox product={searchedPro} onClick={removeValue}  />

            }
            <FavoriteRemovedOption optionShow={logoutOption} >
                <div className='option' >
                    <p className='message'>{`Do you want to logout?`}</p>
                    <div className='permission' >
                        <p className='yes' onClick={handleLogout} >Yes</p>
                        <p className='no' onClick={()=> {setLogoutOption(false); setLoginShowOption(false);}} >No</p>
                    </div>
                </div >
            </FavoriteRemovedOption>
        </Container>
    )
}


const Container = styled.div`
    height: 60px;
    padding: 0px 30px;
    background-color: white;
    ${mobile({padding: "0", height: "50px"})}
    position: relative;
` 
const Wrapper = styled.div`
    display: flex;
    height: 100%;
    `
const Language = styled.div`
    color: #525251;
    cursor: pointer;
    font-weight: 400;
    font-size: 17px;
    ${mobile({display: "none"})}
    
`
const Left = styled.div`
    flex: 1;
    user-select: none;
    .wrapper{
        display: flex;
        align-items: center;
        height: 100%;
    }
    .search{
        display: flex;
        align-items: center;
        width: 18em;
        height: 2.2em;
        border: 1px solid #a3a3a3;
        margin-left: 12px;
        padding: 2px 6px;
        background: white;
        ${mobile({width: "5em", height: "1.7em"})}
    }
    .searchFilter{
        border: none;
        outline: none;
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        color: #3d3d3d;
        
    }
    `
const Center = styled.div`
    flex: 1;
    .wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    h1{
        font-size: 32px;
        cursor: pointer;
        user-select: none;
        color: #262626;
        white-space: nowrap;
        overflow-y: hidden;
        ${mobile({fontSize: "22px", marginLeft: "6px", textAlign: "center", lineHeight: "18px"})}
        -webkit-tap-highlight-color: transparent;
    }
`
const Right = styled.div`
    flex: 1;
    position: relative;
    ${mobile({flex: "2"})};
    .wrapper{
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: flex-end;
        ${mobile({justifyContent: "center"})};
        .menuIcon{
            transform: scale(1.3);
            cursor: pointer;
            margin-right: 5px;
        }
    }
    p{
        font-style: 18px;
        font-weight: 400;
        margin-left: 15px;
        user-select: none;
        cursor: pointer;
        transition: all 150ms;
        ${mobile({fontSize: "10px", fontWeight: "500", marginLeft: "10px"})};
        -webkit-tap-highlight-color: transparent;
    }
    p:hover{
        color: gray;
    }
    .groceryIcon:hover{
        color: gray;
        transition: all 250ms;
    }
    .groceryIcon{
        margin-left: 15px;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        font-size: 30px;
        ${mobile({marginLeft: "30x"})};
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
    ${mobile({width: "17rem"})}    
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