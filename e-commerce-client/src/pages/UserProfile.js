import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import axios from 'axios';
import { mobile } from "../responsive";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function UserProfile() {
    const id = useLocation().state._id;
    const history = useHistory();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState("");
    const [ saveMongo, setSaveMongo ] = useState(false);
    const [ file, setFile ] = useState(null);
    const [ profilePhoto, setProfilePhoto ] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const onChange = (e)=>{
        setFile(e.target.files[0]);
    }
    const uploadProfilePhoto = ()=>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name; 
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        setIsLoading(true);
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            setError(error);
        }, 
          () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setProfilePhoto({profile: downloadURL});
                  setSaveMongo(true);
                  setIsLoading(false);
                });
            }
        );
    }

    useEffect(()=>{
        const uploadProfilePhoto = async()=>{
            if(saveMongo){
                setIsLoading(true);
                try {
                    await axios.put(`https://preloved-by-s.herokuapp.com/api/user/update/${id}`, profilePhoto);
                    setIsLoading(false);
                    history.push("/login");
                } catch(err){
                    setError(err);
                    setIsLoading(false);
                }
            }
        } 
        uploadProfilePhoto();
    },[saveMongo])
  return (
    <UserProfilePicture>
        <div className="userProfileCoverBox">
            <h2 style={{color: "#666"}} >CHOOSE PROFILE PICTURE</h2>
            <div className="imageWrapper">
                <img src={file? URL.createObjectURL(file) :PF + "unknown.jpg"} alt="" />
            </div>
            <div className="buttonWrapper">
                <form action="upload file">

                    <label htmlFor="file">
                        <p className='choose'  >Choose</p>
                    </label>
                    <input accept="image/*" style={{display: "none"}} onChange={onChange} id="file" type="file" />
                    <Link  style={{textDecoration: "none"}} to="/login" >
                        <p className='skip' >skip</p>
                    </Link>
                </form>
                {file&&
                    <button onClick={uploadProfilePhoto} className='upload' >Upload</button>
                }
            </div>
        </div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: "flex", flexDirection:"column" }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </UserProfilePicture>
  )
}

const UserProfilePicture = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #aff6cf;
    background: linear-gradient(315deg, #aff6cf 0%, #9f98e8 74%);
    .userProfileCoverBox{
        width: 28rem;
        height: 38rem;
        background-color: #fff;
        border-radius: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        ${mobile({width: "18rem"})}
        .imageWrapper{
            margin-top: 20px;
            max-height: 180px;
            max-width: 180px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            position: relative;
            z-index: 5;
            img{
                width: 180px;
                border-radius: 50%;
                height: 180px;
                object-fit: cover;
            }
            &::before{
                content:"";
                width: 186px;
                height: 186px;
                background-color: #90d5ec;
                background-image: linear-gradient(315deg, #90d5ec 0%, #fc575e 74%);
                border-radius: 50%;
                position: absolute;
                z-index: -5;
                overflow: hidden;
            }
        }
        .buttonWrapper{
            margin-top: 60px;
            display: flex;
            flex-direction: column;
            form{
                display: flex;
                align-items: center;
                width: 14rem;
                justify-content: space-between;
            }
        }
        .skip{
            background-color:  darkblue;
            color: white;
            padding: 8px 30px;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            transition: all 250ms ease;
        }
        .choose{
            background-color:  #3cd699;
            color: white;
            padding: 8px 20px;
            -webkit-tap-highlight-color: transparent;
            cursor: pointer;
            transition: all 250ms ease;
        }
        .upload{
            padding: 10px 55px;
            background-color: #861657;
            background-image: linear-gradient(326deg, #861657 0%, #ffa69e 74%);
            font-size: 16px;
            color: white;
            border: none;
            outline: none;
            transition: all 250ms ease;
            cursor: pointer;
            margin-top: 20px;
        }
        .skip:hover, .choose:hover, .upload:hover{
            opacity: 0.7;
        }
    }
`


export default UserProfile