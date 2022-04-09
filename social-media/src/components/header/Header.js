import React, { useState } from 'react';
import './header.css';
import data from '../../data/data.json';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'; 

function Header() {
    const [ findUser, setFindUser ] = useState([]);
    const [ value, setValue ] = useState();
    const handleSearch = (e)=> {
        const searchUser = e.target.value;
        setValue(searchUser);
        const matchUser = data.filter((i)=>{
            return i.user.toLowerCase().includes(searchUser.toLowerCase());
        });
        searchUser === ""?
        setFindUser([]):
        setFindUser(matchUser)
    };
    const eraseAll = ()=> {
        setFindUser([]);
        setValue("");
    }

    return (
        <div className="container">
            <div className="wrap">
                <div className="title">
                    <h3 className="titleText">Munnasocial</h3>
                </div>
                <div className="searchBar">
                    <div className="input">
                        {findUser.length === 0 ?
                            <SearchIcon className="searchIcon" />:
                            <ArrowBackIcon className="cancelIcon" onClick={eraseAll}/> 
                        }
                        <input className="inputText"
                            onChange={handleSearch}
                            value={value}
                            type="text"
                            placeholder="Search for friend, post or video" />
                            { findUser.length !== 0 &&
                            <div className="searchFilterContainer">
                            { findUser.slice(0, 6).map((item)=> (
                                <div className="searchUserContainer" key={item.id}>
                                    <img src={item.profile} alt="" className="searchUsers" />
                                    <p className="searchUsersName">{item.user}</p>
                                </div>
                            ))}
                    </div>
                            }
                    </div>
                    <div className="options">
                        <p className="homePageOption">Homepage</p>
                        <p className="timelineOption">Timeline</p>
                    </div>
                </div>
            </div>
            <div className="childContainer">
                <div className="icons">
                        <div className="icon-1">
                            <PersonIcon className ="personIcon" />
                            <div className="circle-1">
                                <p className="num-1">1</p>
                            </div>
                        </div>
                        <div className="icon-2">
                            <ChatIcon className="chatIcon" />
                            <div className="circle-2">
                                <p className="num-2">2</p>
                            </div>
                        </div>
                        <div className="icon-3">
                            <NotificationsIcon className="notificationIcon" />
                            <div className="circle-3">
                                <p className="num-3">2</p> 
                            </div>
                        </div>
                </div>
                <div className="profile">
                    <div className="imageContainer">
                        <Link exact to="/profile">
                            <img src="/assets/images/profile1.jpg" alt="" className="image" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
