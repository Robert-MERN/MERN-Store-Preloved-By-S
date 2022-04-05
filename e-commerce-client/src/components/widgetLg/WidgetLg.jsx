import "./widgetLg.css";
import { useState, useEffect } from "react";
import { Request } from "../../request";
import { Link } from "react-router-dom";

export default function WidgetLg() {
  const request = Request(true);
  const [ newUser, setNewUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const PF =  process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const fetchNewUSer = async()=>{
      setIsLoading(true);
      try{
        const res = await request.get("order/find/users");
        const res2 = await request.get("order/find");
        if(res.data && res2.data){
          const filteration = res.data.map((each)=> {
            const am = res2.data.find((a)=> a.userId === each._id)
            if( res2.data.some((i)=> i.userId === each._id)){
              return { ...each, amount: am.amount }
            }
          }) 
          setNewUser(filteration)
          setIsLoading(false);
        }
      }catch(err){
        setError(err);
        setIsLoading(false);
      }
    }
    fetchNewUSer();
  },[])
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {newUser?.map((user)=>(
          <tr key={user._id} className="widgetLgTr">
            <td className="widgetLgUser">
              <Link style={{textDecoration: "none", color: "black", display: "flex", alignItems: "center"}} to={`/adm/user/${user._id}`} >
                <img
                  src={user.profile? user.profile: PF + "unknown.jpg"}
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{`${user.firstName} ${user.lastName}`}</span>
              </Link>
            </td>
            <td className="widgetLgDate">{ user.createdAt.split("T")[0] }</td>
            <td className="widgetLgAmount">Rs. {user.amount.toLocaleString("en-US")}</td>
            <td className="widgetLgStatus">
              <Button type="Approved" />
            </td>
          </tr>
        ))
        }
      </table>
    </div>
  );
}
