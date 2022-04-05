import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Request } from "../../request";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const request = Request(true);
  const [ newUser, setNewUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const PF =  process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    const fetchNewUser = async()=>{
      setIsLoading(true);
      try{
        const res = await request.get("user/find/all?new='true'");
        setNewUser(res.data)
        setIsLoading(false);
      }catch(err){
        setError(err);
        setIsLoading(false);
      }
    }
    fetchNewUser();
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUser?.map((user)=>(
          <li className="widgetSmListItem" key={user._id} >
            <img
              src={user.profile? user.profile: PF + "unknown.jpg"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{`${user.firstName} ${user.lastName}`}</span>
            </div>
            <Link to={`/adm/user/${user._id}`} >
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </Link>
          </li>
        ))
        }
      </ul>
    </div>
  );
}
