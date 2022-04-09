import React from 'react';
import Online from './Online';
import data from '../../data/data.json';
import './rightbar.css';

function Rightbar({profile}) {
    const RightbarHome = ()=> (
            <>
                <div className="birthday">
                    <img src="/assets/images/gift.png" alt="" className="gift" />
                    <p className="giftDesc">
                        <span className="specificName">Mustafa Ahmed </span>
                        and
                        <span className="otherFriends"> 3 other friends </span>
                        have a birthday today.
                    </p>
                </div>
                <div className="adContainer">
                    <img src="/assets/images/ad.jpg" alt="" className="adImage" />
                </div>
                <p className="onlineHeading">Online Friends</p>
                { data.map((item)=> (
                    <Online key={item.id} users={item} />
                ))}
            </>
    );
    const RightbarProfile = () => (
        <>
            <div className="border">
                <div className="userInfo">
                    <p className="top-heading" >User information</p>
                    <div className="area">
                        <span className="city">City:</span>
                        <span className="cityName">Karachi</span>  
                    </div>
                    <div className="belong">
                        <span className="from">From:</span>
                        <span className="belongArea">Gaandu Basti</span>
                    </div>
                    <div className="relationship">
                        <span className="relation">Relationship:</span>
                        <span className="relationStatus">Single</span>
                    </div>
                </div>
                <div className="userFriend">
                    <p className="bottom-heading">User friends</p>
                    <div className="allFriends">
                        { data.map((all)=>(
                            all.userId &&
                            <div className="userFriendBox">
                                <img src={all.profile} alt="" className="friend-1" />
                                <p className="friend-1-name">{all.user}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
    return (
        <div className={profile? `partner-3` : `parent-3`}>
            <div className="rightbarContainer">
                {profile? 
                <RightbarProfile/> :
                <RightbarHome/>
                }
            </div>
        </div>
    )
}

export default Rightbar
