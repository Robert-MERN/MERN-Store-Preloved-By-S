import React from 'react';
import SidebarBottom from './SidebarBottom';
import './sidebar.css';
import data from '../../data/data.json';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ChatIcon from '@material-ui/icons/Chat';
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import GroupIcon from '@material-ui/icons/Group';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';

function Sidebar() {
    return (
        <div className="parent-1">
            <div className="items">
                <ul className="itemsList">
                    <div className="item-one">
                        <span className="icon-one">
                            <RssFeedIcon/>
                        </span>
                        <li>Feed</li>
                    </div>
                    <div className="item-one">
                        <span className="icon-one">
                            <ChatIcon/>
                        </span>
                        <li>Chats</li>
                    </div>
                    <div className="item-one">
                        <span className="icon-one">
                            <PlayCircleFilledOutlinedIcon/>
                        </span>
                        <li>Videos</li>
                    </div>
                    <div className="item-one">
                        <span className="icon-one">
                            <GroupIcon/>
                        </span>
                        <li>Groups</li>
                    </div>
                    <div className="item-one">
                        <span className="icon-one">
                            <BookmarkIcon/>
                        </span>
                        <li>Bookmarks</li>
                    </div>
                    <div className="item-one">
                        <span className="icon-one">
                            <HelpOutlineOutlinedIcon/>
                        </span>
                        <li>Questions</li>
                    </div>
                    <div className="item-one">
                        <span className="icon-one">
                            <WorkOutlineOutlinedIcon/>
                        </span>
                        <li>Jobs</li>
                    </div>
                    <div className="item-one">
                        <span className="icon-one">
                            <EventOutlinedIcon/>
                        </span>
                        <li>Events</li>
                    </div>
                    <div className="item-one">
                        <span className="icon-one">
                            <img src="assets/images/graduation-cap.png" alt="" className="img" />
                        </span>
                        <li>Courses</li>
                    </div>
                    <div className="item-one">
                        <p className="showMore">Show More</p>
                    </div>
                </ul>
            </div>
            { data.map((item)=> (
                <SidebarBottom key={item.id} users={item}/>
            ))}
        </div>
    )
}


export default Sidebar
