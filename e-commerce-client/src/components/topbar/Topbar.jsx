import React, { useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import SignoutOption from "../SignoutOption";
import { mobile } from "../../responsive";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, selectUser } from "../../redux/userSlice";
export default function Topbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const parentOption = ()=>{
    setLoginShowOption(false);
  }
  const userPermission = ()=>{
      setLogoutOption(true);
  }
  const [ loginShowOption, setLoginShowOption ] = useState(false);
  const [ logoutOption, setLogoutOption ] = useState(false);
  const handleLogout = ()=>{
    dispatch(userLogout());
    setLogoutOption(false)
    history.push("/login")
}
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">safeeradmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings style={{opacity: loginShowOption?"0.5": "1", transition: "all 250ms ease"}}  onClick={()=> setLoginShowOption(!loginShowOption)} />
          </div>
          <img  style={{objectFit: "contain"}} src={user.profile? user.profile: PF + "unknown.jpg"} alt="" className="topAvatar" />
        </div>
      </div>
      <SignoutOption admin="true" loginShowOption={loginShowOption} parentOption={parentOption} userPermission={userPermission}/>
      <FavoriteRemovedOption optionShow={logoutOption} >
                <div className='option' >
                    <p className='message'>{`Do you want to logout?`}</p>
                    <div className='permission' >
                        <p className='yes' onClick={handleLogout} >Yes</p>
                        <p className='no' onClick={()=> {setLogoutOption(false); setLoginShowOption(false);}} >No</p>
                    </div>
                </div >
      </FavoriteRemovedOption>
    </div>
  );
}

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