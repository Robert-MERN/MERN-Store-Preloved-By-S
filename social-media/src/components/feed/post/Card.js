import React from 'react'
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';

 const Card = ({options}) => {
    return (
        <div>
            <div className={options? "cardContainer" : "cardContainerInvisible"}>
                <div className="option-1 mb">
                    <BookmarkBorderRoundedIcon className="i" />
                    <div className="description">
                        <p className="h">Save post</p>
                        <p className="d">Add this to your saved items</p>
                    </div>
                </div>
                <div className="option-2">
                    <div className="turnOn">
                        <NotificationsNoneRoundedIcon className="i"/>
                        <p className="turnOnDesc h">Turn on notification for this post</p>
                    </div>
                    <div className="embed">
                        <p className="i"> { "</>" } </p>
                        <p className="embedDesc h">Embed</p>
                    </div>
                </div>
                <div className="option-3">
                    <div className="childOption-1">
                        <CancelPresentationIcon className="i"/>
                        <div className="description">
                            <p className="h">Hide post</p>
                            <p className="d">See fewer posts like this</p>
                        </div>
                    </div>
                    <div className="childOption-2">
                        <AccessTimeIcon className="i"/>
                        <div className="description">
                            <p className="h">Snooze Safeer Ahmed for 30 days</p>
                            <p className="d">Temporarily stop seeing posts</p>
                        </div>
                    </div>
                    <div className="childOption-3">
                        <CancelPresentationIcon className="i"/>
                        <div className="description">
                            <p className="h">Unfollow Safeer Ahmed</p>
                            <p className="d">stop seeing posts from this page</p>
                        </div>
                    </div>
                    <div className="childOption-4">
                        <AnnouncementOutlinedIcon className="i" />
                        <div className="description">
                            <p className="h">Report post</p>
                            <p className="d">I'm concerned about this post</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card;

