import React from 'react'
import './status.css';
import { Link } from 'react-router-dom'; 
import PermMediaIcon from '@material-ui/icons/PermMedia';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LabelIcon from '@material-ui/icons/Label';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

function Status() {
    return (
        <div className="statusContainer">
            <div className="statusWrapper">
                <div className="statusTop">
                    <Link exact to="/profile">
                        <img className="statusImg" src="/assets/images/profile1.jpg" alt="" />
                    </Link>
                    <input className="statusInput" type="text" placeholder="What's in your mind. Munna?" />
                </div>
                <div className="statusBottom">
                    <div className="statusIcons">
                        <div className="media">
                            <PermMediaIcon className="mediaIcon"/>
                            <span>Photo or Video</span> 
                        </div>
                        <div className="label">
                            <LabelIcon className="labelIcon"/>
                            <span>Tag</span>
                        </div>
                        <div className="location">
                            <LocationOnIcon className="locationIcon"/>
                            <span>Location</span>
                        </div>
                        <div className="feeling">
                            <EmojiEmotionsIcon className="feelingIcon" />
                            <span>Feelings</span>
                        </div>
                    </div>
                    <div className="share">
                        <button className="shareBtn">Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Status
