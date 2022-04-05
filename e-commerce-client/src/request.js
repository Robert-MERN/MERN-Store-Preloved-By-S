import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/userSlice";


export const Request = (boolean)=>{
    const baseUrl = "https://preloved-by-s.herokuapp.com/api/";
    const token = useSelector(selectUser);
    const PublicRequest = axios.create({
        baseURL: baseUrl,
    });
    const UserRequest = axios.create({
        baseURL: baseUrl,
        headers: { token: `Bearer ${token.accessToken}` }
    });
    if (boolean === true){
        return UserRequest;
    } else {
        return PublicRequest;
    }
}
