import "./newUser.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { Request } from "../../request";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function NewUser() {
  const request = Request(true);
  const [userData, setUserData ] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: Boolean,
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    address: ""
  })
  const onChange = (e)=>{
    if(e.target.name === "isAdmin"){
      setUserData({...userData, [e.target.name]: Boolean(e.target.value)});
    } else{
      setUserData({...userData, [e.target.name]: e.target.value});
    }
  };
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const createUser = async (e)=>{
    e.preventDefault()
    setIsLoading(true);
    try {
      await request.post("auth/register", userData)
      setIsLoading(false);
      window.location.reload();
    } catch(err){
      setIsLoading(false);
      setError(err);
    }
  }
  return (
    <>
      <Topbar />
      <Sidebar />
      <div className="newUser">
        <h1 className="newUserTitle">New User</h1>
        <form onSubmit={createUser}  className="newUserForm">
          <div className="newUserItem">
            <label>Username</label>
            <input onChange={onChange} name="username" type="text" placeholder="john" />
          </div>
          <div className="newUserItem">
            <label>First Name</label>
            <input onChange={onChange} name="firstName" type="text" placeholder="first name" />
          </div>
          <div className="newUserItem">
            <label>Last Name</label>
            <input onChange={onChange} name="lastName" type="text" placeholder="last name" />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input onChange={onChange} name="email" type="email" placeholder="xxxxxx@gmail.com" />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input onChange={onChange} name="password" type="password" placeholder="password" />
          </div>
          <div className="newUserItem">
            <label>Phone</label>
            <input onChange={onChange} name="phoneNumber" type="text" placeholder="+1 123 456 78" />
          </div>
          <div className="newUserItem">
            <label>Birth-Date</label>
            <input onChange={onChange} name="birthDate" type="date" placeholder="New York | USA" />
          </div>
          <div className="newUserItem">
            <label>Admin</label>
            <select className="newUserSelect" name="isAdmin" id="active">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <button type="submit" className="newUserButton" >Create</button>
        </form>
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
