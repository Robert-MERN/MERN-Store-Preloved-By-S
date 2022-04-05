import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ShoppingPage from "./pages/ShoppingPage";
import Fade from "react-reveal/Fade";
import Product from "./pages/Product";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/userSlice";
import WishlistPage from "./pages/WishListPage";
import { selectCartPopup, selectWishlistPopup } from "./redux/allPopupMessages";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styled from "styled-components";
import { anime } from "./messageAnimation";
import axios from "axios";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import HOMY from "./pages/homy/HOMY";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import ProducT from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import "./App.css";
import UserProfile from "./pages/UserProfile";
import Analytics from "./pages/Analytics";


function App() {
  const user = useSelector(selectUser);
  const path = window.location.pathname;
  const FP = path.split("/"); // filtered path
  var cart = useSelector(selectCartPopup);
  var wishlist = useSelector(selectWishlistPopup);
  return (
    <div style={{position: "relative"}} >
      <Router>
        {((path === "/") || (FP[1] === "shopping" && FP[2]) || (FP[1] === "product" && FP[2])|| (path === "/cart" )|| (path === "/login") || (path === "/register") || (path === "/success")  || (path === "/wishlist") || (FP[1] === "adm")|| (path === "/profilephoto"))?
          <Switch>
            <Route exact path="/">
              <Fade>
                {user? <Home /> : <Redirect to="/login" />}
              </Fade>
            </Route>
            <Route exact path="/shopping/:category">
              <ShoppingPage />
            </Route>
            <Route exact path="/product/:id">
              <Product/>
            </Route>
            <Route exact path="/cart">
              <ShoppingCartPage  />
            </Route>
            <Route exact path="/wishlist">
              <WishlistPage />
            </Route>
            <Route exact path="/login">
            {user? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/register">
            {user? <Redirect to="/" /> : <Register />}
            </Route>
            <Route exact path="/success">
              <Success />
            </Route>
            <Route exact path="/profilephoto">
              <UserProfile />
            </Route>
              <Route exact path="/adm">
                  <HOMY />
                </Route>
                <Route path="/adm/users">
                  <UserList />
                </Route>
                <Route path="/adm/user/:userId">
                  <User />
                </Route>
                <Route path="/adm/newUser">
                  <NewUser />
                </Route>
                <Route path="/adm/products">
                  <ProductList />
                </Route>
                <Route path="/adm/product/:productId">
                  <ProducT />
                </Route>
                <Route path="/adm/newproduct">
                  <NewProduct />
                </Route>
                <Route path="/adm/analytics">
                  <Analytics />
                </Route>
                <Route path="/adm/sales">
                  <Analytics sales="true" />
                </Route>
          </Switch>
            :
            <Switch>
              <Route exact path="/">
                <Fade>
                  <Home/>
                </Fade>
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Redirect exact to={user? "/" : "/login"} />
            </Switch>
        }
      </Router>
        <DIV>
          <PopupContainer status={cart} status2={wishlist} >
            <div>
              <InfoOutlinedIcon style={{color: "gray", transform: "scale(1.2)"}} />
            </div>
            <p>{cart === "showC"? "1 Item added to Cart.": "1 Item added to Wishlist."}</p>
          </PopupContainer>
        </DIV>
    </div>
  );
}
const DIV = styled.div`

`
const PopupContainer = styled.div`  
  position: fixed;
  display: flex;
  width: 13rem;
  background: #e4ecf2;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  right: 30px;
  border-radius: 8px;
  align-items: center;
  padding: 0 12px;
  border-top: #cfcfcf;
  border-right: transparent;
  border-left: transparent;
  border-bottom: transparent;
  opacity: 1;
  bottom: ${props=> props.status === "showC" || props.status2 === "showW"? "100px": "-80px"};
  ${(props)=> anime(props.status, props.status2)};
  div{
    margin-right: 10px;
    border-right: 1px solid #c2c2c2;
    padding-right: 8px;
  }
  p{
    font-size: 16px;
    font-weight: 600;
    color: #545454;
    width: 100%;
  }
`

export default App; 