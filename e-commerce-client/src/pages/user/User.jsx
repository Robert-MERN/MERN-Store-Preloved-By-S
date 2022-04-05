import {
  CalendarToday,
  DeviceUnknown,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { Request } from "../../request"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function User() {
  const userId = useParams().userId;
  const request = Request(true);
  const [ file, setFile ] = useState(null);
  const [ saveMongo, setSaveMongo ] = useState("");

  const PF =  process.env.REACT_APP_PUBLIC_FOLDER;

  const onChange = (e)=>{
    if(e.target.name === "isAdmin"){
      setUserData({...userData, [e.target.name]: Boolean(e.target.value)});
    }else if(e.target.name === "profile"){
      setFile(e.target.files[0]);
    } else{
      setUserData({...userData, [e.target.name]: e.target.value});
    }
  };
  const [ user, setUser ] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const fetchUser = async()=>{
      setIsLoading(true);
      try{
        const res = await request.get(`user/find/one/${userId}`);
        setUser(res.data);
        setIsLoading(false);
      } catch(err){
        setError(err);
        setIsLoading(false);
      }
    }
    fetchUser();
  },[])
  const [userData, setUserData ] = useState({})

  const updateUser = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    try {
      await request.put(`user/update/${userId}`, userData)
      setIsLoading(false);
      window.location.reload();
    } catch(err){
      setIsLoading(false);
      setError(err);
    }
  }
  const uploadProfilePhoto = (e)=>{
    e.preventDefault();
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
              setUserData({ ...userData ,profile: downloadURL});
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
              await request.put(`user/update/${userId}`, userData);
              setIsLoading(false);
              window.location.reload();
          } catch(err){
              setError(err);
              setIsLoading(false);
          }
      }
  } 
  uploadProfilePhoto();
},[saveMongo])
  return (
    <>
    <Topbar />
    <Sidebar />
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/adm/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={user.profile? user.profile: PF + "unknown.jpg"}
                alt="wait"
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{`${user.firstName} ${user.lastName}`}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{user.birthDate}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{user.phoneNumber}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form  onSubmit={(e)=> {e.preventDefault();file? uploadProfilePhoto(e) : updateUser(e);}} className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    onChange={onChange}
                    name="username"
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>First Name</label>
                  <input
                    onChange={onChange}
                    name="firstName"
                    type="text"
                    placeholder={user.firstName}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Last Name</label>
                  <input
                    onChange={onChange}
                    name="lastName"
                    type="text"
                    placeholder={user.lastName}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    onChange={onChange}
                    name="email"
                    type="text"
                    placeholder={user.email}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    onChange={onChange}
                    name="phoneNumber"
                    type="number"
                    placeholder={user.phoneNumber}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Password</label>
                  <input
                    onChange={onChange}
                    name="password"
                    type="text"
                    placeholder="********"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Birth-Date</label>
                  <input
                    onChange={onChange}
                    name="birthDate"
                    type="date"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Admin</label>
                  <select name="isAdmin" className="userUpdateInput">
                    <option value="none" selected disabled >{user.isAdmin?.toString()}</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={!file?(user.profile? user.profile: PF + "unknown.jpg"): URL.createObjectURL(file)}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input
                    onChange={onChange}
                    accept="image/*" 
                    name="profile" type="file" id="file" style={{ display: "none" }} />
                </div>
                <button type="submit" className="userUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: "flex", flexDirection:"column" }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
