import React from 'react';
import './profile.css';
import Header from '../../components/header/Header';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';

export default function Profile() {
    return (
        <>
            <Header />
            <div className="wrapper-1">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="photos">
                            <a href="http://localhost:3000/assets/images/post1.jpg">
                                <img src="/assets/images/post1.jpg" alt="" className="coverPhoto" />
                            </a>
                            <a href="http://localhost:3000/assets/images/profile1.jpg">
                                <img src="/assets/images/profile1.jpg" alt="" className="profilePhoto" />   
                            </a>
                        </div>
                        <div className="profileName">
                            <p className="topName">Shuja Hussain</p>
                            <p className="statusName">Hello my friends!</p>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed/>
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    )
}
