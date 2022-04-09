import React, { useState} from 'react'
import Card   from './Card';
import './post.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import GifSharpIcon from '@material-ui/icons/GifSharp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// redux import
import { useDispatch } from 'react-redux';
import { setComments } from "../../../redux/commentSlice";
import { useSelector } from "react-redux";
import { selectComment } from "../../../redux/commentSlice";



function Post({posts}) {
    // like logic
    const [ like, setLike ] = useState(posts.like);
    const [ value, setValue ] = useState(false);
    const [ option, setOption ] = useState(false);
    const adding = () => {
        setLike(value? like - 1 : like + 1);
        setValue(!value);
    }
    //comment logic
    const [showComment, setShowComment ] = useState(false);
    const [ comment, setComment ] = useState(false);
    const [ change, setChange] = useState("");
    const [ showMore, setShowMore ] = useState(false);
    const [ number, setNumber ] = useState(0);
    const [ manage, setManage ] = useState(false);
   
    const keyPress = (e) => {
        const keyWords = e.key;
        const val = e.target.value;
        if (keyWords === "Enter")  {
            val !== "" && dispatch(setComments(val));
            allData.length <= 3 && setComment(true);
            allData.length >= 3 && comment === false && setComment(true);
            allData.length >= 3 && val !== "" && setNumber(number + 1);
            if (val !== ""){
                setManage(true);
            }
            setChange("");
            setShowMore(true);  
        }
    };
    const changing = (e)=>{
        const val = e.target.value;
        setChange(val);
    }
    //comment reducer setup
    const dispatch = useDispatch();
    const allData = useSelector(selectComment);
    let i = 0;
    return (
        <div className="statusContainer">
            <Card options = {option} />
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTop-left">
                        <img src={posts.profile} alt="" className="postTopImg" />
                        <p className="heading">{posts.user}</p>
                        <p className="timestamp">{posts.timestamp}</p>
                    </div>
                    <MoreVertIcon onClick={()=> setOption(!option)} className="dotIcon" />
                </div>
                <div className="caption">
                    <p className="captionText">{posts.caption}</p>
                </div>
                <div className="postImageContainer">
                    <img src={posts.post} alt="" className="postImage"/>
                </div>
                <div className="postBottom">
                    <div className="postBottom-left">
                        <div className="likeIconBG">
                            <ThumbUpAltIcon onClick= { ()=> {
                                adding()}} className="likeIcon" />
                        </div>                       
                        <div onClick= { ()=> adding() } className="heartIconBG">
                            <FavoriteIcon className="heartIcon" />
                        </div>
                        <p className="likeDesc"><span className="likeNum"> {like} </span>people like it</p>
                    </div>
                    <p className="comments" onClick={()=>{
                            setShowComment(!showComment);
                            setChange("");
                            if (comment === true){
                                setComment(false);
                            }
                            if (manage === true) {setManage(false)};
                            if (allData.length >= 3) {setManage(!manage)};
                            setShowMore(!showMore);
                        }}>
                            <span className="commentNum"> {allData.length} </span>comments</p>
                </div>
                { manage &&    
                    <div className="commentContainer-1">
                        {allData.length >= 3 &&
                            <div className="showMoreComment" onClick={()=> {
                                setNumber(number - number);                               
                                }}>
                                {number !== 0 || comment === false ? <p onClick={()=> {setComment(true);}}>Show more</p> : <p onClick={()=> {setComment(false); setManage(true)}} >Show less</p>}
                                <ArrowDropDownIcon className="arrowDropIcon" />
                            </div>
                        }
                        {comment &&
                            allData.slice(number, allData.length).map((x)=>{
                                return (
                                        <div className="childCommentWrapper" key={i++}>
                                            <img src="/assets/images/profile1.jpg" alt="" className="userParaImage"/>
                                            <div className="commentParaWrapper">
                                                <p className="commentPara">
                                                <p className="commentName">Shuja Hussain</p>
                                                    {x}
                                                </p>
                                                <div className="reply">
                                                    <p className="likeBtn">Like</p>
                                                    <p className="replyBtn">Reply</p>
                                                </div>
                                            </div>
                                        </div>
                                        )
                        })}
                    </div>
                }
                { showComment &&
                    <div className="commentContainer" >
                        <img src="/assets/images/profile1.jpg" alt="" className="userComment"/>                       
                        <div className="commentWrapper">
                            <input type="text" placeholder="Write a comment..." className="commentText" value={change} onChange={changing} onKeyPress={keyPress}/>
                            <div className="commentIcons">
                                <div className="i-div">
                                    <CameraAltOutlinedIcon className="i-1" />
                                </div>
                                <div className="i-div">
                                    <InsertEmoticonOutlinedIcon className="i-2"/>
                                </div>
                                <div className="i-div">
                                    <GifSharpIcon className="i-3" />
                                </div>
                            </div>
                        </div>             
                    </div>
                }
            </div>
        </div>
    )
}

export default Post
